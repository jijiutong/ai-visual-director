# Projects

项目持久化目录。每个项目存储在 `projects/<PROJ-ID>/` 下，由 `engines/project-manager.md` 管理。

## 目录结构

```
projects/
├── .template/           ← 新项目模板
│   ├── project.md       ← 项目元信息模板
│   └── state/           ← state/ 模板文件（复制自 ../state/）
├── PROJ-YYYYMMDD-XXXX/  ← 具体项目
│   ├── project.md       ← 项目元信息
│   ├── state/           ← 持久化的状态文件
│   │   ├── variable-registry.md
│   │   ├── asset-map.md
│   │   ├── shot-state.md
│   │   ├── dialogue-map.md
│   │   ├── prompt-contract.md
│   │   ├── project-graph.md
│   │   ├── continuity-state.md
│   │   └── continuity-snapshot.md
│   └── assets/          ← 生成的资产（如有）
└── README.md            ← 本文件
```

## 项目 ID 格式

```
PROJ-YYYYMMDD-XXXX
     │         │
     │         └─ 4 位随机码（A-Z, 0-9）
     └─ 创建日期
```

## 操作命令

| 命令 | 行为 |
|------|------|
| "新建项目" | `project-manager init` → 创建 PROJ-ID 目录 + 复制 state/ 模板 |
| "保存项目" | `project-manager save` → 当前 state/ → projects/<id>/state/ |
| "我的项目" | `project-manager list` → 列出所有项目 |
| "继续项目 <id>" | `project-manager load` → 恢复 state/ 到会话 |
| "删除项目 <id>" | `project-manager delete` → 删除项目目录 |
