---
tag:
  - 笔记
tags:
  - Python

description: 介绍 pytest 的 fixture 用法，包括基础定义、作用范围、依赖嵌套、参数化、自动运行和 conftest.py 等高级技巧，帮助更高效地管理测试环境和资源。
---

# pytest 之 fixture 用法

## 🚃 fixture 是什么

定义：`fixture` 是 `pytest` 提供的一种机制，用来在测试运行前准备环境、运行后做清理。

核心作用：

- 提供测试需要的数据或对象
- 统一管理初始化和销毁逻辑
- 让测试函数更简洁、更专注

<br />

简单来说在 `pytest` 里，`fixture` 就是测试前的准备工作（setup），
以及测试结束后的清理工作（teardown）。比如：

打开数据库连接、初始化一些测试数据、 启动一个 `HTTP` 服务、创建临时文件夹。

## 🚃 fixture 基础用法

::: code-group

```python [] {}
import pytest

@pytest.fixture
def sample_data():
    print("准备数据")
    return [1, 2, 3]

def test_sum(sample_data):
    assert sum(sample_data) == 6

```

:::

代码执行流程：

- `pytest` 发现 `test_sum` 需要 `sample_data` 参数
- `pytest` 会去找一个叫 `sample_data` 的 `fixture`
- 执行 `sample_data` 这个函数 → 返回 `[1, 2, 3]`
- 把 `[1, 2, 3]` 传给 `test_sum`
- 断言成功

输出中你会看到 "准备数据" 打印出来，说明 `fixture` 被调用了。

## 🚃 fixture 执行顺序

执行一个测试函数时：

- `pytest` 先检查参数列表里有没有 `fixture` 名称。
- 找到对应的 `fixture`，执行并获取返回值。
- 把返回值注入到测试函数里。
- 测试函数运行。
- 如果 `fixture` 定义了清理逻辑`（yield）`，则在测试结束后执行清理。

## 🚃 yield 的用法

`fixture` 可以带清理逻辑，用 `yield` 分隔前置和后置操作:

::: code-group

```python [] {}
@pytest.fixture
def resource():
    print("准备资源")
    yield "my-resource"  # 这里返回给测试用
    print("清理资源")     # 测试跑完后执行

```

:::

执行顺序：

- 测试运行前 → "准备资源"。
- 测试运行时 → 使用 "my-resource"。
- 测试运行后 → "清理资源"。

## 🚃 scope 作用范围

`fixture` 默认是 `function` 级别的 即每个测试函数
都会新建一次。

通过 `scope` 参数来控制 `fixture` 的作用范围:

::: code-group

```python [] {}
import pytest

@pytest.fixture(scope="module")
def db():
    print("连接数据库")
    yield "db-conn"
    print("关闭数据库")

def test_case1(db):
    assert db == "db-conn"

def test_case2(db):
    assert isinstance(db, str)

```

:::

> 这里 scope="module" 在一个文件里只会执行一次数据库连接、清理

`scope` 的值可以是：

- `"function"`：每个测试函数都会重新执行一次（默认）
- `"class"`：在一个测试类中只执行一次
- `"module"`：一个测试文件只执行一次
- `"session"`：整个测试过程只执行一次（适合数据库连接、启动服务）

## 🚃 依赖嵌套

`fixture` 可以依赖另一个 `fixture`：

::: code-group

```python [] {}
@pytest.fixture
def user():
    return {"id": 1, "name": "Alice"}

@pytest.fixture
def auth_user(user):
    user["token"] = "abc123"
    return user

def test_auth(auth_user):
    assert "token" in auth_user

```

:::

- `auth_user` 依赖 `user`
- `pytest` 会先执行 `user` → 把结果传给 `auth_user` → 再传给测试函数

## 🚃 参数化

`fixture` 可以配合参数化使用，让测试覆盖不同数据：

::: code-group

```python [] {}
@pytest.fixture(params=[1, 2, 3])
def number(request):
    return request.param

def test_double(number):
    assert number * 2 in [2, 4, 6]

```

:::

- `pytest` 会多次执行 `test_double`，分别传入 1, 2, 3
- `request.param` 获取参数值

## 🚃 自动运行

如果某个 `fixture` 想对整个测试自动生效，不需要手动声明参数，可以加 `autouse=True`：

::: code-group

```python [] {}
@pytest.fixture(autouse=True)
def setup_env():
    print("自动执行 fixture")

```

:::

- 这种 `fixture` 会在每个测试函数执行前自动运行。
- 适合做全局初始化，比如日志配置、环境变量设置。

## 🚃 conftest.py

如果多个测试文件都需要相同的 `fixture`，可以放到 `conftest.py` 文件里,

`pytest` 会自动发现并加载，不需要 `import`:

::: code-group

```python [conftest.py] {}
import pytest

@pytest.fixture
def api_base_url():
    return "http://localhost:5000"

```

:::

::: code-group

```python [test_api.py] {}
def test_users(api_base_url):
    assert api_base_url.startswith("http")

```

:::

## 🚃 总结

- `fixture` 是 `pytest` 的核心，替代传统的 `setup/teardown`。
- 通过参数注入使用 `fixture`，解耦测试逻辑和准备逻辑。
- 支持作用域 `（function/class/module/session）` 控制执行次数。
- 支持 `yield` 清理，管理资源更优雅。
- 支持依赖、参数化、autouse、conftest.py 让测试更强大、更灵活。
