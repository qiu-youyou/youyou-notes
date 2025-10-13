---
tag:
  - Python

recommend: 3

description: 本笔记介绍了 Python 的高级特性，包括迭代、切片、列表生成式、生成器和迭代器等内容，理解并高效使用这些简洁且强大的语法，提高代码的可读性和性能。

date: 2025-08-18 13:15:28
---

# Python 学习笔记（三） - Python 高级特性

在 Python 的设计思想中，代码越少越简单越好。
所以在 Python 中有一些非常有用的特性，用来简化我们的实现。

## 🐍 迭代

当我们使用 for 语句遍历一个 list 时，这种遍历的操作就叫做迭代（iteration）。

在 Python 中，迭代是通过 `for ... in` 语句来完成的，
对比其他语言不同的是，大多数迭代 list 是通过下标完成的。

而对于 Python 只要是可迭代对象，无论有无下标，都可以迭代，
比如字符串、字典。

::: code-group

```python [iterable.py]
# 对字符串进行迭代
for ch in "ABC":
    print(ch)

# 对字典进行迭代
dc = {"a": 1, "b": 2, "c": 3}

for key in dc.items():
    print(key)

for k, v in dc.items():
    print(k, v)

```

:::

我们可以通过 `collections.abc` 模块的 `Iterable` 类型判断一个对象是否是可迭代对象：

::: code-group

```python [iterable.py]
from collections.abc import Iterable

# 判断数据是否可迭代
print(isinstance(["a", "b", "c"], Iterable))  # True

# 判断字典是否可迭代
print(isinstance({"a": 1, "b": 2, "c": 3}, Iterable))  # True

# 判断字符串是否可迭代
print(isinstance("abc", Iterable))  # True

# 判断整数是否可迭代
print(isinstance(123, Iterable))  # False

```

:::

## 🐍 切片

在很多编程语言中，针对字符串提供了很多各种截取函数（如，substring），目的就是对字符串切片。
Python 没有针对字符串的截取函数，只需要切片一个操作就可以完成，非常简单。

Python 的切片操作是非常有用的， 取一个 list 或 tuple 的部分元素是非常常见的操作。

:::code-group

```python [slice.py]
name_list = ["xiaoming", "xiaohong", "xiaohei", "xiaoqiang", "xiaoli"]


# 取前 2 个元素 表示，从索引 0 开始取，直到索引 3 为止 不包括 3
print(name_list[0:2])  # ['xiaoming', 'xiaohong']

# 如果第一个索引为 0 则可以省略
print(name_list[:2])  # ['xiaoming', 'xiaohong']

# 倒数第一个元素的索引是 -1
print(name_list[-1])  # xiaoli

# 如果最后一个索引为 -1 则可以省略
print(name_list[-3:])  # ['xiaohei', 'xiaoqiang', 'xiaoli']

# 如果你什么都不写 它还可以用来复制一个数组
print(name_list[:])

```

:::

::: tip

除了 list, tuple 也可以用切片操作，操作的结果仍是 tuple。

同样字符串也可以用切片操作，操作的结果仍是字符串。

:::

## 🐍 列表生成

Python 内置非常简单却强大的可以用来创建 list 的生成式, 即 List Comprehensions。

合理的运用列表生成式，可以快速生成 list，可以通过一个 list 推导出另一个 list，而代码却十分简洁。

::: code-group

```python [comprehensions.py]
# 生成一个 1 - 10 的 list
L1 = list(range(1, 11))
print(L1)
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 列表生成中还可以使用循环 遵循生成的元素在前 for 语句在后
L2 = [x + 100 for x in range(1, 11)]
print(L2)
# [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]

# 如此多层循环也不在话下
L3 = [m + n for m in "123" for n in "abc"]
print(L3)
# ['1a', '1b', '1c', '2a', '2b', '2c', '3a', '3b', '3c']

# 还可以在for循环后面加上if判断 做为筛选条件
L4 = [x for x in range(1, 10) if x % 2 == 1]
print(L4)
# [1, 3, 5, 7, 9]

```

:::

::: warning
在一个列表生成式中，for 前面的 if ... else 是表达式，而 for 后面的 if 是过滤条件，不能带 else。
:::

## 🐍 生成器

