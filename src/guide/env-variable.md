# Environment Variables

## Common Variables

Common variables are variables that should be consistent across all environments, such as project name, project root directory, etc. Define these variables in the `.env` file for use throughout the entire project.

### VITE_BASE_URL

- **Type:** `string`
- **Default:** `/`

If your project needs to run under a sub-path, you can use the `VITE_BASE_URL` variable to set the sub-path. For example, if your project runs at `https://example.com/my-app`, you can set `VITE_BASE_URL` to `/my-app`. Relevant configurations in the project will be automatically adjusted.

### VITE_APP_NAME

- **Type:** `string`
- **Default:** `Nova - Admin`

If your project requires a specific name, such as `Nova-admin`, you can set the value of this variable to your project name.

### VITE_AUTH_ROUTE_MODE

- **Type:** `dynamic | static`
- **Default:** `dynamic`

The project provides two routing modes: `dynamic` and `static`. If you do not need to implement dynamic routing with the backend, you can set `VITE_AUTH_ROUTE_MODE` to `static`.

### VITE_HOME_PATH

- **Type:** `string`
- **Default:** `/dashboard/workbench`

Set the path to redirect to after login. This should be the path where you want to redirect immediately after logging in, and it will also be used as the priority path when returning to the homepage in a 404 scenario.

### VITE_STORAGE_PREFIX

- **Type:** `string`
- **Default:** `null`

Set the prefix for global storage. For example, if `VITE_STORAGE_PREFIX=nova_`, then using `src\utils\storage.ts`, the data in `localStorage` and `sessionStorage` will have the `nova_` prefix added, for example, `nova_token`.

### VITE_COPYRIGHT_INFO

- **Type:** `string`
- **Default:** `Copyright © 2024 chansee97`

Footer copyright information.

## Development Environment

Development environment variables are variables that are only toggled during development, such as whether to enable proxy, etc. Define these variables in the `.env.dev` file.

### VITE_HTTP_PROXY

- **Type:** `Y | N`
- **Default:** `N`

If your project needs to use a proxy to access backend APIs, you can set `VITE_HTTP_PROXY` to `Y` to enable the proxy.

## Production Environment

Production environment variables are variables that are only needed during production or building, such as whether to enable gzip compression, etc. Define these variables in the `.env.prod` file.

### VITE_BUILD_COMPRESS

- **Type:** `Y | N`
- **Default:** `N`

If your project needs to enable artifact compression, you can set `VITE_BUILD_COMPRESS` and `VITE_COMPRESS_TYPE` to enable compression.

### VITE_COMPRESS_TYPE

- **Type:** `gzip | brotliCompress | deflate | deflateRaw`
- **Default:** `gzip`

Set the compression algorithm.
