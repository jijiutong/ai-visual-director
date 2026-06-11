---
name: character
description: Character design card generation — 8 consistency methods. Route: story-intake → state/variable-registry → character-sheet → state/asset-map → QC. Use /character or "角色卡", "人物设计".
---

# Character — 角色设计

输入角色描述 → 选择一致性方法 → 输出角色设定卡 prompt。支持 8 种人物一致性锁定方法。

## 触发方式

- `/character [角色名] [描述]`
- 直接说 "角色卡"、"人物设计"、"生成角色卡"

## 子指令

| 指令 | 效果 |
|------|------|
| `/character 生成角色卡` | 6 模块角色设定卡（三视图+面部+表情+手部+武器+发型），默认无文字标注 |
| `/character 导演标注版` | 角色卡 + 红色标注/编号/文字说明（仅用于导演板/团队协作） |
| `/character 黑金武侠角色圣经` | 黑底暗金高密度角色卡，三视图+不可变特征+表情+服装层次+武器手部 |
| `/character 科幻神使系统卡` | 银蓝 HUD 科幻角色系统卡，适合机甲/太空/神级文明 |
| `/character 三视图` | 正/侧/背三视图并排 |
| `/character 面部多角度` | 5 角度面部特写（正面/45°/侧面/左45°/左侧面） |
| `/character 12表情` | 3×4 宫格 12 种表情锁定情绪范围 |
| `/character 服装武器细节卡` | 服装+武器独立细节参考，以视觉方式突出不可变细节 |
| `/character 14图参考` | Nano Banana 最强角色锚定方案 |
| `/character IP-Adapter` | ComfyUI 本地角色锁定方案 |
| `/character 角色DNA` | 20 字段文字锚定，零成本保底 |

## 工作流

### Step 1: 收集角色信息

从用户输入提取：姓名、性别年龄、身份、外貌特征、服装、武器/道具、性格关键词。

**剧情身份**：当已有故事存在双人/多人关系时，必须标注该角色在故事中的身份（师父/徒弟/对手/旁观者）。若不明确，标注"身份待确认"，不得擅自改变原有关系。

**身份冲突检测**：当角色描述中出现以下高位身份词时，年龄不得默认过低，且不得强行降格角色地位：

高位身份触发词：`第一剑修` `宗师` `剑尊` `掌门` `前辈` `老祖` `第一` `天下第一` `绝世` `天尊` `剑圣` `武帝`

检测到冲突时，必须输出【身份解释】块，格式：
```
【身份解释】
用户描述为「[原描述]」，在当前故事中的角色关系为「[徒弟/儿子/后辈等]」。
本设定采取以下解释：[具体解释 — 如天才型青年强者 / 曾短暂登顶年轻一代榜首 / 陨落后重修等]。
若你希望该角色为师父/前辈身份，可输入「[角色名]是师父」。
```

**禁止行为**：绝不直接改写用户输入的角色描述（如把"第一剑修"强行改成"天才学徒"）。用户描述为真，年龄/身份可弹性适配，但原描述不可抹除。

### Step 2: 选择一致性方法（8 种）

**读取 `rules/character-consistency.md`** → 获取 8 种方法的最新参数（出图量/费用/锁定强度/耗时/适用平台）。方法参数不在此 SKILL 中硬编码，以 `rules/character-consistency.md` 为权威源。

展示给用户时，按 `rules/character-consistency.md` 的方法选择指南表呈现。用户说编号确认，或说 "全部" 一键出角色卡。

### Step 3: 生成 Prompt

**默认：角色设定卡（6 模块 · 出图模式）**

```
6 模块角色设定卡，[角色名]：[性别/年龄/身份]。
模块1 左列：三视图（正面全身站姿/右侧面/背面），[服装描述]。
模块2 中上：面部多角度（正面/45度/正侧面特写），[发型/五官描述]。
模块3 右上：6 种表情（平静/愤怒/大笑/悲伤/惊讶/厌恶），表情自然不过度。
模块4 左下：手部特写（正面展开/背面握拳），手指比例正常，[手部特征]。
模块5 中下：关键道具/武器正面+侧面，以视觉方式突出不可变细节（用高光/对焦/放大局部引导视线，而非文字标注）。
模块6 右下：发型动态（静止/微风飘动/扎起），以视觉方式突出发色/发量/发长。
白色/浅灰背景，均匀摄影棚光，禁止彩色背景。6 格白线分隔。
角色服装/发色/五官/体型 6 格完全一致，禁止跨格变化。
禁止在画面中出现：红色标注线、箭头、文字、编号、方框、引线。
所有细节通过光影、对焦、构图对比传达，不叠加任何文字或符号。
```

