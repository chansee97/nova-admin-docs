# Getting Started

## Environment Setup

Nova-admin is developed based on the latest version of Vite, so it requires [Node.js](https://nodejs.org/en/) version 18.x to support it. The recommended package manager is [pnpm](https://pnpm.io/) version 8.x.

- [Detailed Environment Setup Tutorial](/dev/nodejs)

## Clone Repository

::: code-group

```shell [GitHub]
git clone https://github.com/chansee97/nova-admin.git

```

```shell [Gitee]
git clone https://gitee.com/chansee97/nova-admin.git

```

:::

## Local Start

### Install Dependencies

```bash
pnpm i
```

### Start Local Development

```bash
pnpm dev
```

### Build Artifacts

```bash
pnpm build
```

## Explanation of Script Commands

```json
  "scripts": {
    // Start local development mode with mode as dev and port 9980
    "dev": "vite --mode dev --port 9980",
    // Start local development mode with mode as test (default port 5173)
    "dev:test": "vite --mode test",
    // Start local development mode with mode as prod (default port 5173)
    "dev:prod": "vite --mode prod",
    // Perform type checking and build with vite, mode as prod
    "build": "vue-tsc --noEmit && vite build --mode prod",
    // Perform type checking and build with vite, mode as dev
    "build:dev": "vue-tsc --noEmit && vite build --mode dev",
    // Perform type checking and build with vite, mode as test
    "build:test": "vue-tsc --noEmit && vite build --mode test",
    // Preview the built artifacts, port 9981
    "preview": "vite preview --port 9981",
    // Check code using eslint
    "lint": "eslint .",
    // Check and automatically fix code using eslint
    "lint:fix": "eslint . --fix",
    // Analyze the bundle artifacts using vite-bundle-visualizer plugin
    "sizecheck": "npx vite-bundle-visualizer"
  }
```
