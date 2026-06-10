# Platforms

`platforms/` 放平台适配和 API 集成规则。

## 职责

- 将通用 prompt 转成 GPT Image / Midjourney / SD / 可灵 / Runway / Seedance 等平台可用格式
- 处理画幅、参数、长度、参考图、首尾帧、负面词位置
- 记录 API 集成、平台限制和推荐调用方式

> 目标平台从 `state/variable-registry.md` 的 `project.target_platform` 读取，由 `engines/reference-anchor.md` 写入。

## 当前文件

| 文件 | 职责 |
|------|------|
| `platform.md` | 图像平台基础适配 |
| `platform-advanced.md` | 深度优化，如 MJ cref、SD ControlNet |
| `video-prompt.md` | 视频平台 prompt 规则 |
| `api-integration.md` | 图片 API 集成 |
| `video-api-integration.md` | 视频 API 集成 |
