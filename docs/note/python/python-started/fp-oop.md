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
| `complex` | `z = 1+2` | ❌ | 复数类型 |
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
它接收一个函数为参数，并返回一个新函数。

当需要在函数调用前后增加逻辑时，
又不希望修改函数的定义，就可以用装饰器来实现，
这种在代码运行期间动态增加功能的方式就是 装饰器（Decorator）。

::: code-group

```python [decorator.py] {}
# log 是高阶函数（接收函数 → 返回函数）
def log(func):
    def wrapper(*args, **kwargs):
        print("before")
        result = func(*args, **kwargs)
        print("after")
        return result

    return wrapper


# @ 语法糖让我们能优雅地“包裹”函数
@log  # 等价于 say_hi = log(say_hi)
def say_hi():
    print("hi")


say_hi()
# before
# hi
# after
```

:::

#### functools.wraps

说到装饰器，就不得不提到 `functools.wraps` 了。 在 Python 中创建一个装饰器的常见写法是:

::: code-group

```python [functools_wraps.py]
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before call")
        return func(*args, **kwargs)

    return wrapper


@my_decorator
def add(x, y):
    """Return the sum of x and y."""
    return x + y


print(add.__name__)  # wrapper
print(add.__doc__)  # None

```

:::

这样会出现一个问题：`wrapper` 替代了原来的 `func`，
导致原函数的一些元信息（比如 name、doc、注释文档等）丢失。

这在调试、文档生成（Sphinx）、以及某些框架（比如 Flask）里会引发问题。

`functools.wraps` 它的作用 是一个装饰器工厂，用来简化修复上面的问题。

它的实现本质上是调用了 `functools.update_wrapper`，会把原函数的一些属性复制到装饰器的 `wrapper` 函数上:

::: code-group

```python [functools_wraps.py] {}
import functools  # [!code focus] [!code ++]


def my_decorator(func):
    @functools.wraps(func)  # [!code focus] [!code ++]
    def wrapper(*args, **kwargs):
        print("Before call")
        return func(*args, **kwargs)

    return wrapper


@my_decorator
def add(x, y):
    """Return the sum of x and y."""
    return x + y


print(add.__name__)  # add [!code focus] [!code ++]
print(add.__doc__)  # Return the sum of x and y. [!code focus] [!code ++]

```

:::

简单来说
`@functools.wraps(func)` 的作用就是：
在写装饰器时，保证被装饰函数的元信息不会丢失。

::: tip special attributes / special methods
像 `__name__、__doc__` 这种 前后双下划线的属性/方法，在 Python 里有一个专门的名字,

- 官方叫法：`special attributes / special methods`
- 俗称：`dunder（double underscore 的缩写）(如 dunder name、dunder doc)`
- 大家平时也会听到：魔术方法/魔术变量。在 Python 社区里，前后双下划线的东西通常都叫 魔术 (magic) / 特殊 (special) 。

:::

### 偏函数

函数式编程中，偏函数指的是：
把一个多参数函数的部分参数固定下来，生成一个新的函数。

Python 的 functools 模块还提供了很多有用的功能，
其中一个就是偏函数（Partial function）。
它让代码更简洁，避免写重复的 lambda。本质上是函数组合的一种技巧。

::: code-group

```python [partial.py] {9,10,18}
from functools import partial


def power(base, exponent):
    return base**exponent


# 我们知道通过设定参数的默认值，可以降低函数调用的难度
def power2(base, exponent=2):
    return power(base, exponent)


print(power2(5))  # 25
print(power2(10))  # 100

# 同样偏函数也可以做到 它给函数预设常用参数，得到更专用的函数。
# 固定 exponent=2，得到一个“平方函数”
square = partial(power, exponent=2)

print(square(5))  # 25
print(square(10))  # 100


```

:::

所以：当函数的参数个数太多，需要简化时，
使用 `functools.partial` 可以创建一个新的函数，
这个新函数可以固定住原函数的部分参数，从而在调用时更简单。

## 面向对象编程

面向对象编程的核心思想: 强调 “数据和操作数据的行为封装在对象中”，
把数据和操作封装在对象里，用类来表达概念，用组合/继承/多态来扩展。

面向对象编程的核心特征:

- 类与对象: 类是模板，对象是实例。
- 封装: 对象的数据和方法绑定在一起，内部实现对外隐藏。
- 继承: 子类继承父类属性和方法，实现代码复用。
- 多态: 不同对象可以用相同接口调用不同实现。

下面我们来逐步理解这些概念：

### 类与实例

面向对象最重要的概念就是类和实例（对象）。这里我们必须要牢记:

"**类是对象的模板/蓝图,对象是类的具体实例**"。
类是创建实例的模板，而实例则是一个一个具体的对象，
各个实例拥有的数据都互相独立，互不影响。

::: code-group

```python [class.py] {}
# 定义类使用 class 关键字
class Person(object):
    def __init__(self, name, age):  # 构造方法（初始化）
        self.name = name
        self.age = age


# 通过类创建类的实例
p1 = Person("Alice", 20)
p2 = Person("Bob", 25)

```

