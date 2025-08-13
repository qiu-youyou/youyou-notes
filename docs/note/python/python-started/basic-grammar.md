---
tag:
  - 笔记
tags:
  - Python

recommend: 2

description: 本笔记总结了 Python 基础语法，包括数据类型、运算符、条件判断、循环、函数定义与参数、模块和包的使用等内容，适合快速入门查阅。
---

# Python 学习笔记（二） - Python 基础

## 💦 数据类型

| 类型             | 值                | 说明                                               |
| ---------------- | ----------------- | -------------------------------------------------- |
| 整数 （int）     | 1、100、-8080、0  | Python 可以处理任意大小的整数、包括负整数。        |
| 浮点数 （float） | 1.23、3.14、-9.01 | 对于很大或很小的浮点数，就必须用科学计数法表示     |
| 字符串（str）    | 'abcd'、"efg"     | 字符串是以单引号' 或双引号" 括起来的任意文本。     |
| 布尔值（bool）   | True、False       | 布尔值可以用 and、or 和 not 运算。 要注意大小写!!! |
| 空值（NoneType） | None              | 空值是 Python 中一个特殊的值，用 None 表示。       |

#### list & tuple

list(列表) 是一种可变的有序的集合，可以随时添加和删除其中的元素。

tuple(元组) 是另一种有序列表和 list 非常类似，但是 tuple 一旦初始化就不能修改。

::: code-group

```python [list.py]
names = ['xiaoming', 'xiaohong', 'xiaoli']
print(names) # ['xiaoming', 'xiaohong', 'xiaoli']

# len() 函数可以获取元素的个数
print(len(names)) # 3

# 使用索引来访问某个位置的元素
# 当索引超出了范围时，Python会报一个IndexError错误，所以，要确保索引不要越界

print(names[0]) # xiaoming
print(names[-1]) # xiaoli
print(names[len(names) - 1]) # xiaoli

# 使用索引来修改某个位置的元素
names[0] = '小明'
print(names) # ['小明', 'xiaohong', 'xiaoli']

# 使用 append() 函数来追加元素
names.append('xiaoqiang')
print(names) # ['xiaoming', 'xiaohong', 'xiaoli', 'xiaoqiang']

# insert() 可以把元素插入到指定的位置
names.insert(1, 'zhangsan')
print(names) # ['xiaoming', 'zhangsan', 'xiaohong', 'xiaoli', 'xiaoqiang']

# pop() 函数可以移除列表中的最后一个元素
names.pop()
print(names) # ['xiaoming', 'zhangsan', 'xiaohong', 'xiaoli']

# pop(x) 函数可以移除列表中指定位置的元素
names.pop(1)
print(names) # ['xiaoming', 'xiaohong', 'xiaoli']
```

:::

::: code-group

```python [tuple.py]

# 这个 tuple 不能改变，没有 append、insert、pop 等方法。其他获取元素的的方法和 list 一样。
names = ('xiaoming', 'xiaohong', 'xiaoli')

# 包含 list 的 tuple
names = ('xiaoming', 'xiaohong', 'xiaoli', ['zhangsan', 'lisi'])
print(names[3][0]) # zhangsan

# 这里要注意 我们改变的不是 tuple 中的元素，而是 list 中的元素
names[3][0] = '小明'
print(names) # ('xiaoming', 'xiaohong', 'xiaoli', ['小明', 'lisi'])

```

:::

::: tip tuple 的不可变

tuple 所谓的 “不变” 是 “指向不变”，也就是说你不能改变 tuple 中的元素，但是 tuple 的元素可以是可变的，
比如上面例子中的所指向的这个 list 本身是可变的。

所以当我们要创建内容也不可变的 tuple 时，那要确保 tuple 的 每一个元素都是不可变的。

:::

::: warning tuple 的陷阱

当你定义一个 tuple 时，在定义的时候，tuple 的元素就必须被确定下来。如果你要定义一个 空的 tuple
要写成 `t = ()`。

当你只定义一个元素的 tuple 时要注意，python 会把`t = (1)` 当成 数学公式中的小括号 而不是 tuple，
所以 python 规定要写成 `t = (1,)` 来消除歧义。

因为 tuple 不可变，所以代码更安全。如果可能，能用 tuple 代替 list 就尽量用 tuple。

:::

#### dict & set

dict 在其他语言中也称为 map，使用键-值（key-value）存储，具有极快的查找速度。

::: code-group

