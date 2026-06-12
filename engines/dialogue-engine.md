# 台词设计引擎

从故事中提取对话，为每句台词分配镜头、标注表演要求、设计字幕方案。独立于 video-director，可单独调用或通过 `/dialogue` 子路由使用。

---

## 职责边界

| 引擎 | 职责 |
|------|------|
| `story-intake` | 从故事中提取原始对话文本 |
| **`dialogue-engine`（本引擎）** | 分配 shot_id / 标注 delivery+rhythm / 设计 subtitle / 标注 lip_sync |
| `video-director` | 调用本引擎，不自己写台词 |
| `video-prompt-assembly` | 读取 dialogue-map 组装视频 prompt 第3层约束 |

---

## 一、读取

| 读取参数 | 来源 | 用途 |
|---------|------|------|
| 角色列表（speaker） | `state/variable-registry.md` → characters.*.name | 台词归属角色 |
| 镜头列表（shot_id） | `state/shot-state.md` → shots[].shot_id | 台词分配到镜 |
| 各镜动作描述 | `state/shot-state.md` → shots[].action | 判断讲话时机 |
| 情绪曲线 | `state/variable-registry.md` → style.emotion_curve | 语气/节奏基调 |
| 台词节奏知识库 | `knowledge/dialogue-rhythm.md` | 停顿/重音/语速/音量/沉默编码 |

---

## 二、决策规则

### 台词提取与分配

```
1. 从 story-intake 的冲突描述中提取对话意图
2. 判断每句台词归属哪个角色（speaker）
3. 匹配台词到镜头：
   ├─ 对话发生在两个角色之间 → 分配正反打镜头（对峙/对话镜）
   ├─ 独白 → 分配角色单人镜
   ├─ 旁白 → 分配全景/建置镜
   └─ 无声镜头 → 标注 [沉默类型]（来自 dialogue-rhythm.md §三）
4. 同一镜最多 1-2 句台词（超过则拆镜或挑重点）
```

### 语气标注（Delivery）

| 情绪 | 语气描述 | 标注 |
|------|---------|------|
| 愤怒 | 咬牙切齿、声音低沉压抑后爆发 | `[VL5 大喊]` `[ST2 情感重音]` `[SP4 快]` |
| 悲伤 | 声音颤抖、气息不稳、停顿多 | `[VL2 低声]` `[ST5 颤音]` `[SP2 慢]` `[SL5 悲痛沉默]` |
| 平静 | 自然沉稳、语速均匀 | `[VL3 正常]` `[SP3 正常]` |
| 紧张 | 语速加快、呼吸急促、断句变多 | `[VL4 提高]` `[SP4 快]` `[ST8 断续音]` |
| 暧昧 | 声音轻柔、气息感强 | `[VL1 耳语]` `[ST4 气声]` `[SP2 慢]` |
| 秘密 | 压低声音、简短 | `[VL1 耳语]` `[SP4 快]` `[SP1 极慢(关键词)]` |
| 威胁 | 低沉、缓慢、每一字都咬得清楚 | `[VL2 低声]` `[ST1 逻辑重音]` `[SP2 慢]` |
| 崩溃 | 先正常→破音→哭腔→断续 | `[VL2→VL5→VL2]` `[ST6 破音]` `[ST8 断续音]` `[SL5]` |

### 字幕设计

| 规则 | 说明 |
|------|------|
| 默认位置 | `bottom_center`（底部中央） |
| 双人对话 | 各自字幕在对应角色下方 `bottom_left` / `bottom_right` |
| 旁白 | `top_center` 或 `bottom_center`，斜体区分 |
| 内独白 | `bottom_center` + 标注「内心独白」 |
| 字幕时长 | 台词起始帧到结束帧，口型同步 |
| 口型同步 | 所有面对面讲话开 `lip_sync: true`，远景/背面开 `false` |

### 节奏标注（Rhythm）

读取 `knowledge/dialogue-rhythm.md`，自动标注：
- **停顿标记**：根据语义自动加 `｜`（刻意停顿 1.5s）/ `……`（长沉默 2s+）
- **重音类型**：根据情绪自动标注 `**加粗**`（逻辑/情感重音）/ `*斜体*`（轻声）
- **语速变化**：自动加 `[SP1-SP7]` 标记
- **音量变化**：自动加 `[VL1-VL7]` 标记
- **沉默插入**：对话间隙自动标注 `[SL1-SL7]`

---

## 三、输出 → 写入 state/dialogue-map.md

```yaml
dialogues:
  - dialogue_id: D1
    shot_id: SH03
    speaker: 墨渊
    text: "你走吧……我不拦你。"
    delivery: 低声、缓慢、压抑 [VL2 低声] [SP2 慢] [ST8 断续音]
    rhythm: "你走｜吧……[SL2 犹豫沉默 2s]｜我**不**拦你。"
    subtitle:
      enabled: true
      position: bottom_center
      duration: 3-6s
      style: standard
    lip_sync: true
    continues_from: null

  - dialogue_id: D2
    shot_id: SH04
    speaker: 韩霜
    text: "为什么！"
    delivery: 激动、声音发抖 [VL4 提高] [ST5 颤音] [SP4 快]
    rhythm: "**为什么**！[SL3 震惊沉默 3s]"
    subtitle:
      enabled: true
      position: bottom_center
      duration: 7-8s
      style: standard
    lip_sync: true
    continues_from: D1
```

---

## 四、输出格式（命令行）

```markdown
【台词脚本】

片名：《[片名]》| 情绪曲线：[EC编号] | 总台词：[N]句

角色台词表：
  [角色名]（[N]句台词）— 语气基调：[描述]
  [角色名]（[N]句台词）— 语气基调：[描述]

台词序列：
  SH03 D1 | [角色名]：「[台词]」
    表演：[delivery + rhythm标注]
    字幕：底部中央，[时长]
    口型同步：✅

  SH04 D2 | [角色名]：「[台词]」
    表演：[delivery + rhythm标注]
    字幕：底部中央，[时长]
    口型同步：✅

【沉默节奏】
  SH03→SH04 之间：[SL2 犹豫沉默 2s] — 角色犹豫不敢开口
  SH05：[SL4 对峙沉默 5s+] — 两人对视，张力拉满

【字幕方案】
  格式：底部中央黑底白字 / 双人对话各自底部左右
  字体：中文黑体 / 英文 Helvetica
  时间轴：全部对齐 shot-state 时间码
```

---

## 五、联动

← 读取 `state/variable-registry.md`（characters / emotion_curve）
← 读取 `state/shot-state.md`（shot_id / action）
← 读取 `knowledge/dialogue-rhythm.md`（停顿/重音/语速/音量/沉默编码）
→ 写入 `state/dialogue-map.md`（dialogue_id/shot_id/speaker/text/delivery/rhythm/subtitle/lip_sync）
→ 传递给 `templates/dialogue-script.md` 生成台词脚本
→ 被 `video-prompt-assembly` 读取（第3层台词约束）
→ 被 `final-video-qc` 第12项检查
