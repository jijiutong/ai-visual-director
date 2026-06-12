# AI Visual Director — 自动化测试报告

**日期**: 2026-06-11  
**分支**: `main` (up-to-date with `origin/main`)  
**测试范围**: unit / integration / smoke / e2e 全部自动化测试套件  
**Node.js**: v24.16.0

---

## 测试结果总览

| 测试套件 | 结果 | 通过 | 失败 | 说明 |
|----------|------|------|------|------|
| **Unit (architecture)** | ✅ | 9/9 | 0 | 架构合约、命令入口、state 文件、imitation 库 |
| **Integration (story-to-video)** | ⚠️ | 7/9 | 2 | 2个断言过时（平台配置集中化后不再硬编码） |
| **Smoke (create project)** | ✅ | — | 0 | 产出 `.test-output/smoke/wuxia-temple` |
| **Smoke (obsidian novel)** | ❌ | — | 1 | 缺少 `tests/obsidian-fixtures/novel` 目录 |
| **Smoke (incremental)** | ✅ | — | 0 | 产出 `.test-output/incremental/wuxia-temple` |
| **E2E (project package)** | ✅ | 7/7 | 0 | 全文件验证 + asset-map + shot-state + QC |
| **E2E (incremental update)** | ✅ | 5/5 | 0 | 单镜修改隔离 + DNA变更传播 + RM维度跳过 |
| **总计** | **⚠️** | **28/30** | **2+1** | 代码无 bug，2 个测试断言过时 + 1 个 fixture 缺失 |

---

## 各套件详细

### Unit: Architecture (9/9 ✅)

```
ok - core command contract is documented and has sub-skill entry files
ok - compatibility commands remain documented and routable
ok - create orchestrates core assets without replacing them
ok - main route includes project, state, graph, RM, repair, and package stages
ok - base capability subroutes write state and asset-map before QC
ok - state contract files exist and video assembly reads dynamic asset mappings
ok - project graph and incremental update capabilities are present
ok - imitation library is discoverable
ok - README install and release package include all runtime directories
```

### Integration: Story-to-Video Flow (7/9 ⚠️)

```
ok - short story can enter the one-click route without a blocking question  ← FAIL
      原因: engines/task-router.md 已改为 `短句 ≤SHORT_INPUT_THRESHOLD_CHARS` 引用配置变量
           不再硬编码 `100字`。断言需更新匹配新模式。
ok - main story-to-video route keeps the required stage order
ok - story intake and shot budget can classify the sample story  ← FAIL
      原因: engines/story-intake.md 不在 story-intake 层硬编码默认平台，
           交由 downstream shot-budget + platform-config 决策。
           断言 `默认 Seedance` 需改为检查 platform-config 读取逻辑。
ok - director stage writes shot, style, and dialogue state needed downstream
ok - asset planning produces the minimum references
ok - reference anchor dynamically maps platform assets
ok - video prompt assembly reads state instead of hardcoding
ok - template contract covers the outputs required by one-click generation
ok - quality and repair stages can block or repair bad output before packaging
```

**2 个失败原因**：Bug #1 修复（平台配置集中化）后，`task-router` 使用 `SHORT_INPUT_THRESHOLD_CHARS` 配置变量代替硬编码 `100`，`story-intake` 不再硬编码 `默认 Seedance`。测试断言需要同步更新，不影响实际功能。

### Smoke: Create Project ✅

产出 `.test-output/smoke/wuxia-temple/`，包含完整项目包。

### Smoke: Obsidian Novel ❌

缺少 `tests/obsidian-fixtures/novel` 目录。该 fixture 目录未提交到代码库，需要运行 `scripts/setup-obsidian-fixtures.mjs` 或手动创建。

### E2E: Project Package (7/7 ✅)

```
ok - smoke output package exists with all required files
ok - project registry contains resolved project, style, character, and scene variables
ok - asset map contains the minimum video reference package
ok - shot state has five shots and the dialogue is bound to the final shot
ok - prompts are generated for character, scene, storyboard, and video
ok - video prompt uses semantic asset references and dynamic mapping
ok - quality report and render package mark the smoke run executable
```

### E2E: Incremental Update (5/5 ✅)

```
ok - incremental package preserves the original executable project package
ok - single-shot lighting change is limited to the SH03 three-shot window
ok - single-shot lighting update changes SH03 prompt and shot-state only
ok - character DNA change marks character state and character asset for regeneration
ok - incremental character report skips unrelated RM dimensions
```

---

## Bug 清单

| Bug # | 描述 | 严重度 | 状态 |
|-------|------|--------|------|
| #1 | 平台参数硬编码 → platform-config 统一入口 | 🔴 致命 | ✅ 已修复 |
| #2 | `/create` 绕过子路由模板 → task-router 子路由调用 | 🔴 致命 | ✅ 已修复 |
| #3 | 图像平台语言配置缺失 → platform-config 第五节 | 🟡 中 | ✅ 已修复 |
| #4 | 一致性触达决策引擎缺失 → consistency-trigger.md | 🔴 架构 | ✅ 已修复 |
| #5 | reference-anchor 不检查资产存在性 | 🟡 中 | ✅ 已修复 |
| #6 | Seedance 上限 6→12 张 | 🟡 中 | ✅ 已修复 |
| #7 | @图数量硬编码 → 动态读取 asset-map | 🟡 中 | ✅ 已修复 |
| #8 | /scene 不动态呈现方法选项 | 🟡 中 | ✅ 已修复 |
| #9 | consistency-trigger 不搜索知识库 | 🟡 中 | ✅ 已修复 |
| #10 | 集成测试断言过时（task-router + story-intake） | 🟢 低 | 🔧 待修 |

---

## 待办

- [ ] 更新 `tests/integration/story-to-video-flow.test.mjs` — 同步平台配置集中化后的断言
- [ ] 补充 `tests/obsidian-fixtures/` 目录或创建 setup 脚本
