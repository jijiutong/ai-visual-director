# AI Visual Director 使用手册

AI Visual Director 是一个面向 AI 影像生产的受控导演系统。它可以做一键全案，也可以只做角色、场景、分镜或视频 prompt。核心不是让 LLM 自由发挥到底，而是让它在明确的格式、状态和资产边界内工作。

本文是当前权威使用入口。它回答三个问题：

```text
我该用哪个命令？
一键生成会开哪些能力？
哪些内容会被锁住，哪些只是草稿？
```

## 一、默认原则

```text
完整系统，不等于全能力默认开启。
默认先稳定，再创作，再扩展。
格式合同优先于灵感发挥。
锁定状态优先于本轮上下文。
普通生成默认 draft，确认后才 lock / commit。
```

默认工作方式：

| 原则 | 含义 |
|------|------|
| 稳定优先 | 用户没要求发散时，不主动多版本、不融合风格、不续写 |
| 格式先行 | 角色卡、场景图、分镜、视频 prompt 都先确定格式合同 |
| 资产分层 | display/video/consistency/marketing 四类资产不混用 |
| 状态受控 | LLM 不凭记忆做主，已锁内容从 state 读取 |
| 修复克制 | `/repair` 只修错误，不重新发明角色和故事 |

## 二、命令总览

| 命令 | 用途 | 默认模式 | 默认输出 |
|------|------|----------|----------|
| `/create` | 一键总编排 | `standard` | 角色卡 prompt + 场景图 prompt + 分镜 prompt + 视频 prompt + QC |
| `/source` | 输入源处理 | `stable` | 结构化故事/角色/场景字段 |
| `/character` | 核心资产：角色卡 / 人物模板 | `stable` | 角色设定 prompt、角色 DNA、资产用途 |
| `/scene` | 核心资产：场景图 / 空间锚点 | `stable` | 场景参考 prompt、固定元素、光照约束 |
| `/storyboard` | 核心资产：故事板 / 分镜 / 全案板 | `project` | 镜头表、分镜图 prompt、shot-state |
| `/video` | 视频执行包 | `project` | 平台视频 prompt、参考图引用、执行清单 |
| `/dialogue` | 台词设计 | `project` | dialogue-map、台词节奏、字幕方案 |
| `/sound` | 音效设计 | `project` | sound-map、环境音/拟音/音乐/混响 |
| `/style` | 风格建议/迁移 | `derived` | 风格建议，默认不写回 |
| `/poster` | 海报/封面 | `marketing` | marketing_asset，默认 video_safe=false |
| `/declutter` | 视觉去噪 | `repair` | 降低文字、HUD、粒子、噪点、背景复杂度 |

治理命令：

| 命令 | 用途 |
|------|------|
| `/lock` | 锁定角色、场景、格式、风格、资产用途 |
| `/commit` | 将用户确认的 draft / derived 写回主状态 |
| `/vary` | 在锁定范围内变化，不污染主状态 |
| `/check` | 检查 prompt / 资产 / 视频包 |
| `/repair` | 只修错误，不重做方向 |

## 三、一键生成体系

`/create` 保留一键总编排。它是主入口，但不是“乱开所有功能”：它按档位编排角色、场景、分镜和视频 prompt。

`/create` 不替代三大核心资产入口，而是按档位编排它们：

```text
/storyboard 核心资产：故事板
/character  核心资产：角色卡
/scene      核心资产：场景图
```

| 档位 | 触发 | 输出 | 默认调用 |
|------|------|------|----------|
| `/create fast` | “快速、先看方向” | 核心文字 prompt 包 | 最少资产，快速验证 |
| `/create standard` | 用户只说 `/create` | 完整但克制的视频执行包 | 角色 + 场景 + 分镜 + 视频 + QC |
| `/create full` | “完整全案、全部都来” | 全案导演包 | standard + 台词 + 音效 + 全案板 + 海报建议 |

默认规则：

```text
用户只说 /create → /create standard
用户说快速/先看方向 → /create fast
用户说完整全案/所有资产 → /create full
```

`/create standard` 推荐链路：

```text
task-router
→ command-gate
→ source / story-intake
→ format-contract
→ lock-state read
→ asset-plan
→ /character 子路由
→ /scene 子路由
→ /storyboard 子路由
→ /video 只组装
→ prompt-qc / asset-qc / video-qc
→ render-package
→ 输出状态标记 draft
```

## 四、命令边界

### `/character`

用于角色卡、三视图、人物模板、人像 prompt。它的职责是锁定“谁”，不能顺手改故事、做音效或展开多版本。

默认允许：

```text
aesthetic-director
character-dna
format-contract
portrait-quality
negative-prompt
visual-control
```

默认禁止：

```text
sound-engine
series
multi-version
fusion
director-imitation
storyboard
```

### `/scene`

用于场景图、空间锚点、材质光照。它的职责是锁定“在哪”，不能重写角色脸或擅自续写剧情。

默认允许：

```text
scene-consistency
lighting
materials
environment
format-contract
visual-control
```

默认禁止重新设计角色脸、剧情续写、音效台词、多版本风格融合。

### `/storyboard`

用于镜头、分镜、全案板。它的职责是锁定“怎么拍”，不能重新设计角色 DNA 和场景核心结构。

默认允许：

```text
story-intake
shot-budget
video-director
motion-physics
continuity
format-contract
```

默认禁止重新设计角色 DNA、场景核心结构和视频参考资产用途。

### `/video`

只组装视频 prompt，不重设计角色和场景。它是执行包编译器，不是新的创作入口。

读取：

```text
state/asset-map.md
state/shot-state.md
state/dialogue-map.md
state/sound-map.md
state/platform-config.md
```

禁止：

```text
临时重写角色卡
临时重写场景图
临时改变故事方向
把 display_asset / marketing_asset 放入视频 @图
```

### `/poster`

用于营销图。可以更奔放，但必须与视频参考资产隔离：

```text
asset_purpose = marketing_asset
video_safe = false
```

## 五、状态与记忆

所有生成默认不是最终记忆。LLM 的上下文会漂，项目记忆必须来自 state 和用户确认。

| 状态 | 含义 | 是否写回 |
|------|------|----------|
| `draft` | 本轮草稿 | 否 |
| `derived` | 发散派生版本 | 否 |
| `locked` | 用户明确锁定 | 是 |
| `committed` | 用户确认采用 | 是 |

写回规则：

```text
普通生成 → draft
多版本/风格探索 → derived
用户说“这个定了/锁定” → locked
用户说“用这一版/确认采用” → committed
未 /commit 不得覆盖主状态
```

## 六、常见用法

### 1. 稳定出角色模板

```text
/character 做一个现代网红美女角色模板，参考方圆那种清透短视频感，16:9，角色卡
```

系统应先把口语审美转成脸型、五官、妆容、镜头、负面词，再生成 prompt。

### 2. 一键做视频包

```text
/create
雨夜古寺，师父发现徒弟入魔，两人在佛像前拔剑相向，15秒。
```

默认走 `/create standard`。

### 3. 完整全案

```text
/create full
我要完整全案，角色卡、场景、分镜、台词、音效、视频执行包都要。
```

### 4. 只修格式

```text
/repair 这个角色卡缺侧面和背面，按原角色不变，只修格式
```

### 5. 发散多版本

```text
/vary 多给三版构图，但不要改脸、服装和场景结构
```

## 七、输出必须声明

每次输出建议包含这组元信息，避免后续混用：

```text
输出类型：
资产用途：
video_safe：
状态：draft / derived / locked / committed
是否写回主状态：
```
