# Templates

输出格式模板目录。每个模板对应一种输出格式，定义 Prompt 的结构和字段。

## 模板列表

| 模板文件 | 对应格式 | 说明 |
|---------|---------|------|
| `full-board.md` | 全案板（格式1） | 电影级视觉开发全案，7 模块完整输出 |
| `quick-board.md` | 快速故事板（格式2）/ 关键帧序列（格式10） | 精简版，快速出图 |
| `character-sheet.md` | 角色设定卡（格式3）/ 三视图设定卡（格式9） | 角色三视图+面部+道具 |
| `scene-card.md` | 场景概念卡（格式4） | 单一场景概念图+氛围 |
| `poster.md` | 海报（格式5） | 电影海报/宣传海报 |
| `manga-page.md` | 漫画分镜页（格式6）/ 四格漫画（格式8） | 漫画式分镜格 |
| `mood-board.md` | 情绪板（格式7） | 氛围/色彩/材质参考 |

## 格式路由

| 用户选择的格式 | 使用模板 | 模式 |
|--------------|---------|------|
| 1 全案板 | `full-board.md` | 标准 |
| 2 快速故事板 | `quick-board.md` | 快速 |
| 3 角色设定卡 | `character-sheet.md` | 标准 |
| 4 场景概念卡 | `scene-card.md` | 标准 |
| 5 海报 | `poster.md` | 标准 |
| 6 漫画分镜页 | `manga-page.md` | 漫画 |
| 7 情绪板 | `mood-board.md` | 标准 |
| 8 四格漫画 | `manga-page.md` | 四格 |
| 9 三视图设定卡 | `character-sheet.md` | 三视图 |
| 10 关键帧序列 | `quick-board.md` | 关键帧 |

## 使用方式

模板由 AI Visual Director Skill 在生成 prompt 时自动选择，用户无需手动操作。
