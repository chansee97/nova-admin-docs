# NodeJs

Node.js is currently an essential environment for front-end engineering development.

::: tip
It is not recommended to install Node.js natively due to version management issues. It is recommended to use package managers like nvm, volta, etc., to install Node.js.
:::

## Native Node Installation

[Node Official Download](https://nodejs.org/)

Check if the installation is successful

```shell
node -v
```

Set npm registry source to accelerate downloads. Here, we use the Taobao mirror.

```shell
npm config set registry https://registry.npmmirror.com
```

## Package Managers

npm is the package manager for Node.js, but npm's package download speed is slow, takes up a lot of space, and has some issues. Therefore, it is recommended to use [pnpm](https://pnpm.io/) and other package managers.

```shell
npm install -g pnpm
```

Common commands

```shell
# Install production dependencies
pnpm add package-name
# Install development dependencies
pnpm add -D package-name
# Install a specific version
pnpm add package-name@version
# Install all project dependencies (alias: i)
pnpm install
# Remove a dependency (alias: rm, uninstall, un)
pnpm remove package-name
# Update a dependency (alias: up, upgrade)
pnpm update package-name
# Update all dependencies
pnpm update
# Remove unnecessary packages
pnpm prune
# Run a script defined in the package, 'run' can be omitted
pnpm run
```

## VOLTA

[VOLTA](https://volta.sh/) is also a version manager for Node.js. It can support different projects using different environments and automatically switch Node.js versions for different projects. I recommend using Volta to manage Node.js versions.

- [Volta Installation](https://docs.volta.sh/guide/getting-started)

### VOLTA Common Commands

```shell
# Install LTS version
volta install node
# Install the tool, such as 'node@20', 'yarn@latest', or 'you-pack@^14.4.3'.
volta install <tool[@version]>
# Pin the runtime or package manager for the project, such as 'node@lts' or 'yarn@^1.14'.
volta pin <tool[@version]>
# Uninstall a specified tool
volta uninstall <tool>
# List all installed tools
volta list
# Help
volta help
```

## NVM

[NVM](https://github.com/nvm-sh/nvm) is a version manager for Node.js.

- [Mac Installation](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Windows Installation](https://github.com/coreybutler/nvm-windows/releases)

### NVM Source Configuration

Find the settings.txt file in the installation directory, open it, and add the following lines. Without these lines, you cannot install older versions of Node.js.

```text
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

You can also set this using the nvm command line

```shell
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

### NVM Common Commands

```shell
nvm list View installed versions
nvm list installed View installed versions
nvm list available View versions available for installation over the network
nvm version View the current version
nvm install Install the latest version of nvm
nvm use <version> Switch to use a specific version of Node
nvm ls List all versions
nvm current Display the current version
nvm alias <name> <version> Add an alias to different version numbers
nvm unalias <name> Delete defined aliases
nvm reinstall-packages <version> Reinstall npm packages for the specified version in the current node environment
nvm on Open Node.js control
nvm off Close Node.js control
nvm proxy View settings and proxy
nvm node_mirror [url] Set or view node_mirror in setting.txt. If not set, the default is https://nodejs.org/dist/
nvm npm_mirror [url] Set or view npm_mirror in setting.txt. If not set, the default is: https://github.com/npm/npm/archive/.
nvm uninstall <version> Uninstall a specified version
nvm use [version] [arch] Switch to a specified Node version and architecture
nvm root [path] Set and view the root path
```

### Example of Switching Versions

```shell
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```
