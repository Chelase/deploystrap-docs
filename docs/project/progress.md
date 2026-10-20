# 当前能力与验证

**源码盘点日期：2026-10-20 · 版本：v0.1.0**

“已有实现”表示代码存在；历史实测、当前静态核对和待完成验收在本页分别标明。

## 已有实现

| 能力 | 源码核对结果 | 验证边界 |
| --- | --- | --- |
| CLI 迁移 | `backup` / `restore` / `uninstall` / `verify` / `list` 五个子命令 | CLI 归档往返与三级卸载在 2026-09-15 有实测记录 |
| CLI 双引擎 | official / legacy 分派、归档类型识别、OpenClaw 可执行解析 | 2026-09-28 机制文档已有记录；本次核对源码，未重跑迁移 |
| 加密归档 | AES-256-GCM，CLI 与桌面端共享容器 | 历史测试覆盖跨端容器与错误口令；非通用个人档案 |
| 桌面端 | OpenClaw、Hermes、AI 工具、备份、恢复、验证、卸载、设置八个面板 | 完整实机端到端走查仍待完成 |
| 工具链安装 | Node / Git / Claude Code / Codex CLI / OpenCode / oh-my-opencode | 已有降级安装与完成后回查机制 |
| 配置通道 | OpenClaw 官方 patch；Hermes 官方 config 读写 | 能力应以目标机器所安装的 CLI 为准 |
| 文档站 | VitePress、中文导航、本地搜索、明暗主题 | 构建与预览在本次任务验证；公网部署以 Actions 成功为准 |

## 主线仍缺什么

- 通用个人上下文档案：任意 Agent 的配置、全局规则、prompts 与凭证的完整携带流程。
- AOC：环境检测、Python 容灾安装、本地体验、接入胶囊、GUI 面板均未开工；当前三处业务源码未发现 AOC 实现。
- 分发：代码签名、macOS / Linux 安装包和完整应用发布流水线尚未完成。文档 Actions 只构建与发布静态文档。

## 历史验证基线

仓库 [DEVELOPMENT-PROGRESS.md](https://github.com/Chelase/deploystrap/blob/master/DEVELOPMENT-PROGRESS.md) 记录：

- 2026-09-14：workspace 构建／类型检查通过，42 项单元测试通过。
- 2026-09-15：CLI 备份 → 列表 → 校验 → 恢复往返、加密往返、错误口令与三级卸载完成实测。

这些是带日期的历史结果，不等于当前提交重新执行过同一组检查。

## 源码盘点发现的限制

`restore --skip-existing` 当前仅参与非空目录的入口判断，没有传入 `decompress_archive`；解压器仍使用 `File::create` 写文件。因此它不能保证保留同名文件，建议恢复到独立空目录。本轮记录该缺口，未修改迁移代码。

## 当前技术结构

CLI 为 Rust；桌面端后端为 Tauri v2，前端为 React 19、TypeScript、Tailwind CSS 4 与 Zustand。GUI 已使用自有 UI 原语，旧进度记录中的 Ant Design 描述已过期。

文档使用独立的根 `package.json`，与 `gui/` 的依赖和桌面构建分开维护。
