# 场景概念卡模板

> **治理**：生成前读 `state/format-contract-state.md`。产出标记 `draft`，不写回主状态。资产用途 `consistency_asset`——场景卡是多角度空间一致性锚点，全量输出，不派生 clean 版。详见 `rules/format-contract.md` §1.2。
>
> **场景卡只有全量多角度版**。单张场景图没用——锁不住空间。必须多角度锁定空间一致性：LS9 九宫格（9个空间维度）或 LS8 全能参考板（主场景+材质+灯光+天气）。

## 适用场景

场景空间一致性锁定用。**永远多角度输出**——单一场景图无法作为空间锚点。具体版式由 **consistency-trigger** 根据场景复杂度动态决策：

| 场景类型 | 推荐版式 | 说明 |
|---------|---------|------|
| 1场景 + 正面为主 | LS8 全能参考板 | 主场景宽幅 + 环境细节 + 灯光 + 材质 + 天气 |
| 1场景 + 多角度需求 | LS9 九宫格 | 3×3 锁定 9 个空间维度 |
| 1场景 + 4个关键角度 | LS 4宫格 | 正面/左侧/右侧/俯视 四视角锁定 |
| 大型空间/多场景 | 720°全景 / 每场景独立 | 覆盖全角度空间关系 |
| 视频首尾锚点 | LS10 双联宽幅 | 远景建立 + 中近景动作，双帧锁定 |
| 俯视/蓝图需求 | LS27 俯视图 | 鸟瞰空间布局 |
| 材质光照为主 | LS28 材质光照板 | 材质特写 + 光源方向 |

> AI 视频模型需要多角度场景参考锁定空间布局、光源方向、材质和比例关系。无 clean 派生版。

> **视觉密度控制**：生成前读取 `state/visual-control-state.md`。场景卡 density=2-3。所有场景卡 prompt 末尾自动追加：`clear spatial hierarchy, readable depth, controlled atmosphere, consistent spatial reference across all views, no single-angle only, no random decoration, no background clutter`，同时追加：`语言必须与配置一致：读取 api-config.template.env → DEFAULT_LANGUAGE，中文平台输出中文 prompt`。

## Prompt 模板

```text
电影级场景概念卡，主题《[片名]》，场景：[场景名称]。DEFAULT_ASPECT_RATIO（从 api-config.template.env 读取） 横版。版式样式：[LS编号. 版式名称]（见 engines/layout-styles.md）；默认 LS8 场景全能参考板（consistency-trigger 决策，可能改为 LS9 九宫格/LS27 俯视图/LS28 材质光照/720°全景），多角度锁定用 LS9，视频锚点/双状态用 LS10。主场景概念图占据画面 60% 以上区域：地点 [EV编号. 环境类型 + 场景地点]，时代 [HE编号. 历史时代]，时间 [白天/黄昏/夜晚/深夜]，天气 [WT编号. 天气类型] + [SP编号. 特殊大气]，环境材质 [MT编号. 地面]/[MT编号. 墙面]/[MT编号. 天空质感]，氛围 [氛围描述]，构图 [CP编号. 构图法则]。画面要有电影级纵深、强透视、强对比光影、体积光、[环境特效]。如有生物出现：[CR编号. 生物名称]。附加模块：环境细节局部特写（[细节1:MT编号]/[细节2:MT编号]/[细节3:PR编号. 道具]）、灯光方向示意图（[灯光方案]：主光/补光/环境光）、材质参考图（[MT编号. 材质列表]）、天气效果参考（[WT编号]+[SP编号]）、不同时段效果对比（[时段1 vs 时段2]）、声音氛围标注（[SD编号. 环境音]+[SD编号. 拟音]）。场景风格：[风格编号. 风格名称]，[氛围关键词]，色彩叙事 [CN编号. 色彩方案]，配色 [主色1] + [主色2] + [点缀色]。cinematic environment concept art, professional scene design card, wide establishing shot, atmospheric lighting, volumetric light, deep perspective, environmental material details, weather atmosphere effects, lighting diagram, sound atmosphere reference, ultra-detailed, 8K, sharp focus, no watermark, no garbled text, no flat illustration, no marketing poster style。
```

## 场景版式预设

### LS8 场景全能参考板（默认）

沿用上方完整模板：主场景宽幅 + 环境细节 + 灯光方向 + 材质 + 天气 + 声音氛围。适合单张图锁定空间、光线、材质与道具。

### LS9 场景九宫格空间锁定

> ⚠ 九宫格是**空间一致性锚点**（🔒 consistency_asset），不是氛围拼贴。必须严格锁定 9 个空间维度，禁止 9 格都是"好看的相似角度"。

```text
场景九宫格空间锁定参考板，主题《[片名]》，场景：[场景名称]。3x3 九宫格布局，所有 9 格必须是同一地点、同一时间、同一色温、同一天气。9 格内容强制如下：

格1—正面全景：场景主视角全景，展示完整空间纵深、主光源方向、天空/天花板
格2—左侧全景：从场景左侧拍摄的全景，展示左侧空间边界和结构
格3—右侧全景：从场景右侧拍摄的全景，展示右侧空间边界和结构
格4—入口/起点：场景的主要入口、通道起点或角色首次进入的视角
格5—核心地标：场景中最具辨识度的元素（建筑/巨物/神像/关键结构），作为空间中心锚点
格6—关键道具/巨物：场景中的关键物体（武器台/机关/符文/巨物），展示其与空间的比例关系
格7—地面材质：地面/水面/地板材质特写（MT编号），展示纹理、反射、磨损
格8—天空/主光源：天空或天花板 + 主光源方向 + 光源色温 + 体积光方向（如窗户/天窗/洞口）
格9—角色尺度参考：场景中放置一个比例参照物（角色剪影/标准身高标记），明确空间尺度

禁止事项：
- ❌ 9 格都是不同角度的"好看远景"（那不是空间锁定，是氛围拼贴）
- ❌ 9 格像 9 个不同地点
- ❌ 天气/时段/色温跳变
- ❌ 建筑风格/材质/比例不一致
- ❌ 文字/标注遮挡空间信息

每格可有极少量小字作为 production notes（仅格号+用途），但不要求文字可读。

场景信息：[EV编号. 环境类型]，[HE编号. 时代]，[WT编号. 天气]，[MT编号. 材质]，[CN编号. 色彩]。要求空间关系清楚、比例一致、光线一致。
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

> **所有场景卡 prompt 末尾必须追加**（读取 `state/visual-control-state.md`）：
> `clear spatial hierarchy, readable depth, controlled atmosphere, no excessive particles, no random decoration, no background clutter`。
