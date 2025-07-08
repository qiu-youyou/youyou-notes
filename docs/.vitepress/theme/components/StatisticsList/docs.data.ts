import { createContentLoader } from 'vitepress';

interface DocsList {
  title: string | undefined;
  url: string | undefined;
  extract: { h1: string; h2: string[] } | undefined;
}

// 提取 raw 中的 一级标题 和 二级标题 生成概要
function extractHeadings(markdown?: string): { h1: string; h2: string[] } {
  if (!markdown) return { h1: '', h2: [] };
  let h1: string = '';
  const h2: string[] = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (!h1 && line.startsWith('# ')) {
      h1 = line.replace(/^# /, '').trim();
      continue;
    }
    if (line.startsWith('## ')) {
      h2.push(line.replace(/^## /, '').trim());
    }
  }
  return { h1, h2 };
}

export default createContentLoader('**/*.md', {
  includeSrc: true, // 包含原始 markdown 源
  transform(raw): DocsList[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.hidden)
      .map(({ url, frontmatter, src }) => ({
        title: frontmatter.title,
        extract: extractHeadings(src),
        description: frontmatter?.description,
        url,
        src,
      }));
  },
});
