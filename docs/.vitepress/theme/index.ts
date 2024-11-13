import { watch } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { updateRainbowStyle } from "./utils/rainbow";
import { createMediumZoom } from "./utils/medium";
import { createGiscus } from "./utils/giscus";
import HomeComponent from "./components/HomeComponent.vue";
import ArticleMeta from "./components/ArticleMeta.vue";
import Layout from "./components/Layout.vue";
import "./styles/index.scss";

export default {
  Layout,
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window !== "undefined") {
      createMediumZoom(app, router);
    }
    app.component("HomeComponent", HomeComponent);
    app.component("ArticleMeta", ArticleMeta);
    watch(
      () => router.route.data.relativePath,
      () => updateRainbowStyle(),
      { immediate: true }
    );
  },
  setup() {
    createGiscus()
  }
} satisfies Theme;
