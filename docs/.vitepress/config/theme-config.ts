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
  footer: { message: "最好的时间是当下" },
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

  socialLinks: [{ icon: "github", link: "https://github.com/qiu-youyou" }], // GitHub
};
