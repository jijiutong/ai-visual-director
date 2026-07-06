---
name: ai-visual-director
description: "AI视觉导演主控路由。用于 /create /avd/create 故事到视频、角色卡、场景图、故事板、分镜图、视频 Prompt、海报、Prompt QC、状态锁定和子技能分发。普通故事默认 /create standard。"
---

# AI Visual Director — 主控路由

这是给 agent 执行用的主 Skill，不是产品 README。README 负责介绍、安装和能力展示；本文件只定义触发、路由、必读文件和执行约束。

## 触发条件

当用户提出以下任一需求时，使用本 Skill：

- 把故事、剧本、小说片段、分镜想法转成可执行视觉方案
- 生成角色卡、场景图、故事板、分镜图、视频 Prompt、海报或执行包
- 使用 `/create` `/source` `/storyboard` `/character` `/scene` `/video` `/style` `/poster`
- 使用 `/avd/*` 命名空间命令
- 要求进行角色一致性、场景一致性、参考图锚定、视频平台适配或 Prompt QC

## 默认行为

如果用户只粘贴故事或说“一键生成/直接出/auto”，默认路由到：

```text
/create standard
```

默认输出状态为 `draft`。只有用户明确确认、锁定或提交时，才写回项目状态：

```text
draft -> locked -> committed
```

## 命令路由

| 用户意图 | 路由 | 必读文件 |
|---|---|---|
| 一键故事到视频包 | `/create` 或 `/avd/create` | `sub-skills/create/SKILL.md` |
| 读取 Obsidian/Markdown/粘贴/批处理 | `/source` 或 `/avd/source` | `sub-skills/source/SKILL.md` |
| 角色外观、表情、服装、DNA、一致性 | `/character` 或 `/avd/character` | `sub-skills/character/SKILL.md` |
| 场景空间、光照、材质、地理关系 | `/scene` 或 `/avd/scene` | `sub-skills/scene/SKILL.md` |
| 故事板、分镜图、镜头设计、全案板 | `/storyboard` 或 `/avd/storyboard` | `sub-skills/storyboard/SKILL.md` |
| 视频 Prompt、首尾帧、平台参数、拆段 | `/video` 或 `/avd/video` | `sub-skills/video/SKILL.md` |
| 风格浏览、融合、迁移、导演方法参考 | `/style` 或 `/avd/style` | `sub-skills/style/SKILL.md` |
| 独立海报、封面、营销视觉 | `/poster` 或 `/avd/poster` | `sub-skills/poster/SKILL.md` |
| 台词、字幕、口型节奏 | `/dialogue` | `engines/dialogue-engine.md` |
| 环境音、拟音、音乐、混响 | `/sound` | `engines/sound-engine.md` |
| 锁定、提交、解锁、检查状态 | `/lock` `/commit` `/unlock` `/check` | `engines/state-commit.md` |

先读路由目标文件，再按该文件继续读取模板、规则和引擎。不要只凭本文件生成最终资产。

`/create` 不替代 `/storyboard`、`/character`、`/scene`；它只在一键总编排中按模式调度三条核心资产子链。

```text
/storyboard 核心资产：故事板
/character  核心资产：角色卡
/scene      核心资产：场景图
```

## 主执行链

`/create` 是默认总编排链，按需调度角色、场景、分镜和视频模块。具体步骤以 `sub-skills/create/SKILL.md` 的执行链路为权威，本文件只列主控边界：

```text
engines/command-gate.md
-> sub-skills/create/SKILL.md
-> rules/format-contract.md
-> rules/prompt-qc.md
-> rules/final-video-qc.md
-> engines/state-commit.md
```

## 必须遵守

- 输出资产前必须读取对应子 Skill 和模板文件。
- 格式边界以 `rules/format-contract.md` 为准。
- 编号体系以 `rules/numbering.md` 为准。
- 视频负面词和质量检查以 `rules/qc.md`、`rules/final-video-qc.md`、`rules/prompt-qc.md` 为准。
- 角色一致性以 `rules/character-consistency.md` 为准。
- 场景一致性以 `rules/scene-consistency.md` 为准。
- 默认参数以 `rules/one-click-defaults.md` 和 `api-config.template.env` 为准。
- 用户没有确认时，不写回 `state/` 主状态；允许在输出中生成 draft 状态块或执行清单。

## 模板读取规则

| 输出类型 | 必读模板 |
|---|---|
| 角色卡 | `templates/character-sheet.md` |
| 场景图 | `templates/scene-card.md` |
| 全案板 | `templates/full-board.md` |
| 分镜图 | `templates/quick-board.md` |
| 海报 | `templates/poster.md` |
| 台词脚本 | `templates/dialogue-script.md` |
| 声音设计 | `templates/sound-design-sheet.md` |

模板是输出结构的权威源。模板内已有的模块数、参数数、版式编号和禁止项，不要在本文件重复维护。

## 能力分层

| 层级 | 内容 | 默认策略 |
|---|---|---|
| A 稳定治理层 | command-gate、format-contract、lock-state、prompt-qc、auto-repair | 所有命令必走 |
| B 资产生产层 | character、scene、storyboard、video、dialogue、sound、poster | 按用户意图调用 |
| C 导演增强层 | shot-budget、video-director、motion-physics、emotion-curve、color-narrative | project/standard/full 默认可用 |
| D 探索发散层 | fusion、multi-version、style-migration、director-imitation、series、mood-slider | 用户明确要求才启用 |

## 写回策略

| 状态 | 触发 | 行为 |
|---|---|---|
| `draft` | 默认生成 | 只输出草稿、状态块或执行清单，不改 `state/` 主状态文件 |
| `locked` | 用户确认锁定 | 写入 `state/lock-state.md`，禁止自动覆盖 |
| `committed` | 用户确认提交 | 写回 `state/variable-registry.md`、`state/asset-map.md`、`state/project-graph.md` 等持久状态 |

涉及状态变更时，先读 `engines/state-commit.md` 和相关 `state/*.md`。

## 禁止事项

- 禁止把 README 的安装说明、营销文案、能力展示复制进本文件。
- 禁止不读子 Skill 或模板，直接凭记忆输出角色卡、场景图、故事板或视频 Prompt。
- 禁止把全案板和分镜图混为同一种输出；先用 `rules/format-contract.md` 判断 `output_type`。
- 禁止默认开启 D 类探索能力，除非用户明确要求发散、多版本、融合、迁移或导演模仿。
- 禁止在用户未确认时覆盖已 locked/committed 的状态。
- 禁止输出未经过 Prompt QC、格式合同和视频 QC 的最终执行包。

## 全局负面清单

所有图像/视频 Prompt 必须按需合并 `rules/negative-prompt.md`，并至少包含：

```text
no watermark, no logo, no random large text, no garbled Chinese, no broken faces,
no duplicated limbs, no messy panels, no low-quality collage, no text overlay,
no speech bubbles (unless manga format), no cartoon style (unless specified),
no flat illustration, no marketing poster style
```
