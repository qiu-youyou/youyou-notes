---
tag:
  - 笔记
tags:
  - Python
  -
recommend: 1

description: 使用 Python 快速实现一个 Hello World，认识 Python。
---

# Python 学习笔记（一） - 简介

## Pythone 简介

Python 的设计哲学强调：简洁、可读性强、开发效率高。

Python 是一种高级、解释型、通用编程语言。它由 荷兰程序员 Guido van Rossum 在 1989 年发明，1991 年正式发布第一个版本。

#### Python 的优点

- 跨平台：支持 Windows、Linux、Mac 等。在 Windows 上写 Python 程序，放到 Linux 上也是能够运行;
- 语法简洁，易学易用。比如，完成同一个任务，C 语言要写 1000 行代码，Java 只需要写 100 行，而 Python 可能只要 20 行;
- 第三方库丰富。用 Python 开发，许多功能不必从零编写，直接使用现成的即可。

#### Python 的缺点

- 运行速度较慢。和 C 程序相比非常慢，因为 Python 是解释型语言，你的代码在执行时会一行一行地翻译成 CPU 能理解的机器码，这个翻译过程非常耗时，所以很慢;
- 代码不能加密。发布你的 Python 程序，实际上就是发布源代码，这一点跟 C 语言不同，C 语言不用发布源代码，只需要把编译后的机器码;
- 移动端支持较弱。不适合开发手机 App。

::: tip
虽然 Python 的速度慢，但是大量的应用程序并不需要那么快，
比如同样一段程序 C 需要 0.001s 执行，Python 需要 0.1s 执行，即使慢了一百倍，
中间网络请求 为 1s, 作为用户根本感觉不到之间的区别。

这就好比一辆 F1 堵在早高峰。
:::

## Python 安装

目前，Python 有两个版本，一个是 2.x 版，一个是 3.x 版，这两个版本是不兼容的。

MacOS 系统中自带了 Python，如果你使用 `homebrew` 那这一切来的很简单。可以直接使用 `brew upgrade python` 来更新
Python。
或打开 [Python](https://www.python.org/downloads/) 的官方下载页面，下载对应的版本，安装即可。

## Python 运行

打开我们的命令行输入 `python3` ，提示符变为 `>>>` 表示进入到 Python 的交互环境中。
输入 `1 + 1` 获得 `2` 的结果， 输入 `exit()` 可退出交互环境。

![20250804162409](http://images.qiuyouyou.cn/notes/20250804162409.png)

在 VS Code 里运行 Python 可以安装插件 [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)。

接下来只要新建 `.py` 文件，编写 Python 代码，然后点击右上角运行按钮就能运行你的代码了。

![20250804160140](http://images.qiuyouyou.cn/notes/20250804160140.png)

## Python 格式

Python 的变量名支持字母、下划线、数字。但不能在变量名里加入空格，不能以数字开头。

Python 程序是大小写敏感的，如果写错了大小写，程序会报错。

Python 的语法比较简单，采用缩进方式:

:::code-group

```python
a = 1
if a >= 0:
  print("a >= 0")
else:
  print("a < 0")
```

:::

## Python 注释

在 Python 里，使用 # 表示单行注释，使用 6 个双引号将内容包裹起来就形成多行注释。

::: code-group

```python
# 这是一行 python 的单行注释

"""
这是 python 的多行注释
这是 python 的多行注释
这是 python 的多行注释
"""
```

:::

## 输入和输出

任何计算机程序都是为了执行一个特定的任务，有了输入，用户才能告诉计算机程序所需的信息，有了输出，程序运行后才能告诉用户任务的结果。

输入是 Input，输出是 Output，因此，我们把输入输出统称为 Input/Output，或者简写为 IO。

用 `print()` 在括号中加上字符串，就可以向屏幕上输出指定的文字。

Python 也提供了一个 `input()`，可以让用户输入字符串，并存放到一个变量里。

::: code-group

```python
name = input("请输入你的名字:")
print("你好，", name)
```

:::
