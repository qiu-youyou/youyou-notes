---
tag:
  - Docker

description: 介绍 Docker 容器中的数据管理与持久化机制，包括数据卷、绑定挂载和临时文件系统挂载的原理、使用方法及适用场景。示例实现数据的持久化、共享、备份与恢复。

date: 2025-09-23 21:37:06
sticky: 9995
---

# Docker - 数据管理与持久化

在容器化应用的开发与部署中，数据的管理与持久化是一个必须重点考虑的问题。
容器本质上是短暂和无状态的：当容器被删除后，其内部文件系统中的数据也会随之消失。

但在实际应用中，数据库存储、日志文件、用户上传的数据等都需要长期保存。
为了解决这个问题，`Docker` 提供了多种数据管理与持久化机制。

## 🌝 为什么需要持久化

- 容器的临时性：容器被停止或删除后，容器内部的更改都会丢失。
- 状态保存：大多数应用并不是完全无状态的，比如 `MySQL数据库`、`Redis缓存`、`应用日志`，都需要持久保存。
- 共享数据：多个容器可能需要访问相同的数据（如 `Web` 服务与数据库容器共享日志文件）。

> 因此，数据持久化和共享能力是构建生产级 `Docker` 应用的基石。

## 🌝 数据管理方式

### 数据卷

数据卷 `(Volume)` 是 `Docker` 提供的一种用于 持久化数据 的机制。

它由 `Docker` 引擎管理，独立于容器的生命周期，存放在宿主机的专用目录（通常是 `/var/lib/docker/volumes/`）。

> 即使容器删除，卷中的数据依然存在，可以被其他容器复用。

#### 数据卷的特点

- 独立性：生命周期独立于容器。
- 共享性：可在多个容器间共享和重用。
- 可移植性：可备份、恢复、迁移到其他主机。
- 性能优化：比绑定挂载更高效，适合生产环境大规模数据存储。

#### 管理数据卷

::: code-group

```bash [] {}
# 创建 my_volume 的数据卷
docker volume create my_volume

# 列出所有数据卷
docker volume ls

# 查看指定数据卷的详细信息
docker volume inspect my_volume

# 删除一个数据卷
docker volume rm my_volume
```

:::

#### 挂载数据卷到容器

在启动容器时，可以使用 `-v` 或 `--mount` 选项将数据卷挂载到容器内。

::: code-group

```bash [] {}
# 创建一个 MySQL 容器，并将数据目录挂载到数据卷
docker volume create mysql_data

docker run -d --name mysql_server \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0

# 查看数据卷挂载情况
docker volume inspect mysql_data

```

:::

> 即使 `mysql_server` 容器删除，`mysql_data` 卷里的数据库文件依然存在，可复用。

### 绑定挂载

绑定挂载 `(Bind Mount)` 是将宿主机上的 文件或目录 挂载到容器中。
与数据卷不同，它直接使用宿主机文件系统，不经过 `Docker` 的管理。

#### 绑定挂载的特点

- 直接性：容器访问宿主机的真实路径。
- 灵活性：适合开发场景，代码可即时同步。
- 依赖性：可能依赖于宿主机的文件系统实现。

#### 使用绑定挂载共享主机数据

在启动容器时，可以使用 `-v` 或 `--mount` 选项将数据卷挂载到容器内。

::: code-group

```bash [] {}
# 使用宿主机上的 Nginx 配置文件和日志目录
mkdir -p ~/nginx/conf ~/nginx/logs
echo "<h1>Hello Docker</h1>" > ~/nginx/index.html

docker run -d --name nginx_server \
  -p 8080:80 \
  -v ~/nginx/index.html:/usr/share/nginx/html/index.html \
  -v ~/nginx/conf:/etc/nginx/conf.d \
  -v ~/nginx/logs:/var/log/nginx \
  nginx:latest

```

:::

> 在宿主机编辑 `~/nginx/index.html`，可以立即在容器中生效，方便开发调试。

#### 数据卷 🆚 绑定挂载

