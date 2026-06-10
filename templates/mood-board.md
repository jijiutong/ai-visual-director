# 情绪板模板

## 适用场景

美术方向确认用。展示色彩基调、材质参考、灯光氛围和纹理方向。适合前期视觉开发、与团队/客户对齐视觉方向。

## Prompt 模板

```text
电影级情绪板 / 视觉氛围参考，主题《[片名]》。16:9 横版，professional mood board / visual atmosphere reference board。
包含模块：
(1) 色彩色卡（CN编号. 色彩方案）— [5-8] 个色块，标注 [色名/用途/情绪关联]，配色方案 [配色方案名]，色彩情绪从 [起始色] 渐变到 [爆发色]；
(2) 材质贴图参考（MT编号）— [MT编号. 材质1]、[MT编号. 材质2]、[MT编号. 材质3]、[MT编号. 材质4] 的局部纹理展示；
(3) 灯光氛围小图 — [3-4] 个小型灯光效果展示：[灯光方案1]、[灯光方案2]、[灯光方案3]，标注色温/方向/强度；
(4) 天气大气参考（WT编号+SP编号）— [WT编号. 天气效果] + [SP编号. 特殊大气] 的视觉表现；
(5) 环境参考（EV编号）— [EV编号. 环境类型] 的关键视觉元素；
(6) 字体参考 — [标题字体风格] + [正文字体风格]，作为质感展示；
(7) 身体语言参考（BL编号）— [BL编号. 姿态1]、[BL编号. 姿态2] 的角色姿态参考；
(8) 生物/道具参考（如有）（CR编号/PR编号）— [CR编号. 生物] 或 [PR编号. 道具] 的设计方向。
整体色调 [主色1] + [主色2] + [点缀色]（CN编号. 色彩方案），氛围 [氛围描述]，情绪曲线 [EC编号]。
风格方向：[风格编号. 风格名称]。
professional mood board, color palette swatches with emotional labels, material texture samples, lighting atmosphere references with color temperature, weather atmosphere references, environment concept references, typography samples, body language pose references, creature/prop design references, cohesive visual theme, cinematic color grading, ultra-detailed, 8K, clean layout, no watermark, no garbled text, no random elements, organized and labeled sections。
```

## 完整示例

### 输入
雨夜独行 · 王家卫情绪

### 提取变量
- 片名：雨夜独行
- EC编号：EC5 爱情 或 EC2 悬疑（按故事决定）
- CN编号：CN15 忧郁蓝灰
- 配色：深蓝 + 暖黄（路灯）+ 霓虹红（点缀）
- VS编号：VS27 王家卫情绪

### 输出 Prompt
```
电影级情绪板 / 视觉氛围参考，主题《雨夜独行》。16:9 横版，
professional mood board / visual atmosphere reference board。
包含模块：
(1) 色彩色卡（CN15 忧郁蓝灰）— 8 个色块：深蓝(夜空)、墨绿(积水反光)、暖黄(钠灯)、
   霓虹红(招牌)、暗灰(湿沥青)、银色(栏杆)、品红(霓虹)、暗紫(远处建筑)，
   色彩方案 互补色（蓝 vs 黄/红），色彩情绪从 深蓝忧郁 渐变到 暖黄孤独再到 霓虹红刺痛；
(2) 材质贴图参考 — MT26 湿沥青(微反光)、MT18 锈蚀钢铁(栏杆)、MT19 水膜(积水)、
   MT10 磨砂玻璃(建筑反射) 的局部纹理展示；
(3) 灯光氛围小图 — 3 个小图：路灯钠灯暖黄2700K(从上向下)、
   霓虹招牌红/蓝(侧面补光)、远处车灯白6000K(间歇性)，
   标注色温/方向/强度；
(4) 天气大气参考（WT3 暴雨 + 雨雾）— 雨滴、积水反光、雾气半掩建筑的视觉表现；
(5) 环境参考（EV5 城市街道 + EV17 天桥）— 城市夜景、霓虹灯、天桥结构；
(6) 字体参考 — 繁体中文衬线体(王家卫片头风格) + 英文细体，作为质感展示；
(7) 身体语言参考 — BL1 独自站立(低头/手插口袋)、BL12 倚靠栏杆(远眺/背影)
   的角色姿态参考；
(8) 无生物/道具参考。
整体色调 深蓝 + 暖黄 + 霓虹红（CN15 忧郁蓝灰），氛围 孤独、潮湿、夜晚城市，
情绪曲线 EC2 悬疑（平静→不安→对峙→余韵）。
风格方向：VS27 王家卫情绪。
professional mood board, cohesive visual theme, cinematic color grading, ultra-detailed, 8K。
```

## 变量说明

| 变量 | 参考文件 | 填充方式 |
|------|---------|---------|
| EC编号 | `engines/emotion-curve.md` | 按故事类型匹配 |
| CN编号 | `engines/color-narrative.md` | EC自动推导CN |
| VS编号 | `engines/styles.md` | 用户选择或智能推荐 |
| MT编号 | `knowledge/materials.md` | 按场景主体材质匹配 4-6 种 |
| EV编号 | `knowledge/environments.md` | 按故事场景匹配 |
| WT编号 | `knowledge/weather.md` | 按故事天气匹配 |
| BL编号 | `knowledge/body-language.md` | 按角色状态匹配 2 种 |
| 灯光方案 | `knowledge/lighting.md` | 按场景情绪匹配 3-4 种 |
