<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { slugify } from '@mdit-vue/shared';
import { NavLink } from './types';

const props = defineProps<{
  noIcon?: boolean;
  icon?: NavLink['icon'];
  badge?: NavLink['badge'];
  title?: NavLink['title'];
  desc?: NavLink['desc'];
  link: NavLink['link'];
}>();

const formatTitle = computed(() => {
  if (!props.title) {
    return '';
  }
  return slugify(props.title);
});

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg;
  return '';
});

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' };
  }
  return props.badge;
});
</script>

<template>
  <a v-if="link" class="nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <div v-if="svg" class="icon" v-html="svg"></div>
          <div v-else-if="icon && typeof icon === 'string'" class="icon">
            <img :src="withBase(icon)" :alt="title" onerror="this.parentElement.style.display='none'" />
          </div>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">
          {{ title }}
        </h5>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style scoped>
.vp-doc a {
  text-decoration: none !important;
}
.nav-link {
  --nav-icon-box-size: 45px;
  --nav-icon-size: 40px;
  --nav-box-gap: 12px;

  display: block;
  border: 1px solid var(--vp-c-bg);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
  transition: all 0.35s;
}

.nav-link:hover {
  /* border-color: var(--vp-c-brand); */
  text-decoration: initial;
  transform: scale(1.05);
}

.nav-link .box {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: var(--nav-box-gap);
  height: 100%;
  color: var(--vp-c-text-1);
}

.nav-link .box .has-badge {
  padding-top: calc(var(--nav-box-gap) + 2px);
}

.nav-link .box-header {
  display: flex;
  align-items: center;
}

.nav-link .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: calc(var(--nav-box-gap) - 2px);
  border-radius: 6px;
  width: var(--nav-icon-box-size);
  height: var(--nav-icon-box-size);
  font-size: var(--nav-icon-size);
  background-color: var(--vp-c-bg-down);
  transition: background-color 0.35s;
}

.nav-link .icon svg {
  width: var(--nav-icon-size);
  fill: currentColor;
}

.nav-link .icon img {
  border-radius: 4px;
  width: var(--nav-icon-size);
}

.nav-link .title {
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
}

.nav-link .badge {
  position: absolute;
  top: 2px;
  right: 0;
  transform: scale(0.8);
}

.nav-link .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin: calc(var(--nav-box-gap) - 2px) 0 0;
  line-height: 1.5;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

@media (max-width: 960px) {
  .nav-link {
    --nav-icon-box-size: 60px;
    --nav-icon-size: 60px;
    --nav-box-gap: 15px;
  }

  .nav-link .title {
    font-size: 16px;
  }
}
</style>
