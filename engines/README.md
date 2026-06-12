# Engines

`engines/` 放"会做决策和编排"的 Markdown 规则。分为两类：自动决策链引擎（新）和辅助决策引擎（旧）。

---

## 自动决策链（一键视频主链路）

按顺序执行，从前到后自动流转。每个引擎产出写入 `state/` 注册中心，下游引擎和模板从 `state/` 统一读取。

```
task-router → command-gate → project-manager → sources/ → story-intake → shot-budget → video-director
→ asset-plan → consistency-trigger → visual-density-controller → reference-anchor → motion-physics → project-graph
→ video-prompt-assembly → consistency-engine → prompt-scorer
→ auto-repair → rules/final-video-qc → render-package
     ↑ 权限闸门       ↑ 项目初始化/加载               ↑ 写入 state/ + 构建依赖图 + 一致性触达 + 视觉密度    ↑ 读取 state/ + 限定评估范围
```

| 文件 | 职责 | 输入 ← | 输出 → |
|------|------|--------|--------|
| `task-router.md` | 意图识别+路由分发（总入口） | 用户输入 | command-gate |
| `command-gate.md` | 命令闸门：模式选择+权限表+写回策略+锁定格式合同 | task-router | project-manager + state/command-context |
| `state-commit.md` | 状态提交：/lock /commit /unlock /check 命令处理，draft→locked→committed 生命周期 | 用户命令 | lock-state + variable-registry + state-commit-log |
| `aesthetic-director.md` | 审美导演：口语审美→10字段结构化转译（网红美女→脸型/五官/妆容/光线...） | /character 子链 | role prompt |
| `project-manager.md` | 项目管理：init/save/load/delete + state/ 持久化 | task-router | sources/ |
| `story-intake.md` | 故事摄入：提取字段+角色+场景+冲突 | sources/ | shot-budget |
| `shot-budget.md` | 镜头预算：定时长/镜数/拆段/压缩 | story-intake | video-director |
| `video-director.md` | 导演决策：节奏/高潮/情绪曲线/参考图 | shot-budget | asset-plan |
| `asset-plan.md` | 资产规划：角色卡/场景图/最低校验 | video-director + story-intake | consistency-trigger |
| `consistency-trigger.md` | 一致性触达：分镜密度+场景方法+角色方法决策+最低资产强制检查 → 输出保障建议（建议不阻塞，强制条件阻断） | asset-plan + state/ | visual-density-controller |
| `visual-density-controller.md` | 视觉密度控制：按输出类型设密度/背景/HUD/粒子/文字默认值 → 写入 state/visual-control-state | consistency-trigger | reference-anchor |
| `reference-anchor.md` | 平台锚点：参考图策略+平台限制校验 → 写入 state/asset-map | visual-density-controller | motion-physics + state/asset-map |
| `motion-physics.md` | 运动物理：运动预算+兼容性检查 | reference-anchor | project-graph |
| `project-graph.md` | 依赖图：构建双向索引+查询接口 → 写入 state/project-graph | motion-physics + state/ | video-prompt-assembly + state/project-graph |
| `video-prompt-assembly.md` | Prompt组装：4层结构+平台适配 ← 读 state/asset-map, shot-state, dialogue-map | project-graph + state/ | consistency-engine |
| `consistency-engine.md` | 一致性评估：5维度（Character/Scene/Style/Story/Video）评分 | video-prompt-assembly + state/ | prompt-scorer |
| `prompt-scorer.md` | 自动评分：6维度评分+阈值判断 | consistency-engine | auto-repair 或 final-video-qc |
| `auto-repair.md` | 自动修复：低于阈值→按策略修复（REPAIR_MAX_ROUNDS 轮） | prompt-scorer | rules/final-video-qc |
| `render-package.md` | 打包输出：资产+Prompt+平台参数+执行清单 | rules/final-video-qc | 用户 |

**工具引擎**（被上述引擎调用，不在主链路上）：
| `prompt-compression.md` | Prompt压缩：超限时自动精简 | reference-anchor / auto-repair |
| `prompt-declutter.md` | Prompt去噪：清理HUD/背景/粒子/文字/纹理 → 更新 visual-control-state | /declutter / auto-repair |
| `visual-density-controller.md` | 视觉密度控制：按输出类型设默认密度 → 写入 visual-control-state（主链上也出现） |
| `dialogue-engine.md` | 台词设计：提取对话→分配 shot_id→标注 delivery+rhythm+subtitle+lip_sync → 写入 dialogue-map | video-director / /dialogue |
| `sound-engine.md` | 音效设计：按 genre/场景/动作/情绪自动匹配 SE/FX/MU/RS → 写入 sound-map | video-director / /sound |

---

## 辅助决策引擎

风格/版式/叙事/情绪等独立决策，按需被主链路或模板调用：

