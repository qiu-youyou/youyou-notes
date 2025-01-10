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
    text: "React 相关",
    collapsed: false,
    items: [
      {
        text: "React-快速上手",
        link: "/blog/react/react-quick-start/",
      },
      {
        text: "React-Router(V6.4)-快速上手",
        link: "/blog/react/react-router-quick-start/",
      },
      {
        text: "Redux&Redux Toolkit-快速上手",
        link: "/blog/react/redux-tootik-quick-start/",
      },
      {
        text: "create-react-app 初始化项目",
        link: "/blog/react/create-react-app-init/",
      },
    ],
  },

  {
    text: "Vue 相关",
    link: "/",
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
