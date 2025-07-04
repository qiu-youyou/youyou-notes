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
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h2>
  <div class="nav-links">
    <NavItem v-for="item in items" :noIcon="noIcon" v-bind="item" />
  </div>
</template>

<style scoped>
h2 {
  margin: 30px 0;
  font-size: 20px;
  font-weight: 500;
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
