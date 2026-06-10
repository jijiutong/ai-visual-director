# AI Visual Director System Architecture

这个 skill 采用 Markdown 驱动的规则引擎结构。根目录 `SKILL.md` 是总控入口，其余目录按职责分层。

## 分层

| 层 | 目录 | 作用 |
|----|------|------|
| 总控层 | `SKILL.md` | 入口、工作流、路由、输出规范 |
| 引擎层 | `engines/` | 决策、推荐、组合、评分、压缩 |
| 规则层 | `rules/` | 硬约束、质量检测、连续性、一致性、负面词 |
| 知识层 | `knowledge/` | 角色、场景、镜头、材质、声音、时代、道具 |
| 模板层 | `templates/` | 最终 prompt 输出结构 |
| 子技能层 | `sub-skills/` | 角色、场景、分镜、风格、视频等快捷入口 |
| 平台层 | `platforms/` | 图像/视频平台适配和 API 集成 |
| 文档层 | `docs/` | 使用说明、流程说明、架构说明 |

## 执行顺序

```text
用户输入
  -> SKILL.md 提取故事字段
  -> engines/ 选择 VS 风格、LS 版式、情绪曲线、节奏、结构
  -> knowledge/ 补齐角色、场景、镜头、材质、声音、时代细节
  -> rules/ 检查文化、连续性、质量、负面词和不可变项
  -> templates/ 组装最终 prompt
  -> platforms/ 按目标平台改写参数
```

## 文件归位规则

| 新内容 | 放哪里 |
|--------|--------|
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
