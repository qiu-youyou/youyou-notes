---
tag:
  - JavaScript

description: 通过检测 `navigator.userAgent`，可以判断访问设备的类型，从而实现针对不同设备的样式或功能适配。

date: 2024-01-18 19:30:32
---

# user-agent 获取设备类型

## 💾 检测是否为移动端

::: code-group

```js
if (/Android|iPhone|Windows Phone/i.test(navigator.userAgent)) {
  document.body.classList.add('mobile-device');
}
```

:::

## 💾 检测手机浏览器环境

::: code-group

```js
function checkEquipment() {
  let web = navigator.userAgent,
    isiOS = !!web.match(/\i[^;]+;(U;)? CPU.+Mac OS X/),
    isAndroid = web.indexOf('Android') > -1 || web.indexOf('Adr') > -1,
    isWeChat = web.toLocaleLowerCase().match(/MicroMessenger/i) == 'micromessenger';

  if (isAndroid) {
    console.log('当前环境为 Android');
  }

  if (isiOS) {
    console.log('当前环境为 iOS');
  }

  if (isWeChat) {
    console.log('当前环境为 WeChat');
  }
}
```

:::

## 💾 浏览器 UserAgent 列表

| 系统    | 浏览器  | User-Agent 字符串                                                                                                                                 |
| ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mac     | Chrome  | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36                          |
| Mac     | Firefox | Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:65.0) Gecko/20100101 Firefox/65.0                                                                |
| Mac     | Safari  | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15                           |
| Windows | Chrome  | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36                               |
| Windows | Edge    | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.17763                 |
| Windows | IE      | Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko                                                                             |
| iOS     | Chrome  | Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/31.0.1650.18 Mobile/11B554a Safari/8536.25 |
| iOS     | Safari  | Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4             |
| Android | Chrome  | Mozilla/5.0 (Linux; Android 4.2.1; M040 Build/JOP40D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36             |
| Android | Webkit  | Mozilla/5.0 (Linux; U; Android 4.4.4; zh-cn; M351 Build/KTU84P) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30           |
