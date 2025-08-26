---
tag:
  - 笔记
tags:
  - Python

recommend: 4
sticky: 9996

description:
---

# Python 学习笔记（四） - FP、OOP 编程

## 函数式编程

函数式编程的核心思想: 强调 “计算就是函数的应用” ，
数据和函数是分离的，程序尽量不依赖外部状态（即避免副作用）。

函数式编程的核心特征:

- 纯函数: 相同输入永远返回相同输出，不依赖外部状态。
- 函数是一等公民: 函数可以赋值给变量、作为参数传递、作为返回值返回。
- 高阶函数: 可以接收函数作为参数或返回函数。
- 不可变性: 数据尽量不可变，避免副作用。

下面我们来逐步理解这些概念：

### 纯函数

纯函数简单来说就是 同样输入获得同样输出，不读写全局变量，不改参数对象。

::: code-group

```Python [pure_function.py]
# 纯函数 (无副作用)
def square(x):
    return x * x

print(square(4))  # 16
print(square(4))  # 16  -> 一直都是 16

# 对比一个非纯函数（有副作用）：
count = 0

def add_and_log(x):
    global count
    count += 1        # 修改了外部状态
    return x + count

print(add_and_log(10))  # 11
print(add_and_log(10))  # 12 (结果变了，依赖外部变量 count)

```

:::

所以 纯函数是函数式编程的核心特点，它带来的好处是
程序更可预测、更容易测试、更容易并行计算。

### 高阶函数

高阶函数简单来说就是接受函数作为参数，或者返回函数的函数。

::: code-group

```python [higher_functions.py]
# 接收函数作为参数
def apply(func, x):
    return func(x)

print(apply(lambda n: n * 2, 5))  # 10

# 把函数作为结果值返回
def make_adder(n):
    def adder(x):
        return x + n
    return adder

add5 = make_adder(5)
print(add5(10))  # 15
```

:::

::: tip 关键字 lambda 表示匿名函数

Python 对匿名函数的支持有限，只有一些简单的情况下可以使用匿名函数。
匿名函数只能有一个表达式，不用写 return，返回值就是该表达式的结果。

:::

像 Python 内置的 `map / filter / sorted` 等函数都是高阶函数。

### 不可变性

在编程里，不可变性就是：
数据一旦创建，就不能被修改。

如果你要“修改”，其实会得到一个新的对象，而不是在原来的对象上改。

::: code-group

```python [immutable.py]
# 不可变对象（immutable）

x = "hello"
y = x.upper()
print(x)  # hello  （原字符串没变）
print(y)  # HELLO  （返回了一个新字符串）

# 可变对象（mutable）
arr = [1, 2, 3]
arr.append(4)
print(arr)  # [1, 2, 3, 4]  （原对象被改了）
```

:::

::: tip 📝 Python 数据类型的可变性对照表
| 类型 | 示例 | 可变 | 说明 |
|-------------|-----------------------|--------|------|
| `int` | `x = 10` | <img width="30px" /> ❌ | 数字一旦创建，值不能改，只能新建 |
| `float` | `y = 3.14` | ❌ | 和 `int` 一样 |
| `complex` | `z = 1+2j` | ❌ | 复数类型 |
| `bool` | `flag = True` | ❌ | `True` / `False` 固定 |
| `str` | `s = "hello"` | ❌ | 修改会生成新字符串 |
| `tuple` | `t = (1,2,3)` | ❌ | 元组本身不可变，但元素若是可变对象，可以变 |
| `frozenset` | `fs = frozenset([1,2])` | ❌ | 集合的不可变版本，可做字典键 |
| `bytes` | `b = b"abc"` | ❌ | 二进制不可变序列 |
| `list` | `arr = [1,2,3]` | ✅ | 可以增删改查 |
| `dict` | `d = {"a":1}` | ✅ | 可以增加/修改键值对 |
| `set` | `s = {1,2,3}` | ✅ | 可以添加/删除元素 |
| `bytearray` | `ba = bytearray(b"abc")` | ✅ | 二进制可变序列 |
:::

### 装饰器

在 Python 里，装饰器（Decorator）就是一种高阶函数。
它接收一个函数作为参数，并返回一个新的函数。

