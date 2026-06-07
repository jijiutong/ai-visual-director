# AI 视频 Prompt 适配器

把故事板直接转成 Sora / Runway Gen-3 / 可灵 / Pika 等视频生成平台的 prompt，带运动方向和时长标注。

## 视频平台特性对比

| 特性 | Sora | Runway Gen-3 | 可灵 (Kling) | Pika |
|------|------|-------------|-------------|------|
| 时长 | 最长 60s | 5-10s | 5-10s | 3-5s |
| 运动控制 | 自然语言描述 | 运动笔刷/Motion Brush | 运动笔刷 | 相机控制 |
| 角色一致性 | 中 | 强（角色参考） | 强（角色参考） | 中 |
| 中文输入 | ✅ | ⚠️ | ✅ | ⚠️ |
| 镜头语言理解 | 强 | 强 | 强 | 中 |

## 视频 Prompt 转换规则

### 从故事板到视频 Prompt

每个镜头转换为独立视频 prompt，追加运动参数：

```
原始分镜 → 视频 Prompt：
[画面描述] + [运动方向] + [时长] + [转场] + [风格参考]
```

### 运动方向描述

| 类型 | 视频平台关键词 | 说明 |
|------|--------------|------|
| 推近 | "camera slowly pushes in towards subject" | 镜头缓慢推进 |
| 拉远 | "camera pulls back revealing wider scene" | 镜头拉远揭示环境 |
| 摇摄 | "camera pans left/right following subject" | 水平跟随 |
| 环绕 | "camera orbits around subject 180 degrees" | 环绕拍摄 |
| 升降 | "camera cranes up/down" | 垂直移动 |
| 跟踪 | "camera tracks alongside subject walking" | 侧面跟随 |
| 手持 | "subtle handheld camera shake" | 轻微手持抖动 |
| 静止 | "static camera, minimal movement" | 固定镜头 |
| 疾推 | "rapid zoom in to close-up" | 快速推进 |
| 慢动作 | "slow motion, 0.5x speed" | 慢速播放 |

### 转场描述

| 转场类型 | 视频关键词 |
|---------|-----------|
| 硬切 | "hard cut to next shot" |
| 叠化 | "dissolve transition" |
| 淡入 | "fade in from black" |
| 淡出 | "fade out to black" |
| 划像 | "wipe transition" |

## 按平台输出格式

### Sora 格式

```
[完整画面描述]，[运动方向]，[时长标注]。[风格描述]，cinematic shot, 4K, professional cinematography. [负面描述].
```

例：
```
A lone figure in a dark trench coat walks across a rain-slicked city bridge at night, neon reflections shimmering on wet asphalt. Camera slowly pushes in from wide establishing shot to medium shot over 5 seconds, subtle handheld camera shake adding tension. Cinematic mood, rain droplets on lens, city skyline bokeh in background, ARRI ALEXA 35 aesthetic, 4K, professional cinematography. No text, no watermark, no broken faces.
```

### Runway Gen-3 格式

```
[画面描述]。
Motion: [运动笔刷描述]
Camera: [相机运动]
Duration: [时长]
Style: [风格参考]
```

例：
```
Two figures in a dimly lit office at night, desk lamp warm glow illuminating their faces, city lights through floor-to-ceiling windows.
Motion: Subtle character movement, breathing, slight head turn
Camera: Slow push in from medium to close-up over 8 seconds
Duration: 8s
Style: Cinematic, ARRI ALEXA 35, anamorphic lens, film grain
```

### 可灵 (Kling) 格式

```
[中文画面描述]，[运动方向]，时长[秒]秒，[风格]。
```

例：
```
深夜办公室，台灯暖光照射下两人脸庞，窗外城市霓虹虚化，暧昧氛围，镜头缓慢推近从中景到近景，时长8秒，电影质感，ARRI摄影机风格。
```

## 分镜→视频完整转换

用户说"转视频"时，将全部分镜转换为视频 prompt 序列：

```
【视频生成序列】共 [N] 个镜头，总时长约 [X] 秒：

镜头 1（[时长]s）：[视频 prompt]
镜头 2（[时长]s）：[视频 prompt]
...

转场：[转场描述]
总时长：[总秒数]s
```

## 在 Prompt 中使用

追加视频适配标注：

```
视频适配：[平台名称] 格式。镜头1：[运动] [时长]。镜头2：[运动] [时长]。转场 [转场类型]。总时长 [X] 秒。
```
