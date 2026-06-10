# 状态管理层

长片/多段视频项目的状态快照、跨段衔接、角色DNA延续管理。

---

## 为什么需要 state/

单段 15s 视频不需要状态管理——一次生成就完了。但当你做连续剧/长片（30s+ 或多段拼接）时，需要保证：

- 角色在段1和段2长得一样、穿得一样
- 场景主光源方向不变
- 道具不会凭空出现或消失
- 情绪过渡自然不突兀
- 跨段衔接不跳切

---

## 状态文件

### 变量与映射层（引擎写入，模板读取）

| 文件 | 用途 |
|------|------|
| `variable-registry.md` | **总变量注册中心** — project/style/characters/scene 全部全局变量 |
| `asset-map.md` | **@图动态映射** — @编号→类型→用途，由 reference-anchor 写入 |
| `shot-state.md` | **每镜状态** — 镜号/时间/景别/运镜/色彩/灯光/转场/end_state |
| `dialogue-map.md` | **台词映射** — shot_id/speaker/text/delivery/subtitle |
| `prompt-contract.md` | **模板契约** — 每个模板读什么变量、产出什么 |

### 连续性层（跨镜/跨段）

| 文件 | 用途 |
|------|------|
| `continuity-state.md` | 8 字段定义 + 继承规则 + 检查表 |
| `continuity-snapshot.md` | 每段结束时的完整快照 + 跨段衔接技法选择 |

---

## 状态生命周期

```
用户输入
  ↓
story-intake → 写入 variable-registry（project/characters/scene 基础字段）
  ↓
shot-budget → 写入 variable-registry（project.duration）
  ↓
video-director → 写入 variable-registry（style/characters.dna_id/scene_id）
              → 写入 shot-state（镜号/阶段/景别/灯光/色彩/转场/高潮镜）
              → 写入 dialogue-map（如有台词）
  ↓
asset-plan → 写入 variable-registry（style.layout_*/immutable_features/fixed_elements）
  ↓
reference-anchor → 写入 asset-map（@图映射，按平台策略）
  ↓
motion-physics → 补充 shot-state（运动数据）
  ↓
video-prompt-assembly ← 读取 variable-registry + asset-map + shot-state + dialogue-map
                      → 组装视频 prompt
  ↓
final-video-qc ← 读取 asset-map + shot-state + dialogue-map
               → 校验引用一致性
  ↓
render-package → 输出
```

---

## 与其他层的联动

```
sources/ → 提取初始状态 → 写入 variable-registry
engines/story-intake → 写入 variable-registry（基础字段）
engines/shot-budget → 写入 variable-registry（时长）
engines/video-director → 写入 variable-registry + shot-state + dialogue-map
engines/asset-plan → 写入 variable-registry（版式/不可变特征）
engines/reference-anchor → 写入 asset-map（@图动态映射）
engines/motion-physics → 补充 shot-state（运动数据）
engines/video-prompt-assembly → 读取 variable-registry + asset-map + shot-state + dialogue-map
engines/auto-repair → 检测状态断裂时读取 continuity-snapshot 修复
rules/final-video-qc → 读取 asset-map + shot-state + dialogue-map 校验引用一致性
state/prompt-contract → 校验模板 reads 覆盖率
```

---

## 目录结构

```
state/
├── README.md                   ← 本文件
├── variable-registry.md        ← 总变量注册中心（project/style/characters/scene）
├── asset-map.md                ← @图动态映射（reference-anchor 写入）
├── shot-state.md               ← 每镜状态（video-director 写入，motion-physics 补充）
├── dialogue-map.md             ← 台词映射（video-director 写入）
├── prompt-contract.md          ← 模板输入输出契约
├── continuity-state.md         ← 8字段定义+继承规则
├── continuity-snapshot.md      ← 跨段快照+衔接技法
├── [未来] character-dna-snapshots/  ← 多角色DNA快照存档
├── [未来] scene-snapshots/          ← 场景状态存档
└── [未来] project-state.json        ← 机器可读的状态文件（自动维护）
```