```python [dict.py]

person = { 'name': 'xiaohong', 'age': 18, 'gender': 'male'}

# 可以通过 key 来操作 dict 中的值
print(person['name']) # xiaohong

person['age'] = 28
print(person['age']) # 28

# 使用 pop(key) 方法删除 key 及对应 value
person.pop('age')
print(person) # {'name': 'xiaohong', 'gender': 'male'}
```

:::

::: warning
如果使用不存在的 Key 程序会抛出错误。我们可以通过 `in` 检查 key 是否存在。
还可以使用 `get()` 方法，如果 key 不存在的话，可以返回 `None`
:::

::: tip dict VS list
dict 的查找速度极快 ，不会随着 key 的增加而变慢

list 的查找和插入的速度会随着元素的增加而增加

dict 需要占用更多的内存，内存浪费多

list 占用空间小 浪费内存少

因此 dict 是用空间来换取时间的一种方法。
:::

set 也是一组 key 的集合，但不存储 value，在 set 中 是没有重复的 key 的。

::: code-group

```python [set.py]
# 创建 set，用 {x,y,z,...} 列出每个元素
set1 = {1, 2, 3, 4, 5}

# 自动过滤重复的元素
set2 = {1, 2, 3, 4, 5, 1, 2, 3, 4, 5}
print(set2) # {1, 2, 3, 4, 5}

# add(key) 方法可以添加元素 但重复添加不生效
set1.add(6)
print(set1) # {1, 2, 3, 4, 5, 6}

# remove(key) 方法可以删除元素
set1.remove(6)
print(set1) # {1, 2, 3, 4, 5}


# set 可以看成数学意义上的无序和无重复元素的集合，可以做数学意义上的交集、并集等操作
s1 = {1, 2, 3}
s2 = {2, 3, 4}
print(s1 & s2) # {2, 3}

print(s1 | s2) # {1, 2, 3, 4}

```

:::

## 💦 数学运算

| 运算符        | 例子     | 说明                                       |
| ------------- | -------- | ------------------------------------------ |
| + （加法）    | 1 + 1    | 2                                          |
| - （减法）    | 1 - 1    | 0                                          |
| \* （乘法）   | 2 \* 2   | 4                                          |
| / （除法）    | 4 / 2    | 2                                          |
| // （整除）   | 10 // 3  | 3 整除（地板除）- 两个整数的除法仍然是整数 |
| % （取余）    | 5 % 2    | 1                                          |
| \*\* （次方） | 2 \*\* 3 | 8                                          |

## 💦 比较运算

| 运算符          | 例子   | 结果  |
| --------------- | ------ | ----- |
| == （等于）     | 1 == 2 | False |
| != （不等于）   | 1 != 2 | True  |
| > （大于）      | 1 > 2  | False |
| >= （大于等于） | 1 >= 2 | False |
| < （小于）      | 1 < 2  | True  |
| <= （小于等于） | 1 <= 2 | False |

## 💦 条件判断

Python 中 使用 `if...else...` 语句来判断某个表达式的值, 是按照缩进来划分代码块的。

如果要判断多个条件的话，可以使用 `elif` , `else if` 的缩写。

注意不要少写了冒号 `:`

::: code-group

```python
if 条件表达式:
    代码块
else:
    代码块
```

:::

::: code-group

```python
fraction = 99

if fraction >= 90:
    print("优")
elif 80 <= fraction < 90:
    print("良")
elif 60 <= fraction < 80:
    print("中")
else:
    print("差")
```

:::

#### 模式匹配

如果要针对某个变量匹配若干种情况，可以使用 `match` 语句。

使用 match 语句用 case 来匹配，并且最后加一个（只能在最后） `case _` 来匹配所有情况。

match 非常的灵活：
::: code-group

```python [match.py]
# 简单匹配
name = 'xiaoming'
match name:
  case 'zhangsan':
    print('张三')
  case 'lisi':
    print('李四')
  case 'xiaoming':
    print('小明')
  case _:
    print('other')

# 复杂匹配
age = 15
match age:
  case x if x < 10:
      print(f'< 10 years old: {x}')
  case 10:
      print('10 years old.')
  case 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18:
      print('11~18 years old.')
  case 19:
      print('19 years old.')
  case _:
      print('not sure.')

# 列表匹配
lesson = ['语文', '数学', '英语', '体育']

match lesson:
  case ['语文']:
      print('课程: 语文')
  # 出现语文，且至少出现一个其他课程:
  case ['语文', lesson1, *lessons]:
      print('课程语文: ' + lesson1 + ', ' + ', '.join(lessons))
  case _:
      print('invalid command.')

```

