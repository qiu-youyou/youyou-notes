import { DefaultTheme } from 'vitepress';
import { sidebar, SidebarItem } from './sidebar/index';

const getNavItemsBySidebar = (siderbar: SidebarItem[]) => {
  return siderbar
    .filter((item) => !item?.navHidden)
    .map((item) => ({
      text: item.text,
      link: item?.items?.[0]?.link || item?.link || '',
    })) as [];
};

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  {
    text: '芝士小记',
    activeMatch: '/note/',
    items: getNavItemsBySidebar(sidebar?.['/note']),
  },
  {
    text: '技术笔记',
    activeMatch: '/blog/',
    items: getNavItemsBySidebar(sidebar?.['/blog']),
  },
  {
    text: '问题记录',
    activeMatch: '/issue/',
    items: getNavItemsBySidebar(sidebar?.['/issue']),
  },
  // {
  //   text: '一杯咖啡',
  //   activeMatch: '/coffee/',
  //   items: getNavItemsBySidebar(sidebar?.['/coffee']),
  // },
  { text: '资源导航', activeMatch: '/nav/', link: '/nav/' },
  { text: '更新记录', link: '/log/', activeMatch: '/log/' },
];
