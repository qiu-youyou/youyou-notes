---
tag:
  - 笔记
tags:
  - JavaScript

description: 文件下载是非常常见的功能，比如导出表格、下载文档、导出报表等。本文将详细介绍前端实现下载的多种方式，涵盖不同场景，并提供完整的代码示例。
---

# 前端实现文件下载的常见方案

## a 标签的 dlownload 属性

使用 `<a>` 标签的 download 属性是最简单的办法

::: code-group

```js [示例下载PDF]
<button id="downloadBtn">下载 PDF</button>

<script>
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const url = 'https://example.com/sample.pdf'
    const a = document.createElement('a')
    a.href = url
    a.download = '示例文件.pdf'
    a.click()
  })
</script>
```

:::

::: tip 适用场景

- 下载静态资源（如图片、PDF、ZIP）
- 链接为同源或已设置跨域资源共享（CORS）

:::

::: warning 需要注意

- download 对跨域资源无效，除非设置了 Access-Control-Allow-Origin
- 不支持文件 POST 下载
- 不兼容 IE 浏览器

:::

## 前端生成内容后再下载

前端生成内容后下载 `（Blob + URL.createObjectURL）`

::: code-group

```js [示例导出JSON文件]
function downloadJsonFile() {
  const data = { name: '张三', age: 28 };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = '用户数据.json';
  a.click();
  URL.revokeObjectURL(url);
}

downloadJsonFile();
```

:::

## 获取二进制文件流下载

## fileSaver 第三方库

## 下载 Excel 文件
