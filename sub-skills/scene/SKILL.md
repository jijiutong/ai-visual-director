---
name: scene
description: Scene concept art — 7 consistency methods. Route: story-intake → state/variable-registry → scene-card → state/asset-map → QC. Use /scene or "场景", "场景设计", "环境设计".
---

# Scene — 场景设计

输入场景描述 → 选择定位方法 → 输出场景概念图 prompt。7 种场景一致性锁定方法。

## 触发方式

- `/scene [场景描述]`
- 直接说 "场景"、"场景设计"、"场景概念图"、"环境设计"

## 子指令

| 指令 | 效果 |
|------|------|
| `/scene 场景锚点` | 自动推荐最适合的锁场景方法 |
| `/scene 全能参考图` / `all-in-one` | 一张图锁定场景+角色+光照+道具+氛围+构图 |
| `/scene 九宫格锁定` | 3×3 多角度场景锁定，适合复杂宫殿/战场/太空基地 |
| `/scene 双联宽幅锚点` | 上下两张 21:9 场景帧，适合视频首尾/阶段锚点 |
| `/scene 720全景` | 360°×180° 全景环境图 |
| `/scene 环绕截图` / `视频截图法` | 环绕视频→截取 8 角度→场景参考板 |
| `/scene camera remix` | 同场景多角度镜头变化，保持空间一致 |

## 工作流

### Step 1: 收集场景信息

从用户输入提取：场景名称、地点类型、空间尺寸、风格时代、主光源、天气、色调、氛围。

### Step 2: 选择场景锁死方法（7 种）

**读取 `rules/scene-consistency.md`** → 获取 7 种方法的最新参数（出图量/费用/锁定强度/适用场景/prompt模板）。方法参数不在此 SKILL 中硬编码，以 `rules/scene-consistency.md` 为权威源。

展示给用户时，按 `rules/scene-consistency.md` 的方法选择指南表呈现。用户说编号或方法名确认。

### Step 3: 生成 Prompt

**从 `rules/scene-consistency.md` 获取用户所选方法对应的 prompt 模板**，结合 Step 1 收集的场景信息填充。以下为常用模板的简要参考（完整模板以 `rules/scene-consistency.md` 为准）：

**俯拍图**（详见 `rules/scene-consistency.md` §一）：
```
鸟瞰视角，正上方垂直向下，展示完整空间布局...
```

**4 宫格**（详见 `rules/scene-consistency.md` §二）：
```
4 宫格布局，同一场景的 4 个角度...
```

**9 宫格**（详见 `rules/scene-consistency.md` §三）：
```
3×3 九宫格布局，同一场景的 9 个视角...
```

**全能参考图**（详见 `rules/scene-consistency.md` §四）：
```
全能参考图：场景全景为主体，角色站立于场景中央...
```

**九宫格锁定**（详见 `rules/scene-consistency.md` §三）：
```
同一场景九宫格锁定参考板，所有 9 格同一地点/时间/色温/天气...
```

**双联宽幅锚点**（详见 `rules/scene-consistency.md` §五 相关变体）：
```
双联宽幅场景视频锚点，上下两条 21:9 超宽电影帧...
```

## 场景说明书模板（文字场景锁定用）

详见 `rules/scene-consistency.md` §七。简要格式：

```
[场景名]：一间 [尺寸] 的 [风格描述]。
东墙：[描述] | 西墙：[描述] | 南面：[描述] | 北面：[描述]
主光源：[方向+类型+色温]
辅助光源：[描述+色温]
地面：[材质+颜色+磨损] | 天花板：[描述+高度]
色调：[主色+辅色] | 氛围：[时间+天气+情绪]
```

## 方法叠加策略

从 `rules/scene-consistency.md` 获取最新的叠加策略和费用。简要参考：

| 预算 | 组合 | 费用 | 耗时 |
|------|------|------|------|
| 快速验证 | 全能参考模式 | ~USD0.08 | ~30s |
| 标准短片 | 俯拍图 + 角色卡 | ~USD0.16 | ~2min |
| 正式成片 | 9 宫格 + 角色卡 | ~USD0.24 | ~3min |
| 最强一致性 | 720° 全景 + 文字场景锁定 | ~USD0.80 | ~3min |
