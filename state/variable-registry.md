# 变量注册中心

记录一次生成任务的所有全局变量。各引擎按主链阶段**逐步写入**，模板和下游引擎**统一读取**。

> 这是整个 state/ 层的根节点。其他 state 文件（asset-map、shot-state、dialogue-map）引用此处的变量 ID。

---

## 项目变量

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `project.title` | — | `story-intake` |
| `project.genre` | — | `story-intake` |
| `project.duration` | — | `shot-budget` |
| `project.aspect_ratio` | — | `story-intake`（默认 16:9） |
| `project.target_platform` | — | `story-intake`（默认 Seedance） |
| `project.language` | — | `story-intake`（默认中文） |
| `project.word_count` | — | `shot-budget`（初始估算），`reference-anchor`（平台校验后更新） |

## 风格变量

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `style.visual_style` | — | `video-director`（VS编号.名称） |
| `style.emotion_curve` | — | `video-director`（EC编号） |
| `style.layout_full_board` | — | `asset-plan`（LS编号，全案板用） |
| `style.layout_storyboard` | — | `asset-plan`（LS编号，故事板用） |
| `style.layout_character` | — | `asset-plan`（LS编号，角色卡用） |
| `style.layout_scene` | — | `asset-plan`（LS编号，场景图用） |
| `style.color_narrative` | — | `video-director`（CN编号） |
| `style.pacing` | — | `video-director`（P编号） |

## 角色变量

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `characters.protagonist.name` | — | `story-intake`（缺则自动起名） |
| `characters.protagonist.dna_id` | — | `video-director`（C1/C2...） |
| `characters.protagonist.immutable_features` | — | `asset-plan`（3-5个不可变特征列表） |
| `characters.antagonist.name` | — | `story-intake` |
| `characters.antagonist.dna_id` | — | `video-director` |
| `characters.antagonist.immutable_features` | — | `asset-plan` |
| `characters.supporting` | — | `story-intake`（[{name, role}] 列表） |

## 场景变量

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `scene.primary.name` | — | `story-intake` |
| `scene.primary.scene_id` | — | `video-director`（S1/S2...） |
| `scene.primary.fixed_elements` | — | `asset-plan`（不可变空间元素列表） |
| `scene.time_of_day` | — | `video-director` |
| `scene.weather` | — | `video-director`（WT编号） |

## 写入阶段

```
story-intake 写入
  ├─ project.title / genre / aspect_ratio / target_platform / language
  ├─ characters.protagonist.name / antagonist.name / supporting
  └─ scene.primary.name
      ↓
shot-budget 写入
  └─ project.duration
      ↓
video-director 写入
  ├─ style.visual_style / emotion_curve / color_narrative / pacing
  ├─ characters.*.dna_id
  ├─ scene.primary.scene_id / time_of_day / weather
  └─ 高潮镜定位 → 写入 `shot-state.md`
      ↓
asset-plan 写入
  ├─ style.layout_*（版式编号）
  ├─ characters.*.immutable_features
  └─ scene.primary.fixed_elements
```

## 联动

- **写入**：`story-intake` → `shot-budget` → `video-director` → `asset-plan`（按主链阶段逐步填充）
- **读取**：所有 `templates/`、`video-prompt-assembly`、`final-video-qc`（prompt-scorer 通过 video-prompt-assembly 间接消费，不直接读）
- **校验**：`prompt-contract.md` 交叉验证每个模板的 reads 是否在此文件有对应变量
