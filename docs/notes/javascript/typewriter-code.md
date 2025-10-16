---
tag:
  - JavaScript

description: 使用原生 JavaScript 实现网页中的打字机动画效果，包含完整 HTML、CSS 和 JS 代码，便于直接复用和学习。

date: 2024-11-19 16:58:33
---

# JS-实现打字机效果代码片段

> 个人首页的描述文字打字机效果的实现：[点击看效果](https://qiuyouyou.cn/)

## 💻 完整代码

::: code-group

```html
<!DOCTYPE html>
<html lang="zh-cn">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="favicon.ico">
  <title>Yòuyou</title>
  <style>
    .typewriter {
      /* 容器宽度自适应内容 */
      display: inline-block;
    }

    .cursor {
      display: inline-block;
      width: 5px;
      color: #fff;
      text-align: center;
      background-color: rgb(62, 62, 62);
      animation: blink 1s steps(1, start) infinite;
    }

    @keyframes blink {
      50% {
        opacity: 0;
      }
    }
  </style>
</head>

<body>


  <div class="container">
    <p>
    <div id="typewriter-container" class="typewriter"></div>
    <div class="cursor" id="cursor">|</div>
    </p>
  </div>


  <script>
    const texts = [
      "一个天天想退休的前端小卡拉米。",
      "没有记录就没有发生，进而没有活过。"
    ];

    let currentIndex = 0;
    let currentCharIndex = 0;
    let typingSpeed = 100; // 打字速度，单位毫秒
    let displayTime = 2000; // 每段文字显示时间，单位毫秒
    let typingInterval; // 打字间隔的ID

    function typeText() {
      if (currentIndex === texts.length) {
        currentIndex = 0
      }
      const container = document.getElementById('typewriter-container');
      const text = texts[currentIndex];
      const fullTextLength = text.length;

      function displayNextChar() {
        if (currentCharIndex < fullTextLength) {
          container.textContent += text.charAt(currentCharIndex);
          currentCharIndex++;
        } else {
          clearInterval(typingInterval); // 停止打字
          setTimeout(switchText, displayTime); // 等待一段时间后切换文本
        }
      }

      typingInterval = setInterval(displayNextChar, typingSpeed); // 开始打字
    }

    function switchText() {
      const container = document.getElementById('typewriter-container');
      currentIndex += 1 // 切换到下一段文字
      currentCharIndex = 0
      container.textContent = ''; // 清空容器内容
      setTimeout(typeText, 500); // 稍作延迟后开始显示新文字
    }

    // 初始化打字机效果
    typeText();
  </script>

</body>

</html>
```

:::
