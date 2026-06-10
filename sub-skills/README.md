# Sub-Skills

AI Visual Director 的子技能模块。每个子技能处理一个主命令的完整工作流。

## 子技能列表

| 目录 | 对应命令 | 功能 |
|------|---------|------|
| `create/` | `/create` | 一键总编排 — 编排角色卡/场景图/分镜图/视频执行包 |
| `source/` | `/source` | 输入源读取 — Obsidian/Markdown/frontmatter/批量章节 |
| `storyboard/` | `/storyboard` | 核心资产：故事板/分镜图 — 智能推荐/多版本/一键全平台 |
| `character/` | `/character` | 核心资产：角色卡 — 角色设定卡/三视图/面部多角度/12表情/DNA |
| `scene/` | `/scene` | 核心资产：场景图 — 全能参考图/720全景/环绕截图/camera remix |
| `video/` | `/video` | 视频 Prompt — 压缩模式/详细模式/分镜图/跨段衔接/API直出 |
| `style/` | `/style` | 兼容入口：风格调整 — 风格迁移/多版本/压缩/看全部 |
| `poster/` | `/poster` | 兼容入口：海报生成 — 电影海报/宣传海报 |

## 架构

```
主技能 (ai-visual-director)
├── create      ← 一键故事到视频
├── source      ← 输入源读取
├── storyboard  ← 分镜与全案板
├── character   ← 角色设计
├── scene       ← 场景设计
├── video       ← 视频 Prompt
├── style       ← 兼容：风格调整
└── poster      ← 兼容：海报生成
```

## 路由规则

1. 用户说 `/create` 或普通故事输入 → 路由到 `create/SKILL.md`
2. 用户说 `/source`、Obsidian、读取项目 → 路由到 `source/SKILL.md`
3. 用户说 `/storyboard` → 路由到 `storyboard/SKILL.md`
4. 用户说 `/character` → 路由到 `character/SKILL.md`
5. 用户说 `/scene` → 路由到 `scene/SKILL.md`
6. 用户说 `/video` 或视频相关 → 路由到 `video/SKILL.md`
7. 用户说 `/style` 或风格调整 → 路由到 `style/SKILL.md`
8. 用户说 `/poster` → 路由到 `poster/SKILL.md`

## 状态层（state/）

所有子技能共享 `state/` 变量注册中心：

```
/character   → 写入 state/variable-registry（characters.*）+ state/asset-map（@图映射）
/scene       → 写入 state/variable-registry（scene.*）+ state/asset-map
/storyboard  → 写入 state/variable-registry（style.*）+ state/shot-state + state/asset-map
/create      → 写入全部 state/ + state/asset-map + state/shot-state + state/dialogue-map
/source      → 写入 state/variable-registry（project.title/genre + characters + scene）
/video       → 读取 state/asset-map + state/shot-state；写入 state/variable-registry + state/asset-map
/style       → 读取 state/variable-registry（style.visual_style）；迁移时更新 state/variable-registry
/poster      → 读取 state/variable-registry（project.title + style.visual_style）
```

子技能的具体路由契约见 `engines/task-router.md` → 基础能力子路由。模板统一从 `state/variable-registry.md` 读取变量值。

## 使用方式

子技能由主技能根据用户命令自动路由，用户无需手动操作。
