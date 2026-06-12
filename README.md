# AI Visual Director

<p align="center">
  <b>Prompt Production OS</b> — 把故事变成电影的 AI 导演系统<br>
  <sub>53 视觉风格 · 44 版式布局 · 140+ 镜头技术 · 5 视频平台 · 零幻觉治理</sub>
</p>

<p align="center">
  <a href="./README.md"><b>中文</b></a> · <a href="./README.en.md">English</a>
</p>

---

一个故事进来，角色卡、场景图、全案板、分镜图、视频 Prompt 出去。

不是灵感生成器。是带**命令闸门、格式合同、资产分层、状态锁定、多维度 QC** 的生产线。

```text
故事 → 摄入 → 镜头预算 → 导演决策 → 资产规划 → 一致性锚定 → 平台适配 → QC → 执行包
```

## 为什么是它

AI 生图/生视频工具很强，但**稳定性**是最大的问题。同一个角色换一帧就变脸，换一个镜头场景就漂移，Prompt 写着写着就开始自由发挥。

AI Visual Director 做的事：**把导演工作流编码成约束系统**。每一条 Prompt 生成前先过闸门、读锁定状态、按格式合同走——不是限制创意，是把创意锁死在可执行的范围里。

```text
完整能力保留 → 默认权力收敛 → 创意显式触发 → 状态确认后写回 → 视频只组装不重设计
```

## 能力数字

| | |
|---|---|
| **53** 视觉风格 | 黑金动作 → 吉卜力治愈 → 故障艺术，含王家卫/张艺谋/Wes Anderson/Nolan 导演风格 |
| **44** 版式布局 | 影视工业全案板、科幻 HUD 控制台、神话巨物四镜、横幅时间轴、留白东方… |
| **140+** 镜头技术 | 15 景别 × 66 运镜 × 21 角度 × 11 焦段 × 10 画幅 × 10 转场 × 8 特殊视角 |
| **19** 编号体系 | VS/EC/CN/CP/ME/BL/EV/WT/MT/CR/PR/HE/TR/SD/SE/FX/MU/RS/DR — 全自动填充 |
| **5** 视频平台 | Seedance · Runway · 可灵 · Luma · Pika，一套故事板多平台输出 |
| **8** 角色一致性方法 | 6 模块角色卡 → 面部 5 角度 → 12 表情 → 服装武器细节 → IP-Adapter → DNA 锚定 |
| **7** 场景一致性方法 | 全能参考板 → 九宫格 → 720° 全景 → 俯拍蓝图 → 环绕截图 → 双联宽幅 |
| **36** 跨段衔接技法 | 图形匹配剪 · J-Cut · L-Cut · 冷冻帧 · 裂像转场 · 色彩抽离… 尾帧→首帧锁定 |
| **12** 项视频 QC | 场景/角色/光照/道具/动作/画面/转场/字幕/材质/视觉干净度/视觉可用性/台词音效 |

## 安装

```bash
npx ai-visual-director
```

或：

```bash
curl -fsSL https://raw.githubusercontent.com/jijiutong/ai-visual-director/main/install.sh | sh
```

```bash
git clone https://github.com/jijiutong/ai-visual-director.git && cd ai-visual-director && sh install.sh
```

重启 Claude Code，输入 `/create`。

## 30 秒

```text
/create 雨夜古寺，两名剑客在佛像前对峙，师父发现徒弟已入魔，二人拔剑相向。15s 7镜
```

默认 `/create standard`：

```text
故事摄入 → 角色锚点 → 场景锚点 → 全案板 Prompt → 视频 Prompt → QC → 执行清单
```

## 命令

| 命令 | 做什么 | 不管什么 |
|------|--------|----------|
| `/create` | 一键总编排，三档：fast / standard / full | 自动选择档位 |
| `/character` | 角色卡，8 种一致性方法 | 不管音效、续写、多版本 |
| `/scene` | 场景图，7 种空间锁定方法 | 不管角色脸 |
| `/storyboard` | 全案板、分镜图、镜头设计 | 不管重写角色 DNA |
| `/video` | 视频 Prompt + 执行包，5 平台适配 | 只组装，不重设计 |
| `/source` | Obsidian / Markdown / 粘贴 / 批处理输入 | 只做结构化 |
| `/dialogue` | 台词脚本 + 节奏标注 + 字幕方案 | 按镜头写入对话映射 |
| `/sound` | 环境音 / 拟音 / 音乐 / 混响设计 | 16 SE × 20 FX × 12 MU × 8 RS |
| `/poster` | 电影海报，10 风格 × 3 画幅 | marketing_asset，不进视频 |
| `/style` | 53 风格浏览、融合、迁移、14 导演模仿 | 默认 derived，不写回 |
| `/compact` | Token 压缩、上下文管理、视觉去噪 | 不重做角色和故事 |

治理命令：`/lock` `/commit` `/unlock` `/check`

## `/create` 三档

| | fast | standard ⭐ | full |
|---|------|------------|------|
| 故事摄入 | ✅ | ✅ | ✅ |
| 镜头预算 | ✅ | ✅ | ✅ |
| 角色卡 | 内联 DNA | 走模板 | 走模板 |
| 场景图 | 内联 DNA | 走模板 | 走模板 |
| 全案板 | — | ✅ | ✅ |
| 视频 Prompt | ✅ | ✅ | ✅ |
| 台词 + 音效 | — | — | ✅ |
| 质检报告 | — | ✅ | ✅ |
| 场景 | 快速验证 | 正式出图 | 完整交付 |

## 治理架构

AI Visual Director 是四层约束系统：

| 层级 | 策略 | 做什么 |
|------|------|--------|
| **稳定层** | always on | command-gate · format-contract · lock-state · prompt-qc · asset-qc |
| **资产层** | 命令驱动 | 角色卡 · 场景图 · 故事板 · 视频 prompt · 台词 · 音效 · 海报 |
| **增强层** | project 模式 | 镜头 · 节奏 · 情绪曲线 · 色彩叙事 · 运动物理 · 连续性 |
| **探索层** | 显式触发 | 多版本 · 风格融合 · 导演模仿 · 风格迁移 · 系列续写 · Mood 滑块 |

```
draft（默认，不写回） → locked（确认，禁止自动修改） → committed（持久化）
```

## 系统

| 目录 | 是什么 |
|------|--------|
| `engines/` | 40 个决策引擎 — 路由、闸门、导演、规划、评分、修复、打包 |
| `rules/` | 19 个规则文件 — 格式合同、编号体系、QC、一致性、负面词、平台红线 |
| `templates/` | 12 个 Prompt 模板 — 全案板、角色卡、场景卡、分镜图、海报、台词、音效 |
| `knowledge/` | 32 个知识库 — 镜头、灯光、构图、表情、材质、声音、时代、道具 |
| `sub-skills/` | 9 个子入口 — create / character / scene / storyboard / video / source / poster / style / compact |
| `state/` | 14 个状态文件 — 变量注册、锁定、资产映射、镜头状态、对话/音效映射、依赖图 |
| `imitation/` | 14 位导演风格库 — 王家卫/维伦纽瓦/诺兰/吉卜力/皮克斯/张艺谋… |

## 平台

| 图片 | 视频 |
|------|------|
| GPT Image 2 · Midjourney v6/7 | Seedance · Runway Gen-4 · 可灵 |
| DALL-E 3 · SDXL · SD3 | Luma · Pika |
| Flux · Ideogram · 通义万相 · Recraft | ComfyUI / IP-Adapter（社区扩展） |

## License

MIT
