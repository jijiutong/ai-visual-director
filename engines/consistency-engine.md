# Consistency Engine — 一致性评估引擎

5 维度统一评估。位于 video-prompt-assembly 之后、prompt-scorer 之前。读取 state/ 和视频 prompt，输出一致性评分报告。

---

## 一、评估模型

```
                    ┌──────────────────┐
                    │ Consistency Engine│
                    └────────┬─────────┘
                             │
        ┌────────┬──────────┼──────────┬────────┐
        ▼        ▼          ▼          ▼        ▼
   Character   Scene      Style      Story    Video
      RM         RM         RM         RM       RM
   (角色RM)   (场景RM)   (风格RM)   (剧情RM)  (视频RM)
```

每个 RM 独立打分（0-100），加权汇总。低于阈值的问题标记为阻断项。

---

## 二、Character RM — 角色一致性评估

### 数据来源
- `state/variable-registry.md` → characters.*（protagonist/antagonist/supporting）
- `state/shot-state.md` → 每镜 characters 字段
- 视频 prompt 文本

### 检查项（每项 0-20 分，共 5 项 = 100 分）

| # | 检查项 | 满分 | 扣分规则 |
|---|--------|------|---------|
| C1 | **DNA 跨镜一致** | 20 | 每发现一处角色 DNA 字段变化（服装/发型/五官/体型）无说明 → -10 |
| C2 | **不可变特征锁定** | 20 | immutable_features 中的特征在任镜出现偏差 → -15/处 |
| C3 | **多角色位置关系** | 20 | 两个角色在连续镜中空间关系出现无说明跳跃 → -15/次 |
| C4 | **身份一致性** | 20 | 角色身份/关系与 variable-registry 声明不一致 → -20 |
| C5 | **表情/情绪连续** | 20 | 情绪跳跃不符合 emotion_curve 阶段 → -10/次 |

### 参考规则
- `rules/character-consistency.md` — 8 种一致性锁定方法
- `knowledge/character-dna.md` — DNA 20 字段标准
- `knowledge/micro-expressions.md` — 表情变化合理范围

### 评分输出

```
【Character RM】72/100 ⚠
  ✅ C1 DNA 跨镜一致：20/20
  ⚠ C2 不可变特征：15/20 — 镜4 墨渊护腕颜色从暗金变银色
  ✅ C3 多角色关系：20/20
  ❌ C4 身份一致：7/20 — 镜3 顾长空被描述为"冷漠旁观"与"师父"身份矛盾
  ✅ C5 情绪连续：10/20 — 镜2→镜3 情绪从"平静"跳至"暴怒"，跳过对峙阶段
```

---

## 三、Scene RM — 场景一致性评估

### 数据来源
- `state/variable-registry.md` → scene.primary（name/scene_id/fixed_elements/time_of_day/weather）
- `state/shot-state.md` → 每镜 scene_id / lighting / color 字段
- 视频 prompt 文本

### 检查项（每项 0-25 分，共 4 项 = 100 分）

| # | 检查项 | 满分 | 扣分规则 |
|---|--------|------|---------|
| S1 | **空间关系一致** | 25 | 场景 fixed_elements 在任一镜中错误或缺失 → -15/处 |
| S2 | **光源方向一致** | 25 | 同一场景主光方向漂移无说明 → -15/次 |
| S3 | **色调/氛围一致** | 25 | 色彩漂移超出 color_narrative 阶段范围 → -10/次 |
| S4 | **天气/时间合理** | 25 | 天气突变无过渡、时间跳跃无标注 → -15/次 |

### 参考规则
- `rules/scene-consistency.md` — 7 种场景锁定方法
- `knowledge/lighting.md` — 灯光方案参考
- `knowledge/weather.md` — 天气变化逻辑

### 评分输出

```
【Scene RM】85/100 ✅
  ✅ S1 空间关系：25/25
  ✅ S2 光源方向：25/25
  ⚠ S3 色调氛围：15/25 — 镜5 冷灰蓝突转暖橙，无叙事动机
  ✅ S4 天气时间：20/25 — 镜4 雨→雪过渡已完成
```

---

## 四、Style RM — 风格一致性评估

### 数据来源
- `state/variable-registry.md` → style.*（visual_style/emotion_curve/color_narrative/pacing）
- `knowledge/visual-styles.md` → 风格定义（配色/氛围/灯光/禁止方向）
- 视频 prompt 文本

