import { DefaultTheme } from "vitepress";
import { sidebar } from "../sidebar";

const getNavItemsBySidebar = (siderbar: DefaultTheme.SidebarItem[]) => {
  return siderbar.map((item) => ({
    text: item.text,
    link: item?.items?.[0]?.link || item?.link || "",
  })) as [];
};

export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "芝士小记",
    activeMatch: "/note/",
    items: getNavItemsBySidebar(sidebar?.["/note"]),
  },
  {
    text: "来杯咖啡",
    activeMatch: "/blog/",
    items: getNavItemsBySidebar(sidebar?.["/blog"]),
  },
  {
    text: "问题记录",
    activeMatch: "/issue/",
    items: getNavItemsBySidebar(sidebar?.["/issue"]),
  },
  {
    text: "工具类库",
    activeMatch: "/tool/",
    items: getNavItemsBySidebar(sidebar?.["/tool"]),
  },
  {
    text: "每日算法",
    activeMatch: "/algo/",
    items: getNavItemsBySidebar(sidebar?.["/algo"]),
  },

  { text: "更新记录", link: "/log/", activeMatch: "/log/" },
];
