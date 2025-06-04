# Webpack5 跟随官方文档 上手实践 1

该文档跟随 [官方文档](https://webpack.js.org/guides/) 进行实践。只整理重要的知识点以及纪录关键步骤。[完整代码](https://github.com/qiu-youyou/webpack-guides)

## 基础入门

首先创建一个目录作为一个最基础的项目。

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

:::

::: code-group

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

:::

::: code-group

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

:::

::: code-group

```json {2} [package.json]
...
"scripts": {
  "build": "webpack" // [!code ++] [!code focus]
},
...
```

:::

- 运行 `npx webpack` 它将以 `src/index.js` 作为入口, 生成 `dist/main.js` 作为输出。到这里已经完成了基本的构建。

- 考虑从 `CLI` 运行本地 `webpack` 副本并不方便, 所以最后我们创建一个 `npm script`，执行 `npm run build` 即可。

::: tip

`npx` 命令随 `Node 8.2/npm 5.2.0` 或更高版本一起提供，运行` ./node_modules/.bin/webpack` 我们在一开始安装的 `webpack` 包的 `webpack` 二进制文件。

从 `webpack 4` 开始，`webpack` 不再需要任何配置。但大多数项目需要更复杂的设置, 所以我们创建了一个 `webpack.config.js`。

`webpack.config.js` 如果存在 `webpack` 将会默认选择它，我们也可以通过 `webpack --config webpack.config.js` 来指定配置文件。

:::

## 资产管理

`webpack` 最出色的功能之一就是 除了 `JavaScript` 之外，你还可以引入任何其他类型的文件，只要它们有加载器或内置的 `Asset Modules` 支持即可。

- 加载 CSS 、图像、字体、数据

```bash
# 加载 CSS
npm install --save-dev style-loader css-loader
# 导入 CSV、 TSV、 XML
npm install --save-dev csv-loader xml-loader
```

- `webpack` 使用正则表达式来确定应该查找哪些文件并将其提供给特定的加载器。

::: code-group

```javascript [webpack.config.js]
// 加载 CSS
module.exports = {
  ...
  // [!code ++] [!code focus]
  module: {
    // [!code ++] [!code focus]
    rules: [
      // [!code ++] [!code focus]
      {
        // [!code ++] [!code focus]
        test: /\.css$/i, // [!code ++] [!code focus]
        use: ['style-loader', 'css-loader'], // [!code ++] [!code focus]
      }, // [!code ++] [!code focus]
    ], // [!code ++] [!code focus]
  }, // [!code ++] [!code focus]
};
```

:::

::: code-group

```javascript [webpack.config.js]
// 加载图像&字体
module.exports = {
  ...
  module: {
    rules: [
      ...
      { // [!code ++] [!code focus]
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // [!code ++] [!code focus]
        type: 'asset/resource', // [!code ++] [!code focus]
      }, // [!code ++] [!code focus]
      { // [!code ++] [!code focus]
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // [!code ++] [!code focus]
        type: 'asset/resource', // [!code ++] [!code focus]
      }, // [!code ++] [!code focus]
    ],
  },
};
```

:::

::: code-group

```javascript [webpack.config.js]
// 加载数据
module.exports = {
  ...
  module: {
    rules: [
      ...
      { // [!code ++] [!code focus]
        test: /\.(csv|tsv)$/i, // [!code ++] [!code focus]
        use: ['csv-loader'], // [!code ++] [!code focus]
      }, // [!code ++] [!code focus]
      { // [!code ++] [!code focus]
        test: /\.xml$/i, // [!code ++] [!code focus]
        use: ['xml-loader'], // [!code ++] [!code focus]
      }, // [!code ++] [!code focus]
    ],
  },
};
```

:::

::: tip

模块加载器支持链式调用。它的执行顺序是倒序的。第一个加载器的结果将会传递给下一个加载器, 以此类推。
上述应该保持顺序： 先 `style-loader` 后 `css-loader`。

从 `webpack 5` 开始，使用内置的 `Asset Modules` 来处理资源模块, 资源模块会接收你通过它们加载的任何文件，并将其输出到你的构建目录。

:::

## 输出管理

在这之前，我们是手动在 `/dist/index.html` 中来引入 `main.js ` 脚本的。更改文件名或引入多个文件等种种原因我们不可能手动管理这个文件。

- 随着应用程序的增长 我们需要引入不同的多个文件, 设置 `HtmlWebpackPlugin` 来自动管理 :
- 当我们进行打包时 一般的步骤 `进行打包 -> 清理掉产物(dist) -> 生成新的产物`:

```bash
npm install --save-dev html-webpack-plugin
```

::: code-group

```javascript [webpack.config.js]
...
const HtmlWebpackPlugin = require('html-webpack-plugin'); // [!code ++] [!code focus]

module.exports = {
  entry: './src/index.js', // [!code --]
  entry: {  // [!code ++] [!code focus]
    index: './src/index.js', // [!code ++] [!code focus]
    print: './src/print.js', // [!code ++] [!code focus]
  }, // [!code ++] [!code focus]
  output: {
    filename: 'main.js', // [!code --]
    filename: '[name].bundle.js', // [!code ++] [!code focus]
    path: path.resolve(__dirname, 'dist'),
    clean: true, // [!code ++] [!code focus]
  },
  plugins: [ // [!code ++] [!code focus]
    new HtmlWebpackPlugin({ // [!code ++] [!code focus]
      title: 'Output Management', // [!code ++] [!code focus]
    }), // [!code ++] [!code focus]
  ] // [!code ++] [!code focus]
  ...
}
```

:::

## 开发环境

在开发过程中，我们不可能去每次手动打包并根据打包后的代码去调试项目。我们需要频繁的修改代码，更多的考虑的开发效率和调试效率，所以需要一个自动编译代码并运行的开发服务器。

- 为了更轻松地追踪错误和警告，`JavaScript` 提供了 `SourceMap`，它将编译后的代码映射回原始源代码。如果错误源自某个 JS，会准确地告知:

- 设置 `development`, 使用 `inline-source-map` 错误包含发生错误的文件和行号的引用：

::: code-group

```javascript [webpack.config.js]
...
module.exports = {
  mode: 'development', // [!code ++] [!code focus]
  devtool: 'inline-source-map', // [!code ++] [!code focus]
  ...
};
```

:::

- 为了每次更改代码后 都要手动 `npm run build` 来更新，`webpack` 提供了几种可选方式帮助在代码发生变化后自动编译代码：

- `Watch Mode` 观察模式: 其中一个文件发生更新，代码就会重新编译， 唯一的缺点是必须刷新浏览器才能看到更改:

::: code-group

```json [package.json]
"scripts": {
    ...
    "watch": "webpack --watch" // [!code ++] [!code focus]
  },
```

:::

- `webpack-dev-server` （大多数场景）: 它提供了一个基本的 `Web` 服务器，并支持实时重新加载。在编译之后不会写入任何输出文件，而是将 `bundle` 文件保留在内存中:

```bash
npm install --save-dev webpack-dev-server
```

::: code-group

```javascript [webpack.config.js]
...
module.exports = {
  ...
  devServer: { // [!code ++] [!code focus]
    static: './dist', // 从什么位置开始查找文件 // [!code ++] [!code focus]
  }, // [!code ++] [!code focus]
  optimization: { // [!code ++] [!code focus]
    runtimeChunk: 'single', // [!code ++] [!code focus]
  }, // [!code ++] [!code focus]
  ...
}
```

:::

::: code-group

```json [package.json]
"scripts": {
    ...
    "start": "webpack server --open" // [!code ++] [!code focus]
  },
```

:::

::: tip
添加这个 `optimization.runtimeChunk: 'single'` 是因为在这个例子中，单个 `HTML` 页面上有多个入口点。如果没有这个，可能会遇到 [这里](https://bundlers.tooling.report/code-splitting/multi-entry/) 描述的问题。
:::

- `webpack-dev-middleware`: 它是一个 `webpack-dev-server` 内部使用的包装，用于将处理过的文件发送到服务器。如果需要自定义设置，可单独作为包使用。 `webpack-dev-middleware` 与 `express` 服务器结合使用：

```bash
npm install --save-dev express webpack-dev-middleware
```

::: code-group

```javascript [webpack.config.js]
module.exports = {
  ...
  output: {
    ...
    publicPath: '/', // 保证文件上传在根目录访问 // [!code ++] [!code focus]
  },
  ...
};
```

:::

::: code-group

```javascript [server.js]
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

:::

::: code-group

```json [package.json]
"scripts": {
    ...
    "server": "node server.js" // [!code ++] [!code focus]
  },
```

:::

现在启动浏览器并转到 `http://localhost:3000` ，应用可以正常运行！
