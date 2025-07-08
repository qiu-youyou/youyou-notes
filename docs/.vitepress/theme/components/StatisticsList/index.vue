<script setup>
import { useRoute } from 'vitepress';
import { data } from './docs.data';

const route = useRoute();
const currentDocs = data.filter((item) => item.url.startsWith(route.path));
</script>

<template>
  <div v-if="!!currentDocs.length" class="waterfall">
    <div v-for="(doc, i) in currentDocs" :key="i" class="card">
      <a :href="doc.url" class="card-title">{{ doc.extract.h1 }}</a>
      <div v-if="!!doc?.description" class="card-description">
        <span>{{ doc.description }}</span>
      </div>
      <a v-for="(doch2, i) in doc.extract.h2" :key="i" :href="doc.url + '#' + doch2" class="card-text">{{ doch2 }}</a>
      <!-- <div class="card-meta" style="margin-top: 10px">
        <a :href="doc.url" class="card-link">👉</a>
      </div> -->
    </div>
  </div>
  <div v-else>
    <p class="des-text">这里空空如也......</p>
    <p class="des-text">作者比较懒 什么也没写 连样式都没写......</p>
  </div>
</template>

<style scoped>
@import './index.scss';
</style>
