---
name: avd/source
description: 【AI视觉导演】输入源读取 — Obsidian/Markdown/粘贴/批处理，统一输出到state/variable-registry
---

# Source — 输入源 / 项目读取

`/avd/source` 负责把外部内容整理成统一故事结构，再交给 `/avd/create` 或其他目标入口。

## 触发方式

- `/avd/source [路径/项目名]`
- 直接说 "读取项目"、"导入"、"从 Obsidian"

## ⚠️ 路由规则

| 用户说法 | 行为 |
|---------|------|
| `/avd/source`（未指定来源） | **展示输入源选单**，等用户选来源类型 |
| `/avd/source Obsidian` / `/avd/source 从 Obsidian` | 读取配置 `OBSIDIAN_VAULT_PATH`，扫描 Vault 目录，列出项目供用户选 |
| `/avd/source 文件 [路径]` | 直接读取指定 Markdown 文件 |
| `/avd/source 粘贴` | 提示用户粘贴故事内容 |
| `/avd/source 批处理 [章节范围]` | 批量处理，调用 `engines/batch-chapter.md` |

**输入源选单**：

| 编号 | 来源 | 说明 |
|------|------|------|
| 1 | Obsidian Vault | 从 `OBSIDIAN_VAULT_PATH` 扫描项目 |
| 2 | Markdown 文件 | 直接读取 .md 文件 |
| 3 | 直接粘贴 | 粘贴故事/剧本到对话 |
| 4 | 批处理章节 | 批量处理整章小说 |

回复编号选择来源。

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

- 要完整视频包 → `/avd/create`
- 只要分镜 → `/avd/storyboard`
- 只要角色 → `/avd/character`
- 只要场景 → `/avd/scene`

## Obsidian 支持的笔记结构

| 结构类型 | 说明 | 自动行为 |
|---------|------|---------|
| 单文件小说 | 一个笔记 = 整个故事 | 读取全文 → 提取信息 → 生成 |
| 章节文件夹 | `小说名/第1章.md` `小说名/第2章.md`... | 读取指定章节 |
| 带 frontmatter 的笔记 | 笔记顶部 YAML 元数据标注了角色/场景/类型 | 自动解析元数据，跳过部分提取步骤 |
| 角色独立笔记 | `角色/张三.md` 含角色描述 | 自动读取角色笔记作为 DNA 初始值 |
| 场景独立笔记 | `场景/昆仑山.md` 含场景描述 | 自动读取场景笔记作为场景参考 |
| 全项目模式 | 一个文件夹里「小说.md + 角色/*.md + 场景/*.md」 | 一键读取全部关联笔记，交叉引用 |

### frontmatter 自动解析

如果笔记有 YAML 头，字段直接映射到 Step 1 提取字段：

```yaml
---
title: 剑道独尊
genre: 玄幻
style: 东方玄幻
characters: [["张三", "主角", "剑修"], ["李四", "反派", "魔修"]]
scene: 昆仑山剑冢
emotion: 悲壮
structure: 三幕
target_platform: Seedance
---
```

### 长篇读取交互流程

用户说「从 Obsidian 读取 [目录名]」后，AI 先扫描，不直接生成：

```
【Obsidian 项目扫描结果】

📁 剑道独尊/
├── 第1章·剑冢觉醒.md (3200字)
├── 第2章·下山试剑.md (2800字)
├── ...
├── 角色/ (3个角色笔记)
└── 场景/ (2个场景笔记)

请选择：
1. 要处理哪些章节？回复编号，如「1-3」或「全部」
2. 每章做成多少秒的视频？回复秒数，如「15s」
   （建议：由 video-director 多维度决策）
3. 每章需要多少分镜？回复镜数，如「7镜」
   （建议：由 video-director 多维度决定）
```

### 快捷指令（跳过选择）

- 「Obsidian 读取 剑道独尊 全部 15s 7镜」 → 全章批量
- 「Obsidian 读取 第1章 30s」 → 单章，自动匹配镜数

## 交互规则

Obsidian 或批量章节只允许最多 1 次确认：章节范围、每章时长、每章镜数合并成一个问题。用户已经给出 `全部 15s 7镜` 时，不再追问。
