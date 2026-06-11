# 一键生成默认规则

用户说"一键生成"但没有具体参数时，强制执行以下默认。触发词：`一键生成` / `直接出` / `auto`。

---

---

## 一、系统默认值

平台限制、阈值、默认语言/画幅——统一从 **`api-config.template.env`** 读取，不在此文件中硬编码。

| 参数 | 来源 |
|------|------|
| 图片平台 | `api-config.template.env` → `IMAGE_PLATFORM_DEFAULT` |
| 视频平台 | `api-config.template.env` → `VIDEO_PLATFORM_DEFAULT` |
| 画幅 | `api-config.template.env` → `DEFAULT_ASPECT_RATIO` |
| 语言 | `api-config.template.env` → `DEFAULT_LANGUAGE` |
| 短输入阈值 | `api-config.template.env` → `SHORT_INPUT_THRESHOLD_CHARS` |
| 评分通过线 | `api-config.template.env` → `SCORE_PASS_THRESHOLD` |
| 最大修复轮次 | `api-config.template.env` → `REPAIR_MAX_ROUNDS` |

## 二、AI 导演决策（引擎动态决定，不写死默认值）

以下决策由 AI 导演引擎根据故事内容动态做出。不同故事、不同类型，结果不同。无"硬编码默认"。

| 决策项 | 负责引擎 | 决策方式 |
|--------|---------|---------|
| 时长 + 镜数 | `shot-budget` + `pacing` | 故事字数 → 时长 → pacing表 → 镜数 |
| 风格 VS | `video-director` | 故事类型关键词 → 匹配 VS1-53 |
| 角色卡版式 LS | `video-director` → `asset-plan` | 故事类型：科幻→LS13，武侠→LS12，通用→LS11 |
| 场景图版式 LS | `consistency-trigger`（场景） | 场景复杂度/角度分布 → 全能参考/4宫格/九宫格/720°全景 |
| 分镜图版式 LS | `video-director` → `asset-plan` | 动作复杂度/时长/平台 → LS6/LS7/LS5 |
| 角色一致性方法 | `consistency-trigger`（角色） | 角色出镜率/服装复杂度 → 角色卡/三视图/面部5角度/14图等 |
| 场景一致性方法 | `consistency-trigger`（场景） | 场景数/角度分布/固定元素数 → 7方法择一 |
| 情绪曲线 EC | `video-director` | 故事类型 → EC1-12 自动匹配 |
| 色彩方案 CN | `video-director` | 情绪曲线 → 色彩叙事引擎驱动 |
| 分镜节奏 P | `video-director` + `pacing` | 故事类型 → P1-P5 |

> 用户可随时覆盖 AI 导演的任何决策，如"换九宫格"、"用LS12黑金角色卡"。

---

---

## 四、一键生成最快路径

```
用户输入 → task-router（短句检测）
  ↓
project-manager（auto-init：创建项目 ID + state/ 目录）
  ↓
paste-input（自动补全角色/场景/冲突）
  ↓
story-intake → shot-budget → video-director → asset-plan
  │               ↑ 写入 state/variable-registry
  ↓
reference-anchor → motion-physics → project-graph → video-prompt-assembly
  │                 ↑ 写入 asset-map  ↑ 补充 shot-state ↑ 构建依赖图    ↑ 读取 state/
  ↓
consistency-engine（5 维度 RM 评估 + 知识库建议）
  ↓
prompt-scorer（6 维度评分，接收一致性报告）
  ↓
（评分 ≥ SCORE_PASS_THRESHOLD 跳过修复，< SCORE_PASS_THRESHOLD 触发auto-repair → 调用 knowledge-retrieval → 重评。以上值从 api-config.template.env 读取）
  ↓
final-video-qc → render-package
  ↑ 读取 state/
  ↓
project-manager（auto-save：持久化 state/ 到 projects/ 目录）
  ↓
输出：角色卡 + 场景图 + 分镜图 + 视频 Prompt + 一致性报告 + 执行清单
```

不展示任何选项，直接输出最终结果。确认最多 1 次（仅在故事有歧义时）。

---

## 五、其他一键指令

| 用户指令 | 行为 |
|---------|------|
| "一键生成" / "直接出" / "auto" | 最快路径，零确认直接出 |
| "一键全平台" | 生成 Seedance + Runway + 可灵三平台版本 |
| "一键多版本" | A/B/C 三风格对比 |
| "一键全来" | 批量 4 格式 + 全平台（输出量大，分段输出） |

---

## 六、不做的事

- ❌ 不输出 Midjourney/Stable Diffusion 版本（除非用户要求）
- ❌ 不输出英文压缩版（除非用户要求）
- ❌ 不多平台同时输出（除非用户要求"多版本"或"多平台"）
- ❌ 不出完整版10种格式（一键 = 最快路径，不是最全）

---

## 联动

← 触发条件：用户输入 ≤ `SHORT_INPUT_THRESHOLD_CHARS`（从 api-config.template.env 读取）且无特殊指令
← **读取 `api-config.template.env`**（平台默认值：图片平台、视频平台、拆分规则）
← 被调用的引擎：`story-intake` → `shot-budget` → `video-director` → `asset-plan`（各阶段写入 `state/` 注册中心）
→ 模板从 `state/variable-registry.md` 读取变量生成 Prompt
→ 如果任何步骤评分低于阈值 → 调用 `auto-repair`
→ 流程定义见 `engines/task-router.md`
