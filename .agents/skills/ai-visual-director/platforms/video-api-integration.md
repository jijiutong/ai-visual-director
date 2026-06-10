# AI 视频生成 API 集成

直接通过 API 调用各视频平台生成视频。

---

## 配置

```bash
# Seedance 2.0 (火山引擎 Ark)
ARK_API_KEY=xxxxxxxxxxxx

# Runway Gen-4.5
RUNWAY_API_KEY=key_xxxxxxxxxxxx

# 可灵 Kling (阿里云百炼)
KLING_API_KEY=xxxxxxxxxxxx

# Luma Dream Machine
LUMAAI_API_KEY=xxxxxxxxxxxx

# Pika (via fal.ai)
FAL_API_KEY=xxxxxxxxxxxx
```

---

## 一、Seedance 2.0（火山引擎 Ark）

官方 API，字节跳动。中文原生、多参考图、原生音频。

```javascript
// 异步：创建任务 → 轮询结果
const response = await fetch("https://ark.cn-beijing.volces.com/api/v3/v1/contents/generations/tasks", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.ARK_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "doubao-seedance-2-0-260128",  // 或 doubao-seedance-2-0-fast-260128
    content: [{
      type: "text",
      text: "[中文 prompt]"
    }, {
      type: "image_url",   // 参考图（可选）
      image_url: { url: "https://..." }
    }]
  })
});

const { id } = await response.json();
// 轮询 GET /api/v3/v1/contents/generations/tasks/{id}
// 状态: queued → running → succeeded → 下载视频
```

**参数**：时长 4-15s、480p/720p/1080p、16:9/9:16/1:1 等、24FPS、原生音频
**成本**：~$0.93/5s 1080p

---

## 二、Runway Gen-4.5

官方 REST API + SDK，最成熟的视频 API。

```javascript
import RunwayML from "@runwayml/sdk";
const client = new RunwayML({ apiKey: process.env.RUNWAY_API_KEY });

const task = await client.imageToVideo.create({
  model: "gen4.5",
  promptText: "[英文 prompt]",
  promptImage: "https://...",  // 参考图 URL
  ratio: "1280:720",
  duration: 5,
}).waitForTaskOutput();
```

或直接 REST：
```bash
curl -X POST "https://api.dev.runwayml.com/v1/text_to_video" \
  -H "Authorization: Bearer $RUNWAY_API_KEY" \
  -d '{"model":"gen4.5","prompt_text":"...","duration":5}'
```

**模型**：Gen-4.5、Gen-4、Gen-4 Turbo、Aleph 2.0（视频编辑）
**成本**：按秒计费，~$0.05-0.15/s

---

## 三、可灵 Kling（KlingAI / 阿里云百炼）

中文最强视频生成，Kling 3.0 支持 4K。

```javascript
// 阿里云百炼
const response = await fetch("https://dashscope.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.KLING_API_KEY}`,
    "Content-Type": "application/json",
    "X-DashScope-Async": "enable"
  },
  body: JSON.stringify({
    model: "kling-v3",
    input: {
      prompt: "[中文 prompt]",
      media: [{ type: "first_frame", url: "https://..." }]  // 可选首帧图
    },
    parameters: {
      mode: "pro",        // std 720p / pro 1080p
      duration: 5,        // 3-15s
      aspect_ratio: "16:9",
      audio: true
    }
  })
});
// 轮询 GET 任务结果
```

**亮点**：4K 输出、多镜头智能分镜、角色 ID 复用跨视频一致、原生音频
**成本**：~$0.3-0.5/10s

---

## 四、Luma Dream Machine

官方 REST API，支持多关键帧插值。

```javascript
const response = await fetch("https://api.lumalabs.ai/dream-machine/v1/generations", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.LUMAAI_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "[英文 prompt]",
    aspect_ratio: "16:9",
    duration: "5s",
    keyframes: {
      frame0: { type: "image", url: "https://..." },  // 首帧
      frame1: { type: "image", url: "https://..." }   // 尾帧（可选）
    }
  })
});
```

**模型**：Ray 2、Ray Flash 2
**亮点**：首尾帧插值天然支持、循环视频
**成本**：按秒计费

---

## 五、Pika（via fal.ai）

无官方 API，通过 fal.ai 调用 Pika 2.2。

```javascript
const response = await fetch("https://queue.fal.run/fal-ai/pika", {
  method: "POST",
  headers: {
    "Authorization": `Key ${process.env.FAL_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "[英文 prompt]",
    image_url: "https://...",
    duration: 5
  })
});
```

**注意**：非官方 API，Pika 2.5 暂无 API

---

## 平台选择指南

| 需求 | 推荐平台 |
|------|---------|
| 中文原生、多参考图输入、音频输出 | Seedance 2.0 |
| 企业级、SDK 完善、模型最多 | Runway Gen-4.5 |
| 4K 输出、中文最强、角色 ID 复用 | 可灵 Kling |
| 首尾帧插值、丝滑过渡 | Luma Dream Machine |
| 社交短视频、快速验证 | Pika (fal.ai) |

### 成本参考

| 平台 | 单价 |
|------|------|
| Seedance 2.0 (1080p 5s) | ~$0.93/条 |
| Runway Gen-4.5 (720p 5s) | ~$0.25-0.75/条 |
| 可灵 Kling Pro (1080p 5s) | ~$0.15-0.25/条 |
| Luma Ray 2 (5s) | ~$0.10-0.20/条 |
| Pika (fal.ai 1080p) | ~$0.45/条 |
