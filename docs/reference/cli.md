# CLI 命令与引擎

本页按当前 `src/cli.rs` 与调用实现整理。版本为 **v0.1.0**，实际参数可通过以下命令查询：

```sh
deploystrap --help
deploystrap backup --help
```

## 命令概览

| 命令 | 用途 |
| --- | --- |
| `backup` | 备份 OpenClaw 实例 |
| `restore <backup_file>` | 从归档恢复 |
| `verify <backup_file>` | 校验归档，按类型分派引擎 |
| `list <backup_file>` | 列出自有 ZIP / `.enc` 归档内容 |
| `uninstall` | 卸载实例，具有真实删除行为 |

全局选项：`-v, --verbose`、`-q, --quiet`、`-l, --log <path>`。当前工具链安装通过桌面端操作。

## backup

```sh
deploystrap backup --engine legacy --root "D:/data/.openclaw" --encrypt --output ./context.zip.enc
```

| 参数 | 作用 |
| --- | --- |
| `-o, --output <path>` | 输出路径，默认 `openclaw-backup.zip`；官方引擎会调整为其归档格式 |
| `--root <path>` | 显式实例根目录，优先于 profile |
| `--profile <name>` | 选择 `~/.openclaw-<name>` |
| `--engine auto\|official\|legacy` | 默认 `auto`，备份时优先使用可用的官方 CLI |
| `--encrypt` | 自有引擎整包加密 |
| `--password <password>` | 传入密码，同时隐含开启加密；也支持环境变量和提示输入 |
| `--include-credentials` / `--exclude-credentials` | 显式包含／排除凭证；两者互斥，包含凭证时应使用加密 |
| `--include-logs` | 包含日志；默认排除 |
| `--exclude-outputs` | 排除输出目录 |
| `--compress fast\|normal\|max` | 自有引擎压缩级别，默认 `normal` |
| `--stop-gateway` | 显式停止 Gateway，默认保持运行 |
| `--then-uninstall` | 备份完成后进入卸载流程 |

ZIP 扫描、压缩和 AES 参数属于 legacy 能力。需要这些行为时应显式指定 legacy，官方引擎不提供同等参数契约。

## restore

```sh
deploystrap restore ./context.zip.enc --target ./restored-openclaw --verify
```

| 参数 | 作用 |
| --- | --- |
| `-t, --target <path>` | 恢复目录；官方引擎必须指定空的暂存目录 |
| `--engine auto\|official\|legacy` | `auto` 根据归档类型分派 |
| `--merge` | 合并到已有目标目录 |
| `--skip-existing` | 已暴露参数，但未接入解压器，不能保证保留既有文件；请恢复到空目录 |
| `--verify` | 自有引擎恢复后校验 |
| `--password <password>` | 解密密码，也可通过环境变量或提示输入 |
| `--stop-gateway` | 显式停止 Gateway |

官方恢复只提供暂存，不自动切换活跃实例。

## verify 与 list

```sh
deploystrap verify ./context.zip.enc
deploystrap list ./context.zip.enc --detailed
deploystrap verify ./openclaw-backup.tar.gz
```

两者均接受 `--password`，加密归档缺少密码时提示输入。`list` 的 `-d, --detailed` 显示详细内容。

官方归档的 `verify` 依赖本机 OpenClaw CLI；`list` 不支持官方 `.tar.gz`。

## uninstall

::: warning 卸载语义取决于引擎
`auto` 在官方 CLI 可用时优先调用 `openclaw uninstall --all`；Light / Standard / Deep 分级属于 legacy 路径。需要分级删除时必须显式选择 `--engine legacy`。
:::

| 参数 | 作用 |
| --- | --- |
| `--root <path>` / `--profile <name>` | 选择实例 |
| `--engine auto\|official\|legacy` | 选择卸载路径；官方失败后仍可能回退 legacy，并显示告警 |
| `--level light\|standard\|deep` | legacy 分级，默认 `standard` |
| `--backup-first` | 卸载前备份 |
| `--backup-path <path>` | 自定义卸载前备份路径，需要 `--backup-first` |
| `--recycle` | 使用回收站，默认开启 |
| `--no-recycle` | 覆盖默认值，改为直接删除 |
| `--yes` | 跳过确认 |
| `--no-backup-prompt` | 跳过备份提示 |
| `--purge-outputs` | 额外删除从配置读取的产物目录 |

执行前先确认目标路径、备份和引擎。回收站与分级选项描述的是 legacy 清理行为。
