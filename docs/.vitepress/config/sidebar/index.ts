import type { DefaultTheme } from "vitepress";
import { sidebarNote } from "./sidebar-note";
import { sidebarBlog } from "./sidebar-blog";
import { sidebarAlgo } from "./sidebar-algo";
import { sidebarTool } from "./sidebar-tool";
import { sidebarWala } from "./sidebar-wala";

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/note": sidebarNote,
  "/blog": sidebarBlog,
  "/algo": sidebarAlgo,
  "/tool": sidebarTool,
  "/wala": sidebarWala,
};
