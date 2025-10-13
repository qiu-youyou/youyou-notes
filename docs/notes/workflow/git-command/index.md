---
tag:
  - Workflow
tags:
  - Git

description: 整理 Git 常用命令、配置、以及低频命令备忘，便于参考。

date: 2025-08-30 16:48:33
---

# Git 常用命令备忘

::: code-group

```bash
# 修改最近一条的 commit message
git commit --amend

# 修改某个提交后的 commit message
git reabase -i <commit-hash>
```

:::

## 🐝 git revert

- 撤销某个 commit，但不会破坏历史。
- 场景：线上 bug 需要快速回滚。

::: code-group

```bash [] {}
git revert <commit-hash>
```

:::

## 🐝 git stash

- 临时保存当前未提交的修改，让工作区干净。
- 场景：需要临时切换分支，但又不想提交未完成的代码。

::: code-group

```bash [] {}
git stash           # 保存修改
git stash list      # 查看保存的内容
git stash apply     # 恢复最近一次修改
git stash pop       # 恢复并删除记录
```

:::

## 🐝 git cherry-pick

- 把别的分支上的某个 commit 拿到当前分支。
- 场景：热修复分支里的 bug 修复想同步到主分支，但不想 merge 全部分支。

::: code-group

```bash [] {}
git cherry-pick <commit-hash>
```

:::

## 🐝 git blame

- 查看某一行代码是谁、在哪个 commit 改的。
- 场景：追踪“是谁写的这行代码”。

::: code-group

```bash [] {}
git blame app.js
git blame -L 10,20 app.js   # 只看 10-20 行
```

:::

## 🐝 git shortlog

- 统计贡献者提交情况。
- 场景：快速生成团队贡献报告

::: code-group

```bash [] {}
git shortlog
git shortlog -sn
```

:::

## 🐝 git worktree

- 在一个仓库中同时检出多个分支，避免频繁切换。
- 场景：需要同时开发两个分支。

::: code-group

```bash [] {}
git worktree add ../feature-branch feature-branch
```

:::

## 🐝 修改远程仓库地址

::: code-group

```bash [] {}
# 查看当前远程仓库
git remote -v


# 修改远程仓库地址
git remote set-url origin <new-u

# 同时设置 fetch 和 push 地址
git remote set-url --push origin <push-url>
git remote set-url --fetch origin <fetch-url>
```

:::

## 🐝 设置全局用户名和邮箱

::: code-group

```bash [] {}
git config --global user.name "your name"
git config --global user.email "you email"
```

:::
