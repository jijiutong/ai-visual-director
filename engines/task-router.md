# 任务路由引擎（总入口）

接收用户输入，识别意图，分发到正确的处理链。这是整个系统的最前端入口。

---

## 一键视频主链路

```
用户输入
  ↓
task-router（意图识别+路由分发）
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
reference-anchor（平台锚点：参考图策略+平台限制校验）→ 写入 state/asset-map
motion-physics（运动物理：运动预算+兼容性检查）→ 补充 state/shot-state
  ↓
project-graph（依赖图：构建双向索引 → 写入 state/project-graph）
  ↓
【子路由调用】（/create 内部自动触发，生成角色卡/场景图/分镜图 prompt）
	  ↑ consistency-trigger 的场景/角色方法决策传入子路由
		  ├── /character  → templates/character-sheet.md → 写入 asset-map
	  ├── /scene     → 场景方法选择（LS8/LS9/全景）→ templates/scene-card.md → 写入 asset-map
	  └── /storyboard→ templates/full-board.md        → 写入 asset-map
	  ↓
	video-prompt-assembly（只组装视频 prompt，确认子路由已产出角色/场景/分镜 prompt）← 读取 state/
  ↓
consistency-engine（一致性评估：5维度 RM 评分+阻断项检测+知识库建议）
  ↓
prompt-scorer（自动评分：6维度评分+阈值判断）← 接收一致性报告
  ↓
auto-repair（自动修复：低于 SCORE_PASS_THRESHOLD → 按策略修复，最多 REPAIR_MAX_ROUNDS 轮。以上值从 api-config.template.env 读取）
  ↓
final-video-qc（最终质检：8项清单含引用一致性检查+致命项判定）← 读取 state/
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
templates/character-sheet ← 读取 registry + consistency-trigger 角色方法 → 生成角色卡 prompt
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
templates/scene-card ← 读取 registry + 对应 LS 版式 → 生成场景图 prompt
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
templates/full-board 或 quick-board ← 读取 registry + shot-state → 生成分镜图 prompt
  ↓
state/asset-map ← 写入 storyboard_board @图X
  ↓
final-video-qc ← 镜头/连续性检查（第4项动作 + 第6项连续性 + 第8项引用一致性）
  ↓
输出：分镜图 prompt + 镜头状态表 + 资产映射
```

### 子链与主链的关系

| | /character | /scene | /storyboard | /create（全链） |
|---|-----------|--------|-------------|----------------|
| story-intake | ✅ 快速 | ✅ 快速 | ✅ 完整 | ✅ 完整 |
| shot-budget | — | — | ✅ | ✅ |
| video-director | — | — | ✅ | ✅ |
| asset-plan | — | — | — | ✅ |
| consistency-trigger | ✅（角色部分） | ✅（场景部分） | — | ✅ |
| reference-anchor | — | — | — | ✅ |
| motion-physics | — | — | — | ✅ |
| video-prompt-assembly | — | — | — | ✅ |
| template 输出 | character-sheet | scene-card | full-board / quick-board | 全部 |
| state/ 写入 | characters + asset-map | scene + asset-map | style + shots + asset-map | 全部 |
| final-video-qc | 角色一致性 | 场景一致性 | 镜头/连续性 | 8项全量 |

> **原则**：无论走哪条子链，都必须写入 state/ 和 asset-map，确保后续 /create 主链可以读取已有的角色/场景/分镜数据，避免重复生成。

---

## 意图识别

| 用户输入特征 | 意图 | 路由到 |
|-------------|------|--------|
| "新建项目" / "创建项目" / "新项目" | 创建项目 | **project-manager（init）** → 初始化 state/ → story-intake → ... |
| "继续项目" / "加载项目" / "打开项目" / "我的项目" | 加载/恢复项目 | **project-manager（list or load）** → 恢复 state/ → 继续主链 |
| "删除项目" / "清除项目" | 删除项目 | **project-manager（delete）** |
| "保存项目" / "保存" | 保存当前状态 | **project-manager（save）** |
| 简短句子（≤SHORT_INPUT_THRESHOLD_CHARS字），无格式 | 一句话故事 → 一键生成 | project-manager（auto-init）→ sources/paste-input → story-intake → shot-budget → ... → 全链 |
| 粘贴的完整故事段落 | 单段故事 | project-manager（auto-init）→ sources/paste-input → story-intake → shot-budget → ... → 全链 |
| "从 Obsidian 读取" | Obsidian 输入 | sources/obsidian-ingest → story-intake → ... |
| "生成角色卡" / "出角色卡" | 单独生成角色卡 | **/character 子链**：story-intake → state/variable-registry → consistency-trigger（角色方法决策）→ character-sheet → state/asset-map → final-video-qc |
| "生成场景图" / "出场景图" | 单独生成场景图 | **/scene 子链**：story-intake → state/variable-registry → consistency-trigger（场景方法决策）→ 用户确认版式 → scene-card → state/asset-map → final-video-qc |
| "生成分镜图" / "出故事板" | 单独生成分镜图 | **/storyboard 子链**：story-intake → shot-budget → video-director → state/shot-state → full-board/quick-board → state/asset-map → final-video-qc |
| "出视频 prompt" | 仅输出 prompt | render-package（跳过生成图片阶段） |
| "继续下一段" / "续写" | 续写 | state/continuity-snapshot → story-intake → shot-budget → ... → 全链 |
| "改第N镜" | 精准修改（单镜） | engines/single-shot-edit → incremental-update → 增量QC |
| "主角换长发" / "剑冢加石碑" / "[角色]改[属性]" / "[场景]改[元素]" | 实体变更（跨镜传播） | engines/incremental-update → 查 project-graph → 传播 → 增量QC |
| "换成[导演]风格" / "换成[风格名]" / "风格迁移" | 风格迁移 | engines/style-migration → 更新 style_memory → incremental-update（全镜 color/lighting）→ 增量QC |
| "换风格" / "改风格" / "风格换一下" | 风格变更（解锁重选） | engines/video-director（解锁 style_memory → 重新决策 → 重新锁定）→ 全链 |
| "海报" / "电影海报" / "封面" / `/poster` | 海报输出 | story-intake → state/variable-registry → templates/poster → state/asset-map → final-video-qc |
| "风格" / "看风格" / `/style` | 风格浏览/迁移 | engines/style-migration 或 engines/styles → state/variable-registry → 增量QC |
| "多版本" / "A/B/C" | 多版本对比 | story-intake → shot-budget → video-director × 3（不同风格，同一批次产出，state/ 数据随版本标注 A/B/C 区分） |
| 含 frontmatter 的 .md 内容 | 结构化输入 | sources/frontmatter-parser → story-intake（跳过部分提取） |
| "批处理" / "全部章节" | 批量 | sources/obsidian-ingest → 循环：每章 → 全链 |
| "一键全平台" | 多平台输出 | 全链到 asset-plan 为止共用 → 从 reference-anchor 开始每平台独立跑（reference-anchor → motion-physics → video-prompt-assembly → ...），每平台产出独立的 asset-map，最终 render-package 合并所有平台输出 |

