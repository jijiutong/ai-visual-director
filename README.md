# AI Visual Director

<p align="center">
  <a href="./README.md"><b>中文</b></a> · <a href="./README.en.md">English</a>
</p>

> 把一段故事变成电影级分镜、角色设定、场景概念和视频 Prompt。
> 输入一句文字 → 输出可直接喂 AI 绘图/视频工具的专业方案。

---

## 能力

- 🎬 **故事转分镜** — 自动提取角色/场景/冲突 → 完整故事板 + 灯光/运镜/色彩
- 👤 **角色一致性** — 6 模块角色设定卡 + 20 字段 DNA 锚定 + 8 种一致性锁定方法
- 🏯 **场景一致性** — 7 种锁场景方法 + 全景图 + 导演标注版
- 🎥 **视频 Prompt** — 一条完整 Prompt 直喂 Seedance / Runway / 可灵
- 🎨 **50+ 视觉风格** — 东方玄幻 / 王家卫 / 赛博 / 水墨 / 3D动画…
- 📐 **10 种输出格式** — 全案板 / 角色卡 / 场景卡 / 海报 / 漫画分镜 / 情绪板…
- 📱 **多平台 Prompt 输出** — GPT Image / Midjourney 主推，同时兼容 SD / DALL-E 等平台

---

## 30 秒上手

```text
/storyboard 一键生成 雨夜古寺，两名剑客在佛像前对峙，师父发现徒弟已经入魔，二人拔剑相向。15s 7镜
```

输出：片名/类型 → 情绪曲线+主色调 → 角色锚点 → 场景锚点 → 完整 7 镜分镜表 → 可复制 Prompt

### 然后你可以

```text
/character 墨渊 黑衣剑客，冷峻，长发，曾是正道第一剑修
/scene 雨夜古寺大殿，破败佛像，烛火摇晃
/character 顾长空 中年剑宗宗师，灰白鬓发，蓑衣，师父

第3镜更暗一点
第5镜雨改雪
第7镜更史诗

换成王家卫风格但保持角色

出视频 prompt
```

---

## 6 个主命令

| 命令 | 功能 | 示例 |
|------|------|------|
| `/storyboard` | 故事板生成 | `/storyboard 一键生成 [故事] 15s 7镜` |
| `/character` | 角色设计 | `/character 角色名 描述` |
| `/scene` | 场景设计 | `/scene 场景描述` |
| `/video` | 视频 Prompt | `出视频 prompt` |
| `/style` | 风格调整 | `换成水墨风但保持角色` |
| `/poster` | 海报生成 | `/poster [故事]` |

### 全局调整

| 指令 | 效果 |
|------|------|
| `更燃` `更虐` `更甜` `更丧` `更暧昧` `更恐怖` `更史诗` | 情绪/Mood 滑块 |
| `第X镜 更暗/改天气/更史诗` | 精准单镜修改 |
| `换成 [风格] 但保持角色` | 风格迁移（不改剧情） |
| `简洁` | 精简输出 |
| `看全部` | 浏览 53 种风格 |

---

## 示例

| # | 题材 | 故事 | 推荐风格 | 评分 |
|---|------|------|---------|------|
| 01 | 武侠 | 雨夜古寺师徒对峙拔剑 | 东方玄幻 | 9.7 |
| 02 | 都市 | 深夜便利店前任偶遇 | 都市情绪 | 9.6 |
| 03 | 科幻 | 废弃太空港仿生少女 | 暗黑科幻 | 9.6 |
| 04 | 治愈 | 蓝色桌面宠物送牛奶 | 3D动画电影风 | 10 |

→ 更多见 `examples/`

---

## 项目结构

```
ai-visual-director/
├── SKILL.md                  ← 主 Skill（完整版）
├── .claude/skills/           ← 运行时 Skill
│   ├── ai-visual-director/   ← 主 Skill（精简执行版）
│   ├── storyboard/           ← 故事板生成
│   ├── character/            ← 角色设计
│   └── scene/                ← 场景设计
├── sub-skills/               ← 6 个子技能模块
├── docs/                     ← 文档
│   ├── SKILL.md              ← 完整 Skill 文档
│   ├── commands.md           ← 命令参考
│   ├── rules.md              ← 14 条规则速查
│   ├── user-guide.md         ← 用户说明书
│   ├── video-workflow.md     ← 视频工作流文档
│   ├── obsidian-workflow.md  ← Obsidian/批量/续集文档
│   └── platform-prompts.md   ← 多平台 Prompt 格式参考
├── references/               ← 51 个参考文件
├── templates/                ← 7 个输出模板
├── rules/                    ← 规则补丁
│   ├── skill-patches.md      ← 10 条初始补丁
│   └── skill-patches-v0.6.md ← 4 条 v0.6 补丁
├── tests/                    ← 回归测试
│   ├── core/                 ← 4 核心回归
│   ├── genre/                ← 36 题材泛化
│   ├── stress/               ← 迁移/编辑压力测试
│   ├── obsidian-fixtures/    ← Obsidian 模拟目录
│   ├── platform-compatibility.md ← 25 项平台格式检查
│   └── results/              ← 测试报告
├── examples/                 ← 黄金样例 + video/series
├── CHANGELOG.md              ← 版本记录
└── release-checklist.md      ← 发布验收清单
```

---

## 多平台 Prompt 输出

AI Visual Director 主要面向 **GPT Image** 与 **Midjourney** 使用场景，同时提供 Stable Diffusion / SDXL / SD3 / DALL-E 3 等平台的 Prompt 输出模板。

**说明**：
- GPT Image / Midjourney 是当前主要适配方向。
- SDXL / SD3 / DALL-E 3 提供 Prompt 结构兼容，不保证所有参数在不同环境下完全一致。
- ComfyUI / ControlNet / IP-Adapter 等本地工作流属于扩展用法，欢迎社区自行适配。
- 如果你在某个平台遇到 Prompt 不兼容、参数无效、效果偏差等问题，欢迎 [提交 Issue](https://github.com/jijiutong/ai-visual-director/issues)。

| 平台 | 状态 | 说明 |
|------|------|------|
| GPT Image | ✅ 主推 | 适合长自然语言 Prompt、角色卡、场景卡、分镜全案 |
| Midjourney | ✅ 主推 | 适合视觉风格图、海报、关键帧、场景概念图 |
| Stable Diffusion / SDXL | 📝 模板兼容 | 输出正向/负向 Prompt，本地参数需用户自行调整 |
| SD3 / SD3.5 | 📝 模板兼容 | 提供基础 Prompt 结构，不保证不同环境完全一致 |
| DALL-E 3 | 📝 模板兼容 | 兼容自然语言图像 Prompt |
| ComfyUI / ControlNet / IP-Adapter | 🔧 社区扩展 | 不默认内置本地部署，欢迎 PR / Issue |

---

## 测试与稳定性

- **90 条测试，全部通过**
- 4 条核心回归 + 36 条题材泛化（12 题材 × 3 样本）
- 28 条高频文本工作流 + 28 条视频工作流
- 5 条批量/Obsidian/续集 + 25 条平台格式兼容
- 14 条核心规则 + 14 条规则补丁

---

## 版本

当前：**v1.0.0**

- [CHANGELOG.md](CHANGELOG.md)
- [发布验收清单](release-checklist.md)

---

## License

MIT