**黑金武侠角色圣经（导演展示版）**：
当用户说「黑金武侠角色圣经」「武侠角色卡」「玄幻角色卡」「像参考图那种黑金标注版」时使用：
```
黑金武侠角色圣经设定卡，[角色名]：[性别/年龄/身份]。16:9 横版，纯黑/暗岩背景，暗金细线框，高密度导演标注，红色仅用于“不可变特征”和箭头。

左侧大三视图：正面、侧面、背面全身，同一地面基准线，同一头身比例。
左边窄栏不可变特征：疤痕位置、双眼间距、鼻梁形状、发际线、肩宽比例、身高比例等局部特写，标注 DO NOT CHANGE。
右上面部多角度：正面 close-up、左 3/4、右 3/4、仰视或战斗角度。
右中表情范围：愤怒、决绝、平静、神圣/震撼等 4 种表情，每格保持同一五官。
右侧服装层次分解：底层、外层、肩甲/胸甲/臂甲、腰带、脚靴，竖向分解。
底部武器/道具特写：正面、侧面、剑鞘/握柄/纹路/尺寸材质。
底部右侧手部握持与发型动态：握剑正面/侧面/双手姿态，束发→散开→披肩状态。

[角色详细描述]。暗金、冷灰、血红点缀，强逆光，金属和布料材质真实。
禁止跨模块换脸、武器比例变化、文字遮挡角色主体。
```

**科幻神使系统卡**：
当用户说「科幻角色卡」「神使」「银甲」「机甲角色」「太空角色」时使用：
```
科幻神使角色系统卡，[角色名]：[性别/年龄/身份]。16:9 横版，深空黑背景，银蓝金属，高级 HUD 细线，全息投影感。

包含：正面全身、背面全身、侧面全身；盔甲/机械服材质特写；面部核心 close-up（额头核心/义眼/神经接口等不可变特征）；机械翼/外骨骼/能量结构展开图；能力 HUD 或全息交互界面；手部触控或武器接口特写；底部色卡、材质、发光元件、能源核心说明。

[角色详细描述]。同一张脸跨模块一致，金属片结构清楚，发光核心位置不变，机械翼展开逻辑合理。
禁止古风布料、水墨纸纹、暖色宫廷感。
```

**角色设定卡（导演标注版）**：
仅当用户明确说「导演标注版」「标注」时使用：
```
6 模块角色设定卡（导演标注版），[角色名]：[性别/年龄/身份]。
模块1-6 内容同上，但允许红色标注不可变细节（纹路/比例/材质/颜色）。
允许红框、编号、文字说明、引线标注元素，用于团队协作和视觉开发参考。
```

**三视图模板**：
```
[角色名]三视图：正面全身站姿（居中）、右侧面（右）、背面（左）。
三视图并排，同一角色，服装/体型/发色/鞋履完全一致。
白色背景，均匀摄影棚光。站姿自然放松。
[角色详细描述]
```

**面部多角度模板**：
```
[角色名]面部多角度参考：正面、右45度、正右侧面、左45度、左侧面。
5 张面部特写并排，肩部以上。同一角色，五官/肤色/发型/发色/瞳色完全一致。
中性表情，均匀柔光，浅灰背景。禁止跨角度五官变形。
```

**12 表情模板**：
```
[角色名]表情范围图，3×4 宫格布局。
上排：平静 | 愤怒 | 悲伤 | 冷笑
中排：震惊 | 决绝 | 痛苦 | 温柔
下排：警惕 | 失控 | 释然 | 杀意
所有 12 格同一角色，面部结构/五官/肤色完全一致，仅表情变化。
白色背景，均匀摄影棚光，禁止跨格面部变形。
```

**服装武器细节卡模板（出图模式）**：
```
[角色名]服装武器细节参考卡。
左半：服装正面全身+背面，以视觉方式突出不可变细节（面料材质/颜色/纹样/配饰位置/腰带扣形制），用高光与对比度引导视线。
右半：武器正面+侧面+细节特写，以视觉方式突出不可变细节（纹路/比例/材质/颜色/握柄形制）。
白色背景，均匀光。服装和武器各占一半，清晰分区。
禁止红色标注、文字、箭头、编号。
```
**服装武器细节卡（导演标注版）**：
仅当用户明确说「导演标注版」时，允许红色标注不可变细节。

