import type { DefaultTheme } from 'vitepress';
import { sidebarNote } from './sidebar-note';
import { sidebarCoffee } from './sidebar-coffee';

export type SidebarItem = DefaultTheme.SidebarItem & {
  navHidden?: boolean; // navbar 中是否显示
};

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/note': sidebarNote,
  '/coffee': sidebarCoffee,
};
