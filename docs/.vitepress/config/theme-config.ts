import { DefaultTheme } from "vitepress";
import { sidebar } from "./sidebar";
import { nav } from "./nav";

export const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,
  i18nRouting: false,
  logo: "/images/logo.png",

  sidebarMenuLabel: "菜单",
  darkModeSwitchLabel: "主题",
  returnToTopLabel: "回到顶部",
  lightModeSwitchTitle: "切换到浅色模式",
  darkModeSwitchTitle: "切换到深色模式",
  docFooter: { prev: "上一篇", next: "下一篇" },
  outline: { level: "deep", label: "目录" },
  // footer: { message: "最好的时间是当下" },
  footer: {
    message: "Released under the MIT License.",
    copyright: `Copyright © 2023-${new Date().getFullYear()} Yòuyou`,
  },
  lastUpdated: {
    formatOptions: { dateStyle: "short", timeStyle: "medium" },
    text: "上次更新时间",
  },

  search: {
    provider: "local",
    options: {
      detailedView: true, // 详细试图
      translations: {
        button: { buttonText: "站内搜索一下" },
        modal: {
          noResultsText: "这里没有找到相关内容：",
          displayDetails: "现实详细内容",
          resetButtonTitle: "清除内容",
          backButtonTitle: "返回",
          footer: {
            navigateText: "切换-上下切换选择内容",
            selectText: "选择-回车跳转",
            closeText: "退出搜索",
          },
        },
      },
    },
  },

  socialLinks: [
    { icon: "github", link: "https://github.com/qiu-youyou" },
    {
      icon: {
        svg: '<svg t="1732115235792" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4069" width="200" height="200"><path d="M1021.249865 530.294668c0 25.997094-21.35947 47.083341-47.741327 47.083341-12.582573 0-23.945365-4.897543-32.450063-12.742209l-0.124843 0.122797L513.218246 143.048997l0-0.024559-1.217734-1.12973 0-0.013303L84.036463 563.826366l-0.023536-0.013303c-8.616238 8.378831-20.451798 13.563924-33.520441 13.563924-26.370601 0-47.741327-21.084201-47.741327-47.083341 0-13.326517 5.632277-25.362644 14.671141-33.916461l460.164425-453.713502c8.677637-8.900717 20.887726-14.459317 34.413787-14.459317l0 0 0 0c0.024559 0 0.024559 0 0.024559 0 0.845251 0 1.689479 0.024559 2.511193 0.074701 0.122797 0 0.274246 0.024559 0.398066 0.024559 0.721431 0.049119 1.417279 0.099261 2.13871 0.173962 0.050142 0 0.100284 0.01228 0.149403 0.01228 11.661597 1.255597 22.106484 6.66377 29.690206 14.6957l0.023536-0.024559 168.764682 163.281807 0-50.925856c0-33.133631 48.065715-25.461905 50.925856-25.461905 41.400922 0 50.924833-0.521886 50.924833 25.461905l0 152.774499 190.894701 189.887768-0.100284 0.11154C1016.301156 506.697227 1021.249865 517.89936 1021.249865 530.294668zM944.863127 613.844549l0 127.311571 0 76.386738 0 127.324874c0 25.985838-24.540929 50.925856-50.900274 50.925856L766.649236 995.793588l-0.023536-381.949039L588.387249 613.844549l0 381.949039L130.063753 995.793588c-26.371624 0-50.925856-24.940019-50.925856-50.925856L79.137897 817.543881l0-76.386738L79.137897 613.844549l432.861592-413.045267L944.863127 613.844549zM461.075679 613.844549 231.913419 613.844549l0 203.700355 229.16226 0L461.075679 613.844549z" p-id="4070"></path></svg>',
      },
      link: "https:qiuyouyou.cn",
    },
  ], // GitHub
};
