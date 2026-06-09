# AI Story Studio — 设计规格

> 日期：2026-06-09  
> 状态：待审查  
> 定位：小作坊创作者的 AI 短剧生产台 — 从故事到视频，在画布上跑通

---

## 一、产品定位 & 核心原则

### 一句话

AI Story Studio = 流程画布 + AI 引擎 = 在浏览器里把故事变成视频。

### 三条铁律

| # | 原则 | 说明 |
|---|------|------|
| 1 | **Obsidian 是数据库** | 故事/角色/场景全在 Vault 里，不另搞存储。产物也落在 Vault 里 |
| 2 | **引擎不变** | AI 生成能力仍在 Claude Code Skill 里，Studio 只做编排 + 展示 + 执行调度 |
| 3 | **简单优先** | 简单版是默认入口，专业版是选择。小白一进来看到的是流程卡片，不是 50+ 节点库 |

### 用户画像

- **小白创作者**：有故事想法，不会写 Prompt，想一键出片。用简单版
- **专业创作者**：有技术基础，想控制风格/平台/参数，自己搭流程。用专业版
- **场景**：15-60s 短剧、角色设计、广告大片、漫画分镜

---

## 二、配置层：config.yml

### 位置

Obsidian Vault 根目录 `config.yml`（用户可手动创建，也可在 Studio Config 面板可视化编辑）

### 完整结构

```yaml
# ========== 平台 API Key ==========
platforms:
  seedance:
    key: sk-xxx
    endpoint: https://ark.cn-beijing.volces.com
  runway:
    key: key-xxx
  kling:           # 可灵
    key: sk-xxx
  luma:
    key: xxx
  pika:
    key: xxx

# ========== 图片平台 Key ==========
image_platforms:
  nano_banana:
    key: xxx
  flux:
    key: xxx
  ideogram:
    key: xxx
  gpt_image:
    key: sk-xxx
  tongyi_wanxiang:
    key: sk-xxx
  stability_ai:
    key: sk-xxx
  comfyui:
    endpoint: http://localhost:8188
  recraft:
    key: xxx

# ========== 默认参数 ==========
defaults:
  aspect_ratio: "16:9"
  duration: 15
  shots_per_15s: 7
  style: auto            # auto = AI 推荐，或指定风格编号
  output_dir: "产物"
  shot_count: 7          # 短篇7镜

# ========== 用户偏好 ==========
preferences:
  language: zh
  mood: ""               # 更燃/更虐/更甜/更丧/更暧昧
  platform_order:
    - seedance
    - runway
    - kling
  image_platform_order:
    - gpt_image
    - flux
    - ideogram

# ========== 内置预设流程 ==========
preset_workflows:
  - name: "小说转短剧"
    icon: "📖→🎬"
    nodes: [obsidian_read, extract_all, generate_character, generate_scene, generate_storyboard, merge_frames, video_prompt, call_video_api, export]
    default: true
  - name: "仅出分镜"
    icon: "🎬"
    nodes: [paste_story, extract_all, generate_storyboard, export]
  - name: "角色设计"
    icon: "👤"
    nodes: [paste_story, extract_character, generate_character_sheet, generate_turnaround, generate_expressions, export]
  - name: "分镜转视频"
    icon: "🎥"
    nodes: [paste_storyboard, merge_frames, video_prompt, call_video_api, export]
  - name: "一键全来"
    icon: "⚡"
    nodes: [paste_story, extract_all, generate_full_board, generate_character, generate_poster, generate_moodboard, export]

# ========== 自定义流程（专业版保存的） ==========
custom_workflows: []
```

### 安全设计

- Key 存储在 Vault 本地 `config.yml`，不提交 Git（已在 .gitignore）
- 前端不接触原始 Key — 调 localhost API，Server 代发请求
- config.yml 模板在 `api-config.template.env`，用户复制后填 Key

---

## 三、简单版画布

### 首页：流程选择

