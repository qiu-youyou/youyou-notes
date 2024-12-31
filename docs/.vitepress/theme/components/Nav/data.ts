import type { NavData } from "./types";

export const NAV_DATA: NavData[] = [
  {
    title: "React 生态",
    items: [
      {
        icon: "https://zh-hans.reactjs.org/favicon.ico",
        title: "React",
        desc: "用于构建用户界面的 JavaScript 库",
        link: "https://zh-hans.reactjs.org",
      },
      {
        icon: "https://reactrouter.com/favicon-light.png",
        title: "React Router",
        desc: "React 的声明式路由",
        link: "https://reactrouter.com",
      },
      {
        icon: "https://nextjs.org/static/favicon/safari-pinned-tab.svg",
        title: "Next.js",
        desc: "一个用于 Web 的 React 框架",
        link: "https://nextjs.org",
      },
      {
        icon: "https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg",
        title: "UmiJS",
        desc: "插件化的企业级前端应用框架",
        link: "https://umijs.org",
      },
      {
        icon: "https://cn.redux.js.org/img/redux.svg",
        title: "Redux",
        desc: "JavaScript 应用的状态容器，提供可预测的状态管理",
        link: "https://cn.redux.js.org",
      },
      {
        icon: "https://ahooks.js.org/simple-logo.svg",
        title: "ahooks",
        desc: "一套高质量可靠的 React Hooks 库",
        link: "https://ahooks.js.org/zh-CN",
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
        title: "Vue 2",
        desc: "渐进式 JavaScript 框架",
        link: "https://v2.cn.vuejs.org",
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
