---
tag:
  - 笔记
tags:
  - JavaScript

description: 本文介绍了什么是内存泄漏，如何在 JavaScript 项目中排查内存泄漏问题，并总结了常见的泄漏原因及对应的解决方案。
---

# JS 内存泄漏详解与排查指南

> 在前端开发中，性能问题常常潜伏在看不见的地方。
> 其中最隐蔽、最危险的一种，就是 内存泄漏（Memory Leak）。
>
> 本文主要介绍 什么是内存泄漏、如何排查、JS 中常见的泄漏原因与解决方案。

## 💤 内存泄漏是什么

内存泄漏 `(Memory Leak)` 指的是：

> 程序在运行过程中，已经不再需要的内存仍然被引用着，
> 导致垃圾回收器（GC）无法释放这部分内存。

随着时间推移，这部分无用内存会持续积累，造成：

```
页面越来越卡顿；
CPU 负载升高；
甚至浏览器崩溃。
```

### 🌰 举个例子

::: code-group

```JS [] {}
let arr = [];
function add() {
  arr.push(new Array(1000000).fill('*'));
}
setInterval(add, 1000);

```

:::

这个函数每秒都会往数组 `arr` 里推入一百万个元素，但从未清理旧数据。
这些数组永远被 `arr` 引用着 导致无法被回收。
时间一长，内存就 `“爆炸”` 了 💥。

## 💤 如何排查内存泄漏

Chrome DevTools 提供了非常强大的内存分析工具。

### 使用 Memory 面板

> DevTools → Memory

```
1. 打开页面
2. 执行可疑操作（如页面切换、滚动、弹窗）
3. 点击 Take snapshot
4. 多次拍摄快照，对比是否有对象数量持续上升、未释放
```

常见三种模式：

| 模式                           | 用途                         |
| ------------------------------ | ---------------------------- |
| **Heap snapshot**              | 拍摄堆快照，查看对象引用关系 |
| **Allocation instrumentation** | 记录运行期间对象的分配情况   |
| **Allocation sampling**        | 轻量级采样方式，性能较好     |

### 使用 Performance 面板

> DevTools → Performance

```
1. 打开页面
2. 点击 ⏺ 开始录制
3. 执行交互操作
4. 停止录制，查看 Memory 曲线 是否持续上涨
```

> 📈 如果内存曲线不断上升而不下降，几乎可以确认存在内存泄漏。

## 💤 JS 中常见的内存泄漏原因

### 意外的全局变量

::: code-group

```JS [] {}
function foo() {
  bar = 'I am global'; // 忘记写 var / let / const！
}
foo();

```

:::

这会在 `window` 上创建全局变量 `bar`，
只要页面不刷新，它就永远存在。

解决：启用严格模式防止隐式全局变量：

::: code-group

```JS [] {}
'use strict'; // 启用严格模式防止隐式全局变量

```

:::

### 未清理的定时器/事件监听

::: code-group

```JS [] {}
function start() {
  setInterval(() => {
    console.log('still running');
  }, 1000);
}

```

:::

如果组件卸载后没有清理 `setInterval`，
闭包中的引用依然存在，内存无法释放。

解决：在组件卸载时清理 `setInterval`:

::: code-group

```JS [] {}
const timer = setInterval(...);
clearInterval(timer); // 清理定时器

window.addEventListener('scroll', handleScroll);
// 卸载时
window.removeEventListener('scroll', handleScroll);

```

:::

### 闭包引用未释放

::: code-group

```JS [] {}
function outer() {
  const bigData = new Array(1000000).fill('*');
  return function inner() {
    console.log(bigData.length);
  };
}
const leak = outer(); // bigData 永远无法释放

```

:::

`bigData` 永远无法释放。

解决： 避免闭包中持有大型对象，
或在不需要时手动释放引用：

::: code-group

```JS [] {}
leak = null
```

:::

### DOM 引用未清理

::: code-group

```JS [] {}
const el = document.getElementById('app');
const cache = [];
cache.push(el);
document.body.removeChild(el); // 已删除 DOM

```

:::

此时 `cache` 仍持有 `el` 的引用，内存无法回收。

解决：在不需要时清空引用:

::: code-group

```JS [] {}
cache.length = 0; // 清空引用
```

:::

### Map/Set/WeakMap 使用不当

::: code-group

```JS [] {}
const map = new Map();
const key = {};
map.set(key, new Array(100000).fill('*'));
// 即使 key 不再使用，map 仍保留引用
```

:::

即使 `key` 不再使用，`map` 仍保留引用。

解决: 可以使用 `WeakMap` 替代普通 `Map`,
当 `key` 不再被引用时，`WeakMap` 会自动释放对应值。

::: code-group

```JS [] {}
const weakMap = new WeakMap();

```

:::

### SPA（单页应用）组件未销毁

在 `Vue` / `React` 等 `SPA` 框架中，常见问题包括：

```
组件卸载后定时器未清理；
事件监听残留；
状态管理（Redux、Pinia）中保留旧引用。
```

解决： 在组件卸载阶段清理副作用：

::: code-group

```js [] {}
useEffect(() => {
  const timer = setInterval(...);
  return () => clearInterval(timer); // cleanup
}, []);

```

:::

## 💤 总结

> 内存泄漏不是“用多了”，而是“该释放的没释放”。

了解内存引用关系、清理副作用、监控内存曲线，
才能让你的前端应用长期运行依旧轻盈流畅。

#### 预防建议：

| 场景          | 建议                                  |
| ------------- | ------------------------------------- |
| 定时器 / 事件 | 组件销毁时清理                        |
| 全局变量      | 避免或集中管理                        |
| 闭包          | 不持有大型对象                        |
| DOM 操作      | 删除节点前解除引用                    |
| 工具          | 善用 Chrome Memory / Performance 面板 |
