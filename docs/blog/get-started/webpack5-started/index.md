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
  "build": "webpack" // [!code ++] [!code focus]
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

```javascript [加载 CSS]
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

```javascript [加载图像&字体]
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

```javascript [加载数据]
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

- 随着应用程序的增长 我们需要引入不同的多个文件, 设置 HtmlWebpackPlugin 来自动管理 :
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
