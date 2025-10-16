import { type Theme } from 'vitepress';
import BlogTheme from '@sugarat/theme';

import StatisticList from './components/StatisticsList/index.vue';
import Archives from './components/Archives/index.vue';
import './styles/index.scss';

export default {
  ...BlogTheme,
  enhanceApp({ app, router }) {
    BlogTheme?.enhanceApp?.({ app, router } as any);
    app.component('StatisticList', StatisticList as any);
    app.component('Archives', Archives as any);
  },
} satisfies Theme;
