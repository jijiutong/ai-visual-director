# 格式合同

任何输出生成前必须先锁定格式。这份文件是所有模板和引擎的统一格式约束来源。生成前读取，生成后 QC 对照。

---

## 一、输出类型格式合同

每种输出类型一份合同。生成前选定 `output_type` → 锁定该行的全部约束。

### 1.1 角色资产

| 字段 | character-sheet<br>角色卡 | character-three-view<br>三视图 | face-consistency<br>面部一致性 | costume-detail<br>服装武器卡 |
|------|---------------------------|-------------------------------|------------------------------|----------------------------|
| **output_type** | `character_sheet` | `character_three_view` | `face_consistency` | `costume_detail` |
| **asset_purpose** | `consistency_asset` | `consistency_asset` | `consistency_asset` | `consistency_asset` |
| **video_safe** | ✅ 全量版直接可用 | ✅ 可直接用 | ✅ 可直接用 | ✅ 可直接用 |
| **aspect_ratio** | `16:9` | `16:9` | `1:1` | `16:9` |
| **required_modules** | 正全身 / 侧全身 / 背全身 / 面部特写 / 不可变特征框 | 正视图 / 侧视图 / 背视图 / 头顶视角 | 正面 / 半侧面 / 正侧 / 微俯 / 微仰 各1张 | 正面全身 / 服装分层 / 武器多角度 / 材质特写 |
| **fatal_if_missing** | 正全身、侧全身、背全身 | 正视图、侧视图、背视图 | 正面、正侧 | 正面全身、武器（如有） |
| **text_allowed** | LS12/13/41-44 少量标注 ✅ | ❌ | ❌ | 材质/尺寸标注 ✅ |
| **border_allowed** | LS12/13 版式边框 ✅ | ❌ | ❌ | ❌ |
| **hud_allowed** | LS13 科幻 HUD ✅ | ❌ | ❌ | ❌ |
| **background** | 白/浅灰（LS12 黑金/ LS13 暗岩除外） | 纯白/极浅灰 | 统一纯色背景 | 白/浅灰 |
| **density_level** | 1-2 | 1 | 1 | 2 |
| **subject_ratio** | ≥ 60% | ≥ 80% | ≥ 70% | ≥ 60% |

### 1.2 场景资产

| 字段 | scene-card<br>场景卡 | mood-board<br>情绪板 | world-building<br>世界观板 |
|------|---------------------|---------------------|--------------------------|
| **output_type** | `scene_card` | `mood_board` | `world_building` |
| **asset_purpose** | `consistency_asset` | `display_asset` | `display_asset` |
| **video_safe** | ✅ 全量版直接可用（多角度空间锚点） | ❌ | ❌ |
| **aspect_ratio** | `16:9` | `16:9` | `16:9` |
| **required_modules** | 主场景 / 材质特写 / 光源方向 / 天气 / 色卡 | 主视觉 / 色板 / 质感参考 / 情绪关键词 | 全景 / 区域分区 / 生态/科技层 / 地标 |
| **fatal_if_missing** | 主场景、光源方向 | — | — |
| **text_allowed** | 标注/色卡文字 ✅ | 情绪关键词 ✅ | 区域标注 ✅ |
| **border_allowed** | LS8 版式边框 ✅ | ❌ | ❌ |
| **hud_allowed** | ❌ | ❌ | 科幻类线框 ✅ |
| **background** | — | — | — |
| **density_level** | 2-3 | 3 | 4 |
| **subject_ratio** | ≥ 50% | ≥ 40% | — |

### 1.3 分镜资产

