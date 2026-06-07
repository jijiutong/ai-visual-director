---
name: ai-story-board
description: Use when generating storyboards, visual development boards, character sheets, scene cards, posters, manga pages, mood boards, or any cinematic visual content from stories, novel excerpts, script fragments, or manga concepts. Triggers on requests like "storyboard this", "create a character sheet", "make a visual board", "漫剧", "分镜", "故事板", "视觉开发板". Supports 32 visual styles, 15 relationship types, 10 output formats, style fusion, emotion-curve driven pacing, character DNA consistency, cultural accuracy, multi-platform output (GPT Image 2 / Midjourney / SD), video prompt adaptation, single-shot editing, audio reference, industry export, thumbnail boards, and director notes.
---

# AI Story Board Skill

AI 电视剧 / 漫剧 / 短剧 / 电影故事板生成技能。将任意故事内容转化为 GPT Image 2 / Midjourney / SD 可直接使用的专业提示词。

## 核心能力

| 能力 | 说明 |
|------|------|
| 32 种视觉风格 | 黑金动作→中国水墨，含 Disney/Pixar/吉卜力/王家卫/张艺谋 等 |
| 风格融合引擎 | "王家卫+吉卜力" 自动融合，60%主+40%副，23种高频组合 |
| 15 种角色关系 | 宿敌变恋人/双向暗恋/师徒等，每种×4种风格加成 |
| 情绪曲线驱动 | 平静→对峙→爆发→余韵，动态调整景别/运镜/灯光/色彩 |
| 色彩叙事引擎 | 颜色随情绪推进变化，5种叙事模型 |
| 角色一致性 DNA | 13 字段 DNA 锚定，跨镜头服装/发型/面部完全一致 |
| 分镜节奏引擎 | 快切/标准/慢/渐进/喜剧，自动匹配类型 |
| 文化精准度 | 东方/西方/日系精准描述，杜绝穿帮 |
| 三幕结构分析 | 自动拆解建制/对抗/解决，每幕匹配镜头/色彩/节奏 |
| Mood 滑块 | "更虐/更甜/更燃/更丧/更暧昧" 自动调整情绪权重 |
| 负面提示词自动 | 按风格/格式/关系/平台自动生成专属负面词 |
| 多版本 A/B/C | 同一故事 3 种视觉诠释对比 |
| 续集/系列支持 | 角色DNA/色彩/场景延续，状态变化追踪 |
| 平台深度优化 | MJ --cref 角色一致 / SD ControlNet / GPT 排版最大化 |
| 一键工作流 | "一键生成/全平台/多版本/全来" 全流程自动 |
| 视频 Prompt 适配 | 故事板→Sora/Runway/可灵，带运动方向和时长 |
| 精准单镜修改 | "第3镜暗一点/换长发/雨改雪" 只改指定镜 |
| 音乐音效参考 | 每幕/每镜自动推荐音乐 mood/节奏/音效 |
| 行业格式导出 | Storyboard Pro / FrameForge / Celtx 标准格式 |
| 缩略故事板速出 | 关键词版快速验证方向，确认后再出完整版 |
| 导演阐述 | 镜头/色彩/角色弧光/节奏的选择理由 |
| 10 种输出格式 | 全案板/角色卡/海报/漫画分镜/情绪板等 |
| 多平台适配 | GPT Image 2 / Midjourney v6 / Stable Diffusion XL |

## 工作流

```
用户输入故事 → AI 提取信息 → AI 智能推荐 2-3 个最佳组合 → 用户确认/改选 → 输出 prompt
```

**快捷模式**：用户说"一键生成"→全流程自动完成；"一键全平台"→全流程+三平台输出；"一键多版本"→A/B/C对比；"一键全来"→3风格×4格式×3平台=36个prompt。

### Step 1: 提取故事信息

从用户输入中自动提取：

