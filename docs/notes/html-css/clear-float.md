---
tag:
  - CSS

description: 三种常用的 CSS 清除浮动方法，额外标签法、BFC和使用伪元素的 clearfix 技巧。

date: 2024-04-05 22:18:55
---

# CSS-清除浮动

三种常用的 `CSS` 清除浮动方法，额外标签法、`BFC` 和使用伪元素的 `clearfix` 技巧。

## 🔮 额外标签

> clear: both

::: code-group

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .fahter {
        width: 400px;
        border: 1px solid deeppink;
      }
      .big {
        width: 200px;
        height: 200px;
        background: darkorange;
        float: left;
      }
      .small {
        width: 120px;
        height: 120px;
        background: darkmagenta;
        float: left;
      }

      .clear {
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="fahter">
      <div class="big">big</div>
      <div class="small">small</div>
      <div class="clear">额外标签法</div>
    </div>
  </body>
</html>
```

:::

## 🔮 利用 BFC

> overflow-hidden

::: code-group

```css
.fahter {
  width: 400px;
  border: 1px solid deeppink;
  overflow: hidden;
}
```

:::

::: tip BFC，块级格式化上下文

一个创建了新的 `BFC` 的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。在同一个 `BFC` 中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的 `margin` 会发生折叠。 `W3C CSS 2.1` 规范中的一个概念，它决定了元素如何对其内容进行布局，以及与其他元素的关系和相互作用。

:::

## 🔮 使用 after

> 推荐

::: code-group

```html
<style>
  .clearfix:after {
    /* 伪元素是行内元素 正常浏览器清除浮动方法 */
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .clearfix {
    /* ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行 */
    *zoom: 1;
  }
</style>
<body>
  <div class="fahter clearfix">
    <div class="big">big</div>
    <div class="small">small</div>
  </div>
</body>
```

:::
