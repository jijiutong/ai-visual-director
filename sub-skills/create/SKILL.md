---
name: avd/create
description: 【AI视觉导演】一键故事到视频 — 给一个故事，输出角色卡+场景图+全案板+视频Prompt+质检报告。fast/standard/full三档可选。
---

# Create — 一键故事到视频

`/create`（别名 `/avd/create`）是默认总编排入口。用户给一个故事、剧本、小说片段或概念句时，直接进入完整自动链路。

它不替代 `/avd/storyboard`、`/avd/character`、`/avd/scene`。它会自动编排三大核心资产：

它不替代 `/storyboard`、`/character`、`/scene`。裸命令是对外主入口，`/avd/*` 是命名空间别名。

```text
角色卡（谁） + 场景图（在哪） + 分镜图（怎么拍） -> 视频 Prompt / 执行包
```

## 触发方式

- `/create [故事]`（或 `/avd/create [故事]`）
- `/create 一键生成 [故事]`（或 `/avd/create 一键生成 [故事]`）
- 直接说 `一键生成`、`直接出`、`auto`
- 粘贴一个故事且没有指定其他任务时，默认按 `/avd/create` 处理

## ⚠️ 路由规则

| 用户说法 | 模式 | 输出 |
|---------|------|------|
| `/avd/create fast [故事]` | **快速版** | 4项：故事摄入+镜头预算+视频结构+视频Prompt。角色/场景DNA内联，不独立出图。总输出~200行 |
| `/avd/create standard [故事]` | **标准版** ⭐默认 | 8项：+角色卡+场景图+全案板+平台参数。资产走模板。总输出~500行 |
| `/avd/create full [故事]` | **完整版** | 12项：+负面词+质检报告+拆段衔接+执行清单。最全。总输出~800行 |
| `/avd/create [故事]`（未指定模式） | **展示模式选单** | 先让用户选 fast/standard/full，再执行 |

**三种模式对比**：

| | fast | standard | full |
|------|------|---------|------|
| 故事摄入 | ✅ | ✅ | ✅ |
| 镜头预算 | ✅ | ✅ | ✅ |
| 视频结构蓝图 | ✅ | ✅ | ✅ |
| 角色卡 Prompt | ❌ 内联DNA | ✅ 走模板 | ✅ 走模板 |
| 场景图 Prompt | ❌ 内联DNA | ✅ 走模板 | ✅ 走模板 |
| 全案板 Prompt | ❌ | ✅ | ✅ |
| 视频 Prompt | ✅ | ✅ | ✅ |
| 平台参数 | ❌ | ✅ | ✅ |
| 负面提示词 | ❌ | ❌ | ✅ |
| 质检报告 | ❌ | ❌ | ✅ |
| 拆段衔接 | ❌ | ❌ | ✅ |
| 执行清单 | ❌ | ❌ | ✅ |
| 适用 | 快速验证想法 | 正式出图 | 完整项目交付 |

> 默认 `/avd/create [故事]` 未指定模式时，先展示 fast/standard/full 选单让用户选。

## 执行链路

```text
task-router
→ sources/
→ engines/story-intake.md
→ engines/shot-budget.md
→ engines/video-director.md
→ engines/asset-plan.md
→ engines/reference-anchor.md
→ engines/motion-physics.md
→ engines/video-prompt-assembly.md
→ engines/prompt-scorer.md
→ rules/final-video-qc.md
→ engines/auto-repair.md
→ rules/asset-qc.md
→ engines/render-package.md
```

## ⚠️ 模板强制规则（防自由发挥）

**生成每个资产 Prompt 前，必须先读取对应模板。不读模板直接写 = bug。**

| 输出项 | 必须读取的模板 | 
|--------|--------------|
| **角色卡 Prompt** | `templates/character-sheet.md` — 结构/版式/变量/禁止项均在模板内 |
| **场景图 Prompt** | `templates/scene-card.md` — 结构/版式决策表/变量/附加模块均在模板内 |
| **全案板 Prompt** | `templates/full-board.md` — 模块/参数/帧数规则/禁止项均在模板内 |
| **分镜图 Prompt** | `templates/quick-board.md` — LS版式/帧结构/参数格式均在模板内 |
| **海报 Prompt** | `templates/poster.md` — 画幅/构图/变量/禁止项均在模板内 |
| **格式合同** | `rules/format-contract.md` — output_type 区分（§1.1-§1.5），全案板=full_board / 分镜图=storyboard_frame / 海报=poster |

## ⚠️ 模板即权威源

模板文件是 Prompt 结构的唯一权威。Skill 不重复描述模板内容（模块数/参数数/帧数/版式编号），全部从模板文件读取。**模板改了，Skill 不用改。**

**数量规则**（跨模板通用，不依赖具体模板内容）：
- 全案板 = 1张
- 分镜图 = N张（N = ceil(总镜数/4)，每张≤4帧）

**执行顺序**：每项输出前，先 Read 对应模板 → 按模板结构填充 → 输出。

**禁止**：
- ❌ 不读模板凭记忆写 Prompt
- ❌ 分镜图用全案板模板——先读 `format-contract` §1.3 确认 output_type
- ❌ 全案板拆成多张——永远是 1 张
- ❌ 分镜图只出 1 张即使总镜数>4 —— 遵守 ceil(总镜数/4) 规则
- ❌ 跳过模板内的变量编号和模块结构

## 默认规则

读取 `api-config.template.env` + `rules/one-click-defaults.md`。用户没有指定时：

- 视频平台 → `VIDEO_PLATFORM_DEFAULT`
- 画幅 → `DEFAULT_ASPECT_RATIO`
- 语言 → `DEFAULT_LANGUAGE`
- 自动选择最匹配风格和版式（video-director 多维度决策）
- 自动生成最低必要资产
- 平台不支持当前时长时，自动拆段或压缩

## 旧命令兼容

用户说 `/avd/storyboard 一键生成` 时，始终保留故事板/分镜图核心链路；只有用户明确说“继续出视频包/转视频/成片执行包”时，才追加 `/avd/create` 后半段编排。
