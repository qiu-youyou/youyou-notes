---
tag:
  - JavaScript

description: JS 中 compose 函数的手写实现，包括基础用法、异步支持、从左到右执行（pipe）、错误处理等场景。

date: 2024-03-10 12:46:14
---

# JS 手写 compose 函数

`JS` 中 `compose` 函数的手写实现，包括基础用法、异步支持、从左到右执行 `(pipe)`、错误处理等场景。

> `compose` 函数是函数式编程中的重要概念，它将多个函数组合成一个，从右到左执行。

## 基础实现

::: code-group

```js [] {}
function compose(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

// 使用示例
const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;
const addThenMultiply = compose(multiply2, add1);
console.log(addThenMultiply(5)); // (5 + 1) * 2 = 12
```

:::

## 支持异步函数

::: code-group

```js [] {}
async function composeAsync(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce((a, b) => async (...args) => {
    const result = await b(...args);
    return a(result);
  });
}

// 使用示例
const asyncAdd = async (x) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return x + 1;
};
const asyncMultiply = async (x) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return x * 2;
};

const asyncOperation = composeAsync(asyncMultiply, asyncAdd);
asyncOperation(5).then((result) => console.log(result)); // 12 (after 2 seconds)
```

:::

## 从左到右执行

::: code-group

```js [] {}
function pipe(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce(
    (a, b) =>
      (...args) =>
        b(a(...args))
  );
}

// 使用示例
const addOne = (x) => x + 1;
const multiplyTwo = (x) => x * 2;
const addThenMultiplyPipe = pipe(addOne, multiplyTwo);
console.log(addThenMultiplyPipe(5)); // (5 + 1) * 2 = 12
```

:::

## 错误处理

::: code-group

```js [] {}
function composeWithError(...fns) {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce((a, b) => (...args) => {
    try {
      const result = b(...args);
      return a(result);
    } catch (error) {
      console.error('Error in compose:', error);
      throw error;
    }
  });
}

// 使用示例
const divide = (x) => {
  if (x === 0) throw new Error('Cannot divide by zero');
  return 10 / x;
};
const square = (x) => x * x;

const divideAndSquare = composeWithError(square, divide);
console.log(divideAndSquare(2)); // (10 / 2)² = 25
try {
  divideAndSquare(0); // 抛出错误
} catch (e) {
  console.log('Caught error:', e.message);
}
```

:::

## 应用场景

#### 数据转换管道

::: code-group

```js [] {}
const toLowerCase = (str) => str.toLowerCase();
const removeSpaces = (str) => str.replace(/\s/g, '');
const addPrefix = (str) => `prefix_${str}`;

const processString = compose(addPrefix, removeSpaces, toLowerCase);
console.log(processString('Hello World')); // 'prefix_helloworld'
```

:::

#### 数据处理链

::: code-group

```js [] {}
const filterEven = (arr) => arr.filter((x) => x % 2 === 0);
const multiplyAll = (arr) => arr.map((x) => x * 2);
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const processNumbers = compose(sum, multiplyAll, filterEven);
console.log(processNumbers([1, 2, 3, 4, 5, 6])); // 2*2 + 4*2 + 6*2 = 24
```

:::

<br />

> `compose` 函数是函数式编程中的重要工具，它能够帮助我们构建更加模块化和可维护的代码。
> 通过组合单一功能的函数，我们可以构建出复杂的数据转换管道。
