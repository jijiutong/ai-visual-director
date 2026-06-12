# Prompt 去噪引擎

当 prompt 过脏、画面过满、HUD/粒子/文字过多时执行清理。被 `/declutter` 调用，被 `auto-repair` 在视觉干净度低时调用。

---

## 职责边界

| 引擎 | 职责 |
|------|------|
| `visual-density-controller` | **事前**按输出类型设默认密度 |
| **`prompt-declutter`（本引擎）** | **事后**清理已生成的脏 prompt |
| `prompt-compression` | 压缩 prompt 字数 |
| `auto-repair` | 触发修复，可调用本引擎 |

---

## 一、触发方式

### 显式命令

```
/declutter all          → 全维度降噪
/declutter hud          → 降低 HUD/网格
/declutter background   → 降低背景复杂度
/declutter particles    → 降低粒子/雾/光点
/declutter text         → 降低文字/标注
/declutter texture      → 降低纹理噪点
/declutter layout       → 去掉边框/表格/UI框架/分割线
/declutter video-ref    → 从 display_asset 派生 clean video_asset（去文字/去UI/去边框/主体突出）
/declutter role-card    → 角色卡专用清洁
/declutter scene        → 场景卡专用清洁
/declutter poster       → 海报专用清洁
```

### 自然语言

| 用户说 | 等价动作 |
|--------|---------|
| "太乱了" / "画面太脏" | `/declutter all` |
| "背景干净点" | `/declutter background` |
| "不要 HUD" | `/declutter hud` |
| "少点粒子" / "粒子太多" | `/declutter particles` |
| "文字少点" / "不要字" | `/declutter text` |
| "更干净" / "更清爽" | density -1 + 全维度降级 |
| "更留白" | density = 1 + background = low |

### auto-repair 触发

当 `final-video-qc` 第10项（视觉干净度）检测到致命问题时：
→ `auto-repair` 调用 `prompt-declutter`
→ 清理后重新生成 prompt
→ 重新 QC

---

## 二、清理逻辑

```
1. 读取 state/visual-control-state.md（当前值）
2. 读取当前输出类型和模板
3. 读取 rules/visual-cleanliness.md（规则基准）
4. 识别用户指定的污染项
5. 降低对应维度 1-2 级
6. 保留核心：角色 DNA、场景锚点、动作方向、光线方向、风格关键词
7. 生成清理版 prompt
8. 更新 state/visual-control-state.md
9. 若已有项目资产 → 触发 incremental-update 局部更新
```

---

## 三、清理优先级

| 优先级 | 保留（不可删） | 可删除/降低 |
|--------|--------------|------------|
| P0 | 角色 DNA、不可变特征、服装结构 | 重复形容词、冗余修饰 |
| P0 | 场景固定元素、光源方向 | 无意义氛围词 |
| P1 | 镜头动作、运动方向 | 多余粒子、雾效 |
| P1 | 平台参数（--v 7 --ar 等） | 伪 HUD、随机网格、科技线框 |
| P2 | 风格关键词 | 过密材质修饰 |
| P2 | 色彩方案 CN 编号 | 过多材质编号堆叠 |

---

## 四、各维度清理

### hud（HUD/网格清理）

```
删除：
- random grid lines / tech frame borders
- fake UI panels / unreadable buttons
- meaningless wireframe overlays
- holographic scan lines without purpose
- circuit board patterns in background

保留（仅科技类模板且 hud_elements=moderate）：
- meaningful HUD annotations for sci-fi system card (LS13)
- clean thin frame lines for layout structure
```

### background（背景清理）

```
删除：
- over-detailed environmental textures stealing focus
- busy background patterns
- excessive architectural details

降低：
- background_complexity: high → medium → low → none
- 追加：restrained background, subject-first composition
```

### particles（粒子清理）

```
删除：
- excessive floating particles / dust motes
- over-dense fog / mist obscuring subject
- random light orbs / lens flares
- 3+ layers of atmospheric effects

保留：
- subtle atmospheric haze for depth
- single-source volumetric light
- weather-appropriate precipitation (rain/snow)
```

### text（文字清理）

```
删除：
- meaningless micro text / placeholder text
- random Chinese/English gibberish
- unreadable small annotations

保留：
- 片名（海报）
- 角色名（角色卡 allowed if text_level ≥ minimal）
- 技术标注质感（not readable, for texture only）
```

