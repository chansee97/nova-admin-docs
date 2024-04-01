# 如何修改请求后台

## 修改请求后台地址

项目中默认提供了三种请求环境，如果需要修改，可以修改`src\typings\env.d.ts`文件，增加`ServiceEnvType`类型

::: code-group

```ts [src\typings\env.d.ts]
type ServiceEnvType = 'dev' | 'test' | 'prod'
```

:::

在`service.config.ts`文件中配置不同的后台地址。如下例子，`dev`为开发环境，`test`为测试环境，`prod`为生产环境，为每个环境下配置了不同的后台地址

::: code-group

```ts [service.config.ts]
export const serviceConfig: Record<ServiceEnvType, Record<string, string>> = {
  dev: {
    url: 'dev_url',
  },
  test: {
    url: 'test_url',
  },
  prod: {
    url: 'prod_url',
  },
}
```

:::

## 使用代理访问

在一些情况下，可能无法去访问到后台地址，这时候可以使用代理来访问后台。在本项目中你可以很容易切换到代理环境

::: code-group

```shell [.env.dev]
# 是否开启服务接口代理 Y | N
VITE_HTTP_PROXY=Y
```

:::

如下配置, 开启代理后，会自动将请求地址修改为代理地址

::: code-group

```ts [src\service\http\index.ts]
import { createAlovaInstance } from './alova'
import { serviceConfig } from '@/../service.config'
import { generateProxyPattern } from '@/../build/proxy'

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y' || false

const { url } = generateProxyPattern(serviceConfig[import.meta.env.MODE])

export const request = createAlovaInstance({
  baseURL: isHttpProxy ? url.proxy : url.value,
})
```

:::

此处解构出的`url`和必须和上方`service.config.ts`中的字段保持一致，例如

::: code-group

```ts [service.config.ts]
dev: {
  otherUrl: 'dev_url',
}
```

```ts [src\service\http\index.ts]
const { otherUrl } = generateProxyPattern(serviceConfig[import.meta.env.MODE])

```

:::

## 使用多个后台服务地址

在一些情况下，可能需要使用多个后台服务地址，例如a,b,c接口请求后台A,而d,e,f接口请求后台B,此时你可以像这样配置

::: code-group

```ts [service.config.ts]
dev: {
  url_A: 'dev_url_A',
  url_B: 'dev_url_B',
}
```

```ts [src\service\http\index.ts]
const { url_A, url_B } = generateProxyPattern(serviceConfig[import.meta.env.MODE])

export const requestA = createAlovaInstance({
  baseURL: isHttpProxy ? url_A.proxy : url_A.value,
})

export const requestB = createAlovaInstance({
  baseURL: isHttpProxy ? url_B.proxy : url_B.value,
})
```

:::

## 定义请求方法

在项目中，一般需要在`src\service\api`中新建一个文件定义你的请求方法，然后导出，如下示例

::: code-group

```ts [src/service/api/list.ts]
import { request } from '../http'

export function fetchUserList() {
  return request.Get('/userList')
}

```

```ts [src\service\index.ts]
export * from './api/list'
```

:::

然后在页面或其他地方引入使用

```ts
import { fetchUserList } from '@/service'

const listData = ref()
async function getUserList() {
  await fetchUserList().then((res: any) => {
    listData.value = res.data.list
  })
}
getUserList()
```

上面是最简单的请求方法使用示例，但是这样做响应数据`res`的类型为`any`，如果需要正确获取响应数据的类型，你可以像这样定义，来规定传入参数和返回参数的类型

```ts
interface MyList{
  // ...
}
export function fetchUserList(params: { id: number }) {
  return request.Get<Service.ResponseResult<MyList> >('/userList', { params })
}

```

```ts
// Service.ResponseResult
interface ResponseResult<T> extends RequestError {
  /** 请求服务是否成功 */
  isSuccess: boolean
  /** 请求服务的错误类型 */
  errorType: RequestErrorType
  /** 错误码 */
  code: RequestCode
  /** 错误信息 */
  msg: string
  /** 返回的数据 */
  data: T
}

```

其中`Service.ResponseResult`是请求响应数据的包裹，无需变动，需要改变其传入的泛型，如上例传入了`MyList`类型

```ts
const { data } = await fetchUserList({id: 1})
```

此时`data`的类型被正确推导为`MyList`

## 不同的请求使用方法

这里有一些定义不同的使用请求方法的例子，覆盖了大多数情况，你可以根据你的需求来选择使用

### Get

```ts
export function fetachGet(params?: any) {
  return request.Get('/getAPI', { params })
}
```

### Post(json)

```ts
export function fetchPost(data: any) {
  return request.Post('/postAPI', data)
}

```

### Post(form)

```ts
export function fetchFormPost(data: any) {
  const methodInstance = request.Post('/postFormAPI', data)
  methodInstance.meta = {
    isFormPost: true,
  }
  return methodInstance
}

```

### Delete

```ts
export function fetchDelete() {
  return request.Delete('/deleteAPI')
}

```

### Put

```ts
export function fetchPut(data: any) {
  return request.Put('/putAPI', data)
}

```

### 不需要携带token的接口

默认情况下，所有请求都会携带`token`，如果某些接口不需要携带`token`，你可以像这样定义

```ts
export function withoutToken() {
  const methodInstance = request.Get('/getAPI')
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}

```

### 接口数据转换

一些时候，后台返回的数据可能需要进行转换，此时你可以像这样定义

```ts
export function dictData() {
  return request.Get('/getDictData', {

    // 在这里定义转换函数
    transformData(rawData, _headers) {
      const { data } = rawData as any
      return {
        gender: data.gender === 0 ? '男' : '女',
        status: `状态是${data.status}`,
      }
    },
  })
}

```

### 获取二进制文件

一些时候，后台返回的数据是文件流，需要直接下载，此时你可以像这样定义。标识为`isBlob`后关于这个接口的请求会自动进行相关处理

```ts
export function getBlob(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url)
  methodInstance.meta = {
    // 标识为bolb数据
    isBlob: true,
  }
  return methodInstance
}

```

### 进度下载

有时后台返回的大文件需要下载进度，则这样定义

```ts
export function downloadFile(url: string) {
  return blankInstance.Get(url, {
    // 开启下载进度
    enableDownload: true,
  })
}

```

需要使用`useRequest`来进行包裹，获取下载进度对象

```ts
import { useRequest } from 'alova'

// downloading - 下载进度对象
// abort - 取消下载
// send - 重新发送下载请求
const { downloading, abort: abortDownloadFile, send: sendDownloadFile } = useRequest(downloadFile(downloadPath.value), {
  // 当immediate为false时，默认不发出
  immediate: false,
})
```

::: tip 更多使用方法

本项目的请求方法基于Alova进行封装，更多使用方法请参考[Alova](https://alova.js.org/zh/docs/getting-started)

:::
