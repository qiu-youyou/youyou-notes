import { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.Config["nav"] = [
  { text: "知识小记", link: "/note/", activeMatch: "/note/" },
  { text: "技术文章", link: "/blog/", activeMatch: "/blog/" },
  { text: "每日算法", link: "/algo/", activeMatch: "/algo/" },
  { text: "软件工具", link: "/tool/", activeMatch: "/tool/" },
  { text: "哇啦哇啦", link: "/wala/", activeMatch: "/wala/" },
  { text: "更新记录", link: "/log/", activeMatch: "/log/" },
];