### 检查项（每项 0-25 分，共 4 项 = 100 分）

| # | 检查项 | 满分 | 扣分规则 |
|---|--------|------|---------|
| T1 | **配色方案遵守** | 25 | 使用了 visual_style 禁止的配色 → -15/处 |
| T2 | **氛围词一致** | 25 | 描述氛围与风格定义冲突 → -10/处 |
| T3 | **禁止方向无违规** | 25 | 触犯风格定义的"禁止"项 → -20/处 |
| T4 | **灯光方案匹配** | 25 | 灯光描述与风格定义不一致 → -15/处 |

### 参考规则
- `knowledge/visual-styles.md` — VS1-VS50+ 风格定义
- `rules/skill-patches.md` — R001-R010 已验证规则
- `rules/cultural-accuracy.md` — 文化精准度

### 评分输出

```
【Style RM】90/100 ✅
  ✅ T1 配色方案：25/25
  ✅ T2 氛围词：25/25
  ⚠ T3 禁止方向：20/25 — 古风场景出现"霓虹感"（R002 允许的调色词，非光源词，通过但标记）
  ✅ T4 灯光方案：20/25 — 东方玄幻使用了"逆光英雄光"，更偏向好莱坞大片
```

---

## 五、Story RM — 剧情连续性评估

### 数据来源
- `state/shot-state.md` → 每镜 phase / action / transition 字段 + end_state 8 字段
- `state/continuity-state.md` → 继承规则
- `state/variable-registry.md` → project.duration / style.emotion_curve

### 检查项（每项 0-20 分，共 5 项 = 100 分）

| # | 检查项 | 满分 | 扣分规则 |
|---|--------|------|---------|
| R1 | **end_state 继承** | 20 | 镜N end_state ≠ 镜N+1 起始状态且无过渡说明 → -15/处 |
| R2 | **情绪曲线对齐** | 20 | 镜头情绪阶段偏离 emotion_curve 定义 → -10/处 |
| R3 | **时长/镜数一致** | 20 | 各镜时长之和 ≠ project.duration → -20 |
| R4 | **高潮镜定位** | 20 | climax_shot 不位于曲线爆发阶段 → -10 |
| R5 | **转场合理性** | 20 | 转场方式与叙事节奏不匹配 → -10/处 |

### 参考规则
- `rules/continuity-check.md` — 5 维度检查
- `state/continuity-state.md` — 8 字段继承规则
- `knowledge/pacing-types.md` — P1-P5 节奏参数

### 评分输出

```
【Story RM】68/100 ⚠
  ✅ R1 end_state 继承：20/20
  ⚠ R2 情绪曲线：10/20 — 镜5 应为爆发阶段但 action 描述为"缓步走近"
  ✅ R3 时长镜数：20/20
  ✅ R4 高潮定位：18/20 — SH5 高潮镜接近爆发阶段末尾，可接受
  ❌ R5 转场合理：0/20 — 镜1→2→3 全部硬切无过渡声明，单镜无转场导致叙事跳跃
```

---

## 六、Video RM — 视频可执行性评估

### 数据来源
- `state/asset-map.md` → @图 映射
- `state/shot-state.md` → 每镜 shot_size / camera / focal_length
- `state/variable-registry.md` → project.target_platform / project.duration
- 视频 prompt 文本
- `rules/final-video-qc.md` → 8 项质检结果

### 检查项（每项 0-20 分，共 5 项 = 100 分）

| # | 检查项 | 满分 | 扣分规则 |
|---|--------|------|---------|
| V1 | **@图 引用完整性** | 20 | 视频 prompt 引用 @图 未在 asset-map 声明 → -20/处 |
| V2 | **平台参数合规** | 20 | 字数/参考图/时长超平台限制 → -20/项 |
| V3 | **运镜可执行性** | 20 | 狭小空间使用禁止运镜（R005）→ -20/处 |
| V4 | **动作物理合理** | 20 | 运动预算超限或方向冲突（motion-physics 检查）→ -15/处 |
| V5 | **Contract Check** | 20 | 读取 `state/prompt-contract.md` 验证：reads 变量已赋值、写入方已执行、asset-map 已注册 → 每项不通过 -10 |

### 参考规则
- `state/asset-map.md` — @编号→资产映射
- `rules/final-video-qc.md` — 8 项质检（含引用一致性）
- `rules/skill-patches.md` — R005 空间运镜限制
- `engines/motion-physics.md` — 运动兼容性检查

