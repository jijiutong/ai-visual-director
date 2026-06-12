# 任务路由引擎（总入口）

接收用户输入，识别意图，分发到正确的处理链。这是整个系统的最前端入口。

---

## 一键视频主链路

```
用户输入
  ↓
task-router（意图识别+路由分发）
  ↓
command-gate（权限闸门：模式选择+权限表+写回策略+格式合同）
  ↓
project-manager（项目初始化/加载：project.id + state/ 持久化）→ 写入 state/variable-registry
  ↓
sources/（输入源处理：粘贴/Obsidian/frontmatter）
  ↓
story-intake（故事摄入：提取字段+角色+场景+冲突）→ 写入 state/variable-registry
  ↓
shot-budget（镜头预算：定时长/镜数/是否拆段/压缩）→ 写入 state/variable-registry
  ↓
video-director（导演决策：节奏/高潮定位/情绪曲线/参考图）→ 写入 state/variable-registry + shot-state + dialogue-map
  ↓
asset-plan（资产规划：角色卡/场景图/关键帧/最低校验）→ 写入 state/variable-registry
  ↓
consistency-trigger（一致性触达：分镜密度 + 场景方法 + 角色方法决策 → 输出保障建议。不阻塞主链）
  ↓
visual-density-controller（视觉密度控制：按输出类型设密度/背景/HUD/粒子/文字默认值 → 写入 state/visual-control-state）
  ↓
reference-anchor（平台锚点：参考图策略+平台限制校验）→ 写入 state/asset-map
motion-physics（运动物理：运动预算+兼容性检查）→ 补充 state/shot-state
  ↓
project-graph（依赖图：构建双向索引 → 写入 state/project-graph）
  ↓
【子路由调用】（/create 内部自动触发，生成角色卡/场景图/分镜图/台词/音效 prompt）
	↑ consistency-trigger 的场景/角色方法决策传入子路由
	├── /character  → templates/character-sheet.md → 写入 asset-map
	├── /scene     → 场景方法选择（LS8/LS9/全景）→ templates/scene-card.md → 写入 asset-map
	├── /storyboard→ templates/full-board.md        → 写入 asset-map
	├── /dialogue  → engines/dialogue-engine.md → 写入 state/dialogue-map → templates/dialogue-script.md
	└── /sound     → engines/sound-engine.md → 写入 state/sound-map → templates/sound-design-sheet.md
	↓
	video-prompt-assembly（只组装视频 prompt，确认子路由已产出角色/场景/分镜/台词/音效）← 读取 state/
  ↓
consistency-engine（一致性评估：5维度 RM 评分+阻断项检测+知识库建议）
  ↓
prompt-scorer（自动评分：6维度评分+阈值判断）← 接收一致性报告
  ↓
auto-repair（自动修复：低于 SCORE_PASS_THRESHOLD → 按策略修复，最多 REPAIR_MAX_ROUNDS 轮。以上值从 api-config.template.env 读取）
  ↓
final-video-qc（最终质检：12项清单含引用一致性+模板合规+视觉干净度+视觉可用性+台词连贯性+音效覆盖+致命项判定）← 读取 state/
  ↓
render-package（打包输出：资产+Prompt+平台参数+执行清单）
```

---

## 基础能力子路由（标准契约）

基础能力（角色卡/场景图/分镜图）走统一子链，与主链路共享 state/ + asset-map + QC 体系。

### /character — 角色卡子链

```
用户："生成角色卡" / "出角色卡"
  ↓
story-intake（快速提取角色字段：姓名/身份/外观/DNA）
  ↓
state/variable-registry ← 写入 characters.protagonist.{name, immutable_features}
  ↓
consistency-trigger（角色部分）← 读取 shot-state 角色出镜分布 + variable-registry characters →
  评估角色复杂度（出镜率/服装复杂度/武器）→ 推荐角色一致性方法（角色卡/面部5角度/服装武器细节卡）
  ↓
【角色方法选择】呈现选项（零确认下用推荐默认）：
  配角/≤2镜 → 角色卡 + DNA文字
  主角/>2镜/中等服装 → 角色卡 + 面部5角度
  主角/>4镜/复杂服装 → + 服装武器细节卡
  用户可选改方法，回复编号即可
  ↓
visual-density-controller（按输出类型=角色卡设置密度）→ 写入 state/visual-control-state
  ↓
templates/character-sheet ← 读取 registry + consistency-trigger 角色方法 + visual-control-state → 生成角色卡 prompt
  ↓
state/asset-map ← 写入 character_sheet @图X
  ↓
final-video-qc ← 角色一致性检查（第2项 + 第8项引用一致性）
  ↓
输出：角色卡 prompt + 资产映射
```

