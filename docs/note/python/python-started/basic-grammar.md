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

## 数据类型

| 类型             | 值                  | 说明                                               |
| ---------------- | ------------------- | -------------------------------------------------- |
| 整数 （int）     | 1、 100、 -8080、 0 | Python 可以处理任意大小的整数、包括负整数。        |
| 浮点数 （float） | 1.23、 3.14、 -9.01 | 对于很大或很小的浮点数，就必须用科学计数法表示     |
| 字符串（str）    | 'abcd'、 "efg"      | 字符串是以单引号' 或双引号" 括起来的任意文本。     |
| 布尔值（bool）   | True、 False        | 布尔值可以用 and、or 和 not 运算。 要注意大小写!!! |
| 空值（NoneType） | None                | 空值是 Python 中一个特殊的值，用 None 表示。       |

#### list & tuple

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

```

:::

#### dict & set

## 数学运算

| 运算符        | 例子     | 说明                                       |
| ------------- | -------- | ------------------------------------------ |
| + （加法）    | 1 + 1    | 2                                          |
| - （减法）    | 1 - 1    | 0                                          |
| \* （乘法）   | 2 \* 2   | 4                                          |
| / （除法）    | 4 / 2    | 2                                          |
| // （整除）   | 10 // 3  | 3 整除（地板除）- 两个整数的除法仍然是整数 |
| % （取余）    | 5 % 2    | 1                                          |
| \*\* （次方） | 2 \*\* 3 | 8                                          |

## 条件运算
