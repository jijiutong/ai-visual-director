---
name: source
description: Input-source and project ingestion. Route: sources/ → story-intake → state/variable-registry. Use /source for Obsidian, Markdown files, frontmatter, pasted long text, folders, and batch chapter processing before generating visual/video packages.
---

# Source — 输入源 / 项目读取

`/source` 负责把外部内容整理成统一故事结构，再交给 `/create` 或其他目标入口。

## 触发方式

- `/source 从 Obsidian 读取 [路径/项目名]`
- `/source Obsidian 读取 [项目名] 全部 15s 7镜`
- `/source 读取 [Markdown 文件]`
- `/source 解析 frontmatter`
- `/source 批处理 [章节范围]`

## 支持来源

| 来源 | 处理文件 |
|------|----------|
| 直接粘贴 | `sources/paste-input.md` |
| Obsidian Vault | `sources/obsidian-ingest.md` |
| Markdown 文件 | `sources/obsidian-ingest.md` 或 `sources/frontmatter-parser.md` |
| YAML frontmatter | `sources/frontmatter-parser.md` |
| 批量章节 | `sources/obsidian-ingest.md` + `engines/batch-chapter.md` |

## 输出

统一输出为：

```text
输入源处理结果
→ 故事正文
→ 项目结构
→ 角色笔记
→ 场景笔记
→ frontmatter 元数据
→ 建议处理方式
→ 写入 state/variable-registry（project.title, project.genre, characters, scene）
```

之后按用户目标路由：

- 要完整视频包 → `/create`
- 只要分镜 → `/storyboard`
- 只要角色 → `/character`
- 只要场景 → `/scene`

## 交互规则

Obsidian 或批量章节只允许最多 1 次确认：章节范围、每章时长、每章镜数合并成一个问题。用户已经给出 `全部 15s 7镜` 时，不再追问。
