# Customizing Themes

## Interface Layout

Modify `src\store\app\index.ts` to customize the following variables:

- `footerText`: Set the footer text, usually used to display copyright information, default is `Copyright © 2024 chansee97`
- `lang`: Set the language, default is `'enUS'`
- `theme`: Override global component library theme variables, refer to the next section for details, default is `themeConfig`
- `primaryColor`: Theme color configuration, default is `#18a058`
- `collapsed`: Whether to expand or collapse, default is `false`
- `grayMode`: Whether to enable gray mode, default is `false`
- `colorWeak`: Whether to enable color blindness mode, default is `false`
- `loadFlag`: Page reload flag, no need to modify
- `showLogo`: Whether to show the logo, default is `true`
- `showTabs`: Whether to show tabs, default is `true`
- `showFooter`: Whether to show the footer, default is `true`
- `showProgress`: Whether to show the progress bar, default is `true`
- `showBreadcrumb`: Whether to show breadcrumb navigation, default is `true`
- `showBreadcrumbIcon`: Whether to show breadcrumb navigation icon, default is `true`
- `showWatermark`: Whether to show watermark, default is `false`
- `showSetting`: Whether to display the settings window, default is `false`
- `transitionAnimation`: Type of transition animation, default is `'fade-slide'`
- - `layoutMode`: Interface layout type, default is `'leftMenu'`

## Component Library Style

Modify `src\store\app\theme.json` to add the style variables you need. For specific details, please refer to [Naive-UI](https://www.naiveui.com/en-US/docs/customize-theme).

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
