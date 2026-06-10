# 质量约束与负面提示词

## 一、AI 生成错误库（100+ 常见问题）

### 人体结构错误

| 编号 | 错误 | 负面关键词 | 预防描述 |
|------|------|-----------|----------|
| AE1 | 多出手脚 | extra limbs, duplicated limbs, extra arms, extra legs | correct anatomy, correct number of limbs |
| AE2 | 手指错误 | extra fingers, missing fingers, fused fingers, 6 fingers | correct fingers count, 5 fingers per hand |
| AE3 | 面部崩坏 | broken face, distorted face, asymmetrical eyes, twisted mouth | coherent facial features, symmetrical face |
| AE4 | 眼睛错误 | mismatched eyes, wrong eye position, floating eyes, extra eyes | correctly positioned eyes, matching eye level |
| AE5 | 牙齿问题 | too many teeth, sharp teeth(非角色设定), fanged(非角色设定) | natural teeth, correct dental anatomy |
| AE6 | 颈部问题 | missing neck, too long neck, double neck | correct neck proportion |
| AE7 | 耳朵问题 | missing ears, pointed ears(非角色设定), extra ears | correct ear position and shape |
| AE8 | 鼻子问题 | missing nose, distorted nose, sideways nose | correctly shaped nose, proper nostril |
| AE9 | 身体比例 | disproportionate body, giant head, tiny legs | correct human proportions, anatomical accuracy |
| AE10 | 关节反转 | backward knees, backward elbows, joint inversion | correct joint orientation |
| AE11 | 融合肢体 | merged arms, body parts blending into each other | clearly separated limbs |
| AE12 | 浮动肢体 | floating hand, disconnected arm | connected limbs, proper anatomy |
| AE13 | 多余器官 | third arm growing from back, extra head | single head, two arms, two legs |
| AE14 | 性别错乱 | mixed gender features | correct gender anatomy |
| AE15 | 年龄错乱 | child face on adult body, adult face on child | age-appropriate features |

### 文字错误

| 编号 | 错误 | 负面关键词 | 预防描述 |
|------|------|-----------|----------|
| TE1 | 文字乱码 | garbled text, gibberish, random characters | no readable text, text as texture only |
| TE2 | 大文字 | large text overlay, billboard text | no large text, no text overlay |
| TE3 | 水印 | watermark, logo, copyright mark | no watermark, no logo, no signature |
| TE4 | UI元素 | UI overlay, menu, button, HUD | no UI elements, no HUD |
| TE5 | 对话气泡 | speech bubble, text bubble, dialogue box | no speech bubbles (unless manga format) |
| TE6 | 字幕 | subtitle, caption, text at bottom | no subtitles, no captions |

### 画面质量错误

| 编号 | 错误 | 负面关键词 | 预防描述 |
|------|------|-----------|----------|
| QE1 | 模糊 | blurry, out of focus, soft focus(非指定) | sharp focus, clear details |
| QE2 | 低分辨率 | low res, pixelated, jpeg artifacts | 8K, ultra-detailed, high resolution |
| QE3 | 过饱和 | oversaturated, neon colors(非指定) | natural color grading, cinematic color |
| QE4 | 欠曝 | underexposed, too dark(非指定) | proper exposure, balanced lighting |
| QE5 | 过曝 | overexposed, blown highlights | proper exposure, no blown highlights |
| QE6 | 噪点 | excessive noise, grainy(非指定) | clean image, minimal noise |
| QE7 | 伪影 | artifacts, rendering errors, glitches | clean rendering, no artifacts |
| QE8 | 透视错误 | wrong perspective, distorted architecture | correct perspective, proper depth |
| QE9 | 光影混乱 | inconsistent lighting, multiple shadows | consistent light source, proper shadows |
| QE10 | 色温混乱 | mismatched color temperature | consistent color temperature |

### 构图/内容错误

