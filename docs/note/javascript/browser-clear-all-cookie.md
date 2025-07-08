---
tag:
  - 芝士
tags:
  - JavaScript
---

# JS 清除所有 cookie

## 😃 完整代码

```js
export const clearAllCookie = () => {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i--; ) document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
  }
};
```
