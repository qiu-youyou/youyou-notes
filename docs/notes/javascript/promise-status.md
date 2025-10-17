---
tag:
  - JavaScript

description: Promise 的三种状态：Pending（进行中）、Fulfilled（已完成）、Rejected（已拒绝）

date: 2025-10-10 13:32:10
---

# Promise 的三种状态

## ⚾ Promise 的三种状态

| 状态                | 说明                        | 是否可变更  |
| ------------------- | --------------------------- | ----------- |
| Pending（进行中）   | 初始状态，异步操作未完成    | ✅ 可以变更 |
| Fulfilled（已完成） | 操作成功，返回 resolve 结果 | ❌ 变更结束 |
| Rejected（已拒绝）  | 操作失败，返回 reject 错误  | ❌ 变更结束 |

## ⚾ Promise 状态的变化

> `Promise` 的状态只会从:
>
> `Pending` 变化到 `Fulfilled` 或 `Pending` 变化到 `Rejected`。
>
> 并且是不可逆的，一旦发生变化就不会再改变。

::: code-group

```js [] {}
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
    // reject("失败"); // 只会触发一次，状态不可逆
  }, 1000);
});

promise.then((result) => console.log('Fulfilled:', result)).catch((error) => console.log('Rejected:', error));
```

:::
