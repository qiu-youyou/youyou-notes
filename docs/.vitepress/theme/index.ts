import { watch } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { updateRainbowStyle } from "./utils/rainbow";
import HomeComponent from "./components/HomeComponent.vue";
import Layout from "./components/Layout.vue";
import "./styles/index.scss";

export default {
  Layout,
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    app.component("HomeComponent", HomeComponent);
    watch(
      () => router.route.data.relativePath,
      () => updateRainbowStyle(),
      { immediate: true }
    );
  },
} satisfies Theme;
