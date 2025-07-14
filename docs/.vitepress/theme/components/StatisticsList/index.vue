<script setup>
import { useRoute, useRouter } from 'vitepress';
import { data } from './docs.data';

const route = useRoute();
const router = useRouter();
const currentDocs = data.filter((item) => item.url.startsWith(route.path));
const handleCardClick = (url) => {
  router.go(url);
};
</script>

<template>
  <div v-if="!!currentDocs.length" class="waterfall">
    <template v-for="(doc, i) in currentDocs" :key="i">
      <div class="card" @click="() => handleCardClick(doc.url)">
        <a :href="doc.url" class="card-title">{{ doc.extract.h1 }}</a>
        <div class="card-description">
          <span>{{ doc.description || doc.extract.desc }}</span>
        </div>
        <a v-for="(doch2, i) in doc.extract.h2" :key="i" :href="doc.url + '#' + doch2" class="card-text">{{ doch2 }}</a>
        <!-- <div class="card-meta" style="margin-top: 10px">
        <a :href="doc.url" class="card-link">👉</a>
      </div> -->
      </div>
    </template>
  </div>
  <div v-else style="width: 300px; margin: 100px auto 0 auto">
    <p class="des-text">这里空空如也......</p>
    <p class="des-text">作者比较懒 什么也没写 连样式都没写......</p>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>
