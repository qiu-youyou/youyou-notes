import { DefaultTheme } from "vitepress";

export const sidebarNote: DefaultTheme.SidebarItem[] = [
  {
    text: "HTML/CSS",
    collapsed: false,
    items: [],
  },
  {
    text: "JavaScript",
    collapsed: false,
    items: [
      {
        text: "JS-转换数字金额为大写",
        link: "/note/javascript/convert-amount-to-capital",
        collapsed: false,
      },
    ],
  },
  {
    text: "TypeScript",
    collapsed: false,
    items: [],
  },
  {
    text: "React",
    collapsed: false,
    items: [],
  },
  {
    text: "Vue",
    collapsed: false,
    items: [],
  },
];
