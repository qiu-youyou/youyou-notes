<template>
  <div class="container">
    <div class="nav-container">
      <h1>常用资源导航</h1>
      <NavLink v-for="{ title, items } in NAV_DATA" :title="title" :items="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue';
import { NAV_DATA } from './data';
</script>

<style lang="scss" scoped>
.container {
  background-color: var(--vp-c-bg-soft);
}
.nav-container {
  width: 90%;
  margin: 0 auto;
}
h1 {
  padding: 24px 0;
  padding-top: 50px;
  font-size: 26px;
  font-weight: 700;
}
</style>
