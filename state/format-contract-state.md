# 格式合同状态（运行时快照）

> 每次生成前由 command-gate 写入。生成后由 prompt-qc 对照检查。

---

## 当前合同

| 字段 | 值 |
|------|-----|
| **output_type** | `full_board` + `character_sheet` + `scene_card` + `video_prompt` |
| **asset_purpose** | `video_asset`（分镜图/视频 prompt）+ `display_asset`（角色卡/场景图可展示） |
| **video_safe** | `true`（全部资产可进入视频 @图） |
| **language** | `zh`（从 api-config.template.env → DEFAULT_LANGUAGE 读取，强制。GPT Image 2 中文原生 → 输出中文 prompt。Midjourney/Flux 英文平台 → 输出英文 prompt。不可跨语言。） |
| **aspect_ratio** | `16:9` |
| **required_modules** | 角色卡：角色名+面部DNA+体型+发型+服装；场景图：空间结构+主光源+主色调+固定元素；分镜图：6镜+景别+运镜+灯光+色彩+转场；视频prompt：角色引用+场景引用+分镜描述+平台参数 |
| **fatal_if_missing** | 角色面部DNA、场景空间结构、分镜数量<6、视频prompt缺少@图引用 |
| **text_allowed** | `false`（video_asset 禁止文字/边框/HUD） |
| **border_allowed** | `false` |
| **hud_allowed** | `false` |
| **background** | `required`（场景必须包含完整背景） |
| **density_level** | `2`（情绪类：留白多、焦点明确、背景简化） |
| **subject_ratio** | `≥40%` |

---

## 用户覆盖

| 覆盖项 | 用户要求 | 覆盖默认值 |
|--------|---------|-----------|
| `—` | `—` | `—` |

---

## 状态标记

| 字段 | 值 |
|------|-----|
| **写入时间** | `2026-06-12T00:00:00Z` |
| **写入方** | `command-gate` |
| **合同版本** | 参照 `rules/format-contract.md` |
| **是否已 QC** | `pending` |
| **QC 结果** | `—` |
