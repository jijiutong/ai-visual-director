# Project Graph — 项目依赖图引擎

从 state/ 已有数据构建双向依赖索引。让系统知道"改了 X 会影响哪些 Y"。

---

## 一、主链位置

```
motion-physics（运动数据补充完成）
  ↓
Project Graph（构建依赖图）  ← NEW
  ↓ 输出 state/project-graph.md
video-prompt-assembly（读取图做 prompt 组装）
  ↓
consistency-engine（读取图做影响范围限定）
```

> **构建时机**：shot-state、asset-map、dialogue-map 均已就绪后（motion-physics 之后）。图是派生数据，不替代源数据。

---

## 二、图构建流程

### 数据读取

```
state/variable-registry.md → 实体 ID 列表
  ├─ characters.protagonist / antagonist / supporting
  ├─ scene.primary.scene_id
  └─ style.visual_style

state/shot-state.md → shot↔character, shot↔scene 映射
  └─ shots[].{shot_id, scene_id, characters[]}

state/dialogue-map.md → dialogue↔shot, dialogue↔character 映射
  └─ dialogues[].{dialogue_id, shot_id, speaker}

state/asset-map.md → asset↔entity 映射
  └─ @编号.{type, name, source, locks}
```

### 构建步骤

```
1. 扫描 shot-state.shots[]：
   ├─ 对每个 shot，提取 scene_id → 构建 scene→shots 正向索引
   ├─ 对每个 shot，提取 characters[] → 构建 character→shots 正向索引
   └─ 对每个 shot，构建 shot→dependencies 反向索引块

2. 扫描 dialogue-map.dialogues[]：
   ├─ 对每个 dialogue，提取 speaker → 构建 character→dialogues 正向索引
   └─ 对每个 dialogue，提取 shot_id → 关联到对应镜头的反向索引

3. 扫描 asset-map @编号表：
   ├─ 对每个 @图，按 type 判断锁定实体类型：
   │   ├─ character_sheet → 角色实体
   │   ├─ scene_reference → 场景实体
   │   └─ storyboard_board / keyframe / end_frame → 镜头实体
   ├─ 构建 asset→entity 映射
   └─ 构建 asset→used_by_shots 映射（通过 entity 关联）

4. 扫描 variable-registry：
   ├─ 获取 style.visual_style → 构建 style→shots（全镜头）正向索引
   └─ 补充实体元信息（character_name、scene_name、style_name）

5. 汇总写入 state/project-graph.md：
   ├─ 正向索引表（4 张表）
   ├─ 反向索引块（每镜一个）
   ├─ 资产→实体映射表
   └─ 变更影响计算规则（引用）
```

---

## 三、查询接口

以下查询原语供下游引擎在运行时引用。以 markdown 引用格式给出：

### affected_shots(entity_type, entity_id)

**用途**：查询实体变更时影响哪些镜头。

| entity_type | 查询方式 | 返回 |
|------------|---------|------|
| `character` | 查正向索引「角色→镜头」表 | shot_ids 列表 |
| `scene` | 查正向索引「场景→镜头」表 | shot_ids 列表 |
| `style` | 全镜头（style 影响所有镜头的 color/lighting） | 全部 shot_ids |
| `asset` | 查反向索引「资产→锁定实体」表 → 递归查 entity→shots | shot_ids 列表 |

### affected_assets(entity_type, entity_id)

**用途**：查询实体变更时影响哪些 @图 资产。

| entity_type | 查询方式 | 返回 |
|------------|---------|------|
| `character` | 查正向索引「角色→资产」表 | @编号 列表 |
| `scene` | 查正向索引「场景→资产」表 | @编号 列表 |

### shot_dependencies(shot_id)

**用途**：查询某个镜头依赖的全部上游实体。

返回结构：
```
{
  characters: [C1, C2],
  scene: S1,
  style: VS7,
  assets: [@图0, @图1, @图3],
  dialogues: [D1]
}
```

### full_impact(entity_type, entity_id)

**用途**：查询实体变更的完整影响树（用于变更影响报告）。

返回结构：
```
{
  entity: {type, id, name},
  affected_shots: [{id, fields_affected}],
  affected_assets: [{@ref, type, needs_regeneration}],
  affected_dialogues: [{id, field_affected}],
  consistency_dimensions: [Character RM, Scene RM, ...]
}
```

---

## 四、输出格式

引擎运行后输出两份产物：

### 4.1 依赖图状态文件

写入 `state/project-graph.md`（模板见该文件），填充所有正向/反向索引表。

### 4.2 依赖图构建报告

每次构建后输出摘要，供用户和下游引擎参考：

