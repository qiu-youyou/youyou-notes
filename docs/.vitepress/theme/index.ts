import { type Theme } from 'vitepress';
import BlogTheme from '@sugarat/theme';

import StatisticList from './components/StatisticsList/index.vue';
import Archives from './components/Archives/index.vue';
import CategoryList from './components/CategoryList/index.vue';
import InsightsList from './components/InsightsList/index.vue';
import './styles/index.scss';

export default {
  ...BlogTheme,
  enhanceApp({ app, router }) {
    BlogTheme?.enhanceApp?.({ app, router } as any);
    app.component('StatisticList', StatisticList as any);
    app.component('Archives', Archives as any);
    app.component('CategoryList', CategoryList as any);
    app.component('InsightsList', InsightsList as any);
  },
} satisfies Theme;
