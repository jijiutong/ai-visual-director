# AI 图片生成 API 集成

直接通过 API 调用各平台生成图片，不再需要手动复制 prompt。

---

## 配置

模型名、API 端点、Key 统一在 `api-config.template.env` 中配置，代码从环境变量读取。以下代码中的 `${...}` 引用对应配置项：

| 平台 | Key 变量 | 模型变量 | 端点变量 |
|------|---------|---------|---------|
| GPT Image | `OPENAI_API_KEY` | `GPT_IMAGE_MODEL` | `GPT_IMAGE_ENDPOINT` |
| Nano Banana | `GEMINI_API_KEY` | `NANO_BANANA_MODEL` | `NANO_BANANA_ENDPOINT` |
| Flux | `REPLICATE_API_TOKEN` | `FLUX_MODEL` | `FLUX_ENDPOINT` |
| Ideogram | `IDEOGRAM_API_KEY` | `IDEOGRAM_MODEL` | `IDEOGRAM_ENDPOINT` |
| 通义万相 | `DASHSCOPE_API_KEY` | `TONGYI_MODEL` | `TONGYI_ENDPOINT` |
| Recraft | `RECRAFT_API_KEY` | `RECRAFT_MODEL` | `RECRAFT_ENDPOINT` |
| ComfyUI | — | `COMFYUI_MODEL` | `COMFYUI_ENDPOINT` |
| Stability AI | `STABILITY_API_KEY` | `STABILITY_MODEL` | `STABILITY_ENDPOINT` |

所有配置的默认值见 `api-config.template.env`。

---

## 一、GPT Image (OpenAI DALL-E 3)

```javascript
const response = await fetch(process.env.GPT_IMAGE_ENDPOINT, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: process.env.GPT_IMAGE_MODEL,
    prompt: `[中文 prompt]`,
    n: 1,
    size: "1792x1024",  // 16:9, 也可 1024x1024 / 1024x1792
    quality: "hd",
    style: "vivid"       // vivid=鲜艳, natural=自然
  })
});

const result = await response.json();
const imageUrl = result.data[0].url;
```

**适用场景**：中文 prompt 原生支持，复杂排版（全案板/漫画分镜/情绪板），文字渲染能力强

---

## 二、Nano Banana (Google Gemini Image)

Google Gemini 图片生成，代号 Nano Banana。端点和模型从 `NANO_BANANA_ENDPOINT` / `NANO_BANANA_MODEL` 配置读取。需海外网络或代理。

```javascript
const endpoint = process.env.NANO_BANANA_ENDPOINT.replace("{model}", process.env.NANO_BANANA_MODEL);
const response = await fetch(`${endpoint}?key=${process.env.GEMINI_API_KEY}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: `[中文 prompt，原生支持]` }]
    }],
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"]
    }
  })
});

const result = await response.json();
// 图片在 result.candidates[0].content.parts 中
const imageData = result.candidates[0].content.parts
  .find(p => p.inlineData)?.inlineData?.data;
```

**优势**：
- 中文原生支持，文字渲染 94% 准确率
- 支持 14 张参考图（角色一致性最强）
- 免费额度可用，Pro $0.24/4K 图
- 支持多轮对话编辑（说"把头发改短"直接改）
- 4K 分辨率，9 种画幅比

**适用场景**：角色一致性要求高的场景、多参考图输入、中文排版

---

## 三、Flux (via Replicate)

**模型**：`black-forest-labs/flux-1.1-pro` / `flux-dev` / `flux-schnell`

```javascript
const response = await fetch(process.env.FLUX_ENDPOINT, {
  method: "POST",
  headers: {
    "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    // 使用特定版本号，避免每次拉最新
    version: "f2fe2b3b5a1e0e0e0e0e0e0e0e0e0e0e0e1e0e0e0e",
    input: {
      prompt: `[中文 prompt + 英文关键词]`,
      aspect_ratio: "16:9",
      output_format: "png",
      output_quality: 100,
      num_outputs: 1
    }
  })
});

const result = await response.json();
// 轮询获取结果
const imageUrl = await pollPrediction(result.id);
```

**适用场景**：高质量单图、角色卡、场景卡、海报

---

## 四、Ideogram

端点和模型从配置读取：`IDEOGRAM_ENDPOINT` / `IDEOGRAM_MODEL`。需海外网络。

```javascript
const response = await fetch(process.env.IDEOGRAM_ENDPOINT, {
  method: "POST",
  headers: {
    "Api-Key": process.env.IDEOGRAM_API_KEY,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    image_request: {
      prompt: `[英文 prompt]`,
      aspect_ratio: "ASPECT_16_9",
      model: process.env.IDEOGRAM_MODEL,
      magic_prompt_option: "AUTO",
      num_images: 1
    }
  })
});

