---
tag:
  - Python

description: 配置 Python 开发环境，包括 Python 版本选择、Python 虚拟环境、Python 包管理工具，以及 VSCode 配置。

date: 2025-09-05 09:33:12
---

# Python 开发环境配置

## 🐜 Python 版本介绍

prerelease 为预发布版本，security 为安全版本，bugfix 为 bug 修复版本。

根据个人需求，选择适合的 Python 版本即可。
当然如果不是为了体验新特性或学习。
一般情况我们为了安全都会选择 `security` 的版本。

| Python 版本 | 维护状态   | 首次发布   | 终止支持 |
| ----------- | ---------- | ---------- | -------- |
| 3.13        | prerelease | 2024-10-01 | 2029-10  |
| 3.12        | bugfix     | 2023-10-02 | 2028-10  |
| 3.11        | bugfix     | 2022-10-04 | 2027-10  |
| 3.10        | security   | 2021-10-04 | 2026-10  |
| 3.9         | security   | 2020-10-05 | 2025-10  |
| 3.8         | security   | 2019-10-14 | 2024-10  |

## 🐜 来给 PIP 提提速

镜像加速就是把 pip 所有的包拷贝，我们让 pip 直接连接到国内下载。

> 镜像地址: `https://mirrors.cloud.tencent.com/pypi/simple`。

- 临时设置：`pip install -i [镜像地址] <package>`
- 全局设置：`pip config set global.index-url [镜像地址]`

## 🐜 Python 虚拟环境

Python 虚拟环境提供了一个独立运行的环境，每个虚拟环境都有自己的 Python 解释器、库、包等。达到了为
不同项目创建隔离的 Python 环境:

- 项目隔离：不同项目可能需要不同版本的 Python 或第三方库
- 避免冲突：防止全局 Python 环境被污染
- 依赖管理：方便记录和分享项目的依赖关系
- 测试环境：可以安全地测试新包而不影响其他项目

我们使用官方的 `venv` 包来创建和管理虚拟环境，使用方法如下：

- 创建虚拟环境：`python3 -m venv .venv`
- 激活虚拟环境：`source .venv/bin/activate`

::: warning .venv

`.venv`：虚拟环境的名称（可以自定义）, 命名为'.venv'是常见约定。

:::

::: code-group

```sh [test-project]
# 创建项目
mkdir test-project && cd test-project

# 创建虚拟环境
python3 -m venv .venv

# 激活虚拟环境
source .venv/bin/activate

# 激活成功后命令行回显示当前环境
(.venv) $
# 或者通过命令查看
which python

# 退出虚拟环境
deactivate

# 删除虚拟环境（删除目录）
rm -rf .venv

```

:::

::: info 虚拟环境的表现

```
.venv/
├── bin/            # 在 Unix/Linux 系统上
│   ├── activate    # 激活脚本
│   ├── python      # 环境 Python 解释器
│   └── pip         # 环境的 pip
├── Scripts/        # 在 Windows 系统上
│   ├── activate    # 激活脚本
│   ├── python.exe  # 环境 Python 解释器
│   └── pip.exe     # 环境的 pip
└── Lib/            # 安装的第三方库
```

:::

当前使用虚拟环境安装的包 只会影响当前环境

`pip install openai`

## 🐜 开发编辑器配置

#### VSCode

如果你不喜欢自己进行配置推荐选择 `PyCharm` 来进行开发。当然如果你也喜欢使用 `VSCode` , 为了有更好的
开发体验可以进行下面的配置：

安装 `Python` 的扩展：`Python Extension Pack` 这里包含了我们所需要的插件：

