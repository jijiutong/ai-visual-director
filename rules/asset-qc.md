# 资产质量检查

检查生成后的图片资产是否符合其声明用途。与 `prompt-qc` 互补：prompt-qc 管 prompt 文本生成前，asset-qc 管图片资产生成后。

---

## 一、检查时机

| 触发 | 时机 |
|------|------|
| 每个模板生成图片 prompt 后 | 输出前 |
| `/create` 主链各子路由完成后 | 组装 video prompt 前 |
| reference-anchor 构建 @图映射前 | 写入 asset-map 前 |
| auto-repair 修复后 | 重新输出前 |
| 用户说 `/check` | 手动触发 |

> 与 `prompt-qc` 的分工：prompt-qc 检查 prompt 文本是否合规，asset-qc 检查产出的图片资产是否与声明的 asset_purpose 一致。

---

## 二、四维度检查

### 维度 1：用途一致

对照 `state/format-contract-state.md` 和 `state/asset-map.md`，检查资产实际用途是否与声明一致。

```
□ 资产的 asset_purpose 是否与 format-contract 一致？
□ display_asset 是否被误写入 asset-map 的 video @图？
□ marketing_asset 是否出现在 video @图引用中？
□ consistency_asset 是否保持了锁定字段？
□ video_asset 是否从正确的源资产派生？
```

### 维度 2：视频安全性

仅检查 asset_purpose=video_asset 的资产。

```
□ 无可见文字（含乱码/伪文字/背景文字）？
□ 无边框/表格线/分隔线？
□ 无 HUD/UI 元素（科技类最小化 UI 除外）？
□ 无箭头/标注/指向线？
□ 无红框/DO NOT CHANGE 标记？
□ 主体占画面 ≥ 50%？
□ 背景复杂度 ≤ low（density ≤ 2）？
□ 粒子/雾效 ≤ subtle？
□ 风格/色彩/光与源资产一致？
```

### 维度 3：用途隔离

```
□ display_asset 是否未被当作 video_asset 使用？
□ marketing_asset 是否未被当作 video_asset 使用？
□ display_asset 的文字/边框在展示用途下是否合理？
□ 全案板导演版是否只用作展示，未进入视频 @图？
□ 海报是否标注了 asset_purpose=marketing_asset + video_safe=false？
```

### 维度 4：可派生性

``` 
□ display_asset 是否可以派生 clean video_asset？（主体清晰、构图完整）
□ 如果可以派生：是否有对应的 video_asset 已注册 asset-map？
□ 如果不可以派生：是否已提示用户？
```

---

## 三、用途误用检测

读取 `state/asset-map.md`，遍历所有资产的 asset_purpose：

```
读取 asset-map → 遍历视频 @图引用的资产：
  ├─ asset_purpose = display_asset → ⚠ 致命：需先派生 clean video_asset
  │   处理：阻断 → 触发 /declutter video-ref 或提示用户派生
  ├─ asset_purpose = marketing_asset → ❌ 致命：海报不进视频
  │   处理：阻断 → 从视频 @图中移除该资产
  ├─ asset_purpose = video_asset → ✅ 放行
  └─ asset_purpose = consistency_asset → ✅ 放行（三视图/面部一致性可直接用）
```

---

## 四、致命 vs 非致命

| 问题 | 级别 | 处理 |
|------|------|------|
| display_asset 被误用为 video @图 | **致命** | 阻断，触发派生 |
| marketing_asset 出现在 video @图 | **致命** | 阻断，移除 |
| video_asset 有可读文字 | **致命** | 阻断，重新派生 |
| video_asset 有边框/HUD | **致命** | 阻断，重新派生 |
| video_asset 主体 < 50% | **致命** | 阻断 |
| 缺 fatal_if_missing 模块（format-contract） | **致命** | 阻断，补全 |
| video_asset 背景稍复杂（density 2→3） | 警告 | 标记，建议降密度 |
| display_asset 文字偏多但用途正确 | 警告 | 标记，不影响展示用途 |
| 粒子/雾效稍多但主体清晰 | 放行 | — |
| 海报设计自由发挥（marketing_asset） | 放行 | 海报不受 video_safe 限制 |

---

## 五、QC 结果格式

```
【Asset QC】[N/4] 通过

✅ 用途一致：3/3 资产 asset_purpose 与声明一致
✅ 视频安全：2/2 video_asset 无文字/边框/HUD
❌ 用途隔离：全案板导演版（display_asset）被 @3 引用为视频参考 → 致命
✅ 可派生性：全案板可派生 central hero frame

阻断：第3项 — 先 /declutter video-ref 派生 clean video_asset，再更新 @3 引用。
```

---

## 六、与 final-video-qc 的分工

| 检查项 | asset-qc | final-video-qc |
|--------|---------|---------------|
| 资产用途隔离 | ✅ §维度3 | ✅ §11 视觉可用性 |
| video_asset 文字/边框 | ✅ §维度2 | ✅ §11 |
| 引用一致性（@图 ↔ asset-map） | ✅ §维度1 | ✅ §8 |
| 镜头连续性 | — | ✅ §6 |
| 台词/音效 | — | ✅ §12 |
| 平台兼容性 | — | ✅ §5 |

> asset-qc 与 final-video-qc §11（视觉可用性）有重叠，但 asset-qc 更细粒度。两者互补：asset-qc 在每个资产产出后立即检查，final-video-qc 在最终视频包阶段做汇总检查。

---

## 联动

- ← 读取 `state/format-contract-state.md`（当前格式合同）
- ← 读取 `state/asset-map.md`（@图映射，检查用途）
- ← 读取 `rules/format-contract.md`（合同定义，fallback）
- ← 读取 `rules/video-reference-assets.md`（派生规则）
- → 阻断 → 触发派生或重新生成
- → 通过 → 放行，资产写入 asset-map
- → 被 `rules/final-video-qc.md` §11 引用
- ↔ 与 `rules/prompt-qc.md` 互补：prompt-qc 管文本，asset-qc 管图片资产