### /scene — 场景图子链

```
用户："生成场景图" / "出场景图"
  ↓
story-intake（快速提取场景字段：地点/时间/天气/氛围）
  ↓
state/variable-registry ← 写入 scene.primary.{name, time_of_day, weather, fixed_elements}
  ↓
consistency-trigger（场景部分）← 读取 shot-state 景别分布 + variable-registry scene → 
  评估场景复杂度（角度分布/固定元素数/场景数）→ 推荐场景一致性方法
  ↓
【场景方法选择】呈现选项（零确认下用推荐默认）：
  1场景+正面为主 → LS8 全能参考图（默认推荐）
  1场景+多角度   → LS9 九宫格 / 4宫格
  多场景/大型空间 → 720°全景 / 每场景独立
  用户可选改方法，回复编号即可
  ↓
visual-density-controller（按输出类型=场景卡设置密度）→ 写入 state/visual-control-state
  ↓
templates/scene-card ← 读取 registry + 对应 LS 版式 + visual-control-state → 生成场景图 prompt
  ↓
state/asset-map ← 写入 scene_reference @图X（标注版式：LS8/LS9/LS27/720°全景）
  ↓
final-video-qc ← 场景一致性检查（第3项 + 第8项引用一致性 + 版式匹配校验）
  ↓
输出：场景图 prompt + 资产映射 + 版式标注
```

### /storyboard — 分镜图子链

```
用户："生成分镜图" / "出故事板"
  ↓
story-intake（提取字段）
  ↓
shot-budget（判断镜数/时长/是否拆段）
  ↓
video-director（镜号/阶段/景别/运镜/灯光/色彩/转场）
  ↓
state/variable-registry ← 写入 style.* + scene.*
state/shot-state ← 写入全部镜头（shot_id/phase/shot_size/camera/lighting/color/transition/end_state）
  ↓
visual-density-controller（按输出类型=分镜图设置密度）→ 写入 state/visual-control-state
  ↓
templates/full-board 或 quick-board ← 读取 registry + shot-state + visual-control-state → 生成分镜图 prompt
  ↓
state/asset-map ← 写入 storyboard_board @图X
  ↓
final-video-qc ← 镜头/连续性检查（第4项动作 + 第6项连续性 + 第8项引用一致性）
  ↓
输出：分镜图 prompt + 镜头状态表 + 资产映射
```

### /dialogue — 台词脚本子链

```
用户："出台词" / "台词脚本" / "/dialogue"
  ↓
story-intake（提取对话文本 + 角色台词归属）
  ↓
state/variable-registry ← 读取 characters.*（speaker 列表）
state/shot-state ← 读取 shots[].shot_id（台词分配目标）
  ↓
engines/dialogue-engine（台词设计）：
  ├─ 分配 shot_id（台词归属镜头）
  ├─ 标注 delivery（语气/表演要求 — 读取 knowledge/dialogue-rhythm.md）
  ├─ 标注 rhythm（停顿/重音/语速/音量/沉默）
  ├─ 设计 subtitle（位置/时长/样式）
  └─ 标注 lip_sync（口型同步需求）
  ↓
state/dialogue-map ← 写入每条台词
  ↓
templates/dialogue-script ← 读取 dialogue-map + variable-registry → 生成台词脚本
  ↓
final-video-qc ← 台词连贯性 + 角色引用一致性检查
  ↓
输出：台词脚本（含节奏标注 + 字幕方案）
```

### /sound — 音效设计子链

