import { Theme } from '@sugarat/theme';

const customIcon: any = {
  ts: 'vscode-icons:file-type-typescript',
  tsx: 'vscode-icons:file-type-typescript',
  mjs: 'vscode-icons:file-type-js',
  cjs: 'vscode-icons:file-type-js',
  json: 'vscode-icons:file-type-json',
  js: 'vscode-icons:file-type-js',
  javascript: 'vscode-icons:file-type-js',
  jsx: 'vscode-icons:file-type-js',
  md: 'vscode-icons:file-type-markdown',
  py: 'vscode-icons:file-type-python',
  ico: 'vscode-icons:file-type-favicon',
  html: 'vscode-icons:file-type-html',
  css: 'vscode-icons:file-type-css',
  yml: 'vscode-icons:file-type-light-yaml',
  yaml: 'vscode-icons:file-type-light-yaml',
};

const baseUrl = 'https://notes.qiuyouyou.cn';
const RSS: Theme.RSSOptions = {
  title: 'Yòuyou Notes',
  copyright: `Yòuyou 2023-${new Date().getFullYear()}`,
  favicon: 'https://notes.qiuyouyou.cn/favicon.ico',
  language: 'zh-cn',
  baseUrl,
};

export default {
  // alert: {
  //   type: 'success',
  //   title: '本站主题更新啦! 🎉🎉🎉',
  //   duration: 10000,
  // },

  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //     {
  //       type: 'image',
  //       src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp',
  //     },
  //     {
  //       type: 'text',
  //       content: '欢迎大家加群&私信交流',
  //     },
  //     {
  //       type: 'text',
  //       content: '文章首/文尾有群二维码',
  //       style: 'padding-top:0',
  //     },
  //     {
  //       type: 'button',
  //       content: '作者博客',
  //       link: 'https://sugarat.top',
  //     },
  //     {
  //       type: 'button',
  //       content: '加群交流',
  //       props: { type: 'success' },
  //       link: 'https://theme.sugarat.top/group.html',
  //     },
  //   ],
  //   duration: 0,
  // },

  // buttonAfterArticle: {
  //   openTitle: '赞赏',
  //   closeTitle: '下次一定',
  //   content: '<img src="https://img.cdn.sugarat.top/mdImg/MTY0Nzc1NTYyOTE5Mw==647755629193">',
  //   icon: 'aliPay',
  // },

  recommend: { nextText: '换一组', pageSize: 9 },

  search: {
    btnPlaceholder: '搜索',
    placeholder: '搜索文档',
    emptyText: '空空如也',
    heading: '共: {{searchResult}} 条结果',
  },

  // 自定义图标
  groupIcon: { customIcon },
  RSS,
} as Theme.BlogConfig;
