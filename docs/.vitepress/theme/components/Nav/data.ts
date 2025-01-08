import type { NavData } from "./types";

export const NAV_DATA: NavData[] = [
  {
    title: "React 生态",
    items: [
      {
        title: "React",
        desc: "用于构建用户界面的 JavaScript 库",
        link: "https://zh-hans.reactjs.org",
        icon: "https://zh-hans.reactjs.org/favicon.ico",
      },
      {
        icon: "https://reactrouter.com/favicon-light.png",
        title: "React Router",
        desc: "React 的声明式路由",
        link: "https://reactrouter.com",
      },
      {
        icon: "https://cn.redux.js.org/img/redux.svg",
        title: "Redux",
        desc: "JavaScript 应用的状态容器，提供可预测的状态管理",
        link: "https://cn.redux.js.org",
      },
      {
        icon: "https://nextjs.org/static/favicon/safari-pinned-tab.svg",
        title: "Next.js",
        desc: "一个用于 Web 的 React 框架",
        link: "https://nextjs.org",
      },
      {
        icon: "https://ahooks.js.org/simple-logo.svg",
        title: "ahooks",
        desc: "一套高质量可靠的 React Hooks 库",
        link: "https://ahooks.js.org/zh-CN",
      },
      {
        icon: "https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg",
        title: "UmiJS",
        desc: "插件化的企业级前端应用框架",
        link: "https://umijs.org",
      },
    ],
  },
  {
    title: "Vue 生态",
    items: [
      {
        icon: "https://cn.vuejs.org/logo.svg",
        title: "Vue 3",
        desc: "渐进式 JavaScript 框架",
        link: "https://cn.vuejs.org",
      },

      {
        icon: "https://cn.vuejs.org/logo.svg",
        title: "Vue Router",
        desc: "Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由",
        link: "https://router.vuejs.org/zh",
      },
      {
        icon: "https://pinia.vuejs.org/logo.svg",
        title: "Pinia",
        desc: "符合直觉的 Vue.js 状态管理库",
        link: "https://pinia.vuejs.org/zh",
      },
      {
        icon: "https://nuxt.com/icon.png",
        title: "Nuxt.js",
        desc: "一个基于 Vue.js 的通用应用框架",
        link: "https://nuxt.com",
      },
      {
        title: "Vue Test Utils",
        link: "https://test-utils.vuejs.org/",
        icon: "https://test-utils.vuejs.org/logo.svg",
        desc: "Vue.js 3 官方测试套件工具",
      },
    ],
  },
  {
    title: "单元测试工具",
    items: [
      {
        title: "Vitest",
        link: "https://cn.vitest.dev/",
        icon: "https://cn.vitest.dev/logo.svg",
        desc: "一个原生支持 Vite 的测试框架。非常快速！",
      },
      {
        title: "Jest",
        link: "https://jestjs.io/",
        icon: "https://jestjs.io/img/favicon/favicon.ico",
        desc: "Jest 是一款优雅、简洁的 JavaScript 测试框架。",
      },
      {
        title: "Mocha",
        link: "https://mochajs.org/",
        icon: "https://mochajs.org/favicon.ico",
        desc: "一个功能丰富的 JavaScript 测试框架，可在Node.js和浏览器中运行。",
      },
    ],
  },
  {
    title: "e2e 测试工具",
    items: [
      {
        title: "Cypress",
        link: "https://www.cypress.io/",
        icon: "https://www.cypress.io/favicon.svg",
        desc: "使用 Cypress，以可视化方式调试它们，并在持续集成构建中自动运行它们。",
      },
      {
        title: "Nightwatch",
        link: "https://nightwatchjs.org/",
        icon: "https://nightwatchjs.org/favicon.ico",
        desc: "不妥协的测试自动化框架，可以在 Web 和本机移动应用程序中编写、运行和调试测试。",
      },
    ],
  },
  {
    title: "常用类库",
    items: [
      {
        title: "postcss-px-to-viewport-8-plugin",
        desc: "将 px 单位转换为视口单位的 (vw, vh, vmin, vmax) 的 PostCSS 插件",
        icon: "https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png",
        link: "https://www.npmjs.com/package/postcss-px-to-viewport-8-plugin",
      },

      {
        title: "unplugin-vue-router",
        desc: "在 Vue 中通过 TS 实现基于文件的自动路由",
        icon: "https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png",
        link: "https://www.npmjs.com/package/unplugin-vue-router",
      },
    ],
  },
];
