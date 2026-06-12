# 命令闸门

位于 task-router 和具体执行链之间。解析命令 → 确定模式 → 构建权限表 → 锁定格式合同 → 写入 command-context。所有命令执行前必须过闸门。

---

## 一、总流程

```
用户输入 → task-router（意图识别）
              ↓
         command-gate（本引擎）
              ├─ 1. 确定 task_type
              ├─ 2. 确定 mode
              ├─ 3. 读取 lock-state
              ├─ 4. 构建权限表（must_use / may_use / forbidden_use）
              ├─ 5. 确定 write_policy
              ├─ 6. 确定 lock_scope
              ├─ 7. 写 format-contract-state（锁定输出格式）
              └─ 8. 写 command-context（本轮权限快照）
              ↓
         对应命令执行链
```

---

## 二、模式选择

| 模式 | 触发条件 | 行为 |
|------|---------|------|
| **stable** | 默认。所有普通命令 | 只走 A 类 + B 类能力。C 类/D 类默认关闭 |
| **project** | `/create full`、完整全案、视频项目 | A + B + C 类开放。D 类默认关闭 |
| **explore** | 用户明确触发："发散一下""多来几版""换风格""脑暴" | D 类开放。产出标记 derived，不写回主状态 |
| **repair** | auto-repair 触发、`/check` 后修复 | 只开 A 类。只修格式错误，不改内容 |

### 模式推断

```
用户只说 "/create" → mode = stable
用户说 "/create standard" → mode = stable
用户说 "/create full" / "全部来" / "完整全案" → mode = project
用户说 "/create fast" / "快速" / "先看方向" → mode = stable（精简版）
用户说 "发散一下" / "多来几版" / "脑暴方向" / "A/B/C" → mode = explore
用户说 "换风格" / "像王家卫" / "风格迁移" → mode = explore
用户说 "修一下" / "检查" / "/check" → mode = repair
```

---

## 三、能力分层引用

从 `rules/format-contract.md` 和能力清单汇总：

### A 类：必走稳定层（所有命令都走）

```
task-router
command-gate
format-contract（读 rules/format-contract.md → 写 state/format-contract-state.md）
lock-state read（读 state/lock-state.md）
prompt-builder / template（按命令选择对应模板）
prompt-qc（读 rules/prompt-qc.md）
auto-repair（仅格式修复）
```

### B 类：项目资产层（按命令调用）

```
/character → character-sheet（templates/character-sheet.md）
/scene → scene-card（templates/scene-card.md）
/storyboard → full-board / quick-board（templates/full-board.md / quick-board.md）
/video → video-prompt-assembly（engines/video-prompt-assembly.md）
/dialogue → dialogue-engine（engines/dialogue-engine.md）
/sound → sound-engine（engines/sound-engine.md）
/poster → poster-template（templates/poster.md）
/style → style-migration / styles（engines/style-migration.md / engines/styles.md）
```

### C 类：导演增强层（project 模式默认开放，stable 模式按需）

```
video-director（engines/video-director.md）
shot-budget（engines/shot-budget.md）
motion-physics（engines/motion-physics.md）
emotion-curve（engines/emotion-curve.md）
pacing（engines/pacing.md）
color-narrative（engines/color-narrative.md）
consistency-engine（engines/consistency-engine.md）
consistency-trigger（engines/consistency-trigger.md）
visual-density-controller（engines/visual-density-controller.md）
reference-anchor（engines/reference-anchor.md）
project-graph（engines/project-graph.md）
lighting/composition knowledge
sound/dialogue（视频项目需要时）
```

### D 类：发散探索层（仅 explore 模式开放）

```
fusion（engines/fusion.md）
multi-version（engines/multi-version.md）
style-migration（engines/style-migration.md）
director-imitation（imitation/）
series（engines/series.md）
batch-chapter（engines/batch-chapter.md）
mood-slider（engines/mood-slider.md）
```

---

## 四、各命令权限表

### /create（一键生成）

| 模式 | must_use | may_use | forbidden_use | write_policy |
|------|---------|---------|-------------|-------------|
| **stable**（/create 默认） | A类全部、story-intake、shot-budget、video-director、asset-plan、consistency-trigger、reference-anchor、video-prompt-assembly、render-package、/character子链、/scene子链、/storyboard子链 | motion-physics、visual-density-controller、consistency-engine | D类全部、dialogue-engine、sound-engine、poster-template | draft_only |
| **project**（/create full） | stable全部 + dialogue-engine + sound-engine + full-board + poster proposal + director notes | motion-physics、pacing、color-narrative、emotion-curve | D类全部 | draft_only |
| **fast**（/create fast） | A类全部、story-intake、shot-budget、video-director、video-prompt-assembly、render-package | asset-plan、reference-anchor | B类其余、C类全部、D类全部 | draft_only |

### /character

| must_use | may_use | forbidden_use | write_policy | lock_scope |
|---------|---------|-------------|-------------|-----------|
| A类全部、story-intake、character-sheet、consistency-trigger（角色部分） | aesthetic-director、visual-density-controller、negative-prompt | sound-engine、series、multi-version、fusion、director-imitation、storyboard、dialogue-engine | draft_only | face_dna、costume_core、format |

### /scene