```
用户："出音效" / "音效设计" / "/sound"
  ↓
state/variable-registry ← 读取 story.genre + scene.*
state/shot-state ← 读取 shots[].phase + shots[].action
state/dialogue-map ← 读取台词（音效与台词时机配合）
  ↓
engines/sound-engine（音效设计）：
  ├─ 按场景环境自动匹配 SE 编号（读取 knowledge/sound-design.md）
  ├─ 按动作类型自动匹配 FX 编号（读取 knowledge/sound-design.md）
  ├─ 按情绪阶段自动匹配 MU 编号（读取 knowledge/audio-reference.md）
  ├─ 按场景空间自动匹配 RS 编号（读取 knowledge/sound-design.md）
  └─ 标注 timing + volume + sync_with
  ↓
state/sound-map ← 写入每条音效
  ↓
templates/sound-design-sheet ← 读取 sound-map + shot-state → 生成音效设计表
  ↓
final-video-qc ← 音效覆盖 + 时机配合检查
  ↓
输出：音效设计表（含 SE/FX/MU/RS 编号 + 时机 + 描述）
```

### 子链与主链的关系

| | /character | /scene | /storyboard | /dialogue | /sound | /create（全链） |
|---|-----------|--------|-------------|-----------|--------|----------------|
| story-intake | ✅ 快速 | ✅ 快速 | ✅ 完整 | ✅ 快速 | — | ✅ 完整 |
| shot-budget | — | — | ✅ | — | — | ✅ |
| video-director | — | — | ✅ | — | — | ✅ |
| asset-plan | — | — | — | — | — | ✅ |
| consistency-trigger | ✅（角色部分） | ✅（场景部分） | — | — | — | ✅ |
| dialogue-engine | — | — | — | ✅ | — | ✅（主链调用） |
| sound-engine | — | — | — | — | ✅ | ✅（主链调用） |
| reference-anchor | — | — | — | — | — | ✅ |
| motion-physics | — | — | — | — | — | ✅ |
| video-prompt-assembly | — | — | — | — | — | ✅ |
| template 输出 | character-sheet | scene-card | full-board / quick-board | dialogue-script | sound-design-sheet | 全部 |
| state/ 写入 | characters + asset-map | scene + asset-map | style + shots + asset-map | dialogue-map | sound-map | 全部 |
| final-video-qc | 角色一致性 | 场景一致性 | 镜头/连续性 | 台词连贯性 | 音效覆盖 | 12项全量 |

> **原则**：无论走哪条子链，都必须写入 state/ 和 asset-map，确保后续 /create 主链可以读取已有的角色/场景/分镜数据，避免重复生成。

---

## 意图识别

