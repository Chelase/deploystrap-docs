# 维护与发布文档

本站参考 Sky Tiptap 的 VitePress 结构：`docs/` 保存页面，`.vitepress/` 保存配置与默认主题扩展，GitHub Actions 构建后发布到 Pages。

## 本地开发

使用 Node.js 24，在仓库根目录运行：

```sh
npm ci
npm run docs:dev
```

构建并检查正式产物：

```sh
npm run docs:build
npm run docs:preview
```

本项目默认预览地址为 `http://localhost:4173/deploystrap/`。`DOCS_BASE` 可覆盖站点子路径；Actions 按仓库名设置，公开文档仓库使用 `/deploystrap-docs/`。GitHub Pages 不提供通用 URL 重写，因此页面保留 `.html`，不启用 `cleanUrls`。

## 文件职责

| 路径 | 职责 |
| --- | --- |
| `docs/guide/` | 面向使用者的指南 |
| `docs/reference/` | 当前已实现的参数与命令 |
| `docs/project/` | 愿景、实际能力和计划的公开摘要 |
| `docs/.vitepress/config.mjs` | base、导航、侧栏、本地搜索与中文 UI |
| `docs/.vitepress/theme/` | 默认主题扩展与首页能力路径 |
| `package.json` / `package-lock.json` | 文档专用依赖，与 `gui/` 分离 |
| `.github/workflows/docs.yml` | PR 构建检查和 master 部署 |

Markdown 与导航配置中的链接使用 `/guide/...` 这样的站内路径，让 VitePress 自动添加 base。Vue 组件中的链接用 `withBase()` 并保留目标 `.html` 后缀，兼容静态托管与新标签页打开。新增页面后同步侧栏并运行生产构建；坏的 Markdown 内部链接会阻止构建，自定义组件链接需额外核对正式产物。

VitePress 固定为稳定版 1.6.4。根包通过 `overrides` 将间接依赖 Vite 更新到 `^6.4.3`，修复旧开发服务器依赖的已知漏洞；调整此覆盖时须重新构建并核对搜索与预览。

## GitHub Actions

- **Pull request**：构建与检查文档，不部署。文档、根依赖或 workflow 变化时触发。
- **master / dev push**：构建文档；只有公开仓库 `Chelase/deploystrap-docs` 的 `master` 上传 Pages artifact 并部署。
- **手动触发**：任何分支可构建，部署仍需满足公开文档仓库与 `master` 两项条件。

构建 job 只有 `contents: read`；部署 job 另授予 `pages: write` 与 `id-token: write`。无需配置自定义部署 token。

公开文档仓库使用 **Settings → Pages → Build and deployment → Source → GitHub Actions**。文档源码推送到其 `master` 后自动部署。

原项目 `Chelase/deploystrap` 为私有，当前账户套餐不支持其 Pages（2026-10-20，GitHub API 返回 422）。经授权公开文档后，文档单独发布到公开仓库 [deploystrap-docs](https://github.com/Chelase/deploystrap-docs)，不复制应用代码、内部规则或本机配置。仓库内部源码链接对未授权访客仍不可访问。参见 [GitHub Pages 使用范围](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)。

文档地址：[chelase.github.io/deploystrap-docs](https://chelase.github.io/deploystrap-docs/)。部署结果见[公开文档 Actions](https://github.com/Chelase/deploystrap-docs/actions)。

## 同步公开文档

原项目是内容维护来源；公开仓库是独立发布快照，不会自动读取私有源码。更新后只同步 `docs/` 中的文档源码与公共资产、根 `package.json` / `package-lock.json` / `.node-version`，以及 `.github/workflows/docs.yml`，再提交到公开仓库 `master`。不复制 `node_modules`、VitePress 缓存／产物、`.envrc`、`.agent-rules` 或应用源码。整个流程无需向 Actions 配置私有仓库 token。

## 内容更新规则

愿景以 `.agent-rules/rules/product-vision.md` 为准；计划以 `.agent-rules/dev-plans/aoc-installer-plan.md` 为准；能力判断核对当前源码。公开页面不直接发布 `.agent-rules/`，也不自动收录含旧描述的根文档。

更新产品进展时，同时核对公开的「当前能力与验证」和根 `DEVELOPMENT-PROGRESS.md`。历史测试保留实际日期，未执行的检查不能写成通过。

部署机制参考 [VitePress 部署指南](https://vitepress.dev/guide/deploy)与 [GitHub Pages 自定义 workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