| 字段 | full-board<br>全案板（导演展示版） | full-board-video<br>全案板（视频执行版） | storyboard-frame<br>分镜图（逐帧分镜） | quick-board<br>快速故事板 |
|------|---------------------------|------------------------------|--------------------------|-------------------------|
| **output_type** | `full_board` | `full_board_video` | `storyboard_frame` | `quick_board` |
| **asset_purpose** | `display_asset`（给人看的5模块导演板，允许完整标注） | `video_asset`（给视频模型看的施工图，保留镜号/景别/运镜等必要信息） | `display_asset`（纯镜头序列+技术参数，无角色锚点/场景概念图模块） | `display_asset` |
| **video_safe** | ❌ 不直接进视频 @图 | ✅ 直接进视频 @图 | ❌（单个无字关键帧除外） | ❌ |
| **aspect_ratio** | `16:9` | `16:9` | `16:9` | `16:9` |
| **required_modules** | 5模块（顶部项目栏+左侧角色锚点+中部主视觉+右侧分镜序列+底部三栏）。每镜11项参数。每张图≤4帧。帧数=ceil(总镜数/4) | 镜头序列 / 帧序 / 景别 / 运镜 / 高潮帧★ / 首帧 / 尾帧 / end_state。每张图≤4帧 | 帧画面 / 帧号 / 景别 / 运镜（纯镜头参数） | 关键帧序列 / 帧号 / 景别标注 |
| **fatal_if_missing** | 5模块缺一不可、每镜11项参数缺一不可、每张图帧数≤4 | 镜头序列、帧序、首帧、尾帧、end_state | 帧画面 | — |
| **text_allowed** | ✅ 每镜完整参数标注（必须可读） | ✅ 只允许镜号/景别/运镜/时长/end_state 等施工短标注 | 帧号/参数 ✅ | 帧号/参数 ✅ |
| **border_allowed** | ✅ 版式边框 | ✅ 帧分隔线（不能遮挡主体） | ✅ 帧分隔线 | ✅ 分隔线 |
| **hud_allowed** | LS2 科技面板 ✅ | ❌ | ❌ | ❌ |
| **background** | — | 与场景一致，避免海报化背景 | — | — |
| **density_level** | 3-4 | 2-3 | 2 | 2 |
| **subject_ratio** | 中央主视觉 ≥ 45% | 每帧主体 ≥ 50% | 每帧 ≥ 50% | — |
| **模板** | `templates/full-board.md`（导演展示版） | `templates/full-board.md`（视频执行版） | `templates/quick-board.md` | `templates/quick-board.md` |
| **LS 版式** | LS1-LS4/LS14-LS16 | LS5/LS6/LS7 或全案板视频执行裁切 | LS5/LS6/LS7 | LS5/LS6 |

> **全案板 vs 分镜图的区别**：全案板导演展示版（full_board）= 5模块导演板，有角色锚点+场景概念图+分镜序列，属于 display_asset，不直接进视频。全案板视频执行版（full_board_video）= 从导演版或分镜序列整理出的 video_asset，可以进视频 @图。分镜图（storyboard_frame）= 纯镜头序列，只有帧画面+参数。全案板用 `templates/full-board.md`，分镜图用 `templates/quick-board.md`。

### 1.4 视频与关键帧

| 字段 | keyframe<br>关键帧/首帧/尾帧 | video-prompt<br>视频 Prompt | dialogue-script<br>台词脚本 | sound-sheet<br>音效表 |
|------|---------------------------|---------------------------|---------------------------|---------------------|
| **output_type** | `keyframe` | `video_prompt` | `dialogue_script` | `sound_sheet` |
| **asset_purpose** | `video_asset` | `video_asset`（文本） | `display_asset`（文本） | `display_asset`（文本） |
| **video_safe** | ✅ | ✅ | — | — |
| **aspect_ratio** | `16:9` | —（文本） | —（文本） | —（文本） |
| **required_modules** | 完整画面 / 无文字 / 无边框 | 镜头序列 / @图引用 / 运镜 / 时长 | 角色名 / 台词 / 节奏标注 | 镜号 / 音效类型 / SD编号 / 时长 |
| **fatal_if_missing** | 无文字、无边框 | @图引用 | — | — |
| **text_allowed** | ❌ | ✅（Prompt 文本本身） | ✅ | ✅ |
| **border_allowed** | ❌ | — | — | — |
| **hud_allowed** | ❌ | — | — | — |
| **background** | 与场景一致 | — | — | — |
| **density_level** | 2 | — | — | — |
| **subject_ratio** | ≥ 50% | — | — | — |

