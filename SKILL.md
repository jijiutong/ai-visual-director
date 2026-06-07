---
name: ai-story-board
description: Use when generating storyboards for AI TV dramas, manga, short films, or visual development boards from stories, novel excerpts, or script fragments. Triggers on requests like "create a storyboard", "make a visual development board", "storyboard this scene", or when working with GPT Image 2 to produce cinematic storyboard prompts.
---

# AI Story Board Skill

## Overview

Converts stories into professional cinematic storyboard prompts for GPT Image 2. Generates film-grade visual development boards with character sheets, shot breakdowns, camera parameters, lighting references, and color palettes—not simple illustrations or collages.

## When to Use

- User provides a story, novel excerpt, script, or manga concept and asks for a storyboard
- User wants to generate AI TV drama / manga / short film visual boards
- User needs GPT Image 2 prompts for cinematic shot planning
- Requests involve: "故事板", "分镜", "漫剧", "视觉开发板", "storyboard", "visual development board"

**Do NOT use when:**
- User wants a single poster or illustration
- User needs a simple comic panel
- User wants marketing materials or PPT slides

## Core Pattern

### Step 1: Extract Story Information

Before writing any prompt, extract these from the story:

| Field | Description |
|-------|-------------|
| 片名 | 2-8 characters or mixed CJK/Latin short title |
| 类型 | 动作/悬疑/科幻/玄幻/都市/战争/犯罪/etc. |
| 时长 | Default 15s; complex stories use 30s |
| 核心冲突 | One sentence: who vs who, or what the protagonist must overcome |
| 主角设定 | Name, age, identity, costume, weapon/prop, facial features, emotional base |
| 对手设定 | Name/title, identity, costume, weapon/ability, source of menace |
| 世界观场景 | Location, era, weather, environmental material, danger elements |
| 情绪曲线 | Calm/pressure → confrontation → explosion → aftertaste |
| 核心镜头 | 7-shot (short story) or 13-shot (epic battle) |
| 主色调 | 2-4 colors, e.g., 冷灰, 黑金, 血红, 幽蓝, 银白 |

### Step 2: Choose Output Type

Match story content to one visual style. **Do not mix styles:**

| Style | For |
|-------|-----|
| 黑金动作分镜板 | 武侠、复仇、谍战、犯罪、战争、格斗 |
| 科幻机甲全案板 | 机甲、赛博、外星文明、未来战争、AI对抗 |
| 东方玄幻开发板 | 修仙、古风、神魔、异世界、史诗冒险 |
| 悬疑惊悚导演板 | 密室、犯罪、恐怖、心理惊悚 |
| 都市情绪电影板 | 现实题材、爱情、职场、家庭、人生转折 |

### Step 3: Generate Prompt

Build a complete prompt containing all required modules:

1. **顶部项目总览栏** — Title, duration, genre, tone, version, keywords
2. **角色设定栏** — Protagonist & antagonist three-view sheets (front/side/back), face close-up, prop close-up
3. **核心场景概念图** — Largest horizontal scene image with atmospheric effects
4. **分镜序列表** — 7 or 13 shots with timing, framing, camera movement, description, SFX, emotional progression
5. **镜头轨迹示意** — Top-down view showing push/pull/pan/track/orbit/crane movements
6. **技术规范栏** — Camera, lens, DOF, shutter, grain, aspect ratio, color management
7. **灯光与色卡** — Key/fill/rim/ambient light with 5-8 color swatches
8. **材质与特效细节** — Rain, dust, sparks, energy flow, metal scratches, fabric, sweat, fog

### Step 4: Output

Output **one single copyable prompt** ready for GPT Image 2. Do not add commentary before or after the prompt unless the user requests it.

## Implementation

### Full Prompt Template

Replace bracketed fields with extracted story information:

```text
请生成一张电影级漫剧视觉开发板 / 专业导演分镜全案板，主题为《[片名]》，故事核心：[一句话核心冲突]。

整体风格：[黑金动作分镜板/科幻机甲全案板/东方玄幻开发板/悬疑惊悚导演板/都市情绪电影板]，电影前期制作 concept art board，professional film production layout，cinematic storyboard sheet，visual development board，高密度工业化排版，信息丰富但层级清晰。

画幅与排版：16:9 横版，超清 8K 质感。完整排版分为 [3/4/6] 大模块：顶部项目总览栏；左侧/上方角色设定栏；中部最大核心场景概念图；中下部 [7/13] 镜标准化分镜序列表；底部专业技术规范栏；右下角灯光、色卡、镜头参数和材质特效参考。整体像电影制作公司内部 pitch board，不是普通海报。

顶部项目总览栏：显示片名《[片名]》、时长 [15秒/30秒]、类型 [类型]、调性 [调性关键词]、版本 V1.0、关键词 [关键词1/关键词2/关键词3]。文字只需要作为排版质感，不要求完全可读，避免乱码大字。

角色设定栏：主角 [主角姓名/身份]，年龄 [年龄]，服装 [服装]，核心道具/能力 [道具或能力]，情绪 [情绪]；展示正面、侧面、背面三视图 + 面部 close-up + 道具特写。对手 [对手姓名/身份]，造型 [造型]，威胁感 [威胁来源]，展示正面、侧面、背面三视图 + 面部 close-up + 核心能力/武器特写。人物造型必须前后一致，不崩坏。

核心场景概念图：地点 [场景地点]，时间 [白天/黄昏/夜晚]，天气 [天气]，环境材质 [材质]，氛围 [氛围]。画面要有电影级纵深、强透视、强对比光影、体积光、烟尘/雨水/火星/能量粒子/空间雾气，主角与对手形成明确对峙关系。

分镜序列表：[7/13] 个镜头，每个镜头是小横幅电影帧，包含不同景别与运镜：establishing shot、over shoulder、close-up、tracking shot、low angle、wide shot、crash zoom、slow motion、handheld tension、final lingering shot。镜头情绪从 [起始情绪] 推进到 [爆发情绪]，最后落到 [余韵情绪]。每个小画面要连贯，像真实电影剪辑方案。

镜头语言：ARRI ALEXA 35 / anamorphic lens / 2.39:1 cinematic crop / shallow depth of field / film grain / high contrast lighting / rim light / backlight / volumetric light / practical light / motion blur / dynamic composition / professional cinematography。

色彩与光影：主色调 [主色调1] + [主色调2] + [点缀色]，冷暖对撞，高级电影调色，暗部有层次，高光不过曝，皮肤/金属/布料/雨水/火焰/能量特效都有真实材质细节。

底部技术规范栏：加入小型镜头轨迹图、摄影参数表、灯光方向图、声音波形图、色卡、材质参考图。排版要像专业影视工业文件，黑色或冷白背景，金色/橙色/银灰细线分隔，细节密集但清楚。

质量要求：ultra-detailed, professional film production layout, cinematic shot, film grain, 8K, sharp focus, coherent character design, consistent costume, clean layout, no watermark, no logo, no random large text, no garbled Chinese, no broken faces, no duplicated limbs, no messy panels, no low-quality collage。
```

### Minimal Prompt Template

For quick generation:

```text
电影级漫剧视觉开发板，主题《[片名]》，核心冲突：[一句话故事]。16:9 横版，专业电影前期制作全案板，顶部项目信息栏，中部超大核心场景概念图，左右主角与对手三视图和面部/道具特写，底部 7 镜/13 镜分镜表、镜头轨迹图、摄影参数、灯光色卡、音效波形、材质特效参考。风格：[黑金动作/科幻机甲/东方玄幻/悬疑惊悚/都市写实]，cinematic storyboard sheet, professional film production layout, visual development board, ARRI ALEXA 35, anamorphic lens, strong contrast lighting, film grain, volumetric light, ultra-detailed, 8K, clean industrial layout, coherent character design, no watermark, no garbled text, no messy panels, no broken anatomy。
```

## Execution Rules

- **Always extract story info first** before writing the prompt
- **Output one complete, copyable prompt** — no partial drafts, no explanations mixed in
- **Fill every bracket** with concrete details — never leave "电影感""高级感" as vague placeholders
- **Name unnamed characters** — give them cinematic but non-cheesy names
- **Infer missing type** — choose style based on conflict intensity
- **User says "更燃"** → strengthen action shots, light effects, impact moments, camera push-ins
- **User says "更贵"** → strengthen production board, camera specs, materials, color swatches, layout order
- **User says "小红书竖版"** → change to 9:16 aspect ratio, keep board structure
- **Never mix styles** — pick exactly one output type from the five options

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Vague "cinematic" without specifics | Write exact modules: layout, characters, shots, camera, lighting |
| Mixing multiple visual styles | Choose ONE style from the five options |
| Skipping character three-view sheets | Always include front/side/back + close-up + prop |
| No camera parameters | Include ARRI ALEXA 35, lens, aspect ratio, DOF, grain |
| Garbled Chinese text in prompt | Specify "no garbled Chinese" in quality requirements |
| Output is a collage/patchwork | Require "professional film production layout" with clean industrial structure |

## Style Anchors

Visual DNA for all outputs:
- **气质**: 电影级故事板、工业化视觉开发板、漫剧/短剧前期制作方案
- **结构**: 高密度但有秩序，电影制作公司内部 pitch board
- **基因**: 黑金硬核、冷灰写实、暗调高反差、电影特效质感、强氛围光
- **版式**: 顶部项目信息栏 → 角色设定 → 核心场景 → 分镜表 → 技术规范
- **质感**: 超清、电影光影、真实镜头语言、专业排版

**禁止**: 普通插画拼贴、儿童漫画、平面 PPT 风、营销海报风、大段可读正文、随机乱码文字、水印
