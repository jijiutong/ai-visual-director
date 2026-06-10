# 漫画分镜页 & 四格漫画模板

## 适用场景

支持两种模式：
- **漫画分镜页（格式 6）**：5-9 格漫画布局，适合叙事性强的场景
- **四格漫画（格式 8）**：起承转合四格，适合社交媒体、轻松内容、快速表达

## 模式 A：漫画分镜页（格式 6）

```text
专业漫画分镜页，主题《[片名]》，[页码/章节]。[画幅比例，默认3:4] [竖版/横版]，[5-9] 格漫画布局，每格大小根据情绪重要性变化（高潮格最大，过渡格较小），构图遵循 [CP编号. 构图法则]。情绪曲线 [EC编号] 驱动面板大小分配。阅读顺序 [从左到右/从上到下]。内容：第1格 [画面描述，角色ME编号. 微表情，BL编号. 姿态，环境EV编号]，第2格 [画面描述]，第3格 [画面描述]，第4格 [画面描述]，第5格 [画面描述]...（根据格数继续，每格标注角色表情变化ME编号、身体语言BL编号、天气WT编号）。对话气泡（白色椭圆+黑色边框）标注 "[台词内容]（DR编号. 节奏标注）"，旁白框（黑色半透明矩形+白色文字）标注 "[旁白内容]"，如有电影感台词字幕，画面底部加字幕框（黑色半透明圆角矩形+白色文字）：「[台词]」。效果线 [速度线/集中线/闪光]，音效文字 "[SD编号. 音效文字]"。角色DNA：[核心面部/服装特征]，保持跨格一致。场景：[EV编号. 环境]，天气 [WT编号. 天气]。配色 [CN编号. 色彩方案]：[主色1] + [主色2] + [点缀色]。professional manga/comic page layout, clear panel borders, speech bubbles with dialogue text, narration boxes, cinematic subtitle boxes for key dialogue, action lines, sound effects integrated, consistent character DNA across panels (face/hair/costume), micro-expression progression, body language poses, weather atmosphere, cinematic pacing, ultra-detailed, 8K, sharp focus, no watermark, no garbled text, no broken faces, no extra limbs, clean panel borders。
```

## 模式 B：四格漫画（格式 8）

```text
四格漫画，主题《[片名]》。4:5 竖版（社交媒体比例），严格 4 格布局，[2x2 网格/纵向排列]，构图 [CP编号. 构图法则]。结构：
第1格"起"（setup）：[场景引入/角色登场，EV编号. 环境，角色ME编号. 表情，BL编号. 姿态]，
第2格"承"（development）：[情节发展/对话，DR编号. 台词节奏，角色ME编号. 表情变化]，
第3格"转"（turn/climax）：[意外转折/高潮，角色ME编号. 高潮表情，BL编号. 动作姿态，特效]，
第4格"合"（punchline）：[笑点/反转/余韵，角色ME编号. 收尾表情]。
每格含对话气泡 "[台词]（DR编号. 节奏）"，音效文字 "[SD编号. 音效]"。
角色DNA：[核心面部/服装特征] 跨格一致。场景：[EV编号. 环境]。
配色 [CN编号. 色彩方案]：[主色1] + [主色2] + [点缀色]。
4-panel comic strip, kishōtenketsu structure (setup-development-turn-punchline), speech bubbles with rhythm notation, clear reading order, comedic timing visible in panel sizes, consistent character DNA across panels, micro-expression progression (ME编号), body language (BL编号), ultra-detailed, 8K, sharp focus, no watermark, no garbled text, no broken faces, clean panel borders。
```

## 完整示例 — 四格漫画

### 输入
办公室play，两个男主，更暧昧

### 提取变量
- 片名：午后的咖啡
- VS编号：VS5 都市情绪（或 VS37 都市情绪电影）
- CN编号：CN12 浪漫粉（暧昧）
- EV编号：EV27 现代办公室
- HE编号：HE12 现代
- BL编号：BL23 身体接触
- ME编号：ME38 暧昧眼神 → ME37 躲闪

### 输出 Prompt
```
四格漫画，主题《午后的咖啡》。4:5 竖版（社交媒体比例），严格 4 格布局，2x2 网格。
结构：
第1格"起"：办公室茶水间 EV27 现代办公室，角色A（穿白衬衫戴金丝眼镜 ME38 暧昧眼神
 单手递咖啡杯）和角色B（西装微敞领带松垮 ME37 视线躲闪）在咖啡机旁擦肩，
 旁白框"午后的茶水间，总是格外安静...";
第2格"承"：BL23 身体接触 — 手指在接咖啡杯时不经意碰到一起，
 两人同时抬眼 ME7 惊讶对视，气氛凝固，对话气泡"啊..."（DR3 停顿节奏）;
第3格"转"：同事突然推门而入，两人迅速拉开距离，
 角色A扶眼镜掩饰 ME16 尴尬，角色B低头喝咖啡 BL26 双手抱臂防御姿态，
 音效文字"SE12 门突然打开"+"FX2 脚步声";
第4格"合"：同事离开后，角色B轻轻把一张便签塞进角色A的衬衫口袋，
 对话气泡"（小声）下班等我"（DR1 极小声），角色A ME4 微红+低头微笑，
 窗外光线 HE12 现代办公室的黄昏金色阳光从百叶窗斜射进来。
角色DNA：白衬衫+金丝眼镜（角色A）/ 深蓝西装+领带松散（角色B）跨格一致。
配色 CN12 浪漫粉：暖米色 + 浅咖啡 + 淡粉（点缀）。
4-panel comic strip, clean panel borders, consistent character DNA across panels。
```

## 变量说明

> 运行时从 `state/variable-registry.md` 读取最终值。参考文件列为原始数据来源。

| 变量 | 参考文件 | 填充方式 |
|------|---------|---------|
| VS编号 | `engines/styles.md` | 用户选择或智能推荐 |
| CN编号 | `engines/color-narrative.md` | 按情绪匹配：暧昧→CN12, 燃→CN5, 虐→CN15 |
| EV编号 | `knowledge/environments.md` | 按故事场景匹配 |
| HE编号 | `knowledge/historical-eras.md` | 按故事时代匹配 |
| BL编号 | `knowledge/body-language.md` | 按角色动作匹配每格 |
| ME编号 | `knowledge/micro-expressions.md` | 按每格情绪变化匹配 |
| DR编号 | `knowledge/dialogue-rhythm.md` | 按台词情绪标注节奏 |
| SD编号 | `knowledge/sound-design.md` | 按每格环境匹配音效 |
| CP编号 | `knowledge/composition.md` | 漫画常用 CP3(三分法)/CP14(放射线) |
| 格数 | — | 短故事 5-7 格，复杂 7-9 格 |
