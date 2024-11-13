import giscusTalk from "vitepress-plugin-comment-with-giscus";
import { useData, useRoute } from "vitepress";

export const createGiscus = () => {
  const { frontmatter } = useData();
  const route = useRoute();

  // giscus配置
  giscusTalk(
    {
      repo: "sqius/youyou-notes",
      repoId: "R_kgDONNCZuQ",
      category: "Announcements",
      categoryId: "DIC_kwDONNCZuc4CkN07",
      inputPosition: "top",
      mapping: "pathname",
      lang: "zh-CN",
    },
    {
      frontmatter,
      route,
    }
  );
};
