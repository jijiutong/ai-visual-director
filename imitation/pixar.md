# 皮克斯 — Pixar Animation Studios

## 1. Composition（构图）

- **画幅比**：1.85:1 或 2.39:1（宽银幕），部分短片用 16:9
- **构图方式**：经典三分法 + 引导线构图。画面信息层级清晰——第一眼看到主角，然后是环境
- **空间深度**：3D 渲染的景深模拟（bokeh + depth of field）。前景常有过肩虚化物体引导视线
- **标志性构图**：角色眼睛在画面上 1/3 处（黄金分割点），视线方向留空间
- **空间处理**：空间设计服务于情感——温暖安全的空间=圆形；压迫的空间=锐角三角形

## 2. Camera（运镜）

- **运镜方式**：模拟真实摄影机——摇臂升降、dolly 推拉、稳定器跟拍。虚拟但遵循物理规律
- **焦段偏好**：广角近摄（夸张透视，增强喜剧感）+ 长焦（压缩空间，情感场景）
- **运动节奏**：跟随角色动作节奏——快动作=快跟拍，慢情感=慢推
- **标志性运镜**：从大特写拉到极远景（whip zoom out）展示空间变化；360°环绕角色揭示关键信息
- **镜头语言**：CG 渲染但模仿真实摄影机的 lens flare / bokeh / chromatic aberration / film grain

## 3. Lighting（灯光）

- **灯光方案**：电影级三点布光 + 全局光照。每束光都有叙事动机（窗户/台灯/篝火/月光）
- **光源方向**：侧逆光（角色边缘光/发丝光）、柔和顶光（安全场景）、底光（危机/恐惧场景极少用）
- **光质**：柔光为主（CG 的 path tracing 全局光照），阴影柔和不死黑
- **标志性**：角色眼睛里有反射高光（catchlight）—— Pixar 标志。眼神光是情感窗口
- **光线情绪**：喜悦=温暖金色+全局亮；悲伤=冷蓝+暗部偏紫；冒险=高对比侧光+环境补光

## 4. Color（色彩）

- **配色方案**：色彩理论驱动——互补色（橙蓝）、类似色（暖色系）、三色方案按场景情绪选择
- **色彩象征**：红色/橙色=冒险/激情/家；蓝色=悲伤/孤独/回忆；紫色=魔法/未知/转变
- **调色倾向**：高饱和但通过材质粗糙度控制——皮肤次表面散射、金属折射、布料衰减
- **标志性调色**：每个场景有明确的色彩剧本（color script）——场景之间的色彩过渡就是情感弧线
- **时段色彩**：白天=明亮饱和暖色；黄昏=金色/紫色渐变；夜晚=深蓝+暖黄灯光窗口

## 5. Rhythm（节奏）

- **剪辑节奏**：中速偏快。对白 3-6 秒/镜，动作 1-3 秒/镜，情感镜 5-10 秒
- **镜头时长偏好**：建立镜 5-8 秒（世界观展示）、反应镜（reaction shot）2-3 秒
- **叙事节奏**：三幕剧经典结构。前 10 分钟建立世界和角色欲望。第二幕末尾"最低点"
- **标志性节奏**：蒙太奇段落（时间流逝/训练/冒险）——快节奏 1-2 秒/镜 + 音乐驱动
- **笑点节奏**：视觉笑点给 2-3 秒消化时间，对话笑点紧接角色反应镜

## 6. Character Blocking（人物调度）

- **走位方式**：角色移动有清晰的目的地（从 A 走到 B），每个走位都有叙事动机
- **角色与摄影机关系**：摄影机参与叙事——角色开心时摄影机轻快跳动，悲伤时摄影机缓慢远离
- **群像调度**：多人场景用圆形或半圆排列——每个角色在画面中清晰可见，有独立的反应
- **标志性**：角色独处时的细微动作——叹气、低头、摸旧物。静默表演（pantomime）是核心
- **身体语言**：夸张但基于真实物理。角色的"不完美动作"（绊倒/碰头/掉落）增加人情味

## 7. Prompt Patterns（Prompt 模式）

```
氛围句式：
  "Pixar animation style, cinematic lighting, expressive character design, subsurface scattering on skin, detailed environment"

关键视觉元素：
  - "cozy living room, warm afternoon sunlight through sheer curtains, dust motes floating in light beams, family photos on shelf"
  - "vast colorful landscape, painterly sky gradient, lone character on hilltop silhouetted against sunset, wind in grass"
  - "cluttered workshop interior, every surface covered with tools and mementos, one warm desk lamp, character at workbench"
  - "underwater scene, god rays piercing through surface, bioluminescent particles, character swimming with determined expression"

人物描述句式：
  "expressive [character], large emotive eyes with catchlight reflections, soft skin with subtle peach fuzz, dynamic pose with clear silhouette"

材质感：
  "PBR materials — brushed metal, weathered wood, woven fabric texture, ceramic gloss, each surface tells age and use"
```

## 8. Negative Constraints（禁止方向）

- ❌ photorealistic human characters（禁用写实人类——始终风格化）
- ❌ flat/ambient-only lighting（禁用纯环境光——必须有三点布光感）
- ❌ gratuitous violence（禁用无意义暴力——冲突必须有叙事目的）
- ❌ cynical/nihilistic tone（禁用虚无主义——始终有希望内核）
- ❌ static/unmotivated camera（禁用无动机静态镜头）
- ❌ muddy color palette（禁用脏乱配色——色彩始终有意图）
- ❌ dead-eye characters（禁用无神眼睛——眼睛必须有 catchlight）
- ❌ hyper-stylized 2D flat look（禁用纯平面 2D——始终有体积感和深度）

## 9. VS Mapping（映射到现有风格）

- **最接近 VS**：VS3（好莱坞商业大片）——共用电影级布光和史诗镜头语言
- **差异**：VS3 是实拍电影感，Pixar 是 3D 动画风格化——需追加 subsurface scattering / PBR materials / expressive character design
- **组合建议**：VS3 的镜头语言（epic wide / hero low angle / crane up）+ 动画专有的材质渲染 + Pixar 色彩剧本（warm amber / teal blue / purple magic hour）
- **适配题材**：家庭冒险、成长故事、奇幻喜剧、情感叙事
- **不适用题材**：黑暗恐怖、写实战争、成人情色
