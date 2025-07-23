<script setup>
import { ref } from 'vue';
import { ElIcon } from 'element-plus';
import { useRoute, useRouter } from 'vitepress';
import { Timer, UserFilled } from '@element-plus/icons-vue';

import { sidebarNote } from '../../config/sidebar/sidebar-note';
import { sidebarCoffee } from '../../config/sidebar/sidebar-coffee';
import { data as allDocs } from './docs.data';

const route = useRoute();
const router = useRouter();

// 类型归档
const docs = ref([]);
const docsLength = ref(0);
const typeArchive = ref({});

// 根据文档生成类型归档
const sidebarRes = {};
[...sidebarNote, ...sidebarCoffee].forEach((item) => (sidebarRes[item.link] = item));
typeArchive.value = sidebarRes;

// 处理所有文档生成摘要
const allDocsRes = [];
const allArticlesRes = {};

window.docs.forEach(({ route, meta }) => (allArticlesRes[route.replace('index', '')] = meta));

allDocs?.forEach((item) => {
  if (item.url.startsWith(route.path)) {
    allDocsRes.push({ ...item, ...allArticlesRes[item.url] });
  }
});

docsLength.value = allDocsRes.length;

// 文档按照月份分类
const docsByMonth = {};
allDocsRes.sort((a, b) => b.date.localeCompare(a.date));

allDocsRes.forEach((item) => {
  const date = item.date.substring(0, 7);
  (docsByMonth[date] ||= []).push(item);
});
docs.value = docsByMonth;

const handleCardClick = (url) => {
  router.go(url);
};
</script>

<template>
  <div class="container">
    <div v-if="!!Object.keys(docs).length">
      <div class="title-wrapper">
        <div class="title">
          <span class="title-text">{{ typeArchive?.[route.path]?.text }}</span>
          <span class="title-count">- 共 {{ docsLength }} 篇</span>
        </div>
      </div>

      <div style="margin-top: 80px">
        <template v-for="(month, i) in Object.keys(docs)" :key="i">
          <div>
            <div class="title-wrapper">
              <div class="title" style="left: 10%">
                <span class="title-text">{{ month }}</span>
                <span class="title-count">- 共 {{ docs[month].length }} 篇</span>
              </div>
            </div>
          </div>

          <div class="waterfall">
            <template v-for="(doc, i) in docs[month]" :key="i">
              <div class="card" @click="() => handleCardClick(doc?.url)">
                <span class="card-title">{{ doc?.title }}</span>
                <div class="card-description">
                  <span>{{ doc?.description }}</span>
                </div>

                <a v-for="(doch2, i) in doc?.extract.h2" :key="i" :href="doc?.url + '#' + doch2" class="card-text">
                  {{ doch2 }}
                </a>

                <div class="card-meta" style="margin-top: 10px">
                  <span>
                    <ElIcon><UserFilled style="transform: translateY(1px)" /></ElIcon>
                    Yòuyou
                  </span>
                  <span>
                    <ElIcon><Timer style="transform: translateY(2px)" /></ElIcon>
                    更新于：{{ doc?.date }}
                  </span>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div v-else style="width: 300px; margin: 100px auto 0 auto">
      <p class="des-text">这里空空如也......</p>
      <p class="des-text">作者比较懒 什么也没写 连样式都没写......</p>
    </div>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>