```
┌─────────────────────────────────────────────────┐
│  AI Story Studio              [简单] [专业] [⚙] │
├─────────────────────────────────────────────────┤
│                                                 │
│  选一个流程开始：                                │
│                                                 │
│  ┌────────────────────────────┐                │
│  │ 📖→🎬  小说转短剧           │ ← 默认推荐      │
│  │  Obsidian章节 → 分镜 → 视频 │                │
│  └────────────────────────────┘                │
│                                                 │
│  ┌────────────────────────────┐                │
│  │ 🎬  仅出分镜                │                │
│  │  贴故事 → 全案板+角色卡      │                │
│  └────────────────────────────┘                │
│                                                 │
│  ┌────────────────────────────┐                │
│  │ 👤  角色设计                │                │
│  │  DNA → 角色卡 → 三视图       │                │
│  └────────────────────────────┘                │
│                                                 │
│  ┌────────────────────────────┐                │
│  │ 🎥  分镜转视频              │                │
│  │  已有分镜图 → Prompt → 出片  │                │
│  └────────────────────────────┘                │
│                                                 │
│  ┌────────────────────────────┐                │
│  │ ⚡  一键全来                │                │
│  │  3风格×4格式 一次出         │                │
│  └────────────────────────────┘                │
│                                                 │
│  ── 我的流程 ──────────────────                │
│  （专业版保存的自定义流程自动出现在这里）        │
│                                                 │
└─────────────────────────────────────────────────┘
```

**交互**：
- 点击流程卡片 → 进入步骤视图
- "我的流程"区域：专业版保存的流程自动出现在这里，当简单版用
- 右上角标签切换简单/专业

### 步骤视图：卡片流水线

```
  📖 读Obsidian        🎬 生成分镜        🎥 出视频          📦 下载
  ┌──────────┐  ▶  ┌──────────┐  ▶  ┌──────────┐  ▶  ┌──────────┐
  │ 剑道独尊  │     │ 👤 角色卡 ✓│     │ Seedance │     │ video.mp4│
  │ 第1章    │     │ 🏞 场景图 ✓│     │ 生成中...│     │          │
  │ 15s / 7镜│     │ 🎬 分镜帧 ⏳│    │ ⏸       │     │          │
  │          │     │          │     │          │     │          │
  └──────────┘     └──────────┘     └──────────┘     └──────────┘
        ✓ 已完成      🔄 进行中        ⏸ 等待中        ⏳ 未开始
```

**交互**：
- 选中第一步 → 弹窗选 Obsidian 章节（或粘贴故事）
- 点「开始」→ 自动按序执行
- 每个步骤的产物实时显示在卡片内（图片缩略图、文字摘要）
- 卡片点开 → 展开子步骤细节（如角色卡下面有面部多角度、12表情等）
- 任意步骤跑完 → 产物存入 Obsidian `产物/` 目录
- 失败步骤 → 卡片变红，点「重试」

**状态机**：⏳ 未开始 → 🔄 进行中 → ✓ 已完成 → ❌ 失败

---

## 四、专业版画布

### 布局

```
┌─────────────────────────────────────────────────────────────┐
│  AI Story Studio                      [简单] [🟣专业] [⚙]   │
├──────────────────────────────────────┬──────────────────────┤
│       画布区域（主）                  │  节点库（右）          │
│                                      │                      │
│   ┌─────────┐    ┌─────────┐        │  📖 输入              │
│   │ 📖 读取  │───▶│ 🧬 提取  │        │  ├ Obsidian读取       │
│   │ Obsidian │    │         │        │  └ 粘贴故事           │
│   └─────────┘    └────┬────┘        │                      │
│                       │              │  🧬 分析提取          │
│                  ┌────┴────┐        │  ├ 提取角色DNA        │
│                  │ ▼ 展开   │        │  ├ 提取场景           │
│                  └────┬────┘        │  └ 提取关系           │
│                       │              │                      │
│           ┌───────────┼───────────┐  │  🎨 生成图片          │
│           ▼           ▼           ▼  │  ├ 角色卡             │
│      ┌──────┐    ┌──────┐    ┌──────┐ │  ├ 三视图             │
│      │👤角色卡│   │🎬分镜│    │🏞场景│ │  ├ 面部多角度         │
│      └──┬───┘    └──┬───┘    └──┬───┘ │  ├ 12表情            │
│         │           │           │     │  ├ 服装武器细节       │
│         └─────┬─────┴─────┬─────┘     │  ├ 分镜图             │
│               ▼           ▼           │  ├ 场景概念图         │
│          ┌──────┐    ┌──────┐         │  ├ 合并帧             │
│          │🖼合并帧│   │📝视频 │         │  ├ 海报               │
│          │      │    │Prompt│         │  ├ 情绪板             │
│          └──┬───┘    └──┬───┘         │  └ 光照材质图         │
│             │           │             │                      │
│             └─────┬─────┘             │  🎥 生成视频          │
│                   ▼                   │  ├ Seedance           │
│          ┌──────────────┐             │  ├ Runway             │
│          │ 🎥 调平台生成  │             │  ├ 可灵               │
│          └──────┬───────┘             │  ├ Luma               │
│                 ▼                     │  └ Pika               │
│          ┌──────────────┐             │                      │
│          │ ✅ 检查视频    │             │  ✅ 检查              │
│          └──────┬───────┘             │  └ 视频检查            │
│                 ▼                     │                      │
│          ┌──────────────┐             │  📦 输出              │
│          │ 📦 保存+导出   │             │  ├ 保存到Vault        │
│          └──────────────┘             │  ├ 导出视频           │
│                                      │  └ 导出Prompt         │
│   ┌─────────────────────┐           │                      │
│   │ 💬 对话：直接打字调细节 │           │  🔧 调整              │
│   └─────────────────────┘           │  ├ 风格切换            │
│                                      │  ├ Mood滑块            │
│                                      │  └ 单镜修改            │
│                                      │                      │
├──────────────────────────────────────┴──────────────────────┤
│  💾 另存为我的流程    │   ▶ 运行    │   🗑 清空画布             │
└─────────────────────────────────────────────────────────────┘
```