### 评分输出

```
【Video RM】95/100 ✅
  ✅ V1 @图引用：25/25
  ✅ V2 平台参数：25/25
  ✅ V3 运镜：25/25
  ✅ V4 动作物理：20/25 — 镜4 同时有"慢推+手持抖动"，物理矛盾
```

---

## 七、综合评分与操作

### 加权汇总

```
总分 = Character×0.25 + Scene×0.20 + Style×0.15 + Story×0.25 + Video×0.15
```

### 总报告格式

```markdown
【Consistency Engine 评估报告】

Character RM：72/100 ⚠
Scene RM：    85/100 ✅
Style RM：    90/100 ✅
Story RM：    68/100 ⚠
Video RM：    95/100 ✅

━━━━━━━━━━━━━━━━━━━━━
综合评分：80.05/100 — B 级

🔴 阻断项（< 60 的单项）：
  Story RM：68 — R5 转场合理性 0/20，前三镜全部硬切无过渡声明

🟡 关注项（60-79 的单项）：
  Character RM：72 — C4 身份矛盾
  Story RM：68 — R2 情绪曲线偏离

✅ 通过项：
  Scene RM / Style RM / Video RM

💡 知识库建议：
  → knowledge/transitions.md — 查转场技法（J-Cut/L-Cut/图形匹配剪）
  → knowledge/pacing-types.md — 查 P1 快切节奏的转场设计
  → knowledge/directing-performance.md — 查师徒对峙场景的表演指导

修复优先级：
  1. 补全镜1→2→3 转场声明（转场对叙事连续性阻断最高）
  2. 修正镜3 顾长空身份描述矛盾
  3. 调整镜5 action 描述匹配爆发阶段情绪
```

---

## 八、与下游联动

```
video-prompt-assembly（产出完整 prompt）
  ↓
Consistency Engine（5 维度评估）
  ↓ 输出评估报告
  ├─ 总分 ≥ 85 + 无阻断项 → prompt-scorer（放行路径）
  ├─ 总分 70-84 或 有阻断项但非致命 → prompt-scorer（标记问题，放行）
  ├─ 总分 < 70 或 任一项 < 50 → auto-repair（先修复再评分）
  └─ 任一项 < 30 → 强制阻断，重新生成该维度
```

### 增量评估模式（配合 Incremental Update）

当 `engines/incremental-update.md` 触发时，consistency-engine 进入**增量模式**：

```
incremental-update 计算影响范围
  ↓ 传递 affected_dimensions 列表
Consistency Engine（增量模式）
  ↓ 只评估受影响的 RM 维度
  ├─ 角色变更 → 只跑 Character RM
  ├─ 场景变更 → 只跑 Scene RM（+ Character RM 如有位置变更）
  ├─ 风格变更 → 只跑 Style RM + Scene RM
  └─ 单镜变更 → 只跑 Story RM（3 镜窗口）+ 相关 RM
  ↓ 未受影响的维度标记为「跳过（无变更）」
  ↓ 保持上次评分
```

增量模式开关由 `incremental-update` 传递的 `evaluation_mode: incremental` 参数控制。

---

## 联动

← 读取 `state/variable-registry.md`（全量项目/风格/角色/场景变量）
← 读取 `state/shot-state.md`（每镜状态 + end_state）
← 读取 `state/asset-map.md`（@图 映射验证）
← 读取 `state/continuity-state.md`（继承规则）
← 读取 `state/project-graph.md`（依赖关系，用于限定评估范围——增量更新时只评受影响维度）
← 读取视频 prompt 文本（video-prompt-assembly 输出）
← 引用 `rules/character-consistency.md` / `rules/scene-consistency.md` / `rules/continuity-check.md` / `rules/final-video-qc.md`
← 引用 `knowledge/` 对应文件（character-dna / lighting / weather / visual-styles / pacing-types / transitions / directing-performance / micro-expressions）
→ 输出一致性评估报告（5 维度评分 + 阻断项 + 知识库建议）
→ 传递评分给 `prompt-scorer`（作为一致性维度的输入）
→ 触发 `auto-repair`（低于阈值时）
→ 增量模式：通过 `state/project-graph.md` 查询影响范围，只评估受影响的 RM 维度（非全量 5 维度）
