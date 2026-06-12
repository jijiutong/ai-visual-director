# 状态提交引擎

控制状态写回流程。管理 draft → locked → committed 的生命周期。处理 `/lock` 和 `/commit` 命令。

---

## 一、状态生命周期

```
生成产出（draft）
  ↓ 用户确认
锁定（locked）→ 写入 lock-state.md
  ↓ 用户 commit
提交（committed）→ 写入 variable-registry.md + 持久化 projects/
```

---

## 二、命令处理

### /lock

锁定当前产出。用户确认"这个定了""锁定""就这版"触发。

**流程**：

```
1. 确定锁定范围（用户可指定部分锁定）
2. 提取当前产出的关键字段
3. 写入 state/lock-state.md 对应位置
4. 写入 state/state-commit-log.md 锁定记录
5. 输出确认：已锁定 [范围]
```

**锁定范围选项**：

| 用户说 | 锁定范围 |
|--------|---------|
| "锁定角色" / "角色定了" | 当前所有角色的 face_dna + costume_core |
| "锁定场景" / "场景定了" | 当前所有场景的 structure + light + fixed_elements |
| "锁定风格" / "风格定了" | 当前 VS/EC/CN/LS |
| "锁定全部" / "全部定了" | 角色+场景+风格+格式+资产用途 |
| "脸型定了，服装再试" | 部分锁定：face_dna 锁，costume_core 不锁 |
| "就这版" | 锁定当前产出对应的全部字段 |

### /commit

将已锁定的内容写回主状态。用户说"确认采用""用这版""commit"触发。

**流程**：

```
1. 读取 state/lock-state.md → 提取所有 locked 字段
2. 将 locked 字段写入 state/variable-registry.md
3. 将 locked 字段持久化到 projects/<id>/state/
4. 状态标记为 committed
5. 写入 state/state-commit-log.md 提交记录
6. 输出确认：已提交，[N]个字段写回主状态
```

**commit 前置条件**：

```
□ 至少有一个字段处于 locked 状态
□ 项目已初始化（project.id 存在）
□ 没有冲突的未确认变更
```

### /unlock

解除锁定。用户说"解锁[范围]"触发。

**流程**：

```
1. 确认解锁范围
2. 清除 state/lock-state.md 对应字段（恢复为 "—"）
3. 写入 state/state-commit-log.md 解锁记录
4. 输出确认：已解锁 [范围]
```

> ⚠️ "全部解锁" 需要二次确认，清除全部锁定。

### /vary

在锁定范围内生成变体。用户说"出个变体""在锁定范围内变化""换个角度试试"触发。

**流程**：

```
1. 读取 state/lock-state.md → 提取所有 locked 字段（不可变）
2. 读取 state/variable-registry.md → 提取所有可变字段
3. 只修改可变字段，locked 字段保持不变
4. 生成变体产出
5. 标记为 derived（不写回主状态）
6. 输出变体 + 标注哪些字段变了、哪些字段锁定不变
```

**示例**：

```
用户："角色脸型定了，换个服装试试"
  ↓
lock-state：face_dna=locked, costume_core=unlocked
  ↓
/vary：保持 face_dna 不变 → 只改 costume_core → 生成变体
  ↓
输出：角色服装变体（derived），面部不变
```

**规则**：
- locked 字段不可变，变化自动限制在可变字段
- 产出标记 derived，不污染主状态
- 用户可以多轮 /vary，每轮独立
- 满意的变体可通过 /lock + /commit 写回

### /check

检查当前状态。用户说"/check""检查一下"触发。

**输出内容**：

```
【状态检查】

锁定状态：
  ✅ 角色「主角名」— 面部DNA 已锁定（2026-06-12 14:30）
  ✅ 场景「场景名」— 空间结构 已锁定（2026-06-12 14:30）
  — 风格 — 未锁定
  — 格式 — 未锁定（当前 draft）

写回状态：
  — 无已提交内容

资产用途：
  @1 character_sheet — consistency_asset ✅
  @2 scene_reference — consistency_asset ✅
  @3 full_board — display_asset（不可入视频 @图）⚠
```

---

## 三、写回规则

### 允许写回

| 场景 | 写回目标 | 条件 |
|------|---------|------|
| 用户说"锁定" | lock-state.md | 字段从 draft 提取 |
| 用户说"commit" / "确认采用" | variable-registry.md + projects/ | 字段必须已 locked |
| auto-repair 修格式 | draft（可覆盖） | 不改 locked/committed 字段 |
| `/style --apply` | variable-registry.md（style 部分） | /style 默认 derived，--apply 才写回 |

### 禁止写回

| 场景 | 原因 |
|------|------|
| 普通生成完成 | 默认 draft，不写回 |
| 多版本/发散生成 | 标记 derived，不污染主状态 |
| auto-repair 修角色 DNA | 需用户同意 |
| 未 locked 直接 commit | 阻断，提示先 lock |
| 冲突写回（同一字段两个来源） | 阻断，提示用户选择 |

---

## 四、冲突处理

如果 commit 时发现两个来源对同一字段有不同值：

```
检测到冲突：
  characters.protagonist.face_dna
    locked 值：[用户锁定的版本]
    当前生成值：[本轮新生成的版本]

处理：以 locked 值为准，丢弃新生成值。如需更新，请先 /unlock 该字段。
```

---

## 五、与 lock-state 的关系

| state-commit 操作 | lock-state 变化 | variable-registry 变化 |
|-------------------|----------------|----------------------|
| lock | 写入字段值 | 不变 |
| commit | 不变（保持 locked） | 写入 locked 字段值 |
| unlock | 清除字段（→ "—"） | 不变（保留上次 committed 值） |
| commit 后再生成 | 读取 locked 字段 | 作为不可变输入 |

---

## 联动

- ← 用户命令触发：`/lock` `/commit` `/unlock` `/check`
- ← 读取 `state/lock-state.md`（当前锁定状态）
- ← 读取 `state/variable-registry.md`（当前变量值）
- → 写入 `state/lock-state.md`（锁定/解锁操作）
- → 写入 `state/variable-registry.md`（commit 操作）
- → 写入 `state/state-commit-log.md`（操作日志）
- → 持久化到 `projects/<id>/state/`（commit 操作）
- → 被 `engines/command-gate.md` 读取（判断 write_policy）
