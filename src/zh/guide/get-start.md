# 开始使用

## 环境准备

Nova-admin是基于最新Vite版本开发，所以需要[Node.js](https://nodejs.org/en/) 20.x 版本来支持。
包管理器推荐使用 [pnpm](https://pnpm.io/) 8.x 版本

- [环境准备详细教程](/zh/dev/nodejs)

## 拉取仓库

::: code-group

```shell [GitHub]
git clone https://github.com/chansee97/nova-admin.git

```

```shell [Gitee]
git clone https://gitee.com/chansee97/nova-admin.git

```

:::

## 本地启动

### 安装依赖

```bash
pnpm i
```

### 启动本地开发

```bash
pnpm dev
```

### 构建产物

```bash
pnpm build
```

## 脚本命令解释

```json
  "scripts": {
    // 启动本地开发模式，mode标识为dev，端口号9980
    "dev": "vite --mode dev --port 9980",
    // 启动本地开发模式，mode标识为test（端口vite默认5173）
    "dev:test": "vite --mode test",
    // 启动本地开发模式，mode标识为prod（端口vite默认5173）
    "dev:prod": "vite --mode prod",
    // 进行类型检查 并使用vite构建，mode标识为prod
    "build": "vue-tsc --noEmit && vite build --mode prod",
    // 进行类型检查 并使用vite构建，mode标识为dev
    "build:dev": "vue-tsc --noEmit && vite build --mode dev",
    // 进行类型检查 并使用vite构建，mode标识为test
    "build:test": "vue-tsc --noEmit && vite build --mode test",
    // 预览打包后的产物，端口号9981
    "preview": "vite preview --port 9981",
    // 使用eslint检查代码
    "lint": "eslint .",
    // 使用eslint检查并自动修复代码
    "lint:fix": "eslint . --fix",
    // 可视化查看eslint规则配置
    "lint:check": "npx @eslint/config-inspector",
    // 使用vite-bundle-visualizer插件分析打包产物
    "sizecheck": "npx vite-bundle-visualizer"
  }
```

- 关于`@eslint/config-inspector`，可查看这篇[Blog](https://eslint.org/blog/2024/04/eslint-config-inspector/)
