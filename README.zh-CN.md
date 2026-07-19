# AI Visual Director

<p align="center">
  <strong>把故事变成可执行影像方案的 AI 视觉导演系统</strong>
</p>

<p align="center">
  从角色与场景锚定，到分镜设计、视频 Prompt、平台适配与质量控制。<br>
  一套面向 AI 电影、短剧、漫剧和连续内容生产的 Prompt Production OS。
</p>

<p align="center">
  <a href="./README.md">English</a>
  ·
  <a href="./README.zh-CN.md"><strong>中文</strong></a>
  ·
  <a href="./docs/usage.md">使用手册</a>
  ·
  <a href="./docs/capabilities.md">能力白皮书</a>
  ·
  <a href="./docs/system-architecture.md">系统架构</a>
</p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-111827">
  <img alt="Claude Code Skill" src="https://img.shields.io/badge/Claude_Code-Skill-D97757">
  <img alt="Prompt Production OS" src="https://img.shields.io/badge/Prompt-Production_OS-0F766E">
</p>

---

> 一个故事进来，角色卡、场景图、故事板、视频 Prompt 和执行包出去。
> 它不是灵感玩具，而是一条带命令闸门、格式合同、状态锁定、资产分层和多维 QC 的视觉生产线。

```text
Story
  → Intake
  → Director Decisions
  → Character & Scene Anchors
  → Storyboard
  → Platform Prompts
  → Quality Control
  → Execution Package
```

## 为什么需要它

AI 图像和视频模型已经足够强，但生产中的难点从来不只是“生成一张好看的图”：

- 同一角色跨镜头变脸，服装、道具和体态持续漂移
- 场景空间、光源方向与材质在镜头间失去连续性
- 展示板、营销图和视频参考图混用，导致模型读入噪声
- Prompt 在反复修改后越写越长，创意边界却越来越模糊
- 不同视频平台的参考图、首尾帧和文本规则无法直接复用

AI Visual Director 将导演工作流编码成一套可检查的约束系统：

```text
完整能力保留
→ 默认权限收敛
→ 创意显式触发
→ 用户确认后写回
→ 视频阶段只组装，不重新设计
```

## 核心能力

| 能力 | 覆盖范围 |
|---|---|
| **53 种视觉风格** | 电影、动画、东方美学、科幻、故障艺术及导演方法参考 |
| **44 种版式布局** | 全案板、角色板、场景板、时间轴、HUD、竖屏和关键帧序列 |
| **140+ 镜头技术** | 景别、运镜、角度、焦段、画幅、转场与特殊视角 |
| **19 套编号系统** | 风格、情绪、色彩、表情、肢体、环境、材质、声音等自动映射 |
| **8 种角色一致性方法** | 角色卡、五视图、表情组、服装武器细节、DNA 与参考锚定 |
| **7 种场景一致性方法** | 全能参考板、九宫格、全景、蓝图、环绕截图与宽幅锚点 |
| **5 个视频平台** | Seedance、Runway、可灵、Luma、Pika 的差异化 Prompt 输出 |
| **12 项视频 QC** | 角色、场景、光照、道具、动作、转场、字幕、声音与资产用途 |

## 30 秒开始

### 安装

```bash
npx ai-visual-director
```

也可以使用安装脚本或从源码安装：

```bash
curl -fsSL https://raw.githubusercontent.com/jijiutong/ai-visual-director/main/install.sh | sh
```

```bash
git clone https://github.com/jijiutong/ai-visual-director.git
cd ai-visual-director
sh install.sh
```

重启 Claude Code，然后输入：

```text
/create 雨夜古寺，两名剑客在佛像前对峙。师父发现徒弟已经入魔，二人拔剑相向。15s，7 镜。
```

默认执行 `/create standard`：

```text
故事摄入 → 镜头预算 → 角色锚点 → 场景锚点
→ 故事板 → 视频 Prompt → QC → 执行清单
```

完整操作方式见 [使用手册](./docs/usage.md)。

## 选择你的入口

| 你想完成的任务 | 命令 | 深入阅读 |
|---|---|---|
| 从故事一键生成完整执行包 | `/create` | [一键编排](./sub-skills/create/SKILL.md) |
| 读取 Obsidian、Markdown 或粘贴内容 | `/source` | [输入源系统](./sources/README.md) |
| 锁定角色外观与角色 DNA | `/character` | [角色工作流](./sub-skills/character/SKILL.md) |
| 锁定场景空间、材质与光照 | `/scene` | [场景工作流](./sub-skills/scene/SKILL.md) |
| 设计镜头、故事板与全案板 | `/storyboard` | [分镜工作流](./sub-skills/storyboard/SKILL.md) |
| 组装多平台视频 Prompt | `/video` | [视频工作流](./sub-skills/video/SKILL.md) |
| 设计台词、字幕与口型节奏 | `/dialogue` | [台词引擎](./engines/dialogue-engine.md) |
| 设计环境音、拟音、音乐与混响 | `/sound` | [声音引擎](./engines/sound-engine.md) |
| 探索风格、融合或导演方法 | `/style` | [风格工作流](./sub-skills/style/SKILL.md) |
| 生成独立营销海报 | `/poster` | [海报工作流](./sub-skills/poster/SKILL.md) |

