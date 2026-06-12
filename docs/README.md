# AI Visual Director Docs

AI Visual Director 的文档只保留权威入口。旧方案、重复说明和历史草案已移除，避免 LLM 在执行时读取到冲突口径。

这套 skill 的定位是受控 AI 视觉生产系统：

```text
稳定理解需求
锁定格式、状态与资产用途
按命令边界调用导演能力
输出可复制、可检查、可迭代的 prompt package
```

## 权威文档

| 文档 | 用途 |
|------|------|
| [`usage.md`](usage.md) | 使用手册：命令入口、`/create` 档位、状态写回 |
| [`capabilities.md`](capabilities.md) | 能力白皮书：能力分层、调用边界、默认开关、资产用途 |
| [`testing.md`](testing.md) | 测试手册：治理层、核心命令、输出质量、高级能力 |

## 运行记录

| 文档 | 用途 |
|------|------|
| [`failure-log.md`](failure-log.md) | 失败样本记录，用于 prompt-qc、auto-repair 和规则回流 |

## 阅读顺序

```text
usage.md        先知道怎么用
capabilities.md 再知道能力边界
testing.md      最后知道怎么证明它稳定
```
