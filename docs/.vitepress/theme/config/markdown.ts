import { MarkdownOptions } from 'vitepress';
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';
import { MermaidMarkdown } from 'vitepress-plugin-mermaid';
export const markdown: MarkdownOptions = {
  lineNumbers: true,
  image: { lazyLoading: true },
  config(md) {
    md.use(vitepressDemoPlugin, {
      codesandbox: { show: true },
      stackblitz: { show: true },
    });
    md.use(MermaidMarkdown);
  },
};
