<script setup>
import { ref } from 'vue';
import { ElIcon } from 'element-plus';
import { useRoute, useRouter } from 'vitepress';
import { Timer, UserFilled } from '@element-plus/icons-vue';

import { sidebarNote } from '../../config/sidebar/sidebar-note';
import { sidebarOther } from '../../config/sidebar/sidebar-other';
import { data as allDocs } from './docs.data';

const route = useRoute();
const router = useRouter();

// 类型归档
const docs = ref([]);
const docsLength = ref(0);
const typeArchive = ref({});

// 根据文档生成类型归档
const sidebarRes = {};
[...sidebarNote, ...sidebarOther].forEach((item) => (sidebarRes[item.link] = item));
typeArchive.value = sidebarRes;

// 处理所有文档生成摘要
const allDocsRes = [];
const allArticlesRes = {};

window.docs.forEach(({ route, meta }) => (allArticlesRes[route.replace('index', '')] = meta));

allDocs?.forEach((item) => {
  if (route.path.startsWith('/notes/all')) {
    allDocsRes.push({ ...item, ...allArticlesRes[item.url] });
  } else if (item.url.startsWith(route.path)) {
    allDocsRes.push({ ...item, ...allArticlesRes[item.url] });
  }
});

docsLength.value = allDocsRes.length;

docs.value = allDocsRes;

const handleCardClick = (route) => {
  if (!route) return;
  // 确保去掉末尾的 'index'
  const path = String(route).replace(/index$/, '');
  router.go(path);
};
</script>

<template>
  <div class="container">
    <div v-if="!!docs.length">
      <div class="title-wrapper">
        <div class="title">
          <span class="title-text">
            {{ typeArchive?.[route.path]?.text }}
          </span>
          <span class="title-count">- 共 {{ docsLength }} 篇</span>
        </div>
      </div>

      <div>
        <div class="waterfall">
          <template v-for="(doc, i) in docs" :key="i">
            <div class="card" @click.stop="handleCardClick(doc?.url)">
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
                  更新于：{{ doc?.date?.substring(0, 10) }}
                </span>
              </div>
            </div>
          </template>
        </div>
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