### 核心交互

**拖拽连线**：
- 从右侧节点库拖节点到画布
- 节点拖出端口连线（输入端/输出端）
- 分支自动并行 — 同一节点的多个输出分支，执行引擎并行调度 Agent

**节点操作**：
- 双击节点 → 调参面板（换平台、改风格、改画幅、改时长）
- 右键节点 → 删除、重跑、查看产物、查看日志
- 节点右下角小圆点 → 状态指示（⏳🔄✓❌）

**分支并行**：
- 从「提取」节点分出角色卡、分镜、场景三条线 → 三个 Agent 并行跑
- 并行分支的产物自动汇合到合并帧/视频 Prompt 节点
- 每个分支独立显示进度

**流程管理**：
- 「另存为我的流程」→ 保存当前画布，回到简单版首页「我的流程」区域
- 存流程时命名 + 选图标
- 已存流程可在专业版加载编辑

**对话栏**：
- 画布下方始终有对话输入框
- 和 Claude 对话调整细节："第3镜暗一点"、"整体风格换成王家卫"
- AI 修改后自动更新对应节点产物

---

## 五、技术架构

```
┌─────────────────────────────────────────────────────────┐
│                    AI Story Studio                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ Obsidian Vault ───────────────────────────────┐    │
│  │  故事/*.md  │  角色/*.md  │  场景/*.md           │    │
│  │  config.yml │  产物/      │  .gitignore          │    │
│  └───────────────────────┬────────────────────────┘    │
│                          │ 读写                         │
│  ┌─ Local Server (Node.js) ──┴────────────────────┐    │
│  │  ├ VaultReader        │ 读 md、解析 frontmatter  │    │
│  │  ├ ConfigManager      │ 读/验/写 config.yml     │    │
│  │  ├ APIProxy           │ 代发外网 API（Key安全）   │    │
│  │  ├ WorkflowEngine     │ 流程 DAG 解析 + 调度     │    │
│  │  ├ AgentPool          │ 并行 Agent 生命周期管理  │    │
│  │  ├ SkillBridge        │ 调 Claude Code Skill    │    │
│  │  └ WebServer          │ localhost HTTP 服务      │    │
│  └───────────────────────┬────────────────────────┘    │
│                          │ localhost:3000              │
│  ┌─ Web UI (HTML/CSS/JS) ─┴────────────────────────┐   │
│  │  ├ SimpleView         │ 流程卡片 + 步骤管线      │    │
│  │  ├ ProView            │ 节点画布（拖拽/连线/调参）│    │
│  │  ├ ConfigPanel        │ 可视化编辑 config.yml    │    │
│  │  ├ PreviewPanel       │ 图片/视频产物预览        │    │
│  │  └ ChatBar            │ 对话输入（调 Claude）    │    │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  UI  产出：frontend-design skill 生成                   │
│  启动方式：Claude Code 里说 "启动画布" 或 "start"       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 各模块职责

| 模块 | 职责 | 输入 | 输出 |
|------|------|------|------|
| VaultReader | 读 Obsidian Vault 文件 | 路径 | 文件内容 + 解析后的 frontmatter |
| ConfigManager | 读写配置 | config.yml 路径 | 验证后的配置对象 |
| APIProxy | 代理外网 API 调用 | 平台名 + prompt + 图片 | API 响应/产物文件 |
| WorkflowEngine | 解析流程 DAG，决定执行顺序 | 节点列表 + 连线 | 执行顺序 + 并行分组 |
| AgentPool | 并行执行节点，管理生命周期 | 节点任务 | 节点结果 + 状态 |
| SkillBridge | 调 Claude Skill 能力 | 任务描述 | AI 生成内容 |
| WebServer | 提供 localhost 服务和 WebSocket | HTTP 请求 | 响应 + WS 推送进度 |

### 数据流（以"小说转短剧"为例）

```
1. 用户选流程 + 选 Obsidian 章节
2. UI → Server: POST /workflow/start {workflow: "novel-to-video", obsidianPath: "剑道独尊/第1章.md"}
3. Server → VaultReader: 读第1章.md + frontmatter + 关联角色/场景笔记
4. WorkflowEngine: 解析流程 DAG → 生成执行计划
5. AgentPool: 按 DAG 调度：
   - 串行节点：顺序执行
   - 分叉节点：并行分配 Agent
