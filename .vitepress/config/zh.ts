import { defineConfig, type DefaultTheme } from "vitepress";

export const zh = defineConfig({
  lang: "zh-Hans",
  description: "一个简洁、干净的中后台框架",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/other/": { base: "/other/", items: sidebarReference() },
      "/dev/": { base: "/dev/", items: sidebarEnv() },
    },

    editLink: {
      pattern:
        "https://github.com/chansee97/nova-admin-docs/edit/main/src/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2023-${new Date().getFullYear()} Rock chen`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "指南",
      link: "/guide/introduction",
      activeMatch: "/guide/",
    },
    {
      text: "开发配置",
      link: "/dev/git",
      activeMatch: "/dev/",
    },
    {
      text: "其他问题",
      link: "/other/FAQ",
      activeMatch: "/other/",
    },
    {
      text: "捐助",
      link: "/donate",
      activeMatch: "/donate/",
    },
    {
      text: "相关链接",
      items: [
        {
          text: "在线预览",
          link: "https://nova-admin-site.netlify.app/",
        },
        {
          text: "Github",
          link: "https://github.com/chansee97/nova-admin",
        },
        {
          text: "Gitee",
          link: "https://gitee.com/chansee97/nova-admin",
        },
        {
          text: "文档仓库",
          link: "https://github.com/chansee97/nova-admin-docs",
        },
      ],
    },
  ];
}
function sidebarGuide(): DefaultTheme.NavItem[] {
  return [
    {
      text: "指南",
      items: [
        { text: "介绍", link: "introduction" },
        { text: "如何开始使用?", link: "how-to-start" },
        { text: "目录结构", link: "directory-structure" },
      ],
    },
    {
      text: "基本配置",
      items: [
        { text: "请求服务配置", link: "service" },
        { text: "路由和菜单", link: "modify-routers" },
        { text: "自定义主题", link: "custom-theme" },
        { text: "权限控制", link: "permission-control" },
        { text: "环境变量", link: "env-variable" },
      ],
    },
    {
      text: "扩展使用",
      items: [
        { text: "使用图标", link: "use-icons" },
        { text: "UnoCSS", link: "unocss" },
      ],
    },
    {
      text: "相关内容",
      items: [{ text: "配套后端项目", link: "backend-project" }],
    },
  ];
}
function sidebarReference(): DefaultTheme.NavItem[] {
  return [
    {
      text: "其他问题",
      items: [{ text: "FAQ", link: "FAQ" }],
    },
  ];
}
function sidebarEnv(): DefaultTheme.NavItem[] {
  return [
    {
      text: "开发工具",
      items: [
        { text: "vscode插件", link: "vc-plugins" },
        { text: "便利工具", link: "awesome-tools" }
      ],
    },
    {
      text: "开发环境",
      items: [
        { text: "Git", link: "git" },
        { text: "NodeJs", link: "nodejs" },
        { text: "Mysql", link: "mysql" },
      ],
    },
  ];
}
