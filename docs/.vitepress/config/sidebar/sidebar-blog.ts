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
    text: "Vue3 项目模板搭建",
    collapsed: false,
    items: [
      {
        text: "创建并初始化 Vue3 项目",
        link: "/blog/vue3-template/init-project/",
      },
      {
        text: "渐进式Web应用- PWA 集成",
        link: "/blog/vue3-template/pwa/",
      },
      {
        text: "项目单元测试及e2e测试配置",
        link: "/blog/vue3-template/unit-e2e-test/",
      },
    ],
  },

  {
    text: "React",
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
    text: "NPM 相关",
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
