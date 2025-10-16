---
tag:
  - Linux
tags:
  - Command

description: 整理 Linux 常用命令、配置方法，便于日常运维和开发参考。

date: 2025-08-05 10:42:36
sticky: 9994
---

# Linux 常用命令及配置

## 🎈 命令格式

::: code-group

```sh
# 终端命令格式
[command] [-options] [parameter]

# [command]: 命令名，相应功能的英文单词或单词的缩写
# [-options] ：选项，可用来对命令进行控制，也可以省略
# [parameter] ：传给命令的参数，可以是 零个、一个 或者 多个
```

:::

::: code-group

```sh
[command] -help # 显示 command 命令的帮助信息
[command] -man # 查阅 command 命令的使用手册
```

:::

## 🎈 常用命令

::: code-group

```sh
ls # 查看当前文件夹下的内容
ll # ls -la 简写
pwd # 查看当前所在文件夹
cd [目录] # 切换文件夹
touch [文件] # 如果文件不存在，新建文件
mkdir [目录] # 创建目录
rm [文件] # 删除文件
```

:::

::: code-group

```sh
# 查找文件
find [路径] -name “*.**”  # 查找指定路径下扩展名是 .py 的文件，包括子目录
# 省略路径，表示在当前文件夹下查找
```

:::

::: code-group

```sh
# 打包 ／ 解包 tar
# 打包文件
tar -cvf 打包文件.tar 被打包的文件／路径...
# 解包文件
tar -xvf 打包文件.tar

# x 解开档案文件
# v 列出归档解档的详细过程，显示进度
# f 指定档案文件名称，f 后面一定是 .tar 文件
```

:::

::: code-group

```sh
# 版本内核信息
uname -a
uname -r
cat /roc/version
```

:::

::: code-group

```sh
# 安装包
apt-get install lsb_release -y # -y 表示不用确认过程直接安装
apt-get install unzip -y
```

:::

::: code-group

```sh
# 建立文件的软链接
ln -s 被链接的源文件 链接文件
```

:::

## 🎈 SSH 密钥方式远程 linux

::: code-group

```sh
# 本地生成密钥
cd ~/.ssh
ssh-keygen

# linux 创建 .ssh 目录并写入公钥到authorized_keys
mkdir -p ~/.ssh
cd ~/.ssh/
echo "ssh-rsa ----" >> authorized_keys

# 本地配置保存到 ssh 目录中 config 上
Host [连接别名]
  Port 22
  Host 192.168.**.**
  User root
  IdentityFile ~/.ssh/id_rsa # 密钥路径
  IdentitiesOnly yes

# linux允许证书验证
vi /etc/ssh/sshd_config
PubkeyAuthentication yes # 解开注释 允许使用证书来验证
AuthorizedKeysFile .ssh/authorized_keys # 解开注释 默认读取 authorized_keys文件
# ctrl f / ctrl b 可以翻页

# 重启ssh 服务
systemctl restart ssh
```

:::

::: code-group

```sh
# 重新启动操作系统，其中 now 表示现在
$ shutdown -r now
# 立刻关机，其中 now 表示现在
$ shutdown now
# 系统在今天的 20:25 会关机
$ shutdown 20:25
# 系统再过十分钟后自动关机
$ shutdown +10
# 取消之前指定的关机计划
$ shutdown -c
```

:::

## 🎈 unbuntu 初始 root 密码

安装完成 `Ubuntu` 后，意识到在安装中并没有设置密码。自然也就无法进入到 `根用户下`。

> `Ubuntu` 默认 `root` 密码是随机的 每次开机都有一个新的 `root` 密码

::: code-group

```sh
sudo passwd # 以 root 身份来执行这条命令
# 修改root密码 键入密码后成功
```

:::
