---
tag:
  - 笔记
tags:
  - Python

description: python-dotenv 是一个用于在 Python 项目中加载和管理环境变量的工具。通过将配置信息存储在 .env 文件中，可以简化敏感信息和配置的管理，提升代码的安全性和可维护性。
---

# python-dotenv 环境变量配置

## ⚾ 安装

::: code-group

```bash [] {}
pip install python-dotenv
```

:::

## ⚾ 创建 .env 文件

::: code-group

```.env [.env] {}
# .env 文件示例
DEBUG=True
SECRET_KEY=mysecretkey123
DATABASE_URL=postgres://user:password@localhost:5432/mydb

```

:::

- 注释用 #
- 每行格式：KEY=VALUE
- 带空格或特殊字符的值可用引号 "value"

## ⚾ 加载环境变量

#### 使用 `load_dotenv()` 默认 加载 `.env` 文件

::: code-group

```python [] {}
from dotenv import load_dotenv
import os

load_dotenv()
debug = os.getenv("DEBUG")
secret_key = os.getenv("SECRET_KEY")

```

:::

#### 指定 `.env` 文件路径

::: code-group

```python [] {}
from dotenv import load_dotenv
from pathlib import Path
import os

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)
database_url = os.getenv("DATABASE_URL")

```

:::

#### 读取为字典（不写入系统环境变量）

::: code-group

```python [] {}
from dotenv import dotenv_values

config = dotenv_values(".env")
print(config['DEBUG'])

```

:::

::: tip 覆盖已有环境变量
如果环境变量已经在系统中存在，`load_dotenv` 默认不会覆盖它。
这时可以通过 `override=True` 来强制覆盖：

`load_doten(override=True)`

:::

::: tip 类型转换
`DEBUG = os.getenv("DEBUG") == "True"`

`PORT = int(os.getenv("PORT", 8000)) # 默认值 8000`

:::

- 不要将 .env 上传到版本控制（加入 .gitignore）。
- 提供 .env.example 示例文件，列出所需的变量名称，但不包含实际值。
- 可以为不同环境创建不同 .env 文件：.env.dev / .env.prod。
