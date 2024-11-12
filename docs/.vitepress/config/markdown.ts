import { UserConfig } from "vitepress";

export const markdown: UserConfig["markdown"] = {
  lineNumbers: true,
  image: { lazyLoading: true },
  // ArticleMeta 组件插入标题下

  config: (md) => {
    md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
      let htmlResult = slf.renderToken(tokens, idx, options);
      if (tokens[idx].tag === "h1") htmlResult += `<ArticleMeta />`;
      return htmlResult;
    };
  },
};
