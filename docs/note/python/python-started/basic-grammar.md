---
tag:
  - 笔记
tags:
  - Python
  -
recommend: 2

description: 使用 Python 快速实现一个 Hello World，认识 Python。
---

# Python 学习笔记（二） - 基础语法

## 💦 数据类型

| 类型             | 值                | 说明                                               |
| ---------------- | ----------------- | -------------------------------------------------- |
| 整数 （int）     | 1、100、-8080、0  | Python 可以处理任意大小的整数、包括负整数。        |
| 浮点数 （float） | 1.23、3.14、-9.01 | 对于很大或很小的浮点数，就必须用科学计数法表示     |
| 字符串（str）    | 'abcd'、"efg"     | 字符串是以单引号' 或双引号" 括起来的任意文本。     |
| 布尔值（bool）   | True、False       | 布尔值可以用 and、or 和 not 运算。 要注意大小写!!! |
| 空值（NoneType） | None              | 空值是 Python 中一个特殊的值，用 None 表示。       |

### list & tuple

list(列表) 是一种可变的有序的集合，可以随时添加和删除其中的元素。

tuple(元组) 是另一种有序列表和 list 非常类似，但是 tuple 一旦初始化就不能修改。

::: code-group

```python[list.py]
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

```python[tuple.py]

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

### dict & set

dict 在其他语言中也称为 map，使用键-值（key-value）存储，具有极快的查找速度。

::: code-group

```python[dict.py]

person = { 'name': 'xiaohong', 'age': 18, 'gender': 'male'}

# 可以通过 key 来操作 dict 中的值
print(person['name']) # xiaohong

person['age'] = 28
print(person['age']) # 28
```

:::

::: tip dict VS list
dict 的查找速度极快 ，不会随着 key 的增加而变慢
list 的查找和插入的速度会随着元素的增加而增加
dict 需要占用更多的内存，内存浪费多
list 占用空间小 浪费内存少

因此 dict 是用空间来换取时间的一种方法。
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

如果要判断多个条件的话，可以使用 `elif`。

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

## 💦 循环
