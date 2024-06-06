# Access Control

## Role-Based Access Control for Menus

In the returned menu data, there is a `roles` field that indicates which roles can access that menu. In the example data below, only the `super` role can access it.

If this field is empty, it means that all roles can access it.

```js
// ...
{
  'name': 'justSuper',
  'path': '/permission/justSuper',
  'title': 'Visible to super',
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

## Permission Directive

In the project, use the `v-permission` directive to determine if the current user has access to that menu. It can be used with both strings and arrays for checking.

```vue
<template>
  <div>
    <el-button v-permission="'super'">just super</el-button>
    <el-button v-permission="['admin']">just admin</el-button>
    <el-button>everyone can see</el-button>
  </div>
</template>
```

## Permission Method

In the project, use the `hasPermission` method to check if the current user has access to that menu. It can be used with both strings and arrays for checking.

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
    <el-button>everyone can see</el-button>
  </div>
</template>
```
