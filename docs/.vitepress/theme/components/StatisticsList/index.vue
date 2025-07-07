<script setup>
import { useRoute } from 'vitepress';
import { data } from './docs.data';

const route = useRoute();
const currentDocs = data.filter((item) => item.url.startsWith(route.path));
</script>

<template>
  <div v-if="!!currentDocs.length"></div>
  <div v-else>这里作者还没有更新内容哦</div>
  <ul>
    <!-- <li v-for="post of data"> -->
    <!-- <a :href="post.url">{{ post.frontmatter.title }}</a> -->
    <!-- <span>by {{ post.frontmatter.author }}</span> -->
    <!-- </li> -->
  </ul>
</template>
