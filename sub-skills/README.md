# Sub-Skills

AI Visual Director 的子技能模块。每个子技能处理一个主命令的完整工作流。

## 子技能列表

| 目录 | 对应命令 | 功能 |
|------|---------|------|
| `storyboard/` | `/storyboard` | 故事板生成 — 一键生成/智能推荐/多版本/一键全平台 |
| `character/` | `/character` | 角色设计 — 角色设定卡/三视图/面部多角度/12表情/DNA |
| `scene/` | `/scene` | 场景设计 — 全能参考图/720全景/环绕截图/camera remix |
| `video/` | `/video` | 视频 Prompt — 压缩模式/详细模式/分镜图/跨段衔接/API直出 |
| `style/` | `/style` | 风格调整 — 风格迁移/多版本/压缩/看全部 |
| `poster/` | `/poster` | 海报生成 — 电影海报/宣传海报 |

## 架构

```
主技能 (ai-visual-director)
├── storyboard  ← 故事板生成
├── character   ← 角色设计
├── scene       ← 场景设计
├── video       ← 视频 Prompt
├── style       ← 风格调整
└── poster      ← 海报生成
```

## 路由规则

1. 用户说 `/storyboard` → 路由到 `storyboard/SKILL.md`
2. 用户说 `/character` → 路由到 `character/SKILL.md`
3. 用户说 `/scene` → 路由到 `scene/SKILL.md`
4. 用户说 `/video` 或视频相关 → 路由到 `video/SKILL.md`
5. 用户说 `/style` 或风格调整 → 路由到 `style/SKILL.md`
6. 用户说 `/poster` → 路由到 `poster/SKILL.md`

## 使用方式

子技能由主技能根据用户命令自动路由，用户无需手动操作。
