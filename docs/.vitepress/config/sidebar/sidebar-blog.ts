import { DefaultTheme } from "vitepress";

export const sidebarBlog: DefaultTheme.SidebarItem[] = [
  {
    text: "React",
    collapsed: false,
    items: [
      {
        text: "React-快速上手",
        link: "/blog/react/react-quick-start/",
        collapsed: false,
      },
      {
        text: "React-Router(V6.4)-快速上手",
        link: "/blog/react/react-router-quick-start/",
        collapsed: false,
      },
      {
        text: "Redux&Redux Toolkit-快速上手",
        link: "/blog/react/redux-tootik-quick-start/",
        collapsed: false,
      },
      {
        text: "CreateReactApp初始化项目记录",
        link: "/blog/react/create-react-app-init/",
        collapsed: false,
      },
    ],
  },
  {
    text: "Vue",
    collapsed: false,
    items: [
      {
        text: "Vue3-初始化项目通用模板",
        link: "/blog/vue/vue3-init-template/",
        collapsed: false,
      },
    ],
  },
];