| 用户输入特征 | 意图 | 路由到 |
|-------------|------|--------|
| "新建项目" / "创建项目" / "新项目" | 创建项目 | **project-manager（init）** → 初始化 state/ → story-intake → ... |
| "继续项目" / "加载项目" / "打开项目" / "我的项目" | 加载/恢复项目 | **project-manager（list or load）** → 恢复 state/ → 继续主链 |
| "删除项目" / "清除项目" | 删除项目 | **project-manager（delete）** |
| "保存项目" / "保存" | 保存当前状态 | **project-manager（save）** |
| 简短句子（≤SHORT_INPUT_THRESHOLD_CHARS字），无格式 | 一句话故事 → 一键生成 | project-manager（auto-init）→ command-gate（mode=stable）→ sources/paste-input → story-intake → shot-budget → ... → /create standard 全链 |
| 粘贴的完整故事段落 | 单段故事 | project-manager（auto-init）→ command-gate（mode=stable）→ sources/paste-input → story-intake → shot-budget → ... → /create standard 全链 |
| `/create fast` / "快速" / "先看方向" | 快速一键 | project-manager（auto-init）→ command-gate（mode=stable）→ /create fast 链路 |
| `/create full` / "完整全案" / "全部都来" | 完整全案 | project-manager（auto-init）→ command-gate（mode=project）→ /create full 链路 |
| `/create standard` / `/create` 默认 | 标准一键 | project-manager（auto-init）→ command-gate（mode=stable）→ /create standard 链路 |
| "从 Obsidian 读取" | Obsidian 输入 | sources/obsidian-ingest → story-intake → ... |
| "生成角色卡" / "出角色卡" | 单独生成角色卡 | **/character 子链**：story-intake → state/variable-registry → consistency-trigger（角色方法决策）→ character-sheet → state/asset-map → final-video-qc |
| "生成场景图" / "出场景图" | 单独生成场景图 | **/scene 子链**：story-intake → state/variable-registry → consistency-trigger（场景方法决策）→ 用户确认版式 → scene-card → state/asset-map → final-video-qc |
| "生成分镜图" / "出故事板" | 单独生成分镜图 | **/storyboard 子链**：story-intake → shot-budget → video-director → state/shot-state → full-board/quick-board → state/asset-map → final-video-qc |
| "出台词" / "台词脚本" / "/dialogue" | 独立生成台词脚本 | **/dialogue 子链**：story-intake → dialogue-engine → state/dialogue-map → dialogue-script → final-video-qc |
| "出音效" / "音效设计" / "/sound" | 独立生成音效设计表 | **/sound 子链**：sound-engine → state/sound-map → sound-design-sheet → final-video-qc |
| "出视频 prompt" | 仅输出 prompt | render-package（跳过生成图片阶段） |
| "继续下一段" / "续写" | 续写 | state/continuity-snapshot → story-intake → shot-budget → ... → 全链 |
| "改第N镜" | 精准修改（单镜） | engines/single-shot-edit → incremental-update → 增量QC |
| "主角换长发" / "剑冢加石碑" / "[角色]改[属性]" / "[场景]改[元素]" | 实体变更（跨镜传播） | engines/incremental-update → 查 project-graph → 传播 → 增量QC |
| "换成[导演]风格" / "换成[风格名]" / "风格迁移" | 风格迁移 | engines/style-migration → 更新 style_memory → incremental-update（全镜 color/lighting）→ 增量QC |
| "换风格" / "改风格" / "风格换一下" | 风格变更（解锁重选） | engines/video-director（解锁 style_memory → 重新决策 → 重新锁定）→ 全链 |
| "海报" / "电影海报" / "封面" / `/poster` | 海报输出 | story-intake → state/variable-registry → templates/poster → state/asset-map → final-video-qc |
| "风格" / "看风格" / `/style` | 风格浏览/迁移 | engines/style-migration 或 engines/styles → state/variable-registry → 增量QC |
| `/declutter` / `/declutter all` | 全维度降噪 | **engines/prompt-declutter** → 更新 visual-control-state → 重新生成 prompt |
| `/declutter hud` / `/declutter background` / `/declutter particles` / `/declutter text` / `/declutter texture` / `/declutter layout` | 指定维度降噪 | **engines/prompt-declutter**（维度过滤）→ 更新 visual-control-state |
| `/declutter video-ref` | 从 display_asset 派生 clean video_asset | **engines/prompt-declutter**（video-ref 维度）→ 调用 rules/video-reference-assets.md → 重新生成 → 写入 asset-map |
| `/declutter role-card` / `/declutter scene` / `/declutter poster` | 按输出类型降噪 | **engines/prompt-declutter**（类型匹配 clean 模板） |
| "太乱了" / "画面太脏" / "画面太满" | 自然语言 → 全维度降噪 | **engines/prompt-declutter** |
| "更干净" / "更留白" / "更清爽" | 自然语言 → 降密度 | **engines/visual-density-controller**（density -1）→ 更新 visual-control-state |
| "信息多一点" / "设定集一点" | 自然语言 → 升密度 | **engines/visual-density-controller**（density +1，不超过上限） |
| "/compact" / "压缩 prompt" / "压缩上下文" / "去噪" | Token 压缩/去噪 | **/avd/compact**（prompt-compression + prompt-declutter） |
| `/lock` / "锁定" / "这个定了" / "就这版" / "角色锁定" / "场景锁定" / "全部锁定" | 锁定当前产出 | **engines/state-commit**（/lock 流程）→ 写入 lock-state |
| `/commit` / "确认采用" / "用这版" | 提交锁定内容到主状态 | **engines/state-commit**（/commit 流程）→ 写入 variable-registry + 持久化 |
| `/unlock` / "解锁" | 解除锁定 | **engines/state-commit**（/unlock 流程）→ 清除 lock-state 对应字段 |
| `/check` / "检查一下" | 查看当前锁定/写回状态 | **engines/state-commit**（/check 流程）→ 输出状态摘要 |
| `/vary` / "出个变体" / "在锁定范围内变化" | 锁定范围内变体 | **engines/state-commit**（/vary 流程）→ 读取 lock-state → 只变可变字段 → 标记 derived |
| "多版本" / "A/B/C" | 多版本对比 | story-intake → shot-budget → video-director × 3（不同风格，同一批次产出，state/ 数据随版本标注 A/B/C 区分） |
| 含 frontmatter 的 .md 内容 | 结构化输入 | sources/frontmatter-parser → story-intake（跳过部分提取） |
| "批处理" / "全部章节" | 批量 | sources/obsidian-ingest → 循环：每章 → 全链 |
| "一键全平台" | 多平台输出 | 全链到 asset-plan 为止共用 → 从 reference-anchor 开始每平台独立跑（reference-anchor → motion-physics → video-prompt-assembly → ...），每平台产出独立的 asset-map，最终 render-package 合并所有平台输出 |

