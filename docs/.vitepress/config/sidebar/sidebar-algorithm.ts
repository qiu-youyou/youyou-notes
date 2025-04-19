import { DefaultTheme } from 'vitepress';

export const sidebarAlgorithm: DefaultTheme.SidebarItem[] = [
  {
    text: 'waiting',
    link: '/algorithm/',
    collapsed: false,
  },
  {
    text: '数学',
    collapsed: false,
    items: [
      {
        text: '回文数',
        link: '/algorithm/math/palindrome-number/',
      },
    ],
  },
];
