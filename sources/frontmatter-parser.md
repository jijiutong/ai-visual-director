# Frontmatter 解析引擎

解析 Obsidian/Markdown 笔记的 YAML frontmatter，自动填充 story-intake 所需字段，减少用户交互轮次。

---

## 支持的 frontmatter 字段

```yaml
---
title: 剑道独尊                    # → story-intake 片名
genre: 玄幻                        # → story-intake 类型
style: 东方玄幻                    # → video-director 风格推荐
sub_style: 水墨                    # → 副风格
characters:                        # → story-intake 角色列表
  - name: 张三
    role: 主角
    archetype: 剑修
    age: 28
    gender: 男
    appearance: 黑衣长剑，面容冷峻
    personality: 寡言坚毅
  - name: 李四
    role: 反派
    archetype: 魔修
    age: 35
    appearance: 紫袍，面带邪笑
scene: 昆仑山剑冢                  # → story-intake 场景
location: 剑冢中央                  # → 具体地点
era: 中国古代                      # → HE 编号映射
weather: 暴雨                       # → WT 编号映射
time_of_day: 深夜                   # → 时间
emotion: 悲壮                       # → 情绪曲线映射
mood: 更燃更虐                      # → mood-slider
structure: 三幕                     # → act-structure
pacing: 快切                        # → pacing 类型
target_platform: Seedance           # → 平台适配
duration: 10s                       # → 时长（默认10s）
shot_count: 5                       # → 分镜数（用户指定则不用自动算）
color_scheme: 红黑                  # → 色彩方案
camera_style: 手持跟拍              # → 运镜偏好
output_format:                       # → 输出格式
  - 全案板
  - 角色卡
  - 视频prompt
layout_style: LS1                    # → 版式编号
---
```

---

## 字段映射表

| Frontmatter 字段 | 目标引擎 | 目标字段 | → state/ 变量路径 | 优先级 |
|-----------------|---------|---------|-------------------|--------|
| `title` | story-intake | 片名 | `project.title` | 覆盖 |
| `genre` | story-intake | 类型 | `project.genre` | 覆盖 |
| `style` | video-director | VS 编号 | `style.visual_style` | 自动匹配 |
| `characters[].name` | story-intake | 角色名 | `characters.*.name` | 覆盖 |
| `characters[].role` | story-intake | 角色定位 | `characters.supporting` | 覆盖 |
| `characters[].appearance` | character-dna | 外观DNA | `characters.*.immutable_features`（初始值） | 初始值 |
| `scene` | story-intake | 场景 | `scene.primary.name` | 覆盖 |
| `location` | story-intake | 具体地点 | `scene.primary.fixed_elements` | 补充 |
| `era` | historical-eras | HE 编号 | —（辅助决策，不直接入 state） | 自动匹配 |
| `weather` | weather | WT 编号 | `scene.weather` | 自动匹配 |
| `emotion` | emotion-curve | EC 编号 | `style.emotion_curve` | 自动匹配 |
| `mood` | mood-slider | 权重调整 | —（辅助决策，不直接入 state） | 覆盖 |
| `structure` | act-structure | NS 编号 | —（辅助决策，不直接入 state） | 自动匹配 |
| `pacing` | pacing | P 编号 | `style.pacing` | 覆盖 |
| `target_platform` | reference-anchor | 平台 | `project.target_platform` | 覆盖 |
| `duration` | video-director | 时长 | `project.duration` | 覆盖 |
| `shot_count` | video-director | 分镜数 | —（写入 shot-state 镜数） | 覆盖 |
| `color_scheme` | color-narrative | CN 编号 | `style.color_narrative` | 自动匹配 |
| `output_format` | task-router | 输出格式 | —（路由决策，不直接入 state） | 覆盖 |
| `layout_style` | layout-styles | LS 编号 | `style.layout_*`（按目标模板） | 覆盖 |

---

## 处理逻辑

### 解析成功时

```
1. 读取 frontmatter → 提取所有已知字段
2. 将已提取字段传入 story-intake（标记 source=frontmatter）
3. story-intake 跳过这些字段的询问，只补全缺失字段
4. 角色外观描述 → 作为 character-dna 的初始值（非最终值）
5. 场景描述 → 作为场景描述的初始值
```

### 解析失败 / 无 frontmatter 时

```
→ 正常走 story-intake 完整提取流程
→ 不报错，不中断
```

---

## 自动编号转换

Frontmatter 中的中文/英文值 → 系统内部编号：

| 输入值 | 自动转换为 |
|--------|----------|
| `genre: 玄幻` | VS3 东方玄幻 |
| `era: 中国古代` | HE3 或精确匹配子时代 |
| `weather: 暴雨` | WT3 暴雨 |
| `emotion: 悲壮` | EC7 复仇/悲壮 或 EC4 悲剧 |
| `structure: 三幕` | NS1 三幕结构 |
| `pacing: 快切` | P1 快切 |
| `style: 东方玄幻` | VS3 |
| `target_platform: Seedance` | Seedance 平台配置 |

---

## 输出

解析结果作为元数据，追加到 sources/README.md 统一输出格式的"元数据"区域：

```
元数据（frontmatter解析）：
  title: 剑道独尊
  genre: 玄幻 → VS3 东方玄幻
  characters: 张三(主角/剑修), 李四(反派/魔修)
  scene: 昆仑山剑冢
  emotion: 悲壮 → EC7
  era: 中国古代 → HE3
  weather: 暴雨 → WT3
  target_platform: Seedance
  duration: 10s
  shot_count: 5
  structure: 三幕 → NS1
```

→ 直接送入 story-intake，跳过这些字段的提问。
