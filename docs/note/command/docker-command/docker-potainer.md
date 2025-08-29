---
tag:
  - 笔记
tags:
  - 常用命令
categories:
  - Docker
---

# Docker 使用 Potainer

## 🌰 使用 Potainer

Docker 工具：[Potainer](https://docs.portainer.io/start/install-ce/server/docker/linux)

首先，创建 Portainer Server 用于存储其数据库的卷：

::: code-group

```sh
docker volume create portainer_data
```

:::

然后，下载并安装 Portainer Server 容器：

::: code-group

```sh
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

:::

更新 Portainer：

```sh
docker pull portainer/portainer-ce:lts
```

## 🌰 Potainer 重置密码

先停止 portainer 服务 : `docker stop [portainerID]`

查看 portainer 挂载信息 : `docker inspect [portainerID]`

找到 `portainer_data` 的挂载路径执行:

![20250829113900](http://images.qiuyouyou.cn/notes/20250829113900.png)

```sh
docker run --rm -v /var/lib/docker/volumes/portainer_data/_data:/data portainer/helper-reset -password
```

再启动 portainer 服务 : `docker start [portainerID]` 用生成的密码进行访问后记得修改密码：

![20250829114441](http://images.qiuyouyou.cn/notes/20250829114441.png)
