import { defineConfig } from "vitepress";
import { search as zhSearch } from "./zh";
import { qq } from "./icon";

export const shared = defineConfig({
  title: "Nova-admin",

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  srcDir: "src",

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/nova-admin.svg' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JYHD4M2FMM' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
    ]
  ],

  themeConfig: {
    logo: { src: "/nova-admin.svg", width: 24, height: 24 },

    search: {
      provider: "algolia",
      options: {
        appId: "XVJOMWXWDI",
        apiKey: "763016448ef3b797fc4ed0283c5046ca",
        indexName: "nova-admin-netlify",
        locales: { ...zhSearch },
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/chansee97/nova-admin" },
      {
        icon: {
          svg: qq,
        },
        link: "https://qm.qq.com/q/y7YXbq5WIo",
      },
    ],
  },
});
