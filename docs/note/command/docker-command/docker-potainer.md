---
tag:
  - 笔记
tags:
  - 常用命令
categories:
  - Docker

description: Docker 使用 Potainer 可视化管理面板
---

# Docker 使用 Potainer

## 🌰 使用 Potainer

Docker 可视化管理面板 ：[Potainer](https://docs.portainer.io/start/install-ce/server/docker/linux)

创建 Portainer Server 用于存储其数据库的卷：

::: code-group

```bash
docker volume create portainer_data
```

:::

拉取 Portainer ：

::: code-group

```bash
docker pull portainer/portainer-ce:lts
```

:::

启动 Portainer:

::: code-group

```bash
docker run -d --name portainer -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /app/portainer_data:/data --restart always --privileged=true portainer/portainer-ce:latest
```

:::

更新 Portainer：
::: code-group

```bash
docker pull portainer/portainer-ce:lts
```

:::

## 🌰 Potainer 重置密码

先停止 portainer 服务 : `docker stop [portainerID]`

查看 portainer 挂载信息 : `docker inspect [portainerID]`

找到 `portainer_data` 的挂载路径执行:

![20250829113900](http://images.qiuyouyou.cn/notes/20250829113900.png)

```bash
docker run --rm -v /var/lib/docker/volumes/portainer_data/_data:/data portainer/helper-reset -password
```

再启动 portainer 服务 : `docker start [portainerID]` 用生成的密码进行访问后记得修改密码：

![20250829114441](http://images.qiuyouyou.cn/notes/20250829114441.png)
