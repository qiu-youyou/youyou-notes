import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./styles/index.scss";

export default { extends: DefaultTheme } satisfies Theme;
