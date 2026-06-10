# Incremental Update — 增量更新引擎

不重新生成全部，只更新变更影响的资产。从"生成器"升级为"项目编辑器"。

---

## 一、触发条件

| 触发方式 | 示例 | 入口 |
|---------|------|------|
| 用户直接指令 | "主角换长发"、"剑冢加一座石碑"、"第3镜暗一点" | task-router 路由到本引擎 |
| single-shot-edit 传播 | 单镜修改涉及角色外观/场景元素，需跨镜传播 | single-shot-edit 调用 |
| asset-plan 传播 | immutable_features 或 fixed_elements 变更 | asset-plan 调用 |
| auto-repair 修复后 | 修复完成后需限定重评范围 | auto-repair 调用 |
| style-migration 完成后 | 风格迁移后需更新 shot-state 色彩/灯光 | style-migration 调用 |

---

## 二、变更分类与影响映射

### 2.1 变更分类表

| 变更类别 | 用户说法示例 | 实体类型 | entity_id 来源 | 影响的 state 字段 |
|---------|------------|---------|---------------|-----------------|
| 角色外观 | "墨渊换长发"、"碧瑶穿红衣" | `character` | `variable-registry.characters.*.name` | `shot-state.action`、`asset-map` 角色卡 |
| 角色五官 | "改瞳色为金色"、"加一道疤痕" | `character` | 同上 | `shot-state.action`、`asset-map` 角色卡 |
| 角色新增 | "加一个配角" | `character` | `variable-registry.characters.supporting[new]` | `shot-state.characters`（仅相关镜）、`asset-map` 新角色卡 |
| 场景元素 | "剑冢加石碑"、"窗外加一棵树" | `scene` | `variable-registry.scene.primary.scene_id` | `shot-state.action`、`asset-map` 场景图 |
| 场景天气 | "雨改雪"、"白天变黄昏" | `scene` | 同上 | `shot-state.color/lighting/action` |
| 场景切换 | "第3镜换到室内" | `shot` → `scene` | `shot-state.scene_id`（单镜） | `shot-state.scene_id/lighting/color` |
| 风格变更 | "换成王家卫风格" | `style` | `variable-registry.style.visual_style` | 全镜 `shot-state.color/lighting` + `asset-map` 场景图/分镜图 |
| 风格微调 | "配色暖一点" | `style` | 同上 | 全镜 `shot-state.color` |
| 单镜内容 | "第3镜暗一点"、"第5镜改特写" | `shot` | `shot-state.shot_id` | 仅该镜对应字段 |
| 台词修改 | "第7镜台词改一下" | `dialogue` | `dialogue-map.dialogue_id` | `dialogue-map.text/delivery` |

### 2.2 影响维度映射

| 变更类别 | 一致性重评维度 | 原因 |
|---------|-------------|------|
| 角色外观/五官 | **Character RM** | DNA 跨镜一致 / 不可变特征 |
| 角色新增 | **Character RM** + Scene RM（如有新位置关系） | 新角色身份 + 多角色空间关系 |
| 场景元素 | **Scene RM** | 空间关系 / fixed_elements |
| 场景天气 | **Scene RM** + Story RM（end_state 中的 visual_tone） | 光源/色调 + 天气过渡 |
| 场景切换（单镜） | **Scene RM** + Story RM（3 镜窗口 end_state 继承） | 空间跳跃 + 连续性 |
| 风格变更 | **Style RM** + Scene RM | 配色/氛围/灯光 |
| 风格微调 | **Style RM** | 仅配色方案 |
| 单镜内容 | **Story RM**（3 镜窗口）+ 相关 RM | end_state 继承 + 变更字段对应维度 |
| 台词修改 | 无（如仅改文本）或 Story RM（如改镜号） | 台词本身不触发一致性检查 |

---

## 三、引擎流程

### 完整流程图

