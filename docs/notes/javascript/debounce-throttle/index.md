---
tag:
  - JavaScript

description: 防抖（Debounce）和节流（Throttle）是前端开发中常用的高频事件性能优化方法。防抖用于避免事件被频繁触发，节流用于限制事件的触发频率。本文介绍了它们的原理、实现方式及常见应用场景。

date: 2024-02-14 13:42:33
---

# 防抖与节流

防抖（Debounce）和节流（Throttle）是两种常见的性能优化技术，它们主要用于控制高频率事件的触发，以提高应用的响应速度和用户体验。

## ⌛ 防抖（Debounce）

> n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时。

- 防抖技术的核心思想是：对于频繁触发的事件，只在最后一次事件触发后的指定时间内没有再次触发事件时，才执行回调函数。这样可以避免在短时间内多次执行回调函数，从而减轻性能负担。

- 举个例子，当用户在一个输入框中快速输入文字时，如果我们希望只有在用户停止输入一段时间后才进行搜索或验证，就可以使用防抖。

### 代码实现

- #### 普通防抖函数

::: code-group

```js [JS]
function debounce(func, delay) {
  let timeout;
  return function () {
    let arg = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(arg);
    }, delay);
  };
}
```

:::

- #### 立即执行防抖函数

::: code-group

```js [JS]
function debounce(fn, delay) {
  let timer;

  return function () {
    let args = arguments;
    if (timer) clearTimeout(timer);

    let callNow = !timer;
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    if (callNow) {
      fn(args);
    }
  };
}
```

:::

- #### 普通防抖+立即执行

::: code-group

```js [JS]
function debounce(fn, delay, immediate) {
  let timer;

  return function () {
    let args = arguments;
    let _this = this;
    if (timer) clearTimeout(timer);

    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) {
        fn.apply(_this, args);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(_this, arguments);
      }, delay);
    }
  };
}
```

:::

## ⌛ 节流（Throttle）

> n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效。

- 节流技术的核心思想是：对于频繁触发的事件，规定在一段时间内只能执行一次回调函数，无论这段时间内事件被触发了多少次。这样可以确保回调函数以固定的频率执行，避免过于频繁的操作。

- 例如，在滚动事件中，我们可能希望每隔一段时间（比如 200 毫秒）才更新一次页面上的某些内容，而不是每次滚动都更新。这时，节流就非常有用。

### 代码实现

- #### 节流函数-定时器

::: code-group

```js [JS]
function throttle(fn, wait) {
  let timer;
  return function () {
    let _this = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(_this, arguments);
      }, wait);
    }
  };
}
```

:::

- #### 节流函数-时间戳

::: code-group

```js [JS]
function throttle(fn, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let _this = this;
    let args = arguments;
    if (now - previous > wait) {
      fn.apply(_this, arguments);
      previous = now;
    }
  };
}
```

:::

## ⌛ 应用场景

- 防抖：适用于输入框的搜索、验证，窗口大小调整后的布局计算等。

- 节流：适用于滚动加载、窗口大小调整时的动画效果、鼠标移动时的绘制等。
