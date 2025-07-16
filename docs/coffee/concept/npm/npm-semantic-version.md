---
tag:
  - 理论知识
tags:
  - NPM

description: 介绍 NPM 语义化版本（semver）规范的基本概念、常见版本号释义及相关命令用法，帮助理解如何合理管理和发布包的版本。
---

# 语义化的版本号

semver 是语义化版本[（Semantic Versioning）](https://semver.org/)规范 的一个实现。

目前是由 npm 的团队维护实现了版本和版本范围的解析、计算、比较。

版本号其实就是一个标识 用语义化的方式告诉使用者 包做了哪些变更。

## 📮 语义化版本 2.0.0 摘要

![](http://images.qiuyouyou.cn/notes/npm-version-1.jpg)

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

1. 主版本号：当你做了不兼容的 API 修改，
2. 次版本号：当你做了向下兼容的功能性新增，
3. 修订号：当你做了向下兼容的问题修正。

::: tip Tips:
先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。
如：1.2.3-alpha1.0 、1.2.3-beta2.1
:::

## 📮 常见版本名称释义

- `alpha` 内部测试版本，除非是内部测试人员，否则不推荐使用，有很多 Bug
- `beta` 公测版本，消除了严重错误，还是会有缺陷，这个阶段还会持续加入新的功能
- `rc` (Release Candidate)，发行侯选版本。这个版本不会加入新的功能，主要是排错，修改 Bug
- `release` 一般当 `rc` 持续一段时间后，就会发布 `release` 版本，该版本通常是些大版本，如：1.0.0、 2.0.0

## 📮 NPM 版本命令

可以使用 `npm version --help` 命令 查看帮助：

```bash
➜  test git:(main) npm version --help
Bump a package version

Usage:
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

Options:
[--allow-same-version] [--no-commit-hooks] [--no-git-tag-version] [--json]
[--preid prerelease-id] [--sign-git-tag]
[-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
[-ws|--workspaces] [--no-workspaces-update] [--include-workspace-root]

alias: verison

Run "npm help version" for more info
```

- Usage 可以看到一些版本信息 `major` 主版本 、 `minor` 次版本 、 `patch` 修订号。
- Options 中的 `--preid` 表示在前面版本号后面 加上先行版本号。

::: tip Tips:
在每次使用 npm version 命令进行版本更新时，不仅会修改`package.json`，同时也会自动进行一次 git commit 和 git tag。

当然也可以使用 `Options` 中 的配置取消，如：`--no-git-tag-version`
:::

## 📮 Npm Version 使用

1. 初始化 `npm` 、 `git仓库` 进行第一次提交

```bash
➜  test npm init -y
Wrote to /Users/shuang/Documents/work/mine/test/package.json:
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

➜  test git init
Initialized empty Git repository in /Users/shuang/Documents/work/mine/test/.git/

➜  test git:(main) ✗ git add .
➜  test git:(main) ✗ git commit -m 'first commit'
[main (root-commit) f637d43] first commit
 2 files changed, 12 insertions(+)
 create mode 100644 .DS_Store
 create mode 100644 package.json
```

2. 使用 `npm version` 会自动 `commit` 和创建 `tag`

```bash
➜  test git:(main) npm version patch
v1.0.1 # 升级一个小版本

➜  test git:(main) git reflog
8c17161 (HEAD -> main, tag: v1.0.1) HEAD@{0}: commit: 1.0.1 # 自动进行了commit
f637d43 HEAD@{1}: commit (initial): first commit # 第一次手动 commit

➜  test git:(main) git tag
v1.0.1 # 自创建了tag
```

3. 参数 `--preid` 的使用

```bash
# 进入 alpha
➜  test git:(main) npm version prepatch --preid=alpha
v1.0.2-alpha.0
➜  test git:(main) npm version prerelease --preid=alpha
v1.0.2-alpha.1

# 进入 beta
➜  test git:(main) npm version prerelease --preid=beta
v1.0.2-beta.0
➜  test git:(main) npm version prerelease --preid=beta
v1.0.2-beta.1

# 进入 rc
➜  test git:(main) npm version prerelease --preid=rc
v1.0.2-rc.0

# 正式发布
➜  test git:(main)  npm version patch
v1.0.2
➜  test git:(main) npm version minor
v1.1.0
➜  test git:(main) npm version major
v2.0.0
```

::: tip Tips:
一般来说 通常在大版本号 如：1.0 - 2.0 的时候, 在 2.0 上才会使用先行版 ,再去发布 bate 或者 rc
在小版本中就一般不会使用 先行版本了。
:::