```
接收变更指令
  ↓
1. 解析变更
  ├─ 识别实体类型（character/scene/style/shot/dialogue）
  ├─ 识别 entity_id（查 variable-registry / shot-state / dialogue-map 确认存在）
  └─ 识别变更字段（action/color/lighting/dna/...）
  ↓
2. 查询依赖图
  ├─ 读取 state/project-graph.md
  ├─ affected_shots(entity_type, entity_id) → 受影响镜头列表
  ├─ affected_assets(entity_type, entity_id) → 受影响资产列表
  └─ full_impact(entity_type, entity_id) → 完整影响范围
  ↓
3. 分类更新
  ├─ 仅 action 描述变更 → 更新 shot-state.action（受影响镜头）
  ├─ color/lighting 变更 → 更新 shot-state.color/lighting（受影响镜头）
  ├─ DNA 字段变更 → 更新 variable-registry.characters.*.dna_full + immutable_features
  ├─ fixed_elements 变更 → 更新 variable-registry.scene.primary.fixed_elements
  ├─ asset 需重新生成 → 标记 asset-map 对应 @图 为「待重新生成」
  └─ dialogue 变更 → 更新 dialogue-map 对应条目
  ↓
4. 限定一致性重评
  ├─ 设置 evaluation_mode = "incremental"
  ├─ 传递 affected_dimensions 列表
  └─ 调用 consistency-engine（只评受影响维度）
  ↓
5. 输出增量更新报告
```

---

## 四、更新策略细节

### 4.1 角色外观变更

```
变更："墨渊换长发"
  ↓
1. 解析：entity_type=character, entity_id=C1, 变更字段=hair
2. 查询 project-graph：
   affected_shots("character", "C1") → [SH01, SH03, SH05, SH07]
   affected_assets("character", "C1") → [@图1]
3. 更新：
   ├─ variable-registry.characters.protagonist.dna_full.发型发色 → "长发及腰，墨黑色"
   ├─ variable-registry.characters.protagonist.immutable_features → 发型更新
   ├─ shot-state: SH01/SH03/SH05/SH07 action 字段追加 "long flowing black hair"
   └─ asset-map: @图1 标记「⚠ 待重新生成（角色DNA变更：发型）」
4. 一致性重评：仅 Character RM
5. 不动 SH02/SH04/SH06（不含角色 C1）
```

### 4.2 场景元素变更

```
变更："剑冢加一座石碑"
  ↓
1. 解析：entity_type=scene, entity_id=S1, 变更字段=fixed_elements
2. 查询 project-graph：
   affected_shots("scene", "S1") → [SH01, SH02, SH04, SH06]
   affected_assets("scene", "S1") → [@图0]
3. 更新：
   ├─ variable-registry.scene.primary.fixed_elements → 追加 "石碑（中央偏右，高3米）"
   ├─ shot-state: 所有 S1 镜头 action 字段追加石碑描述
   └─ asset-map: @图0 标记「⚠ 待重新生成（场景元素变更：+石碑）」
4. 一致性重评：Scene RM
```

### 4.3 风格迁移（大规模变更）

```
变更："换成王家卫风格"
  ↓
1. 解析：entity_type=style, entity_id=VS7→新VS, 变更字段=全部
2. 查询 project-graph：
   affected_shots("style", "VS7") → 全部镜头
   affected_assets("style", "VS7") → [@图0, @图2]
3. 更新：
   ├─ variable-registry.style.* → 全部更新为新风格参数
   ├─ 全镜 shot-state.color/lighting → 更新为新风格配色/灯光
   ├─ variable-registry.style_memory.* → 更新记忆
   └─ asset-map: @图0/@图2 标记「⚠ 待重新生成（风格变更）」
4. 一致性重评：Style RM + Scene RM
5. 注意：全镜更新是预期行为（风格变更是全局操作）
```

### 4.4 单镜内容变更（最小影响）

```
变更："第3镜再暗一点"
  ↓
1. 解析：entity_type=shot, entity_id=SH03, 变更字段=lighting
2. 查询 project-graph：
   shot_dependencies("SH03") → 确认 SH03 上下文
   3 镜窗口：[SH02, SH03, SH04]
3. 更新：
   └─ shot-state SH03.lighting → 追加 "darker, deeper shadows, lower exposure"
4. 一致性重评：Story RM（3 镜窗口 end_state 继承检查）
5. 不动其他镜
```

