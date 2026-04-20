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
  { text: 'Home', link: '/' },
  // { text: 'Insights', activeMatch: '/insights/', link: '/insights/' },
  { text: 'Category', activeMatch: '/categories/', link: '/categories/' },
  { text: 'Archives', activeMatch: '/archives/', link: '/archives/' },
  // { text: 'ChangeLog', link: '/changelog/', activeMatch: '/changeLog/' },
  // { text: 'Nav', activeMatch: '/nav/', link: '/nav/' },
];
