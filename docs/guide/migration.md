# 备份与恢复

当前迁移能力面向 **OpenClaw 实例**。通用 Agent 配置、全局规则与 prompts 的个人档案仍属产品规划。

## 先选择引擎

CLI 的 `--engine` 可选 `auto`（默认）、`official`、`legacy`。

| 场景 | 引擎与格式 | 边界 |
| --- | --- | --- |
| 已安装 OpenClaw CLI 的默认备份 | `auto` 优先调用官方，产出 `.tar.gz` | 不提供 Deploystrap AES 加密 |
| 需要加密归档或 CLI ↔ GUI 互通 | 显式 `--engine legacy`，产出 ZIP / `.enc` | 使用 Deploystrap 自有容器 |
| 恢复官方归档 | `auto` 按归档类型选择官方 | 需要 OpenClaw CLI 和空的暂存目录 |

桌面端使用独立的 ZIP 实现，不参与 CLI 双引擎分派。

## 创建加密备份

显式指定实例路径与 legacy 引擎，避免默认引擎随本机环境变化。以下示例中的路径需替换成你的实际路径：

```sh
deploystrap backup --engine legacy --root "D:/data/.openclaw" --encrypt --output ./context.zip.enc
```

按提示输入并确认密码。加密备份默认包含 `credentials/`；不希望携带凭证时加上 `--exclude-credentials`。

```sh
deploystrap backup --engine legacy --root "D:/data/.openclaw" --encrypt --exclude-credentials --output ./context.zip.enc
```

日志默认排除，使用 `--include-logs` 可显式包含。备份前建议暂停业务写入，减少归档期间文件变化。

## 检查归档

```sh
deploystrap list ./context.zip.enc --detailed
deploystrap verify ./context.zip.enc
```

加密归档会提示输入密码。`list` 支持自有 ZIP / `.enc`，官方 `.tar.gz` 的完整性检查使用 `verify`。

## 恢复到新目录

```sh
deploystrap restore ./context.zip.enc --engine legacy --target ./restored-openclaw --verify
```

先检查文件、配置和校验结果，再决定如何切换到正式实例。建议始终恢复到空目录；`--merge` 会允许写入已有目录，同名文件可能被覆盖。

::: warning 已知限制：跳过既有文件
当前 `--skip-existing` 虽已出现在 CLI 参数中，但没有传入解压器，不能保证保留同名文件。请使用新的空目标目录。该问题来自本次源码盘点，尚未修复。
:::

官方归档使用以下方式暂存，目标必须为空目录：

```sh
deploystrap restore ./openclaw-backup.tar.gz --engine official --target ./staged-openclaw
```

官方恢复不会自动把暂存目录提升为正在使用的 `~/.openclaw`。

## Gateway 与互通

CLI 的备份和恢复默认保持 Gateway 运行；需要停服时显式使用 `--stop-gateway`。停服会打断活跃实例，应在合适的时间执行。

CLI 与桌面端共享加密容器格式，但 CLI 通过 `.enc` 后缀识别加密归档。把桌面端加密归档交给 CLI 使用时，确保文件名以 `.enc` 结尾。参见[凭证与加密](./security)。
