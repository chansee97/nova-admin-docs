# Frequently Asked Questions

::: tip
If you have any questions, please search for them in the [issues](https://github.com/chansee97/nova-admin/issues) before submitting. Commonly asked questions will be compiled and answered in the FAQ section. Your question will help more people!
:::

## The page switch failed and displays a blank page

Please ensure that the page path is configured correctly and that the page maintains a **single root element**, as detailed in the official documentation [Transition Component TIP](https://v3.vuejs.org/guide/transitions-overview.html#the-transition-component)

```vue
// Incorrect Example
<template>
  <div> content 1 </div>
  <div> content 2 </div>
</template>

// Correct Example
<template>
  <div>  // [!code ++]
    <div> content 1 </div>
    <div> content 2 </div>
  </div>  // [!code ++]
</template>
```

## How to Remove Syntax Validation from the Build

Remove the validation statement from the build command

```json
// package.json
"scripts": {
  // ...
  "build": "vue-tsc --noEmit && vite build --mode prod", // [!code --]
  "build": "vite build --mode prod", // [!code ++]
  // ...
}
```
