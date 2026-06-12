# 失败回流规则

指明每种失败现象应该回流到哪个规则、模板或知识库。被 `auto-repair` 和 `knowledge-retrieval` 调用。

---

## 一、回流规则表

| 失败现象 | 回流位置 | 修复动作 |
|---------|---------|---------|
| 脸漂（面部变形、五官移位） | `rules/character-consistency.md`、`knowledge/character-dna.md` | 补角色卡 + 面部多角度，强化 DNA 不可变字段 |
| 发型漂（发色/长度/造型跨镜变化） | `templates/character-sheet.md`、`rules/asset-minimums.md` | 触发 LS42 仙灵长发板，如果是长发/纱衣 |
| 服装漂（服装结构/颜色/材质变化） | `rules/asset-minimums.md`、`templates/character-sheet.md` | 触发服饰细节卡（方法5 或 LS44） |
| 场景漂（背景/空间/光线跨镜不连续） | `rules/scene-consistency.md`、`templates/scene-card.md` | 补场景九宫格（LS9）或全景图 |
| 画面太脏（背景杂乱、噪点多） | `rules/visual-cleanliness.md`、`engines/prompt-declutter.md` | 调用 /declutter all，降低 density |
| HUD 乱飞（无意义科技线框） | `engines/visual-density-controller.md` | 设 hud_elements=none，/declutter hud |
| 粒子过多（雾/光点/碎屑淹没主体） | `state/visual-control-state.md` | 设 particle_level=subtle，/declutter particles |
| 分镜看不清（格太小、标注压图） | `templates/full-board.md`、`knowledge/layout-styles.md` | 调大格尺寸、降 annotation_level、拆多张 |
| 平台超限（字数/时长/参考图超平台上限） | `api-config.template.env`、`engines/prompt-compression.md` | 压缩 prompt + 裁切低优先级参考图 |
| 长片断裂（跨段角色/场景跳变） | `state/continuity-snapshot.md`、`state/continuity-state.md` | 补 continuity-snapshot + 尾帧→首帧锚定 |
| 模板不好看（输出版式不适合） | `knowledge/layout-styles.md`、对应 `templates/*.md` | 换 LS 版式，参考 LS metadata best_for/avoid |
| 角色风格串味（科幻角色穿古风） | `engines/styles.md`、`knowledge/visual-styles.md` | 检查 VS 编号是否匹配 genre |
| 色彩跳变（跨镜色调不统一） | `engines/color-narrative.md`、`state/variable-registry.md` | 锁定 CN 编号，补色彩方案 |
| 动作不连贯（帧间跳跃/瞬移） | `engines/motion-physics.md`、`state/shot-state.md` | 补 motion 兼容检查，限制运动复杂度 |
| 文字乱码（输出中文乱码/不可读） | `api-config.template.env`、平台语言支持表 | 检查 {PLATFORM}_SUPPORTS_CHINESE，必要时翻译 |
| 伪文字污染（背景不可读小字抢画面） | `engines/prompt-declutter.md` | /declutter text，设 text_level=none |
| 道具变形（武器/配饰跨镜变化） | `rules/asset-minimums.md`、`templates/character-sheet.md` | 补武器道具细节卡 |
| 肢体畸形（多手指/断肢/扭曲） | `rules/visual-cleanliness.md`、负面提示词自动生成规则 | 加负面词：no body distortion, no extra fingers, no extra limbs |
| display_asset 被误用为 video_asset | `rules/video-reference-assets.md`、`engines/reference-anchor.md` | /declutter video-ref 派生 clean 版本，或生成 video_asset |
| 台词连贯性断裂（跨镜对话不衔接） | `state/dialogue-map.md`、`engines/dialogue-engine.md` | 补 dialogue continuity，重新标注 rhythm+delivery |
| 音效覆盖不完整（关键镜无 SE/FX/MU） | `state/sound-map.md`、`engines/sound-engine.md` | 补 sound-map 缺失条目，按 genre+动作重新匹配 SD 编号 |

---

## 二、回流优先级

| 优先级 | 失败类型 | 阻断级别 | 自动修复 |
|--------|---------|---------|---------|
| P0 | 脸漂、服装漂、场景漂 | 致命 | 自动补资产 + 重新生成 |
| P0 | 平台超限 | 致命 | prompt-compression + 裁切参考图 |
| P1 | 画面太脏、HUD乱飞 | 致命（角色卡/首帧）/ 非致命（海报） | /declutter |
| P1 | 长片断裂 | 致命 | continuity-snapshot |
| P2 | 分镜看不清、模板不好看 | 非致命 | 换 LS 版式 |
| P2 | 色彩跳变、动作不连贯 | 非致命 | 补参数 |

---

## 三、输出格式

```markdown
【失败归因】

问题：[具体失败现象]
归因：[根本原因]
回流：`[目标规则/模板/知识库]`
建议：[修复动作]
阻断级别：[致命/非致命]
```

---

## 联动

← 失败 → 回流到对应文件
→ 被 `engines/auto-repair.md` 读取（选择修复策略）
→ 被 `engines/knowledge-retrieval.md` 读取（搜索具体修复方法）
→ 输出失败样本记录（供后续规则补丁参考）
