# 视频参考图导出规则

每个 display_asset 都可以派生对应的 clean video_asset。本规则定义派生标准和验证要求。

---

## 一、核心原则

**display_asset 是给人看的，video_asset 是给 AI 视频模型看的。两者不是同一张图。**

| | display_asset | video_asset |
|---|-------------|-------------|
| 文字 | ✅ 允许 | ❌ 禁止（含乱码/伪文字） |
| 边框/表格 | ✅ 允许 | ❌ 禁止 |
| HUD/UI | ✅ 科技类允许 | ❌ 禁止（除有意义的最小化 UI） |
| 高密度背景 | ✅ 允许 | ❌ 必须降低到 low |
| 粒子/特效 | ✅ 允许 cinematic | ⚠️ 只允许 subtle |
| 标注/箭头 | ✅ 允许 | ❌ 禁止 |
| 主体突出 | ⚠️ 不强制 | ✅ 必须 |

---

## 二、派生规则

### 全案板 → central hero frame

```
源资产（display_asset）：full-board.md 输出
  - 含：项目总览栏/角色设定栏/场景概念图/分镜序列表/技术规范栏/边框/文字

派生 video_asset（🎬 central hero frame）：
  保留：
    - 核心场景概念图（中部最大图）的构图+角色+空间+光
    - 风格/色彩方案
    - 角色 DNA（面部/服装/姿态）
  剥离：
    - 顶部项目栏（片名/时长/类型）
    - 角色栏（三视图/面部/表情）
    - 分镜序列（全部小帧）
    - 底部技术规范
    - 所有边框/分隔线/文字
  输出：
    - 单一 16:9 电影帧，仅含核心场景+主角
    - 无文字、无边框、无 UI
    - 标注用途：🎬 video_asset — 视频主画面锚点
```

### 分镜图 → no-text keyframes

```
源资产（display_asset）：full-board.md 或 quick-board.md 输出
  - 含：分镜帧/帧号/参数栏/台词字幕/转场标注

派生 video_asset（🎬 clean keyframes，N 张独立）：
  保留：
    - 每帧画面内容（角色/动作/场景/光/色彩）
    - 运镜方向暗示（通过构图和运动模糊）
  剥离：
    - 帧号/阶段名称
    - 参数栏（景别/运镜/焦段/色彩/灯光/转场）
    - 台词字幕框
    - 分隔线/边框
  输出：
    - 每帧一张独立 16:9 图
    - 按故事板时间顺序
    - 无任何文字/标注
    - 标注用途：🎬 video_asset — 画面锚点（帧N）
```

### 角色圣经 → clean character sheet

```
源资产（display_asset）：character-sheet.md → LS12 黑金/ LS13 科幻/ LS41-LS44
  - 含：文字标注/箭头/红色不可变特征框/HUD/面板

派生 video_asset（🎬 clean character sheet）：
  保留：
    - 三视图（正/侧/背）全身
    - 面部 close-up
    - 服装/发型/武器外观
    - 风格/色彩
  剥离：
    - 所有文字/标注/箭头
    - DO NOT CHANGE 红框
    - 黑金边框/暗岩背景
    - HUD 元素（LS13）
    - 表情范围格（可选保留，但去标注）
  输出：
    - 浅灰/白背景，主体突出
    - 仅保留角色视觉信息
    - 标注用途：🎬 video_asset — 角色锚点
```

### 场景参考板 → no-text scene anchor

```
源资产（display_asset）：scene-card.md → LS8 场景全能参考板
  - 含：主场景/材质特写/灯光方向图/天气参考/声音标注/色卡

派生 video_asset（🎬 clean scene anchor）：
  保留：
    - 主场景概念图（空间+光+天气+材质）
    - 空间层次/纵深
    - 主光源方向
  剥离：
    - 材质色板/灯光示意图
    - 天气参考小图
    - 所有文字标注
    - 声音氛围标注
  输出：
    - 单一宽幅场景图
    - 锁死空间/光/天气
    - 标注用途：🎬 video_asset — 场景锚点
```

### 封面/海报 → 不进视频

```
源资产（marketing_asset）：poster.md 输出
  - 含：大字标题/副标题/底部信息/高冲击排版

派生 video_asset：❌ 不派生
  - 海报排版结构与视频帧完全不同
  - 文字/排版/冲击特效必然污染 AI 视频模型
  - 仅作 marketing 输出，不进视频流程
```

---

## 三、派生质量检查

派生完成后必须逐项检查：

```
□ 无可见文字（含乱码/伪文字/背景文字）
□ 无边框/表格线/分隔线
□ 无 HUD/UI 元素（科技类除外，仅保留最小化有意义 UI）
□ 无箭头/标注/指向线
□ 无红框/DO NOT CHANGE 标记
□ 主体占画面 ≥ 50%
□ 背景复杂度 ≤ low
□ 粒子/雾效 ≤ subtle
□ 角色 DNA 与源资产一致（面部/服装/发型/武器）
□ 场景空间/光源方向与源资产一致
```

---

## 四、自动派生触发

| 触发条件 | 动作 |
|---------|------|
| reference-anchor 检测到 video @图中无 video_asset | 提示用户「当前无 video_asset，建议派生」 |
| 用户说 `/declutter video-ref` | 从当前 display_asset 派生 clean video_asset |
| 用户说「生成视频锚点」 | 一键生成全部 video_asset（clean 角色卡 + clean 场景 + keyframes） |
| final-video-qc 检测到 display_asset 被误用为视频参考 | 阻断并提示派生 |

---

## 五、联动

← 被 `engines/prompt-declutter.md` 的 `/declutter video-ref` 子命令读取
← 被 `engines/reference-anchor.md` 的用途分流过滤（§四）引用
← 被 `engines/asset-plan.md` 的用途分类（§七）引用
→ 派生出的 video_asset 写入 `state/asset-map.md`（asset_purpose=video_asset）
→ 被 `rules/final-video-qc.md` 第11项「视觉可用性」检查