**多平台处理**：story-intake → asset-plan 只跑一次（内容/艺术决策相同），从 reference-anchor 开始每个平台独立跑（平台参数/字数/参考图策略/语言不同）。每平台生成独立的 asset-map，最终 render-package 合并所有平台的输出。state/ 共享部分（variable-registry）一次写入，平台特定部分（asset-map）每平台独立生成。

---

## 最快路径（一键生成）

用户输入一句话故事 → 不追问 → 自动补全 → 直接输出：

```
用户："雨夜古寺，两名剑客在佛像前对峙"
  ↓
paste-input（检测：短句模式）
  ↓
story-intake（自动补全：片名/类型/角色名/冲突）— 不追问
  ↓
shot-budget（判断：1场景2角色1动作 → 10s / 5镜 / 不拆段）
  ↓
video-director（自动匹配：风格/节奏/情绪曲线/高潮定位）
  ↓
[用户确认或跳过]
  ↓
asset-plan → consistency-trigger → reference-anchor → motion-physics → video-prompt-assembly → prompt-scorer
  ↓
（评分 ≥ SCORE_PASS_THRESHOLD（api-config.template.env）跳过 auto-repair → final-video-qc → render-package）
（评分 < SCORE_PASS_THRESHOLD → auto-repair 修复 → 重评 → final-video-qc → render-package）
  ↓
角色卡 + 场景卡 + 分镜图 + Prompt → 输出
```

**触发条件**：用户输入 ≤ 100 字且无特殊指令 → 默认走最快路径。

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
  ├─ 含 "Obsidian" 或 "读取" → obsidian-ingest
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
  ├─ 含 "多版本"/"A/B" → 多版本对比模式（同批次产出，state/ 按版本标注）
  │
  ├─ 含 "角色卡"/"出角色卡" → /character 子链
  ├─ 含 "场景图"/"出场景图" → /scene 子链
  ├─ 含 "分镜图"/"故事板" → /storyboard 子链
  ├─ 含 "prompt"（单独指令）→ 仅输出 prompt
  │
  ├─ 短句 ≤SHORT_INPUT_THRESHOLD_CHARS（api-config.template.env）→ project-manager（auto-init）→ 一键生成最快路径
  │
  ├─ 段落 100-2000字 → project-manager（auto-init）→ 单段故事路径
  │
  └─ 超长 >2000字 → 问用户：压缩成一段还是拆段？
      ├─ 拆段 → shot-budget 判断拆几段
      └─ 压缩 → shot-budget
```

---

## 确认策略

| 意图 | 确认级别 |
|------|---------|
| 角色卡/分镜图（单独） | **零确认**，直接出结果 |
| 场景图（单独） | **零确认**使用推荐方法，展示可选版式（九宫格/4宫格/720°全景/全能参考），用户可说"换九宫格"覆盖 |
| 一键生成（≤SHORT_INPUT_THRESHOLD_CHARS字） | **零确认**，直接出结果 |
| 一键生成（>SHORT_INPUT_THRESHOLD_CHARS字或有歧义） | 最多 1 次确认（风格+时长） |
| 单段故事 | 最多 1 次确认（风格+时长+格式） |
| Obsidian 单章 | 1 次确认（章节+时长+镜数） |
| Obsidian 批量 | 1 次确认（章节范围+每章参数） |
| 续写 | 无确认（自动继承上段状态） |
| 精准修改 | 无确认（直接修改指定镜） |
| 实体变更（改角色/场景属性） | 无确认（incremental-update 自动计算影响范围） |
| 换风格 / 风格迁移 | 无确认（自动解锁→重决策→锁定，或直接迁移） |
| 多版本 | 1 次确认（选哪几个风格对比） |

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

中自动化（问1次）：
  - 风格+时长+格式（合并为1个问题）
  - 或：确认一键生成的默认值

低自动化（必须用户决策）：
  - 拆段 vs 压缩（长篇）
  - 批量范围（Obsidian 多章）
  - 平台选择（如果没指定）
```

---

## 输出

路由引擎不输出内容——它只负责识别意图并调用正确的第一个引擎。

路由完成后，控制权交给目标引擎。
