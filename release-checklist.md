# Release Checklist

> 版本：V2.5 | 日期：2026-06-10
> 31 引擎 · 8 state 文件 · 6 导演模仿库 · 36 知识库

---

## 1. 运行时完整性

- [ ] `SKILL.md` 存在，作为唯一总控入口
- [ ] `engines/` — 31 个引擎（16 主链 + 14 辅助 + 1 工具）
- [ ] `state/` — 8 个状态文件（variable-registry / asset-map / shot-state / dialogue-map / prompt-contract / project-graph / continuity-state / continuity-snapshot）
- [ ] `imitation/` — 6 导演模仿库（王家卫 / 维伦纽瓦 / 诺兰 / 吉卜力 / 皮克斯 / 张艺谋）
- [ ] `knowledge/` — 36 个知识文件
- [ ] `rules/` — 11 个规则文件
- [ ] `platforms/` — 6 个平台适配文件
- [ ] `templates/` — 8 个输出模板
- [ ] `sub-skills/` — 8 个子技能入口
- [ ] `sources/` / `projects/` / `docs/` / `examples/` 就位

## 2. V2.3-V2.5 核心能力

- [ ] Project Graph — 依赖图引擎，5 种关系类型双向索引
- [ ] Incremental Update — 10 类变更分类，限定一致性重评
- [ ] Style Memory — 项目级风格锁定 + 跨章继承 + 章节覆盖
- [ ] Imitation Library — 6 导演 9 维度分解
- [ ] Consistency Engine 全量 + 增量双模式

## 3. 主链完整

- [ ] task-router → project-manager → story-intake → shot-budget → video-director
- [ ] → asset-plan → reference-anchor → motion-physics → project-graph
- [ ] → video-prompt-assembly → consistency-engine → prompt-scorer
- [ ] → auto-repair → final-video-qc → render-package

## 4. 入口可用

- [ ] `/create` — 一键总编排
- [ ] `/source` — 输入源处理
- [ ] `/storyboard` — 分镜图
- [ ] `/character` — 角色卡
- [ ] `/scene` — 场景图
- [ ] `/video` — 视频执行包
- [ ] `/style` — 兼容入口
- [ ] `/poster` — 兼容入口

## 5. 交叉引用

- [ ] 所有引擎 `联动` section 读写方完整
- [ ] `state/` 文件读写方列表无遗漏
- [ ] `engines/README.md` 主链图与实际一致
- [ ] `state/README.md` 生命周期图与实际一致

## 6. 出图安全

- [ ] Prompt 无品牌名默认推荐
- [ ] Prompt 无可读文字
- [ ] 场景/角色卡出图模式无标注
- [ ] 古代场景无现代光源穿帮

## 7. 开源规范

- [ ] MIT LICENSE 存在
- [ ] 无品牌侵权默认风格名
- [ ] 无敏感内容在样例中

---

## 验收结论

| 类别 | 状态 |
|------|------|
| 运行时完整性 | ⬜ |
| V2.5 核心能力 | ⬜ |
| 主链完整 | ⬜ |
| 入口可用 | ⬜ |
| 交叉引用 | ⬜ |
| 出图安全 | ⬜ |
| 开源规范 | ⬜ |
