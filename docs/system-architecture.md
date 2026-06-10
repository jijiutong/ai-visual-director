# AI Visual Director System Architecture

这个 skill 采用 Markdown 驱动的规则引擎结构。根目录 `SKILL.md` 是总控入口，其余目录按职责分层。

除非单个文件另有说明，文档里的内部路径都按仓库根目录解析。发布或安装时不要只复制 `SKILL.md`，必须同时包含 `sources/`、`engines/`、`knowledge/`、`rules/`、`templates/`、`platforms/`、`sub-skills/` 等源目录；`.agents/` 与 `.claude/` 只属于本机安装副本/缓存。

## 分层

| 层 | 目录 | 作用 |
|----|------|------|
| 总控层 | `SKILL.md` | 入口、工作流、路由、输出规范 |
| 输入源层 | `sources/` | 粘贴输入、Obsidian、Markdown、frontmatter、批量章节 |
| 引擎层 | `engines/` | 任务路由、故事摄入、镜头预算、视频导演、资产规划、评分、修复、打包 |
| 状态层 | `state/` | **变量注册中心** — 引擎写入、模板读取（variable-registry + asset-map + shot-state + dialogue-map + prompt-contract） |
| 规则层 | `rules/` | 硬约束、8项质检（含引用一致性）、连续性、一致性、负面词 |
| 知识层 | `knowledge/` | 角色、场景、镜头、材质、声音、时代、道具（纯参考数据） |
| 模板层 | `templates/` | 最终 prompt 输出结构（从 state/ 读取变量） |
| 子技能层 | `sub-skills/` | 角色、场景、分镜、风格、视频等快捷入口 |
| 平台层 | `platforms/` | 图像/视频平台适配和 API 集成 |
| 文档层 | `docs/` | 使用说明、流程说明、架构说明 |

## 执行顺序

```text
用户输入
  -> engines/task-router.md 识别意图，分发到主链或子链
  -> sources/ 处理粘贴、Obsidian、Markdown、frontmatter
  -> engines/story-intake.md 提取故事字段 → 写入 state/variable-registry
  -> engines/shot-budget.md 决定时长、镜数、是否拆段 → 写入 state/variable-registry
  -> engines/video-director.md 选择风格/情绪曲线/节奏 → 写入 state/variable-registry + shot-state + dialogue-map
  -> engines/asset-plan.md 规划资产 → 写入 state/variable-registry
  -> engines/reference-anchor.md 按平台分配参考锚点 → 写入 state/asset-map
  -> engines/motion-physics.md 检查运动可执行性 → 补充 state/shot-state
  -> engines/video-prompt-assembly.md 组装视频 prompt ← 读取 state/
  -> engines/prompt-scorer.md 6维度自动评分
  -> engines/auto-repair.md 低于阈值自动修复 → 更新 state/
  -> rules/final-video-qc.md 8项最终质检（含引用一致性）← 读取 state/
  -> engines/render-package.md 输出视频执行包

基础能力子链（复用 state/ 体系）：
  /character → story-intake → state/ → character-sheet → asset-map → QC
  /scene     → story-intake → state/ → scene-card → asset-map → QC
  /storyboard → story-intake → shot-budget → video-director → state/ → template → asset-map → QC
```

## 文件归位规则

| 新内容 | 放哪里 |
|--------|--------|
| “故事从哪里来，怎么读项目/章节” | `sources/` |
| “如果用户说 X，就选择 Y” | `engines/` |
| “不能出现 X，必须检查 Y” | `rules/` |
| “某类镜头/材质/场景/动作有哪些” | `knowledge/` |
| “最终 prompt 长什么样” | `templates/` |
| “某平台怎么写参数” | `platforms/` |
| “用户可以用什么命令触发” | `sub-skills/` 或 `SKILL.md` |

## 命名建议

- 引擎：`*-engine` 概念，但文件名保持简短，如 `layout-styles.md`
- 规则：`*-check.md`、`*-consistency.md`、`negative-prompt.md`
- 知识库：名词复数，如 `materials.md`、`props.md`
- 模板：输出名，如 `full-board.md`、`character-sheet.md`
