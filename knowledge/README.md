# Knowledge

`knowledge/` 放素材型知识库。它们提供词表、描述维度、参考编号和专业语言，但不负责最终路由。

## knowledge/ 与 state/ 的关系（双层变量体系）

模板变量从两层读取：
- **state/（决策层）**：高维决策变量 — project.title, style.visual_style, characters.*, scene.primary 等引擎写入的注册数据
- **knowledge/（细节层）**：低维参考数据 — PR/BL/EV/CP 等编号对应的具体参数值（如 PR1=正面中景, BL1=柔焦, EV1=自然白皙）

模板通过 state/ 决定"选哪个编号"，通过 knowledge/ 查询"该编号的具体描述"。详见 `state/prompt-contract.md` → 模板占位符 ↔ state/ 变量映射表。

## 设计标准

每个知识库文件尽量包含：

```md
## 分类
按题材/材质/动作/镜头等分组

## 条目
编号 + 名称 + 描述 + 适用场景 + 禁止方向

## 组合建议
可与哪些引擎或规则联动
```

## 当前知识库

### 引擎决策层（被 engines/ 直接引用，编号→参数映射）

| 类型 | 文件 | 编号体系 |
|------|------|---------|
| 视觉风格 | `visual-styles.md` | VS1-VS50+ — 风格编号→配色/氛围/灯光/镜头/禁止方向 |
| 情绪曲线 | `emotion-curves.md` | EC1-EC13 — 曲线编号→阶段分配/色彩倾向/适用类型 |
| 色彩叙事 | `color-narratives.md` | CN1-CN50+ — 方案编号→四阶段色值演进 |
| 分镜节奏 | `pacing-types.md` | P1-P5 — 节奏编号→每镜时长/运镜/景别变化 |
| 版式风格 | `layout-styles.md` | LS1-LS10+ — 版式编号→布局/密度/模块排列 |
| 情绪权重 | `mood-sliders.md` | 用户 mood 词→权重调整参数 |
| 叙事结构 | `narrative-structures.md` | NS1-NS5 — 结构编号→幕分配/节奏/高潮位 |
| 角色关系 | `relationships.md` | 关系类型→构图/灯光/风格影响 |

### 素材参考层（模板生成时的细节描述库）

| 类型 | 文件 |
|------|------|
| 角色 | `character-dna.md`, `micro-expressions.md`, `body-language.md`, `dialogue-rhythm.md` |
| 场景 | `environments.md`, `weather.md`, `materials.md`, `historical-eras.md` |
| 镜头 | `camera.md`, `lighting.md`, `composition.md`, `transitions.md` |
| 色彩/服装 | `color-grading.md`, `costume-design.md` |
| 道具生物 | `props.md`, `creatures.md`, `animals.md` |
| 声音 | `sound-design.md`, `audio-reference.md` |
| 导演后期 | `directing-performance.md`, `editing-theory.md`, `vfx-design.md`, `visual-subtext.md` |
| 输出与工业 | `formats.md`, `multi-aspect.md`, `industry-export.md`, `thumbnail-board.md`, `director-notes.md` |