| 字段 | 说明 | 参考文件 |
|------|------|---------|
| 片名 | 2-8 字短标题 | — |
| 类型 | 动作/悬疑/科幻/玄幻/都市/爱情/etc. | `references/styles.md` |
| 叙事结构 | 三幕/四幕/倒叙/双线 | `references/act-structure.md` |
| 时长 | 默认 15s，复杂用 30s | `references/pacing.md` |
| 核心冲突 | 一句话：谁对抗谁，或主角要突破什么 | — |
| 主角 | 姓名/身份/服装/武器道具/面部特征/情绪底色 | `references/character-dna.md` |
| 对手 | 姓名/身份/服装/武器能力/压迫感来源 | `references/character-dna.md` |
| 世界观场景 | 地点/时代/天气/环境材质/危险元素 | `references/cultural-accuracy.md` |
| 情绪曲线 | 平静→对峙→爆发→余韵 | `references/emotion-curve.md` |
| Mood 倾向 | 更燃/更虐/更甜/更丧/更暧昧 | `references/mood-slider.md` |
| 镜头数 | 短篇 7 镜，史诗 13 镜 | `references/emotion-curve.md` |
| 主色调 | 2-4 个颜色 | `references/color-narrative.md` |
| **角色关系** | 见关系类型表 | `references/relationships.md` |
| **分镜节奏** | 快切/标准/慢/渐进/喜剧 | `references/pacing.md` |
| **系列信息** | 第几集/续集 | `references/series.md` |

**缺字段自动补全**：没角色名就给起电影感名字；没明确类型就按冲突强度推断；没明确关系就按互动张力推断；没明确结构就按类型匹配三幕结构。

### Step 2: 智能推荐（默认模式）

根据提取的故事信息，自动匹配并推荐 **2-3 个最佳组合**：

```
【智能推荐】根据你的故事，推荐以下组合：

  推荐 1（最匹配）：风格 X + 格式 Y    — 理由：[为什么适合]
  推荐 2（备选）：  风格 A + 格式 B    — 理由：[为什么适合]
  推荐 3（不同视角）：风格 C + 格式 D  — 理由：[为什么适合]

回复编号确认，或说"看全部"查看所有风格/格式。
```

**推荐引擎规则**（根据故事关键词自动匹配）：

| 故事关键词 | 推荐风格 | 推荐格式 |
|-----------|---------|---------|
| 修仙/古风/神魔/仙侠/玄幻 | 3. 东方玄幻 | 1 全案板 / 3 角色卡 |
| 武侠/复仇/谍战/格斗/战争 | 1. 黑金动作 | 1 全案板 / 10 关键帧 |
| 机甲/赛博/未来/AI/太空 | 2. 科幻机甲 | 1 全案板 / 5 海报 |
| 悬疑/密室/犯罪/恐怖/惊悚 | 4. 悬疑惊悚 | 2 快速故事板 / 7 情绪板 |
| 都市/爱情/职场/家庭/暧昧 | 5. 都市情绪 | 4 场景概念卡 / 7 情绪板 |
| 校园/青春/初恋/成长 | 6. 青春校园 | 8 四格漫画 / 3 角色卡 |
| 末日/废土/丧尸/求生 | 7. 废土末日 | 1 全案板 / 2 快速故事板 |
| 宫斗/古装/权谋/帝王 | 8. 宫廷权谋 | 1 全案板 / 3 角色卡 |
| 蒸汽/机械/维多利亚/发明 | 9. 蒸汽朋克 | 4 场景概念卡 / 5 海报 |
| 童话/魔法/森林/小动物 | 10. 童话绘本 | 7 情绪板 / 8 四格漫画 |
| 日漫/轻小说/异世界/学园 | 11. 二次元动漫 | 6 漫画分镜 / 3 角色卡 |
| 纪录片/真实/社会/人物 | 12. 写实摄影 | 4 场景概念卡 / 7 情绪板 |
| 年代/怀旧/黑帮/老上海 | 13. 复古胶片 | 5 海报 / 7 情绪板 |
| 北欧/维京/冰雪/神话 | 14. 北欧极简 | 4 场景概念卡 / 5 海报 |
| 拉美/魔幻/热带/亡灵 | 15. 拉美魔幻 | 1 全案板 / 7 情绪板 |
| 赛博+东方/寺庙/AI悟道 | 16. 赛博佛学 | 4 场景概念卡 / 1 全案板 |
| 骑士/城堡/龙族/魔法战争 | 17. 中世纪史诗 | 1 全案板 / 10 关键帧 |
| 非洲/部落/草原/原始 | 18. 非洲部落 | 4 场景概念卡 / 7 情绪板 |
| 国潮/现代国风/非遗/潮流 | 19. 新中式国潮 | 5 海报 / 7 情绪板 |
| 哥特/吸血鬼/宗教/暗黑 | 20. 暗黑哥特 | 4 场景概念卡 / 5 海报 |
| 迪士尼/Pixar/3D动画 | 21. Disney Pixar 3D | 1 全案板 / 3 角色卡 |
| 迪士尼2D/手绘/歌舞剧 | 22. Disney 2D 手绘 | 6 漫画分镜 / 5 海报 |
| 吉卜力/宫崎骏/治愈 | 23. Studio Ghibli | 4 场景概念卡 / 7 情绪板 |
| Marvel/DC/超级英雄 | 24. 好莱坞商业大片 | 1 全案板 / 10 关键帧 |
| 对称/粉彩/复古/文艺 | 25. Wes Anderson | 7 情绪板 / 5 海报 |
| 暗黑童话/扭曲/月光 | 26. Tim Burton 哥特 | 4 场景概念卡 / 5 海报 |
| 霓虹香港/慢门/浓烈 | 27. 王家卫情绪 | 4 场景概念卡 / 5 海报 |
| 极致色彩/红色中国 | 28. 张艺谋色彩 | 1 全案板 / 5 海报 |
| 冷峻写实/韩国犯罪 | 29. 韩国犯罪美学 | 2 快速故事板 / 4 场景概念卡 |
| 宝莱坞/歌舞/戏剧性 | 30. 印度宝莱坞 | 1 全案板 / 5 海报 |
| 欧洲文艺/长镜头/极简 | 31. 欧洲艺术电影 | 4 场景概念卡 / 7 情绪板 |
| 水墨/留白/山水意境 | 32. 中国水墨意境 | 4 场景概念卡 / 7 情绪板 |

