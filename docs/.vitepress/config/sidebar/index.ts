import type { DefaultTheme } from 'vitepress';
import { sidebarNote } from './sidebar-note';
import { sidebarBlog } from './sidebar-blog';
import { sidebarIssue } from './sidebar-issue';
import { sidebarCoffee } from './sidebar-coffee';
import { sidebarAlgorithm } from './sidebar-algorithm';

export type SidebarItem = DefaultTheme.SidebarItem & {
  navHidden?: boolean; // navbar 中是否显示
};

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/note': sidebarNote,
  '/blog': sidebarBlog,
  '/issue': sidebarIssue,
  '/coffee': sidebarCoffee,
  '/algorithm': sidebarAlgorithm,
};
