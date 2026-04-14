<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vitepress';
import { ElIcon } from 'element-plus';
import { Timer, UserFilled } from '@element-plus/icons-vue';

const router = useRouter();

// 获取所有文档数据
const docs = computed(() => window.docs || []);

// 筛选 insights 目录下的文档
const insightsDocs = computed(() => {
  return (docs.value || [])
    .filter((doc) => {
      const route = doc.route || '';
      return route.startsWith('/insights/') && !doc.meta?.hidden;
    })
    .sort((a, b) => (b.meta?.date || '').localeCompare(a.meta?.date || ''));
});

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = String(dateStr).slice(0, 10);
    return d;
  } catch (e) {
    return '';
  }
};

// 处理卡片点击
const handleCardClick = (docUrl) => {
  if (!docUrl) return;
  const path = String(docUrl).replace(/index$/, '');
  router.go(path);
};

// 获取文档的二级标题
const getH2Headings = (doc) => {
  if (doc?.meta?.extract?.h2) {
    return doc.meta.extract.h2;
  }
  return [];
};
</script>

<template>
  <div class="insights-container">
    <div v-if="insightsDocs.length > 0" class="insights-list">
      <div v-for="(doc, index) in insightsDocs" :key="index" class="insight-card" @click="handleCardClick(doc.route)">
        <h3 class="insight-title">{{ doc.meta?.title || 'Untitled' }}</h3>
        <p v-if="doc.meta?.description" class="insight-description">
          {{ doc.meta.description }}
        </p>
        <div v-if="getH2Headings(doc).length > 0" class="insight-headings">
          <a
            v-for="(heading, idx) in getH2Headings(doc)"
            :key="idx"
            :href="doc.route + '#' + heading"
            class="insight-heading-link"
            @click.stop>
            {{ heading }}
          </a>
        </div>
        <div class="insight-meta">
          <span class="meta-item">
            <ElIcon><UserFilled /></ElIcon>
            Yòuyou
          </span>
          <span class="meta-item">
            <ElIcon><Timer /></ElIcon>
            {{ formatDate(doc.meta?.date) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p class="empty-text">这里空空如也......</p>
      <p class="empty-text">还没有发布任何见解文章</p>
    </div>
  </div>
</template>

<style scoped>
.insights-container {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--vp-c-bg);
}

.insights-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .insights-list {
    grid-template-columns: 1fr;
  }
}

.insight-card {
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.insight-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.insight-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--vp-c-text-1);
  transition: color 0.35s;
  font-family: 'PingFang SC', 'Microsoft Yahei', sans-serif;
  line-height: 1.5;
}

.insight-card:hover .insight-title {
  color: var(--vp-c-brand);
}

.insight-description {
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-3);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'PingFang SC', sans-serif;
}

.insight-headings {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.insight-heading-link {
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
  font-family: 'PingFang SC', sans-serif;
}

.insight-heading-link:hover {
  color: var(--vp-c-brand);
}

.insight-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-family: Georgia, sans-serif;
}

.empty-state {
  text-align: center;
  padding: 100px 20px;
}

.empty-text {
  font-size: 16px;
  color: var(--vp-c-text-3);
  margin: 10px 0;
  font-family: 'PingFang SC', sans-serif;
}
</style>
