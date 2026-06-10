# Prompt 压缩引擎

超长 prompt 自动精简到平台最佳长度。

## 平台长度限制

| 平台 | 限制 | 最佳长度 | 策略 |
|------|------|---------|------|
| Midjourney | ~1000 词 | 400-600 词 | 保留核心描述，删除修饰 |
| Stable Diffusion | ~380 词 | 200-300 词 | 关键词化，删除完整句 |
| DALL-E 3 | 无严格限制 | 500-800 词 | 自然语言，结构化 |
| GPT Image 2 | 无严格限制 | 600-1000 字 | 完整描述，中文优先 |
| 可灵 (Kling) | ~500 字 | 200-400 字 | 精简中文描述 |
| Sora | ~2000 字符 | 800-1200 字符 | 自然语言+运动描述 |

## 压缩策略

### 优先级排序

1. **必须保留**（不压缩）：
   - 核心画面描述（场景+角色+动作）
   - 画幅比例
   - 质量要求
   - 负面提示词

2. **可精简**（缩短描述）：
   - 氛围关键词（选最重要的3个）
   - 色彩描述（保留主色+点缀色）
   - 灯光描述（保留主光+轮廓光）
   - 镜头语言（保留摄影机+焦段+画幅）

3. **可删除**（平台受限时）：
   - 多版本说明
   - 关系加成详细描述
   - 情绪曲线分段详情
   - 导演阐述
   - 技术细节（快门/颗粒等）

### 压缩示例

**完整版（GPT Image 2，800字）**：
```
请生成一张电影级漫剧视觉开发板，主题为《雨夜独行》，故事核心：一个人与失去的对抗。整体风格：5. 都市情绪电影板，都市情绪/城市孤独/光影温柔。画幅16:9...[详细描述每个模块]...
```

**压缩版（Midjourney，300词）**：
```
Cinematic storyboard sheet, theme "Rain Night Walker", urban emotion film board style, 16:9, professional film production layout, ARRI ALEXA 35, anamorphic lens, strong contrast lighting, film grain, ultra-detailed, 8K, no watermark --v 6 --ar 16:9 --s 250 --style raw
```

**极限压缩版（SD，150词）**：
```
(masterpiece, best quality:1.2), cinematic storyboard sheet, professional layout, ARRI ALEXA 35, anamorphic lens, 2.39:1, film grain, high contrast lighting, volumetric light, ultra-detailed, 8K --neg (worst quality:1.4)
```

## 用户指令

| 用户指令 | 行为 |
|---------|------|
| "压缩到MJ" | 压缩到 Midjourney 最佳长度 |
| "压缩到SD" | 压缩到 Stable Diffusion 最佳长度 |
| "极限压缩" | 压缩到平台最低限制 |
| 默认 | 按目标平台自动压缩 |
