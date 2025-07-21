<script setup lang="ts">
import { computed } from 'vue';
import NavItem from './NavItem.vue';
import type { NavLink } from './types';
import { slugify } from '@mdit-vue/shared';

const props = defineProps<{
  title: string;
  noIcon?: boolean;
  items: NavLink[];
}>();

const formatTitle = computed(() => {
  return slugify(props.title);
});
</script>

<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    <div class="title-wrapper">
      <div class="title">{{ title }}</div>
    </div>
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h2>
  <div class="nav-links">
    <NavItem v-for="item in items" :noIcon="noIcon" v-bind="item" />
  </div>
</template>

<style scoped>
h2 {
  margin: 55px 0;
  font-size: 20px;
  font-weight: 500;
}

.title-wrapper {
  height: 1px;
  background: var(--vp-c-gray-2);
  position: relative;
  .title {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translate(-50%) translateY(-50%);
    background: var(--vp-c-bg-soft);
    padding: 0 var(--weiz-spacing-8xl);
    font-size: var(--weiz-font-size-xl);
    font-weight: var(--weiz-font-weight-bold);
    line-height: var(--weiz-text-xl-line-height);
    text-align: center;
    padding: 0 40px;
  }
}

.nav-links {
  --nav-gap: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--nav-gap);
  grid-column-gap: var(--nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--nav-gap);
}

@media (min-width: 500px) {
  .nav-links {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (min-width: 640px) {
  .nav-links {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
}

@media (min-width: 768px) {
  .nav-links {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
}

@media (min-width: 960px) {
  .nav-links {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1440px) {
  .nav-links {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (min-width: 960px) {
  .nav-links {
    --nav-gap: 20px;
  }
}

@media (min-width: 960px) {
  .nav-links {
    --nav-gap: 20px;
  }
}
</style>
