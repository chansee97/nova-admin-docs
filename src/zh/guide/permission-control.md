# 权限控制

## 菜单的角色权限控制

在返回的菜单数据中，包含 `roles` 字段，表示该菜单只有哪些角色可以访问，在下面的示例数据中，只有 `super` 角色可以访问。

如果该字段为空，则表示所有角色都可以访问。

```js
// ...
{
  'name': 'justSuper',
  'path': '/permission/justSuper',
  'title': 'super可见',
  'requiresAuth': true,
  'roles': [
    'super',
  ],
  'icon': 'icon-park-outline:wrong-user',
  'componentPath': '/permission/justSuper/index.vue',
  'id': 30,
  'pid': 28,
},
// ...
```

## 权限指令

在项目中，使用 `v-permission` 指令来判断当前用户是否具有访问该菜单的权限。可以通过传入字符串和数组两种方式来判断。

```vue
<template>
  <div>
    <el-button v-permission="'super'">just super</el-button>
    <el-button v-permission="['admin']">just admin</el-button>
    <el-button >everyone can see</el-button>
  </div>
</template>
```

## 权限方法

在项目中，使用 `hasPermission` 方法来判断当前用户是否具有访问该菜单的权限。可以通过传入字符串和数组两种方式来判断。

```vue
<script setup lang="ts">
import { usePermission } from '@/hooks'

const { hasPermission } = usePermission()

function dosomething() {
  if (hasPermission('super')) {
    // do something
  }
}
</script>

<template>
  <div>
    <el-button v-if="hasPermission('super')">just super</el-button>
    <el-button v-if="hasPermission(['admin', 'user'])">just admin and user</el-button>
    <el-button >everyone can see</el-button>
  </div>
</template>
```
