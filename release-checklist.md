# v1.0 发布验收清单

> 版本：v1.0.0 | 日期：2026-06-09
> 90 条测试 · 14 条核心规则 · 7 个文档 · 0 打回

---

## 1. 文档完整性

- [x] `README.md` 可读 — 30 秒上手 / 核心命令 / 示例 / 项目结构
- [x] `README.en.md` — English version 完整
- [x] `docs/SKILL.md` 完整 — 12 节无遗漏
- [x] `docs/user-guide.md` — 用户说明书
- [x] `docs/commands.md` — 6 主命令 + 全局调整 + API 参考
- [x] `docs/rules.md` — 14 条核心规则速查
- [x] `docs/video-workflow.md` — 视频工作流完整文档
- [x] `docs/obsidian-workflow.md` — Obsidian/批量/续集文档
- [x] `docs/platform-prompts.md` — 全平台 Prompt 格式参考
- [x] `docs/system-architecture.md` — 系统架构（12 引擎主链 + state/ 层 + 基础能力子路由）
- [x] `CHANGELOG.md` — v0.1.0 → v1.0.0 完整版本记录

---

## 2. 运行时稳定性

- [x] 根目录 `SKILL.md` 存在，作为唯一总控入口
- [x] `engines/` 决策引擎目录存在（VS/LS/情绪/节奏/评分/压缩）
- [x] `state/` 状态注册中心目录存在（变量注册/资产映射/镜头状态/台词映射/模板契约）
- [x] `knowledge/` 素材知识库目录存在（角色/场景/镜头/材质/声音/时代）
- [x] `rules/` 规则目录存在（一致性/质量/文化准确性/负面词/补丁）
- [x] `platforms/` 平台适配目录存在（图像/视频平台和 API）
- [x] `templates/` 输出模板目录存在
- [x] `sub-skills/` 6 个子技能（storyboard/character/scene/video/style/poster）
- [x] `.agents/` 与 `.claude/` 是本机安装副本，已加入 `.gitignore`，不得随发布包跟踪

---

## 3. 回归测试（90 条全部通过）

- [x] R01 雨夜古寺师徒对决 通过
- [x] R02 深夜便利店前任偶遇 通过
- [x] R03 废弃太空港仿生少女 通过
- [x] R04 蓝色桌面宠物送牛奶 通过
- [x] 12 题材泛化测试（36 条）：规则完备
- [x] v0.6 高频文本工作流（28 条）：100%
- [x] v0.7 视频工作流（28 条）：100%
- [x] v0.8 批量/Obsidian/续集（5 条）：100%
- [x] v0.9 平台兼容格式（25 条）：100%

---

## 4. 规则补丁

- [x] 10 条初始规则补丁（R001-R010）全部已修复
- [x] `rules/skill-patches.md` 记录完整
- [x] `rules/skill-patches-v0.6.md` 4 条补丁全部已应用

---

## 5. 出图安全

- [x] Prompt 无品牌名默认推荐（Disney/Pixar/吉卜力）
- [x] Prompt 无可读文字（中文/英文/数字）
- [x] 场景参考图出图模式无标注
- [x] 角色卡出图模式无红色标注
- [x] 古代场景无现代光源穿帮（霓虹灯光/LED/街灯）

---

## 6. 题材安全

- [x] 科幻题材不默认机甲化（R10）
- [x] 都市狭小空间无环绕/旋转/穿墙运镜（R11）
- [x] 风格迁移不改剧情事实（R8）
- [x] 单镜修改不漂移时间码（R7）
- [x] 角色身份冲突输出解释（R4）

---

## 7. 平台诚实

- [x] README 不加夸大（GPT Image/MJ 主推，其余模板兼容）
- [x] 未实测平台全部标注 📝 模板兼容 / 🔧 社区扩展
- [x] 无 ✅ 已验证 出现在未实测平台
- [x] README 声明：这是一个 Prompt Workflow Skill，不是本地出图框架

---

## 8. 开源规范

- [x] MIT LICENSE 文件存在
- [x] 无品牌侵权默认风格名
- [x] 无敏感内容在样例中
- [x] `.github/ISSUE_TEMPLATE/platform-compatibility.md` 存在

---

## 9. 样例和演示

- [x] `examples/video/` 4 个视频 prompt 样例
- [x] `examples/series/` 2 个续集样例
- [x] `tests/obsidian-fixtures/novel/` 模拟目录（3章+角色+场景）
- [x] `demo/demo-script.md` 就位

---

## 10. 版本标记

- [x] `CHANGELOG.md` 包含 v1.0.0 条目
- [x] Git tag `v1.0.0` 已打
- [ ] GitHub Release 已创建（待推送后创建）

---

## 验收结论

| 类别 | 状态 |
|------|------|
| 文档完整性 | ✅ 10/10 |
| 运行时稳定性 | ✅ 5/5 |
| 回归测试 | ✅ 90/90 |
| 规则补丁 | ✅ 14/14 |
| 出图安全 | ✅ 5/5 |
| 题材安全 | ✅ 5/5 |
| 平台诚实 | ✅ 4/4 |
| 开源规范 | ✅ 4/4 |
| 样例演示 | ✅ 4/4 |
| 版本标记 | ✅ 2/3（GitHub Release 待手动创建） |

**v1.0.0 发布就绪** ✅
