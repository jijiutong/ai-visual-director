# 镜头状态表

每镜完整状态记录。**故事板变了，就更新这里；视频 prompt 引用也从这里拿。**

---

## 镜头列表

每个镜头的完整状态块：

```yaml
shots:
  - shot_id: SH01
    time: 0-2s
    phase: 建立
    image_prompt_id: IMG_SH01          # 关联的分镜图 prompt ID
    frame_ref: "@图N"                  # 对应 asset-map 中的 @编号（本镜参考图）
    scene_id: S1                       # 引用 variable-registry 中的场景ID
    characters: [C1]                   # 引用 variable-registry 中的角色ID
    shot_size: ELS                     # ELS/FS/LS/MS/MCU/CU/ECU
    camera: fixed slow push            # 运镜方式
    focal_length: 24mm                 # 焦段
    action: 主角背对镜头站在悬崖        # 画面内容核心描述（≤15字）
    lighting: 闪电侧光                  # 灯光方案
    color: 暗蓝灰#2a3a4a               # 色彩标注
    transition: match cut              # 转场方式
    end_state:
      character_position: 悬崖中央
      action_ending: 握剑蓄力完毕           # 动作末态
      gaze_direction: 面朝前方乌云            # 视线方向
      light_direction: 顶光从裂缝射入         # 光线方向
      visual_tone: 冷暖对峙、暗部深压         # 画面调性
      prop_state: 剑未出鞘
      emotion: 压抑
      spatial_relation: A在中央，B在右侧3米   # 空间关系（多角色时）
```

---

## 状态字段说明

| 字段 | 说明 | 写入方 |
|------|------|--------|
| `shot_id` | 镜头唯一编号 SH01-SH(N) | `video-director` |
| `time` | 起止时间 | `video-director` |
| `phase` | 阶段名（建立/蓄力/爆发/余韵...） | `video-director` |
| `image_prompt_id` | 关联的分镜图 ID | `asset-plan` |
| `frame_ref` | 本镜对应 asset-map 中的 @编号 | `reference-anchor` |
| `scene_id` | 场景 ID | `video-director` |
| `characters` | 出镜角色 ID 列表 | `video-director` |
| `shot_size` | 景别 | `video-director` |
| `camera` | 运镜方式 | `video-director` |
| `focal_length` | 焦段 mm | `video-director` |
| `action` | ≤15字画面核心描述 | `video-director` |
| `lighting` | 灯光方案 | `video-director` |
| `color` | 色彩标注 | `video-director` |
| `transition` | 转场方式 | `video-director` |
| `end_state.character_position` | 角色末态位置 | `video-director` |
| `end_state.action_ending` | 动作末态 | `video-director` |
| `end_state.gaze_direction` | 视线方向 | `video-director` |
| `end_state.light_direction` | 光线方向 | `video-director` |
| `end_state.visual_tone` | 画面调性 | `video-director` |
| `end_state.prop_state` | 道具末态 | `video-director` |
| `end_state.emotion` | 情绪末态 | `video-director` |
| `end_state.spatial_relation` | 角色空间关系 | `video-director` |
| `motion.subject` | 主体运动 | `motion-physics`（补充） |
| `motion.camera` | 相机运动 | `motion-physics`（补充） |
| `motion.environment` | 环境运动 | `motion-physics`（补充） |
| `motion.compatible` | 运动兼容性 ✅/⚠ | `motion-physics`（补充） |

---

## 高潮镜

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `climax_shot` | SH(N) | `video-director`（按总数 55%-70% 位置定位） |

---

## 继承规则（跨镜连续性）

```
镜N end_state = 镜N+1 起始状态

除非：
  - 明确的场景切换（shot_id 对应不同 scene_id）
  - 明确的时间跳跃
  - 明确的转场（硬切到全新画面）
```

断裂检测由 `prompt-scorer` 调用 `rules/continuity-check.md` 执行。

> **与 continuity-state 的关系**：此文件的 `end_state` 8 字段与 `state/continuity-state.md` 的 8 字段状态定义完全对齐。continuity-state 定义了检查标准和修复规则，本文件是每镜的实例数据。

---

## 联动

- **写入**：`video-director` 初始化（镜号/阶段/景别/灯光/色彩/转场/end_state/高潮镜定位）
- **补充**：`motion-physics` 追加运动数据（每镜运动配对+兼容性检查）
- **读取**：`video-prompt-assembly`（组装时遍历所有镜头）、`final-video-qc`（检查引用一致性）
- **跨段**：段1最后一镜的 end_state → `continuity-snapshot.md` → 段2第一镜继承
