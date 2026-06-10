# 风格迁移

跨风格迁移：把场景换成另一种风格但保持角色DNA不变。

## 迁移规则

用户说"把这个场景换成王家卫风格但保持角色不变"时：

1. **保持不变的元素**：
   - 角色 DNA（服装/发型/面部/配饰/武器）
   - 叙事结构（三幕/情绪曲线）
   - 角色关系
   - 分镜数量和镜头编号

2. **需要迁移的元素**：
   - 配色方案 → 新风格配色
   - 氛围关键词 → 新风格氛围
   - 环境特效 → 新风格特效
   - 灯光方案 → 新风格灯光
   - 构图偏好 → 新风格构图
   - 负面提示词 → 新风格负面词

3. **需要混合的元素**：
   - 场景描述保留骨架，更换材质/光影
   - 情绪曲线保留阶段，更换色彩映射

## 迁移示例

```
原风格：东方玄幻
→ 目标风格：王家卫

配色：紫玄+金色 → 霓虹蓝绿+暖橙
氛围：仙气缭绕 → 霓虹拖影+城市孤独
特效：灵气粒子 → 慢门光轨+雨丝
灯光：灵气自发光 → 霓虹侧光+台灯暖光
构图：对称仙侠 → 倾斜+三分法
负面：追加 no bright uniform light, no symmetrical composition
角色DNA：碧瑶 → 完全不变（绿裙/银腰链/合欢铃/朱砂痣）
```

## 用户指令

| 用户指令 | 行为 |
|---------|------|
| "换成X风格但保持角色" | 风格迁移，DNA不变 |
| "换个风格看看" | 自动选择差异最大的风格迁移 |
| "A风格→B风格" | 明确指定源和目标风格 |
| "换成王家卫风格" / "维伦纽瓦风格" | 读取 `imitation/[director].md` → 匹配最接近 VS → 执行迁移 |
| "想要吉卜力那种感觉" | 读取 `imitation/ghibli.md` → 匹配 VS 组合 → 迁移 |

## 在 Prompt 中使用

追加迁移标注：

```
【风格迁移】从 [源风格] → [目标风格]。角色DNA保持不变。
变更：配色 [原]→[新]，氛围 [原]→[新]，特效 [原]→[新]，灯光 [原]→[新]。
```

---

## 风格迁移后 shot-state 联动更新

迁移完成后，**必须**逐镜更新 `state/shot-state.md` 的色彩和灯光字段：

```
风格迁移完成（variable-registry style.* 已更新）
  ↓
1. 读取 knowledge/visual-styles.md → 新风格的配色/灯光方案
2. 遍历 state/shot-state.md 所有镜头：
   ├─ color 字段：替换为新风格的配色方案
   ├─ lighting 字段：替换为新风格的灯光方案
   └─ 保留：shot_size / camera / focal_length / action / transition（构图层不变）
3. 标记变更：
   └─ 每镜追加迁移标注：「[原配色/灯光] → [新配色/灯光]」
4. 输出迁移影响报告
```

### 迁移影响报告格式

```
【风格迁移报告】东方玄幻 → 王家卫情绪

🔒 锁定不变（7 镜全部保持）：
  ✅ 角色DNA：墨渊/顾长空 全部字段
  ✅ 镜号/景别/运镜/焦段/转场：14 字段全保留
  ✅ 叙事结构/情绪曲线：保留阶段，仅色彩映射变更

🎨 已变更（每镜）：
  色彩：暗绿#1a2a1a + 烛火暖黄 → 霓虹蓝绿 + 琥珀色
  灯光：顶光+闪电冷白 → 霓虹侧光+湿润光晕
  特效：灵气粒子 → 慢门光轨+雨丝

📋 受影响镜头：SH1-SH7（全 7 镜色彩/灯光字段已更新）

🔄 建议重跑 consistency-engine Style RM + Scene RM 验证迁移一致性
```

---

## 联动

← 用户指令（"换成X风格但保持角色" / "换成[导演]风格"）
← 读取 `state/variable-registry.md`（当前 style.*）
← 读取 `knowledge/visual-styles.md`（新风格参数）
← 如果是导演风格指令：读取 `imitation/[director].md`（获取 composition/camera/lighting/color/rhythm/blocking 完整参数），匹配最接近的 VS 编号（通过文件的 VS Mapping section）
→ 更新 `state/variable-registry.md`（style.visual_style / color_narrative）
→ **更新 `state/variable-registry.md`（style_memory.*）**：迁移完成后写入新的风格记忆
  ├─ 解锁 style_memory.locked
  ├─ 更新 style_memory.vs_id / color_palette / camera_language / lighting_setup / texture / negative_constraints
  ├─ 更新 style_memory.director_reference（如迁移到导演风格）
  └─ 重新锁定 style_memory.locked = true
→ **更新 `state/shot-state.md`**（每镜 color + lighting 字段）
→ 输出迁移影响报告
→ 建议触发 consistency-engine 重评（Style RM + Scene RM）
