# 自动修复引擎

评分低于阈值后的自动补救策略链。修复策略不再硬编码，而是通过 `knowledge-retrieval` 从 `knowledge/` 动态检索最佳实践。

---

## 知识库驱动修复

每个策略对应一组知识检索查询：

| 问题 | 阈值 | 知识检索 | 修复策略 |
|------|------|---------|---------|
| 角色一致性 < 70 | 角色DNA不清晰 | `character-dna.md` + `costume-design.md` + `micro-expressions.md` | 补角色卡 + 面部多角度 + DNA字段强化 |
| 场景一致性 < 70 | 场景漂移风险高 | `environments.md` + `lighting.md` + `color-narratives.md` | 补场景全景锚点 + 光照方向声明 |
| 动作清晰度 < 60 | 动作描述模糊 | `camera.md` + `body-language.md` | 补首尾帧 + 动作关键帧 + 运动方向 |
| Prompt 得分 < 70 | 整体质量不足 | `visual-styles.md` + `pacing-types.md` + `emotion-curves.md` | 检查弱项→针对性修复 |
| 平台兼容 < 60 | 超长/格式错误 | —（直接执行压缩） | 压缩到平台限制（联动prompt-compression） |
| 连续性 < 60 | 时空断裂 | `transitions.md` + `continuity-state.md` + `editing-theory.md` | 补过渡帧 + 状态继承描述 |
| 一致性引擎阻断 | 某RM < 50 | `knowledge-retrieval.md` → 匹配具体 RM 维度 | 按 RM 维度专项修复 |

> 💡 修复前调用 `engines/knowledge-retrieval.md` 检索具体操作参数，替代硬编码的"补锚点/补过渡"，确保修复与风格定义和文化背景一致。

---

## 修复策略链

### 策略1：角色一致性低 → 补DNA

```
检测：角色跨镜五官/服装/体型描述变化
原因：DNA描述太弱
修复：
  1. 生成/强化角色卡（6模块）
  2. 在每镜prompt中追加「角色DNA锚点：[姓名]的[3个不可变特征]」
  3. 标记该角色为"高风险"→后续每镜追加强制一致性检查
```

### 策略2：场景漂移风险高 → 补空间锚点

```
检测：场景描述跨镜发生变化
原因：没有空间参考锚点
修复：
  1. 生成场景全景参考图
  2. 声明「不可变空间元素」：[主建筑/主光源/主色调/地面材质]
  3. 每镜prompt开头追加「在同一场景中，[空间锚点描述]」
```

### 策略3：动作不清楚 → 补首尾帧

```
检测：镜间动作连贯性缺失
原因：运动起点/终点不明确
修复：
  1. 生成首帧（镜1起始状态）+ 尾帧（最后镜终点状态）
  2. 每个中间镜声明「从上镜[终点动作]→本镜[起点动作]→[本镜动作]」
  3. 如果超3个镜动作模糊 → 补2-3张动作关键帧
```

### 策略4：平台Prompt过长 → 压缩

```
检测：字符数超平台限制
原因：Prompt太详细或格式不正确
修复：
  1. 联动 engines/prompt-compression.md
  2. 保留：角色DNA + 场景锚点 + 动作方向 + 光线方向
  3. 删除：修辞描述、多余的氛围词、重复的禁止词
  4. 重新评分→仍超标→再次压缩

⚠ 压缩可能影响角色/场景一致性评分，重新评分时关注这两项是否下降
```

### 策略5：连续性断裂 → 补过渡

```
检测：相邻两镜的时间/空间/角色状态不连续
原因：没有过渡设计
修复：
  1. 读取 `state/continuity-snapshot.md` 上一段尾帧快照（如有跨段场景）
  2. 在两镜之间插入过渡帧描述
  3. 声明「镜N结束时的状态：[角色位置][动作末态][光线]」
  4. 声明「镜N+1开始时的状态：[继承上镜状态]」

详细修复模式见 rules/continuity-check.md 自动修复表（场景过渡/服装变化/情绪跳跃/光源变化）
```

### 策略6：视觉干净度低 → 去噪

```
检测：final-video-qc 第10项（视觉干净度）致命
原因：背景/HUD/粒子/文字污染画面
修复：
  1. 调用 engines/prompt-declutter.md → 目标维度降噪
  2. 更新 state/visual-control-state.md
  3. 如果已有项目资产 → 触发 incremental-update 局部更新
  4. 重新生成清理版 prompt
  5. 重新 QC 第10项

回流参考：rules/failure-routing.md（画面太脏/HUD乱飞/粒子过多/文字乱码）
```

### 策略7：失败样本 → 回流

```
检测：修复后仍失败 或 同一问题出现 2 次以上
原因：知识库/规则/模板存在盲区
修复：
  1. 读取 rules/failure-routing.md → 匹配失败现象 → 找到回流位置
  2. 记录失败样本（输入/现象/回流位置/修复动作/结果）
  3. 如回流位置有知识库条目 → 调用 knowledge-retrieval 搜索具体修复方法
  4. 如回流位置无对应条目 → 标注「⚠ 新失败类型，需补充规则」
```

