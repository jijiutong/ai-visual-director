# AI Visual Director 能力白皮书

本文是当前权威能力文档。它不是宣传清单，而是系统能力边界说明：哪些能力永远参与稳定性，哪些能力按命令参与生产，哪些能力只在用户明确要求时才开放。

一句话：

```text
能力全保留，默认权力被收敛。
```

## 一、系统能力模型

AI Visual Director 采用四层能力模型：

| 层级 | 名称 | 默认状态 | 作用 |
|------|------|----------|------|
| A | 稳定治理层 | always on | 路由、格式、锁定、模板、QC、修复 |
| B | 资产生产层 | command-based | 角色、场景、分镜、视频、台词、音效、海报 |
| C | 导演增强层 | project only | 镜头、节奏、情绪、灯光、色彩、运动 |
| D | 探索发散层 | explicit only | 多版本、风格融合、导演模仿、续写、迁移 |

## 二、A 类：稳定治理层

| 能力 | 文件建议 | 状态 | 职责 |
|------|----------|------|------|
| 意图路由 | `engines/task-router.md` | 已有 | 判断命令入口 |
| 命令闸门 | `engines/command-gate.md` | 已有 | 输出 must_use / may_use / forbidden_use |
| 模式选择 | `engines/command-gate.md` | 已有 | stable / project / explore / repair |
| 格式合同 | `rules/format-contract.md` | 已有 | 锁画幅、模块、文字、边框、用途 |
| 锁定状态 | `state/lock-state.md` | 已有 | 记录不可变字段 |
| 视觉控制 | `state/visual-control-state.md` | 已有 | 控制密度、HUD、粒子、文字 |
| prompt QC | `rules/prompt-qc.md` | 已有 | 所有 prompt 的基础质量检查 |
| 自动修复 | `engines/auto-repair.md` | 已有 | 只修错误，不重做方向 |

这层决定系统稳不稳。没有 A 层，后面的导演能力越强，越容易漂。

## 三、B 类：资产生产层

### `/character`

| 项 | 说明 |
|----|------|
| 目标 | 角色卡、三视图、人物模板、人像 prompt |
| 主要文件 | `templates/character-sheet.md`, `rules/character-consistency.md`, `knowledge/character-dna.md` |
| 必走 | format-contract, lock-state read, character-sheet, prompt-qc |
| 可用 | aesthetic-director, portrait-quality, negative-prompt, visual-control |
| 默认禁用 | sound-engine, series, fusion, multi-version, style-migration |
| 写回 | 默认 draft；用户 `/lock` 或 `/commit` 后写回 |

### `/scene`

| 项 | 说明 |
|----|------|
| 目标 | 场景卡、空间锚点、材质、光照 |
| 主要文件 | `templates/scene-card.md`, `rules/scene-consistency.md`, `knowledge/environments.md`, `knowledge/lighting.md` |
| 必走 | format-contract, lock-state read, scene-card, prompt-qc |
| 可用 | materials, weather, environment, visual-control |
| 默认禁用 | 角色脸重写、剧情续写、音效台词、多版本 |
| 写回 | 默认 draft；用户确认后 lock/commit |

### `/storyboard`

| 项 | 说明 |
|----|------|
| 目标 | 镜头表、分镜图、全案板、shot-state |
| 主要文件 | `engines/shot-budget.md`, `engines/video-director.md`, `templates/full-board.md`, `templates/quick-board.md` |
| 必走 | story-intake, shot-budget, video-director, format-contract, continuity check |
| 可用 | motion-physics, emotion-curve, pacing, color-narrative |
| 默认禁用 | 角色 DNA 重写、场景核心重写 |
| 写回 | shot-state 可写 draft；锁定角色/场景不得被覆盖 |

### `/video`

| 项 | 说明 |
|----|------|
| 目标 | 视频 prompt、平台执行包、参考图引用 |
| 主要文件 | `engines/video-prompt-assembly.md`, `state/asset-map.md`, `state/shot-state.md` |
| 必走 | asset-map read, shot-state read, platform-config, video-qc |
| 可用 | dialogue-map, sound-map, prompt-compression |
| 默认禁用 | 重新生成角色卡、重新生成场景图、改变故事方向 |
| 写回 | 不写角色/场景主状态 |

### `/dialogue`

| 项 | 说明 |
|----|------|
| 目标 | 台词脚本、节奏、字幕、口型同步 |
| 主要文件 | `engines/dialogue-engine.md`, `templates/dialogue-script.md`, `state/dialogue-map.md` |
| 默认启用 | `/create full` 或用户明确要台词 |
| 默认禁用 | `/create standard` 可不强制完整台词设计 |

