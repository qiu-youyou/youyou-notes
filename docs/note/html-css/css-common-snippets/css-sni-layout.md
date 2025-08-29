---
tag:
  - 笔记
tags:
  - CSS
categories:
  - Snippet

description: 记录常用的布局相关 CSS 常用代码片段。
---

# CSS 常用代码片段 - 布局

## 🎈 粘性定位

::: code-group

```css [] {}
.sticky {
  position: sticky;
  top: 0;
  background: white;
}
```

:::

## 🎈 Flex 水平垂直居中

::: code-group

```css [] {}
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

:::

## 🎈 Grid 水平垂直居中

::: code-group

```css [] {}
.center-grid {
  display: grid;
  place-items: center;
}
```

:::

## 🎈 绝对定位水平垂直居中

::: code-group

```css [] {}
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

:::

## 🎈 圣杯布局

::: code-group

```css [] {}
.container {
  display: flex;
}
.left {
  width: 200px;
}
.right {
  width: 200px;
}
.middle {
  flex: 1;
}
```

:::

## 🎈 Flex 等分布局

::: code-group

```css [] {}
.equal-flex {
  display: flex;
}
.equal-flex > div {
  flex: 1;
}
```

:::

## 🎈 Grid 等分布局

::: code-group

```css [] {}
.equal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 三等分 */
  gap: 10px;
}
```

:::

## 🎈 固定比例盒子（16:9）

::: code-group

```css [] {}
.aspect-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #ccc;
}
```

:::

## 🎈 等高列（Flex）

::: code-group

```css [] {}
.equal-height {
  display: flex;
  align-items: stretch;
}
.equal-height > div {
  flex: 1;
}
```

:::

## 🎈 Grid 自适应卡片

::: code-group

```css [] {}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

:::
