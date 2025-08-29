---
tag:
  - 笔记
tags:
  - 常用命令
categories:
  - Docker

description: 备忘 Docker 的常用命令、配置。
---

# Docker 常用命令备忘

## 🎋 Docker 安装

::: code-group

```bash
# 官方安装脚本
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

docker --version # 版本
docker --help    # 帮助
```

:::

## 🎋 Docker 服务自启动

::: code-group

```bash
# 查看 docker 服务
systemctl list-units --type=service
# 查看已经启动的服务
systemctl list-units --type=service
# Docker 启动命令
systemctl start docker
# 查看是否设置开机启动
systemctl list-unit-files | grep docker
# 设置 docker 开机自启动
systemctl enable docker.service
# 取消 docker 开机启动
systemctl disable docker.service
# 查看 docker 运行状态
service docker status

```

:::

## 🎋 容器操作

::: code-group

```bash
ps      # 列出 Docker 容器
ps -a   # 列出所有 Docker 容器 包括未运行的
inspect # 获取 Docker 对象（容器、镜像、卷、网络等）的详细挂载信息。

top     # 显示指定容器中的正在运行的进程。
attach  # 允许用户附加到正在运行的容器并与其交互。
events  # 获取 Docker 守护进程生成的事件。
logs    # 获取和查看容器的日志输出。
wait    # 允许用户等待容器停止并获取其退出代码。
export  # 将容器的文件系统导出为 tar 归档文件。
port    # 显示容器的端口映射信息。
stats   # 实时显示 Docker 容器的资源使用情况。
update  # 更新 Docker 容器的资源限制，包括内存、CPU 等。
```

:::

## 🎋 镜像仓库

::: code-group

```bash

login/logout # 管理 Docker 客户端与 Docker 注册表的身份验证。
pull         # 从 Docker 注册表（例如 Docker Hub）中拉取（下载）镜像到本地。
push         # 将本地构建的 Docker 镜像推送（上传）到 Docker 注册表（如 Docker Hub 或私有注册表）。
search       # 用于在 Docker Hub 或其他注册表中搜索镜像。
```

:::

## 🎋 容器生命周期管理

::: code-group

```bash
run                 # 创建并启动一个新的容器。
start/stop/restart  # 这些命令主要用于启动、停止和重启容器。
kill                # 立即终止一个或多个正在运行的容器
rm                  # 于删除一个或多个已经停止的容器。
pause/unpause       # 暂停和恢复容器中的所有进程。
create              # 创建一个新的容器，但不会启动它。
exec                # 在运行中的容器内执行一个新的命令。
rename              # 重命名容器。
```

:::

## 🎋 Docker Compose

::: code-group

```bash
docker compose run      # 启动一个新容器并运行一个特定的应用程序。
docker compose rm       # 启动一个新容器并删除一个特定的应用程序。
docker compose ps       # 从 docker compose 检查 docker 容器状态。
docker compose build    # 构建 docker compose 文件。
docker compose up       # 运行 docker compose 文件。
docker compose ls       # 列出 docker compose 服务。
docker compose start    # 启动 docker compose 文件创建的容器。
docker compose restart  # 重启 docker compose 文件创建的容器。
```

:::

## 🎋 compose 创建 mysql

::: code-group

```bash
cd /home/
mkdir mysql
cd mysql
vi docker-compose.yml

# Use root/example as user/password credentials
version: '3.1'

services:

  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
# (this is just an example, not intended to be a production configuration)

docker compose up -d # 运行
docker ps | grep mysql

docker compose down # 删除移除
```

:::
