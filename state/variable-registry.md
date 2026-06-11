# 变量注册中心

记录一次生成任务的所有全局变量。各引擎按主链阶段**逐步写入**，模板和下游引擎**统一读取**。

> 这是整个 state/ 层的根节点。其他 state 文件（asset-map、shot-state、dialogue-map）引用此处的变量 ID。
> 通过 `engines/project-manager.md` 实现跨会话持久化：会话结束时保存到 `projects/<id>/state/`，下次加载时恢复。

---

## 项目变量

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `project.id` | — | `project-manager`（格式：PROJ-YYYYMMDD-XXXX） |
| `project.state_dir` | — | `project-manager`（如：projects/PROJ-20260610-A3F2/） |
| `project.created_at` | — | `project-manager`（初始化时间戳） |
| `project.saved_at` | — | `project-manager`（最后保存时间戳） |
| `project.title` | — | `story-intake` |
| `project.genre` | — | `story-intake` |
| `project.duration` | — | `shot-budget` |
| `project.aspect_ratio` | — | `story-intake`（读取 api-config.template.env → `DEFAULT_ASPECT_RATIO`） |
| `project.target_platform` | — | `story-intake`（读取 api-config.template.env → `VIDEO_PLATFORM_DEFAULT`） |
| `project.language` | — | `story-intake`（读取 api-config.template.env → `DEFAULT_LANGUAGE`） |
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

## 风格记忆（项目级持久化）

> 首次生成时由 `video-director` 写入并锁定。后续章节/会话自动继承，无需重新指定风格。风格迁移时由 `style-migration` 更新。

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `style_memory.locked` | — | `video-director`（首次设定后标记 true，用户说"换风格"时解锁） |
| `style_memory.director_reference` | — | `video-director`（导演风格参考：Villeneuve / Wong-Kar-Wai / Nolan / Ghibli / Pixar / Zhang-Yimou） |
| `style_memory.vs_id` | — | `video-director`（VS编号.名称，如 VS7.东方玄幻修仙） |
| `style_memory.color_palette` | — | `video-director`（主配色方案：hex色值列表，从 VS 定义提取） |
| `style_memory.camera_language` | — | `video-director`（运镜偏好描述） |
| `style_memory.lighting_setup` | — | `video-director`（灯光方案偏好描述） |
| `style_memory.texture` | — | `video-director`（质感偏好：film grain / clean digital / vintage / etc） |
| `style_memory.negative_constraints` | — | `video-director`（项目级禁止方向列表） |
| `style_memory.chapter_styles` | — | `batch-chapter`（各章风格变体记录：[{chapter, vs_id, color_override, notes}]） |

### 风格记忆使用规则

```
video-director 启动时：
  1. 检查 style_memory.locked 是否为 true
  2. 如果是 → 跳过风格决策（style.visual_style / emotion_curve / color_narrative / pacing）
             直接使用 style_memory 中的值填充 style.* 变量
  3. 如果否 → 正常执行风格决策 → 写入 style.* → 同时写入 style_memory.* 并锁定

用户说"换风格"时：
  1. 解锁 style_memory.locked = false
  2. 清空 style_memory.* 的值
  3. video-director 重新决策 → 重新写入 + 重新锁定

跨章节继承（batch-chapter）：
  1. 第1章：正常锁定 style_memory
  2. 第2章起：自动继承，除非章节需要风格变体（写入 chapter_styles）
  3. 项目保存/加载：style_memory 随 variable-registry 持久化到 projects/<id>/state/
```

## 角色变量

| 变量 | 值 | 写入方 |
|------|-----|--------|
| `characters.protagonist.name` | — | `story-intake`（缺则自动起名） |
| `characters.protagonist.dna_id` | — | `video-director`（C1/C2...） |
| `characters.protagonist.immutable_features` | — | `asset-plan`（硬锁特征，必含：脸型/眼型瞳色/鼻型/发型发色/肤色/身高体型，+ 角色特有标志） |
| `characters.protagonist.dna_full` | — | `asset-plan`（DNA 20 字段完整值：1姓名 2性别年龄 3身高体型 4脸型 5眼型瞳色 6眉型 7鼻型 8嘴型唇色 9发型发色 10肤色 11服装 12配饰 13武器道具 14声音 15体态站姿 16习惯动作 17气味 18情绪底色 19可变字段 20不变量标注） |
| `characters.antagonist.name` | — | `story-intake` |
| `characters.antagonist.dna_id` | — | `video-director` |
| `characters.antagonist.immutable_features` | — | `asset-plan` |
| `characters.antagonist.dna_full` | — | `asset-plan` |
| `characters.supporting` | — | `story-intake`（[{name, role}] 列表） |

> **DNA 锁定分层**：
> - **硬锁（immutable_features）**：跨镜绝对不变 — 脸型/眼型瞳色/鼻型/发型发色/肤色/身高体型/标志性特征（疤痕/纹身/胎记）
> - **软锁（dna_full 中其余字段）**：允许有说明的变化 — 服装/配饰/武器（可换装但形制不变）/情绪（按曲线演进）
> - **禁止变更（20.不变量标注）**：用户手动指定的不可变字段，优先级最高

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
  ├─ style_memory.*（首次锁定；后续继承——检查 locked 后跳过决策）
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

- **写入**：`project-manager`（project.id/state_dir/created_at/saved_at）→ `story-intake` → `shot-budget` → `video-director`（含 style_memory.*）→ `asset-plan` → `style-migration`（style_memory.* 更新）→ `batch-chapter`（style_memory.chapter_styles）
- **读取**：所有 `templates/`、`video-prompt-assembly`、`consistency-engine`（5 维度评估全量变量）、`project-graph`（实体 ID 列表 + style.*）、`incremental-update`（实体确认 + 字段值）、`final-video-qc`、`batch-chapter`（style_memory.locked）、`series`（style_memory.*）
- **校验**：`prompt-contract.md` 交叉验证每个模板的 reads 是否在此文件有对应变量
