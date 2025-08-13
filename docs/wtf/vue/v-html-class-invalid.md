---
tag:
  - 踩坑记录
tags:
  - Vue
---

# v-html 指令元素中标签样式不生效

> v-html 指令生成的元素中标签的 class 样式不生效。

## 📎 问题描述

在某些场景需要使用 `v-html` 插入 `HTML` 内容时，会发现绑定的 `class` 样式不生效。

## 📎 问题原因

使用 [官网](https://cn.vuejs.org/api/built-in-directives) 一段说明：

在单文件组件，`scoped` 样式将不会作用于 `v-html` 里的内容，因为 `HTML` 内容不会被 `Vue` 的模板编译器解析。
如果你想让 `v-html` 的内容也支持 `scoped CSS`，你可以使用 `CSS modules` 或使用一个额外的全局 `<style>` 元素。

## 📎 解决方案

可以使用全局样式，或者当前组件使用额外的全局 `<style>` 元素:

::: code-group

```vue
<style lang="scss" scoped>
// ...
</style>

// [!code focus] [!code ++]
<style lang="scss">
// [!code focus] [!code ++]
</style>
```

:::

在 `scoped` 样式中，使用深度选择器:

::: code-group

```vue
<style lang="scss" scoped>
.parent:deep(.child) {
  // ...
}
</style>
```

:::

::: tip Tips:

- `>>>`: `vue` 的 `style` 使用的是 `css`;
- `/deep/`、`::v-deep`: 使用 `scss` 预处理器;
- `:deep()`: `vue3` 一律采用 `:deep()` 这种方式用来深度访问组件样式;

:::
