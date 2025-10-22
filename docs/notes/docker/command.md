---
tag:
  - Docker
tags:
  - Command

description: 备忘 Docker 的常用命令、配置。

date: 2025-09-05 09:33:12
sticky: 9993
---

# Docker 常用命令备忘

备忘 `Docker` 的常用命令、配置。

## 🎋 Docker 安装

::: code-group

```sh
# 官方安装升级脚本
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

docker --version # 查看版本
docker --help    # 查看帮助
```

:::

## 🎋 Linux 设置自启动

::: code-group

```sh

systemctl list-units --type=service     # 查看服务
systemctl start docker                  # 启动 Docker
systemctl restart docker                # 重启 Docker
systemctl list-unit-files | grep docker # 查看是否开机启动
systemctl enable docker.service         # 设置开机自启动
systemctl disable docker.service        # 取消开机自启动
service docker status                   # 查看 docker 运行状态
```

:::

## 🎋 Docker 镜像操作

::: code-group Docker 镜像命令

```sh
docker pull [镜像名]                      # 从仓库拉取镜像
docker build -t [镜像名:tag] [路径]        # 根据 Dockerfile 构建镜像
docker images                            # 查看本地镜像列表
docker rmi [镜像ID或镜像名]                # 删除镜像
docker tag [镜像ID或镜像名] [新镜像名:tag]  # 给镜像打标签
docker push [镜像名:tag]                  # 推送镜像到远程仓库
docker image prune                       # 删除未使用的镜像（可加 -a 删除所有未使用的镜像）
docker history [镜像名]                   # 查看镜像历史层信息
docker inspect [镜像名]                   # 查看镜像详细信息
```

:::

## 🎋 docker 容器操作

::: code-group

```sh
docker run -it --name [容器名] [镜像名]  # 启动一个容器并进入交互模式
docker run -d --name [容器名] [镜像名]   # 后台启动容器
docker ps                              # 查看运行中的容器
docker ps -a                           # 查看所有容器，包括已停止的
docker stop [容器ID或名]                # 停止容器
docker start [容器ID或名]               # 启动已停止的容器
docker restart [容器ID或名]             # 重启容器
docker rm [容器ID或名]                  # 删除容器（容器必须停止）
docker exec -it [容器ID或名] bash       # 进入正在运行的容器
docker logs [容器ID或名]                # 查看容器日志
docker stats                           # 查看容器实时资源使用情况
docker inspect [容器ID或名]             # 查看容器详细信息
docker commit [容器ID] [新镜像名:tag]    # 将容器当前状态保存为新镜像
docker cp [容器ID]:/路径 /本地路径        # 从容器拷贝文件到本地（反之亦可）
docker rm -f $(docker ps -aq)          # 一键删除所有容器
docker rmi -f $(docker images -aq)     # 一键删除所有镜像
```

:::

## 🎋 dokcer 一键清理命令

::: code-group

```sh [] {}
docker rm -f $(docker ps -aq)         # 一键删除所有容器
docker rmi -f $(docker images -aq)    # 一键删除所有镜像
docker system prune -a                # 删除所有未使用的容器、网络、镜像（慎用）
```

:::

## 🎋 Docker Compose

::: code-group

```sh
docker compose up                # 启动 docker-compose.yml 中的服务
docker compose up -d             # 后台启动服务
docker compose down              # 停止并删除容器、网络、卷（保留镜像）
docker compose down --rmi all    # 停止并删除容器、网络、卷、镜像
docker compose build             # 构建或重建服务镜像
docker compose stop [服务名]      # 停止指定服务
docker compose start [服务名]     # 启动已停止的服务
docker compose restart [服务名]   # 重启指定服务
docker compose ps                # 查看服务运行状态
docker compose logs              # 查看所有服务日志
docker compose logs -f           # 实时跟踪日志
docker compose logs [服务名]      # 查看指定服务日志
docker compose exec [服务名] bash # 进入指定服务容器交互终端
docker compose config            # 查看组合服务的最终配置
```

:::

## 🎋 Compose 小技巧

::: code-group

```sh [] {}
docker compose up --build                    # 启动服务前先构建镜像
docker compose up -d --remove-orphans        # 启动服务并删除孤立容器
docker compose down -v                       # 停止服务并删除关联卷
docker compose run --rm [服务名] bash         # 临时运行一个服务容器并进入 bash，运行完自动删除
docker compose pull                          # 拉取远程镜像
docker compose images                        # 查看 Compose 管理的服务镜像
docker compose stop && docker compose rm -v  # 停止并删除所有服务容器及卷
```

:::

## 🎋 compose 创建 mysql

::: code-group

```sh
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
