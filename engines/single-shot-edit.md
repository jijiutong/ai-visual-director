# 精准单镜修改

用户说"第3镜再暗一点" / "角色换长发" / "把雨改成雪" / "加个过肩镜头"，不重新生成全部，只改指定镜。

## 修改指令识别

| 用户指令类型 | 示例 | 处理方式 |
|------------|------|---------|
| 调整亮度 | "第3镜再暗一点" / "亮一些" | 修改该镜灯光参数 |
| 更换元素 | "把雨改成雪" / "换背景" | 修改该镜环境描述 |
| 角色调整 | "角色换长发" / "穿红色" | 更新角色 DNA + 该镜描述 |
| 镜头变更 | "加个过肩镜头" / "改特写" | 修改该镜景别/运镜 |
| 情绪调整 | "第5镜更紧张" | 修改该镜情绪/节奏参数 |
| 添加元素 | "加一只猫" / "加霓虹灯" | 在该镜描述中追加元素 |
| 删除元素 | "去掉文字" / "不要水印" | 在负面提示词中追加 |

## 修改规则

### 范围控制

- **单镜修改**：只改指定编号的镜头，其他镜头不变
- **全镜修改**：用户说"所有镜头都..."，全部应用
- **阶段修改**：用户说"对峙阶段的镜头都..."，按情绪阶段批量修改

### DNA 变更传播

当修改涉及角色外观（发型/服装）时：

1. 更新角色 DNA 中的对应字段
2. 在所有引用该角色的镜头中同步更新
3. 在 prompt 中追加"角色 DNA 已更新"标注

### 修改前后对比

输出修改后的 prompt 时，标注变更：

```
【修改记录】
镜3：[原描述] → [新描述]（变更：[变更说明]）
```

## 常见修改指令处理

### 亮度调整

```
用户："第3镜再暗一点"
处理：该镜灯光参数追加 "darker lighting, deeper shadows, lower exposure"
```

### 天气变更

```
用户："把雨改成雪"
处理：全镜环境描述中 "rain" → "snow"，追加 "snowfall, snowflakes, cold atmosphere"
```

### 角色外观变更

```
用户："碧瑶换长发"
处理：更新碧瑶 DNA 发型字段 → 在所有镜中同步 → 追加 "long flowing hair"
```

### 镜头语言变更

```
用户："镜4加个过肩镜头"
处理：镜4 景别改为 "over the shoulder shot"，运镜追加 OTS 描述
```

### 元素增删

```
用户："加一只黑猫在窗台上"
处理：在对应镜的环境描述中追加 "black cat sitting on windowsill"
```

## 在 Prompt 中使用

修改后的 prompt 标注：

```
【精准修改】基于上一版 prompt，仅修改以下内容：
镜[X]：[原描述] → [新描述]（变更：[说明]）
其他镜头保持不变。
```

修改后 → **更新 `state/shot-state.md`** 中对应 SH(X) 的字段（如灯光/角色DNA/景别/运镜），确保下次视频 prompt 组装时使用最新数据。

---

## 修改后一致性重评（强制）

每次单镜修改完成后，**必须**走增量更新流程，防止修改引入断裂：

```
单镜修改完成
  ↓
1. 更新 state/shot-state.md 对应镜头
  ↓
2. 判断是否需要跨镜传播：
  ├─ 仅单镜内容变更（亮度/景别/运镜） → 不传播，直接进入一致性重评
  ├─ 涉及角色外观 → 调用 incremental-update（entity_type=character）
  ├─ 涉及场景元素 → 调用 incremental-update（entity_type=scene）
  ├─ 涉及天气变更 → 调用 incremental-update（entity_type=scene, 天气字段）
  └─ 涉及灯光/色彩 → 调用 incremental-update（entity_type=shot, 限定传播）
  ↓
3. incremental-update 计算影响范围：
  ├─ 读取 state/project-graph.md → affected_shots / affected_assets
  ├─ 更新受影响镜头的 state/ 字段
  └─ 返回影响范围报告
  ↓
4. 限定一致性重评（增量模式）：
  ├─ 仅评估受影响的 RM 维度
  └─ 输出修改影响报告
```

### 天气变更的过渡补桥（R010 规则）

```
修改："把镜5的雨改成雪"
  ↓
1. incremental-update 识别：entity_type=scene, 变更字段=weather
2. 查询 project-graph：affected_shots("scene", "S1") → [SH04, SH05, SH06, SH07]
3. 自动处理：
   ├─ 镜5：rain → snow，追加 snowfall/cold atmosphere
   ├─ 镜4 末尾插入：「雨势渐弱，第一片雪花飘落」
   ├─ 镜6-7 同步 weather 字段
   └─ 输出：「镜4末插入雨→雪过渡，4镜联动已更新（SH04-07）」
```

### 角色外观变更的全镜传播（使用 project-graph）

```
修改："墨渊换长发"
  ↓
1. incremental-update 识别：entity_type=character, entity_id=C1
2. 查询 project-graph：
   affected_shots("character", "C1") → [SH01, SH03, SH05, SH07]
   affected_assets("character", "C1") → [@图1]
3. 更新：
   ├─ variable-registry.characters.protagonist.dna_full.发型发色 → 长发
   ├─ variable-registry.characters.protagonist.immutable_features → 更新
   ├─ shot-state: SH01/SH03/SH05/SH07 action 追加 "long flowing hair"
   └─ asset-map: @图1 标记「⚠ 待重新生成」
4. 一致性重评：仅 Character RM
5. 不动 SH02/SH04/SH06（不含角色 C1）
```

### 修改影响报告格式（增量更新版本）

```
【单镜修改报告】镜5：雨→雪

✅ 修改完成：镜5 已更新
📊 影响范围（project-graph 查询）：
  受影响镜头：4 镜（SH04-SH07）
  受影响资产：1 个（@图0 场景图标记待重新生成）
  跳过镜头：3 镜（SH01-SH03 完全不动）

🔗 前后镜联动：
  ✅ 镜4→镜5：已补雨→雪过渡
  ✅ 镜5→镜6：雪景连续
  ✅ end_state 继承链完整

🔄 一致性重评（增量模式）：
  评估：Scene RM（天气过渡+光源方向）
  跳过：Character RM / Style RM / Story RM / Video RM（不受影响）

⚠ 建议：雪景的灯光方案建议从"闪电冷白"调整为"雪地漫反射柔光"，是否需要？
```

---

## 联动

← 用户指令（"改第N镜" / "修改..."）
→ 更新 `state/shot-state.md`（对应镜号字段）
→ 更新 `state/variable-registry.md`（如涉及角色DNA/场景固定元素变更）
→ **调用 `engines/incremental-update.md`**（计算影响范围：查询 project-graph → 传播变更 → 限定重评）
← 读取 `state/project-graph.md`（查询受影响镜头，替代手动遍历 shot-state）
→ **调用 `engines/consistency-engine.md`**（增量模式：只检查受影响的维度）
→ 输出修改影响报告
→ 触发 prompt-scorer 重评（如评分下降则进入 auto-repair）
