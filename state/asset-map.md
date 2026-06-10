# 资产映射表（@图编号 → 资产描述）

由 `reference-anchor` 根据 `asset-plan` 的资产列表 + 平台策略**动态生成**。替代 video-prompt-assembly 中硬编码的 @图映射。

---

## 当前映射

| @编号 | type | name | source | locks |
|-------|------|------|--------|-------|
| @图0 | scene_reference | （场景名）场景图 | /scene | 空间布局 / 主光方向 / 地面材质 |
| @图1 | character_sheet | （角色名）角色卡 | /character | 面部 / 服装 / 武器 |
| @图2 | storyboard_board | 横幅分镜图 | /storyboard | 镜头顺序 / 构图 / 运镜 |
| @图3 | keyframe | SH(N) 关键帧 | /shot/SH(N) | 高潮动作 |
| @图4 | end_frame | 尾帧锚点 | /shot/last | 结尾状态 |

> 上表为 Seedance 标准 5 张包的示例映射。实际映射按平台策略动态调整。

---

## 字段说明

| 字段 | 说明 |
|------|------|
| @编号 | @图0, @图1, @图2... 按生成优先级排列 |
| type | 资产类型：scene_reference / character_sheet / storyboard_board / keyframe / end_frame / prop_card / multi_char_relation / creature_card |
| name | 人类可读的资产名称 |
| source | 资产来源路径：/scene, /character, /storyboard, /shot/SH(N), /shot/last |
| locks | 此资产锁定的维度（视频生成时不可变的内容） |

---

## 平台策略 → @图映射

### Seedance（参考图优先型，≤12张）

| @编号 | type | 说明 |
|-------|------|------|
| @图0 | scene_reference | 场景全景 |
| @图1 | character_sheet | 主角角色卡 |
| @图2 | storyboard_board | 分镜图 |
| @图3 | keyframe | 高潮动作关键帧 |
| @图4 | end_frame | 尾帧 |
| @图5 | keyframe | 第二关键帧（可选） |

### Runway Gen-3（Prompt优先型，3张）

| @编号 | type | 说明 |
|-------|------|------|
| @图0 | end_frame | 首帧 |
| @图1 | keyframe | 关键帧 |
| @图2 | end_frame | 尾帧 |

> Runway 不传角色卡，角色一致性靠英文 prompt DNA 描述，参考图只给最重要的。

### 可灵（首帧优先型，3张）

| @编号 | type | 说明 |
|-------|------|------|
| @图0 | end_frame | 首帧(first_frame) |
| @图1 | character_sheet | 角色卡 |
| @图2 | keyframe | 关键帧 |

### Luma / Pika（轻量型，2张）

| @编号 | type | 说明 |
|-------|------|------|
| @图0 | end_frame | 首帧 |
| @图1 | end_frame | 尾帧 |

> Luma/Pika 不传角色卡，角色一致性靠英文 prompt DNA 描述。

---

## 在视频 Prompt 中的使用

视频 prompt 应**按用途引用**，而非按编号：

```
约束：
  @图(scene_reference) 锁死空间布局/主光方向/地面材质
  @图(character_sheet) 锁死面部/服装/武器
  @图(storyboard_board) 控制镜头顺序/构图/运镜
  @图(keyframe) 锁定高潮动作
  @图(end_frame) 锁定结尾状态
```

具体 @编号由 `state/asset-map.md` 动态提供，video-prompt-assembly 读取映射后生成最终引用。

---

## 资产优先级（参考图裁切时）

当参考图数量超过平台限制时，按以下优先级保留：

```
1. character_sheet（角色卡） — 最高优先级，人不能变
2. end_frame（首帧锚点） — 视频起点
3. scene_reference（场景图） — 空间锚点
4. keyframe（关键帧） — 动作锚点
5. storyboard_board（分镜图） — 可降级为纯文本描述
6. prop_card / creature_card（道具/生物卡） — 可省略
```

---

## 联动

- **写入**：`reference-anchor`（平台校验后，按策略生成映射表）
- **标记更新**：`incremental-update`（变更传播时标记受影响 @图 为「待重新生成」）、`asset-plan`（资产变更时标记对应 @图）
- **读取**：`video-prompt-assembly`（组装时读取 @编号→用途对应关系）、`project-graph`（构建 asset↔entity 映射）、`consistency-engine`（Video RM 验证 @图 引用完整性）
- **校验**：`final-video-qc`（检查视频 prompt 中的 @引用是否与 asset-map 一致、数量是否匹配）
- **基础数据来源**：`asset-plan`（决定需要哪些资产类型） → `reference-anchor`（按平台映射为 @编号）
