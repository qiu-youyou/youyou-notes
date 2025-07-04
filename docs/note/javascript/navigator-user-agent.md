---
tag:
  - 芝士
tags:
  - JavaScript
---

# user-agent 获取设备类型

::: code-group

```js
if (/Android|iPhone|Windows Phone/i.test(navigator.userAgent)) {
  document.body.classList.add('mobile-device');
}
```

:::