### 1.5 营销与衍生

| 字段 | poster<br>海报 | manga-page<br>漫画分镜页 | director-notes<br>导演阐述 | style-proposal<br>风格建议 |
|------|---------------|------------------------|--------------------------|--------------------------|
| **output_type** | `poster` | `manga_page` | `director_notes` | `style_proposal` |
| **asset_purpose** | `marketing_asset` | `display_asset` | `display_asset`（文本） | `display_asset`（文本） |
| **video_safe** | ❌ 禁止 | ❌ | — | — |
| **aspect_ratio** | `2:3`（竖版默认） | `16:9` | —（文本） | —（文本） |
| **required_modules** | 主视觉 / 标题大字 / 底部信息 | 分格布局 / 角色 / 台词气泡 | 镜头选择理由 / 色彩策略 / 节奏阐述 | 风格名称 / 参考图 / 关键参数 |
| **fatal_if_missing** | — | — | — | — |
| **text_allowed** | ✅ 标题/副标题/信息 | ✅ 台词气泡 | ✅ | ✅ |
| **border_allowed** | ✅ 排版边框 | ✅ 分格线 | — | — |
| **hud_allowed** | ❌ | ❌ | — | — |
| **background** | 冲击感背景 | — | — | — |
| **density_level** | 3-4 | 3 | — | — |
| **subject_ratio** | ≥ 40% | 每格清晰 | — | — |

---

## 二、资产用途分层

四种用途，隔离规则不可违反。

| 用途 | 标识 | 可进入文字 | 可进入边框/HUD | 可进入视频 @图 | 典型输出 |
|------|------|-----------|---------------|---------------|---------|
| **display_asset** | 给人看 | ✅ | ✅ | ❌ | 全案板导演展示版、情绪板、世界观板 |
| **video_asset** | 给 AI 视频模型 | ❌（施工短标注例外见 full-board-video） | ❌（帧分隔线例外见 full-board-video） | ✅ | 关键帧/首帧/尾帧、全案板视频执行版 |
| **consistency_asset** | 锁定角色/场景 | ✅ 少量标注 | 按版式 | ✅ 全量版直接可用 | 角色卡、三视图、面部一致性、场景卡、服装武器卡 |
| **marketing_asset** | 海报/封面 | ✅ | ✅ | ❌ 禁止 | 海报 |

### 硬隔离规则

```
1. marketing_asset 永远不进视频 @图。
2. display_asset 不能直接入视频；必须先派生 clean video_asset，或生成 full-board-video 视频执行版。
3. video_asset 有文字/边框/HUD → 阻断；full-board-video 只允许必要施工短标注和帧分隔线。
4. consistency_asset 的三视图、面部一致性、角色卡、场景卡可直接用；角色卡/场景卡进视频时必须保持 asset_purpose=consistency_asset。
5. marketing_asset 永远不进视频，poster/cover 不得被写入 video prompt 的 @图引用。
```

---

## 三、通用格式约束

所有输出类型默认遵守（按输出类型的 density_level 调整严格度）。

| 约束 | 默认值 | 来源 |
|------|--------|------|
| 默认画幅 | `16:9` | `api-config.template.env` → `DEFAULT_ASPECT_RATIO` |
| 默认语言 | `zh`（GPT Image 2 + Seedance = 中文原生） — 强制，不可跨语言 | `api-config.template.env` → `DEFAULT_LANGUAGE` + 平台语言表 |
| 主体占比 | ≥ 40%（density 1→80%，density 4→无要求） | 本文件 §1 各输出类型 |
| 背景复杂度 | ≤ density_level 对应值 | `rules/visual-cleanliness.md` §二 |
| 负面词 | 所有图像 prompt 必须包含 | `rules/negative-prompt.md` |
| 可复制性 | prompt 文本必须可被直接复制使用，不含解释性文字 | 本文件 |

