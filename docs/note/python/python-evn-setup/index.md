---
tag:
  - 笔记
tags:
  - Python

description: 配置 Python 开发环境，包括 Python 版本选择、Python 虚拟环境、Python 包管理工具，以及 VSCode 配置。
---

# Python 开发环境搭建

## 🐜 Python 版本介绍

prerelease 为预发布版本，security 为安全版本，bugfix 为 bug 修复版本。

根据个人需求，选择适合的 Python 版本即可。
当然如果不是为了体验新特性或学习。
一般情况我们为了安全都会选择 `security` 的版本。

| Python 版本 | 维护状态   | 首次发布   | 终止支持 |
| ----------- | ---------- | ---------- | -------- |
| 3.13        | prerelease | 2024-10-01 | 2029-10  |
| 3.12        | bugfix     | 2023-10-02 | 2028-10  |
| 3.11        | bugfix     | 2022-10-04 | 2027-10  |
| 3.10        | security   | 2021-10-04 | 2026-10  |
| 3.9         | security   | 2020-10-05 | 2025-10  |
| 3.8         | security   | 2019-10-14 | 2024-10  |

## 🐜 来给 PIP 提提速

镜像加速就是把 pip 所有的包拷贝，我们让 pip 直接连接到国内下载。

> 镜像地址: `https://mirrors.cloud.tencent.com/pypi/simple`。

- 临时设置：`pip install -i [镜像地址] <package>`
- 全局设置：`pip config set global.index-url [镜像地址]`

## 🐜 Python 虚拟环境

Python 虚拟环境提供了一个独立运行的环境，每个虚拟环境都有自己的 Python 解释器、库、包等。达到了为
不同项目创建隔离的 Python 环境:

- 项目隔离：不同项目可能需要不同版本的 Python 或第三方库
- 避免冲突：防止全局 Python 环境被污染
- 依赖管理：方便记录和分享项目的依赖关系
- 测试环境：可以安全地测试新包而不影响其他项目

我们使用官方的 `venv` 包来创建和管理虚拟环境，使用方法如下：

- 创建虚拟环境：`python3 -m venv .venv`
- 激活虚拟环境：`source .venv/bin/activate`

::: warning .venv

`.venv`：虚拟环境的名称（可以自定义）, 命名为'.venv'是常见约定。

:::

::: code-group

```sh [test-project]
# 创建项目
mkdir test-project && cd test-project

# 创建虚拟环境
python3 -m venv .venv

# 激活虚拟环境
source .venv/bin/activate

# 激活成功后命令行回显示当前环境
(.venv) $
# 或者通过命令查看
which python

# 退出虚拟环境
deactivate

# 删除虚拟环境（删除目录）
rm -rf .venv

```

:::

::: info 虚拟环境的表现

```
.venv/
├── bin/            # 在 Unix/Linux 系统上
│   ├── activate    # 激活脚本
│   ├── python      # 环境 Python 解释器
│   └── pip         # 环境的 pip
├── Scripts/        # 在 Windows 系统上
│   ├── activate    # 激活脚本
│   ├── python.exe  # 环境 Python 解释器
│   └── pip.exe     # 环境的 pip
└── Lib/            # 安装的第三方库
```

:::

当前使用虚拟环境安装的包 只会影响当前环境

`pip install openai`

## 🐜 开发编辑器配置

#### VSCode

如果你不喜欢自己进行配置推荐选择 `PyCharm` 来进行开发。当然如果你也喜欢使用 `VSCode` , 为了有更好的
开发体验可以进行下面的配置：

安装 `Python` 的扩展：`Python Extension Pack` 这里包含了我们所需要的插件：

![20250819142423](http://images.qiuyouyou.cn/notes/20250819142423.png)

安装后我们可以打开我们的项目可以看到 `Environment` 提供了环境管理的界面：
这里可以快速的进行新建删除和运行虚拟环境：

![20250819145017](http://images.qiuyouyou.cn/notes/20250819145017.png)

配置 `VSCode` 的自动导入补全以及 `Python` 默认的语言服务:

![20250819153243](http://images.qiuyouyou.cn/notes/20250819153243.png)

::: code-group

```json [setting.json]
  // 自动导入补全
  "python.analysis.autoImportCompletions": true,
  "python.autoComplete.extraPaths": ["./src", "./lib"],
  // 默认语言服务
  "python.languageServer": "Pylance",
```

:::

接下来配置格式化程序。安装 [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)插件并添加配置：

:::code-group

```json [setting.json]
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
```

:::

Python 文件中还有一些必要的注释，这些注释可以帮助我们更好的了解文件的作用和作用。
将他配置为代码片段避免每次进行书写：

在 VSCode 的 `代码片段` 中新建 `python.json` 文件，内容如下：

添加后通过在 `.py` 文件中输入 `header` 就可以快速添加头部注释。

:::code-group

```json [python.json]
{
  "HEADER": {
    "prefix": "header",
    "body": [
      "#!/usr/bin/env python",
      "# -*- encoding: utf-8 -*-",
      "'''",
      "@File : $TM_FILENAME",
      "@Time : $CURRENT_YEAR/$CURRENT_MONTH/$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
      "@Author : Youyou",
      "'''",
      "",
      "$0"
    ]
  }
}
```

:::

![20250819150617](http://images.qiuyouyou.cn/notes/20250819150617.png)

::: tip

Python 头部文件:

`#!user/bin/env python` 告诉系统要运行这个文件要用什么运行

`# -*- coding:utf-8 -*-` 使用 utf-8 编码（python2 默认不支持中文）

写了这样的开头，就可以在 linux 下和 python2 下运行

头注释除了必要的信息外，一些简单的介绍也是尤为重要呢，比如作者、创建日期、版本等等。
:::

#### PyCharm (推荐)

PyCharm 是由 JetBrains 开发的一款功能强大的 Python 集成开发环境（IDE），专为 Python 开发者设计。

同样为了有更好的开发体验，可以进行一些简单的配置：

使用 `PyCharm` 打开项目，打开项目设置，可以看到编辑器默认给我们选择了当前的虚拟环境：

![20250820151437](http://images.qiuyouyou.cn/notes/20250820151437.png)

这里也可以手动设置：`Add Interpreter 👉 Add Local Interpreter`
选择虚拟环境 `Vitualenv Environment 👉 existing`
选择我们项目的虚拟环境即可：

![20250820152125](http://images.qiuyouyou.cn/notes/20250820152125.png)

设置 `Reformat code`(保存格式化代码) 及 `Optimize imports` (优化导入)：

![20250820160040](http://images.qiuyouyou.cn/notes/20250820160040.png)

还记得[上面](/note/python/python-evn-setup/#vscode)在 `VSCode` 中配置的文件头部注释吗？
在 `PyCharm` 中来配置一下:
配置后在我们新建文件时就会自动生成头部注释。

![20250820162839](http://images.qiuyouyou.cn/notes/20250820162839.png)

