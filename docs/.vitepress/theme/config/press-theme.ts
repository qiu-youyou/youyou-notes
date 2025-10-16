import { DefaultTheme } from 'vitepress';
import socialLinks from './external';
import { nav } from './anav';

export const pressTheme: DefaultTheme.Config = {
  nav,
  i18nRouting: false,
  logo: 'http://images.qiuyouyou.cn/notes/logo.png?imageSlim',
  darkModeSwitchLabel: '主题',
  returnToTopLabel: '回到顶部',
  lastUpdatedText: '最后更新于',
  lightModeSwitchTitle: '切换到浅色模式',
  darkModeSwitchTitle: '切换到深色模式',
  outline: { level: [2, 3], label: '本页导航' },
  docFooter: { prev: '上一篇', next: '下一篇' },
  lastUpdated: {
    formatOptions: { dateStyle: 'short', timeStyle: 'medium' },
    text: '最后更新于',
  },
  socialLinks,
};
