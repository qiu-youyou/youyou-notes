<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ElIcon } from 'element-plus';
import { useRoute, useRouter } from 'vitepress';
import { Timer, UserFilled, Close } from '@element-plus/icons-vue';

import { sidebarNote } from '../../config/sidebar/sidebar-note';

const route = useRoute();
const router = useRouter();

// 获取所有文档数据（从 window.docs 获取，由 @sugarat/theme 提供）
const docs = computed(() => window.docs || []);

// 分类数据
const categories = computed(() => {
  return sidebarNote.map((item) => ({
    text: item.text,
    link: item.link,
    // 提取分类名称（如 /notes/javascript/ -> javascript）
    name: item.link.replace(/\/notes\/([^/]+)\/$/, '$1').toLowerCase(),
  }));
});

// 计算每个分类的文章数量
const categoryCounts = computed(() => {
  const counts = {};
  categories.value.forEach((cat) => {
    counts[cat.name] = 0;
  });

  docs.value?.forEach((doc) => {
    const docUrl = doc.route || '';
    // 匹配 /notes/category/xxx.md 格式
    const match = docUrl.match(/\/notes\/([^/]+)\//);
    if (match) {
      const categoryName = match[1].toLowerCase();
      if (counts[categoryName] !== undefined) {
        counts[categoryName]++;
      }
    }
  });

  return counts;
});

// 选中的分类
const selectedCategories = ref([]);

// 从 URL 参数初始化选中状态
const initFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catsParam = urlParams.get('categories');
  if (catsParam) {
    selectedCategories.value = catsParam.split(',').filter(Boolean);
  }
};

// 更新 URL 参数
const updateUrl = () => {
  const url = new URL(window.location.href);
  if (selectedCategories.value.length > 0) {
    url.searchParams.set('categories', selectedCategories.value.join(','));
  } else {
    url.searchParams.delete('categories');
  }
  router.go(url.pathname + url.search);
};

// 监听 URL 变化
watch(
  () => route.path,
  () => {
    initFromUrl();
  },
  { immediate: true },
);

// 切换分类选中状态
const toggleCategory = (categoryName) => {
  const index = selectedCategories.value.indexOf(categoryName);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(categoryName);
  }
  updateUrl();
};

// 清空所有选中
const clearSelection = () => {
  selectedCategories.value = [];
  updateUrl();
};

// 筛选后的文档
const filteredDocs = computed(() => {
  if (selectedCategories.value.length === 0) {
    return docs.value || [];
  }

  return (docs.value || []).filter((doc) => {
    const docUrl = doc.route || '';
    const match = docUrl.match(/\/notes\/([^/]+)\//);
    if (match) {
      const categoryName = match[1].toLowerCase();
      return selectedCategories.value.includes(categoryName);
    }
    return false;
  });
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

onMounted(() => {
  initFromUrl();
});
</script>

<template>
  <div class="category-container">
    <!-- 分类标签区域 -->
    <div class="categories-wrapper">
      <div class="categories-header">
        <h2 class="categories-title">分类</h2>
        <span class="categories-count">共 {{ categories.length }} 个分类</span>
      </div>
      <div class="categories-list">
        <button
          v-for="cat in categories"
          :key="cat.name"
          class="category-tag"
          :class="{ active: selectedCategories.includes(cat.name) }"
          @click="toggleCategory(cat.name)">
          <span class="category-name">{{ cat.text }}</span>
          <span class="category-count">({{ categoryCounts[cat.name] || 0 }})</span>
        </button>
      </div>
    </div>

    <!-- 筛选状态栏 -->
    <div v-if="selectedCategories.length > 0" class="filter-status">
      <div class="filter-info">
        <span class="filter-label">当前筛选：</span>
        <span v-for="catName in selectedCategories" :key="catName" class="filter-tag">
          {{ categories.find((c) => c.name === catName)?.text || catName }}
          <ElIcon class="close-icon" @click="toggleCategory(catName)">
            <Close />
          </ElIcon>
        </span>
        <button class="clear-btn" @click="clearSelection">清空筛选</button>
      </div>
      <span class="result-count">共 {{ filteredDocs.length }} 篇文章</span>
    </div>

    <!-- 文档瀑布流 -->
    <div v-if="filteredDocs.length > 0" class="docs-waterfall">
      <div v-for="(doc, index) in filteredDocs" :key="index" class="doc-card" @click="handleCardClick(doc.route)">
        <h3 class="doc-title">{{ doc.meta?.title || 'Untitled' }}</h3>
        <p v-if="doc.meta?.description" class="doc-description">
          {{ doc.meta.description }}
        </p>
        <div v-if="getH2Headings(doc).length > 0" class="doc-headings">
          <a
            v-for="(heading, idx) in getH2Headings(doc)"
            :key="idx"
            :href="doc.route + '#' + heading"
            class="doc-heading-link"
            @click.stop>
            {{ heading }}
          </a>
        </div>
        <div class="doc-meta">
          <span class="meta-item">
            <ElIcon><UserFilled /></ElIcon>
            Yòuyou
          </span>
          <span class="meta-item">
            <ElIcon><Timer /></ElIcon>
            更新于：{{ formatDate(doc.meta?.date) }}
          </span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p class="empty-text">这里空空如也......</p>
      <p class="empty-text">没有找到相关文章</p>
    </div>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>
