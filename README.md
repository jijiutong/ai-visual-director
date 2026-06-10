# AI Visual Director

<p align="center">
  <a href="./README.md"><b>中文</b></a> · <a href="./README.en.md">English</a>
</p>

> 把一段故事变成电影级角色卡、场景图、分镜图、视频 Prompt 和执行包。
> 输入文字 / Markdown / Obsidian 项目 → 输出可直接喂 AI 绘图/视频工具的专业方案。

---

## 这是什么

AI Visual Director 是一个 Claude Code Skill。粘贴故事 → 自动生成专业视觉开发方案；读取 Obsidian / Markdown 项目 → 批量生成章节视频包。

主要能力：

- 🎬 **一键故事转视频** — 自动提取故事 → 规划资产 → 输出完整视频执行包
- 🧭 **输入源路由** — 支持直接粘贴 / Markdown / Obsidian / frontmatter / 批量章节
- 🎞️ **故事转分镜** — 自动提取角色/场景/冲突 → 完整故事板 + 灯光/运镜/色彩
- 👤 **角色设计** — 6 模块角色设定卡 + DNA 锚定
- 🏯 **场景设计** — 全能参考图 + 导演标注版
- 🎥 **视频 Prompt** — 一条完整 Prompt 直喂 Seedance / Runway / 可灵
- 🎨 **50+ 视觉风格** — 东方玄幻 / 王家卫 / 赛博 / 水墨 / 3D动画…
- 🧩 **40 种版式样式** — 全能版 / 角色板 / 场景版 / 分镜板
- 📱 **多平台输出** — GPT Image / Midjourney 主推，兼容 SD / DALL-E

---

## 安装

```bash
# 1. 克隆项目
git clone https://github.com/jijiutong/ai-visual-director.git

# 2. 复制 skill 文件到 Claude Code skills 目录
mkdir -p ~/.claude/skills/ai-visual-director
cp -r ai-visual-director/sources ai-visual-director/engines ai-visual-director/knowledge ai-visual-director/rules ai-visual-director/platforms ai-visual-director/templates ai-visual-director/state ai-visual-director/projects ai-visual-director/imitation ai-visual-director/sub-skills ai-visual-director/docs ai-visual-director/examples ai-visual-director/SKILL.md ~/.claude/skills/ai-visual-director/
```

安装后重启 Claude Code，输入 `/create` 即可使用。

---

## 30 秒上手

```text
/create 一键生成 雨夜古寺，两名剑客在佛像前对峙，师父发现徒弟已经入魔，二人拔剑相向。15s 7镜
```

输出：故事摄入 → 镜头预算 → 角色锚点 → 场景锚点 → 分镜图 Prompt → 视频 Prompt → 执行清单

---

## 6 个核心入口

| 命令 | 用途 | 示例 |
|------|------|------|
| `/create` | 一键总编排 | `/create 一键生成 [故事] 15s 7镜` |
| `/source` | Obsidian / Markdown 项目读取 | `/source 从 Obsidian 读取 剑道独尊` |
| `/storyboard` | 核心资产：故事板 / 分镜图 | `/storyboard [故事]` |
| `/character` | 核心资产：角色卡 | `/character 角色名 描述` |
| `/scene` | 核心资产：场景图 | `/scene 场景描述` |
| `/video` | 视频 Prompt / 执行包 | `/video 出视频 prompt` |

`/style` 和 `/poster` 仍可用，作为风格动作和海报输出格式保留。

核心资产关系：`角色卡` 锁定“谁”，`场景图` 锁定“在哪”，`分镜图/故事板` 锁定“怎么拍”，`/create` 负责把三者编排成完整视频执行包。

## 常用动作

| 指令 | 用途 |
|------|------|
| `一键生成` | 自动选择最佳方案，直接出视频执行包 |
| `多版本` | 输出 A/B/C 三版对比 |
| `看全部` | 浏览全部风格与格式 |
| `第X镜...` | 精准修改指定镜头 |
| `换成X风格但保持角色` | 风格迁移 |
| `从 Obsidian 读取` | 读取项目/章节并进入批量链路 |
| `评分` | Prompt 质量打分 + 优化建议 |
| `检查连续性` | 检查角色、场景、时间线是否断裂 |
| `压缩到MJ` / `压缩到SD` | 适配平台长度限制 |