**角色关系加成匹配**（见 `references/relationships.md`）：每种关系自动匹配最佳风格（如宿敌变恋人→黑金动作/东方玄幻，双向暗恋→都市情绪/青春校园），并从 `references/relationships.md` 追加构图建议、灯光方案、风格加成、氛围关键词到 prompt 中。

**情绪曲线匹配**（见 `references/emotion-curve.md`）：根据故事类型自动匹配情绪曲线模型（标准/悬疑/喜剧/悲剧/爱情），并驱动分镜节奏和色彩叙事。

**叙事结构匹配**（见 `references/act-structure.md`）：根据故事类型自动匹配三幕/四幕/倒叙/双线结构，每幕自动匹配对应的镜头组合/色彩/节奏。

**Mood 滑块**（见 `references/mood-slider.md`）：用户说"更燃/更虐/更甜/更丧/更暧昧/更恐怖/更史诗/更治愈/更紧张/更梦幻"，自动调整情绪曲线权重/色彩/镜头/节奏。

**续集支持**（见 `references/series.md`）：用户说"第X集/继续上一集"，自动延续角色DNA/色彩基调/场景，追加状态变化。

**用户说"看全部"** → 展示完整风格列表 + 格式列表（见下方备选方案）

**用户说"全来"** → 触发批量模式，一次输出 4 个格式的 prompt（见批量模式规则）

**用户说"多版本"/"对比"/"A/B/C"** → 触发多版本模式，生成 3 种不同视觉诠释（见 `references/multi-version.md`）

**用户说"一键生成"** → 全流程自动完成，不展示选项直接输出

**用户说"一键全平台"** → 全流程 + GPT Image 2/MJ/SD 三个平台输出

**用户说"一键多版本"** → 全流程 + A/B/C 三版本对比

**用户说"一键全来"** → 全流程 + 3风格×4格式×3平台（36个prompt，分段输出）

### Step 2（备选）：手动选择

用户要求看全部选项时，展示完整列表：

```
【视觉风格】选一个编号（1-32），或用"A+B"融合两种风格（见 `references/fusion.md`）：
  1. 黑金动作    2. 科幻机甲    3. 东方玄幻    4. 悬疑惊悚    5. 都市情绪
  6. 青春校园    7. 废土末日    8. 宫廷权谋    9. 蒸汽朋克   10. 童话绘本
 11. 二次元动漫  12. 写实摄影   13. 复古胶片   14. 北欧极简   15. 拉美魔幻
 16. 赛博佛学    17. 中世纪史诗  18. 非洲部落   19. 新中式国潮  20. 暗黑哥特
 21. Disney Pixar 3D  22. Disney 2D手绘  23. 吉卜力  24. 好莱坞商业大片
 25. Wes Anderson  26. Tim Burton  27. 王家卫  28. 张艺谋  29. 韩国犯罪
 30. 印度宝莱坞    31. 欧洲艺术电影  32. 中国水墨意境

【输出格式】选一个或多个编号：
  1. 全案板    2. 快速故事板    3. 角色设定卡    4. 场景概念卡    5. 海报
  6. 漫画分镜页  7. 情绪板    8. 四格漫画    9. 三视图设定卡  10. 关键帧序列
```

