# Deploystrap 公开文档

文档站：https://chelase.github.io/deploystrap-docs/

本仓库仅承载 Deploystrap 的公开文档快照、公共资产和 VitePress 构建配置。应用项目保持私有，未在此发布应用源码或内部规则。内容反映 2026-10-20 开发状态，不等于应用已发布的功能承诺。

使用 Node.js 24：

```sh
npm ci
npm run docs:dev
npm run docs:build
```

master 更新后，GitHub Actions 自动构建并部署到 Pages；PR 只检查构建。完整维护方式见 [文档维护指南](docs/development/docs.md)。
