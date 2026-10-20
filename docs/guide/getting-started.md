# 快速开始

当前版本为 **v0.1.0**。优先使用 Windows 开发环境；macOS / Linux 安装包、代码签名和跨平台验收尚未完成。

::: info 分发状态
本页提供源码构建路径。[GitHub Releases](https://github.com/Chelase/deploystrap/releases) 中如有与你的平台匹配的产物，可按对应发布说明使用；项目尚未承诺完整的签名分发链路。
:::

## 获取源码

```sh
git clone https://github.com/Chelase/deploystrap.git
cd deploystrap
```

## 使用 CLI

准备 Rust 工具链。在 Windows 上还需 Visual Studio Build Tools 的 C++ 工具和 Windows SDK，并在其开发者终端中运行：

```sh
cargo build -p deploystrap --release
```

Windows 产物为 `target/release/deploystrap.exe`，Unix 产物为 `target/release/deploystrap`。

```powershell
.\target\release\deploystrap.exe --help
.\target\release\deploystrap.exe backup --help
```

把产物目录加入 PATH 后，可直接使用 `deploystrap`。目前 CLI 只有 `backup`、`restore`、`uninstall`、`verify`、`list` 五个子命令，工具安装通过桌面端操作。

## 使用桌面端

除 Rust 和系统构建依赖外，还需 Node.js 与 npm。推荐 Node.js 24。Tauri 所需的平台依赖见 [Tauri 官方环境准备](https://v2.tauri.app/start/prerequisites/)。

先在 `gui/` 安装前端依赖并启动 Vite：

```sh
cd gui
npm ci
npm run dev
```

保持这个终端运行，另开一个终端，在同一个 `gui/` 目录启动桌面壳（当前 Tauri 配置不会自动启动 Vite）：

```sh
npm run tauri -- dev
```

桌面端提供 OpenClaw、Hermes、AI 工具、备份、恢复、验证、卸载和设置八个面板。

::: tip 浏览器预览的边界
`gui/` 中的 `npm run dev` 只启动前端，非 Tauri 环境会使用 mock 数据。真实检测、安装和文件操作应在 Tauri 桌面窗口验证。
:::

## 完成第一次操作

如果你要准备机器环境，进入[安装 AI 工具链](./toolchain)。如果已有 OpenClaw 实例，进入[备份与恢复](./migration)，先恢复到独立目录检查内容。

Windows 遇到链接器或 SDK 错误时，参考仓库的 [Windows MSVC 构建机制](https://github.com/Chelase/deploystrap/blob/master/.agent-rules/mechanisms/windows-msvc-build.md)。其中 `dev.bat` 是维护者本机脚本，未入库；新机器需要按本机安装路径配置开发者终端。
