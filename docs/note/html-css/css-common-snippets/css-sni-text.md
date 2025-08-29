---
tag:
  - 笔记
tags:
  - CSS

description: 记录常用的文字文本 相关 CSS 常用代码片段。
---

# CSS 常用代码片段 - 文字文本

## 🌻 单行文本溢出省略号

::: code-group

```css [] {}
.ellipsis-one {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

:::

## 🌻 多行文本溢出省略号

::: code-group

```css [] {}
.ellipsis-multi {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 显示行数 */
  -webkit-box-orient: vertical;
}
```

## 🌻 文字阴影

::: code-group

```css [] {}
.shadow-text {
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
```

:::

:::

## 🌻 渐变文字

::: code-group

```css [] {}
.gradient-text {
  background: linear-gradient(45deg, #6cad84, #00a7d5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

:::

## 🌻 空心文字

::: code-group

```css [] {}
.hollow-text {
  color: ;
  -webkit-text-stroke: 1px #333;
}
```

:::

## 🌻 文本两端对齐

::: code-group

```css [] {}
.justify-text {
  text-align: justify;
}
```

:::

## 🌻 强制不换行

::: code-group

```css [] {}
.no-wrap {
  white-space: nowrap;
}
```

:::

## 🌻 自动换行（长英文、URL）

::: code-group

```css [] {}
.break-word {
  word-wrap: break-word; /* 老属性 */
  overflow-wrap: break-word; /* 推荐 */
}
```

:::

## 🌻 大写/小写/首字母大写

::: code-group

```css [] {}
.uppercase {
  text-transform: uppercase;
}
.lowercase {
  text-transform: lowercase;
}
.capitalize {
  text-transform: capitalize;
}
```

:::

## 🌻 下划线/删除线/上划线

::: code-group

```css
.underline {
  text-decoration: underline;
}
.linethrough {
  text-decoration: line-through;
}
.overline {
  text-decoration: overline;
}
```

:::

## 🌻 自定义下划线样式

::: code-group

```css [] {}
.fancy-underline {
  text-decoration: underline wavy red;
}
```

:::
