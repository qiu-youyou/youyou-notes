<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vitepress';

const router = useRouter();

// 类型归档
const docs = ref([]);
const docsLength = ref(0);

// 处理所有文档生成摘要
const allDocsRes = [...window.docs].filter((item) => !item.meta.hidden) || [];
const allArticlesRes = {};

allDocsRes.forEach(({ route, meta }) => (allArticlesRes[route.replace('index', '')] = meta));

docsLength.value = allDocsRes.length;

// 文档按照年分类
const docsByMonth = {};
allDocsRes.sort((a, b) => b.meta.date.localeCompare(a.meta.date));

allDocsRes.forEach((item) => {
  const date = item.meta.date.substring(0, 4);
  (docsByMonth[date] ||= []).push(item);
});
docs.value = docsByMonth;

console.log(docs.value);

const handleCardClick = (url) => {
  router.go(url);
};
</script>

<template>
  <div class="container">
    <div v-if="!!Object.keys(docs).length">
    </div>

    <div v-else style="width: 300px; margin: 100px auto 0 auto">
      <p class="des-text">这里空空如也......</p>
      <p class="des-text">作者比较懒 什么也没写 连样式都没写......</p>
    </div>
  </div>
</template>

<style scoped>
@import '../StatisticsList/index.scss';
</style>
