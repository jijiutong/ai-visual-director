---
name: avd/video
description: 【AI视觉导演】视频工作流 — 5平台(Seedance/Runway/可灵/Luma/Pika)，声音设计，续写
---

# Video — AI 视频全流程

> **治理**：走 `engines/command-gate.md` 权限表 §四 /video。产出标记 `draft`，不写回主状态。只读取 `state/asset-map.md`、`state/shot-state.md`、`state/dialogue-map.md`、`state/sound-map.md` 组装视频执行包，禁止临时重写角色卡、场景图或故事方向。详见 `rules/format-contract.md` §1.4。

输入故事 → 5 步推荐流程 → 输出完整视频 prompt + 参考图方案。支持 5 个视频平台。

## 触发方式

- `/avd/video [故事/故事板]`
- 直接说 "转视频"、"出视频"、"视频工作流"、"Seedance"

## 子指令

| 指令 | 效果 |
|------|------|
| `/avd/video 转视频` | 故事板→推荐流程→视频方案 |
| `/avd/video 出视频 prompt` | 压缩模式 ≤ {PLATFORM}_MAX_PROMPT_CHARS 字，适合 Seedance |
| `/avd/video 详细模式` / `展开 prompt` | 3000+ 字详细 Prompt，适合 Runway/可灵/Luma |
| `/avd/video 切分各帧` / `逐帧接力` | 前一帧作后一帧参考图，链式传递 |
| `/avd/video 生成视频分镜图` / `合并帧` | 3-4 个关键帧合成一张分镜图 |
| `/avd/video 继续下一段` / `续写下一段` | AI 自动续写下一段剧情+匹配衔接技法 |
| `/avd/video 用 [技法名] 衔接，继续下一段` | 手动指定衔接技法（如 J-Cut/图形匹配剪） |
| `/avd/video 下一段往 [方向] 发展` | 手动指定剧情发展方向 |
| `/avd/video 检查视频` / `视频检查` | 12 项生成后检查清单（详见 `rules/qc.md` §三） |

## ⚠️ 路由规则

| 用户说法 | 行为 |
|---------|------|
| `/avd/video`（未指定） | **展示平台+动作选单**，等用户选 |
| `/avd/video [故事/故事板]` | 走 5 步推荐流程 → 输出视频 prompt + 参考图方案 |
| `/avd/video 转视频` | 已有故事板 → 直接出视频方案 |
| `/avd/video 出视频 prompt` | 仅出压缩版 Prompt |
| `/avd/video 详细模式` | 3000+ 字展开 Prompt |
| `/avd/video 逐帧接力` | 逐帧出图，前帧作后帧参考 |
| `/avd/video 合并帧` | 3-4 关键帧合并一张分镜图 |
| `/avd/video 续写下一段` | 继承DNA+尾帧→首帧衔接 |
| `/avd/video 用 Seedance` | 直接选 Seedance 平台 |
| `/avd/video 用 Runway` | 直接选 Runway 平台 |
| `/avd/video 用 可灵` | 直接选 可灵 平台 |
| `/avd/video 声音设计` | 输出音效表+声音方案 |

**禁止**：不展示选单直接生成。`/avd/video` 无参数时必须展示平台+动作。

## 5 步推荐流程

```
★ 推荐流程：前置准备 → 全景锁定 → 分镜图 → Prompt → 视频
```

### 第一步：定义角色+场景+道具（2-3 张参考图）

```
→ 回复"生成角色卡"（6 模块角色设定卡）
→ 回复"生成场景参考图"（全能参考模式，一张锁场景+角色+光照+道具）
→ 回复"生成道具细节卡"（如有特殊武器/配饰）
出图量：2-3 张 | 费用：~USD0.08-0.24 | 耗时：~1min
→ 写入 state/variable-registry（characters + scene）+ state/asset-map
```

### 第二步：全景图锁定全局空间（720° 全景图）

```
→ 回复"生成全景图"（推荐 6 面立方体拼接）
→ 覆盖所有拍摄角度，每镜从这个全景空间"取景"
出图量：6 张 → 拼接为 1 张全景 | 费用：~USD0.24-0.48 | 耗时：~90s
```

### 第三步：生成分镜图（由 video-director + consistency-trigger 决定张数，覆盖当前段全部镜头）

```
→ 回复"生成视频分镜图"或"合并帧"
→ 将故事板 N 帧按动作阶段合并为 3-4 张
出图量：3-4 张 | 费用：~USD0.12-0.32 | 耗时：~2min
→ 写入 state/shot-state + state/asset-map（storyboard_board）
```

### 第四步：生成视频 prompt

```
→ 回复"出视频 prompt"（默认压缩模式 ≤ {PLATFORM}_MAX_PROMPT_CHARS 字）
费用：零 | 耗时：~30s
```

### 第五步：输入视频工具

