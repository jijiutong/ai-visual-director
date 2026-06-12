# Prompt 质量检查

所有 prompt 输出前的统一质检。不是替代 `final-video-qc`（只管视频包），而是所有输出类型通用的第一道 QC。轻量、快、阻断明确。

---

## 一、检查时机

| 触发 | 时机 |
|------|------|
| 任何 `/character` `/scene` `/storyboard` `/video` `/poster` `/style` 输出前 | 生成后、输出前 |
| `/create` 主链中每个子路由输出前 | 子路由生成后、组装前 |
| `auto-repair` 修复后 | 修复完成、输出前（防修复引入新问题） |

> **与 `final-video-qc` 的分工**：prompt-qc 管单条 prompt 的形式正确性；final-video-qc 管视频包的完整性（12项含连续性/台词/音效）。prompt-qc 先跑，final-video-qc 后跑。

---

## 二、六维度检查

### 维度 1：格式合同合规

对照 `state/format-contract-state.md`，检查本次输出是否符合锁定格式。

```
□ output_type 与合同声明一致？
□ required_modules 全部产出？
□ fatal_if_missing 全部存在且非空？
□ text_allowed=false 时无可见文字？
□ border_allowed=false 时无边框/分隔线？
□ hud_allowed=false 时无 HUD/UI 元素？
□ background 符合要求（白/浅灰/纯色等）？
□ density_level 在合同允许范围内？
□ subject_ratio 满足最低占比？
□ language 与合同声明一致？（从 format-contract-state 读取。中文平台输出英文 prompt → 阻断；英文平台输出中文 prompt → 阻断）
```

**合同来源**：`state/format-contract-state.md`（由 task-router 生成前写入）。如该文件为空（未锁定），使用 `rules/format-contract.md` 中对应 output_type 的默认值。

### 维度 2：负面词

对照 `rules/negative-prompt.md`，检查负面提示词覆盖。

```
□ 图像 prompt 是否包含通用负面词？
□ 是否按风格追加了专属负面词？
□ 是否按格式追加了专属负面词？
□ 是否按输出类型追加了视觉干净度负面词（参考 rules/visual-cleanliness.md §三）？
□ 负面词是否与正面描述无矛盾？（如正面写"暗光"，负面写"no dark lighting"→矛盾）
```

### 维度 3：画幅与构图

```
□ 图像 prompt 是否声明了 aspect_ratio（默认 16:9）？
□ aspect_ratio 是否与 format-contract 一致？
□ 构图描述是否与画幅匹配？（如 9:16 竖屏不应描述宽幅横摇）
```

### 维度 4：可复制性

prompt 必须可直接复制使用，不含任何解释、前缀、后缀。

```
□ prompt 文本是否纯 prompt？（无 "以下是 prompt：" 之类开场白）
□ prompt 文本是否不包含 markdown 解释段落？
□ prompt 文本是否不包含"你可以调整..."等建议文字？
□ prompt 文本是否不包含对话式评论？
□ 多段 prompt（正面/负面/参数）分区是否清楚、可独立复制？
```

**违规示例**：
```
❌ "好的，这是你的角色卡 prompt：\n\n[prompt]\n\n你可以根据需要调整光线。"
❌ "[prompt] \n\n> 💡 提示：如果觉得太暗可以加 bright lighting"
✅ 纯 prompt 文本，无任何 wrapper
```

### 维度 5：审美合同（角色类 prompt 专属）

角色类 prompt（character-sheet / character-three-view / face-consistency / costume-detail）必须过审美检查。

```
□ 年龄是否明确（数字范围，非"年轻"/"成年"等模糊词）？
□ 脸型是否具体（鹅蛋脸/V脸/方脸等，非"好看"等）？
□ 五官是否有具体描述（眼型/鼻型/唇形/眉形）？
□ 妆容是否与角色类型匹配？
□ 表情是否自然（避免"假笑"/"僵硬"）？
□ 光线是否适合人像？（85mm 人像镜头、柔和补光优先）
□ 是否有廉价感/硅胶感/过度磨皮风险词？（追加负面词）
□ 是否有"网红美女""高级脸""氛围感"等口语审美直接进入 prompt？
```

> **口语审美转换**：出现"网红美女""方圆那样""高级脸""甜妹""清冷御姐""氛围感""很漂亮""不要丑"等词 → 必须转译为脸型/五官/妆容/发型/肤质/镜头/光线/表情/气质/负面词 10 字段。禁止口语直接写入 prompt。

**口语→结构化示例**：

