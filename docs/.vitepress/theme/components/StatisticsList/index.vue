<script setup>
import { ref } from 'vue';
import { ElIcon } from 'element-plus';
import { useRoute, useRouter } from 'vitepress';
import { Timer, UserFilled } from '@element-plus/icons-vue';

import { sidebarNote } from '../../config/sidebar/sidebar-note';
import { sidebarCoffee } from '../../config/sidebar/sidebar-coffee';
import { data } from './docs.data';

const docs = ref({});
const route = useRoute();
const router = useRouter();
const sidebarData = ref({});

const currentDocs = data.filter((item) => item.url.startsWith(route.path));

const sidebarRes = {};
[...sidebarNote, ...sidebarCoffee].forEach((item) => {
  sidebarRes[item.link] = item;
});
sidebarData.value = sidebarRes;

const docsRes = {};
window.docs?.forEach(({ route, meta }) => {
  docsRes[route.replace('index', '')] = meta;
});
docs.value = docsRes;

const handleCardClick = (url) => {
  router.go(url);
};
</script>

<template>
  <div class="container">
    <div v-if="!!currentDocs.length">
      <div class="title-wrapper">
        <div class="title">
          <span class="title-text">{{ sidebarData?.[route.path]?.text }}</span>
          <span class="title-count">- 共 {{ currentDocs?.length }} 篇</span>
        </div>
      </div>

      <div class="waterfall">
        <template v-for="(doc, i) in currentDocs" :key="i">
          <div class="card" @click="() => handleCardClick(doc.url)">
            <span class="card-title">{{ docs?.[doc.url]?.title }}</span>
            <div class="card-description">
              <span>{{ docs?.[doc.url]?.description }}</span>
            </div>

            <a v-for="(doch2, i) in doc.extract.h2" :key="i" :href="doc.url + '#' + doch2" class="card-text">
              {{ doch2 }}
            </a>

            <div class="card-meta" style="margin-top: 10px">
              <span>
                <ElIcon><UserFilled style="transform: translateY(1px)" /></ElIcon>
                Yòuyou
              </span>
              <span>
                <ElIcon><Timer style="transform: translateY(2px)" /></ElIcon>
                更新于：{{ docs?.[doc.url]?.date }}
              </span>
            </div>
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
