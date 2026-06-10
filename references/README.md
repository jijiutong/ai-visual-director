# References Migration Note

`references/` 曾经承载所有参考文件。现在系统已经拆成四层：

| 新目录 | 职责 |
|--------|------|
| `engines/` | 决策、推荐、组合、评分、压缩等“会推理的规则” |
| `knowledge/` | 角色、场景、镜头、材质、声音、时代等素材知识库 |
| `rules/` | 硬约束、质量检测、一致性、负面词、文化准确性 |
| `platforms/` | 图像/视频平台适配、API 集成、平台参数 |

新文件不要再放进 `references/`。如果不确定放哪里：

- 会做选择或组合 → `engines/`
- 只是提供词表和素材 → `knowledge/`
- 负责禁止、检查、纠错 → `rules/`
- 和 GPT Image / Midjourney / SD / Seedance / Runway 等平台有关 → `platforms/`

总控入口仍然是根目录 `SKILL.md`。
