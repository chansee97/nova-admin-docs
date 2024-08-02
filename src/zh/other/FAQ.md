# 常见问题

::: tip
如果你有问题，请在[issue](https://github.com/chansee97/nova-admin/issues)中查找后在提交。对于高频出现的问题会收录到FAQ中统一回答。你的问题会帮助更多的人！
:::

## 页面切换失败，显示空白

请确保页面路径配置正确，且页面保持**单标签根节点**， 详见官方说明 [Transition 组件 TIP](https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component)

```vue
// 错误示例
<template>
  <div> content 1 </div>
  <div> content 2 </div>
</template>

// 正确示例
<template>
  <div>  // [!code ++]
    <div> content 1 </div>
    <div> content 2 </div>
  </div>  // [!code ++]
</template>
```

## 如何去除打包的语法校验

删除打包命令中的校验语句

```json
// package.json
"scripts": {
  // ...
  "build": "vue-tsc --noEmit && vite build --mode prod", // [!code --]
  "build": "vite build --mode prod", // [!code ++]
  // ...
}
```
