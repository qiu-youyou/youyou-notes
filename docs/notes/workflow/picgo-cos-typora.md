---
tag:
  - ENV
tags:
  - PicGo

description: 借助 PicGo、腾讯云对象存储（COS）、Typora 以及 VSCode，我们可以搭建一个稳定、快速图床服务，极大提升写作和笔记体验。

date: 2025-07-12 14:33:29
---

# PicGo + COS + Typora 搭建图床服务

借助 `PicGo`、腾讯云对象存储 `(COS)`、`Typora` 以及 `VSCode`，我们可以搭建一个稳定、快速图床服务，极大提升写作和笔记体验。

## ✒️ 官方文档

完整的搭建过程 👉[官方文档](https://cloud.tencent.com/document/product/436/74373) 这里已经描述的很详细了。

这里主要记录如何方便的使用我们搭建好的图床服务。

## ✒️ Typora 配置

当我们结合文档配置好 `PicGo` 和 `COS` 图床服务后，可以在 `Typora` 中使用，实现图床上传。

`Typora` 的配置比较简单清晰，只需要在图像中选择插入图片时 `[上传图片]`，上传服务选择配置好的 `PicGo`，就可以实现图床上传了。

![20250717141248](http://images.qiuyouyou.cn/notes/20250717141248.png)

这时我们在 `Typaro` 中粘贴图片就会自动上传到图床并使用。

![20250717142555](http://images.qiuyouyou.cn/notes/20250717142555.png)

## ✒️ VsCode 配置

如果你和我一样习惯使用 `VsCode` 来编写 `Markdown`，可以按照以下配置：

搜索并安装 `VsCode` 插件 [PicGo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo)，然后配置 `PicGo` 的上传服务为 `PicGo` 和 `COS` 图床服务，这样就可以在 `VsCode` 中使用图床上传图片了。

- 打开设置搜索 `PicGo` 找到插件 ，`Pic Bed Uploader` 配置为 `tcyun`。
- 找到 `COS` 的配置项，填写好 `COS` 的信息。

> 配置 `Data Path` 可选，这是我的个人习惯，它的配置文件默认就在这里，所以我把 `dataspace` 也放在了这里:
>
> 配置 `Data Path` : `your_home_dir/.picgo/dataspace/vs-picgo-data.json`

![20250717144837](http://images.qiuyouyou.cn/notes/20250717144837.png)

这时我们在 `VsCode` 中 `command + option + u` 粘贴图片就会自动上传到图床并使用:

![20250717145420](http://images.qiuyouyou.cn/notes/20250717145420.png)

## ✒️ 本地开发测试

当我们配置了 `防盗链`，当我们本地开发测试时就无法访问预览我们上传的图片。

![20250717150128](http://images.qiuyouyou.cn/notes/20250717150128.png)

我们可以通过 `chrome` 的扩展程序 `ModHeader` 来修改我们的 `referer` 来绕过这个限制。

![20250717153045](http://images.qiuyouyou.cn/notes/20250717153045.png)
