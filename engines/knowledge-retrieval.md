# Knowledge Retrieval — 知识库动态检索引擎

按问题类型从 `knowledge/` 检索优化建议，替代硬编码修复策略。供 `consistency-engine`、`prompt-scorer`、`auto-repair` 调用。

---

## 一、检索架构

```
consistency-engine / prompt-scorer / auto-repair
  │
  ├─ 问题类型 + 关键词
  │
  ▼
Knowledge Retrieval
  │
  ├─ 问题分类 → 匹配 knowledge/ 文件
  ├─ 关键词匹配 → 定位具体章节
  │
  ▼
返回：优化建议 + 参考条目 + 替代方案
```

---

## 二、问题类型 → knowledge/ 映射表

### 角色问题

| 问题关键词 | 检索文件 | 章节 |
|-----------|---------|------|
| 面部变形/五官不一致/跨镜变脸 | `character-dna.md` | DNA 20 字段 → 不可变字段（19-20） |
| 服装变化/颜色漂移/配饰丢失 | `character-dna.md` | 可变字段追踪（19） |
| 表情不自然/情绪不对/过于夸张 | `micro-expressions.md` | 按情绪类型查合理范围 |
| 体态站姿不一致/身高比例漂移 | `body-language.md` | 体态站姿（15） |
| 多角色身高差/体型差丢失 | `relationships.md` | 角色关系对构图/灯光的影响 |
| 身份/关系表述矛盾 | `character-dna.md` | 剧情身份标注 |

### 场景问题

| 问题关键词 | 检索文件 | 章节 |
|-----------|---------|------|
| 空间布局漂移/建筑位置变化 | `environments.md` | 场景描述维度 → 固定元素 |
| 光源方向不一致/阴影漂移 | `lighting.md` | 光源方向 + 灯光方案 |
| 色调跳跃/色彩不统一 | `color-narratives.md` | CN 编号 → 四阶段色值 |
| 天气突变/时间跳跃无过渡 | `weather.md` | 天气变化逻辑 |
| 材质不一致/质感漂移 | `materials.md` | 材质属性 + 反光率 |
| 文化穿帮/时代错位 | `historical-eras.md` | 朝代/时代 → 正确元素 |

### 风格问题

| 问题关键词 | 检索文件 | 章节 |
|-----------|---------|------|
| 配色不符合风格定义 | `visual-styles.md` | VS 编号 → 配色方案 + 禁止 |
| 氛围描述与风格冲突 | `visual-styles.md` | VS 编号 → 氛围关键词 |
| 灯光方案不匹配 | `visual-styles.md` + `lighting.md` | VS 编号 → 灯光方案 |
| 镜头语言不符合风格 | `visual-styles.md` | VS 编号 → 镜头语言 |
| 文化元素混用 | `cultural-accuracy.md` | 按文化类型 → 正确/错误元素 |
| 导演风格执行不精确（如"维伦纽瓦风格但灯光太亮"） | `imitation/[director].md` | 导演文件 → 对应维度 section（lighting/color/camera） |

### 叙事/节奏问题

| 问题关键词 | 检索文件 | 章节 |
|-----------|---------|------|
| 节奏不对/每镜时长不合 | `pacing-types.md` | P 编号 → 每镜时长/运镜 |
| 情绪曲线偏离 | `emotion-curves.md` | EC 编号 → 阶段分配 |
| 叙事结构断裂 | `narrative-structures.md` | NS 编号 → 幕分配 |
| 转场生硬/无过渡 | `transitions.md` | 转场分类 → 视觉/叙事/声音 |
| 镜头构图问题 | `composition.md` | 构图规则 |
| 镜头语言单调 | `camera.md` | 运镜/焦段选择 |

### 视频可执行问题

| 问题关键词 | 检索文件 | 章节 |
|-----------|---------|------|
| 运动超预算/方向冲突 | `camera.md` | 运动方向 + 运镜限制 |
| 狭小空间运镜不合理 | `camera.md` | 空间限制 → 可用运镜 |
| 平台参数超限 | 无（由 `reference-anchor` 校验） | — |
| @图 引用错位 | `asset-map.md` | @编号→用途映射 |
| 字幕/台词格式错误 | `dialogue-rhythm.md` | 台词节奏 + 字幕位置 |
| 道具/武器形制漂移 | `props.md` + `costume-design.md` | 道具细节 + 不可变特征 |