:::

::: tip \_\_init\_\_
在创建实例的时通过一个特殊的方法 `__init__` 来初始化实例的数据成员。

`__init__` 方法的第一个参数永远是 `self`，
表示创建的实例本身，因此，在 `__init__` 方法内部，
就可以把各种属性绑定到 `self`。

:::

### 数据封装

在类的内部定义访问数据的函数，这样就把数据"封装"起来了。外部只通过接口访问。

这些封装数据的函数是和类本身是关联起来的，我们称之为类的方法。
通过在实例上调用方法，我们就直接操作了对象内部的数据，
并且无需知道方法内部的实现细节。

::: code-group

```python [class.py] {}
# 定义类使用 class 关键字
class Person(object):
    def __init__(self, name, age):  # 构造方法（初始化）
        self.name = name
        self.age = age

    def say_hello(self):  # 方法
        print(f"Hi, I'm {self.name}, {self.age} years old.")

    def set_name(self, name):  # 方法
        self.name = name

    def get_name(self):  # 方法
        return self.name


# 通过类创建类的实例
p1 = Person("Alice", 20)
p2 = Person("Bob", 25)

p1.say_hello()  # Hi, I'm Alice, 20 years old.
p2.say_hello()  # Hi, I'm Bob, 25 years old.

p1.set_name("xiaoming") #
print(p1.get_name())  # xiaoming

```

:::

::: warning 接口访问
在 OOP 里，接口不是特指某种语法，而是指 对外提供的方法。
对外只暴露有限的访问方式（接口），外部不直接操作内部数据，
而是通过这些方式来访问或修改。
:::

::: tip
和普通的函数相比，在类中定义的函数只有一点不同，
就是第一个参数永远是实例变量 self，
并且，调用时，不用传递该参数。
除此之外，类的方法和普通函数没有任何区别。
:::

### 继承和多态

当我们定义一个 `class` 的时候，可以从某个现有的 `class` 继承，
新的 `class` 称为子类 `（Subclass）`，
而被继承的 `class` 称为基类、父类或超类 `（Base class、Super class）`。

子类不但可以继承父类的属性和方法，还可以扩展或重写:

::: code-group

```python [inheritance.py] {}
# 从 Person 类继承
class Teacher(Person):
    def __init__(self, name, age, subject):  # 构造方法（初始化）
        super().__init__(name, age)  # 调用父类的构造方法
        self.subject = subject

    def say_hello(self):  # 方法重写
        print(
            f"Hi, I'm {self.name}, {self.age} years old. I'm a teacher of {self.subject}."
        )

# 从 Person 类继承
class Student(Person):
    def __init__(self, name, age, major):  # 构造方法（初始化）
        super().__init__(name, age)  # 调用父类的构造方法
        self.major = major

    def say_hello(self):  # 方法重写
        print(
            f"Hi, I'm {self.name}, {self.age} years old. I'm a student of {self.major}."
        )


tc = Teacher("Alice", 30, "Python")
tc.say_hello()  # 调用重写方法
# Hi, I'm Alice, 30 years old. I'm a teacher of Python.

# 继承父类的方法
print(tc.get_name())  # Alice

st = Student("XiaoMing", 14, "web")
st.say_hello()  # 调用重写方法
# Hi, I'm XiaoMing, 14 years old. I'm a student of web.

# 继承父类的方法
print(st.get_name())  # XiaoMing

```

:::

可以看到继承最大的好处是子类获得了父类的全部功能。

当子类和父类存在了相同的方法，子类的方法会覆盖父类的方法。
这样，我们就获得了继承的另一个好处：**多态**。

多态即：多种形态。同样的方法名，不同的对象，执行的结果不同，
表现出的行为不同:

::: code-group

```python [inheritance.py] {}
# 我们再定义一个从 Person 派生的 Worker
class Worker(Person):
    def say_hello(self):  # 方法重写
        print(f"Hi, I'm {self.name}, {self.age} years old. I'm a worker.")


# 再来定义一个调用者
def self_introduction(person: Person):
    person.say_hello()


tc = Teacher("Alice", 30, "Python")
st = Student("XiaoMing", 14, "web")
wk = Worker("xiaobai", 33)


self_introduction(tc)
# Hi, I'm Alice, 30 years old. I'm a teacher of Python.
self_introduction(st)
# Hi, I'm XiaoMing, 14 years old. I'm a student of web
self_introduction(wk)
# Hi, I'm xiaobai, 33 years old. I'm a worker.

```

:::

所以我们发现，我们新增一个子类 `Worker` 后，并不需要对 `self_introduction` 进行修改。
我们只需要接收 `Person` 类型就可以了。

`self_introduction` 调用只管调用，不管细节，只知道它有可以调用的 `say_hello` 方法。
调用方式一样，但行为不同，这就是多态的本质。

::: tip 著名的“开闭”原则
对扩展开放：允许新增 Person 子类；
对修改封闭：不需要修改依赖 Person 类型的 self_introduction()等函数。
:::