---

## 五、输出格式

### 增量更新报告

```markdown
【增量更新报告】

变更指令：[用户原始输入]
变更类型：[类别] / 实体：[类型]:[ID]
受影响范围：
  镜头：[N] 镜（[shot_ids]）
  资产：[M] 个（[@编号列表]）
  台词：[D] 条（[dialogue_ids]）

📝 已更新 state/：
  ✅ variable-registry：[变更字段] — [旧值] → [新值]
  ✅ shot-state：[N] 镜的 [字段] 已更新
  ⚠ asset-map：[M] 个资产标记为「待重新生成」

🔄 一致性重评（增量模式）：
  评估维度：[Character RM / Scene RM / Style RM / Story RM]（仅 [N] 个维度）
  跳过维度：[跳过的维度] — 不受本次变更影响，保持上次评分

⏱ 跳过镜头：[N] 镜完全不动（[shot_ids]）
💡 建议：如涉及 asset-map 资产重生成，建议运行对应的 sub-skill（/character /scene）
```

---

## 六、与全量生成的关系

```
首次生成（全量）：
  story-intake → ... → video-prompt-assembly → consistency-engine（全量 5 维度） → ...

后续修改（增量）：
  用户指令 → incremental-update → project-graph 查询 → 局部更新 state/ → consistency-engine（增量模式） → ...

重大变更回退全量（增量无法处理时）：
  - 新增/删除镜头（改变了镜头总数和编号）
  - 新增/删除场景（新增了 scene_id）
  - 更换叙事结构（改变了情绪曲线）
  - 项目恢复后 state/ 不完整
  → 自动回退到全量重新生成
```

---

## 七、安全边界

### 当增量更新不安全时，自动回退全量

| 情况 | 检测方式 | 处理 |
|------|---------|------|
| 镜头数量变化 | `shot-state` 镜头数 ≠ project-graph 镜头数 | 回退全量（图已过时） |
| 项目图缺失 | `state/project-graph.md` 不存在或为空 | 先重建图，再增量更新 |
| 项目图为空（0 镜） | 图中所有正向索引的 shot_ids 均为空 | 回退全量——项目尚未生成镜头，无增量更新目标 |
| 新增实体无图索引 | entity_id 不在 project-graph 中 | 先重建图，再增量更新 |
| 交叉实体变更 | 同时涉及角色+场景+风格 | 若受影响镜头 > 总数 50%，建议全量 |
| 结构变更 | 用户要求增删镜头/改情绪曲线 | 直接回退全量 |

### 增量更新上限

- 单次增量更新涉及镜头数 ≤ 总镜头数 50% → 增量
- 单次增量更新涉及镜头数 > 总镜头数 50% → 提示用户"建议全量重新生成"（用户可强制增量）

---

## 联动

← 接收用户变更指令（"改[实体]的[属性]"）
← 接收 `engines/single-shot-edit.md` 的传播请求（DNA 变更 / 天气变更）
← 接收 `engines/asset-plan.md` 的变更传播请求（immutable_features / fixed_elements 变更）
← 接收 `engines/auto-repair.md` 的修复后重评请求
← 接收 `engines/style-migration.md` 的迁移后更新请求
← 读取 `state/project-graph.md`（依赖图——影响范围查询）
← 读取 `state/variable-registry.md`（实体确认 + 字段值）
← 读取 `state/shot-state.md`（当前镜头状态）
← 读取 `state/asset-map.md`（当前资产映射）
← 读取 `state/dialogue-map.md`（台词关联）
→ 更新 `state/shot-state.md`（受影响镜头的对应字段）
→ 更新 `state/variable-registry.md`（实体字段变更）
→ 更新 `state/asset-map.md`（标记待重新生成的资产）
→ 更新 `state/dialogue-map.md`（台词变更）
→ 调用 `engines/consistency-engine.md`（增量模式：仅评估 affected_dimensions）
→ 调用 `engines/project-graph.md`（如果 state 变更影响了依赖关系，增量重建图）
→ 输出「增量更新报告」
→ 不满足增量条件时回退到全量主链
