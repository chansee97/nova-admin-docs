# 项目结构

```text
nova-admmin
├── .vscode                          # vscode 配置文件
│   ├── extensions.json              # vscode 扩展插件推荐
│   └── settings.json                # vscode 编辑器配置
├── build                            # 构建相关配置
│   ├── plugins.ts                   # vite插件相关配置
│   └── proxy.ts                     # vite代理相关方法
├── public
│   └── favicon.svg                  # 站点图标
├── locales                          # 多语言配置
├── src
│   ├── assets                       # 静态资源
│   │   └── svg-icons                # 自定义svg图标资源
│   ├── components                   # 公共组件
│   │   ├── common                   # 框架内部组件
│   │   └── custom                   # 自定义组件
│   ├── constants                    # 常量
│   ├── directives                   # 自定义指令
│   │   ├── copy.ts                  # v-cope指令
│   │   └── permission.ts            # v-permission指令
│   ├── hooks                        # 组合式方法
│   │   ├── useBoolean.ts            # 组合式使用Boolean
│   │   ├── useEcharts.ts            # 组合式使用Echarts方法
│   │   ├── useLoading.ts            # 组合式使用Loading方法
│   │   ├── usePermission.ts         # 组合式使用Permission方法
│   │   └── useDefault.ts            # 组合式使用带默认值的re变量
│   ├── layouts                      # 全局布局组件
│   │   ├── components               # 布局内部组件
│   │   ├── leftMenu.layout.vue      # 左侧菜单布局
│   │   ├── topMenu.layout.vue       # 顶部菜单布局
│   │   └── index.vue                # 布局组件基座
│   ├── modules                      # 统一自动注册模块
│   │   ├── assets.ts                # 自动注册静态资源
│   │   └── directives.ts            # 自动注册指令
│   │   └── i18n.ts                  # 自动注册多语言
│   ├── router                       # 路由配置
│   │   ├── guard.ts                 # 路由守卫配置
│   │   ├── routes.inner.ts          # 固定页面路由
│   │   ├── routes.static.ts         # 本地静态页面路由
│   │   └── index.ts                 # 实例化路由导出
│   ├── service                      # 服务配置
│   │   ├── api                      # 全局接口配置
│   │   ├── http                     # 封装请求方法
│   │   │   ├── alova.ts             # 请求器实例封装
│   │   │   ├── config.ts            # 基本请求字段配置
│   │   │   ├── handle.ts            # 请求处理方法封装
│   │   │   └── index.ts             # 实例化请求器
│   │   └── index.ts                 # 请求方法导出出口
│   ├── store                        # 全局状态管理
│   │   ├── app
│   │   │   ├── theme.json           # 站点主题配置
│   │   │   └── index.ts             # 站点样式布局设置相关存储
│   │   ├── auth.ts                  # 用户权限相关存储
│   │   ├── route
│   │   │   ├── helper.js            # 路由转换工具方法
│   │   │   └── index.ts             # 路由相关存储
│   │   └── tab.ts                   # Tab页签相关存储
│   ├── styles                       # 项目样式风格
│   │   ├── reset.css                # 重置样式css
│   │   ├── transition.css           # 过渡样式css
│   │   └── index.css                # 统一导出出口
│   ├── typings                      # 类型文件
│   │   ├── api                      # 接口类型文件
│   │   ├── entities                 # 数据库表实体类型文件
│   │   ├── env.d.ts                 # 环境变量类型文件
│   │   ├── global.d.ts              # 适用全局的其他类型文件
│   │   ├── route.d.ts               # 路由类型文件
│   │   ├── router.d.ts              # 覆盖router原生类型
│   │   ├── service.d.ts             # 请求方法类型文件
│   │   ├── auto-imports.d.ts        # 自动导入方法类型文件（自动生成）
│   │   └── components.d.ts          # 自动导入组件类型文件（自动生成）
│   ├── utils                        # 工具类
│   │   ├── array.ts                 # 数组工具
│   │   ├── icon.ts                  # 图标工具
│   │   ├── storage.ts               # 存储封装工具
│   │   ├── i18n.ts                  # 多语言工具
│   │   └── index.ts                 # 工具类导出出口
│   ├── views                        # 页面
│   ├── App.vue                      # 根组件
│   └── main.ts                      # 入口文件
├── .editorconfig                    # 编辑器配置文件
├── .env                             # 通用环境变量
├── .env.dev                         # 开发环境变量
├── .env.prod                        # 生产环境变量
├── .gitattributes                   # git提交配置
├── .gitignore                       # git忽略文件配置
├── .npmrc                           # npm配置文件
├── eslint.config.js                 # eslint配置文件
├── index.html                       # 入口html文件
├── LICENSE                          # 开源协议
├── package.json                     # 项目依赖配置文件
├── README.md                        # 项目说明文档
├── service.config.ts                # 后台服务地址配置文件
├── tsconfig.json                    # typescript配置文件
├── unocss.config.ts                 # unocss配置文件
└── vite.config.ts                   # vite配置文件

```