6. 每个 Agent 执行：
   - 调 SkillBridge → Claude Skill 生成内容/图片/视频
   - 调 APIProxy → 视频平台 API
7. 结果 → 写入 Obsidian Vault 产物/ 目录
8. 进度 → WebSocket 推送 UI 更新
```

### UI 生成

- 使用项目已有的 `frontend-design` skill 生成 Web UI
- 生成目标：一个完整的 HTML 文件 + 配套 JS/CSS
- 每次迭代输出到 `studio/ui/` 目录
- Server 启动时 serve 该目录

### 启动方式

通过 Claude Code Skill 触发：
```
用户：启动画布 / start / 打开工作室
Claude：→ 检查 node 环境 → cd studio → npm start → 浏览器打开 localhost:3000
```

---

## 六、文件结构

```
ai-visual-director/
├── SKILL.md                       # 主 Skill（引擎，已有，不变）
├── README.md                      # 项目文档（已有）
├── api-config.template.env        # API Key 模板（已有）
├── examples/                      # 示例图片（已有）
├── references/                    # 51 个参考文件（已有）
├── templates/                     # 7 个提示词模板（已有）
├── sub-skills/                    # 6 个子 Skill（已有）
│   ├── character/SKILL.md
│   ├── poster/SKILL.md
│   ├── scene/SKILL.md
│   ├── storyboard/SKILL.md
│   ├── style/SKILL.md
│   └── video/SKILL.md
└── studio/                        # 🆕 画布（本次新增）
    ├── server/
    │   ├── index.js               # 服务入口（Express + WebSocket）
    │   ├── vault-reader.js        # Obsidian 文件读取
    │   ├── config-manager.js      # config.yml 读写
    │   ├── api-proxy.js           # 外网 API 代理
    │   ├── workflow-engine.js     # DAG 流程引擎
    │   ├── agent-pool.js          # 并行 Agent 池
    │   ├── skill-bridge.js        # Claude Skill 桥接
    │   └── routes/
    │       ├── workflow.js        # 工作流 API
    │       ├── config.js          # 配置 API
    │       ├── vault.js           # Vault 读取 API
    │       └── preview.js         # 产物预览 API
    ├── ui/
    │   ├── index.html             # 画布主页面
    │   ├── css/
    │   │   └── studio.css         # 样式
    │   ├── js/
    │   │   ├── app.js             # 主入口
    │   │   ├── simple-view.js     # 简单版组件
    │   │   ├── pro-view.js        # 专业版组件（节点画布）
    │   │   ├── node-library.js    # 节点库
    │   │   ├── canvas.js          # 画布操作（拖拽/连线）
    │   │   ├── config-panel.js    # Config 编辑面板
    │   │   ├── preview-panel.js   # 产物预览
    │   │   ├── chat-bar.js        # 对话输入栏
    │   │   └── api-client.js      # 前端 API 调用封装
    │   └── assets/
    │       └── node-icons/        # 节点图标
    ├── workflows/                 # 内置流程定义（JSON）
    │   ├── novel-to-video.json
    │   ├── storyboard-only.json
    │   ├── character-design.json
    │   ├── board-to-video.json
    │   └── one-click-all.json
    ├── package.json
    └── .gitignore
