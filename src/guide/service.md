# How to Modify Backend Requests

## Modify Backend Address

The project provides three default request environments. If you need to modify them, you can modify the `src\typings\env.d.ts` file and add the `ServiceEnvType` type.

::: code-group

```ts [src\typings\env.d.ts]
type ServiceEnvType = 'dev' | 'test' | 'prod'
```

:::

Configure different backend addresses in the `service.config.ts` file. In the following example, `dev` is the development environment, `test` is the testing environment, and `prod` is the production environment, with different backend addresses configured for each environment.

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

## Use Proxy

In some cases, you may need to use multiple backend service addresses. For example, interfaces a, b, and c request backend address A, while interfaces d, e, and f request backend address B. In this case, you can configure it like this:

::: code-group

```shell [.env.dev]
# Enable service interface proxy Y | N
VITE_HTTP_PROXY=Y
```

:::

With the following configuration, enabling the proxy will automatically modify the request address to the proxy address.

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

The deconstructed `url` must match the fields in `service.config.ts` as shown above, for example:

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

## Using Multiple Service

In some cases, you may need to use multiple backend service addresses. For example, interfaces a, b, c request backend A, while interfaces d, e, f request backend B. In this case, you can configure it like this:

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

For different backend services, their response fields may also be different, for example:

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

In this case, you can pass the second parameter to solve this problem:

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

## Define Request

In the project, you generally need to create a file in `src\service\api` to define your request methods and then export them, as shown in the example below:

::: code-group

```ts [src/service/api/list.ts]
import { request } from '../http'

export function fetchUserList() {
  return request.Get('/userList')
}

```

```ts [src/service/index.ts]
export * from './api/list'
```

:::

Then you can import and use them on pages or elsewhere:

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

The above is the simplest example of using request methods, but in this case, the response data type `res` is `any`. If you need to correctly get the response data type, you can define it like this to specify the types of input parameters and return parameters:

```ts
interface MyList{
  // ...
}
export function fetchUserList(params: { id: number }) {
  return request.Get<Service.ResponseResult<MyList> >('/userList', { params })
}

```

::: details Declaration of ResponseResult Type

```ts
// Service.ResponseResult
interface ResponseResult<T> extends RequestError {
  /** Whether the service request is successful */
  isSuccess: boolean
  /** Error type of the service request */
  errorType: RequestErrorType
  /** Error code */
  code: RequestCode
  /** Error message */
  message: string
  /** Returned data */
  data: T
}

```

:::

Here, `Service.ResponseResult` is a wrapper for the request response data, and no changes are needed. You only need to change the generic type it takes, as shown in the example above where `MyList` type is passed in.

```ts
const { data } = await fetchUserList({id: 1})
```

Now, the type of `data` is correctly inferred as `MyList`.

## Request Usage Methods

Here are some examples of defining different request methods that cover most cases. You can choose to use them according to your needs.

### Get

```ts
export function fetachGet(params?: any) {
  return request.Get('/getAPI', { params })
}
```

### Post (json)

```ts
export function fetchPost(data: any) {
  return request.Post('/postAPI', data)
}

```

### Post (form)

By default, the Post method is in `json` format. If you need to use `form` format, you can define it like this by setting the `meta` to indicate `isFormPost`. This will automatically modify the format during the request.

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

### APIs without Token

By default, all requests carry a `token`. If some APIs do not require a `token`, you can define them like this:

```ts
export function withoutToken() {
  const methodInstance = request.Get('/getAPI')
  methodInstance.meta = {
    authRole: null,
  }
  return methodInstance
}

```

### API Data Transformation

Sometimes, the data returned by the backend may need to be transformed. You can define it like this, where `gender` and `status` will be automatically modified after being returned:

```ts
export function dictData() {
  return request.Get('/getDictData', {
    transformData(rawData, _headers) {
      const response = rawData as any
      return {
        ...response,
        data: {
          ...response.data,
          gender: response.data.gender === 0 ? 'Male' : 'Female',
          status: `Status is ${response.data.status}`,
        },
      }
    },
  })
}

```

