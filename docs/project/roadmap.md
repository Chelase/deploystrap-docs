# 开发路线

本页概述下一阶段，具体实施以仓库 [AOC 安装器计划](https://github.com/Chelase/deploystrap/blob/master/.agent-rules/dev-plans/aoc-installer-plan.md)为准。当前处于 **Phase 0，AOC MVP 尚未开工**。

## AOC MVP

| 顺序 | 计划能力 | 验收方向 |
| --- | --- | --- |
| 1 | CLI 骨架与环境检测 | 干净 Windows 准确报告缺失项 |
| 2 | Python / pip 容灾安装 | 从缺少环境到依赖可用 |
| 3 | 本地体验安装 | 配置模型并启动，调用官方状态／健康检查 |
| 4 | 加密接入胶囊 | 双机接入成功，错误口令失败关闭 |
| 5 | GUI AOC 面板 | 检测 → 安装 → 回查闭环 |

这些都是计划，不是当前命令。`aoc doctor`、`aoc install`、`aoc attach` 等名称仍属规划。

## 既有能力验收

优先补齐桌面端实机闭环：加密备份与恢复、文件选择、进度事件，以及三个安装面板的安装与回查。之后补跨平台路径转换和自动化 GUI 验证。

通用个人上下文档案需要明确配置覆盖范围、凭证强制加密与恢复后的可用性验证；当前 OpenClaw 归档是基础资产。

## Phase 2

AOC MVP 稳定之后，再推进通过 SSH 驱动的 Linux 中心部署。安装器不承担 AOC 本身的源码改造。

## 分发链路

文档站先接入 GitHub Pages 自动发布。应用本身的全平台构建、测试、Release、签名以及 crates.io 分发，在 MVP 验证后继续推进。

更多优先级见仓库 [ROADMAP.md](https://github.com/Chelase/deploystrap/blob/master/ROADMAP.md)。
