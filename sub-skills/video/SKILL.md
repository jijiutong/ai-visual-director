---
name: video
description: AI video full workflow — 5-step recommended pipeline from storyboard to final video. Route: state/asset-map → video-prompt-assembly → final-video-qc. Supports Seedance, Runway, Kling, Luma, Pika. Use /video or say "转视频", "视频工作流".
---

# Video — AI 视频全流程

输入故事 → 5 步推荐流程 → 输出完整视频 prompt + 参考图方案。支持 5 个视频平台。

## 触发方式

- `/video [故事/故事板]`
- 直接说 "转视频"、"出视频"、"视频工作流"、"Seedance"

## 子指令

| 指令 | 效果 |
|------|------|
| `/video 转视频` | 故事板→推荐流程→视频方案 |
| `/video 出视频 prompt` | 压缩模式 ≤1500 字，适合 Seedance |
| `/video 详细模式` / `展开 prompt` | 3000+ 字详细 Prompt，适合 Runway/可灵/Luma |
| `/video 切分各帧` / `逐帧接力` | 前一帧作后一帧参考图，链式传递 |
| `/video 生成视频分镜图` / `合并帧` | 3-4 个关键帧合成一张分镜图 |
| `/video 继续下一段` / `续写下一段` | AI 自动续写下一段剧情+匹配衔接技法 |
| `/video 用 [技法名] 衔接，继续下一段` | 手动指定衔接技法（如 J-Cut/图形匹配剪） |
| `/video 下一段往 [方向] 发展` | 手动指定剧情发展方向 |
| `/video 检查视频` / `视频检查` | 10 项生成后检查清单 |

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

### 第三步：生成分镜图（3-4 张，覆盖 15s 全部镜头）

```
→ 回复"生成视频分镜图"或"合并帧"
→ 将故事板 N 帧按动作阶段合并为 3-4 张
出图量：3-4 张 | 费用：~USD0.12-0.32 | 耗时：~2min
→ 写入 state/shot-state + state/asset-map（storyboard_board）
```

### 第四步：生成视频 prompt

```
→ 回复"出视频 prompt"（默认压缩模式 ≤1500 字）
费用：零 | 耗时：~30s
```

### 第五步：输入视频工具

```
→ Seedance：prompt + 角色卡 + 全景图 + 3-4 张分镜图（≤12 张参考图）
→ 费用：~USD0.50-1.0/条 | 耗时：1-3min
```

**总出图量：11-13 张 | 总费用：~USD0.94-2.04 | 总耗时：~5-8min**

## 视频 Prompt 输出格式（压缩模式）

```
【画面内容】逐帧提取核心视觉信息（≤15字）+ 运镜 + 色彩/灯光 + 转场

- 场景一致性：引用场景参考图（@编号→用途见 state/asset-map.md）
- 角色一致性：引用角色卡（@编号→用途见 state/asset-map.md）
- 画面锚点：引用视频分镜图（@编号→用途见 state/asset-map.md）

过渡衔接声明：continuous single shot, smooth transitions no hard cuts
总字数 ≤1500 字
```

## 详细模式

回复 "详细模式" 或 "展开 prompt"：每帧完整叙事段落 + 音效 + 构图 + 转场 + 台词，3000+ 字。

## 视频负面提示词（自动附加）

```
no flickering, no frame flashing, no sudden brightness jumps, no color shifts,
no morphing, no body distortion, no face melting, no limb warping, no extra fingers,
no floating, no sliding feet, no hovering, no broken physics,
no background shifting, no environment pop-in, no sky color change,
no disappearing props, no weapon shape change, no accessory deformation,
no clothing texture change, no fabric stiffness, no costume color drift,
no broken continuity between frames, no jump cuts, no ghosting artifacts,
no text garbling, no watermark, no logo, no subtitles mismatch
```

## 视频生成后检查（10 项）

```
□ 场景一致性：所有帧背景同一环境？
□ 角色一致性：所有帧面部/发型/服装一致？
□ 光照方向：所有帧主光方向一致？
□ 道具形制：武器/配饰不变形？
□ 动作连贯：帧间动作平滑？
□ 画面锚点：画面是否偏离故事板？
□ 转场流畅：帧间是否生硬闪跳？
□ 字幕正确：时间/位置/内容准确？
□ 材质质感：不跳变？
□ 总体打分：0-100 分，低于 60 补全锚点重生成
```

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
