---
name: create
description: One-click story-to-video package generation. Full chain: task-router → state/variable-registry → asset-map → shot-state → dialogue-map → 8-item QC → render-package. Use /create or "一键生成", "直接出", "auto".
---

# Create — 一键故事到视频

`/create` 是默认总编排入口。用户给一个故事、剧本、小说片段或概念句时，直接进入完整自动链路。

它不替代 `/storyboard`、`/character`、`/scene`。它会自动编排三大核心资产：

```text
角色卡（谁） + 场景图（在哪） + 分镜图（怎么拍） -> 视频 Prompt / 执行包
```

## 触发方式

- `/create [故事]`
- `/create 一键生成 [故事]`
- 直接说 `一键生成`、`直接出`、`auto`
- 粘贴一个故事且没有指定其他任务时，默认按 `/create` 处理

## 默认输出

输出完整视频生成执行包：

1. 故事摄入结果
2. 镜头预算与是否拆段
3. 视频结构蓝图
4. 资产清单
5. 角色卡 Prompt
6. 场景图 Prompt
7. 分镜图 / 合并帧 Prompt
8. 视频 Prompt
9. 平台参数
10. 负面提示词
11. 最终质检报告
12. 跨段衔接状态（如需拆段）

## 执行链路

```text
task-router
→ sources/
→ engines/story-intake.md
→ engines/shot-budget.md
→ engines/video-director.md
→ engines/asset-plan.md
→ engines/reference-anchor.md
→ engines/motion-physics.md
→ engines/video-prompt-assembly.md
→ engines/prompt-scorer.md
→ rules/final-video-qc.md
→ engines/auto-repair.md
→ engines/render-package.md
```

## 默认规则

读取 `api-config.template.env` + `rules/one-click-defaults.md`。用户没有指定时：

- 视频平台 → `VIDEO_PLATFORM_DEFAULT`
- 画幅 → `DEFAULT_ASPECT_RATIO`
- 语言 → `DEFAULT_LANGUAGE`
- 自动选择最匹配风格和版式（video-director 多维度决策）
- 自动生成最低必要资产
- 平台不支持当前时长时，自动拆段或压缩

## 旧命令兼容

用户说 `/storyboard 一键生成` 时，始终保留故事板/分镜图核心链路；只有用户明确说“继续出视频包/转视频/成片执行包”时，才追加 `/create` 后半段编排。
