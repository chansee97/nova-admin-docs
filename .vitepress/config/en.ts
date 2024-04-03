import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  description: "A simple and clean middle and back-end framework",

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
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2023-present Rock chen`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Guide",
      link: "/guide/introduction",
      activeMatch: "/guide/",
    },
    {
      text: "Development",
      link: "/dev/git",
      activeMatch: "/dev/",
    },
    {
      text: "Other",
      link: "/other/FAQ",
      activeMatch: "/other/",
    },
    {
      text: "Donate",
      link: "/donate",
      activeMatch: "/donate/",
    },
    {
      text: "About",
      items: [
        {
          text: "Preview",
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
          text: "Docs Repo",
          link: "https://github.com/chansee97/nova-admin-docs",
        },
      ],
    },
  ];
}
function sidebarGuide(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Guide",
      items: [
        { text: "Introduction", link: "introduction" },
        { text: "Get Started", link: "get-start" },
        { text: "Directory Structure", link: "directory-structure" },
      ],
    },
    {
      text: "Basic Configuration",
      items: [
        { text: "Service Configuration", link: "service" },
        { text: "Routers and Menus", link: "modify-routers" },
        { text: "Custom Theme", link: "custom-theme" },
        { text: "Permission Control", link: "permission-control" },
        { text: "Environment Variables", link: "env-variable" },
      ],
    },
    {
      text: "Extended Usage",
      items: [
        { text: "Using Icons", link: "use-icons" },
        { text: "UnoCSS", link: "unocss" },
      ],
    },
    {
      text: "Related Content",
      items: [{ text: "Backend Project", link: "backend-project" }],
    },
  ];
}
function sidebarReference(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Other Issues",
      items: [{ text: "FAQ", link: "FAQ" }],
    },
  ];
}
function sidebarEnv(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Development Tools",
      items: [
        { text: "VSCode Plugins", link: "vc-plugins" },
        { text: "Useful Tools", link: "awesome-tools" },
      ],
    },
    {
      text: "Development Environment",
      items: [
        { text: "Git", link: "git" },
        { text: "NodeJs", link: "nodejs" },
        { text: "Mysql", link: "mysql" },
      ],
    },
  ];
}