```

---

## 七、未来升级路线

| 阶段 | 内容 | 触发条件 | 影响范围 |
|------|------|---------|---------|
| **V1.0** | 简单版 + 专业版 + config.yml + Obsidian 读写 + API 代理 | 核心 MVP | 全部新建 |
| **V1.1** | Agent 可视化：并行分支实时进度、日志、单节点重跑 | V1.0 跑通后 | Server: AgentPool + WebSocket; UI: 进度组件 |
| **V1.2** | 节点参数面板：每类节点独立配置 UI（平台选择、参数调节） | V1.0 专业版节点双击时 | UI: 参数面板组件 |
| **V1.3** | 产物对比：同一流程 2 套参数并行跑，产物并排对比 | 创作者想比 Seedance vs 可灵 效果 | Server: 对比模式; UI: 对比面板 |
| **V1.4** | 版本管理：一个项目多次跑的产物自动归档 + 历史回看 | 产品化需求 | Vault: 产物版本目录; UI: 历史面板 |
| **V1.5** | 节点市场：专业用户分享自定义流程/节点，导入他人流程 | 有用户群后 | Server: 分享/导入; UI: 市场面板 |
| **V2.0** | 协作：同一 Vault 多人 Git 同步，画布看到队友改动 | 团队出现 | Server: 冲突检测; UI: 协作指示器 |
| **V2.X** | 专业节点全开放：52 项能力逐批转为可拖拽细节点 | 按需渐进 | 节点库逐步扩充 |
| **V3.0** | 独立 App：Electron 打包，不依赖 Claude Code 启动 | 用户量足够 | 打包 + 独立 AI 调用 |

### 升级原则

- **小白加功能** = 新的预设流程卡片（不增加认知负担）
- **专业加功能** = 新节点类型（放在节点库里，不强制使用）
- **渐进开放**：52 项能力逐步从 Skill → 节点，不一口气全放出来
- **向下兼容**：V1.0 保存的自定义流程，后续版本全部可加载

---

## 八、实现分解

### Phase 1：Server 基础

| 模块 | 文件 | 功能 |
|------|------|------|
| 项目初始化 | `studio/package.json` | Express + ws 依赖 |
| 服务入口 | `studio/server/index.js` | HTTP + WebSocket 启动 |
| Vault 读取 | `studio/server/vault-reader.js` | 读 md 文件 + frontmatter 解析 |
| Config 管理 | `studio/server/config-manager.js` | 读/写/验证 config.yml |
| API 代理 | `studio/server/api-proxy.js` | 代理 Seedance/Runway 等 API |
| 路由 | `studio/server/routes/*.js` | 工作流/配置/Vault/预览 API |

### Phase 2：流程引擎

| 模块 | 文件 | 功能 |
|------|------|------|
| DAG 引擎 | `studio/server/workflow-engine.js` | 解析流程 JSON → 拓扑排序 → 执行计划 |
| Agent 池 | `studio/server/agent-pool.js` | 并行 Agent 调度 + 生命周期管理 |
| Skill 桥接 | `studio/server/skill-bridge.js` | 调 Claude Skill 生成内容 |
| 流程定义 | `studio/workflows/*.json` | 5 个内置流程的节点+连线定义 |

### Phase 3：Web UI

| 模块 | 文件 | 功能 |
|------|------|------|
| 主页面 | `studio/ui/index.html` | 画布主框架 |
| 样式 | `studio/ui/css/studio.css` | 全局样式 |
| 简单版 | `studio/ui/js/simple-view.js` | 流程卡片 + 步骤管线 |
| 专业版 | `studio/ui/js/pro-view.js` | 节点画布 |
| 节点库 | `studio/ui/js/node-library.js` | 节点列表 + 拖拽 |
| 画布操作 | `studio/ui/js/canvas.js` | 拖拽/连线/缩放 |
| Config 面板 | `studio/ui/js/config-panel.js` | 可视化编辑配置 |
| 预览面板 | `studio/ui/js/preview-panel.js` | 产物预览 |
| 对话栏 | `studio/ui/js/chat-bar.js` | 对话输入 |
| API Client | `studio/ui/js/api-client.js` | 前端调 Backend 封装 |

### Phase 4：Skill 集成

| 模块 | 说明 |
|------|------|
| SKILL.md 更新 | 加"启动画布"触发规则 |
| sub-skills 对接 | SkillBridge 调 6 个 sub-skill |
| 端到端测试 | 完整跑通"小说→分镜→视频"流程 |

---

## 九、Spec 自检

- [x] 无 TBD/TODO/占位符残留
- [x] 简单版和专业版的交互逻辑不矛盾
- [x] 架构三层（Vault/Server/UI）接口清晰
- [x] 数据流从用户操作到产物输出完整闭环
- [x] 升级路线按优先级排列，每阶段范围明确
- [x] 安全设计覆盖（Key 不暴露前端）
- [x] 启动方式明确（Skill 命令触发）
- [x] 范围聚焦：一个画布生产台，不扩展到分发/社区