| 口语 | 转译 |
|------|------|
| 网红美女 | 现代高颜值短视频女性，20-26岁，小鹅蛋脸，下颌线柔和，眼清透有卧蚕，高鼻梁，饱满唇形，轻透底妆，精致眼妆不过浓，微卷长发，85mm人像镜头，柔和环形补光，浅景深，真实手机写真质感。禁止：路人脸、硅胶感、过度磨皮、廉价影楼风 |
| 高级脸 | 骨相分明，颧骨适中不过高，下颌线清晰，鼻梁挺拔，眉眼间距舒展，薄唇自然，哑光底妆，弱化腮红，低饱和色调，雕塑光或单灯侧光，禁止：填充感、过度柔光、甜美笑容、网红滤镜 |
| 甜妹 | 圆润鹅蛋脸或小圆脸，苹果肌饱满，大眼睛双眼皮，圆眼头圆眼睛，短中庭，小巧鼻头，M唇微笑唇，粉嫩透明感底妆，浅色腮红，自然野生眉，柔光正面补光，禁止：攻击性、浓妆、凌厉线条、暗黑风格 |

### 维度 6：无污染

检查 prompt 之间是否有内容污染。

```
□ 角色 prompt 中无场景专属元素（如天气/建筑描写混入）？
□ 场景 prompt 中无角色专属元素（如角色 DNA 字段混入）？
□ 视频 prompt 中无 display_asset 的 @图引用？
□ 视频 prompt 中无 marketing_asset 的 @图引用？
□ 海报 prompt 中无视频参数（如运镜/帧率）？
□ 不同输出类型的 prompt 内容边界清晰？
```

---

## 三、致命 vs 非致命

| 级别 | 条件 | 处理 |
|------|------|------|
| **阻断** | fatal_if_missing 缺失 | 阻断输出，必须补全 |
| **阻断** | video_asset 含文字/边框/HUD | 阻断输出，触发派生 |
| **阻断** | 海报 @图进入视频 prompt | 阻断输出，移除海报 @图 |
| **阻断** | 负面词完全缺失 | 阻断输出，追加负面词 |
| **阻断** | prompt 含大段解释文字（非 prompt 内容） | 阻断输出，剥离解释 |
| **阻断** | 口语审美直接进入角色 prompt | 阻断输出，转译后重新生成 |
| **阻断** | prompt 语言与配置不一致（中文平台输出英文/英文平台输出中文） | 阻断输出，重新按配置语言生成 |
| **警告** | 密度轻微超标（≤1级） | 标记，放行 |
| **警告** | 负面词不完整（少1-2类） | 标记，放行，建议补充 |
| **警告** | subject_ratio 轻微不足（差 ≤10%） | 标记，放行 |
| **警告** | 画幅未显式声明（可从合同推断） | 标记，放行，建议显式声明 |
| **放行** | 密度大幅超标（>1级）但 output_type 明确允许 | 如世界观板 density=4 允许 |
| **放行** | 文本类输出（台词脚本/音效表/导演阐述）不检查画幅/density | 只检查可复制性 |

---

## 四、QC 结果格式

```
【Prompt QC】[N/6] 通过

✅ 格式合同：角色卡内全部 required_modules 产出（6/6）
✅ 负面词：通用+风格+视觉干净度 三类齐全
✅ 画幅：16:9 声明正确
⚠ 可复制性：prompt 末尾有 "你可以调整光线" 建议文字
✅ 审美合同：10字段完整，无口语审美
✅ 无污染：角色/场景边界清晰

阻断：第4项 — 剥离末尾建议文字后放行。
```

---

## 五、auto-repair 边界

auto-repair 可修：
- 补负面词
- 剥离解释文字
- 补画幅声明
- 补 required_modules（格式漏项）
- 口语审美转译

auto-repair 不可修（需用户确认）：
- 改变 output_type
- 改变资产用途
- 改变已锁定的角色 DNA
- 重写核心视觉描述
- 改变风格方案

---

## 联动

- ← 读取 `state/format-contract-state.md`（当前格式合同快照）
- ← 读取 `rules/format-contract.md`（合同定义，fallback）
- ← 读取 `rules/negative-prompt.md`（负面词规则）
- ← 读取 `rules/visual-cleanliness.md` §三（视觉干净度质量词）
- → 阻断 → 触发 `engines/auto-repair.md`（在允许范围内修）
- → 通过 → 放行输出
- → 被 `rules/final-video-qc.md` 前置调用（视频包先过 prompt-qc，再过 video-qc）
- ↔ 与 `rules/asset-qc.md` 互补：prompt-qc 管 prompt 文本，asset-qc 管生成后的图片资产