| must_use | may_use | forbidden_use | write_policy | lock_scope |
|---------|---------|-------------|-------------|-----------|
| A类全部、story-intake、scene-card、consistency-trigger（场景部分） | lighting knowledge、materials knowledge、environment knowledge、visual-density-controller | 重新设计角色脸、剧情续写、音效台词、多版本风格融合 | draft_only | scene_structure、light_direction、fixed_elements、format |

### /storyboard

| must_use | may_use | forbidden_use | write_policy | lock_scope |
|---------|---------|-------------|-------------|-----------|
| A类全部、story-intake、shot-budget、video-director、full-board / quick-board | motion-physics、continuity-check、visual-density-controller | 重新设计角色DNA、重新设计场景核心结构、把海报风格写入视频参考 | draft_only | shot_sequence、format |

### /video

| must_use | may_use | forbidden_use | write_policy | lock_scope |
|---------|---------|-------------|-------------|-----------|
| A类全部、asset-map read、shot-state read、dialogue-map read、sound-map read、platform-config、video-prompt-assembly、video-qc | — | 临时重写角色卡、临时重写场景图、临时改变故事方向、把 display_asset 当 video_asset | draft_only | asset_purpose、format |

### /dialogue

| must_use | may_use | forbidden_use | write_policy |
|---------|---------|-------------|-------------|
| A类全部、story-intake、dialogue-engine、dialogue-script | — | character-sheet、scene-card、storyboard、video-prompt-assembly | draft_only |

### /sound

| must_use | may_use | forbidden_use | write_policy |
|---------|---------|-------------|-------------|
| A类全部、sound-engine、sound-design-sheet | — | character-sheet、scene-card、storyboard、video-prompt-assembly | draft_only |

### /poster

| must_use | may_use | forbidden_use | write_policy |
|---------|---------|-------------|-------------|
| A类全部、story-intake、poster-template | style variation | 进入视频 @图。输出必须标注 asset_purpose=marketing_asset, video_safe=false | draft_only |

### /style

| must_use | may_use | forbidden_use | write_policy |
|---------|---------|-------------|-------------|
| A类全部、style-migration 或 styles | — | — | derived_only（默认）。用户说 --apply 或 /commit style → committed |

### /declutter

| must_use | may_use | forbidden_use | write_policy |
|---------|---------|-------------|-------------|
| A类全部、prompt-declutter、visual-density-controller | — | 重做角色脸、重写故事方向、换风格、改场景核心结构 | draft_only（格式修复可写回。内容修复需用户确认） |

### /compact

| must_use | may_use | forbidden_use | write_policy |
|---------|---------|-------------|-------------|
| A类全部、prompt-compression、prompt-declutter、visual-density-controller | — | 重做角色DNA、重写场景、修改故事方向、生成新资产 | draft_only（压缩/去噪后内容变更需用户确认） |

---

## 五、write_policy 定义

| 策略 | 含义 | 写入目标 |
|------|------|---------|
| **draft_only** | 产出标记 draft，不写回主状态 | state/ 临时写入（本次 session 内可见） |
| **derived_only** | 派生探索，不污染主状态 | 独立 derived state，不与主状态合并 |
| **locked** | 用户确认锁定，不允许自动修改 | lock-state.md |
| **committed** | 用户确认采用，写回主状态 | variable-registry.md + projects/ 持久化 |

---

## 六、运行规则

### 命令开始前

```
1. 读取 state/lock-state.md → 提取所有非 "—" 的锁定字段
2. 读取 state/format-contract-state.md（如有）
3. 根据命令和模式，查本文件 §四 权限表
4. 写入 state/command-context.md（本轮权限快照）
5. 写入 state/format-contract-state.md（如未锁定）
```

### 命令执行中

```
1. LLM 只能调用 must_use 和 may_use 中的能力
2. 调用 forbidden_use 中的能力 → 阻断
3. 产出必须遵守 format-contract
4. 不修改 lock-state 中的锁定字段
```

### 命令完成后

```
1. prompt-qc 检查产出
2. 按 write_policy 决定是否写回主状态
3. 标记输出状态：draft / derived / locked / committed
```

---

## 七、权限表 JSON 格式（程序化引用）

每轮生成前构建以下权限表（写入 command-context）：

```json
{
  "task_type": "character_sheet",
  "mode": "stable",
  "output_target": "image_prompt",
  "must_use": ["format-contract", "aesthetic-director", "character-sheet", "prompt-qc"],
  "may_use": ["negative-prompt", "visual-control"],
  "forbidden_use": ["fusion", "multi-version", "series", "sound-engine"],
  "write_policy": "draft_only",
  "lock_scope": ["face_dna", "costume_core", "format"]
}
```

---

## 联动

- ← 由 `engines/task-router.md` 在意图识别后调用
- ← 读取 `state/lock-state.md`（锁定字段）
- ← 读取 `rules/format-contract.md`（格式合同定义）
- → 写入 `state/command-context.md`（本轮权限快照）
- → 写入 `state/format-contract-state.md`（锁定输出格式）
- → 被所有 `sub-skills/*/SKILL.md` 读取（权限约束）
- → 被 `engines/auto-repair.md` 读取（修复边界）
- → 被 `rules/prompt-qc.md` 读取（检查依据）
