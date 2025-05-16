---
layout: home

hero:
  name: "Nova-admin"
  text: "一个简洁、干净的中后台管理模板"
  tagline: Vue3、Vite6、TypeScript、NaiveUI、Unocss
  image:
      src: /nova-admin.svg
      alt: Nova-admin
  actions:
    - theme: brand
      text: 了解Nova-admin
      link: /zh/guide/introduction
    - theme: alt
      text: Github
      link: https://github.com/chansee97/nova-admin
    - theme: alt
      text: 在线预览
      link: https://nova-admin.pages.dev/

features:
  - title: 最新技术栈
    icon: 💻
    details: 基于Vue3、Vite6、TypeScript、NaiveUI、Unocss等最新技术栈开发
  - title: 网络请求
    icon:  📦
    details: 提供完善的网络请求封装，提供统一的响应处理和多场景能力
  - title: 权限管理
    icon: 🔑
    details: 完善的前后端权限管理方案
  - title: 路由配置
    icon: 📋
    details: 支持本地静态路由和后台返回动态路由，路由简单易配置
  - title: 主题适配
    icon: 🎨
    details: 支持暗黑主题适配，界面样式保持Naive风格
  - title: 代码规范
    icon: 📝
    details: 仅在提交时进行eslint校验，没有过多限制，开发更简便
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #26e19c 50%, #28db2e);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #8fe992 50%, #8bee8f 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
