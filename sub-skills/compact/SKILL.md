---
name: avd/compact
description: 【AI视觉导演】Token压缩 — Prompt压缩/上下文管理/去噪，控制 token 消耗
---

# Compact — Token 压缩 & 上下文管理

控制 token 消耗。压缩 prompt 到平台限制、清理上下文、视觉去噪。

## 触发方式

- `/avd/compact` — 展示压缩选项
- `/avd/compact prompt` — 压缩当前 prompt
- `/avd/compact context` — 压缩会话上下文
- `/avd/compact declutter` — 视觉去噪（等同 `/declutter`）

## ⚠️ 路由规则

| 用户说法 | 行为 |
|---------|------|
| `/avd/compact`（未指定） | **展示压缩选项**：压缩 prompt / 压缩上下文 / 去噪 |
| `/avd/compact prompt` / `压缩 prompt` | 调用 `engines/prompt-compression.md`，压缩到平台最佳长度 |
| `/avd/compact context` / `压缩上下文` | 精简当前对话上下文，保留关键 DNA 和锚点 |
| `/avd/compact declutter` / `去噪` | 调用 `engines/prompt-declutter.md`，清理随机网格/伪UI/微文字/过量粒子 |

## 相关引擎

| 引擎 | 说明 |
|------|------|
| `engines/prompt-compression.md` | Prompt 压缩引擎（适配 MJ/SD/可灵 长度限制） |
| `engines/prompt-declutter.md` | 画面去噪引擎（清理视觉噪声，保留角色DNA和场景锚点） |
| `engines/visual-density-controller.md` | 视觉密度控制（按输出类型自动设密度/背景/HUD/粒子/文字） |

## 输出格式

压缩后输出变更摘要：
```
📦 压缩结果：
  原始字数：[N] → 压缩后字数：[M]（压缩率 [X]%）
  平台限制：[PLATFORM_MAX] 字
  保留项：角色DNA / 场景锚点 / 运镜参数 / 转场标注
  裁切项：[具体裁切内容]
```