与上面的列表生成式不同的是，
生成器的主要优势在于它们的惰性求值（lazy evaluation）特性
这意味着值只有在需要时才会被生成。
这使得生成器非常适合处理大型数据集，因为它们可以减少内存的使用。

比如我们需要创建一个包含 100 万个元素的列表。列表生成式不仅占用很大的
空间，当我们仅仅使用前几个元素的时，后面元素占用的空间
白白浪费了。

所以列表生成器可以按照某种算法推算出来，让我们在循环的过程中
不断推算出后面的元素，这样就可以无需创建完整的列表来节省大量的空间。

在 Python 中这种一边循环一边计算的机制，称为生成器：generator。

::: code-group

```python [generator.py]

# 将列表生成式 `[]` 改为 `()` ，就可以创建一个生成器。这是最简便的生成器的写法：
g1 = (x for x in range(1, 11))
print(g1) # <generator object <genexpr> at 0x1049fc2b0>

# 通过 next() 函数获得 generator 的下一个返回值
print(next(g1)) # 1
print(next(g1)) # 2
print(next(g1)) # 3

# 也可以通过 for 循环来迭代
for n in g1:
     print(n)
```

:::

生成器表达式看起来很像列表推导式，但它们使用圆括号而不是方括号。
除了表达式外，还支持生成器函数：

生成器的核心是 yield 关键字，它用于指定函数的返回点。
与普通函数使用 return 返回一个值不同，
带有 yield 的函数在每次调用时返回一个值，并在下一次调用时从上次返回的位置继续执行。
这样，函数可以在每次调用时产生一个新值，而不是一次性返回所有值。

::: code-group

```python [generator.py]
# 在执行过程中，遇到 yield 就中断，下次又继续执行
def my_generator():
  n = 1
  print('这是第一次调用')
  yield n

  n += 1
  print('这是第二次调用')
  yield n

  n += 1
  print('这是第三次调用')
  yield n

# 调用该 generator 函数时，首先要生成一个 generator 对象，
# 然后用 next() 函数不断获得下一个返回值：
g2 = my_generator()
print(next(g2))
print(next(g2))
print(next(g2))

# 遇到 return 语句或者执行到函数体最后一行语句
# 就是结束 generator 的指令，for循环随之结束。
for n in g2:
    print(n)
```

:::

::: warning
一个函数定义中包含 yield 关键字，这个函数就不再是一个普通函数，
而是一个 generator 函数。

当你调用一个普通函数将直接返回这个函数的结果。

而调用一个 generator 函数将返回一个 generator。

:::

## 🐍 迭代器

#### Iterable-可迭代对象

可以直接作用于 `for` 循环的对象统称为可迭代对象,
如：`list、tuple、dict、set、str` 等，还有 `generator`。

使用 `isinstance()` 判断一个对象是否是 可迭代对象 `Iterable`。

#### Iterator-迭代器

可以被 `next()` 函数调用并不断返回下一个值的对象称为迭代器,

可以使用 `isinstance()` 判断一个对象是否是迭代器对象 `Iterator` 。

::: code-group

```python
# 判断一个对象是否是 Iterable 对象
from collections.abc import Iterable

print(isinstance([], Iterable))     # True
print(isinstance('abc', Iterable))  # True
print(isinstance((x for x in range(10)), Iterable)) # True

# 判断一个对象是否是 Iterator 对象
from collections.abc import Iterator

print(isinstance([], Iterator))     # False
print(isinstance('abc', Iterator))  # False
print(isinstance((x for x in range(10)), Iterator)) # True

```

:::

::: warning
迭代器和生成器是两个非常重要的概念

生成器不但可以作用于 `for` 循环，还可以被 `next()` 函数不断调用并返回下一个值,
生成器都是 `Iterator` 对象，但 `list、dict、str` 虽然是 `Iterable`，却不是 `Iterator`。
:::

在 Python 中使用 `iter()` 函数可以将 `list、dict、str` 等
可迭代对象 `Iterable` 变成 转换为迭代器 `Iterator`。

::: code-group

```python [iterator.py]
from collections.abc import Iterator
iterable = [1, 2, 3, 4, 5]
iterator = iter(iterable)

print(isinstance(iter(iterable), Iterator)) # true
print(isinstance(iter('abc'), Iterator)) # true
```

:::