## 角色 DNA 20 字段（纯文字锚定）

生成角色后自动输出 DNA 卡：
```
1. 姓名  2. 性别年龄  3. 身高体型  4. 脸型  5. 眼型瞳色
6. 眉型  7. 鼻型      8. 嘴型唇色  9. 发型发色  10. 肤色
11. 服装 12. 配饰     13. 武器/道具 14. 声音   15. 体态站姿
16. 习惯动作 17. 气味  18. 情绪底色  19. 可变字段 20. 不变量标注
```

同时输出可直接嵌入全案板模块 4 的英文 DNA 片段：
```
[Character Name]: [gender] [role], [age], [hairstyle+hair color], [clothing], [weapon/prop], [distinctive facial/body mark]
```

## 输出后交互提示

角色卡生成完成后，必须在结尾追加以下交互建议：
```
✅ 角色卡已生成。

将此 DNA 片段复制到全案板【4. 角色 DNA 锚点】中：
`[英文 DNA 片段]`

💡 下一步：
1. 继续生成场景卡 → 回复"生成场景参考图"锚定空间与光线
2. 回到全案板 → 回复"继续全案板"继续分镜制作
3. 直接出视频 → 回复"出视频 prompt"跳过场景卡直接生成最终视频 prompt
4. 导演标注版 → 回复"导演标注版"输出带标注的角色卡供团队协作
5. 只出 DNA 文字 → 回复"角色DNA"输出 20 字段纯文字锚定，零成本保底
```

## 方法叠加策略

从 `rules/character-consistency.md` 获取最新的叠加策略和费用。简要参考：

| 预算 | 组合 | 费用 | 锁定强度 |
|------|------|------|---------|
| 快速 | 角色卡 1 张 | ~USD0.08 | ⭐⭐⭐ |
| 标准 | 角色卡 + 面部多角度 | ~USD0.16 | ⭐⭐⭐⭐ |
| 正式 | 角色卡 + 面部 + 表情12格 | ~USD0.24 | ⭐⭐⭐⭐⭐ |
| 零成本 | DNA 文字 | USD0 | ⭐⭐ |

## English Prompt 模板（默认角色设定卡）

生成中文 Prompt 后，同时输出英文版供 GPT Image / Midjourney / SD 使用：

```
6-panel character reference sheet for [Character Name]: [gender/age/role].
Panel 1 (left column): turn-around — front full-body standing, right side profile, back view. [Clothing description].
Panel 2 (center top): facial multi-angle — front, 3/4 right, full right profile close-ups. [Hair/features description].
Panel 3 (top right): 6 expressions — neutral, angry, laughing, sad, surprised, disgusted. Natural expressions, not exaggerated.
Panel 4 (bottom left): hand close-ups — palms open front, fists back. Proportional fingers, [hand features].
Panel 5 (bottom center): key prop/weapon front+side view. Unchangeable details (texture, proportion, material, color) highlighted through lighting and focus, never text or arrows.
Panel 6 (bottom right): hair dynamics — still, gentle breeze, tied up. Hair color, volume, and length highlighted through visual contrast.
White/light gray background, even studio lighting, no colored background. 6 panels separated by thin white lines.
Character clothing, hair color, facial features, and body type must be 100% consistent across all 6 panels.
No red annotation lines, no arrows, no text, no numbers, no bounding boxes, no leader lines anywhere in the image.
All details conveyed through lighting, focus, and compositional contrast — no overlaid text or symbols.
```

**平台参数**：
- GPT Image 高清模式：无需额外参数，英文 prompt 直接使用
- Midjourney：追加 `--ar 3:4 --style raw --s 200`
- Stable Diffusion：追加 `Negative: [负面清单内容]`

## 负面清单

所有图像 prompt 自动附加：
```
no watermark, no logo, no broken faces, no duplicated limbs,
no extra fingers, no deformed hands, no mismatched eyes,
no inconsistent clothing across panels, no text overlay,
no red arrows, no annotation lines, no bounding boxes, no leader lines,
no numbers, no labels, no readable text of any kind,
no colored background, no gradient background, plain studio background only,
no cartoon style (unless specified), no flat illustration
```
