---
layout: home

hero:
  name: Deploystrap / 部署器
  text: 换台机器，接着工作。
  tagline: AI 开发环境随身工具。让工具链与个人上下文，在陌生机器上重新就位。
  actions:
    - theme: brand
      text: 从这里开始
      link: /guide/getting-started
    - theme: alt
      text: 查看当前进展
      link: /project/progress

features:
  - title: 装齐 AI 工具链
    details: 检测并安装 Node、Git、Claude Code、Codex CLI 与 OpenCode。首选安装失败时，继续尝试镜像或手动引导。
    link: /guide/toolchain
    linkText: 工具安装指南
  - title: 从加密迁移开始
    details: 现有 OpenClaw 备份、恢复与校验是上下文随身的基础。携带凭证时使用 AES-256-GCM 加密归档。
    link: /guide/migration
    linkText: 备份与恢复指南
  - title: 校验迁移结果
    details: 列出归档内容、检查完整性，并在恢复后核对文件。通过实际校验结果确认迁移状态。
    link: /reference/cli
    linkText: 查看校验命令
---

::: info 当前阶段 · v0.1.0
工具安装与 OpenClaw 迁移已有实现，桌面端完整实机验收仍待完成。通用个人上下文档案尚未实现。请先阅读[当前能力与验证](/project/progress)，再选择使用路径。
:::
