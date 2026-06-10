# 输入源层

统一处理所有故事输入来源，输出标准化的故事结构给 `engines/story-intake.md`。

## 输入源类型

| 来源 | 触发方式 | 处理引擎 |
|------|---------|---------|
| 直接粘贴 | 用户把故事贴到对话中 | paste-input.md |
| Obsidian Vault | "从 Obsidian 读取 [路径]" | obsidian-ingest.md |
| Markdown 文件 | 用户提供 .md 文件 | obsidian-ingest.md（复用解析逻辑） |
| 一句话故事 | 没有完整故事只有一句话 | story-intake（直接处理） |

## 统一输出

所有源处理完毕后，输出统一的故事结构：

```markdown
【输入源处理结果】

来源：[粘贴/Obsidian/文件]
类型：[单段/多段/全项目]

故事内容：
  完整文本（如有）

项目结构（如来自Obsidian）：
  📁 [项目名]/
  ├── [章节文件列表]
  ├── 角色笔记：[列表]
  └── 场景笔记：[列表]

元数据（如frontmatter解析到）：
  title / genre / style / characters / scene / emotion / target_platform

建议处理方式：
  [一次生成] / [拆N段] / [分章节批量]
```

## 处理顺序

```
输入源 → 源引擎处理 → 统一故事结构 → story-intake → shot-budget → 全链路...
                                                        ↑ 写入 state/variable-registry
```

详细链路见 `engines/task-router.md`：
- **一键视频主链路** — 完整 `/create` 流程
- **基础能力子路由** — `/character` `/scene` `/storyboard` 三条标准子链
