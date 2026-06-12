# 编号自动填充规则

所有模板中的编号字段，AI 必须根据提取的故事信息自动填充，**不留空不写占位符**。

---

## 一、编号体系总览（19 种）

| 编号类型 | 领域 | 说明 |
|---------|------|------|
| **VS** | 视觉风格 | 1-53，从 `engines/styles.md` 选取 |
| **EC** | 情绪曲线 | 1-7，驱动分镜节奏 |
| **CN** | 色彩叙事 | 1-60+，从 `engines/color-narrative.md` 选取 |
| **CP** | 构图方案 | 1-35+，从 `knowledge/composition.md` 选取 |
| **ME** | 角色表情 | 1-43，从 `knowledge/micro-expressions.md` 选取 |
| **BL** | 角色姿态 | 1-46，从 `knowledge/body-language.md` 选取 |
| **EV** | 场景环境 | 1-36，从 `knowledge/environments.md` 选取 |
| **WT** | 天气大气 | 1-26，从 `knowledge/weather.md` 选取 |
| **MT** | 材质质感 | 1-36，从 `knowledge/materials.md` 选取 |
| **CR** | 生物/神兽 | 1-36，从 `knowledge/creatures.md` 选取 |
| **PR** | 道具/武器 | 1-46，从 `knowledge/props.md` 选取 |
| **HE** | 历史时代 | 1-15，从 `knowledge/historical-eras.md` 选取 |
| **TR** | 镜头转场 | 1-21，从 `knowledge/transitions.md` 选取 |
| **SE** | 环境音 | 1-16，从 `knowledge/sound-design.md` 选取 |
| **FX** | 拟音/动作音 | 1-20，从 `knowledge/sound-design.md` 选取 |
| **MU** | 音乐情绪 | 1-12，从 `knowledge/sound-design.md` 选取 |
| **RS** | 混响空间 | 1-8，从 `knowledge/sound-design.md` 选取 |
| **SD** | 声音设计组合 | SE+FX+MU+RS 组合编号 |
| **DR** | 台词节奏 | 1-9，从 `knowledge/dialogue-rhythm.md` 选取 |

---

## 二、自动填充规则

### 视觉层（VS/EC/CN/CP）

| 编号 | 来源 | 填充方式 |
|------|------|---------|
| VS 编号 | 用户选择风格 / Step 2 推荐 | 直接填入确认的 VS 编号 |
| EC 编号 | 故事类型 | 悬疑→EC2, 喜剧→EC3, 悲剧→EC4, 爱情→EC5, 成长→EC6, 复仇→EC7, 标准→EC1 |
| CN 编号 | EC+情绪阶段 | EC1→CN4（英雄之旅）, EC5→CN12（浪漫粉）, EC7→CN8（复仇红黑） |
| CP 编号 | 构图场景 | 对峙→CP1三分法, 孤独→CP12孤立, 史诗→CP2对称, 暧昧→CP17负空间 |

### 角色层（ME/BL）

| 编号 | 来源 | 填充方式 |
|------|------|---------|
| ME 编号 | 角色情绪 | 愤怒→ME7, 恐惧→ME12, 悲伤→ME15, 快乐→ME6, 暧昧→ME38, 神圣→ME25 |
| BL 编号 | 角色姿态 | 对峙→BL3战斗姿态, 暧昧→BL23身体接触, 孤独→BL1站立, 战斗→BL33挥剑 |

### 场景层（EV/WT/MT/CR/PR/HE）

| 编号 | 来源 | 填充方式 |
|------|------|---------|
| EV 编号 | 场景地点 | 城市→EV5街道, 山林→EV1竹林, 宫殿→EV25宫殿, 废土→EV18废墟 |
| WT 编号 | 天气 | 明确说雨→WT3, 雪→WT4, 雾→WT5, 无指定→WT1晴朗 |
| MT 编号 | 材质 | 皮肤→MT2, 金属→MT10钢铁, 织物→MT18丝绸, 木材→MT25实木 |
| CR 编号 | 生物 | 有龙→CR1中国龙, 凤凰→CR5, 麒麟→CR2, 无生物→省略此行 |
| PR 编号 | 道具 | 剑→PR1, 法器→PR13, 手机→PR36, 无道具→省略此行 |
| HE 编号 | 时代 | 古代中国→HE1-8, 欧洲→HE9-11, 现代→HE12, 未来→HE13-15 |

### 执行层（TR/SD/SE/FX/MU/RS/DR）

| 编号 | 来源 | 填充方式 |
|------|------|---------|
| TR 编号 | 镜头间转场 | 快切→TR1, 淡入→TR6, 叠化→TR7, 匹配剪辑→TR12 |
| SE 编号 | 场景环境 | 雨→SE1, 风→SE2, 城市→SE5, 战场→SE6, 太空→SE10, 寺庙→SE12 |
| FX 编号 | 动作类型 | 拔剑→FX3, 挥剑→FX4, 爆炸→FX8, 心跳→FX13, 呼吸→FX14, 门→FX10 |
| MU 编号 | 情绪曲线 | 平静→MU1/MU6, 对峙→MU5/MU10, 爆发→MU2/MU9, 余韵→MU1/MU4 |
| RS 编号 | 场景空间 | 室内→RS2, 宫殿→RS4, 室外→RS5, 洞穴→RS3, 太空→RS8 |
| DR 编号 | 台词情绪 | 正常→DR1标准, 紧张→DR2快语速, 悲伤→DR3慢+停顿, 爆发→DR4重音 |
| SD 编号 | 声音组合 | 雨夜→SE1+FX1+FX12, 战斗→SE6+FX3+FX8+MU2, 寺庙→SE12+MU4+RS1 |

---

## 三、填充示例

**输入**："雨夜两个剑修在剑冢对决"

```
VS3 东方玄幻 | EC7 复仇 | CN8 复仇红黑 | CP1 三分法对峙 |
ME7 愤怒+ME15 悲伤(双情绪) | BL3 战斗姿态 |
EV23 剑冢 | WT3 暴雨 | MT10 钢铁剑身+MT25 石质墓碑 |
CR21 剑灵(可选) | PR1 长剑 |
HE3 中国古风 | TR1 快切 | SD: SE2雨声+FX15剑鸣
```

---

## 联动

← 读取 `engines/styles.md`（VS 定义）、`engines/emotion-curve.md`（EC 映射）、`engines/color-narrative.md`（CN 映射）
← 读取 `knowledge/` 目录下各文件获取具体编号定义
→ 被 `templates/steps.md` Step 3.5 调用
→ 被所有模板文件（`templates/full-board.md`、`templates/quick-board.md` 等）引用
→ 被 `rules/prompt-qc.md` 维度 2「编号一致性」检查引用
