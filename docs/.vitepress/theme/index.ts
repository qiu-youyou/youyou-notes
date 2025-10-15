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

    // 页面切换动画钩子
    router.onBeforeRouteChange = () => {
      const el = document.querySelector('.vp-page') as HTMLElement;
      if (el) {
        el.classList.add('page-leave');
      }
    };

    router.onAfterRouteChange = () => {
      const el = document.querySelector('.vp-page') as HTMLElement;
      if (el) {
        el.classList.remove('page-leave');
        el.classList.add('page-enter');
        setTimeout(() => el.classList.remove('page-enter'), 400);
      }
    };
  },
} satisfies Theme;
