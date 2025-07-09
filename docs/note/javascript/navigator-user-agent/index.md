---
tag:
  - 笔记
tags:
  - JavaScript

description: 通过检测 `navigator.userAgent`，可以判断访问设备是否为移动端，从而实现针对不同设备的样式或功能适配。
---

# user-agent 获取设备类型

## 💾 完整代码

::: code-group

```js
if (/Android|iPhone|Windows Phone/i.test(navigator.userAgent)) {
  document.body.classList.add('mobile-device');
}
```

:::
