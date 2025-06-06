# Webpack5 跟随官方文档 上手实践 2

该文档跟随 [官方文档](https://webpack.js.org/guides/) 进行实践。只整理重要的知识点以及纪录关键步骤。[完整代码](https://github.com/qiu-youyou/webpack-guides)

## 代码分割

代码拆分可以将代码拆分成多个 `bundle`，然后根据需要或并行加载。它可以用来实现更小的 `bundle`，并控制资源加载优先级，如果使用得当，可以显著缩短加载时间。

常用的三种代码拆分方法：

### 多个入口

最简单最直观的方法，需要手动操作。默认情况下，每个入口块都会存储其使用的所有模块。下面例子，`lodash` 会在两个 `bundle` 中重复出现:

::: code-group

```javascript [src/print.js]
// 在两个文件中 都引入 lodash
import _ from 'lodash';
console.log(_.join(['Another', 'module', 'loaded!'], ' '));
```

:::

### 防止重复

- 使用 `dependOn` 选项，可以将模块从一个入口块共享到另一个入口块:
- 打包后 会看到 `shared.bundle.js` 这个文件:

::: code-group

```javascript [webpack.config.js]
...
module.exports = {
  ...
   entry: {
    index: { // [!code ++] [!code focus]
      import: './src/index.js', // [!code ++] [!code focus]
      dependOn: 'shared' // [!code ++] [!code focus]
    }, // [!code ++] [!code focus]
    print: { // [!code ++] [!code focus]
      import: './src/print.js', // [!code ++] [!code focus]
      dependOn: 'shared' // [!code ++] [!code focus]
    }, // [!code ++] [!code focus]
    shared: ['lodash'] // [!code ++] [!code focus]
  },
  ...
}

```

:::

::: tip
`dependOn` 支持字符串和字符串数组。同时也可以使用数组为每个条目指定多个文件；

```
dependOn: ['a', 'b']
a: ['a1', 'a2', 'a3']
b: ['b1', 'b2']

```

:::

- 还可以使用 `SplitChunksPlugin`, 它可以将常见的依赖项提取到现有的入口块或全新的块中:
- 需要注意的是，只有当公共依赖项满足 `webpack` 指定的强制分割的大小阈值，才会将其提取到单独的块中:

::: code-group

```javascript [webpack.config.js]
...
module.exports = {
  ...
  entry: {
    index: './src/index.js', // [!code ++] [!code focus]
    print: './src/print.js', // [!code ++] [!code focus]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { // [!code ++] [!code focus]
      chunks: 'all', // [!code ++] [!code focus]
    }, // [!code ++] [!code focus]
  },
  ...
}
```

:::

### 动态导入

`webpack` 提供了两个类似的技术实现动态代码分离：

- 一种是 `webpack` 的遗留功能，`require.ensure`。

- 最推荐的是使用符合 `ECMAScript` 提案 的 `import()`语法 实现动态导入:

::: code-group

```javascript [webpack.config.js]
...
module.exports = {
  ...
  entry: {
    index: './src/index.js',
    print: './src/print.js', // [!code --] [!code focus]
  },
  ...
  optimization: { // [!code --] [!code focus]
    runtimeChunk: 'single', // [!code --] [!code focus]
    splitChunks: { // [!code --] [!code focus]
      chunks: 'all', // [!code --] [!code focus]
    }, // [!code --] [!code focus]
  }, // [!code --] [!code focus]
  ...
}
```

:::

::: code-group

```javascript{3} [src/index.js]
async function getComponent() {
  const element = document.createElement('div');
  const { default: _ } = await import('lodash'); // [!code focus]
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

:::

打包后会发现 `lodash` 被分离到了一个单独的 `bundle`

::: tip
需要 `default` 的原因是自 `webpack 4` 之后，在导入 `CommonJS` 模块时，将不再解析为 `module.exports` 的值，而是创建一个手动命名空间对象来表示此 `CommonJS` 模块。
:::

::: tip

可以 `import(/* webpackChunkName: "lodash" */ 'lodash')` 指定名称分离 `bundle` 的名称。

:::

我们拆分代码后，还可以使用 [官方分析工具](https://github.com/webpack/analyse) 或其他工具来分析输出结果。

### Prefetching/Preloading (预获取/预加载)

`Webpack v4.6.0+` 版本 支持了 `prefetch`(预获取) 和 `preload`(预加载)。

- `prefetch` (预获取) 未来某页面可能需要访问的的资源。
- 适合用在用户未来可能访问的页面、资源上。
- 在构建时会在页面头生成并追加 `<link rel="prefetch" href="login-modal-chunk.js">`。指定浏览器 预获取 该文件:

```javascript
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

- `Preloading` (预加载) 当前页面下能需要访问的资源。
- 适合用在当前的关键资源上，优化初次渲染时的资源加载顺序, 确保关键资源不会被阻塞。
- 在请求当前资源时会同时经过 `<link rel="preload">` 来请求 `ChartingLibrary`, 这将会使加载时间能够更短一点，因为只进行单次往返，而不是两次往返，尤其是在高延迟环境下。但是不正确的使用 `webpackPreload` 会有性能损耗。

```javascript
import(/* webpackPreload: true */ 'ChartingLibrary');
```

::: tip Prefetching & Preloading
预加载 会在父级加载时以并行方式加载，预获取 是在父级加载结束后开始加载；

预加载 具有中等优先级 立即下载，预获取 在浏览器闲置时才下载；

预加载：在父级当下时刻立即请求，预获取 是在将来的某个时刻；
:::

## 懒加载

懒加载或按需加载实际上是把代码从一些逻辑断点中分开，在触发某个操作后去引用一些新的资源。这样既加快了初始加载的速度，也减轻了体积。

我们在上面生成的 `lodash.bundle.js` 在概念上“懒加载”了它。但是目前在每次打开页面都会请求他。我们需要在使用到它时再去加载它：

下面测试，默认加载了 `index.bundle`，当点击发生时 才加载了 `print.bundlue`：

::: code-group

```javascript [src/print.js]
console.log('The print.js module has loaded! See the network tab in dev tools...');

export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};
```

:::

::: code-group

```javascript [src/index.js]
function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.appendChild(br);
  element.appendChild(button);

  button.onclick = (e) =>
    import(/* webpackChunkName: "print" */ './print').then((module) => {
      const print = module.default;

      print();
    });

  return element;
}

document.body.appendChild(component());
```

:::

::: tip
当调用 `ES6` 的 `import` 方法时，必须指向模块的 `.default` 值，因为它才是 `promise` 被处理后 返回的实际 `module` 对象。
:::

许多框架对于实现懒加载 有他们自己建议的方式：

```javascript
// react
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

```javascript
// vue
const MyComponent = () => import('~/components/MyComponent.js');
```

## 缓存

当浏览器访问服务器获取站点及资源。由于获取服务器上的资源是一个比较耗时的操作。因此浏览器会使用 缓存 技术。可以降低流量，加载更快。

当访问的资源文件名没有被更改，浏览器可能就会认为没有被更新，从而命中缓存。

通过 `webpack` 配置，来确保编译的文件能够被客户端缓存。当内容发生变化后，获取新的代码:

### 可替换模板字符串

- 更改 `output.filename` 中的 `substitutions` 以定义输出文件的名称。

- `[contenthash]` 将根据资源内容创建唯一哈希值。当资源内容发生变化时，`[contenthash]` 也会发生变化。

:::code-group

```javascript [webpack.config.js]
...
module.exports = {
  ...
  output: {
    filename: '[name].bundle.js', // [!code --]
    filename: '[name].[contenthash].js' // [!code ++] [!code focus]
  }
  ...
}
```

:::

### 提取模板

- 当使用 `[contenthash]` 时，每次的 `build` 即使不修改原始文件，文件名依然会发生改变，这并不稳定。这是因为 `webpack` 在入口 `chunk` 中包含了某些引导模板 `(boilerplate)`，特别是 `runtime` 和 `manifest`。

- 我们通过提取引导模板，将 `runtime` 拆分为一个 `chunk` 文件。同样也可以把 `lodash` 这样的第三方库，单独提取到一个 `chunk` 中:

- 再次构建，可以看到单独的 `runtime` 和 `vendor`，并且 `index.js` 中不再包含 `lodash` 的代码:

::: code-group

```javascript [webpack.config.js]
...
module.exports = {
  ...
  optimization: { // [!code ++] [!code focus]
    moduleIds: 'deterministic', // vendor 哈希值保持一致 // [!code ++] [!code focus]
    runtimeChunk: 'single', // 为所有 runtime 创建 runtime bundle // [!code ++] [!code focus]
    splitChunks: { // [!code ++] [!code focus]
      cacheGroups: { // 使用 SplitChunksPlugin 来分离文件 // [!code ++] [!code focus]
        vendor: { // [!code ++] [!code focus]
          // 为 node_modules 创建 vendor bundle
          test: /[\\/]node_modules[\\/]/, // [!code ++] [!code focus]
          name: 'vendors', // [!code ++] [!code focus]
          chunks: 'all', // [!code ++] [!code focus]
        }, // [!code ++] [!code focus]
      }, // [!code ++] [!code focus]
    }, // [!code ++] [!code focus]
  },
  ...
}

```

:::
