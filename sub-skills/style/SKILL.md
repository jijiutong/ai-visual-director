---
name: style
description: Style explorer — browse 53 visual styles, fuse any two styles, or migrate styles while preserving character DNA. Reads style from state/variable-registry. Use /style or say "风格", "换风格", "风格融合".
---

# Style — 风格浏览器

浏览 53 种视觉风格，支持风格融合、预览和风格迁移（换风格保持角色不变）。

## 触发方式

- `/style [风格名/编号]`
- 直接说 "风格"、"看风格"、"有哪些风格"、"换风格"
- 风格融合：`/style [风格A] + [风格B]`
- 风格迁移：`/style 换成 [风格X] 但保持角色`

## 子指令

| 指令 | 效果 |
|------|------|
| `/style 看全部` | 展示 53 种风格 + 10 种格式 + 常用融合方案 |
| `/style [A] + [B]` | 风格融合：60% 主风格 + 40% 副风格 |
| `/style 换成 [X] 但保持角色` | 风格迁移：保持角色 DNA，只改变画面风格 |

## 全部 53 种风格

### 类型片风格（1-20）

| 编号 | 风格 | 核心关键词 |
|------|------|-----------|
| 1 | 黑金动作 | gold+black, motion blur, dramatic, epic battle |
| 2 | 科幻机甲 | mecha, neon, cyberpunk, holographic UI |
| 3 | 东方玄幻 | Chinese fantasy, flowing silk, spiritual energy, immortal |
| 4 | 悬疑惊悚 | shadows, film noir, tension, smoke, dark |
| 5 | 都市情绪 | neon city, rainy street, moody, lonely |
| 6 | 青春校园 | soft sunlight, cherry blossoms, school uniform, warm |
| 7 | 废土末日 | desolate, rust, sandstorm, survival, decay |
| 8 | 宫廷权谋 | palace, silk, intrigue, gold+red, symmetrical |
| 9 | 蒸汽朋克 | brass, gears, Victorian, steam, goggles |
| 10 | 童话绘本 | watercolor, storybook, soft, magical, warm |
| 11 | 二次元动漫 | anime, cel shading, manga style, vibrant |
| 12 | 写实摄影 | photorealistic, documentary, natural light |
| 13 | 复古胶片 | film grain, vintage, kodachrome, nostalgic |
| 14 | 北欧极简 | minimalist, clean lines, cold, natural light |
| 15 | 拉美魔幻 | magical realism, vibrant colors, tropical |
| 16 | 赛博佛学 | cyberpunk + Buddhist, neon temple, AI monk |
| 17 | 中世纪史诗 | epic fantasy, castle, dragon, armor, battle |
| 18 | 非洲部落 | tribal, earthy, warm sun, savanna, pattern |
| 19 | 新中式国潮 | modern Chinese, fashion, bold colors, trend |
| 20 | 暗黑哥特 | gothic, cathedral, vampire, dark, ornate |

### 导演/工作室风格（21-35）

| 编号 | 风格 | 核心关键词 |
|------|------|-----------|
| 21 | Disney Pixar 3D | 3D animation, expressive, colorful, Pixar style |
| 22 | Disney 2D 手绘 | hand-drawn, 2D animation, musical, classic Disney |
| 23 | Studio Ghibli | Ghibli, Miyazaki, hand-painted, nature, whimsical |
| 24 | 好莱坞商业大片 | blockbuster, explosions, hero, epic, Michael Bay |
| 25 | Wes Anderson | symmetrical, pastel, vintage, flat composition |
| 26 | Tim Burton 哥特 | dark whimsical, stripes, pale, twisted, gothic |
| 27 | 王家卫情绪 | Hong Kong neon, slow shutter, saturated, moody |
| 28 | 张艺谋色彩 | bold reds, Chinese aesthetic, epic scale, color |
| 29 | 韩国犯罪美学 | cold, gritty, realistic, neon, thriller |
| 30 | 印度宝莱坞 | Bollywood, vibrant, musical, dramatic, colorful |
| 31 | 欧洲艺术电影 | arthouse, long take, natural light, minimal |
| 32 | 中国水墨意境 | ink wash, misty mountains, negative space, Zen |
| 33 | 新浪潮自由 | jump cut, handheld, natural, experimental, French |
| 34 | 赛博佛学朋克 | cyberpunk Buddha, tech meets Zen, neon + incense |
| 35 | 暗黑科幻 | dark sci-fi, Alien, body horror, industrial, grim |

### 情绪/氛围风格（36-53）

| 编号 | 风格 | 核心关键词 |
|------|------|-----------|
| 36 | 废土末日生存 | Mad Max, dieselpunk, survival, sand, chaos |
| 37 | 都市情绪电影 | city symphony, reflective, window light, rain |
| 38 | 青春校园物语 | coming-of-age, golden hour, lens flare, youth |
| 39 | 悬疑惊悚导演 | Hitchcock, suspense, shadow, tension, voyeur |
| 40 | 心理迷宫 | surreal, mind-bending, mirrors, fractured |
| 41 | 浪漫梦幻 | soft focus, bokeh, fairy lights, dreamy, pastel |
| 42 | 音乐 MV | music video aesthetic, rhythmic editing, vibrant |
| 43 | 中国水墨动画 | ink animation, fluid, traditional, poetic |
| 44 | 像素复古游戏 | pixel art, 8-bit, retro gaming, chiptune |
| 45 | 黏土定格动画 | claymation, stop motion, tactile, handmade |
| 46 | 沙画叙事 | sand art, flowing, ephemeral, performance |
| 47 | 剪纸中国风 | paper cut, Chinese folk art, silhouette, red |
| 48 | 浮世绘日本 | Ukiyo-e, Edo period, woodblock, wave, Mt. Fuji |
| 49 | 极简主义 | minimal, negative space, clean, graphic design |
| 50 | 故障艺术 Glitch | datamosh, VHS, corrupted, digital decay |
| 51 | 超现实主义 | surreal, Dali, dream logic, impossible space |
| 52 | 广告大片质感 | luxury, fashion, high-end, studio, polished |
| 53 | 粗粝 B 级片 | grindhouse, B-movie, grainy, exploitation |

## 风格融合

说 `[风格A] + [风格B]` 触发融合：

```
风格融合：60% [风格A] + 40% [风格B]
生成融合关键词：[从两者中各取核心词混合]
```

例：`王家卫 + 吉卜力` →
```
风格融合：60% 王家卫情绪 + 40% Studio Ghibli
融合关键词：Hong Kong neon × hand-painted nature,
moody saturated colors × whimsical soft light,
slow shutter × Ghibli clouds
```

## 风格迁移

说 `换成 [风格X] 但保持角色` 触发：

保持角色 DNA 不变，仅替换视觉风格层：
- 角色面部/体态/服装不变
- 光线方案切换到目标风格
- 色彩方案切换到目标风格
- 构图/氛围适配目标风格

## 风格预览命令

| 命令 | 效果 |
|------|------|
| `看全部风格` | 展示 53 种完整编号+名称 |
| `看热门风格` | 展示 Top 10 最常用风格 |
| `看类型片` | 展示 1-20 号风格 |
| `看导演风` | 展示 21-35 号风格 |
| `看情绪风` | 展示 36-53 号风格 |
| `风格 [编号] 预览` | 展示该风格的详细关键词+配色+光线方案 |
