<script setup>
import { ref } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();

// 类型归档
const docs = ref([]);
const docsLength = ref(0);

// 处理所有文档生成摘要
const allDocsRes = [...window.docs].filter((item) => !item.meta?.hidden) || [];
docsLength.value = allDocsRes.length;

const docsByYearMonthMap = new Map();

allDocsRes
  .sort((a, b) => (b.meta?.date || '').localeCompare(a.meta?.date || ''))
  .forEach((item) => {
    const dateStr = item.meta?.date || '';
    const year = dateStr.substring(0, 4) || 'Unknown';
    const month = dateStr.substring(5, 7) || 'Unknown';

    if (!docsByYearMonthMap.has(year)) {
      docsByYearMonthMap.set(year, new Map());
    }
    const monthsMap = docsByYearMonthMap.get(year);
    if (!monthsMap.has(month)) {
      monthsMap.set(month, []);
    }
    monthsMap.get(month).push(item);
  });

// 转成数组方便 Vue v-for 渲染
docs.value = Array.from(docsByYearMonthMap, ([year, monthsMap]) => ({
  year,
  months: Array.from(monthsMap, ([month, posts]) => ({
    month,
    posts,
  })),
}));

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
        <h3 class="archive-year">
          <p class="archive-year-left">{{ years.year }}</p>
          <p class="archive-year-right">共 {{ docsLength }} 篇</p>
        </h3>

        <template v-for="(months, idx) in years.months" :key="idx">
          <h4 class="archive-month">
            <p class="archive-month-left">{{ months.month }}</p>
            <p class="archive-month-right">{{ months.posts.length }} 篇</p>
          </h4>
          <ul class="archive-list">
            <li
              class="post-item"
              v-for="(item, idx) in months.posts"
              @click.stop="handleCardClick(item.route)"
              role="button"
              tabindex="0"
              :key="idx">
              <div class="post-row">
                <div class="post-left">
                  <span class="dot" aria-hidden="true"></span>
                  <span class="post-title">
                    <span class="post-date">{{ formatMMDD(item.meta?.date) }}</span>
                    {{ item.meta?.title || 'Untitled' }}
                  </span>
                </div>

                <div class="post-right">
                  <div class="post-tags" v-if="getTags(item.meta).length">
                    <span class="tag" v-for="(t, k) in getTags(item.meta)" :key="k">
                      {{ t }}
                      <span class="tag-point" v-if="k != getTags(item.meta).length - 1">·</span>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </template>
    </div>

    <div v-else class="empty-wrap">
      <p class="des-text">这里空空如也......</p>
      <p class="des-text">作者比较懒 什么也没写 ......</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../StatisticsList/index.scss';

.archive-container {
  width: 70vw;
  height: 100%;
  padding: 14px 28px;
  margin: 40px auto 180px auto;
  border-radius: 12px;
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-4);
  transition: all 0.35s;
}

.archive-year {
  margin: 10px 0px 10px 0px;
  font-family: Georgia, sans-serif;
  border-bottom: 1px solid #e0e0e0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left {
    font-size: 28px;
    color: var(--vp-c-gray);
    font-weight: 700;
  }
  &-right {
    font-size: 16px;
    color: var(--vp-c-gray);
    transform: translateY(8px);
  }
}

.archive-month {
  margin: 10px 0px 10px 10px;
  font-family: Georgia, sans-serif;
  border-bottom: 1px solid #ededed;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left {
    font-size: 24px;
    color: var(--vp-c-gray);
    font-weight: 700;
  }
  &-right {
    font-size: 13px;
    color: var(--vp-c-gray);
    transform: translateY(8px);
  }
}

.archive-list {
  list-style: none;
  margin: 0;
  padding: 0 0px 0 10px;
}

.post-item {
  padding: 4px 8px;
  display: block;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.35s;
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
  transform: translateY(1px);
}

.post-title {
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  font-family: 'PingFang SC', 'Microsoft Yahei', sans-serif;
}

.post-date {
  color: var(--vp-c-text-2);
  font-size: 15px;
  min-width: 72px;
  margin-right: 12px;
  font-family: Georgia, sans-serif;
}

.post-right {
  color: var(--vp-c-text-2);
  font-size: 14px;
  min-width: 72px;
  text-align: right;
  font-family: Georgia, sans-serif;
}

.post-tags {
  display: inline-block;
  flex-wrap: wrap;
  background-color: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 0px 10px;
  height: 20px;
  line-height: 17px;
  transform: translateY(-1px);
}

.tag-point {
  font-weight: 700;
  font-size: 20px;
  vertical-align: top;
  margin: 0 4px 0 2px;
}

.tag {
  font-size: 12px;
  color: var(--vp-c-text-2);
  padding: 0;
}

.post-item:hover {
  .post-title {
    color: var(--vp-c-brand-1);
  }
  background-color: var(--vp-c-bg-soft);
  transform: translateX(15px);
}

.empty-wrap {
  width: 300px;
  margin: 100px auto 0 auto;
  text-align: center;
}

@media (max-width: 1680px) {
  .archive-container {
    width: 70vw;
  }
}
@media (max-width: 1200px) {
  .archive-container {
    width: 70vw;
  }
}
@media (max-width: 960px) {
  .archive-container {
    width: 80vw;
  }
}
@media (max-width: 600px) {
  .archive-container {
    width: 90vw;
  }
}

@media (max-width: 720px) {
  .archive-container {
    padding: 0 12px;
    width: 90vw;
  }
  .post-right {
    min-width: 56px;
    font-size: 13px;
  }
}
</style>
