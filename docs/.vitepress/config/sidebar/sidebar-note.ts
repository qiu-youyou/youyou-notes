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
        text: "理解作用域",
        link: "/note/javascript/get-scope/",
      },
      {
        text: "JS-转换数字金额到大写",
        link: "/note/javascript/convert-amount-to-capital",
        collapsed: false,
      },
      {
        text: "cos-js-sdk-v5 上传函数",
        link: "/note/javascript/upload-by-cos-js-sdk-v5",
        collapsed: false,
      },
      {
        text: "浏览器预览 PDF 文件流",
        link: "/note/javascript/browser-preview-pdf",
        collapsed: false,
      },
      {
        text: "浏览器清除所有 cookie",
        link: "/note/javascript/browser-clear-all-cookie",
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
    items: [
      {
        text: "React + Antd Mentions 实现艾特(@)功能",
        link: "/note/react/react-ant-mentions",
        collapsed: false,
      },
      {
        text: "React + Antd Upload 头像上传功能",
        link: "/note/react/react-ant-upload-avatar",
        collapsed: false,
      },
      {
        text: "React + BraftEditor 实现基础富文本编辑器",
        link: "/note/react/react-braft-editor",
        collapsed: false,
      },
      {
        text: "React + FortuneSheet Excel上传预览",
        link: "/note/react/react-fortune-sheet",
        collapsed: false,
      },
    ],
  },
  {
    text: "Vue",
    collapsed: false,
    items: [],
  },
  {
    text: "语义化的版本号/",
    link: "/note/semantic-version",
    collapsed: false,
  },
  {
    text: "NPM 的发包过程",
    link: "/note/npm-publish-process",
    collapsed: false,
  },
];
