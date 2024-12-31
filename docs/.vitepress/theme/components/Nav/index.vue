<template>
  <!-- <h1>常用工具类库</h1> -->

  <NavLink v-for="{ title, items } in NAV_DATA" :title="title" :items="items" />
</template>

<script setup lang="ts">
import NavLink from "./NavLink.vue";
import { NAV_DATA } from "./data";
</script>

<style scoped>
h1 {
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