**多平台处理**：story-intake → asset-plan 只跑一次（内容/艺术决策相同），从 reference-anchor 开始每个平台独立跑（平台参数/字数/参考图策略/语言不同）。每平台生成独立的 asset-map，最终 render-package 合并所有平台的输出。state/ 共享部分（variable-registry）一次写入，平台特定部分（asset-map）每平台独立生成。

---

## 最快路径（一键生成）

用户输入一句话故事 → 不追问 → 自动补全 → 直接输出 `/create standard`：

```
用户："雨夜古寺，两名剑客在佛像前对峙"
  ↓
paste-input（检测：短句模式）
  ↓
command-gate（mode=stable，默认 /create standard）
  ↓
story-intake（自动补全：片名/类型/角色名/冲突）— 不追问
  ↓
shot-budget（判断：1场景2角色1动作 → 10s / 5镜 / 不拆段）
  ↓
video-director（自动匹配：风格/节奏/情绪曲线/高潮定位）
  ↓
[用户确认或跳过]
  ↓
asset-plan → consistency-trigger → visual-density-controller → reference-anchor → motion-physics → project-graph
→ 【子路由】/character + /scene + /storyboard
→ video-prompt-assembly → consistency-engine → prompt-scorer
  ↓
（评分 ≥ SCORE_PASS_THRESHOLD → prompt-qc → final-video-qc → render-package）
（评分 < SCORE_PASS_THRESHOLD → auto-repair 修复 → 重评 → prompt-qc → final-video-qc → render-package）
  ↓
角色卡 + 场景卡 + 分镜图 + 视频 Prompt → 输出（全部 draft）
```

**触发条件**：用户输入 ≤ SHORT_INPUT_THRESHOLD_CHARS（从 api-config.template.env 读取）字且无特殊指令 → 默认走 `/create standard`。

---

## 三档链路定义

### /create fast

```
最短链路。只出核心文字 prompt，不出图类资产。

链路：task-router → command-gate（mode=stable）
  → sources/ → story-intake → shot-budget → video-director
  → video-prompt-assembly → prompt-qc → render-package

不调用：asset-plan、子路由（/character /scene /storyboard）、consistency-engine、auto-repair、final-video-qc
产出：角色概念 prompt + 场景概念 prompt + 分镜文本 + 视频 prompt
全部标记 draft
```

### /create standard（默认）

```
完整但克制。三大核心资产 + 视频包。

链路：task-router → command-gate（mode=stable）
  → sources/ → story-intake → shot-budget → video-director
  → asset-plan → consistency-trigger → visual-density-controller
  → reference-anchor → motion-physics → project-graph
  → 子路由（/character + /scene + /storyboard）
  → video-prompt-assembly → consistency-engine → prompt-scorer
  → auto-repair（如需）→ prompt-qc → final-video-qc → render-package

不默认调用：dialogue-engine、sound-engine、poster-template
全部标记 draft
```

