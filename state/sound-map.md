# 音效映射表

音效不写死在模板里。集中管理：每镜配什么环境音、拟音、音乐、混响。

---

## 音效列表

每条音效一个块：

```yaml
sounds:
  - sound_id: S1
    shot_id: SH01                      # 对应 shot-state 中的镜头ID
    type: ambient                      # ambient / foley / music / reverb
    sd_code: SE2                       # SE1-16 / FX1-20 / MU1-12 / RS1-8
    description: "狂风呼啸，山顶孤绝"    # 音效具体描述
    timing: "0-4s"                     # 音效出现时间段
    volume: medium                     # low / medium / high / fade_in / fade_out
    sync_with: null                    # 与台词/动作的配合（如 "D1结束前1s" 或 "剑落下瞬间"）

  - sound_id: S2
    shot_id: SH03
    type: foley
    sd_code: FX3
    description: "拔剑出鞘，金属摩擦+清越剑鸣"
    timing: "5s（瞬间）"
    volume: high
    sync_with: "SH03 拔剑动作瞬间"

  - sound_id: S3
    shot_id: SH01
    type: music
    sd_code: MU4
    description: "古琴独奏+箫铺底，慢60BPM"
    timing: "0-4s"
    volume: low→medium (fade_in)
    sync_with: null

  - sound_id: S4
    shot_id: SH01
    type: reverb
    sd_code: RS5
    description: "室外旷野，几乎无混响"
    timing: "全镜"
    volume: null

  - sound_id: S5
    shot_id: SH03
    type: music
    sd_code: MU12
    description: "无声留白（台词前音乐骤停）"
    timing: "2s-5s（台词前）"
    volume: mute
    sync_with: "D1 台词前 1s 骤停"
```

---

## 字段说明

| 字段 | 说明 | 写入方 |
|------|------|--------|
| `sound_id` | 音效唯一编号 S1-S(N) | `sound-engine` |
| `shot_id` | 音效所在镜头 ID | `sound-engine`（必须引用 shot-state 中存在的 ID） |
| `type` | 音效类型 | `sound-engine`（ambient/foley/music/reverb） |
| `sd_code` | SD 编号 | `sound-engine`（SE1-16 / FX1-20 / MU1-12 / RS1-8） |
| `description` | 音效具体描述 | `sound-engine` |
| `timing` | 出现时间段/时刻 | `sound-engine` |
| `volume` | 音量 | `sound-engine` |
| `sync_with` | 配合节点 | `sound-engine`（与台词/动作/转场联动） |

---

## 在视频 Prompt 中的使用

视频 prompt 生成时读取此文件，组装音效层：

```
声音层：
- 环境音：SE2. 狂风呼啸，山顶孤绝（SH01 0-4s）
- 拟音：FX3. 拔剑出鞘金属摩擦（SH03 5s瞬间，与拔剑动作同步）
- 音乐：MU4. 古琴独奏+箫 60BPM（SH01 0-4s, fade_in）
- 音乐：MU12. 无声留白（SH03 2-5s，台词前骤停）
- 混响：RS5. 室外旷野（SH01 全镜）
```

---

## 联动

- **写入**：`sound-engine`（自动匹配 SE/FX/MU/RS 编号 + timing）
- **更新**：`incremental-update`（镜头编辑时更新对应条目）
- **读取**：`video-prompt-assembly`（组装音效层）、`project-graph`（构建 sound↔shot 映射）
- **校验**：`final-video-qc`（检查 shot_id 引用 + 音效覆盖完整性）
