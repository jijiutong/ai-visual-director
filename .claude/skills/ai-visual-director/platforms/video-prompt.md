# AI 视频 Prompt 适配器

把故事板直接转成 Sora / Runway Gen-3 / 可灵(Kling) / Luma Dream Machine / Pika 等视频生成平台的 prompt，带运动方向、时长和转场标注。

---

## 一、视频平台特性对比

| 特性 | Sora | Runway Gen-3 | 可灵(Kling) | Luma Dream | Pika |
|------|------|-------------|-------------|-----------|------|
| 最长时长 | 60s | 10s | 10s(可扩展) | 5s | 5s |
| 分辨率 | 1080p | 1080p | 1080p | 1080p | 720p |
| 运动控制 | 自然语言 | 运动笔刷 | 运动笔刷+相机 | 相机控制 | 相机控制 |
| 角色一致 | 中(首帧参考) | 强(角色参考图) | 强(角色参考图) | 中(首帧) | 弱 |
| 中文输入 | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ |
| 镜头语言理解 | 强 | 强 | 强 | 中 | 中 |
| 物理模拟 | 强 | 中 | 中 | 中 | 弱 |
| 价格 | 高 | 中 | 中 | 低 | 低 |

---

## 二、运动方向描述库

### 相机运动

| 类型 | 视频平台关键词 | 中文 |
|------|--------------|------|
| 推近 | "camera slowly pushes in towards subject" | 镜头缓慢推进 |
| 拉远 | "camera pulls back revealing wider scene" | 镜头拉远揭示环境 |
| 摇左 | "camera pans left following subject" | 镜头左摇跟随 |
| 摇右 | "camera pans right following subject" | 镜头右摇跟随 |
| 环绕 | "camera orbits around subject 180 degrees" | 环绕拍摄180度 |
| 升降 | "camera cranes up to reveal" | 镜头升起揭示 |
| 下降 | "camera descends from above" | 从上方下降 |
| 跟踪 | "camera tracks alongside subject walking" | 侧面跟随移动 |
| 手持 | "subtle handheld camera shake" | 轻微手持抖动 |
| 静止 | "static camera, minimal movement" | 固定镜头 |
| 疾推 | "rapid zoom in to close-up" | 快速推进到特写 |
| 俯拍 | "bird's eye view looking straight down" | 鸟瞰正下方 |
| 倾斜俯拍 | "high angle shot looking down at 45 degrees" | 45度俯拍 |
| 跟随上升 | "camera rises with subject ascending" | 跟随主体上升 |
| 后退跟随 | "camera moves backwards as subject approaches" | 后退跟随 |

### 主体运动

| 类型 | 描述 | 适用 |
|------|------|------|
| 呼吸 | "subtle breathing, chest rising and falling" | 近景/特写 |
| 转头 | "slowly turns head to look at camera" | 发现/觉醒 |
| 伸手 | "reaches out hand slowly" | 暧昧/触碰 |
| 握拳 | "fist clenches tightly" | 愤怒/决心 |
| 转身 | "turns around dramatically" | 反转/对峙 |
| 行走 | "walks forward with determined stride" | 行进/追击 |
| 奔跑 | "running at full speed towards/away" | 追逐/逃跑 |
| 倒下 | "falls backwards in slow motion" | 中弹/摔倒 |
| 抬头 | "looks up at the sky in awe" | 发现/震撼 |
| 低头 | "bows head in sorrow" | 悲伤/屈服 |
| 流泪 | "a single tear rolls down cheek" | 虐心/感动 |
| 微笑 | "slow genuine smile spreading across face" | 治愈/甜蜜 |

### 环境运动

| 类型 | 描述 | 适用 |
|------|------|------|
| 风起 | "wind picks up, hair and clothes billowing" | 气场/能量 |
| 云涌 | "clouds gathering and churning rapidly" | 压迫/风暴 |
| 雨落 | "heavy rain pouring, water splashing" | 悲伤/战斗 |
| 雪飘 | "snowflakes gently falling and accumulating" | 纯净/孤独 |
| 火焰 | "fire burning and flickering, sparks rising" | 战争/温暖 |
| 雾散 | "fog slowly dissipating revealing landscape" | 真相/觉醒 |
| 光变 | "light shifting from warm to cold tones" | 情绪转变 |
| 水面 | "water rippling and reflecting light" | 倒影/平静 |