```markdown
【Project Graph 构建报告】

实体统计：
  角色：N 个（C1: 墨渊, C2: 顾长空）
  场景：M 个（S1: 剑冢）
  镜头：K 镜（SH01-SH(K)）

依赖关系：
  CHARACTER_IN_SHOT：N→K 条
  SCENE_CONTAINS_SHOT：M→K 条
  CHARACTER_SPEAKS：N→D 条
  ASSET_LOCKS_ENTITY：A→E 条
  STYLE_AFFECTS_SHOT：1→K 条（风格 VS7 → 全部 K 镜）

关键依赖链：
  角色 C1（墨渊）→ 镜头 [SH01, SH03, SH05, SH07] → 资产 [@图1]
  场景 S1（剑冢）→ 镜头 [SH01, SH02, SH04, SH06] → 资产 [@图0]
  风格 VS7 → 全部 K 镜 color/lighting

⚠ 单点风险：
  如果 @图1（墨渊角色卡）重生成 → 影响 4 镜（SH01/03/05/07）
  如果场景 S1 固定元素变更 → 影响 6 镜（SH01/02/04/06/...）
```

---

## 五、增量重建

当单镜修改或资产变更后，不需要完整重建图。仅更新受影响的部分：

```
增量重建触发场景：
  1. single-shot-edit 修改了 SH(N) 的 characters 字段
     → 仅重建 character→shots 索引（该角色行）+ SH(N) 反向索引
  2. asset-plan 变更传播更新了镜头列表
     → 仅重建 scene→shots 索引（该场景行）
  3. 风格迁移完成后
     → 仅更新 style→shots 索引（style_id 变更）
  4. 新增/删除台词
     → 仅重建 character→dialogues 索引
```

> 完整重建仅发生在：主链首次运行、项目恢复后首次生成、用户显式要求"重建依赖图"。

---

## 六、在增量更新中的使用

`engines/incremental-update.md` 是本引擎的主要消费者：

```
用户说"墨渊换长发"
  ↓
incremental-update 识别：
  实体类型 = character
  实体ID = C1
  ↓
查询 project-graph：
  affected_shots("character", "C1") → [SH01, SH03, SH05, SH07]
  affected_assets("character", "C1") → [@图1]
  full_impact("character", "C1") → {一致性维度: [Character RM]}
  ↓
只更新 SH01/03/05/07 的 action 字段 + @图1 标记重新生成
其他 3 镜（SH02/04/06）完全不动
只重评 Character RM（跳过 Scene/Style/Story/Video RM）
```

---

## 七、依赖图一致性自检

图构建完成后，执行以下自检确保图与实际数据一致：

```
【Project Graph 自检】

1. 镜头覆盖：
   □ shot-state 中的每个 shot_id 都在图中存在？
   □ 图中的 shot_id 都在 shot-state 中存在？（无孤儿）

2. 角色覆盖：
   □ variable-registry 中的每个角色都在 character→shots 索引中存在？
   □ character→dialogues 索引中的 speaker 与 dialogue-map 一致？

3. 场景覆盖：
   □ 每镜的 scene_id 都对应 variable-registry 中存在的场景？
   □ 如有镜头 scene_id 为空或缺失 → ⚠ 标记该镜为「未归属场景」，从 scene→shots 索引排除

4. 资产覆盖：
   □ asset-map 中每个 @编号 都在图中存在？
   □ 每个资产 type 与 locks_entity_type 匹配？
     ├─ character_sheet → locks_entity_type = character
     ├─ scene_reference → locks_entity_type = scene
     └─ 其他 → locks_entity_type = shot

5. 风格引用：
   □ style.visual_style 非空 → style→shots 索引已填充？

自检不通过 → ⚠ 输出不一致项 → 建议重跑上游引擎
```

---

## 联动

← 读取 `state/variable-registry.md`（实体 ID 列表 + style.*）
← 读取 `state/shot-state.md`（shot↔character + shot↔scene 关系）
← 读取 `state/dialogue-map.md`（dialogue↔shot + dialogue↔character 关系）
← 读取 `state/asset-map.md`（asset↔entity 映射）
→ 写入 `state/project-graph.md`（正向索引 + 反向索引 + 影响计算规则）
→ 输出「依赖图构建报告」（供用户确认 + 下游引擎引用）
→ 被 `engines/incremental-update.md` 查询（影响范围计算）
→ 被 `engines/consistency-engine.md` 读取（限定评估维度范围）
→ 被 `engines/single-shot-edit.md` 查询（DNA 变更传播）
→ 被 `engines/asset-plan.md` 查询（资产变更传播）
