# 海报模板

## 适用场景

电影海报/宣传海报。支持竖版（2:3）和横版（16:9）两种画幅。适合电影宣传、社交媒体推广、概念提案封面。

## Prompt 模板

```text
电影级宣传海报，主题《[片名]》。[画幅比例，默认2:3] [竖版/横版]，professional cinematic movie poster design，构图 [CP编号. 构图法则]。主视觉：[主视觉描述 — 角色剪影(BL编号. 姿态)/面部特写(ME编号. 微表情)/核心场景(EV编号)/象征物(PR编号)]，占据画面 50-70%。片名《[片名]》以 [字体风格] 排版在 [位置]，副标题/标语 "[标语内容]" 在片名下方。底部信息：[导演/主演/上映日期等，作为排版质感不要求可读]。背景：[EV编号. 环境/天空/城市/抽象纹理(MT编号)]，天气 [WT编号. 天气]，时代 [HE编号. 历史时代]。如有生物：[CR编号. 生物]。海报风格：[风格编号. 风格名称]，[氛围关键词]，色彩叙事 [CN编号. 色彩方案]，配色 [主色1] + [主色2] + [点缀色]，灯光 [灯光方案]，专业电影海报质感，高对比、强视觉冲击、层次丰富。cinematic movie poster, dramatic lighting, professional typography integration, high contrast, layered composition, environmental atmosphere, ultra-detailed, 8K, sharp focus, no watermark, no logo, no random large text, no garbled Chinese, no broken faces, no flat illustration, no cartoon style。
```

画幅自动适配：
- 用户说 "海报" → 默认 2:3 竖版
- 用户说 "横版海报" → 16:9 横版
- 用户说 "小红书" → 3:4 竖版
- 用户说 "朋友圈海报" → 1:1 方形

## 完整示例

### 输入
修仙世界，两位剑修在剑冢对决，他们曾经是师徒

### 提取变量
- 片名：剑冢决
- VS编号：VS3 东方玄幻
- CN编号：CN8 复仇红黑
- CP编号：CP1 三分法对峙
- EV编号：EV23 剑冢
- WT编号：WT6 灵气粒子
- HE编号：HE3 唐代
- BL编号：BL3 战斗姿态
- PR编号：PR1 长剑
- ME编号：ME7 愤怒 + ME15 悲伤

### 输出 Prompt
```
电影级宣传海报，主题《剑冢决》。2:3 竖版，professional cinematic movie poster design，
构图 CP1 三分法对峙（左右各一剑修，中间留白处剑意碰撞）。

主视觉：左侧师父（白发，青衫破损，面容沧桑 ME15 悲伤，
手按剑柄准备拔剑）vs 右侧徒弟（黑发束冠，黑衣如墨 ME7 愤怒，
剑已出鞘 PR1 长剑寒光），两人之间剑意化作金色裂纹撕裂画面，
占据画面 60%。

片名《剑冢决》以 魏碑体+金属质感 排版在 画面下方中央，
副标题/标语 "师恩断，剑锋见" 在片名下方。
底部信息：制作信息作为排版质感。

背景：EV23 剑冢，遍地断剑石碑 PR1 各种古剑斜插于地，
天气 WT6 灵气粒子如金色萤火飘散，时代 HE3 唐代。
海报风格：VS3 东方玄幻，史诗、悲壮、宿命感，
色彩叙事 CN8 复仇红黑，配色 墨黑 + 血红 + 暗金，
灯光 逆光剪影+灵气粒子光 从剑意裂缝中透出，
专业电影海报质感，高对比、强视觉冲击、层次丰富。
cinematic movie poster, dramatic lighting, professional typography integration,
high contrast, layered composition, ultra-detailed, 8K, sharp focus。
```

## 变量说明

| 变量 | 参考文件 | 填充方式 |
|------|---------|---------|
| 片名 | — | Step 1 提取，2-8 字短标题 |
| 标语 | — | 由核心冲突提炼，≤12 字 |
| VS编号 | `engines/styles.md` | 用户选择或智能推荐 |
| CN编号 | `engines/color-narrative.md` | 按情绪曲线匹配 |
| CP编号 | `knowledge/composition.md` | 海报通常 CP1(对峙)/CP2(对称)/CP13(中心) |
| BL编号 | `knowledge/body-language.md` | 按角色状态匹配 |
| ME编号 | `knowledge/micro-expressions.md` | 按角色情绪匹配 |
| EV编号 | `knowledge/environments.md` | 按故事场景匹配 |
| PR编号 | `knowledge/props.md` | 按角色武器/道具匹配 |
| 画幅 | — | 默认 2:3，用户可指定 |
