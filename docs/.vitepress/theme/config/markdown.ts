import { MarkdownOptions } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

export const markdown: MarkdownOptions = {
  lineNumbers: true,
  image: { lazyLoading: true },
  config(md) {
    md.use(vitepressDemoPlugin, {
      codesandbox: { show: true },
      stackblitz: { show: true },
    });
  },
};
