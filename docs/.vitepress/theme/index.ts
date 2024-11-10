import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import HomeComponent from "./components/HomeComponent.vue";
import Layout from "./components/Layout.vue";
import "./styles/index.scss";

export default {
  Layout,
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomeComponent", HomeComponent);
  },
} satisfies Theme;
