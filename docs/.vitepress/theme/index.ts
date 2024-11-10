import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomeComponent from "./components/HomeComponent.vue";

import "./styles/index.scss";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomeComponent", HomeComponent);
  },
} satisfies Theme;
