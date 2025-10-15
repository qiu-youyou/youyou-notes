<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();

// 类型归档
const docs = ref([]);
const docsLength = ref(0);

// 处理所有文档生成摘要
const allDocsRes = [...window.docs].filter((item) => !item.meta?.hidden) || [];
docsLength.value = allDocsRes.length;

const docsByYearMonthMap = new Map();

allDocsRes
  .sort((a, b) => (b.meta?.date || '').localeCompare(a.meta?.date || ''))
  .forEach((item) => {
    const dateStr = item.meta?.date || '';
    const year = dateStr.substring(0, 4) || 'Unknown';
    const month = dateStr.substring(5, 7) || 'Unknown';

    if (!docsByYearMonthMap.has(year)) {
      docsByYearMonthMap.set(year, new Map());
    }
    const monthsMap = docsByYearMonthMap.get(year);
    if (!monthsMap.has(month)) {
      monthsMap.set(month, []);
    }
    monthsMap.get(month).push(item);
  });

// 转成数组方便 Vue v-for 渲染
docs.value = Array.from(docsByYearMonthMap, ([year, monthsMap]) => ({
  year,
  months: Array.from(monthsMap, ([month, posts]) => ({
    month,
    posts,
  })),
}));

// 格式化为 MM-DD，兼容 'YYYY-MM-DD' 和带时区的 ISO 字符串
const formatMMDD = (dateStr) => {
  if (!dateStr) return '--';
  try {
    const d = String(dateStr).slice(0, 10); // 'YYYY-MM-DD'
    return d.slice(5, 10);
  } catch (e) {
    return '--';
  }
};

// 从 meta 中提取标签，支持 array 或逗号分隔字符串，兼容 tag 旧字段
const getTags = (meta = {}) => {
  const t = meta.tag;
  if (!t) return [];
  if (Array.isArray(t)) return t.map((s) => String(s).trim()).filter(Boolean);
  return String(t)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
};

const handleCardClick = (route) => {
  if (!route) return;
  // 确保去掉末尾的 'index'
  const path = String(route).replace(/index$/, '');
  router.go(path);
};

// =====================
// 贡献图（GitHub 样式）实现（不依赖第三方库）
// =====================

// 统计每个日期的文章数（日期格式 YYYY-MM-DD），兼容 string/Date/不同字段名
const countsMap = new Map();
const normalizeDateStr = (raw) => {
  if (!raw && raw !== 0) return '';
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  if (typeof raw === 'number') return new Date(raw).toISOString().slice(0, 10);
  return String(raw).slice(0, 10);
};

allDocsRes.forEach((item) => {
  const cand =
    item.meta?.date ||
    item.date ||
    item.frontmatter?.date ||
    (item.data && item.data.frontmatter && item.data.frontmatter.date) ||
    '';
  const d = normalizeDateStr(cand);
  if (!d) return;
  countsMap.set(d, (countsMap.get(d) || 0) + 1);
});

// 用于渲染的周数组（每项是 7 天的数组）
const contribWeeks = ref([]);
// 月份标签：{ weekIndex, label }
const monthLabels = ref([]);

const pad = (n) => String(n).padStart(2, '0');
const formatYMD = (date) => `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`;
const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // 0-6, Sun-Sat
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

const buildContribData = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // 最近 365 天
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  start.setHours(0, 0, 0, 0);

  // 将起始日期向前对齐到最近的周日，保证列对齐
  const firstSunday = getStartOfWeek(start);

  const weeks = [];
  let cur = new Date(firstSunday);
  while (cur <= today) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      const d = new Date(cur);
      d.setDate(cur.getDate() + i);
      d.setHours(0, 0, 0, 0);
      const dateStr = formatYMD(d);
      if (d < start || d > today) {
        week.push(null);
      } else {
        week.push({ date: dateStr, count: countsMap.get(dateStr) || 0 });
      }
    }
    weeks.push(week);
    cur.setDate(cur.getDate() + 7);
  }

  // 计算月份标签（在每个月第一次出现的周列放置标签）
  const labels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    // 找到本周第一个非空日期
    const firstDay = week.find((d) => d && d.date);
    if (!firstDay) return;
    const month = Number(firstDay.date.slice(5, 7));
    if (month !== lastMonth) {
      labels.push({ weekIndex: wi, label: `${month}月` });
      lastMonth = month;
    }
  });

  contribWeeks.value = weeks;
  monthLabels.value = labels;
};

// 星期标签（显示为 周一-周日）
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
// 渲染日顺序：因为 week 数组从周日开始(0=Sun)，我们想从周一开始渲染
const dayOrder = [0, 1, 2, 3, 4, 5, 6];

