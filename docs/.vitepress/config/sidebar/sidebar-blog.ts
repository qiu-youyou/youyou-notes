import { DefaultTheme } from 'vitepress';

export const sidebarBlog: DefaultTheme.SidebarItem[] = [
  {
    text: 'Vue3 基础项目模板搭建',
    collapsed: false,
    items: [
      {
        text: '初始化 Vue3 项目',
        link: '/blog/vue3-template/init-project/',
      },
      {
        text: '渐进式Web应用- PWA',
        link: '/blog/vue3-template/pwa/',
      },
      {
        text: '单元测试及端到端测试配置',
        link: '/blog/vue3-template/unit-e2e-test/',
      },
    ],
  },

  {
    text: 'TypeScript 语法用法',
    collapsed: false,
    items: [
      {
        text: 'TypeScript-相关概念',
        link: '/blog/typescript-started/typescript-concept',
      },
      {
        text: 'TypeScript-基本类型',
        link: '/blog/typescript-started/typescript-type',
      },
      {
        text: 'TypeScript-函数类型',
        link: '/blog/typescript-started/typescript-fun',
      },
      {
        text: 'TypeScript-特殊类型',
        link: '/blog/typescript-started/typescript-special',
      },
      {
        text: 'TypeScript-Class类',
        link: '/blog/typescript-started/typescript-class',
      },
      {
        text: 'TypeScript-Generics泛型',
        link: '/blog/typescript-started/typescript-generics',
      },
      {
        text: 'TypeScript-Interface接口',
        link: '/blog/typescript-started/typescript-interface',
      },
    ],
  },

  {
    text: 'JavaScript 设计模式',
    collapsed: false,
    items: [
      {
        text: 'JavaScript 设计模式-面向对象',
        link: '/blog/javascript-patterns/oop/',
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
    text: '快速上手实践',
    collapsed: false,
    items: [
      {
        text: 'Webpack5-官方文档 上手实践 1',
        link: '/blog/get-started/webpack5-started/section1',
      },
      {
        text: 'Webpack5-官方文档 上手实践 2',
        link: '/blog/get-started/webpack5-started/section2',
      },
      // {
      //   text: 'Webpack5-官方文档 上手实践 3',
      //   link: '/blog/get-started/webpack5-started/section3',
      // },
      // {
      //   text: 'Webpack5-官方文档 上手实践 4',
      //   link: '/blog/get-started/webpack5-started/section4',
      // },
      // {
      //   text: 'Webpack5-官方文档 上手实践 5',
      //   link: '/blog/get-started/webpack5-started/section5',
      // },
      {
        text: '上手Node.js与数据库服务端开发',
        link: '/blog/get-started/node-server-started/',
      },
      {
        text: 'create-react-app 初始化项目',
        link: '/blog/get-started/create-react-app/',
      },
      {
        text: 'React-Router(V6.4)-快速上手',
        link: '/blog/get-started/react-router/',
      },
      {
        text: 'Redux&Redux Toolkit-快速上手',
        link: '/blog/get-started/redux-tootik/',
      },
      {
        text: 'React-快速上手',
        link: '/blog/get-started/react/',
      },
    ],
  },
];