### /create full

```
完整项目导演包。standard全部 + 台词/音效/全案板/海报/导演阐述。

链路：/create standard 全部链路
  + dialogue-engine → templates/dialogue-script.md
  + sound-engine → templates/sound-design-sheet.md
  + templates/full-board.md（导演展示版，display_asset）
  + templates/poster.md（marketing_asset，video_safe=false）
  + director notes + execution checklist

mode=project（C类导演增强层默认开放）
全部标记 draft
```

---

## 路由决策树

```
用户输入
  ├─ 含 "新建项目"/"创建项目"/"新项目" → project-manager（init）→ story-intake
  │
  ├─ 含 "我的项目"/"项目列表"/"列出项目" → project-manager（list）
  ├─ 含 "继续项目"/"加载项目"/"打开项目" → project-manager（load）→ 恢复 state/
  ├─ 含 "删除项目" → project-manager（delete）
  ├─ 含 "保存项目"/"保存" → project-manager（save）
  │
  ├─ 含 "/create fast" / "快速" / "先看方向" → command-gate（mode=stable）→ /create fast 链路
  ├─ 含 "/create full" / "完整全案" / "全部都来" → command-gate（mode=project）→ /create full 链路
  ├─ 含 "/create standard" / "/create" → command-gate（mode=stable）→ /create standard 链路
  │
  │   ├─ 含 "全部" → 批量模式
  │   └─ 单章 → 单章模式
  │
  ├─ 含 YAML frontmatter → frontmatter-parser → story-intake
  │
  ├─ 含 "继续"/"续写"/"下一段" → continuity-snapshot → story-intake
  │
  ├─ 含 "改第N镜" → 精准修改模式（单镜）
  ├─ 含 "换长发"/"改属性"/"加[元素]"/"删[元素]" → incremental-update（实体变更+跨镜传播）
  ├─ 含 "换成[导演/风格]" / "风格迁移" → style-migration
  ├─ 含 "换风格" / "改风格" → video-director（解锁style_memory → 重决策）
  ├─ 含 "海报"/"封面"/"/poster" → poster 模板输出
  ├─ 含 "看风格"/"/style" → 风格浏览或风格迁移
  │
  ├─ 含 "/lock" / "锁定" / "定了" / "就这版" → state-commit（/lock）
  ├─ 含 "/commit" / "确认采用" / "用这版" → state-commit（/commit）
  ├─ 含 "/unlock" / "解锁" → state-commit（/unlock）
  ├─ 含 "/check" / "检查一下" → state-commit（/check）
  ├─ 含 "/vary" / "变体" / "在锁定范围内变化" → state-commit（/vary）
  │
  ├─ 含 "/declutter" → prompt-declutter（全维度或指定维度降噪：hud/background/particles/text/texture/layout/video-ref）
  ├─ 含 "太乱"/"太脏"/"太满" → prompt-declutter（全维度降噪）
  ├─ 含 "去掉边框"/"去掉表格" → prompt-declutter（/declutter layout）
  ├─ 含 "更干净"/"更留白"/"更清爽" → visual-density-controller（density -1）
  ├─ 含 "信息多一点"/"设定集" → visual-density-controller（density +1，不超过上限）
  │
  ├─ 含 "/compact" / "压缩 prompt" / "压缩上下文" / "去噪" → /avd/compact（prompt-compression + prompt-declutter）
  │
  ├─ 含 "多版本"/"A/B" → 多版本对比模式（同批次产出，state/ 按版本标注）
  │
  ├─ 含 "角色卡"/"出角色卡" → /character 子链
  ├─ 含 "场景图"/"出场景图" → /scene 子链
  ├─ 含 "分镜图"/"故事板" → /storyboard 子链
  ├─ 含 "出台词"/"台词"/"/dialogue" → /dialogue 子链
  ├─ 含 "出音效"/"音效"/"/sound" → /sound 子链
  ├─ 含 "prompt"（单独指令）→ 仅输出 prompt
  │
  ├─ 短句 ≤SHORT_INPUT_THRESHOLD_CHARS（api-config.template.env）→ project-manager（auto-init）→ 一键生成最快路径
  │
  ├─ 段落 SHORT_INPUT_THRESHOLD_CHARS ~ MID_INPUT_THRESHOLD_CHARS 字 → project-manager（auto-init）→ 单段故事路径
  │
  └─ 超长 >MID_INPUT_THRESHOLD_CHARS 字 → 问用户：压缩成一段还是拆段？
      ├─ 拆段 → shot-budget 判断拆几段
      └─ 压缩 → shot-budget
```

