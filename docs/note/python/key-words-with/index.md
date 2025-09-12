---
tag:
  - 笔记
tags:
  - Python

description: 介绍 Python 的 with 关键字及其在资源管理中的应用，包括语法、原理、自定义上下文管理器和常见用法，帮助理解如何安全高效地管理文件、数据库连接和锁等资源。
---

# Python with 关键字

## 🐡 with 关键字

`with` 是 `Python` 中的一个关键字，来用于上下文管理协议
（Context Management Protocol）。
用于简化资源管理（如文件、网络连接、线程锁等），
确保 资源在使用完后自动释放。

## 🐡 为什么需要 with

在 `Python` 编程中，很多操作会占用 有限资源、
资源管理是一个重要但容易被忽视的环节，
而手动管理资源非常容易出错：

::: code-group

```python [] {}
f = open("file.txt", "r")
try:
   data = f.read()
finally:
    f.close()
```

:::

- 如果程序在 `read()` 时抛出异常，`f.close()` 就不会执行，导致文件句柄泄漏。
- 为了安全关闭，你需要写 `try...finally` 。写法不仅冗长，还容易出错。

## 🐡 with 的解决方案

`with` 语句自动管理资源，
自动调用 `f.close()`，即使发生异常也安全。
这段代码等价于前面的 try-finally 实现:
::: code-group

```python [] {}
with open("file.txt", "r") as f:
    data = f.read()

```

:::

- 自动释放资源：无需手动调用 `close()` 或 `release()`。
- 异常安全：无论代码块是否发生异常，都会执行清理。
- 代码简洁：比 `try...finally` 更短、更清晰

## 🐡 with 基本语法

::: code-group

```python [] {}
with <表达式> as <变量>:
    <代码块>
```

:::

- `<表达式>` 返回一个支持上下文管理协议的对象(实现了 `__enter__` 和 `__exit__`)。
- `<变量>` （可选）用于保存 `<表达式>` 的返回值的变量。
- `<代码块>` 使用资源的代码。退出代码块时会自动调用 `__exit__`，释放资源。

可以嵌套 with:
::: code-group

```python [] {}
with open("a.txt") as f1, open("b.txt") as f2:
    data1 = f1.read()
    data2 = f2.read()

```

:::

## 🐡 with 工作原理

`with` 语句背后是 `Python` 的上下文管理协议，
该协议要求对象实现两个方法：

1. `__enter__()`：进入上下文时调用，返回值赋给 `as` 后的变量。
2. `__exit__()`：退出上下文时调用，处理清理工作。

#### 使用类实现一个上下文管理器:

::: code-group

```python [] {}
class MyContext:

    def __enter__(self):
        print("Entering context")
        return self  # 可返回任意对象

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting context")
        if exc_type:
            print(f"Exception: {exc_value}")

        return False  # 是否抑制异常，False 不抑制


with MyContext() as ctx:
    print("Inside context")
    # raise ValueError("Oops")  # 会打印异常信息并抛出

```

:::

- `__enter__()` 方法在进入上下文时执行。
- `__exit__()` 方法在退出上下文时执行。
  - 参数：`exc_type`：异常类型、 `exc_value`：异常实例、`traceback`：追踪信息
  - 返回值：`True`: 抑制异常、`False`: 不抑制异常（默认）

<br />

#### 使用 `contextlib` 模块上下文管理器

> `python` 的 `contextlib` 模块提供了更简单的方式来创建上下文管理器：

- yield 之前 : `__enter__` 的逻辑
- yield 之后 : `__exit__` 的逻辑

::: code-group

```python [] {}
@contextmanager
def my_context():
    print("Enter")
    try:
        yield "Resource"
    finally:
        print("Exit")


with my_context() as r:
    print("Using", r)

```

:::

<br />

#### with 执行流程

![20250912143425](http://images.qiuyouyou.cn/notes/20250912143425.png)

1. 执行 `<表达式>`，得到上下文管理器对象。
2. 调用对象的 `__enter__() `方法，并将返回值赋给 `<变量>`（如果有）。
3. 执行 `<代码块>`。
4. 无论代码块是否发生异常，都会调用 `__exit__(exc_type, exc_value, traceback)` 方法
5. 如果 `__exit__` 返回 `True`，异常被抑制；否则异常会继续向外抛出。

## 🐡 with 常见用法

#### 文件操作

::: code-group

```python [] {}
with open("file.txt", "r") as f:
    data = f.read()
# 自动关闭文件
```

:::

#### 数据库连接

::: code-group

```python [] {}
import sqlite3

with sqlite3.connect("test.db") as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
# 自动提交事务或回滚

```

:::

#### 锁机制

::: code-group

```python [] {}
from threading import Lock

lock = Lock()
with lock:
    # 临界区代码
    pass
# 自动释放锁

```

:::

## 🐡 总结

- `with`: 上下文管理器的语法糖。
- 上下文协议：需要实现 `__enter__` 和 `__exit__`方法。
- 可以通过 `class` 或 `contextlib` 创建自定义上下文管理器
- 自动处理资源的 初始化 和 释放。异常安全，代码简洁。
- 常见用途：文件操作、锁机制、数据库连接、自定义资源管理。
