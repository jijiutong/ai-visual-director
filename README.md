# AI Visual Director

<p align="center">
  <a href="./README.md"><b>中文</b></a> · <a href="./README.en.md">English</a>
</p>

> 把一段故事变成电影级分镜、角色设定、场景概念和视频 Prompt。
> 输入文字 → 输出可直接喂 AI 绘图/视频工具的专业方案。

---

## 这是什么

AI Visual Director 是一个 Claude Code Skill。粘贴故事 → 自动生成专业视觉开发方案。

主要能力：

- 🎬 **故事转分镜** — 自动提取角色/场景/冲突 → 完整故事板 + 灯光/运镜/色彩
- 👤 **角色设计** — 6 模块角色设定卡 + DNA 锚定
- 🏯 **场景设计** — 全能参考图 + 导演标注版
- 🎥 **视频 Prompt** — 一条完整 Prompt 直喂 Seedance / Runway / 可灵
- 🎨 **50+ 视觉风格** — 东方玄幻 / 王家卫 / 赛博 / 水墨 / 3D动画…
- 🧩 **40 种版式样式** — 全能版 / 角色板 / 场景版 / 分镜板
- 📱 **多平台输出** — GPT Image / Midjourney 主推，兼容 SD / DALL-E

---

## 30 秒上手

```text
/storyboard 一键生成 雨夜古寺，两名剑客在佛像前对峙，师父发现徒弟已经入魔，二人拔剑相向。15s 7镜
```

输出：片名/类型 → 情绪曲线 → 角色锚点 → 场景锚点 → 完整分镜表 → 可复制 Prompt

---

## 常用命令

| 命令 | 用途 | 示例 |
|------|------|------|
| `/storyboard` | 故事板 / 分镜生成 | `/storyboard 一键生成 [故事] 15s 7镜` |
| `/character` | 角色设定 | `/character 角色名 描述` |
| `/scene` | 场景概念 | `/scene 场景描述` |
| `/video` | 视频 Prompt | `出视频 prompt` |
| `/style` | 风格调整 | `换成水墨风但保持角色` |
| `/poster` | 海报生成 | `/poster [故事]` |

## 常用动作

| 指令 | 用途 |
|------|------|
| `一键生成` | 自动选择最佳方案，直接出故事板 |
| `多版本` | 输出 A/B/C 三版对比 |
| `看全部` | 浏览全部风格与格式 |
| `第X镜...` | 精准修改指定镜头 |
| `换成X风格但保持角色` | 风格迁移 |
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
| `engines/` | 风格、版式、情绪、节奏、评分、压缩等决策引擎 |
| `knowledge/` | 角色、场景、镜头、材质、声音、时代等知识库 |
| `rules/` | 一致性、质量、文化准确性、负面词、规则补丁 |
| `templates/` | 全案板、角色卡、场景卡、分镜页等最终 Prompt 模板 |
| `platforms/` | GPT Image / Midjourney / SD / 视频平台适配 |
| `sub-skills/` | `/storyboard`、`/character`、`/scene` 等子入口 |

> 发布 / 安装时必须包含 `SKILL.md`、`engines/`、`knowledge/`、`rules/`、`templates/`、`platforms/`、`sub-skills/`、`docs/`、`examples/`。
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
