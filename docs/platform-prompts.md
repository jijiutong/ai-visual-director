# Platform Prompts — 多平台 Prompt 格式参考

> AI Visual Director 为每个平台输出对应格式的 Prompt。
> 全部标注 📝 模板兼容，未经 API 实测出图/出片效果。

---

## 图像平台

### GPT Image（主推 ✅）

**特点**：中文原生，自然语言，支持复杂排版。

```
[中文完整描述]，[英文关键词]。
ultra-detailed, professional film production layout, cinematic shot,
film grain, 8K, sharp focus, coherent character design, consistent costume,
clean layout, no watermark, no garbled Chinese, no broken faces,
no duplicated limbs, no messy panels, no low-quality collage.
```

**适用**：全案板 / 角色卡 / 场景卡 / 漫画分镜 / 情绪板

---

### Midjourney（主推 ✅）

**特点**：英文，参数化控制，风格强。

```
[英文完整描述], cinematic storyboard sheet, professional film production
layout, ARRI ALEXA 35, anamorphic lens, strong contrast lighting, film grain,
volumetric light, ultra-detailed, 8K, coherent character design
--v 6 --ar 16:9 --s 250 --style raw --no text, watermark, logo
```

**参数**：

| 参数 | 值 | 说明 |
|------|-----|------|
| `--v` | 6 或 7 | 模型版本 |
| `--ar` | 16:9 / 9:16 / 2:3 / 1:1 | 画幅比例 |
| `--s` | 50-750 | 风格化强度（250 默认） |
| `--style raw` | — | 减少 MJ 自动美化 |
| `--cref` | URL | 角色一致性参考图 |
| `--no` | text, watermark | 负面排除 |

**适用**：海报 / 关键帧 / 场景概念图 / 角色视觉

---

### Stable Diffusion / SDXL（📝 模板兼容）

**特点**：英文，正向/负向分离，关键词化。

**正向**：
```
(masterpiece, best quality, ultra-detailed:1.2), cinematic storyboard sheet,
professional film production layout, [场景描述], [角色描述], ARRI ALEXA 35,
anamorphic lens, 2.39:1 cinematic crop, film grain, high contrast lighting,
rim light, volumetric light, 8K, sharp focus
```

**负向**：
```
(worst quality, low quality:1.4), watermark, logo, text, garbled text,
broken faces, duplicated limbs, extra fingers, mutated hands,
poorly drawn face, blurry, out of focus, messy panels, collage,
flat illustration, cartoon, deformed, bad anatomy
```

**推荐参数**：

| 参数 | SDXL | SD3 |
|------|------|-----|
| Sampler | DPM++ 2M Karras | Euler |
| Steps | 30-50 | 28-40 |
| CFG Scale | 7-9 | 4-7 |
| Resolution | 1024×576 (16:9) | 1024×1024 |

> ⚠️ ComfyUI / ControlNet / IP-Adapter 为社区扩展，不默认内置。

---

### DALL-E 3（📝 模板兼容）

**特点**：英文自然语言，强文字理解。

```
[英文完整描述]. Professional cinematic storyboard layout,
film production quality. [角色描述], [场景描述].
Quality: ultra-detailed, 8K, sharp focus, consistent character design,
no watermark, no text overlay.
```

---

## 视频平台

### Seedance（📝 模板兼容）

**特点**：中文原生，多图输入，压缩模式 ≤1500 字。

```
生成 15s 电影级视频，主题《[片名]》。
参考图片：@图0（场景参考图）@图1（角色设定卡）@图2-4（视频分镜图）。

帧1 [阶段][时间]：[画面描述≤15字]。[景别]|[运镜]|[色彩]|[灯光]|[转场]。
...

约束：场景@图0锁死。角色@图1不变形。画面锚点@图2-4不偏离。

continuous single shot, smooth transitions no hard cuts, 8K,
no flickering, no morphing, no floating, [视频负面词22条...]
```

---

### Runway（📝 模板兼容）

**特点**：英文，Motion+Camera+Duration 结构。

```
[画面描述].
Motion: [主体运动描述].
Camera: [相机运动].
Duration: [X]s.
Style: Cinematic, ARRI ALEXA 35, anamorphic lens, film grain.
```

---

### 可灵 Kling（📝 模板兼容）

**特点**：中文原生，运动描述 + 时长标注。

```
[中文画面描述]，[相机运动]，[主体运动]，[环境运动]，
时长[X]秒，电影质感，ARRI摄影机风格。
```

---

## 多平台一键输出

用户说 `一键全平台` 时：

```
【GPT Image 版本】
```中文 prompt```

【Midjourney v6 版本】
```英文 prompt --v 6 --ar 16:9 --s 250 --style raw```

【Stable Diffusion XL 版本】
正面：```英文 prompt```
负面：```负面提示词```
参数：Steps 30-50, CFG 7-9, 1024x576

【DALL-E 3 版本】
```英文 prompt```
```

---

## 行业格式导出

### Storyboard Pro

```
PROJECT: [片名]
DURATION: [总时长]
FPS: 24
ASPECT RATIO: 16:9

FRAME 01
SHOT: [景别]
CAMERA: [运镜]
DURATION: [秒]s
VIDEO: [画面描述]
CHARACTER: [角色名]
DIALOGUE: "[对白]"
SFX: [音效]
MUSIC: [音乐 mood]
NOTES: [导演注释]
```

### FrameForge

```
Camera: Position/[X,Y,Z] | Angle/[角度] | Lens/[焦段]mm | Movement/[运镜]
Scene: Location/[场景] | Time/[时间] | Weather/[天气]
Characters: [角色名]/[位置]
Action: [动作描述]
Duration: [秒]s
```

### Celtx

```
                    [片名]

场景 [编号]. [内/外] [地点] - [时间]

[场景描述]

                    [角色名]
          [对白内容]

[动作描述]

切至：
```

---

## 平台适配状态

| 平台 | Prompt 模板 | API 实测 | 状态 |
|------|-----------|---------|------|
| GPT Image | ✅ | ⬜ | 📝 模板兼容 |
| Midjourney | ✅ | ⬜ | 📝 模板兼容 |
| SD/SDXL/SD3 | ✅ | ⬜ | 📝 模板兼容 |
| DALL-E 3 | ✅ | ⬜ | 📝 模板兼容 |
| ComfyUI | 基础 | ⬜ | 🔧 社区扩展 |
| Seedance | ✅ | ⬜ | 📝 模板兼容 |
| Runway | ✅ | ⬜ | 📝 模板兼容 |
| 可灵 | ✅ | ⬜ | 📝 模板兼容 |

> 各平台 Prompt 格式按官方文档规范输出。实际出图/出片效果取决于平台模型能力。
> 遇到不兼容 → [提交 Issue](https://github.com/jijiutong/ai-visual-director/issues/new?template=platform-compatibility.md)

---

## 参考文件

| 文件 | 内容 |
|------|------|
| `platforms/platform.md` | 图像平台适配详情 |
| `platforms/platform-advanced.md` | 平台深度优化（MJ --cref / SD ControlNet） |
| `platforms/video-prompt.md` | 视频平台适配详情 |
| `knowledge/industry-export.md` | 行业格式导出 |
| `tests/platform-compatibility.md` | 平台格式测试矩阵 |