---

## 确认策略

| 意图 | 确认级别 |
|------|---------|
| 角色卡/分镜图（单独） | **零确认**，直接出结果 |
| 场景图（单独） | **零确认**使用推荐方法，展示可选版式（九宫格/4宫格/720°全景/全能参考），用户可说"换九宫格"覆盖 |
| `/create fast` | **零确认**，直接出快速结果 |
| `/create standard`（默认） | **零确认**，直接出结果 |
| `/create full` | 最多 1 次确认（确认完整度：台词+音效+海报+导演阐述是否需要） |
| `/compact` / 压缩/去噪 | **零确认**，直接出压缩结果 |
| 一键生成（≤SHORT_INPUT_THRESHOLD_CHARS字） | **零确认**，直接出 /create standard |
| 一键生成（>SHORT_INPUT_THRESHOLD_CHARS字或有歧义） | 最多 1 次确认（风格+时长） |
| 单段故事 | 最多 1 次确认（风格+时长+格式） |
| Obsidian 单章 | 1 次确认（章节+时长+镜数） |
| Obsidian 批量 | 1 次确认（章节范围+每章参数） |
| 续写 | 无确认（自动继承上段状态） |
| 精准修改 | 无确认（直接修改指定镜） |
| 实体变更（改角色/场景属性） | 无确认（incremental-update 自动计算影响范围） |
| 换风格 / 风格迁移 | 无确认（自动解锁→重决策→锁定，或直接迁移） |
| `/lock` / `/commit` | **零确认**，直接执行 |
| `/unlock`（普通） | **零确认**，直接执行 |
| `/unlock all` / "全部解锁" | **1 次确认**（防止误操作） |
| `/check` | **零确认**，直接输出状态 |
| `/vary` | **零确认**，直接生成变体（locked 字段不可变） |
| 多版本 | 1 次确认（选哪几个风格对比） |
| `/declutter` / 降噪 | **零确认**，直接执行清理 |
| "更干净"/"更留白" | **零确认**，直接降密度 |
| "更复杂"（可能破坏视频锚点时） | 最多 1 次确认（用途：展示还是视频参考） |

**规则**：任何路径，确认最多 1 次。不轮流追问。

---

## 自动化程度

```
高自动化（不问用户）：
  - 角色名 → 自动起名
  - 场景细节 → 自动补全
  - 场景一致性方法 → consistency-trigger 自动推荐（九宫格/4宫格/720°全景/全能参考），用户可说"换XX"覆盖
  - 灯光方案 → 按类型自动匹配
  - 色彩方案 → 按情绪自动匹配
  - 转场类型 → 按节奏自动匹配
  - 编号填充 → 全部自动（VS/EC/CN/CP/ME/BL/EV/WT/MT/CR/PR/HE/TR/SD/DR）
  - 负面提示词 → 自动生成
  - Prompt 格式 → 自动适配平台
  - 格式合同 → command-gate 自动锁定
  - /create 档位 → 默认 standard，用户说 fast/full 切换
  - 输出状态 → 默认 draft，用户说 lock/commit 切换
  - 能力分层 → A类必走，C/D 类按模式开/关

中自动化（问1次）：
  - 风格+时长+格式（合并为1个问题）
  - 或：确认一键生成的默认值
  - /create full 确认衍生内容范围

低自动化（必须用户决策）：
  - 拆段 vs 压缩（长篇）
  - 批量范围（Obsidian 多章）
  - 平台选择（如果没指定）
  - 解锁已锁定内容（/unlock）
```

---

## 输出

路由引擎不输出内容——它只负责识别意图并调用正确的第一个引擎。

路由完成后，控制权交给目标引擎。
