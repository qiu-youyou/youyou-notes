---
tag:
  - CSS
tags:
  - Snippet

description: 记录常用的颜色相关 CSS 常用代码片段。

date: 2025-08-28 22:38:15
---

# CSS 常用代码片段 - 颜色

## 🍃 线性渐变

::: code-group

```css [] {}
.linear-gradient {
  background: linear-gradient(45deg, #6cad84, #00a7d5);
}
```

:::

## 🍃 径向渐变

::: code-group

```css [] {}
.radial-gradient {
  background: radial-gradient(circle, #6cad84, #00a7d5);
}
```

:::

## 🍃 多重渐变

::: code-group

```css [] {}
.multi-gradient {
  background: linear-gradient(to right, #6cad84, transparent), linear-gradient(to bottom, #00a7d5, transparent);
}
```

:::

## 🍃 渐变边框

::: code-group

```css [] {}
.gradient-border {
  border: 4px solid;
  border-image: linear-gradient(45deg, #6cad84, #00a7d5) 1;
}
```

:::

## 🍃 透明渐变遮罩

::: code-group

```css [] {}
.mask-gradient {
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  mask-repeat: no-repeat;
  mask-size: cover;
}
```

:::

## 🍃 玻璃拟态（毛玻璃效果）

::: code-group

```css [] {}
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

:::

## 🍃 使用 CSS 变量

::: code-group

```css [] {}
:root {
  --primary: #6cad84;
  --secondary: #00a7d5;
}
.btn {
  background: var(--primary);
  color: white;
}
```

:::

## 🍃 深色模式适配

::: code-group

```css [] {}
body {
  background: white;
  color: black;
}
@media (prefers-color-scheme: dark) {
  body {
    background: black;
    color: white;
  }
}
```

:::

## 🍃 自定义鼠标选中颜色

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
