# 使用图标

## vue文件

### 模板中本地图标（离线有效）

本项目使用[unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing)来自动引入`@iconify-json/icon-park-outline`图标,推荐前往[icones](https://icones.js.org/collection/icon-park-outline)来寻找你需要的图标

例如，你找到一个图标`home`，必须使用`<{collection}-{icon} />`格式来引入它，否则无效。

```vue
// usage
<icon-park-outline-home />
<IconParkOutlineHome />

// modify style
<icon-park-outline-home style="font-size: 2em; color: red"/>

// modify style by Unocss
<icon-park-outline-home class="text-red text-2em"/>
```

::: tip
推荐使用[Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)插件提高开发体验
:::

### 模板中网络图标（离线无效）

项目中也提供了自动加载网络图标的功能，可以使用[icones](https://icones.js.org)中的所有图标，而不再局限于`icon-park-outline`系列，此功能是基于[@iconify/vue](https://iconify.design/docs/icon-components/vue/)和[n-icon](https://www.naiveui.com/zh-CN/light/components/icon)实现的。**该方式图标会被不会自动打包到项目中。离线无效**

例如，你找到一个图标`icon-park-outline:user`

```vue
// usage
<nova-icon icon="icon-park-outline:user" />

// modify style
<nova-icon icon="icon-park-outline:user" :color="red" :size="22"/>

```

::: details Props类型声明

```ts
interface iconPorps {
  /* 图标名称 */
  icon?: string
  /* 图标颜色 */
  color?: string
  /* 图标大小 */
  size?: number
  /* 图标深度 */
  depth?: 1 | 2 | 3 | 4 | 5
}
```

:::

## ts文件

### ts中本地图标（离线有效）

些场景可能无法直接使用组件的方式来使用图标，比如在ts文件或者vue文件的`script`中配合Naive组件添加一些图标渲染, 这时需要通过手动引入的方式来使用图标

```ts
import IconRedo from '~icons/icon-park-outline/redo'

const options = [
  {
    label: '刷新',
    key: 'reload',
    icon: () => h(IconRedo),
  }
]

```

### TS中网络图标（离线无效）

与上面场景一样，但是图标通过网络加载

```ts
import { renderIcon } from '@/utils'

const options = [
  {
    label: '刷新',
    key: 'reload',
    icon: renderIcon('icon-park-outline:redo'),
  }
]

```

:::tip
`renderIcon`返回一个用 [h函数](https://cn.vuejs.org/api/render-function.html#h) 包裹的`@iconify/vue`，并不是直接返回`VNode`节点，根据需要,它的用法可能是`renderIcon('{collection}:{icon}')`或者`renderIcon('{collection}:{icon}')()`,后一种方法是直接返回`VNode`节点。
:::

## svg图标

本项目使用[unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing)来自动引入svg图标，首先你需要在`src/assets/svg-icons`中加入svg图标

例如，你添加了一个`logo.svg`,这样在项目中使用,自定引入的名字需符合格式`svg-icons-{name}`

```vue
// usage
<svg-icons-logo/>

// modify style by Unocss
<svg-icons-logo class="text-2em"/>
```

::: tip
为了视觉美观，svg图标默认为1.2em大小，你可用通过修改`build\plugins.ts`来更改这个默认行为

```ts{8}
// auto import iconify's icons
Icons({
  defaultStyle: 'display:inline-block',
  compiler: 'vue3',
  customCollections: {
    'svg-icons': FileSystemIconLoader(
      'src/assets/svg-icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" width="1.2em" height="1.2em"')
    ),
  },
})
```

:::

### 动态引入本地svg图标

有时可能需要动态引入svg图标，这时需要使用`renderIcon`函数，传入的图标名字必须以`local:`标识作为开头

```ts
import { renderIcon } from '@/utils'

// 自动引入 `/src/assets/svg-icons/logo.svg`
renderIcon('local:logo', {size: 20})
```

在模板中则使用`nova-icon`组件来引入

```vue
// usage
<nova-icon icon="local:cool" />

// modify style
<nova-icon icon="local:cool" :color="red" :size="22"/>
```