治理命令：`/lock` · `/commit` · `/unlock` · `/check` · `/repair`

## 三档生产模式

| 能力 | `fast` | `standard` | `full` |
|---|:---:|:---:|:---:|
| 故事摄入与镜头预算 | ✓ | ✓ | ✓ |
| 角色与场景锚定 | 内联 DNA | 标准模板 | 标准模板 |
| 故事板与视频 Prompt | 精简 | 完整 | 完整 |
| 台词与声音设计 | - | 按需 | ✓ |
| 全案板与完整质检 | - | ✓ | ✓ |
| 适合场景 | 快速验证 | 正式制作 | 完整交付 |

## 系统如何保持稳定

系统采用四层能力模型。创意能力并未被删除，只是拥有不同的默认权限：

| 层级 | 调用策略 | 职责 |
|---|---|---|
| **稳定治理层** | 始终启用 | 路由、格式合同、锁定状态、Prompt QC、自动修复 |
| **资产生产层** | 按命令调用 | 角色、场景、分镜、视频、台词、声音、海报 |
| **导演增强层** | 项目模式 | 镜头预算、节奏、情绪曲线、色彩叙事、运动物理 |
| **探索发散层** | 显式触发 | 多版本、风格融合、迁移、导演方法、系列续写 |

状态生命周期：

```text
draft       默认草稿，不污染主状态
  ↓
locked      用户确认后锁定，不允许自动覆盖
  ↓
committed   正式写入项目状态并持久化
```

进一步了解：[能力边界](./docs/capabilities.md) · [状态管理](./state/README.md) · [格式合同](./rules/format-contract.md)

## 架构概览

```mermaid
flowchart LR
    A[用户故事] --> B[输入源与故事摄入]
    B --> C[命令闸门与格式合同]
    C --> D[导演与资产规划引擎]
    D --> E[角色 / 场景 / 分镜资产]
    E --> F[状态与一致性锚定]
    F --> G[平台 Prompt 组装]
    G --> H[评分 / QC / 自动修复]
    H --> I[执行包]
```

| 模块 | 作用 | 文档入口 |
|---|---|---|
| `SKILL.md` | 总控路由、命令边界与执行契约 | [总控说明](./SKILL.md) |
| `sources/` | 粘贴、Markdown、Obsidian 与 frontmatter 摄入 | [输入源](./sources/README.md) |
| `engines/` | 路由、导演决策、规划、评分、修复与打包 | [引擎地图](./engines/README.md) |
| `docs/` | 使用手册、能力白皮书、系统架构与命令参考 | [文档中心](./docs/README.md) |
| `state/` | 状态注册、资产映射、镜头快照与项目依赖图 | [状态管理](./state/README.md) |
| `rules/` | 格式、一致性、编号、质量与平台硬约束 | [质量规则](./rules/qc.md) |
| `templates/` | 角色卡、场景卡、故事板、海报和声音模板 | [模板目录](./templates/README.md) |
| `knowledge/` | 镜头、灯光、构图、材质、表演、声音等知识库 | [知识库](./knowledge/README.md) |
| `platforms/` | 图像与视频平台适配、API 集成 | [平台适配](./platforms/README.md) |
| `sub-skills/` | 面向用户命令的独立工作流 | [子技能](./sub-skills/README.md) |
| `imitation/` | 导演与工作室视觉方法参考库 | [风格参考](./imitation/README.md) |
| `examples/` | 示例项目与参考输出 | [示例](./examples/) |
| `projects/` | 长片、连续剧与多段项目持久化 | [项目系统](./projects/README.md) |
| `.agents/` | Agent 配置目录 | — |
| `.claude/` | Claude Code 配置目录 | — |

完整数据流与文件归位规则见 [系统架构](./docs/system-architecture.md)。

## 文档中心

| 文档 | 适合谁 | 你会得到什么 |
|---|---|---|
| [使用手册](./docs/usage.md) | 第一次使用或查命令 | 命令选择、三档模式、常见用法与状态写回 |
| [能力白皮书](./docs/capabilities.md) | 想理解系统边界 | 四层能力模型、资产用途、默认开关与调用条件 |
| [系统架构](./docs/system-architecture.md) | 维护者与贡献者 | 执行链路、模块职责、目录结构与扩展原则 |
| [主技能契约](./SKILL.md) | Skill 开发者 | 总路由、治理规则、模块映射与全局负面清单 |
| [文档索引](./docs/README.md) | 所有人 | 从任务出发快速定位权威文档 |

## 平台覆盖

| 图像生成 | 视频生成 |
|---|---|
| GPT Image · Midjourney · DALL-E · SDXL / SD3 | Seedance · Runway · 可灵 |
| Flux · Ideogram · 通义万相 · Recraft | Luma · Pika · ComfyUI / IP-Adapter 扩展 |

平台配置和限制见 [平台适配文档](./platforms/README.md)。

## License

[MIT](./LICENSE)
