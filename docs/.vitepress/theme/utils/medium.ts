import type { Router } from "vitepress";
import type { App, InjectionKey } from "vue";
import type { Zoom } from "medium-zoom";
import mediumZoom from "medium-zoom";
import { watch } from "vue";

declare module "medium-zoom" {
  interface Zoom {
    refresh: (selector?: string) => void;
  }
}

const defaultSelector =
  ":not(a) > img:not(.image-src, .visitor, .vp-sponsor-grid-image)";

export const mediumZoomSymbol: InjectionKey<Zoom> = Symbol("medium-zoom");

export const createMediumZoom = (app: App, router: Router) => {
  const zoom = mediumZoom();
  // 扩展 zoom.refresh 方法
  zoom.refresh = (selector = defaultSelector) => {
    zoom.detach();
    zoom.attach(selector);
  };

  app.provide(mediumZoomSymbol, zoom);
  watch(
    () => router.route.path,
    // 使用 nextTick 时在 dev 环境下第一次进入页面无法触发
    () => setTimeout(() => zoom.refresh())
  );
};
