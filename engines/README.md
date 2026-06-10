# Engines

`engines/` 放"会做决策和编排"的 Markdown 规则。分为两类：自动决策链引擎（新）和辅助决策引擎（旧）。

---

## 自动决策链（一键视频主链路）

按顺序执行，从前到后自动流转。每个引擎产出写入 `state/` 注册中心，下游引擎和模板从 `state/` 统一读取。

```
task-router → project-manager → sources/ → story-intake → shot-budget → video-director
→ asset-plan → reference-anchor → motion-physics → project-graph
→ video-prompt-assembly → consistency-engine → prompt-scorer
→ auto-repair → rules/final-video-qc → render-package
       ↑ 项目初始化/加载               ↑ 写入 state/ + 构建依赖图    ↑ 读取 state/ + 限定评估范围
```

| 文件 | 职责 | 输入 ← | 输出 → |
|------|------|--------|--------|
| `task-router.md` | 意图识别+路由分发（总入口） | 用户输入 | 第一个目标引擎 |
| `project-manager.md` | 项目管理：init/save/load/delete + state/ 持久化 | task-router | sources/ |
| `story-intake.md` | 故事摄入：提取字段+角色+场景+冲突 | sources/ | shot-budget |
| `shot-budget.md` | 镜头预算：定时长/镜数/拆段/压缩 | story-intake | video-director |
| `video-director.md` | 导演决策：节奏/高潮/情绪曲线/参考图 | shot-budget | asset-plan |
| `asset-plan.md` | 资产规划：角色卡/场景图/最低校验 | video-director + story-intake | reference-anchor |
| `reference-anchor.md` | 平台锚点：参考图策略+平台限制校验 → 写入 state/asset-map | asset-plan | motion-physics + state/asset-map |
| `motion-physics.md` | 运动物理：运动预算+兼容性检查 | reference-anchor | project-graph |
| `project-graph.md` | 依赖图：构建双向索引+查询接口 → 写入 state/project-graph | motion-physics + state/ | video-prompt-assembly + state/project-graph |
| `video-prompt-assembly.md` | Prompt组装：4层结构+平台适配 ← 读 state/asset-map, shot-state, dialogue-map | project-graph + state/ | consistency-engine |
| `consistency-engine.md` | 一致性评估：5维度（Character/Scene/Style/Story/Video）评分 | video-prompt-assembly + state/ | prompt-scorer |
| `prompt-scorer.md` | 自动评分：6维度评分+阈值判断 | consistency-engine | auto-repair 或 final-video-qc |
| `auto-repair.md` | 自动修复：低于阈值→按策略修复（最多3轮） | prompt-scorer | rules/final-video-qc |
| `render-package.md` | 打包输出：资产+Prompt+平台参数+执行清单 | rules/final-video-qc | 用户 |

**工具引擎**（被上述引擎调用，不在主链路上）：
| `prompt-compression.md` | Prompt压缩：超限时自动精简 | reference-anchor / auto-repair |

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
| `project-graph.md` | 依赖图：构建双向索引+查询接口（主链上也出现） |

---

## 相关规则（rules/）

| 文件 | 职责 |
|------|------|
| `one-click-defaults.md` | 一键生成硬默认+软默认+最快路径 |
| `final-video-qc.md` | 8项最终质检+致命项判定（含引用一致性检查） |
| `continuity-check.md` | 5维度连续性检查+自动修复表 |

## 相关状态（state/）

引擎写入 state/，模板从 state/ 读取。详见 `state/README.md`。

| 文件 | 职责 |
|------|------|
| `platform-config.md` | **平台统一配置** — 默认平台 / 时长上限 / 拆分规则 / 资产按段分配。全引擎读取，一处修改全局生效 |
| `variable-registry.md` | **总变量注册中心** — 所有全局变量汇聚点（project/style/characters/scene） |
| `asset-map.md` | **@图动态映射** — @编号→类型→用途，由 reference-anchor 写入，video-prompt-assembly 读取 |
| `shot-state.md` | **每镜状态** — 镜号/时间/景别/运镜/色彩/灯光/转场/end_state |
| `dialogue-map.md` | **台词映射** — shot_id/speaker/text/delivery/subtitle |
| `prompt-contract.md` | **模板契约** — 每个模板读什么变量、产出什么 |
| `project-graph.md` | **项目依赖图** — 正向索引（实体→下游）+ 反向索引（产物→上游），由 project-graph 引擎构建 |
| `continuity-state.md` | 8字段状态定义+继承规则（跨镜连续性） |
| `continuity-snapshot.md` | 跨段快照+衔接技法选择 |
