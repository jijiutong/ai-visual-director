# 场景概念卡模板

## 适用场景

场景美术方向确认用。展示单一场景的氛围、灯光、材质和环境变化。适合场景概念设计、氛围参考、环境提案。

## Prompt 模板

```text
电影级场景概念卡，主题《[片名]》，场景：[场景名称]。16:9 横版。版式样式：[LS编号. 版式名称]（见 engines/layout-styles.md）；默认 LS8 场景全能参考板（consistency-trigger 决策，可能改为 LS9 九宫格/LS27 俯视图/LS28 材质光照/720°全景），多角度锁定用 LS9，视频锚点/双状态用 LS10。主场景概念图占据画面 60% 以上区域：地点 [EV编号. 环境类型 + 场景地点]，时代 [HE编号. 历史时代]，时间 [白天/黄昏/夜晚/深夜]，天气 [WT编号. 天气类型] + [SP编号. 特殊大气]，环境材质 [MT编号. 地面]/[MT编号. 墙面]/[MT编号. 天空质感]，氛围 [氛围描述]，构图 [CP编号. 构图法则]。画面要有电影级纵深、强透视、强对比光影、体积光、[环境特效]。如有生物出现：[CR编号. 生物名称]。附加模块：环境细节局部特写（[细节1:MT编号]/[细节2:MT编号]/[细节3:PR编号. 道具]）、灯光方向示意图（[灯光方案]：主光/补光/环境光）、材质参考图（[MT编号. 材质列表]）、天气效果参考（[WT编号]+[SP编号]）、不同时段效果对比（[时段1 vs 时段2]）、声音氛围标注（[SD编号. 环境音]+[SD编号. 拟音]）。场景风格：[风格编号. 风格名称]，[氛围关键词]，色彩叙事 [CN编号. 色彩方案]，配色 [主色1] + [主色2] + [点缀色]。cinematic environment concept art, professional scene design card, wide establishing shot, atmospheric lighting, volumetric light, deep perspective, environmental material details, weather atmosphere effects, lighting diagram, sound atmosphere reference, ultra-detailed, 8K, sharp focus, no watermark, no garbled text, no flat illustration, no marketing poster style。
```

## 场景版式预设

### LS8 场景全能参考板（默认）

沿用上方完整模板：主场景宽幅 + 环境细节 + 灯光方向 + 材质 + 天气 + 声音氛围。适合单张图锁定空间、光线、材质与道具。

### LS9 场景九宫格锁定

```text
同一场景九宫格锁定参考板，主题《[片名]》，场景：[场景名称]。3x3 九宫格布局，所有 9 格必须是同一地点、同一时间、同一色温、同一天气。

上排：正面全景 / 左侧全景 / 右侧全景。中排：入口或门 / 核心元素特写 / 关键道具或机关。下排：地面材质 / 光源与阴影方向 / 天空或天花板。每格可有极少量小字作为 production notes，但不要求文字可读。

场景信息：[EV编号. 环境类型]，[HE编号. 时代]，[WT编号. 天气]，[MT编号. 材质]，[CN编号. 色彩]。要求空间关系清楚、比例一致、光线一致，禁止 9 格像 9 个不同地点、天气跳变、建筑风格漂移。
```

### LS10 双联宽幅场景锚点

```text
双联宽幅场景视频锚点，主题《[片名]》，场景：[场景名称]。16:9 横版，画面上下两条 21:9 超宽电影帧，几乎无文字。

上方宽幅：远景建立空间，展示 [场景名称] 的完整尺度、天空、地面、主光方向和角色所在位置。下方宽幅：同一场景的中近景或动作阶段，展示角色与关键道具/巨物/建筑的互动。两张图必须保持同一场景空间、同一时间、同一光线、同一角色服装，作为视频首尾或阶段锚点。

可扩展为三联：远景建立 / 动作爆发 / 余韵收束。禁止上下两张无关、角色换脸、色温变化无原因、大量文字标注。
```

## 完整示例

### 输入
故事：雨夜，一个人走在城市天桥上，很悲伤

### 提取变量
- 片名：雨夜独行
- 场景名称：城市天桥（雨夜）
- EV编号：EV5 城市街道 / EV17 天桥
- HE编号：HE12 现代
- 时间：深夜
- WT编号：WT3 暴雨
- MT编号：MT26 沥青 / MT18 钢铁
- CP编号：CP12 孤立构图
- CN编号：CN15 忧郁蓝灰
- VS编号：VS27 王家卫情绪
- SD编号：SE2 雨声

### 输出 Prompt
```
电影级场景概念卡，主题《雨夜独行》，场景：城市天桥（雨夜）。16:9 横版。
主场景概念图占据画面 60% 以上区域：地点 EV5 城市街道 + EV17 天桥，
时代 HE12 现代，时间 深夜，天气 WT3 暴雨 + 雨雾大气，环境材质 MT26 沥青/MT18 钢铁/玻璃反光，
氛围 孤独、忧郁、电影感，构图 CP12 孤立构图（人物在画面中小而居中）。
画面要有电影级纵深、强透视、强对比光影、体积光、雨幕效果。
附加模块：环境细节局部特写（湿沥青近景/霓虹招牌反光/栏杆雨滴）、
灯光方向示意图（钠灯暖黄主光2700K：从上向下 + 霓虹红/蓝补光）、
材质参考图（MT26 沥青/MT18 钢铁/MT10 玻璃/MT19 水膜）、
天气效果参考（WT3 暴雨+雨幕雾气）、
不同时段效果对比（深夜雨 vs 雨后清晨）、
声音氛围标注（SE2 雨声+SE7 远处车流+SE15 寂静感）。
场景风格：VS27 王家卫情绪，霓虹、慢门、浓烈，
色彩叙事 CN15 忧郁蓝灰，配色 深蓝 + 暖黄 + 霓虹红。
cinematic environment concept art, professional scene design card, wide establishing shot,
atmospheric lighting, volumetric light, deep perspective, environmental material details,
weather atmosphere effects, lighting diagram, sound atmosphere reference,
ultra-detailed, 8K, sharp focus。
```

## 变量说明

> 运行时从 `state/variable-registry.md` 读取最终值。参考文件列为原始数据来源。

| 变量 | 参考文件 | 填充方式 |
|------|---------|---------|
| EV编号 | `knowledge/environments.md` | 按场景地点自动匹配 |
| HE编号 | `knowledge/historical-eras.md` | 按故事时代自动匹配 |
| WT编号 | `knowledge/weather.md` | 故事明确天气 → 匹配编号；未指定 → WT1 晴朗 |
| MT编号 | `knowledge/materials.md` | 按场景地面/墙面/水体材质匹配 |
| CP编号 | `knowledge/composition.md` | 按场景情绪匹配：孤独→CP12, 史诗→CP2, 对峙→CP1 |
| CN编号 | `engines/color-narrative.md` | 按情绪曲线匹配 |
| VS编号 | `engines/styles.md` | 用户选择或智能推荐 |
| SD编号 | `knowledge/sound-design.md` | 按场景环境自动匹配 |