### `/sound`

| 项 | 说明 |
|----|------|
| 目标 | 环境音、拟音、音乐、混响 |
| 主要文件 | `engines/sound-engine.md`, `templates/sound-design-sheet.md`, `state/sound-map.md` |
| 默认启用 | `/create full` 或用户明确要音效 |
| 默认禁用 | 普通角色/场景/海报命令 |

### `/poster`

| 项 | 说明 |
|----|------|
| 目标 | 海报、封面、营销视觉 |
| 主要文件 | `templates/poster.md`, `sub-skills/poster/SKILL.md` |
| 默认用途 | `marketing_asset` |
| video_safe | `false` |
| 禁止 | 进入视频 @图 |

## 四、C 类：导演增强层

导演增强层负责“好看、电影感、节奏感”，但不能覆盖 A 层和 B 层的锁定结果。

| 能力 | 文件 | 默认 | 调用条件 |
|------|------|------|----------|
| 镜头预算 | `engines/shot-budget.md` | `/create`, `/storyboard` | 需要镜头/视频 |
| 导演决策 | `engines/video-director.md` | `/create`, `/storyboard` | 需要镜头调度 |
| 运动物理 | `engines/motion-physics.md` | video/storyboard | 有人物/镜头运动 |
| 情绪曲线 | `engines/emotion-curve.md` | project | 需要剧情节奏 |
| 节奏控制 | `engines/pacing.md` | project | 镜头密度需要判断 |
| 色彩叙事 | `engines/color-narrative.md` | project | 全案/分镜/视频 |
| 视觉密度 | `engines/visual-density-controller.md` | image/video prompts | 所有视觉输出 |
| 去噪 | `engines/prompt-declutter.md` | repair | 用户要求或 QC 触发 |

## 五、D 类：发散探索层

这些能力默认关闭。

它们适合探索，不适合默认生产。输出默认是 `derived`，除非用户 `/commit`。

| 能力 | 文件 | 触发条件 | 写回 |
|------|------|----------|------|
| 风格融合 | `engines/fusion.md` | 用户说融合/A+B | derived |
| 多版本 | `engines/multi-version.md` | 用户说多版本/A-B-C | derived |
| 风格迁移 | `engines/style-migration.md` | 用户说换风格/迁移 | derived，commit 后写回 |
| 导演模仿 | `imitation/*` | 用户点名导演/作品方法 | derived |
| 系列续写 | `engines/series.md` | 用户说续写/下一集 | project，读取 continuity |
| 批量章节 | `engines/batch-chapter.md` | Obsidian/批量章节 | project |
| Mood 滑块 | `engines/mood-slider.md` | 用户说更燃/更甜/更虐 | derived 或 draft |

## 六、资产用途分层

| 用途 | 说明 | 是否可进视频 |
|------|------|--------------|
| `display_asset` | 给人看的展示板、全案板、导演板 | 否 |
| `video_asset` | 给视频模型吃的干净参考图 | 是 |
| `consistency_asset` | 角色/场景一致性锚点 | 是 |
| `marketing_asset` | 海报、封面、宣传图 | 否 |

硬规则：

```text
display_asset 不得进入 video prompt
marketing_asset 不得进入 video prompt
video_asset 必须无文字、无边框、低噪点、主体清楚
full-board 默认是 display_asset，若给视频用必须派生 clean keyframes
```

## 七、状态写回

状态写回是防止 LLM 记忆污染的核心。

| 状态 | 说明 | 写回权限 |
|------|------|----------|
| `draft` | 普通生成草稿 | 不覆盖主状态 |
| `derived` | 多版本/风格探索 | 不覆盖主状态 |
| `locked` | 用户锁定 | 保护，不可自动改 |
| `committed` | 用户确认采用 | 写入主状态 |

## 八、知识库地位

`knowledge/` 是候选素材库，不是默认决策者。

允许提供：

```text
镜头、灯光、构图、表情、服装、材质、天气、声音、时代、道具候选
```

不得直接改变：

```text
角色脸
角色身份
场景结构
输出格式
资产用途
已锁风格
```

## 九、能力调用总原则

```text
1. 命令先定边界。
2. 格式先于生成。
3. 锁定状态优先于本轮灵感。
4. 知识库只补充，不夺权。
5. 视频只组装，不重设计。
6. 海报可奔放，但不得污染视频。
7. 发散默认 derived。
8. 未 commit 不写回主状态。
```
