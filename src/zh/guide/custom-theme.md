# 自定义主题

## 界面布局

修改`src\store\app\index.ts`,修改你需要自定义的变量

- `footerText`: 设置页脚文本，一般用来显示版权信息，默认为 `Copyright © 2024 chansee97`
- `lang`: 设置语言，默认为 `'enUS'`
- `theme`: 全局组件库主题变量覆盖，具体可参考下一个小节，默认为 `themeConfig`
- `primaryColor`: 主题色配置，默认为 `#18a058`
- `collapsed`: 是否展开或折叠，默认为 `false`
- `grayMode`: 是否启用灰色模式，默认为 `false`
- `colorWeak`: 是否启用色盲模式，默认为 `false`
- `loadFlag`: 页面重载标记，无需修改
- `showLogo`: 是否显示logo，默认为 `true`
- `showTabs`: 是否显示选项卡，默认为 `true`
- `showFooter`: 是否显示页脚，默认为 `true`
- `showProgress`: 是否显示进度条，默认为 `true`
- `showBreadcrumb`: 是否显示面包屑导航，默认为 `true`
- `showBreadcrumbIcon`: 是否显示面包屑导航图标，默认为 `true`
- `showWatermark`: 是否显示水印，默认为 `false`
- `showSetting`: 是否显示显示设置窗口，默认为 `false`
- `transitionAnimation`: 过渡动画类型，默认为 `'fade-slide'`
- `layoutMode`: 界面布局类型，默认为 `'leftMenu'`

## 组件库样式

修改`src\store\app\theme.json`,添加你需要的样式变量，具体可参考[Naive-UI](https://www.naiveui.com/zh-CN/light/docs/customize-theme)

```json
{
  "common": {
    "primaryColor": "#18a058",
    "primaryColorHover": "#36ad6a",
    "primaryColorPressed": "#0c7a43",
    "primaryColorSuppl": "#36ad6a",
    "infoColor": "#2080f0",
    "infoColorHover": "#4098fc",
    "infoColorPressed": "#1060c9",
    "infoColorSuppl": "#4098fc",
    "successColor": "#18a058",
    "successColorHover": "#36ad6a",
    "successColorPressed": "#0c7a43",
    "successColorSuppl": "#36ad6a",
    "warningColor": "#f0a020",
    "warningColorHover": "#fcb040",
    "warningColorPressed": "#c97c10",
    "warningColorSuppl": "#fcb040",
    "errorColor": "#d03050",
    "errorColorHover": "#de576d",
    "errorColorPressed": "#ab1f3f",
    "errorColorSuppl": "#de576d"
  }
  // ...
}

```
