# Engines

`engines/` 放“会做决策和编排”的 Markdown 规则。它们不是最终 prompt 模板，而是负责判断用什么风格、版式、节奏、结构、平台压缩方案。

## 设计标准

每个引擎文件尽量包含：

```md
## 输入
用户关键词 / 故事字段 / 输出目标

## 决策规则
如果...则选择...

## 输出
返回编号 / 组合 / 参数 / 下一步模板

## 禁止
不能出现的错误选择
```

## 当前引擎

| 文件 | 职责 |
|------|------|
| `styles.md` | VS 视觉风格选择 |
| `layout-styles.md` | LS 版式样式选择 |
| `fusion.md` | 风格融合 |
| `relationships.md` | 角色关系对构图/灯光/风格的影响 |
| `act-structure.md` | 叙事结构选择 |
| `emotion-curve.md` | 情绪曲线驱动 |
| `color-narrative.md` | 色彩叙事 |
| `mood-slider.md` | 用户 mood 词调参 |
| `pacing.md` | 分镜节奏 |
| `multi-version.md` | 多版本 A/B/C |
| `series.md` | 系列和续集延续 |
| `style-migration.md` | 风格迁移 |
| `prompt-compression.md` | Prompt 压缩 |
| `prompt-scorer.md` | Prompt 评分 |
| `one-click.md` | 一键生成 |
| `batch-chapter.md` | 批量章节处理 |
| `single-shot-edit.md` | 单镜修改 |
| `video-prompt-assembly.md` | 视频 Prompt 组装 |
