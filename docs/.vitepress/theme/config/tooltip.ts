import { Theme } from '@sugarat/theme';

export default {
  alert: {
    type: 'success',
    title: '本站风格更新啦! 🎉🎉🎉',
    duration: 30000,
  },

  popover: {
    title: '公告',
    body: [
      { type: 'text', content: '👇公众号👇---👇 微信 👇' },
      {
        type: 'image',
        src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp',
      },
      {
        type: 'text',
        content: '欢迎大家加群&私信交流',
      },
      {
        type: 'text',
        content: '文章首/文尾有群二维码',
        style: 'padding-top:0',
      },
      {
        type: 'button',
        content: '作者博客',
        link: 'https://sugarat.top',
      },
      {
        type: 'button',
        content: '加群交流',
        props: { type: 'success' },
        link: 'https://theme.sugarat.top/group.html',
      },
    ],
    duration: 0,
  },

  buttonAfterArticle: {
    openTitle: '赞赏',
    closeTitle: '下次一定',
    content: '<img src="https://img.cdn.sugarat.top/mdImg/MTY0Nzc1NTYyOTE5Mw==647755629193">',
    icon: 'aliPay',
  },

  search: {
    btnPlaceholder: 'Search',
    placeholder: 'Search Docs',
    emptyText: 'No results found',
    heading: 'Total: {{searchResult}} search results.',
  },
} as Theme.BlogConfig;
