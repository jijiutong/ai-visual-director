# QC & 冲突检测

生成前冲突检测 + 生成后质检。分三部分：冲突自动修正、视频负面提示词、视频生成后检查清单。

---

## 一、冲突检测与自动修正

生成 prompt 前自动检查以下冲突，发现后自动修正并标注原因：

| 冲突类型 | 检测规则 | 自动修正 |
|---------|---------|---------|
| 时代穿帮 | 风格是西方中世纪但故事是中国古代 → 检查道具/服饰/建筑 | 移除跨文化元素，替换为对应时代正确物品 |
| 文化穿帮 | VS 是东方风格但提示词出现 castle/knight/wizard | 东方→用宫殿/修士/仙人，西方→用城堡/knight/wizard |
| 风格矛盾 | 用户同时选吉卜力治愈 + 暗黑哥特 → 冲突 | 询问用户或取主风格70%+副风格30%融合 |
| 色彩冲突 | 情绪曲线是悲伤但色彩方案是高饱和明亮 | 暗化色彩：CN8 复仇红黑 / CN15 忧郁蓝灰 |
| 生物穿帮 | 故事是中国古代但生物选了西方dragon(带翅膀) | 中国龙→CR1(无翼蛇形), 西方龙→CR22(带翼) |
| 天气不合 | 场景是室内密室但天气选暴雨+沙尘暴 | 保留一个主导天气，室内场景弱化天气效果 |
| 时代×道具 | HE编号≠PR编号(如HE2秦朝出现PR36手机) | 移除时代不符道具，替换为时代内物品 |
| 文化×生物 | HE9欧洲中世纪出现CR1中国龙 | 替换为对应文化的生物(西方→CR22恶龙) |
| 风格×时代 | VS21 Disney3D + HE2 秦朝 → 可行但需标注 | 正常生成，追加"Disney3D秦朝风格化"说明 |
| 角色×时代 | DNA中服装描述与HE编号冲突 | 以HE编号为准，修正服装为时代正确款式 |

**冲突修正输出格式**（如触发）：
```
⚠ 自动修正：[原冲突] → [修正结果]，原因：[原因]
```

---

## 二、视频专属负面提示词

自动附加到所有视频 prompt 尾部：

```
no flickering, no frame flashing, no sudden brightness jumps, no color shifts,
no morphing, no body distortion, no face melting, no limb warping, no extra fingers,
no floating, no sliding feet, no hovering, no broken physics,
no background shifting, no environment pop-in, no sky color change,
no disappearing props, no weapon shape change, no accessory deformation,
no clothing texture change, no fabric stiffness, no costume color drift,
no broken continuity between frames, no jump cuts, no ghosting artifacts,
no text garbling, no watermark, no logo, no subtitles mismatch。
```

---

## 三、视频生成后 12 项检查清单

出片后逐项打勾，快速定位问题归属：

```
□ 1. 场景一致性：所有帧背景是否同一环境？天空/地面/光线是否连贯？
  → 场景断裂 = 缺场景参考图 → 回复"生成场景参考图"
□ 2. 角色一致性：所有帧面部/发型/服装是否一致？
  → 角色漂移 = 缺角色卡 → 回复"生成角色卡"
□ 3. 光照方向：所有帧主光方向是否一致？色温是否跳跃？
  → 光跳变 = 缺光照材质图 → 回复"生成光照材质图"
□ 4. 道具形制：武器/配饰形状/纹路/颜色是否不变？
  → 道具变形 = 缺道具细节卡 → 回复"生成道具细节卡"
□ 5. 动作连贯：帧间动作是否平滑？有无瞬移/定格？
  → 动作断裂 = 缺首尾帧 → 回复"生成首尾帧"
□ 6. 画面锚点：整体画面是否偏离故事板？
  → 画面偏移 = 缺视频分镜图 → 回复"生成视频分镜图"
□ 7. 转场流畅：帧间切换是否生硬闪跳？
  → 闪跳 = 缺过渡描述 → 检查 prompt 是否有帧间过渡方式
□ 8. 字幕正确：字幕时间/位置/内容是否准确？
  → 字幕问题 = 检查 prompt 字幕约束是否完整
□ 9. 材质质感：布料/金属/皮肤纹理是否跳变？
  → 材质跳变 = 缺光照材质图 → 同上
□ 10. 视觉干净度：无乱码/HUD/随机网格/过量粒子/文字遮挡
  → 致命项阻断输出（见 rules/visual-cleanliness.md）
□ 11. 视觉可用性：asset_purpose 与 format-contract 一致
  → display_asset 误入 video @图 = 致命（见 rules/asset-qc.md）
□ 12. 台词/音效：台词连贯 + 音效覆盖完整
  → 缺关键条目 = 致命（见 rules/final-video-qc.md）
□ 总体打分：0-100 分，低于 60 建议补全锚点重新生成
```

---

## 联动

← 读取 `rules/cultural-accuracy.md`（文化精准度）、`rules/negative-prompt.md`（通用负面词）
← 读取 `rules/visual-cleanliness.md`（视觉干净度红线）、`rules/asset-qc.md`（资产质量检查）
← 读取 `rules/final-video-qc.md`（视频 QC 完整 12 项）
→ 被 `templates/steps.md` Step 3.6 调用（冲突检测）
→ 被 `engines/video-prompt-assembly.md` 调用（视频负面词追加）
→ 被 `/avd/video` 输出后调用（检查清单）
