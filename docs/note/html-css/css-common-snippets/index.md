---
tag:
  - 笔记
tags:
  - CSS

description: 记录 CSS 常用的代码片段。备忘。持续更新中～～～
---

# CSS 常用代码片段

## 📋 水平垂直居中

::: code-group

```css [] {}
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

## 📋 等比例正方形

::: code-group

```css [] {}
.square {
  width: 100px;
  aspect-ratio: 1 / 1; /* 现代浏览器 */
}
```

:::

## 📋 背景图覆盖容器

::: code-group

```css [] {}
.bg-cover {
  background: url(bg.jpg) no-repeat center center;
  background-size: cover;
}
```

:::

## 📋 文字渐变

::: code-group

```css [] {}
.gradient-text {
  background: linear-gradient(45deg, #6cad84, #00a7d5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

:::

## 📋 背景渐变

::: code-group

```css
.container {
  background: linear-gradient(180deg, #fa61e3ff 0%, #1ee07fff 100%);
}
```

## 📋 圆形头像

::: code-group

```css [] {}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
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
