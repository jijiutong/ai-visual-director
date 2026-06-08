# 角色设定卡模板

## 使用说明

角色设计确认用。包含两种模式：标准角色设定卡（格式 3）和三视图设定卡（格式 9）。

## 模式 A：标准角色设定卡（格式 3）

```text
电影级角色设定卡，主题《[片名]》，[主角/反派]：[角色姓名]。[画幅比例，默认16:9] 横版，专业角色设计参考板，用于 AI 视频角色一致性。画面分为 6 个模块：

模块1—三视图（占画面左侧40%）：正面全身像、侧面全身像、背面全身像，三个视图严格对齐同一水平线，相同比例。[服装分层描述：底层/外层/配饰]。

模块2—面部多角度（占画面右上20%）：正面 close-up + 左侧3/4角 + 右侧3/4角 + 仰视角度。面部特征：[面部轮廓/眉/眼/鼻/唇/特征]。年龄[年龄]，[肤色]。

模块3—表情范围（占画面右中15%）：4个面部小图—愤怒(ME7 双目圆睁咬牙)、决绝(ME15 紧咬牙关)、平静(ME6 自然放松)、震撼(ME25 瞳孔微扩)。标注每个表情的眉/眼/嘴变化。

模块4—手部特写（占画面右下10%）：握[PR编号.道具]手正面+侧面。[手指特征]，[手部旧伤/特征]。[习惯性手部动作描述]。

模块5—武器/道具特写（占画面底部左8%）：[PR编号.道具名称]，正面+侧面+细节。[尺寸/材质/颜色/纹路]。

模块6—发型/服装动态参考（占画面底部右7%）：[状态1如束发]→[状态2如散开]→[状态3如披肩]。标注变化过程。

不可变特征标注（红色标记）：[列出3-5个绝对不能变的特征，如刀疤位置/眼睛间距/鼻梁形状/发际线/头身比]。这些在任何镜头中不得改变。

服装层次标注：[底层]→[外层]→[配饰]→[鞋靴]，分件标注。

整体风格：[风格编号.风格名称]，[氛围关键词]，配色[主色1]+[主色2]+[点缀色]，色彩方案[CN编号]。character reference sheet for AI video consistency, multiple face angles (front/3-quarter/side/up), expression range variations (4 emotions), hand close-up for prop interaction, hair/costume state transitions, weapon turn-around, layer-by-layer costume breakdown, DO NOT CHANGE markers on critical features, ultra-detailed, 8K, sharp focus, no watermark, no garbled text, no broken faces, no extra limbs, consistent style throughout。
```

## 模式 B：三视图设定卡（格式 9）

```text
专业三视图设定卡，主题《[片名]》，角色：[角色姓名]。16:9 横版，严格正交三视图布局：正面全身、侧面全身、背面全身，三个视图严格对齐同一水平线，相同比例，无透视变形。DNA标注：面部 [面部特征]，发型 [发型]，体型 [体型]，身高 [身高描述]。材质标注（MT编号）：[MT编号. 服装材质]/[MT编号. 配饰材质]/[MT编号. 皮肤质感]。颜色标注（CN编号）：[CN编号. 色彩方案] 含 [主色1]/[主色2]/[点缀色]。道具标注（PR编号）：[PR编号. 武器/道具]。尺寸比例标注：头身比/肩宽/臂长/腿长。背景纯白或中性灰。角色造型：[风格编号. 风格名称]，[服装描述]，[身体姿态: BL编号]。technical character turnaround, orthographic front/side/back views, aligned on same baseline, same scale, no perspective distortion, DNA annotations, material callouts with texture references, color swatches with hex references, prop callouts, dimension annotations, clean white background, professional 3D modeling reference, ultra-detailed, 8K, sharp focus, no watermark, no background elements, no shadows。
```