### Step 3: 生成 Prompt

根据用户选择的风格编号 + 格式编号，从对应模板文件生成完整 prompt。

**模板路由表：**

| 格式 | 模板文件 | 说明 |
|------|----------|------|
| 全案板（完整） | `templates/full-board.md` | 电影级视觉开发全案 |
| 快速故事板 | `templates/quick-board.md` | 精简版，快速出图 |
| 角色设定卡 | `templates/character-sheet.md` | 角色三视图+面部+道具 |
| 场景概念卡 | `templates/scene-card.md` | 单一场景概念图+氛围 |
| 海报 | `templates/poster.md` | 电影海报/宣传海报 |
| 漫画分镜页 | `templates/manga-page.md` | 漫画式分镜格 |
| 情绪板 | `templates/mood-board.md` | 氛围/色彩/材质参考 |
| 四格漫画 | `templates/manga-page.md`（四格模式） | 四格叙事 |
| 三视图设定卡 | `templates/character-sheet.md`（三视图模式） | 纯三视图 |
| 关键帧序列 | `templates/quick-board.md`（关键帧模式） | 动作关键帧 |

**Prompt 构建层级**（8层叠加）：

1. **基础层**：从模板文件获取格式结构
2. **风格层**：从 `references/styles.md` 获取风格配色/氛围/特效（或 `references/fusion.md` 融合风格）
3. **关系层**：从 `references/relationships.md` 追加角色关系加成
4. **结构层**：从 `references/act-structure.md` 驱动三幕结构叙事
5. **情绪层**：从 `references/emotion-curve.md` 驱动分镜节奏 + `references/color-narrative.md` 驱动色彩叙事
6. **Mood 层**：从 `references/mood-slider.md` 调整情绪权重/色彩/镜头/节奏
7. **DNA 层**：从 `references/character-dna.md` 锚定角色一致性
8. **文化层**：从 `references/cultural-accuracy.md` 确保文化精准
9. **负面层**：从 `references/negative-prompt.md` 生成专属负面提示词
10. **平台层**：从 `references/platform.md` + `references/platform-advanced.md` 适配目标平台格式

### Step 4: 输出

输出 **一条可直接复制的 prompt**，放在代码块中。不附加多余解释，除非用户要求。

**多平台深度输出**（用户指定时，见 `references/platform.md` + `references/platform-advanced.md`）：

```
【GPT Image 2 版本】
```中文 prompt```

【Midjourney v6 版本】
```英文 prompt --v 6 --ar 16:9 --s 250 --style raw```

【Stable Diffusion XL 版本】
正面：```英文 prompt```
负面：```负面提示词```
```

---

## 批量模式（"全来"指令）

用户说"全来"、"批量"、"all"时触发。自动选择 **4 个最相关的格式** 批量生成。

**批量选择规则：**

| 故事类型 | 批量输出的 4 个格式 |
|---------|-------------------|
| 有明确角色的故事 | 1 全案板 + 3 角色卡 + 5 海报 + 7 情绪板 |
| 场景为主的故事 | 1 全案板 + 4 场景概念卡 + 5 海报 + 7 情绪板 |
| 动作/打斗为主 | 1 全案板 + 2 快速故事板 + 10 关键帧 + 5 海报 |
| 情感/暧昧为主 | 4 场景概念卡 + 7 情绪板 + 3 角色卡 + 5 海报 |
| 喜剧/轻松为主 | 8 四格漫画 + 6 漫画分镜 + 3 角色卡 + 7 情绪板 |

**批量输出格式：**

```
已为你生成 4 个格式的 prompt：

【格式 1：全案板（完整）】
```prompt 代码块```

【格式 2：角色设定卡】
```prompt 代码块```

【格式 3：海报】
```prompt 代码块```

【格式 4：情绪板】
```prompt 代码块```
```

---

## 参考文件

