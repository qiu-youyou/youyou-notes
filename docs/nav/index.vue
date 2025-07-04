<template>
  <div class="nav-container">
    <h1>常用资源导航</h1>
    <NavLink v-for="{ title, items } in NAV_DATA" :title="title" :items="items" />
  </div>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue';
import { NAV_DATA } from './data';
</script>

<style lang="scss" scoped>
.nav-container {
  width: 80%;
  margin: 20px auto;
}
h1 {
  padding: 24px 0;
  font-size: 26px;
  font-weight: 700;
}
</style>
