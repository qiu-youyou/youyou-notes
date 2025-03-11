import type { DefaultTheme } from "vitepress";
import { sidebarNote } from "./sidebar-note";
import { sidebarBlog } from "./sidebar-blog";
import { sidebarTool } from "./sidebar-tool";
import { sidebarIssue } from "./sidebar-issue";
import { sidebarCoffee } from "./sidebar-coffee";

export type SidebarItem = DefaultTheme.SidebarItem & {
  navHidden?: boolean; // navbar 中是否显示
};

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/note": sidebarNote,
  "/blog": sidebarBlog,
  "/tool": sidebarTool,
  "/issue": sidebarIssue,
  "/coffee": sidebarCoffee,
};
