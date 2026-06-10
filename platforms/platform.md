# 多 AI 平台适配

适配 GPT Image 2/3 / Midjourney v6/v7 / Stable Diffusion XL/3 / DALL-E 3 等不同平台的 prompt 格式和特性。

---

## 一、平台特性对比

| 特性 | GPT Image 2/3 | Midjourney v6/v7 | SDXL/SD3 | DALL-E 3 |
|------|---------------|------------------|---------|----------|
| 文字理解 | 强（中英混合） | 中→强（英文优先） | 弱→中（需精准英文） | 强（英文） |
| 中文输入 | ✅ 直接支持 | ⚠️ 需翻译 | ❌ 不支持 | ❌ 不支持 |
| 排版能力 | ⭐⭐ 最强（多模块） | ⭐ 单图为主 | ⭐ 需 ControlNet | ⭐⭐ 强 |
| 角色一致性 | ⭐⭐ 中 | ⭐⭐⭐ --cref/--sref | ⭐⭐⭐ IP-Adapter | ⭐⭐ 中 |
| 分辨率 | 1024×1024+ | 2048+ | 取决于模型 | 1024×1024+ |
| 风格控制 | 自然语言 | 参数化（--v --s） | 参数化（CFG/Steps） | 自然语言 |
| 速度 | 快 | 中 | 取决于硬件 | 快 |
| 价格 | 中 | 订阅制 | 免费/低成本 | 中 |

---

## 二、GPT Image 2/3 格式（默认）

**特点**：直接中文输入，自然语言描述，支持复杂排版。

```text
[中文完整描述]，[英文关键词补充]。质量要求：ultra-detailed, professional film production layout, cinematic shot, film grain, 8K, sharp focus, coherent character design, consistent costume, clean layout, no watermark, no garbled Chinese, no broken faces, no duplicated limbs, no messy panels, no low-quality collage。
```

---

## 三、Midjourney v6/v7 格式

**转换规则**：
1. 中文→英文翻译
2. 追加 MJ 参数
3. v7 使用 `--v 7`，v6 使用 `--v 6`

```text
[英文完整描述], cinematic storyboard sheet, professional film production layout, visual development board, ARRI ALEXA 35, anamorphic lens, strong contrast lighting, film grain, volumetric light, ultra-detailed, 8K, clean industrial layout, coherent character design --v 7 --ar 16:9 --s 250 --style raw
```

**MJ 参数速查**：

| 参数 | 说明 | 示例 |
|------|------|------|
| `--ar` | 画幅 | `--ar 16:9` `--ar 9:16` `--ar 2:3` `--ar 21:9` |
| `--v` | 版本 | `--v 6` `--v 7` |
| `--s` | 风格化(0-1000) | `--s 50` 忠实 / `--s 250` 默认 / `--s 750` 风格化 |
| `--style` | 风格模式 | `--style raw` 减少MJ干扰 |
| `--cref` | 角色一致 | `--cref URL` 引用角色图 |
| `--sref` | 风格一致 | `--sref URL` 引用风格图 |
| `--cw` | 一致权重(0-100) | `--cw 80` 服装+面部 / `--cw 0` 仅面部 |
| `--no` | 负面提示 | `--no text, watermark, logo` |
| `--tile` | 无缝贴图 | `--tile` |
| `--chaos` | 多样性(0-100) | `--c 30` 增加变化 |

---

## 四、Stable Diffusion XL/3 格式

**转换规则**：
1. 中文→精准英文
2. 分离正负面提示词
3. 提供参数建议

**正面提示词**：
```text
(masterpiece, best quality, ultra-detailed:1.2), cinematic storyboard sheet, professional film production layout, [场景描述], [角色描述], ARRI ALEXA 35, anamorphic lens, 2.39:1 cinematic crop, shallow depth of field, film grain, high contrast lighting, rim light, backlight, volumetric light, motion blur, dynamic composition, professional cinematography, 8K, sharp focus
```

**负面提示词**：
```text
(worst quality, low quality:1.4), (normal quality:1.4), watermark, logo, text, garbled text, broken faces, duplicated limbs, extra fingers, mutated hands, poorly drawn face, blurry, out of focus, messy panels, collage, flat illustration, cartoon, deformed, disfigured, bad anatomy, bad hands, missing fingers
```

**推荐参数**：

| 参数 | SDXL | SD3 |
|------|------|-----|
| Sampler | DPM++ 2M Karras | Euler |
| Steps | 30-50 | 28-40 |
| CFG Scale | 7-9 | 4-7 |
| Resolution | 1024×576 (16:9) | 1024×1024 |
| 推荐模型 | Juggernaut XL / RealVisXL | SD3 Medium / Pony |

---

## 五、DALL-E 3 格式

**特点**：强文字理解、自然语言、英文输入。

```text
[英文完整描述]. Professional cinematic storyboard layout, film production quality. [角色描述], [场景描述]. Quality: ultra-detailed, 8K resolution, sharp focus, consistent character design, no watermark, no text overlay.
```

---

## 六、平台自动切换

**用户指令**：
- "用 MJ" / "Midjourney" → 输出 MJ 格式
- "用 SD" / "Stable Diffusion" → 输出 SD 格式
- "用 DALL-E" → 输出 DALL-E 格式
- 默认 → GPT Image 2/3 格式

**输出格式**：

```
【GPT Image 版本】
```中文 prompt```

【Midjourney v7 版本】
```英文 prompt --v 7 --ar 16:9 --s 250 --style raw```

【Stable Diffusion 版本】
正面：```英文 prompt```
负面：```负面提示词```
参数：Steps 30-50, CFG 7-9, 1024x576
```
