# 资产映射表（@图编号 → 资产描述）

由 `reference-anchor` 根据 `asset-plan` 的资产列表 + 平台策略**动态生成**。替代 video-prompt-assembly 中硬编码的 @图映射。

---

## 当前映射

| @编号 | type | name | source | locks |
|-------|------|------|--------|-------|
| @图0 | scene_reference | 深夜咖啡店 场景图 | /scene | 空间布局 / 主光方向 / 地面材质 |
| @图1 | character_sheet | 沈默 角色卡 | /character | 面部 / 服装 / 道具 |
| @图2 | storyboard_board | 雨夜窗边 分镜图 | /storyboard | 镜头顺序 / 构图 / 运镜 |
| @图3 | keyframe | SH04 高潮关键帧 | /shot/SH04 | 高潮情绪 / 雨痕瞳孔 |
| @图4 | end_frame | SH06 尾帧锚点 | /shot/SH06 | 结尾剪影状态 |

> Seedance 标准 5 张包。12 张上限，当前用量 5/12。

---

## 平台策略 → @图映射

### Seedance（参考图优先型，≤12张）

| @编号 | type | 说明 | video_safe |
|-------|------|------|------------|
| @图0 | scene_reference | 场景全景 | ✅ true |
| @图1 | character_sheet | 主角角色卡 | ✅ true |
| @图2 | storyboard_board | 分镜图 | ✅ true |
| @图3 | keyframe | 高潮动作关键帧 | ✅ true |
| @图4 | end_frame | 尾帧 | ✅ true |

---

## 资产用途标注

| @编号 | asset_purpose | video_safe | 说明 |
|-------|---------------|------------|------|
| @图0 | video_asset | ✅ | 直接进入视频 @图引用 |
| @图1 | video_asset | ✅ | 直接进入视频 @图引用 |
| @图2 | video_asset | ✅ | 直接进入视频 @图引用 |
| @图3 | video_asset | ✅ | 直接进入视频 @图引用 |
| @图4 | video_asset | ✅ | 直接进入视频 @图引用 |

---

## 在视频 Prompt 中的使用

视频 prompt 应**按用途引用**，而非按编号：

```
约束：
  @图(scene_reference) 锁死空间布局/主光方向/地面材质
  @图(character_sheet) 锁死面部/服装/武器
  @图(storyboard_board) 控制镜头顺序/构图/运镜
  @图(keyframe) 锁定高潮动作
  @图(end_frame) 锁定结尾状态
```

---

## 联动

- **写入**：`reference-anchor`（平台校验后，按策略生成映射表）
- **读取**：`video-prompt-assembly`（组装时读取 @编号→用途对应关系）、`project-graph`（构建 asset↔entity 映射）、`consistency-engine`（Video RM 验证 @图 引用完整性）
- **校验**：`final-video-qc`（检查视频 prompt 中的 @引用是否与 asset-map 一致、数量是否匹配）
