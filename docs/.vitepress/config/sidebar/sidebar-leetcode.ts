import { DefaultTheme } from 'vitepress';

export const sidebarLeetcode: DefaultTheme.SidebarItem[] = [
  {
    text: '数学',
    collapsed: false,
    items: [
      {
        text: '回文数',
        link: '/leetcode/math/palindrome-number/',
      },
      {
        text: '罗马数字转整数',
        link: '/leetcode/math/roman-to-integer/',
      },
    ],
  },
];
