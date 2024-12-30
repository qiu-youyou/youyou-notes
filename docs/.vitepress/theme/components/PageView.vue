<script setup lang="ts">
import busuanzi from "busuanzi.pure.js";
import { inBrowser } from "vitepress";
import { onBeforeMount } from "vue";

if (inBrowser) {
  onBeforeMount(() => busuanzi.fetch());
}
</script>

<template>
  <div class="stats-panel">
    <div class="stats-container">
      <div class="stats-item">
        本站总访问量：<span id="busuanzi_value_site_pv">--</span>
      </div>
      <div class="stats-item">
        本站访客数：<span id="busuanzi_value_site_uv">--</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-panel {
  margin-top: 26px;
  padding-top: 26px;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
}

.stats-container {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 0 auto;
  font-size: 0.875rem;
  color: var(--vp-c-text);
}

.stats-item {
  flex: 1;
  text-align: center;
  white-space: nowrap; /* 保证文字在一行内展示 */
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
