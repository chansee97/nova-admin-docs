# 如何修改请求后台

## 修改后台地址

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

## 使用代理

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

## 使用多个服务

在一些情况下，可能需要使用多个后台服务地址，例如a,b,c接口请求后台地址A,而d,e,f接口请求后台地址B,此时你可以像这样配置

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

对于不同的服务后台，可能他们响应的字段也不一样，例如

```js
// service A success response
{
  code: 200,
  data: 'some data',
  message: 'success',
}

// service B success response
{
  status: 1,
  data: 'some data',
  msg:'success'
}
```

此时你可以传入第二个参数来解决这个问题

```ts
// src\service\http\index.ts
const { url_A, url_B } = generateProxyPattern(serviceConfig[import.meta.env.MODE])

export const requestA = createAlovaInstance({
  baseURL: isHttpProxy ? url_A.proxy : url_A.value,
})

export const requestB = createAlovaInstance({
  baseURL: isHttpProxy ? url_B.proxy : url_B.value,
}, {
  codeKey: 'status',
  dataKey: 'data',
  msgKey: 'msg',
  successCode: 1,
})
```

## 定义请求

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

::: details ResponseResult 类型声明

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
  message: string
  /** 返回的数据 */
  data: T
}

```

:::

其中`Service.ResponseResult`是请求响应数据的包裹，无需变动，需要改变其传入的泛型，如上例传入了`MyList`类型

```ts
const { data } = await fetchUserList({id: 1})
```

此时`data`的类型被正确推导为`MyList`

## 请求使用方法

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

Post方法默认为`json`格式，如果需要使用`form`格式，你可以这样定义，配置`meta`标识`isFormPost`，在发送请求的过程中会自动修改格式

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

一些时候，后台返回的数据可能需要进行转换，此时你可以像这样定义，在下面的例子中`gender`和`status`返回后会被自动改写

```ts
export function dictData() {
  return request.Get('/getDictData', {
    transformData(rawData, _headers) {
      const response = rawData as any
      return {
        ...response,
        data: {
          ...response.data,
          gender: response.data.gender === 0 ? '男' : '女',
          status: `状态是${response.data.status}`,
        },
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

一个简单的调用并保存的示例

```ts
function getBlobFile() {
  getBlob(filePath.value).then((res) => {
    downloadLink(res, 'BlobOk')
  })
}
function downloadLink(data: Blob, name: string) {
  const link = URL.createObjectURL(data)
  const eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.style.display = 'none'
  eleLink.href = link
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
// 调用
getBlobFile()
```

### 进度下载

有时后台返回的大文件需要下载进度，则这样定义

```ts
export function downloadFile(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url, {
    // 开启下载进度
    enableDownload: true,
  })
  methodInstance.meta = {
    // 标识为bolb数据
    isBlob: true,
  }
  return methodInstance
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
// 使用computed自动计算进度
const downloadProcess = computed(() => {
  if (!downloading.value.loaded)
    return 0
  return Math.floor(downloading.value.loaded / downloading.value.total * 100)
})
// 对请求结果保存成文件
async function handleDownloadFile() {
  const res = await sendDownloadFile()
  downloadLink(res, 'fileOk')
}
```

::: tip 更多使用方法

本项目的请求方法基于Alova进行封装，更多使用方法请参考[Alova](https://alova.js.org/zh/docs/getting-started)

:::

## 请求器配置

在`src\service\http\config.ts`中，你可以修改请求器的判断配置。修改这些配置会影响请求器实例的内部判断流程

### DEFAULT_ALOVA_OPTIONS

修改该字段让请求器增加默认配置，字段详见[alova.options](https://alova.js.org/zh-CN/api/alova#alovaoptions)

### DEFAULT_BACKEND_OPTIONS

修改该字段来更改请求的默认判断字段。

::: details BackendConfig类型声明

```ts
interface BackendConfig {
  codeKey?: string
  dataKey?: string
  msgKey?: string
  successCode?: number | string
}
```

:::

- `codeKey`: 业务码字段标识，默认为`code`
- `dataKey`: 数据携带字段标识，默认为`data`
- `msgKey`: 消息标识，默认为`message`
- `successCode`: 成功标识码，默认为`200`

例如,在你对接的后台返回数据中，消息标识为`_message`，那么你应当修改`msgKey`来保持请求器内部自动处理的正确，
`codeKey`，`dataKey`同理，项目中的数据自动处理依赖这些字段配置

### ERROR_STATUS

请求如果遇到服务器错误的情况，会自动根据状态码进行判断，如果状态码在`ERROR_STATUS`中，则判定为请求失败，如果不在，则提示默认错误

::: details ERROR_STATUS

```ts
export const ERROR_STATUS = {
  default: '请求错误~',
  400: '400: 请求出现语法错误~',
  401: '401: 用户未授权~',
  403: '403: 服务器拒绝访问~',
  404: '404: 请求的资源不存在~',
  405: '405: 请求方法未允许~',
  408: '408: 网络请求超时~',
  500: '500: 服务器内部错误~',
  501: '501: 服务器未实现请求功能~',
  502: '502: 错误网关~',
  503: '503: 服务不可用~',
  504: '504: 网关超时~',
  505: '505: http版本不支持该请求~',
}
```

:::

### ERROR_NO_TIP_STATUS

请求发出后，服务器返回了一个错误码，但是你不想让用户看到错误提示，你可以将该错误码添加到该数组中，例如默认情况下`10000`不会出现错误提示弹出

```ts
export const ERROR_NO_TIP_STATUS = [10000]
```
