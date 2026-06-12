# 视觉密度控制引擎

根据输出类型、平台、用途、风格，设置 `visual_control` 状态。在 `asset-plan` 后、模板输出前运行。为每个子路由提供密度默认值。

---

## 职责边界

| 引擎 | 职责 |
|------|------|
| `asset-plan` | 规划需要哪些资产类型 |
| `consistency-trigger` | 决策资产一致性方法 |
| **`visual-density-controller`（本引擎）** | 按输出类型设置视觉密度默认值 |
| `reference-anchor` | 分配 @图编号、平台校验 |
| `prompt-declutter` | 事后清理（被 `/declutter` 或 `auto-repair` 触发） |

> ⚠ 本引擎做**事前默认设置**（初始化 visual-control-state），`prompt-declutter` 做**事后清理**（用户不满意时降噪）。两者互补。

---

## 接入位置

### 主链

```
asset-plan
  → consistency-trigger
  → visual-density-controller（本引擎）
  → reference-anchor
```

### 子链

```
/character  → visual-density-controller → templates/character-sheet
/scene      → visual-density-controller → templates/scene-card
/storyboard → visual-density-controller → templates/full-board / quick-board
/poster     → visual-density-controller → templates/poster
```

---

## 一、读取

| 读取参数 | 来源 | 用途 |
|---------|------|------|
| 输出类型 | 路由上下文（character/scene/storyboard/poster/video_first_frame） | 匹配默认密度 |
| 故事类型/genre | `state/variable-registry.md` → story.genre | 覆盖 skin 质感/grain/光线基调 |
| 当前 density_level | `state/visual-control-state.md`（如果存在） | 继承已有设置 |
| LS 版式 | `knowledge/layout-styles.md` → LS metadata（如有） | 版式特定密度上限 |
| 用户偏好 | 用户是否说过"干净"/"复杂" | 覆盖默认值 |
| 平台限制 | `api-config.template.env` → 目标平台 | 参考图少的平台降低密度 |

---

## 二、决策规则

### 按输出类型

| 输出类型 | density | background | text | hud | particles | focus |
|---------|---------|-----------|------|-----|-----------|-------|
| 角色卡 | 2 | low | minimal | none | subtle | character |
| 三视图 | 1 | none | none | none | none | character |
| 面部一致性卡 | 1 | none | none | none | none | character |
| 服饰细节卡 | 2 | low | minimal | none | none | material |
| 场景卡 | 2 | medium | minimal | none | cinematic | scene |
| 分镜图 | 2 | low | minimal | none | subtle | action |
| 视频首帧 | 2 | low | none | none | subtle | scene |
| 海报 | 3 | medium | readable | none | cinematic | character |
| 世界观板 | 4 | high | moderate | minimal | cinematic | worldbuilding |
| HUD 科技卡 | 3 | medium | readable | moderate | subtle | worldbuilding |

### 按故事类型覆盖（genre → texture / grain / lighting）

> 覆盖输出类型的默认 texture_noise 和背景光设置。**不同故事的"干净"标准不一样**——战争片的"干净"是泥泞真实感，爱情片的"干净"是柔光暖色。

