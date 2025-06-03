# Webpack5 跟随官方文档 快速上手

该文档跟随官方文档进行实践。只整理重要的知识点以及纪录关键步骤。

[Github 完整项目](https://github.com/qiu-youyou/webpack-guides)

## 基础入门

首先创建一个最基础的项目。

- 初始化 `npm` , 本地安装 `webpack` 、 `webpack-cli`:

```bash
npm init -y
npm install webpack webpack-cli --save-dev
npm install --save lodash
```

- 将源代码保存到 `src ` , 打包后的代码保存到 `dist`, 并配置 `webpack.config.js` :

::: code-group

```html [dist/index.html]
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

```javascript [src/index.js]
import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

```javascript [webpack.config.js]
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

```json {2} [package.json]
"scripts": {
  "build": "webpack"
},
```

:::

- 运行 `npx webpack` 它将以 `src/index.js` 作为入口, 生成 `dist/main.js` 作为输出。到这里已经完成了基本的构建。

- 考虑从 `CLI` 运行本地 `webpack` 副本并不方便, 所以最后我们创建一个 `npm script`，执行 `npm run build` 即可。

::: tip

`npx` 命令随 `Node 8.2/npm 5.2.0` 或更高版本一起提供，运行` ./node_modules/.bin/webpack` 我们在一开始安装的 `webpack` 包的 `webpack` 二进制文件。

从 `webpack 4` 开始，`webpack` 不再需要任何配置。但大多数项目需要更复杂的设置, 所以我们创建了一个 `webpack.config.js`。

`webpack.config.js` 如果存在 `webpack` 将会默认选择它，我们也可以通过 `webpack --config webpack.config.js` 来指定配置文件。

:::
