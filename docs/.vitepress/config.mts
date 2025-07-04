import { defineConfig } from 'vitepress';
import { sugaratTheme } from './theme/config/sugarat-theme';
import { pressTheme } from './theme/config/press-theme';

export default defineConfig({
  extends: sugaratTheme,
  base: '/',
  lang: 'zh-CN',
  title: 'Yòuyou',
  outDir: '../dist',
  description: 'Yòuyou 的文档站',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: pressTheme,
  lastUpdated: true,
  cleanUrls: true,
});
