---
tag:
  - CSS
tags:
  - Snippet

description: 记录常用的动画相关 CSS 常用代码片段。

date: 2025-08-28 22:38:15
---

# CSS 常用代码片段 - 动画

## 🌋 平滑过渡

::: code-group

```css [] {}
.transition {
  transition: all 0.3s ease;
}
```

:::

## 🌋 过渡某个属性

::: code-group

```css [] {}
.transition-color {
  transition: color 0.5s ease-in-out;
}
```

:::

## 🌋 淡入效果

::: code-group

```css [] {}
.fade-in {
  animation: fadeIn 1s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

:::

## 🌋 旋转动画

::: code-group

```css [] {}
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

:::

## 🌋 呼吸灯

::: code-group

```css [] {}
.breath {
  animation: breath 2s ease-in-out infinite;
}
@keyframes breath {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

:::

## 🌋 上下浮动

::: code-group

```css [] {}
.float {
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

:::

## 🌋 跳动小点

::: code-group

```css [] {}
.dots span {
  display: inline-block;
  animation: bounce 1s infinite;
}
.dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
  }
  40% {
    transform: scale(1.2);
  }
}
```

:::

## 🌋 进度条加载

::: code-group

```css [] {}
.loading-bar {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #6cad84, #00a7d5);
  background-size: 200% 100%;
  animation: loading 2s linear infinite;
}
@keyframes loading {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```
