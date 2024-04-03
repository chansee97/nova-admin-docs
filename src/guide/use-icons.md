# Using Icons

## Automatically Importing Icons

This project uses [unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing) to automatically import `@iconify-json/icon-park-outline` icons. It is recommended to visit [icones](https://icones.js.org/collection/icon-park-outline) to find the icons you need. **Icons imported this way will be automatically packaged into the project. Available offline.**

For example, if you find an icon named `home`, you must use the `<{collection}-{icon} />` format to import it, otherwise it will not work.

```vue
// usage
<icon-park-outline-home />
<IconParkOutlineHome />

// modify style
<icon-park-outline-home style="font-size: 2em; color: red"/>

// modify style using Unocss
<icon-park-outline-home class="text-red text-2em"/>
```

::: tip
It is recommended to use the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) plugin to improve development experience.
:::

## Automatically Loading Network Icons

The project also provides the functionality to automatically load network icons, allowing the use of all icons from [icones](https://icones.js.org) rather than being limited to the `icon-park-outline` series. This feature is implemented based on [@iconify/vue](https://iconify.design/docs/icon-components/vue/) and [n-icon](https://www.naiveui.com/en-US/docs/icon). **Icons loaded this way will not be automatically packaged into the project. Not available offline.**

For example, if you find an icon named `icon-park-outline:user`

```vue
// usage
<nova-icon icon="icon-park-outline:user" />

// modify style
<nova-icon icon="icon-park-outline:user" :color="red" :size="22"/>

```

::: details Props Type Declaration

```ts
interface iconProps {
  /* Icon name */
  icon?: string
  /* Icon color */
  color?: string
  /* Icon size */
  size?: number
  /* Icon depth */
  depth?: 1 | 2 | 3 | 4 | 5
}
```

:::

## Icon Function

In some scenarios, it may not be possible to directly use the component to display icons, such as adding dynamic icons with Naive components. In such cases, you can use the `renderIcon` function to display icons.

```ts
import { renderIcon } from '@/utils'

const options = [
  {
    label: 'Refresh',
    key: 'reload',
    icon: renderIcon('icon-park-outline:redo'),
  }
]

```

:::tip
`renderIcon` returns a `@iconify/vue` wrapped by the [h function](https://v3.vuejs.org/api/global-api.html#h), not directly returning a `VNode` node. Depending on your needs, its usage may be `renderIcon('{collection}:{icon}')` or `renderIcon('{collection}:{icon}')()`, the latter directly returns a `VNode` node.
:::

## SVG Icons

This project uses [unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing) to automatically import SVG icons. First, you need to add the SVG icons to `src/assets/svg-icons`.

For example, if you add a `logo.svg`, you can use it in the project by importing it with a custom name that follows the format `svg-icons-{name}`.

```vue
// usage
<svg-icons-logo/>

// modify style using Unocss
<svg-icons-logo class="text-2em"/>
```

::: tip
For visual aesthetics, SVG icons are set to a default size of 1.2em. You can modify this default behavior by changing the `build\plugins.ts` file.

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
