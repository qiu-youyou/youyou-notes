import { defineConfig } from "vitepress";
import { markdown } from "./config/markdown";
import { themeConfig } from "./config/theme-config";
import MarkdownPreview from "vite-plugin-markdown-preview";
export default defineConfig({
  lang: "zh-CN",
  title: "Yòuyou",
  outDir: "../dist",
  base: "/youyou-notes/",
  description: "Yòuyou 的文档站",
  cleanUrls: true, // url中删除.html后缀
  lastUpdated: true, // 显示最后更新时间
  // appearance: "dark", // 深色。使用 vitepress-theme-appearance key 从本地存储恢复用户设置。
  head: [["link", { rel: "icon", href: "/youyou-notes/favicon.ico" }]],
  vite: { plugins: [MarkdownPreview()] },
  themeConfig,
  markdown,
});