| 编号 | 错误 | 负面关键词 | 预防描述 |
|------|------|-----------|----------|
| CE1 | 画面杂乱 | messy composition, cluttered, too many elements | clean composition, focused subject |
| CE2 | 主体不明 | no clear subject, ambiguous focal point | clear focal point, well-defined subject |
| CE3 | 裁剪错误 | awkward crop, cut-off head, cut-off feet | proper framing, complete subject |
| CE4 | 留白不足 | no breathing room, edge-to-edge | proper margins, breathing room |
| CE5 | 不对称失衡 | awkward asymmetry, unbalanced composition | balanced composition |
| CE6 | 风格不一致 | mixed styles, cartoon+realistic mix | consistent style throughout |
| CE7 | 时代穿帮 | modern elements in historical scene | period-accurate elements only |
| CE8 | 文化穿帮 | cross-cultural elements | culturally accurate details |
| CE9 | 悬浮物体 | floating objects, unsupported items | grounded objects, proper support |
| CE10 | 重复元素 | duplicated characters, cloned objects | unique elements |
| CE11 | 平面化 | flat illustration, 2D look(非指定) | 3D depth, volumetric rendering |
| CE12 | 贴图感 | wallpaper flat, no depth illusion | proper depth, dimensional |

---

## 二、正面质量要求

### 基础质量

```
ultra-detailed, professional film production layout, cinematic shot, film grain,
8K resolution, sharp focus, coherent character design, consistent costume,
clean layout, professional cinematography, correct anatomy, proper perspective,
natural color grading, balanced exposure, proper depth of field
```

### 角色质量

```
coherent facial features, symmetrical face, correct fingers count,
correct anatomy, proper skin texture, realistic hair strands,
natural posture, correct proportions, age-appropriate features
```

### 场景质量

```
architectural accuracy, proper perspective, volumetric lighting,
environmental storytelling, consistent lighting direction,
realistic material rendering, proper reflections, atmospheric depth
```

### 灯光质量

```
consistent light source, proper shadow direction, motivated lighting,
three-point lighting where appropriate, rim light for separation,
color temperature consistency, dramatic contrast where needed
```

---

## 三、负面提示词模板

### 通用负面（所有输出必须包含）

```
no watermark, no logo, no random large text, no garbled Chinese text,
no broken faces, no duplicated limbs, no extra fingers, no messy panels,
no low-quality collage, no flat illustration, no marketing poster style,
no cartoon style (unless specified), no text overlay (unless manga format),
no speech bubbles (unless manga format), no childlike drawing, no PPT style,
no random symbols, no unreadable text, no distorted faces, no broken anatomy,
no duplicated characters, no floating objects, no inconsistent lighting,
no mismatched color temperature, no clipping, no blur (unless specified),
no extra limbs, no missing limbs, no fused fingers, correct fingers count,
no asymmetrical eyes, no twisted mouth, no extra heads, no third arm
```

### 按格式追加

| 格式 | 追加负面 |
|------|---------|
| 全案板/故事板 | `no single image output, must be layout with multiple panels` |
| 角色设定卡 | `character turnaround format, consistent proportions, neutral background` |
| 海报 | `professional poster design, dramatic composition` |
| 漫画分镜 | `comic panel borders, clear reading flow` |
| 情绪板 | `color swatches, material samples, cohesive palette` |
| 四格漫画 | `exactly 4 panels, clear reading order` |
| 关键帧 | `sequential frames, motion trajectory, consistent character` |

### 按风格追加

| 风格 | 追加负面 |
|------|---------|
| 写实类 | `no anime style, no cel shading, no cartoon features` |
| 动漫类 | `no photorealistic, no film grain` |
| 暗黑类 | `no bright cheerful colors, no cartoon violence` |
| 童话类 | `no gore, no horror elements, no sharp angles` |
| 科幻类 | `no medieval elements, no organic textures only` |
| 古风类 | `no modern elements, no western fantasy items` |

---

## 四、一致性规则

### 角色一致性

- 同一角色在所有镜头中：服装一致、发型一致、面部特征一致
- 不允许：脸型突变、服装颜色变化、发型改变、年龄突变
- 检查项：服装颜色/款式、发型、肤色、配饰、武器、标志性特征

### 场景一致性

- 同一场景在所有镜头中：时间一致、天气一致、环境材质一致
- 不允许：晴天变雨天、白天变夜晚（除非分镜表明确说明时间推进）

### 灯光一致性

- 所有镜头中光源方向和色温必须可信
- 同一场景内光源方向不变
- 色温变化必须有叙事理由

---

## 在 Prompt 中使用

每个 prompt 的结尾必须包含：

```
质量要求：ultra-detailed, professional film production layout, cinematic shot, film grain, 8K, sharp focus, coherent character design, consistent costume, clean layout, no watermark, no logo, no random large text, no garbled Chinese, no broken faces, no duplicated limbs, no messy panels, no low-quality collage。
```

根据具体格式和风格追加对应的负面约束。
