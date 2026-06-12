# 视觉控制状态

当前项目的视觉密度、背景复杂度、HUD、粒子、文字、纹理噪点、主体优先级。被所有模板读取，被 `/declutter` 修改，被 `visual-density-controller` 初始化。

---

## 当前值

```json
{
  "visual_control": {
    "density_level": 2,
    "background_complexity": "low",
    "annotation_level": "minimal",
    "texture_noise": "low",
    "hud_elements": "none",
    "particle_level": "subtle",
    "text_level": "none",
    "focus_priority": "character",
    "film_grain": "none",
    "skin_detail": "natural",
    "lighting_style": "soft",
    "genre_override": {
      "genre": "爱情",
      "texture_noise": "low",
      "film_grain": "none",
      "skin_detail": "natural_rosiness",
      "lighting_style": "warm_soft",
      "positive_keywords": ["natural skin flush", "soft warmth", "subtle rosiness", "gentle lighting"],
      "forbidden": ["hard light", "harsh shadows", "cold tone", "rough texture"]
    },
    "negative_noise_bans": [
      "random grid artifacts",
      "fake UI clutter",
      "meaningless micro text",
      "over-detailed background"
    ]
  }
}
```

---

## 字段解释

| 字段 | 可选值 | 说明 |
|------|--------|------|
| `density_level` | 1-5 | 画面信息密度。1 极简（三视图），5 世界观复杂板 |
| `background_complexity` | `none` / `low` / `medium` / `high` | 背景复杂度 |
| `annotation_level` | `none` / `minimal` / `moderate` / `dense` | 标注密度 |
| `texture_noise` | `none` / `low` / `medium` / `high` | 纹理噪点（纸纹/脏污/锐化）— 由 genre 覆盖 |
| `hud_elements` | `none` / `minimal` / `moderate` / `dense` | HUD 和科技线框元素 |
| `particle_level` | `none` / `subtle` / `cinematic` / `heavy` | 粒子/雾/光点/碎屑 |
| `text_level` | `none` / `minimal` / `readable` / `production_notes` | 文字使用程度 |
| `focus_priority` | `character` / `scene` / `action` / `material` / `worldbuilding` | 主体优先级 |
| `film_grain` | `none` / `subtle` / `cinematic` / `heavy` | film grain 强度 — 由 genre 决定 |
| `skin_detail` | `none` / `natural` / `natural_rosiness` / `weathered` / `battle_worn` / `gritty` | 皮肤质感 — 由 genre 决定 |
| `lighting_style` | `flat` / `soft` / `warm_soft` / `hard` / `chiaroscuro` / `neon` / `natural` | 光线风格 — 由 genre 决定 |
| `genre_override` | object | 故事类型覆盖值（genre / texture_noise / film_grain / skin_detail / lighting_style / positive_keywords / forbidden） |
| `negative_noise_bans` | string[] | 本项目禁用的噪点类型 |

---

## 更新触发

| 触发条件 | 操作 |
|---------|------|
| `/declutter` 命令 | 降低对应维度 |
| `visual-density-controller` 初始化 | 按输出类型设默认值 |
| 用户说"更干净/更留白" | density -1 |
| 用户说"信息多一点/设定集" | density +1（不超输出类型上限） |
| `auto-repair` 视觉干净度低 | 调用 `prompt-declutter` → 更新状态 |

---

## 联动

← 被 `visual-density-controller` 初始化
← 被 `prompt-declutter` 修改
→ 被所有 `templates/*.md` 读取
→ 被 `video-prompt-assembly` 读取（视频首帧干净度检查）
→ 被 `final-video-qc` 第10项检查
