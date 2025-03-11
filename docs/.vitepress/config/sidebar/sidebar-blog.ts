import { DefaultTheme } from "vitepress";

export const sidebarBlog: DefaultTheme.SidebarItem[] = [
  {
    text: "JavaScript 设计模式",
    collapsed: false,
    items: [
      {
        text: "JavaScript 设计模式-面向对象",
        link: "/blog/javascript-patterns/oop/",
      },
      // {
      //   text: "JavaScript设计模式-设计原则",
      //   link: "/blog/javascript-patterns/principles/",
      // },
      // {
      //   text: "JavaScript设计模式-工厂模式",
      //   link: "/blog/javascript-patterns/factory-pattern/",
      // },
    ],
  },

  {
    text: "TypeScript 语法与用法",
    collapsed: false,
    items: [
      {
        text: "TypeScript-相关概念",
        link: "/blog/typescript-started/typescript-concept",
      },
      {
        text: "TypeScript-基本类型",
        link: "/blog/typescript-started/typescript-type",
      },
      {
        text: "TypeScript-函数类型",
        link: "/blog/typescript-started/typescript-fun",
      },
      {
        text: "TypeScript-特殊类型",
        link: "/blog/typescript-started/typescript-special",
      },
      {
        text: "TypeScript-Class类",
        link: "/blog/typescript-started/typescript-class",
      },
      {
        text: "TypeScript-Generics泛型",
        link: "/blog/typescript-started/typescript-generics",
      },
      {
        text: "TypeScript-Interface接口",
        link: "/blog/typescript-started/typescript-interface",
      },
    ],
  },

  {
    text: "Vue3 基础项目搭建",
    collapsed: false,
    items: [
      {
        text: "初始化 Vue3 项目",
        link: "/blog/vue3-template/init-project/",
      },
      {
        text: "渐进式Web应用- PWA",
        link: "/blog/vue3-template/pwa/",
      },
      {
        text: "单元测试及端到端测试配置",
        link: "/blog/vue3-template/unit-e2e-test/",
      },
    ],
  },

  {
    text: "React 快速上手",
    collapsed: false,
    items: [
      {
        text: "React-快速上手",
        link: "/blog/react-started/react-quick-start/",
      },
      {
        text: "React-Router(V6.4)-快速上手",
        link: "/blog/react-started/react-router-quick-start/",
      },
      {
        text: "Redux&Redux Toolkit-快速上手",
        link: "/blog/react-started/redux-tootik-quick-start/",
      },
      {
        text: "create-react-app 初始化项目",
        link: "/blog/react-started/create-react-app-init/",
      },
    ],
  },

  {
    text: "其他内容",
    collapsed: false,
    items: [
      {
        text: "语义化的版本号",
        link: "/blog/npm/semantic-version/",
      },
      {
        text: "NPM 的发包过程",
        link: "/blog/npm/npm-publish-process",
      },
    ],
  },
];
