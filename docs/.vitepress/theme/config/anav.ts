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
  {
    text: '芝士小记',
    activeMatch: '/note/',
    items: getNavItemsBySidebar(sidebar?.['/note']),
  },
  { text: '资源导航', activeMatch: '/nav/', link: '/nav/' },
  { text: '更新记录', link: '/log/', activeMatch: '/log/' },
];