### Fetching Binary Files

Sometimes, the data returned by the backend is a file stream that needs to be downloaded directly. You can define it like this. By setting `isBlob`, the request for this API will be automatically processed accordingly.

```ts
export function getBlob(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url)
  methodInstance.meta = {
    // Mark as blob data
    isBlob: true,
  }
  return methodInstance
}

```

A simple example of calling and saving the file:

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
// Call
getBlobFile()
```

### Download Progress

Sometimes, large files returned by the backend need to be downloaded with progress. In this case, you can define it like this:

```ts
export function downloadFile(url: string) {
  const methodInstance = blankInstance.Get<Blob>(url, {
    // Enable download progress
    enableDownload: true,
  })
  methodInstance.meta = {
    // Mark as blob data
    isBlob: true,
  }
  return methodInstance
}

```

You need to use `useRequest` to wrap it and get the download progress object:

```ts
import { useRequest } from 'alova'

// downloading - download progress object
// abort - cancel download
// send - resend download request
const { downloading, abort: abortDownloadFile, send: sendDownloadFile } = useRequest(downloadFile(downloadPath.value), {
  // When immediate is false, it will not be sent by default
  immediate: false,
})
// Use computed to automatically calculate the progress
const downloadProcess = computed(() => {
  if (!downloading.value.loaded)
    return 0
  return Math.floor(downloading.value.loaded / downloading.value.total * 100)
})
// Save the request result as a file
async function handleDownloadFile() {
  const res = await sendDownloadFile()
  downloadLink(res, 'fileOk')
}
```

::: tip More Usage Methods

The request methods in this project are encapsulated based on Alova. For more usage methods, please refer to [Alova](https://alova.js.org/en/docs/getting-started)

:::

## Requestor Configuration

In `src\service\http\config.ts`, you can modify the judgment configuration of the requestor. Changing these configurations will affect the internal judgment process of the requestor instance.

### DEFAULT_ALOVA_OPTIONS

Modify this field to add default configurations to the requestor. For detailed field information, please refer to [alova.options](https://alova.js.org/en/api/alova#alovaoptions).

### DEFAULT_BACKEND_OPTIONS

Modify this field to change the default judgment fields for requests.

::: details Declaration of BackendConfig Type

```ts
interface BackendConfig {
  codeKey?: string
  dataKey?: string
  msgKey?: string
  successCode?: number | string
}
```

:::

- `codeKey`: Field identifier for business code, default is `code`
- `dataKey`: Field identifier for data payload, default is `data`
- `msgKey`: Message identifier, default is `message`
- `successCode`: Success status code, default is `200`

For example, if the message identifier in the data returned from your backend is `_message`, then you should modify the `msgKey` to ensure the correct handling within the requestor. Similarly, `codeKey` and `dataKey` should be adjusted accordingly. The automatic processing of data in the project relies on these field configurations.

### ERROR_STATUS

If a request encounters a server error, it will automatically judge based on the status code. If the status code is in `ERROR_STATUS`, it is considered a request failure. If it is not, a default error message will be displayed.

::: details ERROR_STATUS

```ts
export const ERROR_STATUS = {
  default: 'Request error~',
  400: '400: Syntax error in the request~',
  401: '401: User unauthorized~',
  403: '403: Server refused access~',
  404: '404: Requested resource not found~',
  405: '405: Request method not allowed~',
  408: '408: Network request timed out~',
  500: '500: Internal server error~',
  501: '501: Server not implemented request function~',
  502: '502: Bad gateway~',
  503: '503: Service unavailable~',
  504: '504: Gateway timeout~',
  505: '505: HTTP version not supported by the request~',
}
```

:::

### ERROR_NO_TIP_STATUS

After a request is sent, if the server returns an error code but you do not want the user to see the error message, you can add that error code to this array. For example, by default, error code `10000` will not trigger an error message popup.

```ts
export const ERROR_NO_TIP_STATUS = [10000]
```
