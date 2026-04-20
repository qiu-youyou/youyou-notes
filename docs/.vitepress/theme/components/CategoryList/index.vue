<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ElIcon } from 'element-plus';
import { useRoute, useRouter } from 'vitepress';
import { Timer, UserFilled, Close } from '@element-plus/icons-vue';

import { sidebarNote } from '../../config/sidebar/sidebar-note';
import { data as allDocs } from '../StatisticsList/docs.data';

const route = useRoute();
const router = useRouter();

// 模块级状态：避免组件因 URL 变化重建后重复播放入场动画
let hasPlayedCloudIntro = false;

// 创建 allDocs 映射，用于获取 H2 数据
const allDocsMap = {};
allDocs?.forEach((item) => {
  allDocsMap[item.url] = item;
});

// 获取所有文档数据（从 window.docs 获取，由 @sugarat/theme 提供）
const docs = computed(() => {
  // SSR 兼容：服务端返回空数组，客户端从 window.docs 获取
  if (import.meta.env.SSR) {
    return [];
  }
  return window.docs?.filter((item) => !item.meta?.hidden) || [];
});

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

// 标签云是否已初始化（用于控制入场动画）
const isCloudInitialized = ref(false);

// 缓存每个标签的旋转角度和位置，避免每次 computed 重新计算时变化
const tagCache = ref(new Map());

// 从 URL 参数初始化选中状态
const initFromUrl = () => {
  if (import.meta.env.SSR) return;
  const urlParams = new URLSearchParams(window.location.search);
  const catsParam = urlParams.get('categories');
  if (catsParam) {
    selectedCategories.value = catsParam.split(',').filter(Boolean);
  }
};