:::

## 💦 循环

Python 里有 `for...in` 和 `while` 两种循环。

for x in ...循环就是把每个元素代入变量 x，然后执行缩进块的语句。

while 循环，只要条件满足，就不断循环，条件不满足时退出循环。

::: code-group

```python [for.py]
sum = 0
for x in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:
    sum = sum + x
print(sum)
```

:::

::: code-group

```python [while.py]
sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
print(sum)
```

:::

在循环中 我们可以使用 `break` 语句来退出循环，
或者 `continue` 语句来跳过本次循环，然后继续下一次循环。

::: warning
不要滥用 break 和 continue 语句。break 和 continue 会造成代码执行逻辑分叉过多，容易出错。
大多数循环并不需要用到 break 和 continue 语句，大部分都可以通过改写循环条件或者修改循环逻辑，去掉 break 和 continue 语句。
:::

## 💦 函数

函数是一种最基本的代码抽象方式。

基本上所有的高级语言都支持函数，Python 也不例外。
Python 不但能非常灵活地定义函数，而且本身内置了很多有用的函数，可以直接调用。

与其他语言一样 Python 中有很多内置的函数 给我们调用：

::: code-group

```python
# 数据类型转换
int('123') # 123
float('123.1') # 123.1
str(123) # '123'
bool(123) # True
```

:::

Python 使用 `def` 语句定义函数。
依次为 函数名、括号、括号中的参数和冒号，然后，在缩进块中编写函数体，函数的返回值用 return 返回。

::: code-group

```python [defFun.py]
# 定义函数
def add(x):
    return x

# 返回多个值
def add(x, y):
    return x, y
x, y = add(1, 2)

# 空函数
def do_nothing():
    pass

# 参数检查
def add(x, y):
    if not isinstance(x, (int, float)) or not isinstance(y, (int, float)):
        raise TypeError('x and y must be int or float')
    return x + y
add(1, '2')
```

:::

::: tip 返回值
Phthon 的函数返回多个值其实是返回了一个 tuple， tuple 可以省略括号，
而多个变量可以同时接收一个 tuple，按位置赋给对应的值。
:::

::: tip 空函数
如果想定义一个什么事也不做的空函数，可以用 pass 语句。
pass 语句什么都不会做，实际上只是用来作为占位符。
比如当前还没想好函数具体什么写，就先用 pass 占位，让代码正常运行起来。
否则会有语法错误
:::

::: warning 检查参数
调用函数时 Python 解释器会自动检查参数个数，如果不对，会抛出 TypeError。
但是解释器不会检查参数类型，不过你可以在函数体中进行类型检查，可以用 isinstance() 函数来检查参数类型。
:::

#### 函数的参数

位置参数：传入的两个值按照位置顺序依次赋给参数 x 和 y;

::: code-group

```python [posFun.py]
def add(x, y):
    return x + y
res = add(1, 2)
print(res) # 3
```

:::

默认参数：一定要遵循必选参数在前，默认参数在后的顺序;

::: code-group

```python [defaultFun.py]
def add(x, y=1):
    return x + y
```

:::

可变参数：允许传入任意个参数，使用 `*` 表示所有元素作为可变参数传入，
调用时自动组装为一个 tuple;

::: code-group

```python [varFun.py]
def add(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum
print(add(1, 2, 3)) # 14

print(add(*[1, 2, 3])) # 14
```

:::

关键字参数：允许传入任意个含参数名的参数，使用 `**` 表示所有元素作为关键字参数传入，
调用时自动组装为一个 dict;

::: code-group

```python [kwFun.py]
def person(name, age, **other):
  print('name:', name, 'age:', age, 'other:', other)

person('XiaoMing', 30)
# name: XiaoMing age: 30 other: {}
person('XiaoQiang', 35, city='Beijing')
# name: XiaoQiang age: 35 other: {'city': 'Beijing'}

xhInfo = { 'email': 'xh@xx.com', 'phone': '123456', 'job': 'Engineer' }
person('XiaoHong', 45, **xhInfo)
# name: XiaoHong age: 45 other: {'email': 'xh@xx.com', 'phone': '123456', 'job': 'Engineer'}) # name: XiaoHong age: 45 other: {'email': 'xh@xx.com', 'sex': 'M', 'job': 'Engineer'}
```

