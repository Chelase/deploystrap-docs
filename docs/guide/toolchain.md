# 安装 AI 工具链

工具安装入口位于 **Tauri 桌面端**，当前 CLI 不提供安装子命令。

## 推荐顺序

1. 打开「AI 工具」面板，查看 Node.js、npm 和 Git 的检测结果。
2. 先补齐 Node.js 和 Git，再安装 Claude Code、Codex CLI 或 OpenCode。
3. 根据需要安装 oh-my-opencode；它依赖 Node.js 与 Git。
4. 等待安装后的状态回查，并在终端确认工具版本。

```sh
node --version
npm --version
git --version
claude --version
codex --version
opencode --version
```

只运行自己已安装工具对应的命令。版本可读取表示可执行文件可用，不代表模型账户已经认证成功。

## 安装失败时会发生什么

安装链路按首选方式、镜像或直接下载安装包、手动指引逐级降级。各工具的实际降级方式不同：

| 工具 | 首选路径 | 后续路径 |
| --- | --- | --- |
| Node.js | winget | MSI 安装包 → 官网 |
| Git | winget | EXE 安装包 / 镜像 → 官网 |
| npm 系 AI CLI | npm 官方源 | npmmirror 重试 → 工具文档 |
| oh-my-opencode | 检查依赖后运行安装器 | 失败时打开文档 |

同一时刻安装一个工具，避免进度状态互相覆盖。界面进度表示安装阶段，并非下载字节的实时比例。

## 安装 OpenClaw 或 Hermes

「OpenClaw」面板提供环境检测、依赖补装、配置读写以及 Gateway 控制。Windows 下检测会重新读取当前注册表 PATH，适应 nvm 切换后的工具路径。

「Hermes」面板提供安装与配置管理。配置通过官方 CLI 读写，API Key 写入 `.env`，模型与供应商配置写入 `config.yaml`。已有密钥留空时保持原值。

::: info 验证范围
安装面板已有实现，但项目尚未完成全部 GUI 运行态端到端验收。安装结果应以目标机器的版本回查和实际启动结果为准。
:::
