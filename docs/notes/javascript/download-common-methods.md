---
tag:
  - JavaScript

description: 文件下载是非常常见的功能，比如导出表格、下载文档、导出报表等。本文将详细介绍前端实现下载的多种方式，涵盖不同场景，并提供完整的代码示例。

date: 2024-01-29 21:15:53
---

# 前端实现文件下载常见方案

## ⚽ a 标签的 dlownload 属性

> 使用 `<a>` 标签的 `download` 属性是最简单的办法

::: code-group

```js [示例代码]
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

## ⚽ 前端生成内容后再下载

> 前端生成内容后下载 `（Blob + URL.createObjectURL）`

::: code-group

```js [示例代码]
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

::: tip 适用场景

- 导出前端生成的内容（如 CSV、JSON、文本、图片）

:::

## ⚽ 获取二进制文件流下载

> 通过 `Fetch` 下载二进制文件流, 常见于导出接口

::: code-group

```js [示例代码]
async function downloadExcel() {
  const response = await fetch('/api/export', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer xxx', // 如果有 token
    },
    body: JSON.stringify({ type: 'user-list' }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '用户列表.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}

downloadExcel();
```

:::

::: tip 适用场景

- 后端导出文件接口（如 Excel、PDF、ZIP）
- 需要携带参数的 POST 请求
- 需要权限认证（cookie、token）

:::

::: warning 需要注意

- 后端需返回正确的文件类型（如 application/vnd.ms-excel）和 Content-Disposition 响应头。

:::

## ⚽ 使用 fileSaver 库

> [file-saver](https://github.com/eligrey/FileSaver.js) 是一个广泛使用的下载库，兼容性好，封装了底层处理。

::: code-group

```js [示例代码]
import { saveAs } from 'file-saver';

const blob = new Blob(['Hello, FileSaver!'], {
  type: 'text/plain;charset=utf-8',
});
saveAs(blob, 'hello.txt');
```

:::

## ⚽ 下载 Excel 文件

> 结合 `xlsx + file-saver` 来下载 `Excel` 文件

::: code-group

```js [示例代码]
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function exportExcel() {
  const data = [
    { 姓名: '张三', 年龄: 18 },
    { 姓名: '李四', 年龄: 22 },
  ];
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '用户列表');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, '用户列表.xlsx');
}
```

:::

::: tip 适用场景

- 前端生成 Excel 而非后端生成
- 导出复杂表格 多 Sheet 导出

:::

## ⚽ 几种方案对比

在实际开发中，选择哪种下载方案，主要取决于你的资源来源、浏览器兼容性需求、文件类型以及是否需要权限控制。推荐前端开发者根据场景灵活选择，同时注意使用 `Content-Type`、`Content-Disposition` 等响应头来确保文件正确下载。

| 场景                       | 推荐方式                 | 支持 POST | 兼容性     |
| -------------------------- | ------------------------ | --------- | ---------- |
| 下载静态资源               | `<a download>`           | 否        | 现代浏览器 |
| 下载 Blob 数据（前端导出） | `Blob + createObjectURL` | 否        | 较好       |
| 后端返回文件流（导出）     | `fetch + blob`           | 是        | 现代浏览器 |
| 后端返回文件流（导出）     | `xlsx + file-saver`      | 可支持    | 较好       |

<br />

::: warning 移动端下载注意事项

- 微信小程序/浏览器不支持 download 属性
- 建议跳转外部浏览器或使用后端二维码下载方案
- 安卓/iOS 系统限制多，建议用户手动长按保存

:::
