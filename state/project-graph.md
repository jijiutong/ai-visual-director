# 项目依赖图

由 `engines/project-graph.md` 从 state/ 数据构建的派生索引。每次 shot-state 或 asset-map 变更后重建。

---

## 正向索引（实体 → 下游产物）

查询"改了 X 会影响哪些 Y"时使用。

### 角色 → 镜头

| character_id | character_name | shot_ids |
|-------------|---------------|----------|
| — | — | — |

### 角色 → 台词

| character_name | dialogue_ids |
|---------------|-------------|
| — | — |

### 角色 → 资产

| character_id | asset_refs（@编号） |
|-------------|-------------------|
| — | — |

### 场景 → 镜头

| scene_id | scene_name | shot_ids |
|---------|-----------|----------|
| — | — | — |

### 场景 → 资产

| scene_id | asset_refs（@编号） |
|---------|-------------------|
| — | — |

### 风格 → 镜头

| style_id | style_name | shot_ids（风格变更影响所有镜头的 color/lighting 字段） |
|---------|-----------|--------------------------------------------------|
| — | — | — |

---

## 反向索引（产物 → 上游依赖）

查询"这个产物依赖哪些实体"时使用。

### 镜头 → 依赖

每个镜头的完整上游依赖：

```yaml
shot: SH(N)
  characters: []        # 出镜角色 ID 列表
  scene: ""             # 所属场景 ID
  style: ""             # 应用的风格 ID
  assets: []            # 引用的 @图 编号列表
  dialogues: []         # 本镜台词 ID 列表
```

### 资产 → 锁定实体

每个 @图 锁定的角色/场景/道具：

| @编号 | type | locks_entity_type | locks_entity_id | used_by_shots |
|-------|------|------------------|----------------|---------------|
| — | — | — | — | — |

---

## 依赖关系类型定义

| 关系 | 源 | 目标 | 数据来源 | 变更传播规则 |
|------|-----|------|---------|------------|
| `CHARACTER_IN_SHOT` | character_id | shot_id | `shot-state.characters[]` | 角色 DNA 变更 → 更新所有关联镜头的 action 描述 |
| `SCENE_CONTAINS_SHOT` | scene_id | shot_id | `shot-state.scene_id` | 场景 fixed_elements 变更 → 更新所有关联镜头的 action/lighting |
| `CHARACTER_SPEAKS` | character_name | dialogue_id | `dialogue-map.speaker` | 角色名变更 → 更新 dialogue-map speaker 字段 |
| `ASSET_LOCKS_ENTITY` | @编号 | entity_id | `asset-map.type + source` | 资产重生成 → 更新 @图 引用该资产的所有镜头 |
| `STYLE_AFFECTS_SHOT` | style_id | shot_id | `variable-registry.style.*` | 风格变更 → 更新所有镜头的 color/lighting 字段 |

---

## 变更影响计算规则

当实体 X 变更时，按以下规则计算影响范围：

```
1. 角色变更（character:C(N)）：
  受影响镜头 = 正向索引 character→shots[C(N)]
  受影响资产 = 正向索引 character→assets[C(N)]
  受影响台词 = 正向索引 character→dialogues[character_name]
  一致性重评维度 = Character RM（+ Scene RM 如果变更涉及空间位置）

2. 场景变更（scene:S(N)）：
  受影响镜头 = 正向索引 scene→shots[S(N)]
  受影响资产 = 正向索引 scene→assets[S(N)]
  一致性重评维度 = Scene RM（+ Character RM 如果变更影响角色位置关系）

3. 风格变更（style:VS(N)）：
  受影响镜头 = 全部镜头
  受影响资产 = @图(scene_reference) + @图(storyboard_board)（场景图/分镜图配色受影响）
  一致性重评维度 = Style RM + Scene RM（色彩/灯光）

4. 单镜变更（shot:SH(N)）：
  受影响镜头 = [SH(N-1), SH(N), SH(N+1)]（3 镜窗口）
  一致性重评维度 = Story RM（end_state 继承）+ 相关 RM

5. 资产变更（asset:@图(N)）：
  受影响镜头 = 反向索引 资产→used_by_shots[@图(N)]
  一致性重评维度 = Video RM（@图引用完整性）
```

---

## 联动

- **写入**：`engines/project-graph.md`（每次主链运行到 graph 阶段时重建）
- **读取**：`engines/incremental-update.md`（查询影响范围）、`engines/consistency-engine.md`（限定评估维度）、`engines/single-shot-edit.md`（DNA 传播）、`engines/asset-plan.md`（资产变更传播）
- **重建触发**：`shot-state.md` 变更 / `asset-map.md` 变更 / `dialogue-map.md` 变更 / `variable-registry.md` 角色或场景字段变更
- **持久化**：随项目保存到 `projects/<PROJ-ID>/state/project-graph.md`