| 故事类型 | skin 质感 | film grain | 光线基调 | 追加正面词 | 禁止 |
|---------|----------|-----------|---------|----------|------|
| 武侠/复仇/格斗 | `texture_noise=medium` — 毛孔/伤疤/汗水可见 | ✅ `cinematic film grain` | 硬光/明暗强对比/伦勃朗光 | `visible skin texture, natural blemishes, sweat sheen, battle-worn detail` | 均匀柔光/塑料皮肤/过度磨皮 |
| 战争/史诗 | `texture_noise=high` — 泥垢/血迹/粗糙 | ✅ `heavy film grain` | 硬光/低调/高反差 | `gritty realism, dirt and grime, worn skin, battlefield atmosphere` | 干净完美/过度磨皮/影楼光 |
| 科幻/赛博/机甲 | `texture_noise=medium` — 看子类型 | ✅ `subtle film grain`（蓝噪点） | 霓虹/体积光/边缘光/全息 | `volumetric light, rim light, neon edge glow, subtle digital noise` | 暖色古风/纸纹/脏污/模糊 |
| 末日/废土 | `texture_noise=high` — 灰尘/泥垢/疤痕 | ✅ `heavy grain, dust motes` | 硬光/高反差/沙尘散射 | `dust particles, grime, weathered skin, harsh sunlight, desaturated` | 干净/明亮/饱和 |
| 悬疑/恐怖/惊悚 | `texture_noise=medium` — 毛孔/冷汗 | ✅ `heavy grain` | 低调/阴影重/单一光源 | `visible pores, cold sweat, harsh shadows, dim chiaroscuro` | 明亮/均匀光/柔光/暖色 |
| 爱情/都市/暧昧 | `texture_noise=low` — 自然红润/微汗 | ❌ 不需要（或 `subtle`） | 柔光/暖色/蝴蝶光 | `natural skin flush, soft warmth, subtle rosiness, gentle lighting` | 硬光/高反差/冷色/粗糙 |
| 古风/玄幻 | `texture_noise=low→medium` — 看子类型 | ⚠️ 仙气=no, 江湖=subtle | 仙气=柔光, 江湖=伦勃朗 | 仙气: `flawless but natural, ethereal glow` / 江湖: `weathered detail, natural imperfections` | 仙气: grain/dirt / 江湖: 塑料感 |
| 喜剧/校园/青春 | `texture_noise=low` | ❌ 不需要 | 明亮均匀/高调 | `bright and airy, clean and fresh` | 暗调/粗糙/grain/冷色 |
| 宫廷/权谋 | `texture_noise=low→medium` — 自然但有岁月感 | ❌ 或 `subtle` | 暖色/窗光/烛光 | `natural aging detail, warm candlelight, subtle wrinkles` | 过度磨皮(年轻角色除外)/现代光 |
| 童话/迪士尼/吉卜力 | `texture_noise=none` | ❌ | 柔和均匀/高调 | `soft and dreamy, gentle lighting` | grain/硬光/真实皮肤瑕疵 |
| 纪录片/写实 | `texture_noise=high` — 全部可见 | ✅ `natural film grain` | 自然光/可用光 | `documentary realism, natural light, visible skin texture, unpolished` | 影楼光/过度美化/人工感 |

**子类型判断**：
- 古风：用户或 story-intake 含"仙气/仙侠/神魔/天界"→ 仙气线；含"江湖/武林/镖局/山寨"→ 江湖线
- 科幻：含"干净/白/极简/苹果风"→ 干净科幻（降 grain）；含"赛博/地下/废品/脏"→ 脏科幻（升 grain）
- 玄幻：含"神/仙/天/圣"→ 仙气线；含"魔/暗/深渊/血"→ 江湖线

### 按用户偏好调整

| 用户偏好 | 操作 |
|---------|------|
| "干净" / "简洁" / "清爽" | density -1（不低于1），noise 全降 |
| "留白" / "极简" | density = 1，background = none，text = none |
| "信息多一点" / "设定集" | density +1（不超过输出类型 density_max） |
| "复杂" / "丰富" | density +1，允许 moderate annotations |
| "更像视频首帧" | density = 2，text = none，particle = subtle |
| "更像海报" | density = 3，允许 particle = cinematic |

### 按 LS 版式覆盖

如果 `knowledge/layout-styles.md` 中当前 LS 有 metadata：

```
- density_default → 覆盖输出类型默认 density
- density_max → 硬上限，用户说"复杂"也不能突破
- video_safe: false → 标注"不推荐用作视频锚点"
```

---

## 三、输出

```markdown
【视觉密度控制】

输出类型：[角色卡/场景卡/分镜图/海报]
故事类型：[genre] → 光线基调: [描述] / skin质感: [描述] / grain: [none/subtle/cinematic/heavy]
目标用途：[视频锚点/展示/提案]
密度等级：[1-5]
背景复杂度：[none/low/medium/high]
文字/标注：[none/minimal/readable/production_notes]
HUD：[none/minimal/moderate/dense]
粒子：[none/subtle/cinematic/heavy]
纹理噪点：[none/low/medium/high] ← 由 genre 覆盖
film grain：[none/subtle/cinematic/heavy] ← 由 genre 决定
主体优先级：[character/scene/action/material/worldbuilding]

追加控制词（基础）：
clean composition, controlled detail, clear focal hierarchy, subject-first layout,
no random grid artifacts, no fake UI clutter, no meaningless micro text

追加控制词（genre 特定）：
[从 genre 表读取的追加正面词]
```

---

## 四、写入

→ 写入 `state/visual-control-state.md`（当前项目的视觉控制状态）
→ 传递给下游模板（`templates/*.md` 读取并追加到 prompt）

---

## 联动

← 读取 `api-config.template.env`（平台限制）
← 读取 `state/visual-control-state.md`（已有设置）
← 读取 `knowledge/layout-styles.md`（LS metadata，如有）
← 接收路由上下文（输出类型 + 用户偏好）
→ 写入 `state/visual-control-state.md`
→ 传递给 `templates/*.md`（追加 clean composition 控制词）
→ 传递给 `video-prompt-assembly`（视频首帧干净度检查）
