# Imitation Library — 导演/工作室风格模仿库

将导演风格拆解为 9 个可操作维度，供 `video-director`（风格决策）和 `style-migration`（风格迁移）精确调用。

---

## 设计原则

不同于 `knowledge/visual-styles.md` 的**编号→通用风格**映射，`imitation/` 提供**导演→原子参数**的完整分解：

- `knowledge/visual-styles.md`：VS1-VS50+ 是「风格模板」，快速匹配题材
- `imitation/`：每个导演文件是「风格引擎」，精确控制每个视觉维度

两者配合使用：VS 编号提供快速默认，imitation 提供深度定制。

---

## 当前库

| 文件 | 导演/工作室 | 标志性风格 | 最接近 VS |
|------|-----------|----------|----------|
| `wong-kar-wai.md` | 王家卫 | 霓虹诗意、慢门抽帧、孤独氛围 | VS4 |
| `villeneuve.md` | 丹尼斯·维伦纽瓦 | 巨物压迫、去饱和冷灰、极简构图 | VS2 |
| `nolan.md` | 克里斯托弗·诺兰 | IMAX 写实、交叉时间线、胶片质感 | VS3 |
| `ghibli.md` | 吉卜力工作室 | 手绘水彩、自然魔法、日常诗意 | VS7 |
| `pixar.md` | 皮克斯 | CG 电影级布光、色彩剧本、角色表演 | VS3 |
| `zhang-yimou.md` | 张艺谋 | 色彩极致主义、仪式化美学、单色主导 | VS5/VS7/VS8 |

---

## 文件结构

每个文件 9 个 section：

| # | Section | 内容 |
|---|---------|------|
| 1 | Composition | 构图方式、画幅比、空间深度 |
| 2 | Camera | 运镜方式、焦段偏好、运动节奏 |
| 3 | Lighting | 灯光方案、光源方向、光质 |
| 4 | Color | 配色方案、色彩象征、调色倾向 |
| 5 | Rhythm | 剪辑节奏、镜头时长、叙事节奏 |
| 6 | Character Blocking | 人物走位、与摄影机关系、群像调度 |
| 7 | Prompt Patterns | 可直接复用的 prompt 片段 |
| 8 | Negative Constraints | 绝对不能出现的元素 |
| 9 | VS Mapping | 映射到现有 knowledge/  VS 编号 + 差异说明 |

---

## 使用方式

### 在 video-director 中

```
用户："生成一个维伦纽瓦风格的科幻短片"
  ↓
1. 读取 imitation/villeneuve.md → 获取完整参数
2. 匹配 knowledge/visual-styles.md → VS2（科幻机甲全案板）
3. 用 imitation 参数覆盖 VS2 的默认值：
   - color: VS2 的赛博青 → Villeneuve 的去饱和冷灰
   - lighting: VS2 的霓虹主光 → Villeneuve 的雾天散射
   - camera: VS2 的 tracking → Villeneuve 的 slow creeping push
4. 输出风格决策 + 写入 style_memory
```

### 在 style-migration 中

```
用户："换成王家卫风格"
  ↓
1. 读取 imitation/wong-kar-wai.md
2. VS Mapping section → 匹配最接近 VS（VS4）
3. 从 imitation 提取精确参数执行迁移：
   - color → 霓虹蓝绿 + 琥珀暖黄
   - lighting → 霓虹侧光 + 台灯暖光
   - camera → step-printed slow motion
4. 更新 variable-registry + shot-state + style_memory
```

---

## 与 knowledge/visual-styles.md 的关系

```
knowledge/visual-styles.md:
  快速默认 → "武侠用 VS7 东方玄幻修仙"
  
imitation/:
  精确定制 → "用张艺谋的色彩极致主义 + 王家卫的霓虹灯光"
  
两者组合：
  VS 编号提供骨架，imitation 提供血肉
```

---

## 扩展指南

新增导演文件时：
1. 按照 9 section 模板创建新 `.md` 文件
2. 第 9 节 VS Mapping 必须映射到 `knowledge/visual-styles.md` 中存在的 VS 编号
3. 在 `knowledge/visual-styles.md` 对应 VS 条目添加 `参考导演` 字段
4. 在本 README 的「当前库」表中新增一行
