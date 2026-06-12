# 镜头预算引擎

把长故事自动压缩为可执行的镜头数。决定：能不能一次生成、保留什么、合并什么、删掉什么。

---

## 一、读取平台配置

**前置步骤**：读取 `api-config.template.env`，获取：

```
1. 确定目标平台 → 读取 VIDEO_PLATFORM_DEFAULT（默认 Seedance）
2. 按平台名拼接键名查找限制：
   {PLATFORM}_MAX_DURATION    → 如 SEEDANCE_MAX_DURATION=15
   {PLATFORM}_MAX_REF_IMAGES  → 如 SEEDANCE_MAX_REF_IMAGES=12
   {PLATFORM}_MAX_PROMPT_CHARS → 如 SEEDANCE_MAX_PROMPT_CHARS=1500
   {PLATFORM}_SUPPORTS_CHINESE → 如 SEEDANCE_SUPPORTS_CHINESE=true
3. 读取 SPLIT_AUTO → 是否自动拆分（默认 true）
4. 读取 SHORT_INPUT_THRESHOLD_CHARS → 短输入阈值（默认 100）
```

> **键名规范**：所有配置使用平键格式（`SEEDANCE_MAX_DURATION`），不使用嵌套路径（`platform.video.max_duration`）。引擎通过当前目标平台名拼接键名查找限制。

---

## 二、可执行性判断

先判断故事能不能一次生成视频（阈值来源：api-config.template.env 系统阈值 + 导演经验规则）：

| 条件 | 单次生成阈值 | 超限 → 拆段 |
|------|------------|-----------|
| 角色数 | ≤ 4人 | 按角色分组，每段 ≤ 3人 |
| 场景数 | ≤ 3个 | 按场景组，每段 ≤ 2场景 |
| 时间跨度 | ≤ 1天 | 按时间点拆（早晨/中午/黄昏/夜晚） |
| 动作复杂度 | 中等（有明确起终点） | 每场复杂动作独立成段 |
| 字数 | ≤ MID_INPUT_THRESHOLD_CHARS（api-config.template.env） | 每 300-500字 拆一段 |
| 故事线 | 1条主线 | 每条线独立，最后汇合段 |

> 角色/场景/时间跨度的阈值是导演经验规则（非 config）。字数阈值读取 `MID_INPUT_THRESHOLD_CHARS`。最终时长上限由 `{PLATFORM}_MAX_DURATION` 决定。

**不宜做视频的故事**：纯对话无动作 → 出角色卡+分镜图即可；纯心理活动 → 出情绪板；纯设定/世界观 → 出世界观板。

---

## 三、压缩原则

```
一条视频 = 一个核心动作 + 一个情绪转折
```

| 原则 | 规则 |
|------|------|
| 一个核心动作 | 只保留 1 个高潮动作 |
| 一个情绪转折 | 只保留 1 个情绪变化 |
| 场景 ≤ 2（10-15s）/ ≤ 3（30s）/ ≤ 5（60s） | 越短越精简 |
| 角色 ≤ 2（10-15s）/ ≤ 4（60s） | 短篇只留主角+对手，长篇可保留配角 |
| 支线全删 | 只留主线 |

**可删**：铺垫段落 / 重复情绪节拍 / 解释性文字 / 次要角色对话 / 世界观细节
**可合并**：两个对话镜→一个反应镜，行走+对话→跟拍一镜，进入场景+关系建立→一广角
**必留**：主角1个关键表情(CU) + 核心冲突1个画面 + 结尾1个情绪定帧

---

## 四、按时长压缩

### 10s（3-7镜）— 只保留一个节拍
保留：高潮 / 合并：起因1镜交代 / 删除：过程细节
**公式**：1镜建立 + 1镜冲突 + 1镜高潮 = 3镜

### 15s（5-9镜）— 一个完整情绪转折
保留：起+转+合 / 合并：承→1镜过渡 / 删除：支线、第四角色
**公式**：1建立 + 1张力 + 1升级 + 1爆发 + 2余韵 = 6镜基准

### 30s（7-15镜）— 完整起承转合
保留：全部四阶段 / 合并：过渡压缩50% / 删除：重复节拍
**公式**：2建立 + 2张力 + 2升级 + 2爆发 + 2余韵 = 10镜基准

### 60s（10-25镜）— 完整故事
保留：≤5场景 / 合并：过渡用匹配剪切 / 删除：不相关支线
角色 ≤ 4人，次要角色→群像处理

> **⚠ 如果输入时长 > {PLATFORM}_MAX_DURATION（从 api-config.template.env 读取）→ 必须拆分，不可一次生成。**

---

## 五、自动拆分（按平台上限）

从 `api-config.template.env` 读取，按目标平台查找对应限制：

```
1. 读取 SPLIT_AUTO → false 则跳过拆分，强制单段生成
2. 确定目标平台（VIDEO_PLATFORM_DEFAULT 或 state/variable-registry.project.target_platform）
3. 按平台拼接键名：{PLATFORM}_MAX_DURATION → 查找对应值
   例：平台=Seedance → SEEDANCE_MAX_DURATION=15
       平台=可灵   → KELING_MAX_DURATION=10
       平台=Runway → RUNWAY_MAX_DURATION=10
       平台=Luma   → LUMA_MAX_DURATION=5
4. 拆分算法：
  段数 = ceil(输入时长 / {PLATFORM}_MAX_DURATION)
  每段时长 = {PLATFORM}_MAX_DURATION
  每段镜数 = ceil(总镜数 / 段数)

示例：60s 15镜 → Seedance SEEDANCE_MAX_DURATION=15s
  → 4段
  段1/4: 0-15s 镜1-4「压迫→觉醒」
  段2/4: 15-30s 镜5-8「红光→现身」
  段3/4: 30-45s 镜9-12「宣告→抬头」
  段4/4: 45-60s 镜13-15「崩塌→黎明」

输出：每段独立 shot-budget 报告
```

---

## 六、内容拆段（场景/角色超限时）

---

## 七、输出

```markdown
【镜头预算】

时长：[Ns] / 镜数：[N镜]
可行性：[一次生成] / [拆N段]

压缩决策：
  保留：[情节列表]
  合并：[A+B → Z]，原因：[理由]
  删除：[情节列表]，原因：[理由]

压缩检查：
  □ 场景 ≤ 2？□ 主要角色 ≤ 2？□ 无支线？□ 无重复情绪？□ 高潮收尾 ≤ 1镜？
```

---

## 联动

← 读取 `api-config.template.env`（VIDEO_PLATFORM_DEFAULT + SPLIT_AUTO + {PLATFORM}_MAX_DURATION → 自动拆分计算）
← 接收 `story-intake` 的提取字段
→ 输出给 `video-director` 做导演决策
→ 拆段时：每段独立走 video-director → ... → render-package，段间联动 `state/continuity-state.md`
→ 多段时：段1完成 → 保存快照 → 段2继承 → ...
→ **写入 `state/variable-registry.md`**（project.duration, project.word_count 初始估算, project.segment_count）