---

## 典型示例

| # | 题材 | 故事 | 风格 | 示例 |
|---|------|------|------|------|
| 01 | 武侠 | 雨夜古寺师徒对决 | 东方玄幻 | `examples/video/01-rainy-temple-action.md` |
| 02 | 都市 | 深夜便利店前任偶遇 | 都市情绪 | `examples/video/02-convenience-store-mood.md` |
| 03 | 科幻 | 废弃太空港仿生少女 | 暗黑科幻 | `examples/video/03-spaceport-countdown.md` |
| 04 | 治愈 | 蓝色桌宠送牛奶 | 3D动画电影风 | `examples/video/04-desk-pet-comedy.md` |

→ 📺 **完整 Demo**：从一句话到视频检查，9 步全流程未跳 → [`demo/zero-to-one-demo.md`](demo/zero-to-one-demo.md)

---

## 高级用法导航

| 想了解 | 看这里 |
|--------|--------|
| 全部命令 + 全局调整 + API | [docs/commands.md](docs/commands.md) |
| 普通用户完整使用方式 | [docs/user-guide.md](docs/user-guide.md) |
| 14 条核心规则与限制 | [docs/rules.md](docs/rules.md) |
| 完整 Skill 文档 | [docs/SKILL.md](docs/SKILL.md) |
| 系统架构 / 引擎分层 | [docs/system-architecture.md](docs/system-architecture.md) |
| 视频工作流（转视频/续写/检查） | [docs/video-workflow.md](docs/video-workflow.md) |
| Obsidian 读取 / 批量处理 / 续集 | [docs/obsidian-workflow.md](docs/obsidian-workflow.md) |
| 各平台 Prompt 格式参考 | [docs/platform-prompts.md](docs/platform-prompts.md) |
| 更多样例 | [examples/](examples/) |

## 系统结构

| 目录 | 职责 |
|------|------|
| `sources/` | 直接粘贴、Obsidian、Markdown、frontmatter 等输入源处理 |
| `engines/` | 路由、故事摄入、镜头预算、视频导演、资产规划、评分、压缩等决策引擎 |
| `knowledge/` | 角色、场景、镜头、材质、声音、时代等知识库 |
| `rules/` | 一致性、质量、文化准确性、负面词、规则补丁 |
| `templates/` | 全案板、角色卡、场景卡、分镜页等最终 Prompt 模板 |
| `platforms/` | GPT Image / Midjourney / SD / 视频平台适配 |
| `state/` | 变量注册、资产映射、镜头状态、台词映射、项目依赖图 |
| `projects/` | 项目模板、项目清单、可恢复的项目运行时结构 |
| `imitation/` | 导演/工作室风格模仿库 |
| `sub-skills/` | `/create`、`/source`、`/storyboard`、`/character`、`/scene`、`/video` 等子入口 |

> 发布 / 安装时必须包含 `SKILL.md`、`sources/`、`engines/`、`knowledge/`、`rules/`、`templates/`、`platforms/`、`state/`、`projects/`、`imitation/`、`sub-skills/`、`docs/`、`examples/`。
> `.agents/` 和 `.claude/` 是本机安装副本/缓存目录，不应进入发布包。

---

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| GPT Image | ✅ 主推 | 长自然语言 Prompt、角色卡、分镜全案 |
| Midjourney | ✅ 主推 | 视觉风格图、海报、关键帧 |
| SD / SDXL / SD3 | 📝 模板兼容 | 正向/负向 Prompt，本地参数用户自行调整 |
| DALL-E 3 | 📝 模板兼容 | 自然语言图像 Prompt |
| ComfyUI / IP-Adapter | 🔧 社区扩展 | 不内置本地部署，欢迎 PR / Issue |

> 这是一个 Prompt Workflow Skill，不是本地出图框架。
> 遇到任何平台兼容问题 → [提交 Issue](https://github.com/jijiutong/ai-visual-director/issues)

---

## 测试

90 条回归测试，全部通过。详见 [CHANGELOG.md](CHANGELOG.md)。

---

## License

MIT
