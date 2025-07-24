---
tag:
  - 笔记
tags:
  - CSS

description: 记录 CSS 常用的代码片段。备忘。持续更新中～～～
---

# CSS 常用代码片段

## 📋 单行文本溢出显示省略号

::: code-group

```css
p {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  white-space: nowrap;
}
```

:::

## 📋 隐藏浏览器右侧滚动条

::: code-group

```css
html {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
}

html::-webkit-scrollbar {
  width: 0 !important;
}
```

:::

## 📋 禁止用户选中复制

::: code-group

```css
* {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}
```

:::

## 📋 自定义鼠标选中颜色

::: code-group

```css
::selection {
  background: #5ea050;
}
::-moz-selection {
  background: #5ea050;
}
::-webkit-selection {
  background: #5ea050;
}
```

:::

## 📋 全网站页面置灰

::: code-group

```css
html {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
```

:::

## 📋 用户头像转圈圈

::: code-group

```css
.image:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}
```

:::

## 📋 背景透明模糊

::: code-group

```css
.container {
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(6px);
}
```

:::

## 📋 背景色渐变

::: code-group

```css
.container {
  background: linear-gradient(180deg, #fa61e3ff 0%, #1ee07fff 100%);
}
```

:::

## 📋 显示链接名称的同时并显示 URL

::: code-group

```css
<a href="https://notes.qiuyouyou.cn/">baidu</a>
<style>
a::after {
  content: " (" attr(href) ")";
}
</style>
```

:::
