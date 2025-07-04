import { type Theme } from 'vitepress';
import BlogTheme from '@sugarat/theme';
import './styles/index.scss';

export default {
  ...BlogTheme,
  enhanceApp({ app, router }) {
    BlogTheme?.enhanceApp?.({ app, router } as any);
  },
} satisfies Theme;