### 导演/表演问题

| 问题关键词 | 检索文件 | 章节 |
|-----------|---------|------|
| 表演方向不明确 | `directing-performance.md` | 表演指导 |
| 视觉隐喻缺失 | `visual-subtext.md` | 视觉暗示技法 |
| 后期特效不匹配 | `vfx-design.md` | VFX 方案 |
| 声音设计缺失 | `sound-design.md` | 环境音/拟音/配乐 |
| 剪辑节奏问题 | `editing-theory.md` | 剪辑节奏理论 |

---

## 三、检索调用方式

### consistency-engine 调用

```
问题：Story RM R5 转场合理性 0/20
  ↓
Knowledge Retrieval：
  1. 分类匹配 → "叙事/节奏问题" → "转场生硬/无过渡"
  2. 检索 `knowledge/transitions.md` → 转场分类：视觉匹配 10 种 / 叙事节奏 10 种 / 声音驱动 6 种
  3. 根据故事类型（东方玄幻/武侠）推荐：图形匹配剪 / 动作匹配剪 / 光影衔接 / J-Cut
  4. 返回建议 → 追加到一致性报告「💡 知识库建议」区域
```

### prompt-scorer 调用

```
问题：角色一致性 68/100 — 镜2→镜4 服装颜色漂移
  ↓
Knowledge Retrieval：
  1. 分类匹配 → "角色问题" → "服装变化"
  2. 检索 `knowledge/character-dna.md` → 可变字段追踪（19）
  3. 检索 `knowledge/costume-design.md` → 服装不可变细节锁定
  4. 返回建议 → 追加到评分报告「需关注」区域
```

### auto-repair 调用

```
修复策略：策略3（单镜修改导致连续性问题）
  ↓
Knowledge Retrieval：
  1. 识别受影响维度（角色位置 / 光线 / 道具）
  2. 检索 `knowledge/lighting.md` → 光源方向一致性规则
  3. 检索 `knowledge/relationships.md` → 角色位置关系修复
  4. 返回具体修复步骤 → 替代原硬编码"微调前后镜"策略
```

---

## 四、检索优先级

当一个问题匹配多个 knowledge/ 文件时，按以下优先级返回：

1. **规则文件**（已验证的补丁规则，如 R001-R010）→ 最高优先级
2. **编号体系文件**（VS/EC/CN/P/LS — 直接给出具体编号替代方案）→ 高优先级
3. **导演模仿文件**（`imitation/[director].md` — 精确到 9 维度的风格约束）→ 高优先级（当项目使用了导演风格时）
4. **参考描述文件**（lighting/camera/composition — 提供选项列表）→ 中优先级
5. **理论知识文件**（editing-theory/directing-performance — 提供原则指导）→ 低优先级

---

## 五、输出格式

### 单个问题检索

```
【知识库检索】问题：镜3 顾长空身份描述矛盾
  ├─ 规则：R007 角色身份冲突必须输出解释
  ├─ 知识条目：knowledge/character-dna.md → 剧情身份标注
  ├─ 知识条目：knowledge/relationships.md → 师徒关系对构图影响
  └─ 建议：输出【身份解释】块，明确「师父」身份的视觉表达（过肩镜头/冷暖分割光）
```

### 批量检索（一致性报告用）

```
💡 知识库建议：
  → knowledge/transitions.md — 查视觉匹配剪/动作匹配剪
  → knowledge/pacing-types.md — P1 快切节奏的转场设计参数
  → knowledge/directing-performance.md — 师徒对峙表演指导
  → knowledge/lighting.md — 顶光+烛火双光源方案
```

---

## 联动

← 被调用方：`consistency-engine`（5 维度评估发现问题 → 检索知识库建议）
← 被调用方：`prompt-scorer`（评分维度发现问题 → 检索知识库建议）
← 被调用方：`auto-repair`（修复策略需要具体操作 → 检索知识库替代硬编码）
→ 读取 `knowledge/` 目录（36 个文件，按问题类型匹配）
→ 读取 `imitation/` 目录（6 个导演文件，风格问题 → 导演精确维度约束）
→ 返回：优化建议 + 参考条目 + 替代编号 + 修复步骤
→ 不写入 state/（只读检索引擎）
