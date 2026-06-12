# 命令上下文（运行时快照）

> 每轮命令开始前由 command-gate 写入。记录本轮命令的权限表、模式、输出目标。LLM 必须在此边界内工作。

---

## 当前命令

| 字段 | 值 |
|------|-----|
| **命令** | `/create` |
| **task_type** | `create_standard` |
| **mode** | `stable` |
| **output_target** | `唐朝酒楼，丰满舞姬雨中回眸，笑里藏悲` |
| **write_policy** | `draft_only` |
| **prompt_language** | `zh`（从 api-config.template.env → DEFAULT_LANGUAGE 读取） |
| **image_platform** | `GPT Image 2`（从 api-config.template.env → IMAGE_PLATFORM_DEFAULT 读取） |
| **写入时间** | `2026-06-12` |

---

## 权限表

### must_use

```
story-intake → shot-budget → video-director → asset-plan
→ consistency-trigger → visual-density-controller
→ reference-anchor → motion-physics → project-graph
→ 子路由（/character + /scene + /storyboard）
→ video-prompt-assembly → consistency-engine → prompt-scorer
→ auto-repair（如需）→ prompt-qc → final-video-qc → render-package
```

### may_use

```
knowledge/ 风格库、角色库、场景库、灯光库、色彩库
templates/character-sheet.md（模式A 6模块全量版）
templates/scene-card.md（LS9 九宫格空间锁定）
templates/full-board.md（全参数，每张≤4帧）
```

### forbidden_use

```
dialogue-engine（standard 默认不调用）
sound-engine（standard 默认不调用）
poster-template（standard 默认不调用）
D类全部（fusion / multi-version / director-imitation / series-continuity）
模式A 6模块全量版
clean 派生（已废除——角色卡/场景图全量版直接进视频@图）
```

---

## 锁定范围

```
无已锁定内容（lock-state 全部为空）
```

---

## 输出状态声明

```
输出状态：draft
资产用途：角色卡=consistency_asset（全量版，直进视频@图），场景图=consistency_asset（多角度空间锚点，直进视频@图），分镜图=display_asset（全参数施工指令，不进@图），关键帧/尾帧=video_asset
是否写回主状态：yes（写入 state/variable-registry + state/shot-state + state/asset-map）
prompt 语言：zh（强制，GPT Image 2 中文原生，所有 prompt 输出中文）
```
