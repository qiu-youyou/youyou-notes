---
tag:
  - 理论知识
tags:
  - NPM
---

# 前端如何优雅的对 npm 包打补丁

> 在前端开发中使用第三方库时，经常会遇到需要修改第三包代码的场景，可能遇到 bug 或者需要扩展功能的情况。这时，如果我们不能等待上游修复或者需要立即解决问题，给包打补丁就成为了一种可行的解决方案。

## 📃 文件修改覆盖方法

比较传统的方案就是直接修改 `node_modules` 中的代码, 这种方法简单直接，但每次都需要手动更新。
当然我们也可以通过 `postinstall` 这个钩子，使用脚本来实现自动化，但并不够优雅。

### 实现步骤

- 项目中新建一个 `patches` 文件夹，找到我们要修改的包，复制到这个文件夹中并进行修改。
- 在 `patches` 文件夹中，新建一个 `postinstall.js` 文件，里面写上需要覆盖的逻辑。
- 在 `package.json` 中添加 `postinstall` 脚本，在安装时，自动执行脚本，来实现覆盖。

### 具体示例

作者遇到的场景就是在使用 `@sugarat/theme` 时，想修改首页的布局。该插件并没有提供任何 `API` 来实现。所以我们只能通过打补丁的方式来达到想要的效果。

还遇到了一个问题就是 在首页标签显示中 存在空标签的情况。

![](http://images.qiuyouyou.cn/notes/npm-patch-package-02.png)

- 通过查看包的源码，作者找到了需要修改的文件, 复制到 `patches` 文件夹中，并进了修改。

- 新建一个 `postinstall.js` 文件， 来复制修改后的文件到包中进行内容覆盖。

::: code-group

```js [patches/postinstall.js]
import fs from 'fs';
import path from 'path';

// 复制修改后的文件
copyFileSync(
  './patches/@sugarat-theme/BlogHomeTags.vue',
  './node_modules/@sugarat/theme/src/components/BlogHomeTags.vue'
);

// 复制修改后的文件
copyFileSync(
  './patches/@sugarat-theme/BlogHomeInfo.vue',
  './node_modules/@sugarat/theme/src/components/BlogHomeInfo.vue'
);

function copyFileSync(source, target) {
  let targetFile = target;

  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}
```

:::

- 在 `package.json` 中添加 `postinstall` 脚本，来实现每次安装后自动覆盖。

::: code-group

```json [package.json]
  "scripts": {
    "postinstall": "node patches/postinstall.js" // [!code focus] [!code ++]
  },
```

:::

- 这时我们可以手动的通过 `npm run postinstall` 来进行一次覆盖。
- 也可以删除 `node_moudles` 文件夹，再次进行安装，测试补丁的效果。

::: tip postinstall 是 npm 脚本默认的钩子

在 `npm` 脚本中有 `pre` 和 `post` 两个钩子。

比如 `build` 脚本命令的钩子就是 `prebuild` 和 `postbuild`。

我们使用的 `postinstall` 这个钩子的执行顺序是 `preinstall` -> `install` -> `postinstall`。也就是在 `install` 之后，再执行 `postinstall` 执行我们的脚本进行覆盖。

自定义的脚本命令也可以加上 `pre` 和 `post` 钩子, 比如 `test` 也可以有钩子 `pretest` 和 `posttest`。

更多可以阅读：[npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
:::

## 📃 使用 patch-package

通过上面的方法可以达到临时给我们的需要的地方打上补丁，这种方法只适合简单的修改某个文件。它并不能避免版本升级可能带来的问题。

- `patch-package` 当你安装的版本和补丁版本不一致时，`npx patch-package` 会直接报错 ： `**ERROR** Failed to apply patch for package xxxx at path`。

- `patch-package` 使用 `git diff` 来记录补丁比起重写一份源码的方法更安全。

### 实现步骤

- 安装 `patch-package` 到项目中并 添加 `postinstall` 脚本为 `patch-package`
- 在 `node_modules` 中找到我们要修改的目标代码文件并修改。
- 修改后手动执行 `npx patch-package <package-name>` 生成修改后的补丁文件。
- 将生成的 `.patch` 文件提交到版本控制中, 每次运行 `install` 时，会自动应用补丁文件。

### 具体示例

::: code-group

```sh
npm install patch-package --save-dev
```

:::

::: code-group

```json [package.json]
  "scripts": {
    "postinstall": "patch-package" // [!code focus] [!code ++]
  },
```

:::

- 手动修改 `node_modules` 依赖包中的源码，然后执行 `npx patch-package <package-name>` 生成补丁文件，再提交到版本控制中。

::: code-group

```sh
npx patch-package @@vueuse/core
```

:::

- 可以看到项目中生成了一个 `patches` 文件夹，里面包含了 `@@vueuse/core` 的 `.patch` 补丁文件。

![](http://images.qiuyouyou.cn/notes/npm-patch-package-03.png)

打开文件不难发现，文件中就是记录了一下 `git diff` 记录的描述，这种方案既保持了修改的简便性，又解决了持久化的问题，是一个非常实用的开发技巧。

## 📃 使用 pnpm patch

如果你使用 `patch-package` 并且使用了 `pnpm` 你应该会遇到这个问题:
可以看出来他只支持 `npm` 、`yarn` - [issues](https://github.com/ds300/patch-package/issues/338)，。

![](http://images.qiuyouyou.cn/notes/npm-patch-package-01.png)

<br />

那么随着 `pnpm` 包管理器的流行，它也提供了原生的 `patch` 功能, 使用方式也更加简单。

### 实现步骤

- 使用 `pnpm patch <package-name>`，会将包解压到一个临时目录。
- 我们对文件进行修改后，执行 `pnpm patch-commit <temporary-patch>` 生成补丁文件。
- 最后需要在 `package.json` 中添加对 `pnpm patch`的配置，每次安装自动应用补丁文件。

::: code-group

```json [package.json]
{
  "pnpm": {
    "patchedDependencies": {
      "package-name@version": "patches/package-name@version.patch"
    }
  }
}
```

:::

- 如果我们想删除 `pnpm.patchedDependencies` 中的现有补丁文件和设置。

::: code-group

```sh
pnpm patch-remove package-name@version package-name@version
```

:::

### 具体示例

还是上面 [这个 👆](/coffee/concept/npm/npm-patch-package#具体示例) 场景。

依然可以发现文件中就是记录了一下 `git diff` 记录的描述。

![](http://images.qiuyouyou.cn/notes/npm-patch-package-04.png)

当我们执行完 `pnpm patch-commit` 后，`pnpm` 已经为我们在 `package.json` 中自动添加了 `pnpm patch` 的配置：

![](http://images.qiuyouyou.cn/notes/npm-patch-package-05.png)

我们把补丁文件提交到仓库中。当团队中的任何伙伴每次执行 `pnpm install` 时，`pnpm` 会自动应用补丁文件，就可以实现打补丁的功能了。

## 📃 总结

以上的方案呢 都各有特点，需要我们根据项目情况或者我们使用的包管理器来进行选择。

如果使用的 `npm` 或者 `yarn` 你就可以选择 `patch-package`。

如果你使用的 `pnpm` 那么就推荐更现代的 `pnpm` 补丁方案。
