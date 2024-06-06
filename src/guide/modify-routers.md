# How to Modify Request Router Menu

## Router Data Structure

To ensure the clarity, simplicity, and easy maintenance of the project's router structure, both static and dynamic router data structures in the project are consistent. The router data structure is mainly divided into two parts: `base` + `meta`.

- `base`: Contains basic information about a single router page, such as path, component address, component name, etc.
- `meta`: Contains additional information about a single router page, such as whether to display in the menu, icon, permission requirements, etc.

```ts
interface baseRoute {
  /** Router name (unique identifier) */
  name: string
  /** Router path */
  path: string
  /** Router redirection */
  redirect?: string
  /* Page component address */
  componentPath?: string | null
  /* Router id */
  id: number
  /* Parent router id, null for top-level pages */
  pid: number | null
}
```

```ts
interface RouteMeta {
  /* Page title, usually required. */
  title: string
  /* Icon, usually used with menus */
  icon?: string
  /* Requires login permission. */
  requiresAuth?: boolean
  /* Accessible roles */
  roles?: Auth.RoleType[]
  /* Whether to enable page caching */
  keepAlive?: boolean
  /* Some routes we do not want to display in the menu, such as some editing pages. */
  hide?: boolean
  /* Menu sorting. */
  order?: number
  /* Nested external link */
  href?: string
  /** The current route is not displayed in the left menu, but needs to highlight a certain menu */
  activeMenu?: string
  /** Whether the current route will be added to the Tab */
  withoutTab?: boolean
  /** Whether the current route will be pinned in the Tab, used for some permanent pages */
  pinTab?: boolean
  /** Specify whether the current route in the left menu is a directory or a page. If not set, the default is 'page'. */
  menuType?: 'dir' | 'page'
}
```

These two parts of data together form the data structure of a single route, and the hierarchical relationship of routes is maintained using the `pid` field.
Therefore, the data structure of a single set of routes is as follows:

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

When this set of router data is obtained, it will be processed on the frontend to conform to the format of the `vue-router` router.

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
    "menuType": "dir",
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
        "pinTab": true,
        "menuType": "page",
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
        "menuType": "page",
      },
      "id": 3,
      "pid": 1
    }
  ],

}
```
