---
tag:
  - 问题踩坑
tags:
  - VSCode

description: 在 VSCode 中使用 Tailwind CSS 时，遇到 `@apply` 等指令被识别为未知 at 规则的警告，两种解决方法。
---

# VSCode 对 Tailwind 指令的警告

## ➿ 问题描述

- 在 `Sass` 中使用 `@aplly` 语法 ： `Unknown at rule @applyscss(unknownAtRules)`

![](http://images.qiuyouyou.cn/notes/unocss-unknownAtRules-warning.png)

## ➿ 处理方案

- 方案 1: 打开 vscode 设置，搜索 `scss Unknown`，改为 `ignore`：

![](http://images.qiuyouyou.cn/notes/unocss-unknownAtRules-solve.png)

- 方案 2: 参考：https://duncanleung.com/tailwind-css-unknown-at-rule/ ：

::: code-group

```json [.vscode/settings.json]
{
  "css.customData": [".vscode/tailwindcss.json"]
}
```

:::

::: code-group

````json [.vscode/tailwindcss.json]
{
  "version": 1.1,
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the `@tailwind` directive to insert Tailwind's `base`, `components`, `utilities` and `screens` styles into your CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#tailwind"
        }
      ]
    },
    {
      "name": "@apply",
      "description": "Use the `@apply` directive to inline any existing utility classes into your own custom CSS. This is useful when you find a common utility pattern in your HTML that you’d like to extract to a new component.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#apply"
        }
      ]
    },
    {
      "name": "@responsive",
      "description": "You can generate responsive variants of your own classes by wrapping their definitions in the `@responsive` directive:\n```css\n@responsive {\n  .alert {\n    background-color: #E53E3E;\n  }\n}\n```\n",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#responsive"
        }
      ]
    },
    {
      "name": "@screen",
      "description": "The `@screen` directive allows you to create media queries that reference your breakpoints by **name** instead of duplicating their values in your own CSS:\n```css\n@screen sm {\n  /* ... */\n}\n```\n…gets transformed into this:\n```css\n@media (min-width: 640px) {\n  /* ... */\n}\n```\n",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#screen"
        }
      ]
    },
    {
      "name": "@variants",
      "description": "Generate `hover`, `focus`, `active` and other **variants** of your own utilities by wrapping their definitions in the `@variants` directive:\n```css\n@variants hover, focus {\n   .btn-brand {\n    background-color: #3182CE;\n  }\n}\n```\n",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#variants"
        }
      ]
    }
  ]
}
````

:::