:::

命名关键字：限制关键字参数的名字，使用 `*` 分隔符， `*` 后面的参数为命名关键字参数。

::: code-group

```python [namedKwFun.py]

# 只接收 email 和 phone 两个关键字参数
def person(name, age, *, email, phone):
    print(name, age, email, phone)、

person('XiaoHong', 45, email='xh@xx.com', phone='123456')
```

:::

::: tip 参数组合
在 Python 中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，
这 5 种参数都可以组合使用。但是请注意，
参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。
:::

## 💦 模块

随着代码量的增加，我们的代码会越来越大，
把很多函数分组，分别放到不同的文件里，这样，每个文件包含的代码就相对较少，
很多编程语言都采用这种组织代码的方式。

模块是一组 Python 代码的集合，可以使用其他模块，也可以被其他模块使用。

在 Python 中，一个 `.py` 文件就称之为一个模块（Module），
包含所有模块文件的顶层目录称之为包（Package）。

::: code-group

```python
mycompany ------ 包名
 ├─ web
 │  ├─ __init__.py
 │  ├─ utils.py
 │  └─ www.py
 ├─ __init__.py
 ├─ abc.py
 └─ utils.py
```

:::

::: tip

请注意，每一个包目录下面都会有一个 `__init__.py` 的文件，这个文件是必须存在的，
否则，Python 就把这个目录当成普通目录，而不是一个包。`__init__.py` 可以是空文件，
也可以有 Python 代码，因为`__init__.py` 本身就是一个模块，它的模块名就是 `mycompany`。
比如： 文件 `www.py` 的模块名就是 `mycompany.web.www`

:::

#### 使用模块

引入模块的关键字是 import，后面加个空格，然后加上模块名即可。

::: code-group

```python

# 随机数模块
import random
print(random.randint(1, 9))
```

:::

当使用第三方模块时，需要先知道该库的名称，然后可以在官网或者 [pypi](https://pypi.org/) 上搜索。
一般来说，第三方库都会在 Python 官方的 [pypi](https://pypi.org/) 网站注册。

::: code-group

```sh
pip3 install Pillow
```

:::

::: warning

注意当前在 MacOS 或者 Linux 中 Python 版本可能是 Python 3.x 或者和 Python 2.x 共存，
对应的 pip 命令是 `pip3`

:::

#### 创建模块

下面是 Python 模块的标准文件模板，当然也可以全部删掉不写。

::: code-group

```python [test.py]
#!/usr/bin/env python3 # 可以使当前文件直接在 Linux/MacOS/Unix 中运行
# -*- coding: utf-8 -*- # 指定当前文件使用标准 UTF-8 编码

' a test module ' # 可以使当前文件直接在 Linux/MacOS/Unix 中运行

__author__ = 'Youyou' # __author__ 表示作者

import sys # 导入 sys 模块

# 代码块
def test():
    args = sys.argv
    if len(args)==1:
        print('Hello, %s!' % args[0])
    elif len(args)==2:
        print('Hello, %s!' % args[1])
    else:
        print('Too many arguments!')

if __name__=='__main__': # 运行测试
    test()
```

:::

![20250812153014](http://images.qiuyouyou.cn/notes/20250812153014.png)

::: tip 运行测试

上面代码 当我们在命令行运行该模块文件时，
Python 解释器把一个特殊变量 `__name__` 置为 `__main__` ，而如果在其他地方导入该模块时，`if` 判断将失败,
这可以让我们通过命令行执行一些代码，一般用来运行测试。

当我们导入该模块时就不会执行 `test()` 函数，需要手动调用才可以 `test.test()`。

:::

在上面的代码中 `__author__` 和 `__name__` 都属于特殊变量，
这样的函数或变量就是非公开的 (private)，它表示不应该被直接引用。
所以我们使用 `_xxx` 和 `__xxx` 这样的函数或变量来表示非公开的 (private)。

::: code-group

```python [test.py]
def _private_1(age):
    return 'Minors %s' % age

def _private_2(age):
    return 'Adult %s' % age

def greeting(age):
    if age > 18:
        return _private_1(age)
    else:
        return _private_2(age)
```

:::

::: warning
注意非公开的是不应该而不是不能被引用。它们依然存在于命名空间中，
可以被其他函数引用，Python 并没有可以完全限制访问的方法。
:::