// 更新 URL 参数
const updateUrl = () => {
  if (import.meta.env.SSR) return;
  const url = new URL(window.location.href);
  if (selectedCategories.value.length > 0) {
    url.searchParams.set('categories', selectedCategories.value.join(','));
  } else {
    url.searchParams.delete('categories');
  }
  // 仅更新地址栏参数，不触发路由跳转，避免标签云组件重建导致动画重播
  window.history.replaceState({}, '', url.pathname + url.search + url.hash);
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
  let result = [];

  if (selectedCategories.value.length === 0) {
    result = docs.value || [];
  } else {
    result = (docs.value || []).filter((doc) => {
      const docUrl = doc.route || '';
      const match = docUrl.match(/\/notes\/([^/]+)\//);
      if (match) {
        const categoryName = match[1].toLowerCase();
        return selectedCategories.value.includes(categoryName);
      }
      return false;
    });
  }

  // 合并 allDocsMap 中的 extract 数据（包含 H2）
  return result.map((doc) => {
    const docUrl = doc.route || '';
    const allDocsData = allDocsMap[docUrl];
    return {
      ...doc,
      extract: allDocsData?.extract || { h1: '', h2: [] },
    };
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
  if (doc?.extract?.h2) {
    return doc.extract.h2;
  }
  return [];
};

// ========== 标签云相关 ==========

// 获取最大和最小文章数量
const countRange = computed(() => {
  const counts = Object.values(categoryCounts.value);
  const max = Math.max(...counts, 1);
  const min = Math.min(...counts, 0);
  return { max, min };
});

// 计算标签的权重（0-1）
const getWeight = (count) => {
  const { max, min } = countRange.value;
  if (max === min) return 0.5;
  return (count - min) / (max - min);
};

// 计算标签的字体大小（12px - 36px）
const getTagFontSize = (count) => {
  const weight = getWeight(count);
  const minSize = 12;
  const maxSize = 18;
  return minSize + weight * (maxSize - minSize);
};

// 计算标签的颜色（HSL）
const getTagColor = (count, isActive) => {
  if (isActive) {
    return { color: '#ffffff', bg: 'linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%)' };
  }

  const weight = getWeight(count);
  // 根据权重调整色相（200-280，蓝色到紫色）
  const hue = 200 + weight * 80;
  // 根据权重调整饱和度（60-90%）
  const saturation = 60 + weight * 30;
  // 根据权重调整亮度（35-55%）
  const lightness = 35 + weight * 20;

  return {
    color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    bg: 'transparent',
  };
};

// 计算标签的透明度
const getTagOpacity = (count) => {
  const weight = getWeight(count);
  return 0.8 + weight * 0.4;
};

// 计算标签的阴影
const getTagShadow = (count, isActive) => {
  if (isActive) {
    return '0 8px 32px rgba(var(--vp-c-brand-rgb), 0.4), 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.3)';
  }

  const weight = getWeight(count);
  const alpha = 0.1 + weight * 0.2;
  const blur = 8 + weight * 16;
  return `0 4px ${blur}px rgba(102, 126, 234, ${alpha})`;
};

// 螺旋分布算法 - 计算标签位置（带缓存）
const getTagPosition = (index, total) => {
  const cacheKey = `pos-${index}`;
  if (tagCache.value.has(cacheKey)) {
    return tagCache.value.get(cacheKey);
  }

  const centerX = 50; // 百分比
  const centerY = 50; // 百分比
  const maxRadius = 40; // 最大半径百分比

  // 使用黄金角度（137.5度）使分布更均匀
  const goldenAngle = 137.5 * (Math.PI / 180);
  const angle = index * goldenAngle;

  // 使用平方根缩放使标签分布更均匀
  const radius = Math.sqrt(index / total) * maxRadius;

  // 添加随机偏移使分布更自然
  const randomOffset = 3;
  const offsetX = (Math.random() - 0.5) * randomOffset;
  const offsetY = (Math.random() - 0.5) * randomOffset;

  const x = centerX + radius * Math.cos(angle) + offsetX;
  const y = centerY + radius * Math.sin(angle) + offsetY;

  const result = { x, y };
  tagCache.value.set(cacheKey, result);
  return result;
};

// 计算标签的旋转角度（带缓存）
const getTagRotation = (index) => {
  const cacheKey = `rot-${index}`;
  if (tagCache.value.has(cacheKey)) {
    return tagCache.value.get(cacheKey);
  }

  // 随机旋转 -10 到 10 度
  const rotation = (Math.random() - 0.5) * 20;
  tagCache.value.set(cacheKey, rotation);
  return rotation;
};

// 计算标签的入场延迟
const getTagDelay = (index) => {
  return index * 50; // 每个标签延迟 50ms
};

// 标签云数据
const cloudTags = computed(() => {
  return categories.value.map((cat, index) => {
    const count = categoryCounts.value[cat.name] || 0;
    const isActive = selectedCategories.value.includes(cat.name);
    const { x, y } = getTagPosition(index, categories.value.length);
    const rotation = getTagRotation(index);

    return {
      ...cat,
      count,
      isActive,
      position: { x, y },
      rotation,
      delay: getTagDelay(index),
      // 是否应该播放入场动画
      shouldAnimate: !isCloudInitialized.value,
      styles: {
        fontSize: getTagFontSize(count) + 'px',
        color: getTagColor(count, isActive).color,
        background: getTagColor(count, isActive).bg,
        opacity: getTagOpacity(count),
        boxShadow: getTagShadow(count, isActive),
        left: x + '%',
        top: y + '%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        '--tag-rotation': `${rotation}deg`,
        animationDelay: !isCloudInitialized.value ? `${getTagDelay(index)}ms` : '0ms',
      },
    };
  });
});

onMounted(() => {
  initFromUrl();

  // 若本页面生命周期内已经播放过一次入场动画，后续挂载直接禁用动画
  if (hasPlayedCloudIntro) {
    isCloudInitialized.value = true;
    return;
  }

  // 首次挂载允许播放入场动画；立即标记，防止点击 tag 导致重挂载后再次播放
  hasPlayedCloudIntro = true;

  // 等待首次入场动画完成后，切换到稳定态（去掉 animate-in class）
  const totalDelay = (categories.value.length - 1) * 50 + 1000;
  setTimeout(() => {
    isCloudInitialized.value = true;
  }, totalDelay);
});
</script>

<template>
  <div class="category-container">
    <!-- 分类标签云区域 -->
    <div class="categories-wrapper">
      <div class="categories-header">
        <h2 class="categories-title">分类</h2>
        <span class="categories-count">共 {{ categories.length }} 个分类</span>
      </div>

      <!-- 标签云容器 -->
      <div class="tag-cloud-container">
        <div class="tag-cloud">
          <button
            v-for="tag in cloudTags"
            :key="tag.name"
            class="cloud-tag"
            :class="{
              active: tag.isActive,
              'animate-in': tag.shouldAnimate,
            }"
            :style="tag.styles"
            @click="toggleCategory(tag.name)">
            <span class="tag-name">{{ tag.text }}</span>
            <span class="tag-count">{{ tag.count }}</span>
          </button>
        </div>
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
      <p class="empty-text">作者比较懒 什么也没写 连样式都没写......</p>
    </div>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>