### 策略8：台词/音效缺失 → 补设计

```
检测：final-video-qc 第12项（台词连贯性 / 音效覆盖）致命
原因：dialogue-map 或 sound-map 缺失关键条目
修复：
  1. 台词问题 → 调用 engines/dialogue-engine.md → 补 dialogue-map 缺失条目
  2. 音效问题 → 调用 engines/sound-engine.md → 补 sound-map 缺失条目
  3. 更新 state/dialogue-map.md 或 state/sound-map.md
  4. 重新生成 dialogue-script 或 sound-design-sheet
  5. 重新 QC 第11-12项

回流参考：rules/failure-routing.md（台词连贯性断裂 / 音效覆盖不完整）
```

## 修复优先级

```
1. 平台兼容（P0）—— 超限则完全生不出来
2. 角色一致性（P0）—— 人脸漂了就直接废
3. 场景一致性（P1）—— 场景漂移整体作废
4. 视觉干净度（P0/P1）—— 角色卡/首帧脏=致命，其他=非致命
5. 视觉可用性（P1）—— display_asset 误用为 video_asset=致命（见 `rules/asset-qc.md` 四维度检查）
6. 台词/音效（P1）—— 缺失关键条目=致命，不完整=非致命
7. 动作清晰度（P1）—— 动作不清楚视频不通顺
8. 连续性（P2）—— 断裂但不致命
9. Prompt分数（P2）—— 优化项
```

---

## 输出

```markdown
【自动修复报告】

触发问题：
  [问题1] 得分[分数] → 修复策略[编号]
  [问题2] 得分[分数] → 修复策略[编号]

修复操作：
  1. [策略编号]：[修复动作] → 预期效果[描述]
  2. ...

修复后重评：
  角色一致性：[旧分]→[新分]
  场景一致性：[旧分]→[新分]
  ...
  总分：[旧分]→[新分]
```

---

## 联动

← 接收 `engines/prompt-scorer.md` 的评分结果
← 接收 `engines/consistency-engine.md` 的一致性评估报告（RM 阻断项触发专项修复）
← 接收 `engines/asset-plan.md` 的最低资产校验结果（不满足时触发策略2/3补资产）
← 接收 `engines/reference-anchor.md` 的平台校验结果（不通过时触发策略4压缩或策略5连续性修复）
← 接收 `rules/final-video-qc.md` 第10项视觉干净度检查（致命时触发策略6去噪）
← 调用 `engines/knowledge-retrieval.md`（修复前检索 knowledge/ 获取具体操作参数）
← 调用 `engines/prompt-declutter.md`（策略6：视觉去噪）
← 读取 `rules/failure-routing.md`（策略7：失败回流 → 匹配回流位置）
→ 按策略链修复
→ **修复后调用 `engines/incremental-update.md`**（限定重评范围：只评估修复涉及的 RM 维度，不跑全量 5 维度）
→ 重新评分→仍不达标→再次修复（最多 REPAIR_MAX_ROUNDS 轮，从 api-config.template.env 读取）
→ REPAIR_MAX_ROUNDS 轮后仍不达标→标记为"需人工介入"
→ 修复完成 → 调用 `rules/asset-qc.md` 检查所有产出资产（用途一致/视频安全/一致性/可用性四维度）
→ 输出给 `rules/final-video-qc` 做最终质检
→ final-video-qc 不通过 → 再次进入修复（QC修复循环，与评分修复循环共用 REPAIR_MAX_ROUNDS 总限制）
→ **修复后更新 state/**：策略1→更新 `variable-registry.md`（characters.immutable_features）；策略2→更新 `variable-registry.md`（scene.fixed_elements）；策略3/5→更新 `shot-state.md`（action/transition/end_state）；策略4→更新 `variable-registry.md`（word_count）；策略6→更新 `visual-control-state.md`
→ 策略7 → 记录失败样本到 rules/failure-routing.md 回流日志

---

## 死循环防护

| 防护 | 规则 |
|------|------|
| 总轮次上限 | `REPAIR_MAX_ROUNDS`（api-config.template.env，默认3）。评分修复 + QC修复累计不超此值 |
| 连续相同修复 | 同一问题连续2轮修复后评分未提升 → 跳过该问题，标记"放弃修复" |
| 修复降级 | 第 N 轮评分低于第 N-1 轮 → 回滚到 N-1 轮结果，标记"最优已达" |
| 阻断项无法修复 | 任一 RM < 30 且 1 轮修复后仍 < 30 → 不继续修，直接标记"需人工介入" |
| 修复范围收敛 | 每轮修复后，重评范围限 affected dimensions（incremental-update），不跑全量5维 |
