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
        text: "JS-转换数字金额到大写",
        link: "/note/javascript/convert-amount-to-capital",
        collapsed: false,
      },
    ],
  },
  {
    text: "TypeScript",
    collapsed: false,
    items: [
      {
        text: "TypeScript-相关概念",
        link: "/note/typescript/typescript-concept",
        collapsed: false,
      },
      {
        text: "TypeScript-基本类型",
        link: "/note/typescript/typescript-type",
        collapsed: false,
      },
      {
        text: "TypeScript-函数类型",
        link: "/note/typescript/typescript-fun",
        collapsed: false,
      },
      {
        text: "TypeScript-特殊类型",
        link: "/note/typescript/typescript-special",
        collapsed: false,
      },
      {
        text: "TypeScript-Class类",
        link: "/note/typescript/typescript-class",
        collapsed: false,
      },
      {
        text: "TypeScript-Generics泛型",
        link: "/note/typescript/typescript-generics",
        collapsed: false,
      },
      {
        text: "TypeScript-Interface接口",
        link: "/note/typescript/typescript-interface",
        collapsed: false,
      },
    ],
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