#### 不依赖继承的多态（鸭子类型）

Python 比较特别，它的多态不一定要靠继承。
Python 的多态是基于鸭子类型的（duck typing），鸭子类型是指：如果看起来像鸭子，那就是鸭子。

只要对象有 `say_hello` 方法，就能被 `self_introduction` 使用：

::: code-group

```python [polymorphism.py] {}
class Programmer:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"Hi, I'm {self.name}, I'm a programmer.")


prg = Programmer("xiaowang")
self_introduction(prg)
# Hi, I'm xiaowang, I'm a programmer


```

:::

可以看到虽然 `Programmer` 没有继承 `Person`
但它也能用在 `self_introduction` 里，因为它实现了 `say_hello`。

在 `Python` 中，多态甚至不需要继承，只要“有这个方法”就行。

::: tip
动态语言的鸭子类型特点决定了继承不像静态语言那样是必须的。

对于静态语言（例如 Java）来说，如果需要传入 `Person` 类型，
则传入的对象必须是 `Person` 类型或者它的子类，否则，将无法调用 `say_hello` 方法。

对于 Python 这样的动态语言来说，则不一定需要传入 `Person` 类型。
我们只需要保证传入的对象有一个 `say_hello` 方法就可以了
:::

## 面向对象高级

数据封装、继承和多态只是面向对象程序设计中最基础的 3 个概念。在 Python 中，面向对象还有很多高级特性，允许我们写出非常强大的功能。

### 实例属性、类属性

当给实例绑定属性的方法时是通过实例的变量，或者通过 self 变量来绑定。
我们还可以给类绑定 类的属性:

::: code-group

```python [class.py] {}
class Person(object):
    person_total = 0  # [!code focus] [!code ++]

    def __init__(self, name, age):
        Person.person_total += 1  # 修改类属性统计人数
        self.name = name


p1 = Person("A", 20)  # [!code focus] [!code ++]
p2 = Person("B", 20)  # [!code focus] [!code ++]
p3 = Person("C", 20)  # [!code focus] [!code ++]

print(Person.person_total)  # 3  访问类属性 [!code focus] [!code ++]
print(p2.person_total)  # 3 类的所有实例都可以访问  [!code focus] [!code ++]

```

:::

实例属性、类属性:

- 实例属性属于各个实例所有，互不干扰。
- 类属性属于类所有，所有实例共享一个属性。
- 定义了一个类属性后，这个属性虽然归类所有，但类的所有实例都可以访问到。
- 不要对实例属性和类属性使用相同的名字。

### 类和实例的属性控制

在我们创建了一个实例后，
我们可以给该实例绑定任何属性和方法，
这就是动态语言的灵活性。

Python 允许在定义 class 的时候，定义一个特殊的 `__slots__`变量，
来限制该 class 实例能添加的属性：

::: code-group

```python [] {}
# 用tuple定义允许绑定的属性名称
class Person:
    __slots__ = ("name", "age")  # 只能有这两个属性


p = Person()
p.name = "Alice"  # ✅
p.age = 20  # ✅
# p.gender = "F"  # ❌ AttributeError
```

:::

需要注意是`__slots__`定义的属性仅对
当前类实例起作用，对继承的子类是不起作用的。

### 属性管理(@property)

Python 面向对象里的一个 高级特性 `@property`,
它的本质就是 通过装饰器把方法伪装成属性来访问。

假设我们有一个矩形类，来计算矩形的面积和周长：

::: code-group

```python [rectangle.py] {}
class Rectangle:
    @property
    def width(self):
        return self._width

    @width.setter  # 可读可写属性
    def width(self, value):
        self._width = value

    @property
    def height(self):
        return self._height

    @height.setter  # 可读可写属性
    def height(self, value):
        self._height = value

    @property  # 只读属性
    def area(self):
        return self._width * self._height


r = Rectangle()
r.width = 10
r.height = 5
# r.area = 50 # x ❌ AttributeError

print(r.width)  # ✅ 10 直接像属性一样访问，不用加 ()
print(r.height)  # ✅ 5 直接像属性一样访问，不用加 ()
print(r.area)  # ✅ 50 直接像属性一样访问，不用加 ()

```

:::

- 当使用 `@property` 时，它又创建了另一个装饰器 `@score.setter`。
- 当我们只写 `@property` 时，没有写 `setter`，那它就是只读属性。
- 这里需要注意的是 属性的方法名不要和实例变量重名。

## FP 与 OOP

|      | 函数式编程                  | 面向对象编程                     |
| ---- | --------------------------- | -------------------------------- |
| 思想 | 函数和行为分离 函数式是核心 | 数据和操作数据的行为封装在对象中 |
| 状态 | 要尽量无状态 不修改外部变量 | 对象有状态有方法可以修改对象     |
| 核心 | 函数、高阶函数、不可变数据  | 类、对象、继承、多态             |
| 优势 | 并行、安全、逻辑清晰        | 组织复杂的系统                   |
| 场景 | 数据处理、计算流水线        | 大型系统、模拟实体、GUI          |
