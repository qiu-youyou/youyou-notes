---
tag:
  - JavaScript

description: 介绍了如何手写实现 JavaScript 中的 call、apply 和 bind 方法，包括实现思路与代码示例。

date: 2024-03-23 22:12:37
---

# 手写 call、apply、bind

介绍了如何手写实现 `JavaScript` 中的 `call`、`apply` 和 `bind` 方法，包括实现思路与代码示例。

## 📟 call

`call` 和 `apply` 实现思路主要是：

- 判断是否是函数调用，若非函数调用抛异常。
- 通过新对象 `context` 来调用函数。
- 给 `context` 创建一个 `fn` 设置为需要调用的函数。
- 结束调用完之后删除 `fn`。

::: code-group

```js
Function.prototype.myCall = function (context) {
  // 先判断调用 myCall 是不是一个函数
  // 这里的 this 就是调用 myCall 的
  if (typeof this !== 'function') {
    throw new TypeError('Not a Function');
  }

  // 不传参数默认为 window
  context = context || window;
  // 保存 this
  context.fn = this;
  // 保存参数 Array.from 把伪数组对象转为数组
  let args = Array.from(arguments).slice(1);

  // 调用函数
  let result = context.fn(...args);
  // 删除 fn
  delete context.fn;

  return result;
};
```

:::

## 😏 apply

::: code-group

```js
Function.prototype.myApply = function (context) {
  // 判断this是不是函数
  if (typeof this !== 'function') {
    throw new TypeError('Not a Function');
  }

  let result;

  // 默认是window
  context = context || window;

  // 保存this
  context.fn = this;

  // 是否传参
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;

  return result;
};
```

:::

## 😏 bind

`bind` 实现思路主要是：

- 判断是否是函数调用，若非函数调用抛异常。
- 返回函数: 判断函数的调用方式，是否是被 new 出来的
  - new 出来的话返回空对象，但是实例的 `__proto__` 指向 `_this` 的 `prototype`
- 完成函数柯里化
  - Array.prototype.slice.call()

::: code-group

```js
Function.prototype.myBind = function (context) {
  // 判断是否是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('Not a Function');
  }
  // 保存调用bind的函数
  const _this = this;
  // 保存参数
  const args = Array.prototype.slice.call(arguments, 1);
  // 返回一个函数
  return function F() {
    // 判断是不是new出来的
    if (this instanceof F) {
      // 如果是new出来的
      // 返回一个空对象，且使创建出来的实例的__proto__指向_this的prototype，且完成函数柯里化
      return new _this(...args, ...arguments);
    } else {
      // 如果不是new出来的改变this指向，且完成函数柯里化
      return _this.apply(context, args.concat(...arguments));
    }
  };
};
```

:::