const result = await response.json();
const imageUrl = result.data[0].url;
```

**适用场景**：需要文字排版的海报、封面、标题图（Ideogram 文字能力强）

---

## 五、通义万相 (Alibaba Cloud DashScope)

模型：`qwen-image-2.0-pro`，支持文本+图片混合输入。

```javascript
const response = await fetch(process.env.TONGYI_ENDPOINT, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.DASHSCOPE_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: process.env.TONGYI_MODEL,
    input: {
      messages: [{
        role: "user",
        content: [{ text: `[中文 prompt]` }]
      }]
    },
    parameters: {
      size: "1792*1024"  // 16:9
    }
  })
});

const result = await response.json();
const imageUrl = result.output.choices[0].message.content[0].image;
```

**适用场景**：中文理解强，古风/国风/东方题材效果好

---

## 六、ComfyUI (本地)

端点从 `COMFYUI_ENDPOINT` 配置读取（默认 `{COMFYUI_BASE_URL}/prompt`）。

```javascript
const response = await fetch(process.env.COMFYUI_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    prompt: workflow  // ComfyUI 工作流 JSON
  })
});

const { prompt_id } = await response.json();

// 2. 轮询结果
const result = await pollComfyUI(prompt_id);

// 3. 下载图片
const imageUrl = `${COMFYUI_BASE_URL}/view?filename=${result.filename}`;
```

**适用场景**：SDXL/SD3/Flux 本地运行，ControlNet，批量出图，角色一致性最强

---

## 七、Stable Diffusion 3 (Stability AI)

**模型**：`sd3`（通过 `text-to-image` endpoint）。SD3 输出为 PNG 图片。

```javascript
const formData = new FormData();
formData.append("prompt", `[英文 prompt]`);
formData.append("output_format", "png");
formData.append("aspect_ratio", "16:9");
formData.append("model", process.env.STABILITY_MODEL);

const response = await fetch(process.env.STABILITY_ENDPOINT, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
    "Accept": "image/*"
  },
  body: formData
});

// 返回二进制 PNG，需要 base64
const buffer = await response.arrayBuffer();
const base64 = Buffer.from(buffer).toString("base64");
const imageUrl = `data:image/png;base64,${base64}`;
```

**注意**：SD3 直接返回 PNG 二进制数据（Accept: image/*），不是 JSON。仅在出错时返回 JSON。

**适用场景**：SD3 角色一致性好，SDXL 生态成熟，ControlNet 精细控制

---

## 八、Midjourney（无官方 API）

Midjourney 没有公开 REST API，只有 Discord Bot 方式。推荐替代：
- **SDXL 替代** → 用 Stability AI API 或 ComfyUI 本地
- **画质替代** → 用 Flux (Replicate)，画质接近甚至超越 MJ
- **角色一致替代** → 用 ComfyUI + IP-Adapter，一致性远超 MJ --cref

如必须用 Midjourney：通过 Discord Bot 发送 `/imagine` 命令（需 Discord Token + 订阅 MJ），不推荐生产使用。

---

## 九、Recraft

```javascript
const response = await fetch("https://external.api.recraft.ai/v1/images/generations", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.RECRAFT_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: `[英文 prompt]`,
    style: "digital_illustration",
    model: "recraftv3",
    size: "1792x1024"  // 字符串格式
  })
});

const result = await response.json();
const imageUrl = result.data[0].url;
```

**适用场景**：矢量风格、设计感、插画风

---

## 通用调用模式

所有平台统一调用方式：

```
用户："用 [平台] 生成 [格式]"
      ↓
AI 从模板生成 prompt
      ↓
AI 调用对应平台 API（用 node_repl MCP）
      ↓
返回图片 URL / 下载到本地
```

### 平台选择指南

| 需求 | 推荐平台 |
|------|---------|
| 中文原生、14 张参考图、角色一致性最强 | Nano Banana (Gemini) |
| 中文 prompt、排版复杂（全案板/漫画/情绪板） | GPT Image (DALL-E 3) |
| 高质量单图、角色卡 | Flux (Replicate) |
| 文字排版海报 | Ideogram |
| 古风/国风/东方 | 通义万相 |
| 角色一致性最强 | ComfyUI (本地 SDXL+IP-Adapter) |
| 快速批量 | Flux Schnell / 通义万相 |
| 矢量/设计风 | Recraft |

### 成本参考

| 平台 | 单价 | 
|------|------|
| Nano Banana Pro (4K) | ~$0.24/张（免费额度可用） |
| GPT Image (DALL-E 3 HD) | ~$0.08/张 |
| Flux Pro (Replicate) | ~$0.05/张 |
| Flux Schnell | ~$0.003/张 |
| Ideogram | ~$0.04/张 |
| 通义万相 | ~¥0.08/张 |
| ComfyUI | 本地免费 |
| Recraft | 免费额度 50 张/天 |