// tooltip 控制
const tooltip = ref({ visible: false, x: 0, y: 0, date: '', count: 0 });
const showTooltip = (e, d) => {
  if (!d) return;
  tooltip.value.visible = true;
  tooltip.value.date = d.date;
  tooltip.value.count = d.count;
  tooltip.value.x = e.pageX + 12;
  tooltip.value.y = e.pageY + 12;
};
const moveTooltip = (e) => {
  tooltip.value.x = e.pageX + 12;
  tooltip.value.y = e.pageY + 12;
};
const hideTooltip = () => {
  tooltip.value.visible = false;
};

// 计算分位阈值（用于数据驱动的颜色分级）
const contribThresholds = ref([0, 1, 2, 3]);

const computeThresholds = () => {
  const vals = [];
  countsMap.forEach((v) => {
    if (v && v > 0) vals.push(v);
  });
  if (vals.length === 0) {
    contribThresholds.value = [0, 1, 2, 3];
    return;
  }
  vals.sort((a, b) => a - b);
  const p = (q) => {
    const idx = (vals.length - 1) * q;
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) return vals[lo];
    return vals[lo] * (hi - idx) + vals[hi] * (idx - lo);
  };
  const p25 = Math.max(1, Math.round(p(0.25)));
  const p50 = Math.max(p25, Math.round(p(0.5)));
  const p75 = Math.max(p50, Math.round(p(0.75)));
  contribThresholds.value = [p25, p50, p75, Math.max(p75 + 1, vals[vals.length - 1])];
};

// 返回颜色级别 class，基于 contribThresholds
const colorClass = (count) => {
  if (!count || count <= 0) return 'level-0';
  const [t1, t2, t3, t4] = contribThresholds.value;
  if (count <= t1) return 'level-1';
  if (count <= t2) return 'level-2';
  if (count <= t3) return 'level-3';
  return 'level-4';
};

const labelForWeek = (wi) => {
  const found = monthLabels.value.find((l) => l.weekIndex === wi);
  return found ? found.label : '';
};

onMounted(() => {
  buildContribData();
  computeThresholds();
});
</script>

<template>
  <div class="archive-container">
    <!-- 贡献图区域（GitHub-style heatmap） -->
    <div class="contrib-wrap">
      <div class="contrib-legend">
        <div class="contrib-title">近一年贡献</div>
      </div>

      <div class="contrib-body">
        <div class="contrib-week-labels">
          <div class="week-space"></div>
          <div v-for="(wd, i) in weekdays" :key="i" class="week-label">{{ wd }}</div>
        </div>

        <div class="contrib-grid">
          <div class="contrib-months">
            <template v-for="(w, wi) in contribWeeks" :key="wi">
              <span class="contrib-month-label">
                {{ labelForWeek(wi) }}
              </span>
            </template>
          </div>

          <div class="contrib-week" v-for="(week, wi) in contribWeeks" :key="wi">
            <div
              v-for="(orderIndex, di) in dayOrder"
              :key="di"
              class="contrib-day"
              :class="
                (() => {
                  const d = week[orderIndex];
                  return d ? colorClass(d.count) : 'empty';
                })()
              "
              @mouseenter="
                (e) => {
                  const d = week[dayOrder[di]];
                  if (d) showTooltip(e, d);
                }
              "
              @mousemove="moveTooltip"
              @mouseleave="hideTooltip">
              <!-- empty: visual only -->
            </div>
          </div>
        </div>
      </div>

      <div v-if="tooltip.visible" class="contrib-tooltip" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
        <div class="tt-date">{{ tooltip.date }}</div>
        <div class="tt-count">{{ tooltip.count }} 篇</div>
      </div>
    </div>
    <div v-if="docs.length">
      <template v-for="(years, i) in docs" :key="i">
        <h3 class="archive-year">
          <p class="archive-year-left">{{ years.year }}</p>
        </h3>

        <template v-for="(months, idx) in years.months" :key="idx">
          <h4 class="archive-month">
            <p class="archive-month-left">{{ months.month }}</p>
            <p class="archive-month-right">{{ months.posts.length }} 篇</p>
          </h4>
          <ul class="archive-list">
            <li
              class="post-item"
              v-for="(item, idx) in months.posts"
              @click.stop="handleCardClick(item.route)"
              role="button"
              tabindex="0"
              :key="idx">
              <div class="post-row">
                <div class="post-left">
                  <span class="dot" aria-hidden="true"></span>
                  <span class="post-title">
                    <span class="post-date">{{ formatMMDD(item.meta?.date) }}</span>
                    {{ item.meta?.title || 'Untitled' }}
                  </span>
                </div>

                <div class="post-right">
                  <div class="post-tags" v-if="getTags(item.meta).length">
                    <span class="tag" v-for="(t, k) in getTags(item.meta)" :key="k">
                      {{ t }}
                      <span class="tag-point" v-if="k != getTags(item.meta).length - 1">·</span>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </template>
    </div>

    <div v-else class="empty-wrap">
      <p class="des-text">这里空空如也......</p>
      <p class="des-text">作者比较懒 什么也没写 ......</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
