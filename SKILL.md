---
name: ai-visual-director
description: One-click AI visual director system — Story Production OS. Turn any story into a complete video generation package. Governance: command-gate, format-contract (19 output types), lock-state, prompt-qc (6-dim), aesthetic-director, state-commit. State registry: 13 files (variable-registry, asset-map, shot-state, dialogue-map, sound-map, prompt-contract, project-graph, continuity-state, continuity-snapshot, visual-control-state, format-contract-state, lock-state, command-context, state-commit-log). Project persistence via project-manager. Dependency graph via project-graph (entity↔shot bidirectional index). 5-dim consistency engine (Character/Scene/Style/Story/Video RM). Style memory (project-level lock + cross-chapter inheritance). Director imitation library (Wong Kar-wai / Villeneuve / Nolan / Ghibli / Pixar / Zhang Yimou, 9-dim). Standardized routing (/create /source /storyboard /character /scene /dialogue /sound /video /lock /commit; /avd/* namespaced aliases supported). 12-item video QC + 6-dim prompt QC. Visual density controller. D类能力 (fusion/multi-version/style-migration/director-imitation/series/mood-slider) explore模式才开放. Default: /create standard, output=draft, user confirms→lock/commit.
---

# AI Visual Director Skill

AI 电视剧 / 漫剧 / 短剧 / 电影视觉导演系统。将任意故事转化为角色卡、场景图、分镜图、视频 Prompt 和可执行视频生成包。

## 9 个核心入口

| 入口 | 定位 | Skill 文件 |
|------|------|-----------|
| `/create`（别名 `/avd/create`） | 一键总编排 — 故事→完整视频执行包 | `sub-skills/create/SKILL.md` |
| `/source`（别名 `/avd/source`） | 输入源 — Obsidian/Markdown/粘贴/批处理 | `sub-skills/source/SKILL.md` |
| `/storyboard`（别名 `/avd/storyboard`） | 分镜 — 全案板、分镜图、镜头设计 | `sub-skills/storyboard/SKILL.md` |
| `/character`（别名 `/avd/character`） | 角色卡 — 三视图/表情/服装武器/DNA | `sub-skills/character/SKILL.md` |
| `/scene`（别名 `/avd/scene`） | 场景图 — 参考图/全景/空间锁定 | `sub-skills/scene/SKILL.md` |
| `/dialogue` | 台词设计 — 台词脚本/节奏标注/字幕 | `engines/dialogue-engine.md` |
| `/sound` | 音效设计 — 环境音/拟音/音乐/混响 | `engines/sound-engine.md` |
| `/video`（别名 `/avd/video`） | 视频执行包 — 5平台 Prompt + 参考图方案 | `sub-skills/video/SKILL.md` |
| `/compact`（别名 `/avd/compact`） | Token 压缩 — Prompt压缩/上下文管理/去噪 | `sub-skills/compact/SKILL.md` |

**兼容入口**：裸命令是默认对外入口，`/avd/*` 是命名空间别名；`/style`/`/avd/style` 和 `/poster`/`/avd/poster` 继续可用。**治理入口**：`/lock` `/commit` `/unlock` `/check`。

`/create` 不替代 `/storyboard`、`/character`、`/scene`。它只在一键总编排中按档位调用三条核心资产子链：

```text
/storyboard 核心资产：故事板
/character  核心资产：角色卡
/scene      核心资产：场景图
```

## 治理系统

### 能力分层

| 层级 | 说明 | 默认状态 |
|------|------|---------|
| **A 类** 稳定层 | format-contract, lock-state, prompt-qc, auto-repair | 所有命令必走 |
| **B 类** 资产层 | /character, /scene, /storyboard, /video, /dialogue, /sound | 按命令调用 |
| **C 类** 导演增强层 | video-director, shot-budget, motion-physics, emotion-curve, color-narrative | project 模式默认开 |
| **D 类** 发散探索层 | fusion, multi-version, style-migration, director-imitation, series, mood-slider | 默认关闭，用户触发才开 |

### 状态写回

```
生成 → draft（默认，不写回主状态）
确认 → locked（写入 lock-state.md，不允许自动修改）
提交 → committed（写回 variable-registry.md + 持久化）
```

### 治理文件速查

| 文件 | 职责 |
|------|------|
| `engines/command-gate.md` | 命令闸门：模式+权限表+写回策略 |
| `rules/format-contract.md` | 格式合同：19种输出类型格式约束 |
| `rules/prompt-qc.md` | 6维度 Prompt 质量检查 |
| `rules/qc.md` | 冲突检测 + 视频负面词 + 12项检查清单 |
| `rules/numbering.md` | 19种编号体系自动填充规则 |
| `engines/aesthetic-director.md` | 口语审美→结构化转译 |
| `engines/state-commit.md` | /lock /commit /unlock /check 处理 |
| `templates/steps.md` | Step 1-4 完整工作流 + 跨段衔接 + API 生成 |

## 默认总路由

普通故事输入默认走 `/create`（或 `/avd/create`）编排链路：

```text
角色卡（谁） + 场景图（在哪） + 分镜图（怎么拍） -> 视频 Prompt / 执行包
```

```text
task-router → sources/ → story-intake → shot-budget → video-director
  → asset-plan → consistency-trigger → visual-density-controller
  → reference-anchor → motion-physics → project-graph
  → video-prompt-assembly → consistency-engine → prompt-scorer
  → final-video-qc → auto-repair → render-package
```

**基础能力子路由**：`/character` `/scene` `/storyboard` 三条标准子链，全部接 state/ + asset-map + QC。详见 `engines/task-router.md`。

**核心能力**：53 视觉风格 × 44 版式样式 × 7 场景一致性方法 × 8 角色一致性方法 × 5 视频平台 × 36 跨段衔接技法 × 19 编号体系。Step 1-4 完整流程见 `templates/steps.md`。

## 模块路由表

| 模块 | 内容 | 文件 |
|------|------|------|
| **总路由** | 核心入口 / 治理 / 总路由 / 负面清单 | `SKILL.md`（本文件） |
| **编号规则** | VS/EC/CN/CP/ME/BL/EV/WT/MT/CR/PR/HE/TR/SD/SE/FX/MU/RS/DR | `rules/numbering.md` |
| **QC & 冲突** | 冲突检测 / 视频负面词 / 12项检查 | `rules/qc.md` |
| **Step 指南** | Step 1-4 流程 / 53风格引擎 / 36衔接技法 / API 生成 | `templates/steps.md` |
| **角色模块** | 8 一致性方法 / 角色卡模板 / DNA 20字段 | `sub-skills/character/SKILL.md` |
| **场景模块** | 7 一致性方法 / 场景图模板 / 空间锁定 | `sub-skills/scene/SKILL.md` |
| **分镜模块** | 全案板/分镜图 / LS版式 / 13步流水线 | `sub-skills/storyboard/SKILL.md` |
| **视频模块** | 5梯度流程 / 5平台 / 跨段衔接 / API | `sub-skills/video/SKILL.md` |
| **海报模块** | 10风格 × 3画幅 / 海报模板 | `sub-skills/poster/SKILL.md` |
| **风格模块** | 53风格浏览 / 融合 / 迁移 / 14导演模仿 | `sub-skills/style/SKILL.md` |
| **输入源** | Obsidian / Markdown / 粘贴 / 批处理 | `sub-skills/source/SKILL.md` |
| **一键生成** | fast/standard/full 三档 / 模板强制 | `sub-skills/create/SKILL.md` |
| **Token压缩** | Prompt压缩 / 上下文管理 / 去噪 | `sub-skills/compact/SKILL.md` |

## 关键参考文件

| 文件 | 内容 |
|------|------|
| `templates/full-board.md` | 全案板模板（5模块/11参数/每张≤4帧） |
| `templates/quick-board.md` | 分镜图模板（LS5/LS6/LS7/11参数基线） |
| `templates/character-sheet.md` | 角色卡模板（6模块/变量编号） |
| `templates/scene-card.md` | 场景图模板（LS版式决策表/变量编号） |
| `templates/poster.md` | 海报模板（10风格×3画幅） |
| `templates/steps.md` | Step 1-4 完整工作流指南 |
| `rules/format-contract.md` | 19种输出类型格式合同 |
| `rules/numbering.md` | 19种编号体系自动填充规则 |
| `rules/qc.md` | 冲突检测 + 视频QC |
| `rules/prompt-qc.md` | 6维度 Prompt 质量检查 |
| `rules/final-video-qc.md` | 12项视频执行包质检 |
| `rules/character-consistency.md` | 8种角色一致性方法 |
| `rules/scene-consistency.md` | 7种场景一致性方法 |
| `engines/task-router.md` | 命令路由引擎（主链+子链） |
| `engines/video-director.md` | 导演决策引擎（镜数/高潮/情绪曲线） |

## 全局负面清单

所有输出必须包含（专属负面词见 `rules/negative-prompt.md`）：

```
no watermark, no logo, no random large text, no garbled Chinese, no broken faces,
no duplicated limbs, no messy panels, no low-quality collage, no text overlay,
no speech bubbles (unless manga format), no cartoon style (unless specified),
no flat illustration, no marketing poster style
```