![20250819142423](http://images.qiuyouyou.cn/notes/20250819142423.png)

安装后我们可以打开我们的项目可以看到 `Environment` 提供了环境管理的界面：
这里可以快速的进行新建删除和运行虚拟环境：

![20250819145017](http://images.qiuyouyou.cn/notes/20250819145017.png)

配置 `VSCode` 的自动导入补全以及 `Python` 默认的语言服务:

![20250819153243](http://images.qiuyouyou.cn/notes/20250819153243.png)

::: code-group

```json [setting.json]
  // 自动导入补全
  "python.analysis.autoImportCompletions": true,
  "python.autoComplete.extraPaths": ["./src", "./lib"],
  // 默认语言服务
  "python.languageServer": "Pylance",
```

:::

接下来配置格式化程序。安装 [Black Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter)插件并添加配置：

:::code-group

```json [setting.json]
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
```

:::

Python 文件中还有一些必要的注释，这些注释可以帮助我们更好的了解文件的作用和作用。
将他配置为代码片段避免每次进行书写：

在 VSCode 的 `代码片段` 中新建 `python.json` 文件，内容如下：

添加后通过在 `.py` 文件中输入 `header` 就可以快速添加头部注释。

:::code-group

```json [python.json]
{
  "HEADER": {
    "prefix": "header",
    "body": [
      "#!/usr/bin/env python",
      "# -*- encoding: utf-8 -*-",
      "'''",
      "@File : $TM_FILENAME",
      "@Time : $CURRENT_YEAR/$CURRENT_MONTH/$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
      "@Author : Youyou",
      "'''",
      "",
      "$0"
    ]
  }
}
```

:::

![20250819150617](http://images.qiuyouyou.cn/notes/20250819150617.png)

::: tip

Python 头部文件:

`#!user/bin/env python` 告诉系统要运行这个文件要用什么运行

`# -*- coding:utf-8 -*-` 使用 utf-8 编码（python2 默认不支持中文）

写了这样的开头，就可以在 linux 下和 python2 下运行

头注释除了必要的信息外，一些简单的介绍也是尤为重要呢，比如作者、创建日期、版本等等。
:::

#### PyCharm (推荐)

PyCharm 是由 JetBrains 开发的一款功能强大的 Python 集成开发环境（IDE），专为 Python 开发者设计。

同样为了有更好的开发体验，可以进行一些简单的配置：

使用 `PyCharm` 打开项目，打开项目设置，可以看到编辑器默认给我们选择了当前的虚拟环境：

![20250820151437](http://images.qiuyouyou.cn/notes/20250820151437.png)

这里也可以手动设置：`Add Interpreter 👉 Add Local Interpreter`
选择虚拟环境 `Vitualenv Environment 👉 existing`
选择我们项目的虚拟环境即可：

![20250820152125](http://images.qiuyouyou.cn/notes/20250820152125.png)

设置 `Reformat code`(保存格式化代码) 及 `Optimize imports` (优化导入)：

![20250820160040](http://images.qiuyouyou.cn/notes/20250820160040.png)

还记得[上面](/note/python/python-evn-setup/#vscode)在 `VSCode` 中配置的文件头部注释吗？
在 `PyCharm` 中来配置一下:
配置后在我们新建文件时就会自动生成头部注释。

![20250820162839](http://images.qiuyouyou.cn/notes/20250820162839.png)

## 🐜 实现简单接口

接下来实现一个简单的接口，简单梳理代码的运行流程。

#### Python 命名规范

开始在写代码前，先了简单解一下 Python 命名规范：

- 文件名：小写字母，下划线分割，如：`app_service.py`
- 模块名：与文件名类似，小写字母，下划线分割；
- 类 名：以大写字母开头，使用驼峰命名法，如：`AppService`
- 常 量：使用全大写字母，使用下划线分割，如：`APP_SERVICE`
- 变量名：以小写字母开头，使用下划线分割，如：`app_service`
- 方法名：以小写字母开头，使用下划线分割，如：`get_app_service`
- 私有变量及方法：以一个下划线开头，使用下划线分割，如：`_app_service`、

::: warning
Python 中并没有严格的私有变量/方法，这种命名约定只是一种约定，而不是强制规则，实际上
这些变量或者方法仍然可以被使用，但是作为一种约定，在外部调用时，
不应该调用私有的变量与方法。

在一些场景中使用单下划线表示弱私有，双下划线表示强私有。

:::

#### 创建项目

创建一个新的项目并创建一个新的虚拟环境:

::: code-group

```bash [] {}
mkdir first-demo && cd first-demo
python3 -m venv venv
```

:::

#### 该项目目录结构

::: code-group

```python [] {}
📦.venv                 # 虚拟环境表现
📦app                   # 应用入口集合
 ┣ 📂http
 ┃ ┣ 📜__init__.py
 ┃ ┗ 📜app.py
 ┗ 📜__init__.py
📦config                # 应用配置文件
 ┗ 📜__init__.py
📦internal              # 所有内部文件夹
 ┣ 📂handle             # 路由处理器、控制器目录
 ┃ ┣ 📜__init__.py
 ┃ ┗ 📜app_handle.py
 ┣ 📂router             # 路由文件夹
 ┃ ┣ 📜__init__.py
 ┃ ┗ 📜router.py
 ┣ 📂server            # 构建应用 与app文件夹对应
 ┃ ┣ 📜__init__.py
 ┃ ┗ 📜http.py
 ┗ 📜__init__.py
```

:::

#### 实现简单接口

使用 Flask 来实现一个简单的接口，Flask 是一个轻量级的 Python web 框架，
它可以帮助我们快速搭建一个简单的 Web 服务，
并提供了一些常用的功能，比如路由、请求处理、模板渲染等等。

确保在我们的虚拟环境中进行安装：
![20250902112637](http://images.qiuyouyou.cn/notes/20250902112637.png)

<br />

- 在 `venv` 虚拟环境中安装 `Flask` 、`injector`

::: code-group

```bash [] {}
pip install flask
pip install injector
```

:::

- 创建应用控制器并进行导出：

::: code-group

```python [internal/handle/app_handle.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   app_handle
@Time   :   2025/9/2 10:03
@Author :   s.qiu@foxmail.com
"""


class AppHandle:
    """应用控制器"""

    def test(self):
        return {"test": "test handle"}

```

```python [internal/handle/__init__.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   __init__.py
@Time   :   2025/9/2 10:02
@Author :   s.qiu@foxmail.com
"""
from .app_handle import AppHandle

# 魔术变量
__all__ = ["AppHandle"]

```

:::

- 创建路由

::: code-group

```python [internal/router/router.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   router
@Time   :   2025/9/2 10:03
@Author :   s.qiu@foxmail.com
"""

from flask import Flask, Blueprint
from injector import inject
from dataclasses import dataclass

from internal.handle import AppHandle


@inject  # 依赖注入
@dataclass
class Router:
    app_handle: AppHandle

    """路由"""

    def register_router(self, app: Flask):
        """注册路由"""

        # flask 创建蓝图
        bp = Blueprint('demo', __name__, url_prefix='')

        # 将 URL 与对应的控制器方法做绑定
        bp.add_url_rule('/test', view_func=self.app_handle.test)

        ## flask 注册蓝图
        app.register_blueprint(bp)

```

```python [internal/router/__init__.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   __init__.py
@Time   :   2025/9/2 10:03
@Author :   s.qiu@foxmail.com
"""

from .router import Router

__all__ = ['Router']

```

:::

- 创建 HTTP 服务引擎

::: code-group

```python [internal/server/http.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   http
@Time   :   2025/9/2 10:03
@Author :   s.qiu@foxmail.com
"""
from flask import Flask, views
from internal.router import Router


# 继承 Flask
class Http(Flask):
    """HTTP引擎"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # 注册路由
        Router.register_router(self)

```

```python [internal/server/__init__.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   __init__.py
@Time   :   2025/9/2 10:03
@Author :   s.qiu@foxmail.com
"""

from .http import Http

__all__ = ["Http"]

```

:::

- 创建应用

::: code-group

```python [app/http/app.py] {}
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
@File   :   app.py
@Time   :   2025/9/2 10:02
@Author :   s.qiu@foxmail.com
"""

from injector import Injector

from internal.router import Router
from internal.server import Http

app = Http(__name__, router=Injector.get(Router))

if __name__ == "__main__":
    app.run(debug=True)

```

:::

#### 配置 Flask 脚本

`Add New Configuration` -> `Flask server`
把 `app.py` 设置为启动脚本后运行：

![20250902113603](http://images.qiuyouyou.cn/notes/20250902113603.png)

![20250902113841](http://images.qiuyouyou.cn/notes/20250902113841.png)

## 🐜 项目依赖管理

在 Python 项目里，我们通常需要一个
`requirements.txt` 来记录项目依赖的第三方库,
方便部署或给别人使用。 可以使用 `pip freeze` 命令：

::: code-group

```bash [] {}
pip freeze > requirements.txt
```

:::

但 `pip freeze` 会把 当前环境里的所有包
都写进去（哪怕项目没有用到），导致文件很臃肿。

而 `pipreqs` 的思路是： 扫描你的项目源码，
根据 `import xxx` 的语句来判断你真正用到哪些库，再生成简洁的 `requirements.txt`。

安装 [`pipreqs`](https://pypi.org/project/pipreqs/) 并在项目目录下运行:

::: code-group

```bash [] {}
pip install --no-deps pipreqs
pip install yarg==0.1.9 docopt==0.6.2
```

:::

`--ignore` 参数忽略 `venv` 目录
/ `--force` 参数强制覆盖 `requirements.txt`

::: code-group

```bash [] {}
pipreqs --ignore .venv --force
```

:::

生成结果 `requirements.txt` ：

::: code-group

```txt [requirements.txt] {}
Flask==3.1.2
injector==0.22.0

```

:::

根据 `requirements.txt` 文件一次性安装项目依赖:

::: code-group

```bash [] {}
pip install -r requirements.txt
```

:::