### Density 级别参考

| Level | 背景复杂度 | 粒子/特效 | 标注/文字 | 适用场景 |
|-------|----------|----------|----------|---------|
| **1** | 纯色/极简 | 无 | 无 | 三视图、面部一致性 |
| **2** | 低，主体优先 | subtle | 少量参数 | 角色卡、分镜图、关键帧 |
| **3** | 中，保留层次 | cinematic 允许 | 模块标注 | 场景卡、漫画页、科技 HUD |
| **4** | 高，分区明确 | 允许 | 完整信息栏 | 全案板导演版、海报、世界观板 |

---

## 四、格式错误处理

### 阻断（必须修，不修不放行）

| 错误 | 触发条件 | 修复方向 |
|------|---------|---------|
| video_asset 含文字 | keyframe / clean 派生品出现可读文字 | 去文字，重新派生 |
| video_asset 含边框/HUD | 视频参考图有分隔线/面板 | 去边框/HUD，重新派生 |
| 缺 fatal 模块 | required_modules 中的 fatal_if_missing 项未产出 | 补全缺失模块 |
| 海报进视频 @图 | poster 的 @图出现在 video prompt | 移除海报 @图，替换为 video_asset |
| display_asset 直接入视频 | 全案板导演版/情绪板 @图进入 video prompt | 先派生 clean video_asset 或 full-board-video |
| 画幅错误 | 输出画幅 ≠ 合同声明的 aspect_ratio | 修正画幅或更新合同 |

### 警告（提示用户，不阻断）

| 警告 | 触发条件 |
|------|---------|
| 密度超标 | 实际 density > 合同声明 level |
| 主体占比不足 | subject_ratio 低于合同要求 |
| 背景过满 | 背景复杂度显著超出 density 对应级别 |
| 文字过多 | display_asset 的文字量影响主视觉辨识 |

### 放行（明确允许）

| 情况 | 理由 |
|------|------|
| marketing_asset 自由发挥 | 海报/封面设计意图，不受 video_safe 限制 |
| 世界观板高密度 | 设计意图就是信息丰富 |
| 科技类 HUD | LS13 科幻角色卡的有意义 HUD 不是伪 UI |
| 场景卡氛围粒子 | 雾/雨/雪/光点属于场景设计，不是污染 |

---

## 五、运行时使用流程

```
1. 命令解析 → 确定 output_type
2. 查本文件 §1 → 锁定格式合同（全部字段）
3. 写入 state/format-contract-state.md（当前 session 快照）
4. 按合同生成 prompt
5. prompt-qc 对照合同检查
6. 不合 → auto-repair（只在允许范围内修）
```

---

## 六、与 api-config.template.env 关系

本文件的默认值从 `api-config.template.env` 读取，不硬编码：

| 本文件字段 | 配置键 |
|-----------|--------|
| `aspect_ratio` 默认值 | `DEFAULT_ASPECT_RATIO` |
| `language` 默认值 | `DEFAULT_LANGUAGE` |
| 视频平台相关限制 | `{PLATFORM}_MAX_*` 系列 |

> **优先级**：用户本轮指定 > 本文件输出类型默认 > api-config.template.env > 系统硬编码回退

---

## 联动

- ← 被 `engines/task-router.md` 主链路 §格式合同锁定 步骤读取
- ← 被所有 `sub-skills/*/SKILL.md` 生成前读取
- → 写入 `state/format-contract-state.md`（本次 session 快照）
- → 被 `rules/prompt-qc.md` 作为检查依据
- → 被 `rules/asset-qc.md` 作为资产用途检查依据
- → 被 `engines/auto-repair.md` 作为修复边界（不可越过合同修）
- ↔ 与 `rules/visual-cleanliness.md` §二 密度表对齐
- ↔ 与 `rules/video-reference-assets.md` 资产用途定义一致
- ↔ 与 `state/prompt-contract.md` 互补：prompt-contract 管模板变量读写，format-contract 管输出形式约束