```
→ Seedance：prompt + 角色卡 + 全景图 + 3-4 张分镜图（≤12 张参考图）
→ 费用：~USD0.50-1.0/条 | 耗时：1-3min
```

**总出图量：11-13 张 | 总费用：~USD0.94-2.04 | 总耗时：~5-8min**

## 视频 Prompt 输出格式（压缩模式）

> **⚠️ 模板强制规则**：生成视频 Prompt 前，**必须依次读取**：
> 1. `engines/video-prompt-assembly.md`（4层 Prompt 结构权威源——第1层视频基础信息/第2层故事板序列/第3层约束层@图/第4层风格收尾。帧描述≤25字约束。@图数量=asset-map实际条目数。职责边界：角色卡/场景图/分镜图 prompt 不由本引擎生成）
> 2. `rules/format-contract.md` §1.4（视频与关键帧格式合同——output_type=video_prompt, asset_purpose=video_asset, video_safe=true）
> 3. `state/asset-map.md`（动态读取 @图编号→用途映射，不硬编码 @图数量）
> 
> 不读上述文件直接写视频 Prompt = bug。

```
【画面内容】逐帧提取核心视觉信息（≤15字）+ 运镜 + 色彩/灯光 + 转场

- 场景一致性：引用场景参考图（@编号→用途见 state/asset-map.md）
- 角色一致性：引用角色卡（@编号→用途见 state/asset-map.md）
- 画面锚点：引用视频分镜图（@编号→用途见 state/asset-map.md）

过渡衔接声明：continuous single shot, smooth transitions no hard cuts
总字数 ≤ {PLATFORM}_MAX_PROMPT_CHARS 字
```

## 详细模式

回复 "详细模式" 或 "展开 prompt"：每帧完整叙事段落 + 音效 + 构图 + 转场 + 台词，3000+ 字。

## 视频负面提示词

> **详见 `rules/qc.md` §二** — 完整视频专属负面提示词。视频 prompt 输出时自动从该文件读取并附加到尾部。

## 视频生成后检查

> **详见 `rules/qc.md` §三** — 完整 12 项检查清单（场景/角色/光照/道具/动作/画面/转场/字幕/材质/视觉干净度/视觉可用性/台词音效）。输出后从该文件读取并逐项执行。

## 多平台支持

| 平台 | 指令 | 特点 |
|------|------|------|
| Seedance | `用 Seedance 生成视频` | 中文原生，多图输入，音频输出 |
| Runway | `用 Runway 生成视频` | SDK 完善，图生视频/文生视频 |
| 可灵 Kling | `用 可灵 生成视频` | 4K 输出，角色 ID 复用 |
| Luma | `用 Luma 生成视频` | 首尾帧插值，丝滑过渡 |
| Pika | `用 Pika 生成视频` | 社交短视频，快速验证 |

## 长视频跨段衔接

多段视频拼接时自动启用尾帧→首帧锚定：
- 段 N 尾帧 → 段 N+1 首帧参考图
- 场景参考图/角色卡跨段复用
- 支持 36 种导演衔接技法（说 "用 J-Cut 衔接"、"用图形匹配剪衔接" 等）
- AI 自动续写下一段剧情（说 "继续下一段"）
- 详细技法 → 见 `templates/steps.md` 跨段衔接章节

## API 直接生成

### 图片 API（9 平台）

| 命令 | 平台 | 特点 |
|------|------|------|
| `用 Nano Banana 生成 [格式]` | Google Gemini | 中文原生，14张参考图 |
| `用 GPT Image 生成 [格式]` | OpenAI DALL-E 3 | 高清模式 |
| `用 Flux 生成 [格式]` | Replicate | SDXL 替代 |
| `用 Ideogram 生成 [格式]` | Ideogram | 文字渲染强 |
| `用 通义万相 生成 [格式]` | DashScope | 中文原生 |
| `用 SD 生成 [格式]` | Stability AI | SDXL/SD3 |
| `用 ComfyUI 生成 [格式]` | 本地 ComfyUI | 社区扩展 |
| `用 Recraft 生成 [格式]` | Recraft | 设计风格 |

> Midjourney 无官方公开 API。详见 `platforms/api-integration.md`

### 视频 API（5 平台）

| 命令 | 平台 | 特点 |
|------|------|------|
| `用 Seedance 生成视频` | 火山引擎 Ark | 多图输入，中文原生，音频输出 |
| `用 Runway 生成视频` | Runway Gen-4.5 | 最成熟，SDK 完善 |
| `用 可灵 生成视频` | 阿里云百炼 | 4K 输出，角色ID复用 |
| `用 Luma 生成视频` | Luma Dream Machine | 首尾帧插值，丝滑过渡 |
| `用 Pika 生成视频` | fal.ai Pika | 社交短视频，快速验证 |

> 视频 API 为异步模式：创建任务→轮询→下载。详见 `platforms/video-api-integration.md`
