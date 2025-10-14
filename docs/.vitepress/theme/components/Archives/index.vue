<script setup>
import { ref } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();

// 类型归档
const docs = ref([]);
const docsLength = ref(0);

// 处理所有文档生成摘要
const allDocsRes = [...window.docs].filter((item) => !item.meta?.hidden) || [];
const allArticlesRes = {};

allDocsRes.forEach(({ route, meta }) => (allArticlesRes[route.replace('index', '')] = meta));

docsLength.value = allDocsRes.length;

const docsByYearMap = new Map();

allDocsRes
  .sort((a, b) => (b.meta?.date || '').localeCompare(a.meta?.date || ''))
  .forEach((item) => {
    const year = (item.meta?.date || '').substring(0, 4) || 'Unknown';
    if (!docsByYearMap.has(year)) {
      docsByYearMap.set(year, []);
    }
    docsByYearMap.get(year).push(item);
  });

// 转成数组方便 Vue v-for 渲染
docs.value = Array.from(docsByYearMap, ([year, posts]) => ({ year, posts }));

// 格式化为 MM-DD，兼容 'YYYY-MM-DD' 和带时区的 ISO 字符串
const formatMMDD = (dateStr) => {
  if (!dateStr) return '--';
  try {
    const d = String(dateStr).slice(0, 10); // 'YYYY-MM-DD'
    return d.slice(5, 10);
  } catch (e) {
    return '--';
  }
};

// 从 meta 中提取标签，支持 array 或逗号分隔字符串，兼容 tag 旧字段
const getTags = (meta = {}) => {
  const t = meta.tag;
  if (!t) return [];
  if (Array.isArray(t)) return t.map((s) => String(s).trim()).filter(Boolean);
  return String(t)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

const handleCardClick = (route) => {
  if (!route) return;
  // 确保去掉末尾的 'index'
  const path = String(route).replace(/index$/, '');
  router.go(path);
};
</script>

<template>
  <div class="archive-container">
    <div v-if="docs.length">
      <template v-for="(years, i) in docs" :key="i">
        <h3 class="archive-year">{{ years.year }}</h3>
        <ul class="archive-list">
          <li
            class="post-item"
            v-for="(item, idx) in years.posts"
            :key="idx"
            @click.stop="handleCardClick(item.route)"
            role="button"
            tabindex="0">
            <div class="post-row">
              <div class="post-left">
                <span class="dot" aria-hidden="true"></span>
                <span class="post-title">
                  {{ item.meta?.title || 'Untitled' }}
                  <div class="post-tags" v-if="getTags(item.meta).length">
                    <span class="tag" v-for="(t, k) in getTags(item.meta)" :key="k">
                      {{ t }}
                      <span class="tag-point" v-if="k != getTags(item.meta).length - 1">·</span>
                    </span>
                  </div>
                </span>
              </div>
              <div class="post-right">{{ formatMMDD(item.meta?.date) }}</div>
            </div>
          </li>
        </ul>
      </template>
    </div>

    <div v-else class="empty-wrap">
      <p class="des-text">这里空空如也......</p>
      <p class="des-text">作者比较懒 什么也没写 ......</p>
    </div>
  </div>
</template>

<style scoped>
@import '../StatisticsList/index.scss';

.archive-container {
  width: 60vw;
  margin: 10px auto 60px;
  padding: 0 18px;
}

.archive-year {
  font-size: 26px;
  font-weight: 700;
  margin: 38px 12px 28px 0px;
  color: var(--vp-c-gray);
  font-family: Georgia, sans-serif;
}

.archive-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-item {
  padding: 3px 8px;
  display: block;
  cursor: pointer;
}

.post-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.post-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.dot {
  width: 5px;
  height: 5px;
  background: var(--vp-c-brand-1);
  border-radius: 50%;
  display: inline-block;
  margin-left: 4px;
}

.post-title {
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: 400;
  font-family: 'PingFang SC', 'Microsoft Yahei', sans-serif;
}

.post-right {
  color: var(--vp-c-text-2);
  font-size: 14px;
  min-width: 72px;
  text-align: right;
  font-family: Georgia, sans-serif;
}

.post-tags {
  margin-left: 20px;
  display: inline-block;
  flex-wrap: wrap;
  background-color: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0px 10px;
  height: 20px;
  line-height: 18px;
  transform: translateY(-1px);
}

.tag-point {
  font-weight: 700;
  font-size: 20px;
  vertical-align: bottom;
  margin-right: 4px;
  /* padding: 0 8px; */
}

.tag {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 0;
}

.post-item:hover .post-title {
  color: var(--vp-c-brand-1);
}

.empty-wrap {
  width: 300px;
  margin: 100px auto 0 auto;
  text-align: center;
}

@media (max-width: 720px) {
  .archive-container {
    padding: 0 12px;
  }
  .post-right {
    min-width: 56px;
    font-size: 13px;
  }
}
</style>
