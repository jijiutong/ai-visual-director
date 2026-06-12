# 人像质量标准

定义角色卡/人像"好看"的检查标准。不是主观审美，是可执行的结构化字段。作为 `aesthetic-director` 和 `prompt-qc` 维度5 的规则来源。

---

## 一、检查清单

所有角色类 prompt（character-sheet / character-three-view / face-consistency）必须逐项通过：

```
□ 年龄：是否明确数字范围（如 20-26岁），非模糊词？
□ 脸型：是否具体（鹅蛋脸/V脸/方脸/圆脸/心形脸等），非"好看"？
□ 五官：眼型/鼻型/唇形/眉形 是否各有描述？
□ 妆容：是否与角色类型匹配（古风/现代/科幻/战斗）？
□ 发型：是否具体（长度/卷直/颜色/质感）？
□ 肤质：是否有质感描述（非"完美无瑕"→硅胶感风险）？
□ 表情：是否自然具体，非"微笑"一笔带过？
□ 光线：是否适合人像（85mm/柔和补光/环形光优先）？
□ 镜头：是否声明焦段（85mm/50mm/135mm 人像优先）？
□ 气质：是否传达角色气质（非模板化描述）？
□ 负面词：是否包含防丑词（硅胶感/过度磨皮/路人脸等）？
□ 格式：是否违反 format-contract？
```

---

## 二、年龄与类型匹配

| 角色类型 | 推荐年龄 | 注意 |
|---------|---------|------|
| 短视频网红 | 20-26岁 | 年轻但非幼态 |
| 古风仙侠女 | 18-28岁 | 清冷感非幼女 |
| 都市白领 | 25-35岁 | 成熟非显老 |
| 武侠女侠 | 22-32岁 | 有力量感 |
| 校园少女 | 15-20岁 | 少女感非童颜 |
| 宫廷后妃 | 25-40岁 | 按等级调整 |
| 科幻特工 | 25-35岁 | 利落非幼态 |
| 熟龄角色 | 35-55岁 | 气质非显老 |

---

## 三、脸型具体化

| 口语/模糊词 | 转译 |
|------------|------|
| "好看" | 必须指定：鹅蛋脸 / V脸 / 方圆脸 / 心形脸 / 圆脸 / 长脸 / 方脸 / 菱形脸 |
| "瓜子脸" | V脸，下颌线流畅收窄，下巴尖而不锐 |
| "鹅蛋脸" | 额头略宽于下巴，颧骨适中，下颌线柔和过渡 |
| "方圆脸" | 骨相分明，下颌角清晰但不宽大，颧骨适中 |
| "高级脸" | 骨相分明，颧骨适中不过高，下颌线清晰，面部留白恰当 |

---

## 四、五官标准

### 眼型

```
桃花眼 / 丹凤眼 / 杏眼 / 狐狸眼 / 圆眼 / 细长眼 / 下垂眼 / 三白眼（慎用）
必须写：眼型名 + 具体特征（如"杏眼，眼尾微挑，双眼皮自然宽度"）
```

### 鼻型

```
直鼻 / 翘鼻 / 驼峰鼻 / 蒜头鼻（慎用）/ 鹰钩鼻（特定角色）
必须写：鼻梁高度 + 鼻头形状 + 鼻翼宽度
```

### 唇形

```
M唇 / 微笑唇 / 薄唇 / 饱满唇 / 心形唇 / 花瓣唇
必须写：唇形 + 厚度 + 唇色
```

### 眉形

```
野生眉 / 柳叶眉 / 剑眉 / 平直眉 / 远山眉 / 挑眉
必须写：眉形 + 浓淡 + 弧度
```

---

## 五、妆容与类型匹配

| 类型 | 妆容方向 | 避雷 |
|------|---------|------|
| 古风仙侠 | 轻透、淡雅、远山眉、浅唇 | 禁止浓妆/亮片/欧美妆 |
| 现代都市 | 精致日常妆、清透底妆 | 禁止影楼风/过度修容 |
| 网红/短视频 | 精致眼妆、卧蚕、水光唇 | 禁止硅胶感/过量填充 |
| 武侠/战斗 | 淡妆或裸妆、自然野生眉 | 禁止浓艳 |
| 宫廷 | 唐代浓妆/清代淡雅 按朝代 | 禁止穿越妆 |
| 科幻 | 无暇底妆、几何眉形 | 禁止廉价影楼风 |
| 暗黑/反派 | 深色唇、烟熏眼、哑光 | 禁止甜美妆 |

---

## 六、光线与镜头

### 人像光线优先级

| 优先级 | 光线方案 | 适用 |
|--------|---------|------|
| ⭐⭐⭐ | 柔和环形补光 + 85mm | 通用人像首选 |
| ⭐⭐⭐ | 蝴蝶光（鼻下阴影） | 女性角色 |
| ⭐⭐ | 伦勃朗光（三角光） | 男性角色/成熟角色 |
| ⭐⭐ | 窗光/自然光 | 都市/校园 |
| ⭐ | 侧光/逆光剪影 | 氛围镜/非角色卡 |

### 镜头焦段

| 焦段 | 适用 | 
|------|------|
| 85mm | **人像首选**，面部比例自然，浅景深 |
| 50mm | 半身/全身环境人像 |
| 135mm | 面部特写 |
| 35mm | 环境人像（慎用，面部易变形） |

---

## 七、防丑负面词

所有角色类 prompt 必须追加。按类型选择：

### 通用防丑

```
禁止：路人脸、年龄偏大、硅胶感、过度磨皮、廉价影楼风、
脸部不对称、眼距异常、嘴歪、五官变形、怪异网红脸、
假笑脸、死鱼眼、面瘫表情、塑料质感
```

