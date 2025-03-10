import { useRoute } from "vitepress";
import { watch } from "vue";

/**
 * Fix the issue of the active class being added multiple times to the navigation bar.
 */
export const fixNavActiveRepeat = () => {
  const route = useRoute();
  const navMenuEls = document.querySelectorAll<HTMLElement>(
    ".VPFlyout.VPNavBarMenuGroup"
  );

  const updateNavMenu = (newPath: string) => {
    Array.from(navMenuEls).some((el) => {
      if (!el.innerText.startsWith("技术笔记")) return false;
      if (newPath.startsWith("/blog/")) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
      return true; // 找到后立即返回，不继续向下遍历
    });
  };

  watch(() => route.path, updateNavMenu, { immediate: true });
};
