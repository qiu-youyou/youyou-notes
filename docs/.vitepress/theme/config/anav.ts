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
    text: '芝士笔记',
    activeMatch: '/note/',
    items: getNavItemsBySidebar(sidebar?.['/note']),
  },
  {
    text: '这就懂了',
    link: '/azhe/',
    activeMatch: '/azhe/',
  },
  {
    text: '踩坑记录',
    link: '/wtf/',
    activeMatch: '/wtf/',
  },
  { text: '资源导航', activeMatch: '/nav/', link: '/nav/' },
  { text: '更新记录', link: '/log/', activeMatch: '/log/' },
];