| 文件 | 职责 |
|------|------|
| `styles.md` | VS 视觉风格选择 |
| `layout-styles.md` | LS 版式样式选择 |
| `fusion.md` | 风格融合 |
| `relationships.md` | 角色关系对构图/灯光/风格的影响 |
| `act-structure.md` | 叙事结构选择 |
| `emotion-curve.md` | 情绪曲线驱动 |
| `color-narrative.md` | 色彩叙事 |
| `mood-slider.md` | 用户 mood 词调参 |
| `pacing.md` | 分镜节奏 |
| `multi-version.md` | 多版本 A/B/C |
| `series.md` | 系列和续集延续 |
| `style-migration.md` | 风格迁移 |
| `batch-chapter.md` | 批量章节处理 |
| `single-shot-edit.md` | 单镜修改 |
| `incremental-update.md` | 增量更新：影响范围计算+限定重评 |
| `consistency-trigger.md` | 一致性触达：分镜密度+场景/角色方法决策（主链上也出现） |
| `project-graph.md` | 依赖图：构建双向索引+查询接口（主链上也出现） |

---

## 相关规则（rules/）

| 文件 | 职责 |
|------|------|
| `one-click-defaults.md` | 一键生成硬默认+软默认+最快路径 |
| `format-contract.md` | 格式合同：19种输出类型格式约束+资产用途分层+错误处理 |
| `prompt-qc.md` | Prompt质量检查：6维度（格式合同/负面词/画幅/可复制性/审美/无污染） |
| `portrait-quality.md` | 人像质量标准：10项检查（年龄/脸型/五官/妆容/发型/肤质/光线/镜头/气质/负面词） |
| `asset-qc.md` | 资产质量检查：4维度（用途一致/视频安全/用途隔离/可派生性），生成后检查 |
| `final-video-qc.md` | 12项最终质检+致命项判定（含引用一致性+模板合规+视觉干净度+视觉可用性+台词连贯性+音效覆盖） |
| `continuity-check.md` | 5维度连续性检查+自动修复表 |
| `numbering.md` | 19种编号体系（VS/EC/CN/CP/ME/BL/EV/WT/MT/CR/PR/HE/TR/SD/SE/FX/MU/RS/DR）+自动填充规则 |
| `qc.md` | 冲突检测（10种）+ 视频专属负面提示词 + 视频生成后12项检查清单 |
| `visual-cleanliness.md` | 视觉干净度红线：角色卡/三视图/视频首帧禁止复杂背景和HUD |
| `video-reference-assets.md` | 视频参考图分层规则：角色卡/场景图/全案板/分镜图用途隔离 |
| `asset-minimums.md` | 最低资产校验：一键生成必须包含的角色/场景/分镜资产数 |
| `failure-routing.md` | 失败回流路由：检测失败现象→匹配回流位置→标注修复动作 |
| `negative-prompt.md` | 负面提示词自动生成（按风格/格式/关系/平台） |
| `cultural-accuracy.md` | 文化精准度：东方/西方/日系/现代文化正确性检查 |
| `quality.md` | 质量约束：通用画质/角色/场景最低要求 |
| `version-control.md` | Prompt版本管理：历史记录/回滚/对比 |
| `skill-patches.md` | 规则补丁：高频文本工作流测试发现的规则修正 |
| `character-consistency.md` | 8种角色一致性方法（C1-C8）+ 叠加策略 |
| `scene-consistency.md` | 7种场景一致性方法（S1-S7）+ 叠加策略 |

## 相关状态（state/）

引擎写入 state/，模板从 state/ 读取。详见 `state/README.md`。

| 文件 | 职责 |
|------|------|
| `api-config.template.env` | **系统统一配置** — 默认平台 / 时长上限 / 字数上限 / 参考图限制 / 语言支持 / 系统阈值。项目根目录，全引擎读取，一处修改全局生效 |
| `variable-registry.md` | **总变量注册中心** — 所有全局变量汇聚点（project/style/characters/scene） |
| `asset-map.md` | **@图动态映射** — @编号→类型→用途，由 reference-anchor 写入，video-prompt-assembly 读取 |
| `shot-state.md` | **每镜状态** — 镜号/时间/景别/运镜/色彩/灯光/转场/end_state |
| `dialogue-map.md` | **台词映射** — shot_id/speaker/text/delivery/subtitle/rhythm/lip_sync |
| `sound-map.md` | **音效映射** — sound_id/shot_id/type(ambient/foley/music/reverb)/sd_code/description/timing/volume |
| `prompt-contract.md` | **模板契约** — 每个模板读什么变量、产出什么 |
| `format-contract-state.md` | **格式合同快照** — 本次生成前锁定的输出格式，由 command-gate 写入，prompt-qc 对照 |
| `lock-state.md` | **锁定状态** — 用户确认锁定的角色/场景/风格/格式 |
| `command-context.md` | **命令上下文快照** — 本轮权限表/模式/write_policy |
| `project-graph.md` | **项目依赖图** — 正向索引（实体→下游）+ 反向索引（产物→上游），由 project-graph 引擎构建 |
| `continuity-state.md` | 8字段状态定义+继承规则（跨镜连续性） |
| `visual-control-state.md` | 视觉密度/背景/HUD/粒子/文字状态，由 visual-density-controller 写入，templates 读取 |
