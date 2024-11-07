import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./styles/theme.scss";

export default { extends: DefaultTheme } satisfies Theme;
