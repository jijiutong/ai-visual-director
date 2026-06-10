---
name: poster
description: Movie poster generation — cinematic posters in any style, portrait or landscape. Reads project/style from state/variable-registry. Use /poster or say "海报", "电影海报", "封面".
---

# Poster — 电影海报

输入故事/片名 → 选风格 + 画幅 → 输出电影海报 prompt。支持竖版(2:3)和横版(16:9)。

## 触发方式

- `/poster [片名/故事]`
- 直接说 "海报"、"电影海报"、"封面"、"出张海报"

## 常用参数

| 指令 | 效果 |
|------|------|
| `/poster 电影海报` | 标准影院海报（默认竖版 2:3） |
| `/poster 小红书封面` | 9:16 竖版封面，适合小红书 |
| `/poster 抖音头图` | 抖音 profile 头图比例 |
| `/poster B站封面` | B站视频封面 16:9 |
| `/poster 竖版海报` | 2:3 竖版电影海报 |
| `/poster 横版海报` | 16:9 宣传横幅 |
| `/poster 多版本` | 同主题 A/B/C 三版本对比 |

## 工作流

### Step 1: 提取海报要素

从用户输入提取：片名（2-8字）、类型、核心意象、标语、情绪基调。

### Step 2: 确认风格 + 画幅

**推荐风格参考**：

| 故事类型 | 推荐风格 |
|---------|---------|
| 修仙/玄幻 | 3. 东方玄幻 / 32. 中国水墨意境 |
| 武侠/动作 | 1. 黑金动作 / 28. 张艺谋色彩 |
| 科幻/赛博 | 2. 科幻机甲 / 50. 故障艺术 |
| 悬疑/恐怖 | 4. 悬疑惊悚 / 20. 暗黑哥特 |
| 都市/爱情 | 5. 都市情绪 / 27. 王家卫情绪 |
| 史诗/奇幻 | 17. 中世纪史诗 / 24. 好莱坞商业大片 |

**画幅**：竖版 2:3（标准海报）/ 横版 16:9（宣传横幅）/ 1:1（社交媒体）

### Step 3: 生成 Prompt

**竖版海报模板（2:3）**：
```
电影海报，竖版 2:3 比例，[风格编号+名称]。

【片名】[片名]
【标语】[一句 slogan，不超过 12 字]
【视觉核心】画面中央：[核心意象描述，1-2 句]
【构图】[主角/关键元素]占画面 [比例]，[背景氛围描述]
【色彩】主色调 [2-3 色]，[对比/和谐/渐变]
【光线】[主光方向+类型]，[氛围光描述]
【文字排版】片名置于 [位置]，字体 [风格]，字号 [相对大小]
【质感】[胶片颗粒/数字清晰/手绘质感/油画笔触]

电影级品质，高分辨率，专业调色，影院海报感。
```

**横版海报模板（16:9）**：
```
电影横幅海报，16:9 宽屏比例，[风格编号+名称]。

全景构图：[场景全貌 + 角色位置 + 关键视觉元素]
片名「[片名]」置于 [位置]，[字体风格]
标语「[slogan]」置于 [位置]

色彩基调：[主色调]，[情绪氛围]
光线设计：[主光源+方向]，[逆光/侧光/顶光选择]

电影感横幅，适合宣传用图。高分辨率。
```

**社交媒体方形（1:1）**：
```
电影海报，1:1 方形，[风格编号+名称]。
构图紧凑，[核心意象居中/偏移构图]。
片名「[片名]」突出。
[色彩+光线描述]
适合 Instagram/社交媒体。高分辨率。
```

## 风格快速预览

说 "看风格" 展示 10 种热门海报风格：

| 编号 | 风格 | 关键词 |
|------|------|--------|
| 1 | 黑金动作 | gold+black, motion blur, dramatic |
| 5 | 都市情绪 | neon, rainy street, moody |
| 17 | 中世纪史诗 | epic fantasy, castle, battle |
| 24 | 好莱坞大片 | cinematic, explosions, hero pose |
| 25 | Wes Anderson | symmetrical, pastel, vintage |
| 27 | 王家卫 | Hong Kong neon, slow shutter, saturated |
| 28 | 张艺谋色彩 | bold reds, Chinese aesthetic, epic scale |
| 32 | 中国水墨 | ink wash, misty mountains, negative space |
| 49 | 极简主义 | minimal, clean, negative space |
| 52 | 广告大片 | luxury, high fashion, studio lighting |

## 负面清单
```
no watermark, no logo, no random text, no garbled characters,
no amateur layout, no low resolution, no stock photo look,
no cluttered composition, no dated design
```