| 文件 | 内容 |
|------|------|
| `references/styles.md` | 32 种视觉风格详细说明 |
| `references/fusion.md` | 风格融合引擎（23种高频组合+自定义融合） |
| `references/formats.md` | 10 种输出格式说明 + 选择指南 |
| `references/relationships.md` | 15 种角色关系 + 构图/灯光/风格加成 |
| `references/act-structure.md` | 三幕结构分析器（建制/对抗/解决+变体） |
| `references/emotion-curve.md` | 情绪曲线驱动分镜（四阶段模型+4种变体） |
| `references/color-narrative.md` | 色彩叙事引擎（5种叙事模型+色彩心理映射） |
| `references/mood-slider.md` | Mood 滑块（10种mood维度+叠加规则） |
| `references/negative-prompt.md` | 负面提示词自动生成（按风格/格式/关系/平台） |
| `references/multi-version.md` | 多版本 A/B/C 对比（3版本策略+差异标注） |
| `references/series.md` | 续集/系列支持（DNA延续/色彩演变/状态追踪） |
| `references/character-dna.md` | 角色一致性 DNA（13字段锚定） |
| `references/pacing.md` | 分镜节奏引擎（5种节奏模式） |
| `references/cultural-accuracy.md` | 文化精准度（东方/西方/日系/现代） |
| `references/camera.md` | 镜头语言：景别/运镜/角度/焦段/画幅 |
| `references/lighting.md` | 灯光方案/色温/配色/电影色板 |
| `references/composition.md` | 构图法则/版式布局 |
| `references/quality.md` | 质量约束/通用负面提示词 |
| `references/platform.md` | 多平台格式适配（GPT Image 2 / MJ / SD） |
| `references/platform-advanced.md` | 平台深度优化（MJ --cref / SD ControlNet / GPT排版） |
| `references/one-click.md` | 一键输出工作流（生成/全平台/多版本/全来） |
| `references/video-prompt.md` | AI 视频 Prompt 适配（Sora/Runway/可灵） |
| `references/single-shot-edit.md` | 精准单镜修改（只改指定镜，DNA 传播） |
| `references/audio-reference.md` | 音乐音效参考（每幕/每镜音乐 mood + 音效） |
| `references/industry-export.md` | 行业格式导出（Storyboard Pro / FrameForge / Celtx） |
| `references/thumbnail-board.md` | 缩略故事板速出（关键词版快速验证） |
| `references/director-notes.md` | 导演阐述（镜头/色彩/弧光/节奏理由） |

## 执行规则

- **先提取，再生成** — 不要跳过故事信息提取
- **智能推荐优先** — 默认展示 2-3 个推荐组合，用户确认即可
- **每个括号都填实** — 不写"电影感""高级感"等空泛词
- **风格不混** — 一次只选一种视觉风格（融合模式除外）
- **用户说"更燃/更虐/更甜/更丧"** → 触发 Mood 滑块，调整情绪/色彩/镜头/节奏
- **用户说"更贵"** → 强化摄影参数/材质/色卡/版式秩序
- **用户说"小红书竖版"** → 画幅改 9:16，结构不变
- **用户说"全来"/"批量"** → 触发批量模式，输出 4 个格式的 prompt
- **用户说"看全部"** → 展示完整 32 种风格 + 10 种格式列表
- **用户说"用MJ"/"用SD"** → 切换对应平台格式输出
- **用户说"一键生成"** → 全流程自动完成，不展示选项
- **用户说"一键全平台"** → 全流程 + GPT/MJ/SD 三平台输出
- **用户说"多版本"/"A/B/C"** → 生成 3 种不同视觉诠释对比
- **用户说"一键全来"** → 3风格×4格式×3平台=36个prompt（分段输出）
- **用户说"第X集"/"继续"** → 触发续集模式，延续DNA/色彩/场景
- **关系加成** → 自动识别角色关系，追加构图/灯光/风格加成/氛围描述
- **情绪驱动** → 根据情绪曲线动态调整景别/运镜/灯光/色彩
- **DNA 锚定** → 生成角色 DNA 确保跨镜头一致性
- **文化精准** → 确保东方/西方/日系描述不穿帮
- **负面词自动** → 按风格/格式/关系/平台自动生成专属负面提示词
- **单镜修改** → "第X镜暗一点/换长发/雨改雪" 只改指定镜，DNA 自动传播
- **音乐音效** → 每幕/每镜自动推荐音乐 mood + 音效
- **缩略速出** → 先出关键词版验证方向，确认后再出完整版
- **导演阐述** → 追加镜头/色彩/角色弧光/节奏的选择理由
- **行业导出** → "导出 Storyboard Pro/FrameForge/Celtx" 标准格式
- **转视频** → 故事板→Sora/Runway/可灵，带运动方向和时长

## 负面清单（所有输出必须包含，专属负面词见 `references/negative-prompt.md`）

```
no watermark, no logo, no random large text, no garbled Chinese, no broken faces,
no duplicated limbs, no messy panels, no low-quality collage, no text overlay,
no speech bubbles (unless manga format), no cartoon style (unless specified),
no flat illustration, no marketing poster style
```
