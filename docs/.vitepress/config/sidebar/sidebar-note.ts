import { DefaultTheme } from "vitepress";

export const sidebarNote: DefaultTheme.SidebarItem[] = [
  {
    text: "HTML/CSS",
    collapsed: false,
    link: "/note/html-css/",
    items: [],
  },
  {
    text: "JavaScript",
    collapsed: false,
    items: [
      {
        text: "理解作用域",
        link: "/note/javascript/get-scope/",
      },
      {
        text: "JS-防抖与节流",
        link: "/note/javascript/debounce-throttle",
      },
      {
        text: "JS-转换数字金额到大写",
        link: "/note/javascript/convert-amount-to-capital",
      },
      {
        text: "cos-js-sdk-v5 上传函数",
        link: "/note/javascript/upload-by-cos-js-sdk-v5",
      },
      {
        text: "浏览器预览 PDF 文件流",
        link: "/note/javascript/browser-preview-pdf",
      },
      {
        text: "浏览器清除所有 cookie",
        link: "/note/javascript/browser-clear-all-cookie",
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
      },
      {
        text: "TypeScript-基本类型",
        link: "/note/typescript/typescript-type",
      },
      {
        text: "TypeScript-函数类型",
        link: "/note/typescript/typescript-fun",
      },
      {
        text: "TypeScript-特殊类型",
        link: "/note/typescript/typescript-special",
      },
      {
        text: "TypeScript-Class类",
        link: "/note/typescript/typescript-class",
      },
      {
        text: "TypeScript-Generics泛型",
        link: "/note/typescript/typescript-generics",
      },
      {
        text: "TypeScript-Interface接口",
        link: "/note/typescript/typescript-interface",
      },
    ],
  },
  {
    text: "React",
    collapsed: false,
    items: [
      {
        text: "React + Antd Mentions 实现艾特(@)功能",
        link: "/note/react/react-ant-mentions",
      },
      {
        text: "React + Antd Upload 头像上传功能",
        link: "/note/react/react-ant-upload-avatar",
      },
      {
        text: "React + BraftEditor 实现基础富文本编辑器",
        link: "/note/react/react-braft-editor/",
      },
      {
        text: "React + FortuneSheet Excel上传预览",
        link: "/note/react/react-fortune-sheet",
      },
    ],
  },
  {
    text: "Vue",
    collapsed: false,
    link: "/note/vue/",
    items: [],
  },
];