### texture（纹理清理）

> ⚠ 清理前先读取 `state/visual-control-state.md → genre_override`。战争/末日/悬疑/写实类的 grain 是质感不是污染，跳过删除。

```
先检查 genre_override.film_grain：
  ├─ "heavy" 或 "cinematic" → ✅ 保留 grain，不清理 texture_noise
  ├─ "subtle" → ⚠️ 只清理过量 grain，保留 subtle 级
  └─ "none" → 正常清理

删除（仅当 genre 允许时）：
- excessive film grain / noise（超过 genre_override 允许上限时）
- dirty paper texture on clean角色卡
- over-sharpening artifacts
- multiple competing texture layers

保留（genre 白名单内的不算污染）：
- cinematic / heavy grain for 战争/末日/悬疑/纪录片/写实
- subtle grain for 科幻
- subtle paper texture for 东方角色研究板
- controlled grain for cinematic looks
```

### layout（边框/表格/UI框架清理）

```
删除：
- visible panel borders / thick frame lines
- table grid lines / spreadsheet-like layout
- UI frame / window decorations / title bars
- divider lines / separator bars
- numbered panels with visible borders
- split-screen dividers / multi-panel frames

降低：
- 分镜格边框：从粗线 → 细线 → 无线
- 信息栏：从黑底白字 → 半透明 → 仅排版质感
- 分区线：从实线 → 虚线 → 移除

保留（仅当需要结构时）：
- 超细淡线分隔（≤1px 视觉等效）
- 角色卡6模块之间的微妙空间分隔
```

### video-ref（派生 clean video_asset）

> 特殊子命令：从 display_asset 派生出干净的 video_asset 版本。不是简单删词，而是**重新生成**一张 clean 版本。

```
流程：
1. 识别当前 @图的 asset_purpose（display_asset / marketing_asset）
2. 提取可迁移的核心信息：
   ├─ 角色 DNA（面部/体型/服装/发色/武器）→ 保留
   ├─ 场景锚点（空间布局/主光源/地标/材质）→ 保留
   ├─ 动作方向/姿态 → 保留
   └─ 风格/色彩方案 → 保留
3. 剥离污染元素：
   ├─ 所有文字/标注/箭头 → 移除
   ├─ 边框/表格/UI框架 → 移除
   ├─ 伪 HUD/随机网格 → 移除
   ├─ 过量粒子/雾效 → 降低到 subtle
   ├─ 高密度背景 → 降低到 low
   └─ 营销排版/大字标题 → 移除
4. 生成 clean prompt（保留核心信息，应用 visual-cleanliness 规则）
5. 输出标注为 🎬 video_asset，写入 asset-map
6. 更新 visual-control-state（density -1~2, background=low, text=none, hud=none）
```

**各类型派生规则**（详见 `rules/video-reference-assets.md`）：

| 源资产（display） | → 派生 video_asset | 保留 | 剥离 |
|------------------|-------------------|------|------|
| 全案板 | central hero frame | 核心场景+角色+构图 | 边框/表格/标注/参数栏 |
| 分镜图 | no-text keyframes | 每帧画面内容+运镜方向 | 帧号/参数/台词/边框 |
| 角色圣经 | clean character sheet | 三视图+面部+服装DNA | 文字/箭头/不可变标注框 |
| 场景参考 | no-text scene anchor | 空间+光+材质+天气 | 技术标注/色卡/文字说明 |

---

## 五、输出

```markdown
【去噪结果】

清理维度：[HUD / 背景 / 粒子 / 文字 / 纹理 / 全维度]
密度变化：3 → 2
背景复杂度：medium → low
HUD：moderate → none

清理前问题：
- 背景出现随机网格线
- 3层粒子叠加淹没主体

清理后：
[density 2, background low, hud none, particles subtle]

【清理版 Prompt】
[重新生成的干净 prompt]
```

---

## 六、联动

← 读取 `state/visual-control-state.md`（当前值）
← 读取 `rules/visual-cleanliness.md`（规则基准）
← 识别用户命令（`/declutter [维度]`）
← 被 `auto-repair` 在视觉干净度低时调用
→ 更新 `state/visual-control-state.md`
→ 输出清理版 prompt
→ 有项目资产时触发 `engines/incremental-update.md`
