# 如何修改请求路由菜单

## 路由数据结构

为了保证项目路由的结构清晰，简单，易维护，项目中静态路由和动态路由的数据结构都是保持一致的。
路由的数据结构主要分为两部分 `base` + `meta`

- `base`:包含了单个路由页的基础信息，如路径，组件地址，组件名等
- `meta`:包含了单个路由页的扩展信息，如是否显示在菜单，图标，是否需要权限等

```ts
interface baseRoute {
  /** 路由名称(路由唯一标识) */
  name: string
  /** 路由路径 */
  path: string
  /** 路由重定向 */
  redirect?: string
  /* 页面组件地址 */
  componentPath?: string | null
  /* 路由id */
  id: numnber
  /* 父级路由id，顶级页面为null */
  pid: number | null
}
```

```ts
interface RouteMeta {
  /* 页面标题，通常必选。 */
  title: string
  /* 图标，一般配合菜单使用 */
  icon?: string
  /* 是否需要登录权限。 */
  requiresAuth?: boolean
  /* 可以访问的角色 */
  roles?: Auth.RoleType[]
  /* 是否开启页面缓存 */
  keepAlive?: boolean
  /* 有些路由我们并不想在菜单中显示，比如某些编辑页面。 */
  hide?: boolean
  /* 菜单排序。 */
  order?: number
  /* 嵌套外链  */
  herf?: string
  /** 当前路由不在左侧菜单显示，但需要高亮某个菜单的情况 */
  activeMenu?: string
  /** 当前路由是否会被添加到Tab中 */
  withoutTab?: boolean
  /** 当前路由是否会被固定在Tab中,用于一些常驻页面 */
  pinTab?: boolean
  /** 当前路由在左侧菜单是目录还是页面,不设置默认为page */
  menuType?: 'dir' | 'page'
}
```

这两部分数据组成了单个路由的数据结构,而路由的层级关系则使用`pid`字段来维护。
所以，单组路由的数据结构示例如下

```js
[
  {
    'name': 'dashboard',
    'path': '/dashboard',
    'title': '仪表盘',
    'requiresAuth': true,
    'icon': 'icon-park-outline:analysis',
    'menuType': 'dir',
    'componentPath': null,
    'id': 1,
    'pid': null,
  },
  {
    'name': 'dashboard_workbench',
    'path': '/dashboard/workbench',
    'title': '工作台',
    'requiresAuth': true,
    'icon': 'icon-park-outline:alarm',
    'pinTab': true,
    'menuType': 'page',
    'componentPath': '/dashboard/workbench/index.vue',
    'id': 2,
    'pid': 1,
  },
  {
    'name': 'dashboard_monitor',
    'path': '/dashboard/monitor',
    'title': '监控页',
    'requiresAuth': true,
    'icon': 'icon-park-outline:anchor',
    'menuType': 'page',
    'componentPath': '/dashboard/monitor/index.vue',
    'id': 3,
    'pid': 1,
  },
]

```

当这样一组路由数据在获取后会在前端进行处理，使其符合类`vue-router`的路由格式

```js
{
  "name": "dashboard",
  "path": "/dashboard",
  "component": null,
  "redirect": "/404"
  "meta": {
    "title": "仪表盘",
    "requiresAuth": true,
    "icon": "icon-park-outline:analysis",
    'menuType': 'dir',
  },
  "id": 1,
  "pid": null,
  "children": [
    {
      "name": "dashboard_workbench",
      "path": "/dashboard/workbench",
      "component": "/dashboard/workbench/index.vue",
      "meta": {
        "title": "工作台",
        "requiresAuth": true,
        "icon": "icon-park-outline:alarm",
        "pinTab": true,
        'menuType': 'page',
      },
      "id": 2,
      "pid": 1
    },
    {
      "name": "dashboard_monitor",
      "path": "/dashboard/monitor",
      "component": "/dashboard/monitor/index.vue",
      "meta": {
        "title": "监控页",
        "requiresAuth": true,
        "icon": "icon-park-outline:anchor",
        'menuType': 'page',
      },
      "id": 3,
      "pid": 1
    }
  ],

}
```