---

## 三、转场描述

| 转场类型 | 视频关键词 | 适用 |
|---------|-----------|------|
| 硬切 | "hard cut to next shot" | 动作/快切 |
| 叠化 | "dissolve transition blending into next scene" | 回忆/时间流逝 |
| 淡入 | "fade in from black" | 开场 |
| 淡出 | "fade out to black" | 结尾 |
| 闪白 | "flash of white transitioning to next scene" | 爆炸/觉醒 |
| 匹配剪辑 | "match cut: similar shape/motion connects to next shot" | 艺术转场 |
| 遮挡转场 | "subject walks past camera blocking view, reveals new scene" | 无缝转场 |
| 甩镜头 | "whip pan blur transitioning to next location" | 快节奏 |

---

## 四、按平台输出格式

### Sora

```
[完整画面描述]，[相机运动]，[主体运动]，[环境运动]，[时长标注]。[风格描述]，cinematic shot, 4K, professional cinematography.
```

例：
```
A lone figure in a dark trench coat walks across a rain-slicked city bridge at night, neon reflections shimmering on wet asphalt. Camera slowly pushes in from wide establishing shot to medium shot over 5 seconds. Figure walks with determined stride, wind picking up billowing the coat. Cinematic mood, rain droplets on lens, city skyline bokeh in background, ARRI ALEXA 35 aesthetic, 4K, professional cinematography.
```

### Runway Gen-3

```
[画面描述]
Motion: [运动笔刷/主体运动描述]
Camera: [相机运动]
Duration: [时长]
Style: [风格参考]
```

例：
```
Two figures in a dimly lit office at night, desk lamp warm glow illuminating their faces, city lights through floor-to-ceiling windows.
Motion: Subtle character movement, breathing, slight head turn, one figure reaches out hand
Camera: Slow push in from medium to close-up over 8 seconds
Duration: 8s
Style: Cinematic, ARRI ALEXA 35, anamorphic lens, film grain
```

### 可灵 (Kling)

```
[中文画面描述]，[相机运动]，[主体运动]，[环境运动]，时长[秒]秒，[风格]。
```

例：
```
深夜办公室，台灯暖光照射下两人脸庞，窗外城市霓虹虚化，暧昧氛围，镜头缓慢推近从中景到近景，一人伸手触碰另一人手指，台灯暖光微微闪烁，时长8秒，电影质感，ARRI摄影机风格。
```

### Luma Dream Machine

```
[画面描述]，[相机运动关键词]，[运动强度: low/medium/high]，[时长]
```

例：
```
A massive stone dragon head emerges from sea of clouds above, clouds swirling around it, golden eye opening slowly. Camera cranes up following the dragon head rising. Motion intensity: high. 5s
```

### Pika

```
[画面描述] -camera [相机运动] -motion [运动强度1-12] -duration [秒]
```

例：
```
Close-up of a warrior's face, determined expression, fire light flickering across features, battlefield smoke in background -camera zoom_in -motion 6 -duration 4
```

---

## 五、分镜→视频完整转换模板

用户说"转视频"时，将全部分镜转换为视频 prompt 序列：

```
【视频生成序列】共 [N] 个镜头，总时长约 [X] 秒：

镜头 1（[时长]s，[平台]）：[视频 prompt]
镜头 2（[时长]s，[平台]）：[视频 prompt]
...

转场：[转场描述]
总时长：[总秒数]s

【剪辑建议】
- 镜头1→2：[转场类型]
- 镜头2→3：[转场类型]
- ...
```

---

## 六、在 Prompt 中使用

追加视频适配标注：

```
视频适配：[平台名称] 格式。
镜头1：[相机运动] [主体运动] [环境运动] [时长]s。
镜头2：[相机运动] [主体运动] [时长]s。
转场：[转场类型]。
总时长 [X] 秒。
```
