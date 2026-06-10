# 台词映射表

台词不写死在模板里。集中管理：谁说的、在哪一镜、字幕怎么走。

---

## 台词列表

每条台词一个块：

```yaml
dialogues:
  - dialogue_id: D1
    shot_id: SH07                      # 对应 shot-state 中的镜头ID
    speaker: 墨渊                      # 引用 variable-registry 中的角色名
    text: "所有人感受。"                # 台词内容
    delivery: 低声、平静、压迫感         # 语气/表演要求
    subtitle:
      enabled: true
      position: bottom_center          # bottom_center / top_center / bottom_left
      duration: 14-15s                 # 字幕出现时间段
    lip_sync: true                     # 是否需要口型同步
```

---

## 字段说明

| 字段 | 说明 | 写入方 |
|------|------|--------|
| `dialogue_id` | 台词唯一编号 D1-D(N) | `video-director` |
| `shot_id` | 台词所在镜头 ID | `video-director`（必须引用 shot-state 中存在的 ID） |
| `speaker` | 说话者角色名 | `video-director`（必须引用 variable-registry 中的角色） |
| `text` | 台词内容 | `story-intake`（提取）或 `video-director`（补全） |
| `delivery` | 语气/表演要求 | `video-director` |
| `subtitle.enabled` | 是否出字幕 | `video-director` |
| `subtitle.position` | 字幕位置 | `reference-anchor`（按平台惯例调整） |
| `subtitle.duration` | 字幕显示时间段 | `video-director` |
| `lip_sync` | 口型同步 | `video-director` |

---

## 在视频 Prompt 中的使用

视频 prompt 生成时读取此文件，组装台词约束层：

```
台词：SH07 口型同步「所有人感受。」说话者：墨渊。
      语气：低声、平静、压迫感。
      字幕：底部中央，14-15s。
```

如果台词镜号变了（比如编辑后 SH07→SH05），只改此文件的 `shot_id`，视频 prompt 引用自动跟随。

---

## 台词的跨镜连续性

如果同一角色在多镜有台词：

```yaml
  - dialogue_id: D2
    shot_id: SH03
    speaker: 墨渊
    text: "..."
    continues_from: D1                 # 可选：与上一条台词的关系
```

---

## 联动

- **写入**：`story-intake`（提取台词文本） → `video-director`（分配 shot_id + delivery + subtitle）
- **更新**：`incremental-update`（台词修改时更新对应条目）
- **读取**：`video-prompt-assembly`（组装第 3 层约束时读取）、`project-graph`（构建 dialogue↔shot + dialogue↔character 映射）
- **校验**：`final-video-qc`（检查 shot_id 是否在 shot-state 中存在、speaker 是否在 variable-registry 中存在）
