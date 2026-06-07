# 多 AI 平台适配

适配 GPT Image 2 / Midjourney / Stable Diffusion 不同 prompt 格式和特性。

## 平台特性对比

| 特性 | GPT Image 2 | Midjourney v6 | Stable Diffusion XL |
|------|-------------|---------------|---------------------|
| 文字理解 | 强（中英混合） | 中（英文优先） | 弱（需精准英文） |
| 中文输入 | ✅ 直接支持 | ⚠️ 需翻译 |  不支持 |
| 排版能力 | 强（多模块） | 中（单图为主） | 弱（需 ControlNet） |
| 角色一致性 | 中 | 强（--cref） | 强（IP-Adapter） |
| 分辨率 | 高 | 极高 | 取决于模型 |
| 风格控制 | 自然语言 | 参数化（--v --s） | 参数化（CFG/Steps） |

## GPT Image 2 格式（默认）

**特点**：直接中文输入，自然语言描述，支持复杂排版。

```text
[中文完整描述]，[英文关键词补充]。质量要求：ultra-detailed, professional film production layout, cinematic shot, film grain, 8K, sharp focus, coherent character design, consistent costume, clean layout, no watermark, no garbled Chinese, no broken faces, no duplicated limbs, no messy panels, no low-quality collage。
```

## Midjourney v6 格式

**转换规则**：
1. 中文→英文翻译
2. 追加 MJ 参数
3. 使用 `--v 6 --ar 16:9 --s 250`

```text
[英文完整描述], cinematic storyboard sheet, professional film production layout, visual development board, ARRI ALEXA 35, anamorphic lens, strong contrast lighting, film grain, volumetric light, ultra-detailed, 8K, clean industrial layout, coherent character design --v 6 --ar 16:9 --s 250 --style raw
```

**MJ 专属参数**：
- `--ar 16:9` / `--ar 9:16` / `--ar 2:3` — 画幅
- `--v 6` — 版本
- `--s 250` — 风格化程度（0-1000）
- `--style raw` — 减少 MJ 自身风格干扰
- `--cref [URL]` — 角色一致性引用
- `--sref [URL]` — 风格一致性引用
- `--no text, watermark, logo` — 负面提示

## Stable Diffusion XL 格式

**转换规则**：
1. 中文→精准英文
2. 分离正负面提示词
3. 提供参数建议

**正面提示词**：
```text
(masterpiece, best quality, ultra-detailed:1.2), cinematic storyboard sheet, professional film production layout, visual development board, [场景描述], [角色描述], ARRI ALEXA 35, anamorphic lens, 2.39:1 cinematic crop, shallow depth of field, film grain, high contrast lighting, rim light, backlight, volumetric light, motion blur, dynamic composition, professional cinematography, 8K, sharp focus, coherent character design
```

**负面提示词**：
```text
(worst quality, low quality:1.4), (normal quality:1.4), watermark, logo, text, garbled text, broken faces, duplicated limbs, extra fingers, mutated hands, poorly drawn face, blurry, out of focus, messy panels, collage, flat illustration, cartoon, deformed, disfigured, bad anatomy
```

**推荐参数**：
- Sampler: DPM++ 2M Karras / Euler a
- Steps: 30-50
- CFG Scale: 7-9
- Resolution: 1024x576 (16:9) / 576x1024 (9:16)
- Model: Juggernaut XL / RealVisXL

## 平台自动切换

**用户指令**：
- "用 MJ" / "Midjourney" → 输出 MJ 格式
- "用 SD" / "Stable Diffusion" → 输出 SD 格式
- 默认 → GPT Image 2 格式

**输出格式**：

```
【GPT Image 2 版本】
```中文 prompt```

【Midjourney v6 版本】
```英文 prompt --v 6 --ar 16:9 --s 250 --style raw```

【Stable Diffusion XL 版本】
正面：```英文 prompt```
负面：```负面提示词```
参数：Steps 30-50, CFG 7-9, 1024x576
```