### 女性角色追加

```
禁止：过度填充、香肠嘴、玻尿酸脸、整容模板脸、
锥子脸、蛇精脸、过度修图感、一键美颜
```

### 男性角色追加

```
禁止：娘化、过度柔美、无下颌线、无喉结、女性化五官
```

---

## 八、真实皮肤质感（防塑料感核心）

> **适用条件**：写实类 / 都市 / 现代 / 古风宫廷 / 武侠 / 战争 / 末日 等需要真实人像的类型。**动漫/童话/二次元/Disney 风格不适用**。

所有写实类角色 prompt 必须追加真实皮肤描述。不追加 = 默认出塑料假面。

### 规则：按角色年龄/类型选择皮肤特征组合

| 年龄/类型 | 皮肤特征 | 强度 |
|----------|---------|------|
| 少女 16-22 | 绒毛/胎毛感 + 轻微雀斑 + 眼下细纹（极淡）+ 鼻翼微泛红 | 轻 |
| 女性 23-35 | 毛孔可见 + 肤质不均 + 轻微法令纹 + 零星色素点 + 鬓角碎发 | 中 |
| 女性 35+ | 法令纹（中等）+ 眼下细纹 + 木偶纹 + 晒斑 + 皮肤松弛感 | 重 |
| 男性 20-35 | 毛孔粗大 + 青胡茬 + 肤质粗糙 + T区微油 + 轻微痘印 | 中 |
| 男性 35+ | 毛孔明显 + 法令纹深 + 胡茬粗粝 + 晒斑 + 颈纹 + 眼袋 | 重 |
| 战斗/武侠角色 | 轻微疤痕 + 晒黑 + 干燥起皮 + 毛孔粗大 + 旧伤痕 | 按情节 |
| 宫廷/贵族角色 | 肤质细腻但可见毛孔 + 眼下微细纹 + 雀斑（淡）+ 哑光底妆 | 中-轻 |

### 正面 prompt 追加（按类别选择）

**一、毛孔与原生纹理（防塑料感最关键）**
```
visible pores, natural skin pores, visible skin texture, 
micro-textured skin, subtle skin grain, matte skin finish, 
no oily shine, natural skin roughness, fine peach fuzz, 
facial绒毛, baby hair along hairline, lip micro-fuzz
```

**二、色斑与色素（亚洲脸友好，自然不夸张）**
```
light freckles across nose bridge, scattered faint freckles, 
subtle sun spots, mild uneven skintone, slight redness on nose tip, 
faint red veins on cheeks, natural skin warmth variation,
small beauty marks, scattered light moles, faint acne marks
```

**三、细纹与皱纹（活人感核心，拒绝零瑕疵）**
```
fine under-eye lines, subtle crow's feet, light smile lines, 
natural nasolabial folds (shallow to medium), faint neck creases,
natural skin laxity, lived-in skin texture, age-appropriate fine lines
```

**四、肤质不均与粗糙感（告别完美假面）**
```
uneven skintone, naturally yellowish complexion, slightly dull skin,
dry patches, subtle skin peeling, rough texture areas, 
chapped lip texture, mild T-zone oil, visible skin congestion
```

**五、痘痘与炎症（少量即可）**
```
few small blemishes, occasional whiteheads, faint acne marks,
minor skin redness, subtle acne scarring texture
```

**六、毛发与胡茬（男性/中性风）**
```
light stubble, five o'clock shadow, rough chin stubble, 
messy hair wisps, temple baby hairs, sideburn fuzz, 
natural hairline texture, eyebrow micro-hairs, flyaway strands
```

**七、特殊瑕疵（按需用）**
```
faint scar, shallow scar texture, subtle dark circles, 
mild under-eye bags, thin translucent skin, visible capillaries,
post-acne marks fading, small birthmark
```

### 负面 prompt 追加

```
禁止：塑料质感、完美零瑕疵皮肤、过度磨皮平滑、硅胶假脸、
充气娃娃质感、一键美颜、过度修图、CG渲染感、
无毛孔、零纹理、完美对称脸、假人感、人造皮肤质感、
airbrushed skin, plastic skin texture, doll-like skin, 
poreless skin, zero skin texture, wax figure appearance,
overly smooth CG render, beauty filter effect, fake silicone skin
```

### 触发规则

```
1. prompt-qc 维度5 — 检查角色 prompt 是否包含真实皮肤描述（写实类必须）
2. aesthetic-director — 口语如"真人感""不要塑料"→ 转译为皮肤质感字段
3. character-sheet 模板 — 模式A 面部多角度模块中，写实类追加皮肤质感描述
4. 自动检测：角色类型为写实/现代/古风/武侠 → 自动追加 §八正面词
```

---

## 九、致命 vs 非致命

| 问题 | 级别 | 理由 |
|------|------|------|
| 年龄未声明 | **致命** | 无年龄无法锁定角色 |
| 脸型未指定 | **致命** | "好看"不可执行 |
| 口语审美直接写入 | **致命** | "网红美女""高级脸" AI 不理解 |
| 无负面词 | **致命** | 出图大概率丑 |
| 五官描述不完整（缺1-2个） | 非致命 | 标记补充 |
| 写实类角色缺少皮肤质感描述 | **致命** | 出图大概率塑料假面 |
| 光线/镜头未指定 | 非致命 | 标记建议 |
| 妆容与类型不完全匹配 | 非致命 | 标记建议 |

---

## 联动

- ← 被 `rules/prompt-qc.md` 维度5 引用（审美合同检查）
- ← 被 `engines/aesthetic-director.md` 作为输出标准
- → 所有角色类模板生成 prompt 时必须满足
- → 被 `engines/auto-repair.md` 在角色 prompt 修复时参考
