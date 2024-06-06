# Project Structure

```text
nova-admmin
├── .vscode                          # VS Code configuration files
│   ├── extensions.json              # Recommended VS Code extensions
│   └── settings.json                # VS Code editor settings
├── build                            # Build related configurations
│   ├── plugins.ts                   # Vite plugin related configurations
│   └── proxy.ts                     # Vite proxy related methods
├── public
│   └── favicon.svg                  # Site favicon
├── locales                          # Multilingual Configuration
├── src
│   ├── assets                       # Static resources
│   │   └── svg-icons                # Custom SVG icon resources
│   ├── components                   # Common components
│   │   ├── common                   # Framework internal components
│   │   └── custom                   # Custom components
│   ├── constants                    # Constants
│   ├── directives                   # Custom directives
│   │   ├── copy.ts                  # v-cope directive
│   │   └── permission.ts            # v-permission directive
│   ├── hooks                        # Composition functions
│   │   ├── useBoolean.ts            # Using Boolean composition
│   │   ├── useEcharts.ts            # Using Echarts composition functions
│   │   ├── useLoading.ts            # Using Loading composition functions
│   │   ├── usePermission.ts         # Using Permission composition functions
│   │   └──  useDefault.ts           # Composite use of re variables with default values
│   ├── layouts                      # Global layout components
│   │   ├── components               # Components inside the layout
│   │   ├── leftMenu.layout.vue      # Left menu layout
│   │   ├── topMenu.layout.vue       # Top menu layout
│   │   └── index.vue                # Base layout component
│   ├── modules                      # Unified auto-registration modules
│   │   │──assets.ts                 # Automatically register static resources
│   │   │──directives.ts             # Automatically register directives
│   │   └──i18n.ts                   # Automatically register multilingualism
│   ├── router                       # Router configuration
│   │   ├── guard.ts                 # Router guard configuration
│   │   ├── routes.inner.ts          # Fixed page routes
│   │   ├── routes.static.ts         # Local static page routes
│   │   └── index.ts                 # Instantiated router export
│   ├── service                      # Service configuration
│   │   ├── api                      # Global interface configuration
│   │   ├── http                     # Encapsulated request methods
│   │   │   ├── alova.ts             # Requester instance encapsulation
│   │   │   ├── config.ts            # Basic request field configuration
│   │   │   ├── handle.ts            # Request handling method encapsulation
│   │   │   └── index.ts             # Instantiated requester
│   │   └── index.ts                 # Export entry for request methods
│   ├── store                        # Global state management
│   │   ├── app
│   │   │   ├── theme.json           # Site theme configuration
│   │   │   └── index.ts             # Site style layout related storage
│   │   ├── auth.ts                  # User permission related storage
│   │   ├── route
│   │   │   ├── helper.js            # Route conversion utility methods
│   │   │   └── index.ts             # Route-related storage
│   │   └── tab.ts                   # Tab related storage
│   ├── styles                       # Project style styles
│   │   ├── reset.css                # Reset style CSS
│   │   ├── transition.css           # Transition style CSS
│   │   └── index.css                # Unified export entry
│   ├── typings                      # Type files
│   │   ├── api                      # Interface type files
│   │   ├── entities                 # Database table entity type file
│   │   ├── env.d.ts                 # Environment variable type files
│   │   ├── global.d.ts              # Other type files applicable globally
│   │   ├── route.d.ts               # Route type files
│   │   ├── router.d.ts              # Override router native types
│   │   ├── service.d.ts             # Request method type files
│   │   ├── auto-imports.d.ts        # Automatically imported method type files (auto-generated)
│   │   └── components.d.ts          # Automatically imported component type files (auto-generated)
│   ├── utils                        # Utility classes
│   │   ├── array.ts                 # Array utilities
│   │   ├── icon.ts                  # Icon utilities
│   │   ├── storage.ts               # Storage encapsulation utilities
│   │   ├── i18n.ts                  # Multilingual Tool
│   │   └── index.ts                 # Utility class export entry
│   ├── views                        # Pages
│   ├── App.vue                      # Root component
│   └── main.ts                      # Entry file
├── .editorconfig                    # Editor configuration file
├── .env                             # Common environment variables
├── .env.dev                         # Development environment variables
├── .env.prod                        # Production environment variables
├── .gitattributes                   # Git commit configuration
├── .gitignore                       # Git ignore file configuration
├── .npmrc                           # npm configuration file
├── eslint.config.js                 # eslint configuration file
├── index.html                       # Entry HTML file
├── LICENSE                          # Open source license
├── package.json                     # Project dependency configuration file
├── README.md                        # Project documentation
├── service.config.ts                # Backend service address configuration file
├── tsconfig.json                    # TypeScript configuration file
├── unocss.config.ts                 # Unocss configuration file
└── vite.config.ts                   # Vite configuration file

```
