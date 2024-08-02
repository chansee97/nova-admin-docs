# 环境变量

## 通用变量

通用变量是所有环境都应该保持一致的变量，例如项目名称、项目根目录等。在`.env`文件中定义这些变量，以便在整个项目中使用。

### VITE_BASE_URL

- **类型：** `string`
- **默认：** `/`

如果你的项目是需要某个子路径下运行的，那么你可以使用`VITE_BASE_URL`变量来设置子路径。例如，如果你的项目运行在`https://example.com/my-app`，你可以设置`VITE_BASE_URL`为`/my-app`。项目中相关配置会自动修改

### VITE_APP_NAME

- **类型：** `string`
- **默认：** `Nova - Admin`

如果你的项目需要设置一个名称，例如`Nova-admin`，你可以设置该变量的值为你的项目名称。

### VITE_AUTH_ROUTE_MODE

- **类型：** `dynamic | static`
- **默认：** `dynamic`

项目中提供两种路由模式：`dynamic`和`static`。如果你不需要配合后端实现动态路由，你可以设置`VITE_AUTH_ROUTE_MODE`为`static`。

### VITE_HOME_PATH

- **类型：** `string`
- **默认：** `/dashboard/workbench`

设置登陆后跳转地址,这里应当配置你登录完成后立即跳转的地址，404返回首页的情况下也是优先使用该路径

### VITE_STORAGE_PREFIX

- **类型：** `string`
- **默认：** `null`

设置全局存储的前缀，例如`VITE_STORAGE_PREFIX=nova_`，那么使用`src\utils\storage.ts`在`localStorage`和`sessionStorage`中的数据都会加上`nova_`前缀，例如`nova_token`。

### VITE_COPYRIGHT_INFO

- **类型：** `string`
- **默认：** `Copyright © 2024 chansee97`

页面底部版权信息

### VITE_AUTO_REFRESH_TOKEN

- **类型：** `Y | N`
- **默认：** `Y`

是否使用自动刷新token，关闭后token过期将直接返回登录页面

## 开发环境

开发环境变量是只有在开发中才会切换的变量，例如是否开启代理等。在`.env.dev`文件中定义这些变量。

### VITE_HTTP_PROXY

- **类型：** `Y | N`
- **默认：** `N`

如果你的项目需要使用代理来访问后端接口，你可以设置`VITE_HTTP_PROXY`为`Y`来开启代理。

## 生产环境

生产环境变量是只有在生产或构建产物时才需要的变量，例如是否开启gzip压缩等。在`.env.prod`文件中定义这些变量。

### VITE_BUILD_COMPRESS

- **类型：** `Y | N`
- **默认：** `N`

如果你的项目需要开启产物压缩，你可以设置`VITE_BUILD_COMPRESS`和`VITE_COMPRESS_TYPE`来开启压缩

### VITE_COMPRESS_TYPE

- **类型：** `gzip | brotliCompress | deflate | deflateRaw`
- **默认：** `gzip`

设置压缩算法
