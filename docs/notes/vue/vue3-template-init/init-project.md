---
tag:
  - Vue

description: 本篇笔记介绍了如何基于 Vite 快速搭建 Vue3 项目模板，并集成自动路由、布局、原子化 CSS、自动导入、组件自动注册、Mock 接口等常用开发方案，适合 Vue3 项目初始化参考。

sticky: 9999
recommend: 1

date: 2025-02-19 22:03:10
---

# Vue3 基础项目模板搭建 - 初始化项目

## ➿ 创建项目

[vite](https://cn.vite.dev/) 创建项目:

::: code-group

```sh [pnpm]
pnpm create vite youyou-vue3-template
```

:::

![](http://images.qiuyouyou.cn/notes/init-project.jpg)

安装项目依赖:

::: code-group

```sh [pnpm]
cd youyou-vue3-template
pnpm install
```

:::

删除不必要的文件:

::: code-group

```sh
rm -rf src/components/icons src/components/__tests__

rm src/components/HelloWorld.vue src/components/TheWelcome.vue src/components/WelcomeItem.vue

rm src/views/AboutView.vue src/stores/counter.ts src/assets/base.css
```

:::

修改默认文件代码如下:

- 1. 清空 `src/assets/main.css`：
- 2. 修改 `src/views/HomeView.vue` ：
- 3. 修改 `src/router/index.ts` ：
- 4. 修改 `src/views/App.vue` ：

::: code-group

```vue [HomeView.vue]
<template>
  <div>this is home view</div>
</template>
```

```ts [index.ts]
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
});

export default router;
```

```vue [App.vue]
<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>
```

```css [main.css]
/** this is main.css */
```

:::

安装并引入 [reset-css](https://www.npmjs.com/package/reset-css) 重置默认样式:

::: code-group

```sh [pnpm]
pnpm install reset-css
```

:::

::: code-group

```ts{7} [src/main.ts]
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import 'reset-css' // [!code focus]

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
```

:::

使用 `pnpm dev` 运行项目即可。

::: tip
除了 [reset.css](https://www.npmjs.com/package/reset-css) 外，还有很多类似的库，比如 [normalize.css](https://necolas.github.io/normalize.css/)，自行选择。

其实后面的我们使用的 CSS 框架都有 重置样式表 的预设。[CSS 框架方案](/blog/vue3-template/init-project/#css-方案) 中会提到。

:::

## ➿ 路由方案

这里采用自动路由方案：[unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

手动路由：路由配置文件会非常冗长、配置文件难以维护。 (约定大于配置？)

自动路由：是指通过一定的配置和工具，实现路由的自动生成，而无需手动编写每个路由的配置。这种方案可以显著提高开发效率，减少人为错误，并使得项目的路由管理更加清晰和可维护。

::: tip

[unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 是一个构建时的插件，能够基于 Vue 组件文件自动生成路由配置。

[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) 也是基于文件系统的路由生成方案。它为 vite 而设计，其他场景不适用。

:::

安装 `unplugin-vue-router` 插件：

::: code-group

```sh [pnpm]
pnpm install -D unplugin-vue-router
```

:::

在 `vite.config.ts` 中配置 `unplugin-vue-router`：

::: code-group

```ts{6,10,11} [vite.config.ts]
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import VueRouter from "unplugin-vue-router/vite"; // [!code focus]

export default defineConfig({
  plugins: [
    VueRouter({ routesFolder: 'src/views' }), // [!code focus]
    vue(), // Vue() 必须放在 VueRouter() 之后 // [!code focus]
    vueJsx(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

:::

::: tip [routesFolder](https://uvr.esm.is/guide/file-based-routing.html#custom-extensions)
默认情况下，`unplugin-vue-router` 插件会检查文件夹 `src/pages` 中 `.vue` 文件，并根据文件名生成相应的路由结构。
这里通过添加 `routesFolder` 来配置它。
:::

::: warning
Vite 在使用插件时有顺序要求。Vue 的插件一定要在 VueRouter 的后面进行注册配置。
:::

在 `router.ts` 中配置 `vue-router/auto` :

::: code-group

```ts {1,2,6} [src/router/index.ts]
import { createRouter, createWebHistory } from 'vue-router/auto'; // [!code focus]
import { routes } from 'vue-router/auto-routes'; // [!code focus]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // [!code focus]
});

export default router;
```

:::

::: warning 模块“"vue-router/auto"”没有导出的成员“createRouter”。

如果你遇到了这个问题：

![](http://images.qiuyouyou.cn/notes/auto-routes-ts-error.jgp.jpg)

这里按照文档方式来处理一下：[传送](https://github.com/posva/unplugin-vue-router?tab=readme-ov-file#setup)

我这里向 `env.d.ts` 文件中添加类型：

```ts{2}
/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" /> // [!code focus]
```

:::

配置捕获所有 `(Catch-All)`，来引导 `404` 没有找到的路由：

> 当你使用自动路由方案（如通过 unplugin-vue-router 插件或其他类似工具）时，创建一个捕获所有（catch-all）或 404 未找到（Not Found）路由的功能变得非常简便。

::: tip [官方文档](https://uvr.esm.is/guide/file-based-routing.html#catch-all-404-not-found-route)

要创建 `Catch-All`，请在名称前添加 `...`，例如 `src/pages/[...path].vue` 将创建具有以下路径的路由：`/:path(.*)`。这将匹配任何路由。这也可以在文件夹内完成，例如 `src/pages/articles/[...path].vue` 将创建具有以下路径的路由：`/articles/:path(.*)`。

:::

在 `src/views/` 中新增 `[...all].vue`:

::: code-group

```vue [src/views/[...all].vue]
<template>
  <div>404 page</div>
</template>
```

:::

创建几个文件来测试自动路由效果：

::: code-group

```vue [src/views/index.vue]
<template>
  <div>this is index</div>
</template>
```

```vue [src/views/about.vue]
<template>
  <div>this is about</div>
</template>
```

```vue [src/views/more.vue]
<template>
  <div>this is more</div>
</template>
```

:::

![](http://images.qiuyouyou.cn/notes/auto-route-example.jpg)

## ➿ 全局布局

[vite-plugin-vue-layouts](https://github.com/johncampionjr/vite-plugin-vue-layouts) : 在我们的项目中，除了一级路由 在项目中还涉及嵌套路由的情况，也就是不同层级使用同一组布局 。该插件允许开发者为不同页面指定布局，从而实现更灵活的页面结构管理。

安装并配置 [vite-plugin-vue-layouts](https://github.com/johncampionjr/vite-plugin-vue-layouts) :

::: code-group

```sh [pnpm]
pnpm install -D vite-plugin-vue-layouts
```

:::

::: code-group

```ts{8,16-20} [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import VueRouter from 'unplugin-vue-router/vite'

import Layouts from 'vite-plugin-vue-layouts' // [!code focus]

export default defineConfig({
  plugins: [
    VueRouter({ routesFolder: 'src/views' }),
    vue(), // Vue() 必须放在 VueRouter() 之后
    vueJsx(),
    // [!code focus:6]
    Layouts({
      layoutsDirs: 'src/layouts', // 指定布局文件
      defaultLayout: 'default', // 指定默认布局
      pagesDirs: 'src/views', // 指定页面文件
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

```

:::

::: tip
布局文件通常存储在 `/src/layouts` 文件夹中（默认设置，但可配置）。
:::

::: code-group

```ts{3,7} [src/router/index.ts]
import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts"; // [!code focus]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes), // [!code focus]
});

export default router;
```

:::

::: warning 找不到模块“virtual:generated-layouts”或其相应的类型声明。

如果你遇到了这个问题：

![](http://images.qiuyouyou.cn/notes/layouts-ts-error.jgp.jpg)

和上个问题一样在这里向 `env.d.ts` 文件中添加类型：

```ts{3}
/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" /> // [!code focus]
```

:::

在 `src` 创建 `layouts` 文件夹以及 `default.vue` 文件:

::: code-group

```vue [src/layouts/default.vue]
<template>
  <h1 style="font-size: 20px; margin: 10px">this is default layout</h1>
  <header style="font-size: 18px; color: red; margin: 10px">this is default header</header>

  <div style="margin: 10px; color: blue">
    <router-link to="/">index</router-link>
    |
    <router-link to="/about">about</router-link>
    |
    <router-link to="/more">more</router-link>
  </div>

  <div style="margin: 10px">
    <router-view></router-view>
  </div>

  <footer style="font-size: 18px; color: red; margin: 10px">this is default footer</footer>
</template>
```

:::

在 `src/layouts` 文件夹创建 `home.vue` 文件:

::: code-group

```vue [src/layouts/home.vue]
<template>
  <h1 style="font-size: 20px; margin: 10px">this is home layout</h1>
  <header style="font-size: 18px; color: red; margin: 10px">this is home header</header>

  <div style="margin: 10px">
    <router-view></router-view>
  </div>

  <footer style="font-size: 18px; color: red; margin: 10px">this is home footer</footer>
</template>
```

:::

指定 `index.vue` 的布局 为 `home`，`about.vue` `more.vue` 为 `default`：

::: code-group

```vue{5-8} [src/views/index.vue]
<template>
  <div>this is index</div>
</template>

<route lang="yaml"> // [!code focus:5]
meta:
  layout: home
</route>
```

```vue{5-8} [src/views/about.vue]
<template>
  <div>this is about</div>
</template>

<route lang="yaml"> // [!code focus:5]
meta:
  layout: default
</route>
```

```vue{5} [src/views/more.vue]
<template>
  <div>this is more</div>
</template>

// 默认布局可以不指定 // [!code focus]
```

:::

![](http://images.qiuyouyou.cn/notes/layout-example.jpg)

> 还可以配置过渡效果、参数传递等。阅读 🫱 [官方文档](https://github.com/johncampionjr/vite-plugin-vue-layouts?tab=readme-ov-file#transitions)

## ➿ CSS 方案

这里采用 CSS 框架 [unocss](https://github.com/unocss/unocss)

UI 库：UI 库有特定的场景, UI 库中把样式都已写好，如果你想定制样式，需要修改自定义的样式文件或定制主题、并熟悉该 UI 框架的文档。按要求进行修改。

CSS 框架：搭建一个通用的框架 推荐使用 CSS 框架(原子化 CSS 引擎)。可以按照自己的想法来书写。当实现一些定制性强的需求 (如首页、很难去复用各 UI 库的样式)。

::: tip [tailwindcss](https://github.com/tailwindlabs/tailwindcss) 与 [unocss](https://github.com/unocss/unocss)

这里官方文档说明了不同: [How is UnoCSS Different from X?](https://unocss.dev/guide/why#how-is-unocss-different-from-x)

其实 Windi CSS 和 UnoCSS 都从 Tailwind CSS 中汲取了很多灵感。

如果对于项目提及有要求或新能有要求 推荐 unocss，unocss 的特点就是速度快、体积小。

如果追求稳定性，以及后续的更新支持 和完整的文档 推荐 tailwindcss。

当然 unocss 使用 Wind Preset 是个不错的方案！🎉

:::

::: tip 关于重置样式表
其实 `tailwindcss / unocss` 都自带了 `reset css`。

可以移除掉上文 [创建项目](/blog/vue3-template/init-project/#创建项目) 中的`reset-css` 使用框架的 `reset`。

具体可以看：在 `tailwindcss` 中关于 [base style](https://tailwindcss.com/docs/preflight) 和 在 `unocss` 中关于 [style-reset](https://unocss.dev/guide/style-reset)

根据需求选择合适的重置样式表、以确保网页的一致性和可靠性 (比如选择 [Tailwind compat](https://unocss.dev/guide/style-reset#tailwind-compat))。

::: code-group

```sh [pnpm]
pnpm add @unocss/reset
```

:::

::: code-group

```ts [src/main.ts]
import '@unocss/reset/tailwind-compat.css';
```

:::

安装 [unocss](https://github.com/unocss/unocss) 并配置 [Presets](https://unocss.dev/guide/presets) ：

::: tip 预设 Presets

看看 [官方文档](https://unocss.dev/guide/presets)

预设是 UnoCSS 的核心。它们可让您在几分钟内创建自己的自定义框架。

`UnoCSS` 提供了很多 `Presets`，这样就可以在 `UnoCSS` 中使用 `tailwindcss` 的类和写法。

文档也提供了更多 Presets [官方 Presets](https://unocss.dev/presets/#official-packages) 和 [社区 Presets](https://unocss.dev/presets/community#community-presets)
:::

::: code-group

```sh [pnpm]
pnpm add -D unocss @unocss/preset-wind
```

:::

::: code-group

```ts{8,21} [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'

import UnoCSS from 'unocss/vite' // [!code focus]

export default defineConfig({
  plugins: [
    VueRouter({ routesFolder: 'src/views' }),
    vue(), // Vue() 必须放在 VueRouter() 之后
    vueJsx(),
    Layouts({
      layoutsDirs: 'src/layouts', // 指定布局文件
      defaultLayout: 'default', // 指定默认布局
      pagesDirs: 'src/views', // 指定
    }),

    UnoCSS(), // [!code focus]
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

```

:::

在根目录创建 `uno.config.ts` :

::: code-group

```ts [uno.config.ts]
import { defineConfig } from 'unocss';

import presetWind from '@unocss/preset-wind'; // Preset

export default defineConfig({
  // ...UnoCSS options
  presets: [presetWind()], // Preset
});
```

:::

::: code-group

```ts{8} [src/main.ts]
import '@unocss/reset/tailwind-compat.css'
import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

import "virtual:uno.css"; // [!code focus]

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
```

:::

::: code-group

```vue{3,4} [src/views/index.vue]
<template>
  <div>Hello Index</div>
  <div class="p-4">Hello UnoCSS</div> // [!code focus]
  <h1 class="text-3xl font-bold underline">Hello world!</h1> // [!code focus]
</template>

```

:::

![](http://images.qiuyouyou.cn/notes/unocss-example.jpg)

## ➿ 图标方案

[Iconify](https://iconify.design/) : unocss 中使用 Iconify 作为图标数据源 🫱 [文档](https://unocss.dev/presets/icons#install)

::: tip
使用 @iconify-json/(图标集) 下载相应的图标集。

也可以一次安装 Iconify 上所有可用的图标集 (@iconify/json 数据量大 建议选择常用合集下载)
:::

`unocss` 配置 `iconify` :

::: code-group

```ts [uno.config.ts]
import { defineConfig } from 'unocss';
import { presetWind, presetIcons } from 'unocss'; // presets // [!code focus]

export default defineConfig({
  // ...UnoCSS options
  presets: [
    presetWind(),
    // [!code focus:9]
    presetIcons({
      prefix: 'i-', // 设置前缀
      // 设置额外的css属性
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
});
```

:::

遵循约定来使用图标: `<prefix><collection>-<icon>`、`<prefix><collection>:<icon>`:

检查所有可用 [图标](https://icones.js.org/)

::: code-group

```vue [src/views/index.vue]
<template>
  <!-- A basic anchor icon from Phosphor icons -->
  <div class="i-ph-anchor-simple-thin" />
  <!-- An orange alarm from Material Design Icons -->
  <div class="i-mdi-alarm text-orange-400" />
  <!-- Twemoji of laugh, turns to tear on hovering -->
  <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />

  <!-- 前缀 图标集:图标名称。 也可以设置style -->
  <div class="i-carbon:4k-filled" style="color: green; font-size: 60px"></div>
</template>
```

:::

![](http://images.qiuyouyou.cn/notes/unocss-icon-example.jpg)

## ➿ 自动导入依赖

> [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)：在项目中，频繁引入依赖包是一个常见的操作，但手动引入依赖包往往繁琐。可以通过自动导入的插件，就可以自动导入我们的 API。

安装配置 [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)：

::: code-group

```sh [pnpm]
pnpm i -D unplugin-auto-import
```

:::

安装 [VueUse](https://vueuse.org/) 并配置 `AutoImport` :

`AutoImport` 更多配置请阅读 [官方文档](https://github.com/unplugin/unplugin-auto-import?tab=readme-ov-file#configuration)。

::: code-group

```sh [pnpm]
pnpm i @vueuse/core
```

:::

::: code-group

```ts{10-13,28-46} [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'

import UnoCSS from 'unocss/vite'

// 自动导入 // [!code focus:4]
import AutoImport from 'unplugin-auto-import/vite'
// 这里使用的是 unplugin-vue-router 而不是 vue-router
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig({
  plugins: [
    VueRouter({ routesFolder: 'src/views' }),
    vue(), // Vue() 必须放在 VueRouter() 之后
    vueJsx(),
    Layouts({
      layoutsDirs: 'src/layouts', // 指定布局文件
      defaultLayout: 'default', // 指定默认布局
      pagesDirs: 'src/views', // 指定
    }),

    UnoCSS(),
    // [!code focus:20]
    AutoImport({
      // targets to transform (哪些文件需要解析)
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register (全局需要注册的内容)
      imports: [
        'vue',
        // 这里使用的是 unplugin-vue-router 而不是 vue-router
        // 要使用我们选择的自动路由方案
        VueRouterAutoImports,
        // VueUse 配置自动导入
        '@vueuse/core',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

```

:::

重启后生成了类型文件 `auto-imports.d`。并导入了上面我们 `imports` 的所有内容。

增加 `auto-imports.d.ts` 到 `tsconfig.app.json `，让 `ts` 程序能够识别:

::: code-group

```json{9} [tsconfig.app.json]
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  // [!code focus:8]
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "typed-router.d.ts",
    "auto-imports.d.ts"
  ],

  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

:::

::: code-group

```vue{10-13} [src/views/index.vue]
<template>
  <div>Hello Index</div>
  <div class="p-4">Hello UnoCSS</div>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <div>{{ msg }}</div>
  <div>pos: {{ x }}, {{ y }}</div>
</template>

<script setup lang="ts">
// 这里可以不在vue的核心库中进行引入 ref 了 // [!code focus:4]
const msg = ref("hello auto import");
// 可以不在vueuse的核心库中进行引入 useMouse
const { x, y } = useMouse();
</script>
```

:::

::: warning 权衡
并非所以依赖都适合自动导入，项目内的代码就不一定适合。

自动引入后，从开发的角度就会丢失依赖链路，虽然另外生成了 Typescript 声明文件，IDE 能够正常识别， 但对于新加入项目的同学来说，他们不一定知道是自动引入，因此可能会降低了一些可读性。

:::

## ➿ 自动注册组件

> [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)：解决的是在 vue 项目中自动导入以 .vue、.ts、.tsx 这些组件。使用插件结合 setup 语法糖，让编写变得更加方便。

::: tip
DRY 原则是编写程序中，经常会用到的概念。

DRY (Don't Repeat Yourself 不要重复你自己)

程序员可以让程序帮我们做很多重复的事情。大大提高效率。
:::

安装配置 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) ：

::: code-group

```sh [pnpm]
pnpm i -D unplugin-vue-components
```

:::

::: code-group

```ts{15,50} [vite.config.ts]
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'

import UnoCSS from 'unocss/vite'

// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 这里使用的是 unplugin-vue-router 而不是 vue-router
import { VueRouterAutoImports } from 'unplugin-vue-router'

import Components from 'unplugin-vue-components/vite' // [!code focus]

export default defineConfig({
  plugins: [
    VueRouter({ routesFolder: 'src/views' }),
    vue(), // Vue() 必须放在 VueRouter() 之后
    vueJsx(),
    Layouts({
      layoutsDirs: 'src/layouts', // 指定布局文件
      defaultLayout: 'default', // 指定默认布局
      pagesDirs: 'src/views', // 指定
    }),

    UnoCSS(),

    AutoImport({
      // targets to transform (哪些文件需要解析)
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register (全局需要注册的内容)
      imports: [
        'vue',
        // 这里使用的是 unplugin-vue-router 而不是 vue-router
        // 要使用我们选择的自动路由方案
        VueRouterAutoImports,
        // VueUse 配置自动导入
        '@vueuse/core',
      ],
    }),

    Components(), // [!code focus]
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

```

:::

这时重启调试进程后在根目录同样会生成一个类型文件 `components.d.ts`.

也是同样样把它加入到 `tsconfig.app.json`，让 `ts` 程序能够识别:

::: code-group

```json [tsconfig.app.json]
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": [
    "env.d.ts",
    "src/**/*",
    "src/**/*.vue",
    "typed-router.d.ts",
    "auto-imports.d.ts",
    "components.d.ts" // [!code focus]
  ],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

:::

在 [官方文档-默认配置](https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#configuration) 中可以看到，默认它的组件找寻路径是 `src/components` 。

我们在项目中新建两个组件：

::: code-group

```sh
touch src/components/HelloWorld.vue
# 同样也支持子目录的组件
mkdir src/components/user
touch src/components/user/UserComponent.vue
```

:::

::: code-group

```vue [src/views/index.vue]
<template>
  <!-- 不需要引入就可以使用 组件 -->
  <HelloWorld></HelloWorld>
  <UserComponent></UserComponent>
</template>
```

:::

::: tip
在 [官方文档-默认配置](https://github.com/unplugin/unplugin-vue-components?tab=readme-ov-file#configuration) 中 同名组件 是不会进行覆盖 默认 `false`：

```ts
// Allow for components to override other components with the same name
// (允许组件覆盖同名的其他组件)
allowOverrides: false,
```

在我们创建组件时一般会规避出现同名组件的情况。但如果有这种情况。我们通常也会加上组件的 私缀 来处理：
在默认配置中：

```ts
// Allow subdirectories as namespace prefix for components.
// (允许子目录作为组件的命名空间前缀。)
directoryAsNamespace: false,
```

可以更改为 `true`：

```ts [vite.config.ts]
// ......
Components({ directoryAsNamespace: true,}),
```

```ts [src/pages/index.vue]
<UserUserComponent></<UserUserComponent>
```

可以发现 在 `components.d.ts` 中的变化：

```ts
// before
UserComponent: typeof import('./src/components/user/UserComponent.vue')['default'];

// after：增加了一个并带上了文件夹最为前缀
UserComponent: typeof import('./src/components/user/UserComponent.vue')['default'];
UserUserComponent: typeof import('./src/components/user/UserComponent.vue')['default'];

// 这时如果有一个文件夹中也有 UserComponent.vue。比如：admin/UserComponent.vue
// 同样也会带上 文件的前缀
AdminUserComponent: typeof import('./src/components/admin/UserComponent.vue')['default'];
```

当然也可以省略问与组件相同的前缀: `collapseSamePrefixes: true,`

```ts
// before
UserComponent: typeof import('./src/components/user/UserComponent.vue')['default'];
UserUserComponent: typeof import('./src/components/user/UserComponent.vue')['default'];

// after：与 user 文件夹 相同名称的前缀，前缀会被省略：
// UserUserComponent 从 components.d.ts 中删除了
UserComponent: typeof import('./src/components/user/UserComponent.vue')['default'];
```

:::

::: warning
如果你在测试时 `components.d.ts` 文件没变化。可以删除该文件。然后重启程序。
:::

## ➿ 接口 MOCK

在前端项目的开发过程中，有时候我们会需要一些模拟数据。这样我们的开发可以优先于后端的接口。可以先调试本地的数据和一些交互。

[vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock) : 一款针对 vite 的 mock 插件，基于 mockjs 开发。并且同时支持本地环境和生产环境。本地使用 connect 服务中间件，线上使用 mockjs。

安装并配置 [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock) :

::: code-group

```sh [pnpm]
pnpm add mockjs vite-plugin-mock  -D
```

:::

::: warning
这里如果你想在线上使用的话那就把 `mockjs` 安装到 `dependencies`。

我们这里安装到 `devDependencies`。

更多配置请参考 [文档](https://github.com/vbenjs/vite-plugin-mock?tab=readme-ov-file#options)
:::

::: code-group

```ts{2,7-10} [vite.config.ts]
...
import { viteMockServe } from "vite-plugin-mock"; // [!code focus]

export default defineConfig({
  plugins: [
    ...
    viteMockServe({ // default // [!code focus:4]
      mockPath: "mock",
      enable: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

:::

在项目根目录中新建一个 `mock` 文件夹，并创建一个 `test.ts` :

启动调试进程就可以通过浏览器或者接口测试工具来测试 mock：

::: code-group

```ts [mock/test.ts]
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/get',
    method: 'get',
    response: ({ query }) => {
      return { code: 0, data: { name: 'vben' } };
    },
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 2000,
    response: { code: 0, data: { name: 'vben' } },
  },
] as MockMethod[];
```

:::

::: tip 完整项目在：[这里](https://github.com/qiu-youyou/youyou-vue3-template)

可以使用 [degit](https://github.com/Rich-Harris/degit) 从 `Github` 仓库中获取模版。

`degit` 是一个轻量级的 `CLI` 工具，用于从 `Git` 仓库快速克隆项目模板或存储库，而无需保留完整的 `Git` 历史记录。它的主要特点是简洁、快速，特别适合用来初始化项目时从模板仓库拉取代码。
:::
