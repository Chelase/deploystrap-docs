# 凭证与加密

“上下文随身”的核心要求是安全携带个人配置与凭证。产品愿景要求涉及私钥和凭证的载体强制加密；当前已有能力是 OpenClaw 的 AES-256-GCM 加密备份，通用个人档案尚未实现。

## 当前应该怎样携带凭证

使用 CLI 时，显式选择 legacy 引擎并开启加密：

```sh
deploystrap backup --engine legacy --root "D:/data/.openclaw" --encrypt --output ./context.zip.enc
```

当前 legacy 规则为：普通备份默认排除 `credentials/`，加密备份默认包含，可用 `--exclude-credentials` 排除。请勿使用 `--include-credentials` 制作明文凭证归档；现有显式参数并未完整实现愿景中的强制加密约束。

官方引擎不支持 Deploystrap 的 AES 整包加密。给 official 引擎传递加密选项或密码会报错，避免静默生成未加密备份。

## 密码来源

CLI 按以下顺序获取密码：

1. `--password` 参数。
2. `DEPLOYSTRAP_PASSWORD` 环境变量。
3. 交互提示；创建备份时二次确认。

日常操作推荐使用交互提示，避免密码进入命令历史。自动化运行时按运行环境的 secret 管理方式注入环境变量。拿不到密码时，加密操作报错。

## 格式与兼容

- 使用 AES-256-GCM 整包加密，口令通过 PBKDF2-HMAC-SHA256 派生密钥。
- CLI 与桌面端共享相同的字节容器，可跨端恢复。
- CLI 以 `.enc` 后缀识别加密归档；桌面端依据内容结构识别。
- 密文不是标准 ZIP，通用解压工具不能直接打开。

当前容器没有版本字段，也不记录 KDF 轮次。修改加密参数需要同时处理两端和旧归档兼容，不能只改一处常量。

## 验证边界

`verify` 的归档完整性通过，不代表新机器上的模型账户、网络通道或工具认证可用。恢复之后还应进行实际工具启动和账户验证。

有关现有容器及落盘链路的实现细节，见仓库[加密机制](https://github.com/Chelase/deploystrap/blob/master/.agent-rules/mechanisms/backup-encryption.md)。
