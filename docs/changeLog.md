---
prev: false
next: false
date: false
aside: false
sidebar: false
outline: false
comment: false
readingTime: false
author: false
hidden: true
---

<script setup>
import { ref } from 'vue';
import { ElTag } from 'element-plus';

const logList = ref([])

const allDocs = !import.meta.env.SSR
  ? [...window.docs].filter(item => !item.meta.hidden)
      .sort((a, b) => b.meta.date.localeCompare(a.meta.date))
      .map(item => ({ ...item, ...item.meta,date: item.meta.date.slice(0, 10) }))
  : [];


const allDocsRes = {};
allDocs.forEach((item) => {
  if (!allDocsRes[item.date]) allDocsRes[item.date] = [];
  allDocsRes[item.date].push(item);
});
logList.value = allDocsRes

const getTag = (str) => {
  if(str.startsWith('/notes/')) return '发表了一篇笔记'
  if(str.startsWith('/wtf/')) return '记录了一个问题'
  return '发表了一篇笔记'
}

const tagType = ['primary', 'success', 'warning', 'danger']

</script>

# 更新记录

<template v-for="(item, key) in logList" :key="key">
  <h2>{{ key }}</h2>

  <ul>
    <li v-for="doc in item" :key="doc.route" style="position: relative;">
      {{ getTag(doc.route) }} 快来瞅瞅 👀 <a :href="doc.route">《{{ doc.title }}》</a>
      <span style="position: absolute; top: -1px;right: 0;">
        <template v-for="(tag, i) in doc.tag" :key="i" >
          <el-tag :type="tagType[i % tagType.length] || 'primary'" size="small" style="margin-right: 3px">{{ tag }}</el-tag>
        </template>
      </span>
    </li>
  </ul>
</template>
