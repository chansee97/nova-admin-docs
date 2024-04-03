# NodeJs

Node. js目前前端工程化开发必备的环境

::: tip
不推荐原生安装，存在版本管理问题。推荐使用nvm、volta等包管理器来安装node
:::

## 原生Node安装

[Node官方下载](https://nodejs.org/)

检验安装是否成功

```shell
node -v
```

设置npm镜像源, 加速下载,此处使用淘宝镜像

```shell
npm config set registry https://registry.npmmirror.com
```

## 包管理器

npm是node. js的包管理器，也是node. js的默认包管理器，但是npm下载包的速度慢，占用空间大，存在一定的问题，所以推荐使用[pnpm](https://pnpm.io/)等包管理器

```shell
npm install -g pnpm
```

常用命令

```shell
# 安装生产依赖
pnpm add package-name
# 安装开发依赖
pnpm add -D package-name
# 安装指定版本
pnpm add package-name@version
# 安装项目所有依赖 别名: i
pnpm install
# 删除依赖 别名: rm, uninstall, un
pnpm remove package-name
# 更新依赖 别名： up, upgrade
pnpm update package-name
# 更新所有依赖
pnpm update
# 移除不需要的packages。
pnpm prune
# 运行一个在 package 定义的脚本，run可以省略
pnpm run
```

## VOLTA

[VOLTA](https://volta.sh/)同样也是node. js的版本管理器，但是它可以支持不同项目使用不同环境，切换项目自动切换node版本。我更加推荐使用volta来管理node版本

- [volta安装](https://docs.volta.sh/guide/getting-started)

### VOLTA常用命令

```shell
# 安装 LTS 版本
volta install node
# 要安装的工具，如'node@20'、'yarn@latest'或'you-pack@^14.4.3'。
volta install <tool[@version]>
# 固定项目的运行时或包管理器,如'node@lts'或'yarn@^1.14'。
volta pin <tool[@version]>
# 卸载指定工具
volta uninstall <tool>
# 列出所有已安装的工具
volta list
# 帮助
volta help
```

## NVM

[NVM](https://github.com/nvm-sh/nvm)是node. js的版本管理器

- [Mac安装](https://github.com/nvm-sh/nvm#installing-and-updating)
- [windows安装](https://github.com/coreybutler/nvm-windows/releases)

### NVM源配置

在你安装的目录下找到settings.txt文件，打开后加上，不加上无法安装低版本node

```text
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

也可以使用nvm命令行来设置

```shell
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

### NVM常用命令

```shell
nvm list 查看已经安装的版本
nvm list installed 查看已经安装的版本
nvm list available 查看网络可以安装的版本
nvm version 查看当前的版本
nvm install 安装最新版本nvm
nvm use <version> ## 切换使用指定的版本node
nvm ls 列出所有版本
nvm current显示当前版本
nvm alias <name> <version> ## 给不同的版本号添加别名
nvm unalias <name> ## 删除已定义的别名
nvm reinstall-packages <version> ## 在当前版本node环境下，重新全局安装指定版本号的npm包
nvm on 打开nodejs控制
nvm off 关闭nodejs控制
nvm proxy 查看设置与代理
nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.
nvm uninstall <version> 卸载制定的版本
nvm use [version] [arch] 切换制定的node版本和位数
nvm root [path] 设置和查看root路径
```

### 切换版本示例

```shell
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```
