# 行业格式导出

生成可导入 Storyboard Pro / FrameForge / Celtx 的标准格式文本，含帧编号、时长、对白轨、音效轨。

## Storyboard Pro 格式

标准分色脚本格式（三栏）：

```
FRAME | VIDEO (画面) | AUDIO (声音)
------|-------------|----------
1     | [景别] [运镜] [画面描述] | [音乐] [音效] [对白]
2     | ... | ...
```

完整格式：

```
PROJECT: [片名]
DURATION: [总时长]
FPS: 24
ASPECT RATIO: [画幅]

---

FRAME 01
SHOT: [景别]
CAMERA: [运镜]
DURATION: [秒]s
VIDEO: [画面描述]
CHARACTER: [角色名]
DIALOGUE: "[对白内容]"
SFX: [音效]
MUSIC: [音乐 mood]
NOTES: [导演注释]

---

FRAME 02
...
```

## FrameForge 格式

3D 预可视化格式：

```
[片名] - Frame [编号]

Camera:
  Position: [X, Y, Z]
  Angle: [角度]
  Lens: [焦段]mm
  Movement: [运镜]

Scene:
  Location: [场景]
  Time: [时间]
  Weather: [天气]

Characters:
  [角色名]: [位置描述]
  [角色名]: [位置描述]

Action: [动作描述]
Dialogue: "[对白]"
Duration: [秒]s
```

## Celtx 脚本格式

标准剧本格式：

```
                    [片名]

场景 [编号]. [内/外] [地点] - [时间]

[场景描述]

                    [角色名]
          [对白内容]

[动作描述]

                    [角色名]
          [对白内容]

切至：
```

## 导出指令

| 用户指令 | 导出格式 |
|---------|---------|
| "导出 Storyboard Pro" | 三栏分色脚本 |
| "导出 FrameForge" | 3D 预可视化格式 |
| "导出 Celtx" | 标准剧本格式 |
| "导出全部" | 三种格式全部输出 |

## 在 Prompt 中使用

追加行业格式导出段：

```
【行业格式导出 - Storyboard Pro】
PROJECT: [片名]
FRAME 01: [景别] [运镜] [画面描述] | SFX: [音效] | MUSIC: [音乐] | DURATION: [秒]s
...
```