| 特性                              | 数据卷 (Volume)                         | 绑定挂载 (Bind Mount)                             |
| --------------------------------- | --------------------------------------- | ------------------------------------------------- |
| 管理方式 &emsp;&emsp;&emsp;&emsp; | 由 Docker 管理 &emsp;&emsp;&emsp;&emsp; | 由宿主机文件系统直接管理 &emsp;&emsp;&emsp;&emsp; |
| 生命周期                          | 独立于容器生命周期                      | 依赖宿主机目录/文件                               |
| 数据共享                          | 容器之间可共享                          | 容器直接访问宿主机文件                            |
| 性能                              | Docker 优化过，性能较优                 | 取决于宿主机文件系统                              |
| 使用场景                          | 生产环境持久化、共享数据                | 开发环境、挂载配置文件                            |

### 临时文件系统挂载

`tmpfs` 挂载是一种基于 `内存` 的存储方式。数据不会写入磁盘，容器停止后数据自动清除。

适用于存放临时文件、缓存数据。存储敏感信息，避免落盘。

#### 临时文件系统挂载的特点

- 高性能：内存读写速度远高于磁盘。
- 非持久化：容器停止后数据丢失。
- 安全性：敏感数据不会落盘。

#### 使用示例

::: code-group

```bash [] {}
 docker run -d --name redis_tmpfs \
  --tmpfs /data:rw,size=64m \
  redis:7.0 --save "" --appendonly no
```

:::

> `Redis` 的 `/data` 目录完全驻留在内存中，重启或删除容器后，数据会消失。

## 🌝 数据备份与恢复

无论使用哪种持久化机制，数据备份 都是保证可靠性的重要手段。
常见需求包括：防止宿主机损坏、误删卷数据、跨主机迁移。

### 备份数据卷

备份数据卷是确保数据安全和可恢复性的关键步骤。

可以使用 `docker run` 命令将数据卷内容导出到主机文件系统。

::: code-group

```bash [] {}
# 1. 确认已有数据卷
docker ps

# 假设 MySQL 容器使用了 mysql_data 卷
# 2. 备份数据卷内容到宿主机
docker run --rm \
  -v mysql_data:/var/lib/mysql \
  -v $(pwd):/backup \
  alpine \
  tar czf /backup/mysql_backup.tar.gz -C /var/lib/mysql .

```

:::

> 这样会在当前目录生成 `mysql_backup.tar.gz` 文件。

### 恢复数据卷

恢复数据卷与备份过程类似，我们需要将备份文件解压并导入到数据卷。

::: code-group

```bash [] {}
# 创建新的数据卷
docker volume create mysql_restore

# 将备份数据解压到新数据卷
docker run --rm \
  -v mysql_restore:/var/lib/mysql \
  -v $(pwd):/backup \
  alpine \
  tar xzf /backup/mysql_backup.tar.gz -C /var/lib/mysql

# 使用新数据卷启动 MySQL
docker run -d --name mysql_restore_server \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -v mysql_restore:/var/lib/mysql \
  mysql:8.0

```

:::

### 迁移数据卷

数据卷的迁移涉及将数据从一个 `Docker` 主机迁移到另一个主机。

可以使用 `docker volume` 命令和 `tar` 工具来实现这一过程。

::: code-group

```bash [] {}
# 在源主机导出数据卷
docker run --rm -v mysql_data:/var/lib/mysql alpine \
  tar czf - -C /var/lib/mysql . > mysql_data.tar.gz

# 将文件传输到目标主机
scp mysql_data.tar.gz user@remote:/path/

# 在目标主机导入到新数据卷
docker volume create mysql_data
docker run --rm -v mysql_data:/var/lib/mysql -v /path:/backup alpine \
  tar xzf /backup/mysql_data.tar.gz -C /var/lib/mysql

```

:::

## 🌝 数据管理总结

- 生产环境推荐使用数据卷 `(Volume)`：由 `Docker` 管理，性能更优，独立于容器生命周期。
- 开发环境可使用绑定挂载 `(Bind Mount)`：方便调试和实时更新代码。
- `tmpfs` 挂载适用于临时和敏感数据：高速、安全，但非持久化。
- 数据备份与恢复 是保证可靠性的最后一道防线，应纳入日常运维流程。
