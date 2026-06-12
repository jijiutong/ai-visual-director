import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const sourceDir = join(root, ".test-output", "smoke", "wuxia-temple");
const outputDir = join(root, ".test-output", "incremental", "wuxia-temple");

function read(relativePath) {
  return readFileSync(join(outputDir, relativePath), "utf8");
}

function write(relativePath, content) {
  const filePath = join(outputDir, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${content.trim()}\n`, "utf8");
}

function replaceInFile(relativePath, from, to) {
  const text = read(relativePath);
  if (!text.includes(from)) {
    throw new Error(`${relativePath} does not include expected text: ${from}`);
  }
  write(relativePath, text.replace(from, to));
}

function appendReport(relativePath, content) {
  write(relativePath, content);
}

rmSync(outputDir, { recursive: true, force: true });
cpSync(sourceDir, outputDir, { recursive: true });

replaceInFile(
  "state/shot-state.md",
  "    lighting: 剑光自发光",
  "    lighting: 剑光自发光 / darker, deeper shadows, lower exposure"
);

replaceInFile(
  "prompts/video.md",
  "帧3 拔剑4-6s：剑锋出鞘烛灭。CU|快速近推|85mm|冷白|剑光自发光|快切。",
  "帧3 拔剑4-6s：剑锋出鞘烛灭。CU|快速近推|85mm|冷白|剑光自发光，暗部更深|快切。"
);

appendReport(
  "reports/incremental-shot-SH03.md",
  `
# 增量更新报告：第3镜更暗

变更指令：第3镜再暗一点
变更类型：shot / 实体：shot:SH03

受影响范围：
  镜头：3 镜（SH02, SH03, SH04）
  实际更新：1 镜（SH03.lighting）
  跳过镜头：2 镜（SH01, SH05）
  资产：0 个

一致性重评：
  evaluation_mode: incremental
  affected_dimensions: Story RM
  reason: 单镜 lighting 变更只需要 3 镜窗口检查 end_state 继承
`
);

replaceInFile(
  "state/variable-registry.md",
  "冷峻脸型 / 黑色长发 / 深色剑客衣 / 旧铁长剑 / 左眉细疤",
  "冷峻脸型 / 黑色长发 / 深色剑客衣 / 旧铁长剑 / 左眉细疤加深"
);

replaceInFile(
  "state/asset-map.md",
  "| @图1 | character_sheet | 墨渊角色卡 | /prompts/character.md | 面部 / 发型 / 服装 / 武器 / 左眉细疤 |",
  "| @图1 | character_sheet | 墨渊角色卡 | /prompts/character.md | 面部 / 发型 / 服装 / 武器 / 左眉细疤加深 / ⚠ 待重新生成（角色DNA变更：疤痕） |"
);

replaceInFile(
  "prompts/character.md",
  "左眉细疤",
  "左眉细疤加深"
);

appendReport(
  "reports/incremental-character-C1.md",
  `
# 增量更新报告：墨渊疤痕加深

变更指令：墨渊左眉疤痕加深
变更类型：character / 实体：character:C1

受影响范围：
  镜头：5 镜（SH01, SH02, SH03, SH04, SH05）
  资产：1 个（@图1）
  台词：1 条（D01）

已更新 state/：
  variable-registry: characters.protagonist.immutable_features
  asset-map: @图1 标记为待重新生成

一致性重评：
  evaluation_mode: incremental
  affected_dimensions: Character RM
  skipped_dimensions: Scene RM, Style RM
`
);

write(
  "metadata.incremental.json",
  JSON.stringify(
    {
      generated_by: "scripts/smoke-incremental-update.mjs",
      source_package: ".test-output/smoke/wuxia-temple",
      changes: [
        {
          id: "shot-SH03-lighting",
          entity_type: "shot",
          entity_id: "SH03",
          affected_shots: ["SH02", "SH03", "SH04"],
          updated_shots: ["SH03"],
          skipped_shots: ["SH01", "SH05"],
          affected_assets: [],
          affected_dimensions: ["Story RM"],
        },
        {
          id: "character-C1-scar",
          entity_type: "character",
          entity_id: "C1",
          affected_shots: ["SH01", "SH02", "SH03", "SH04", "SH05"],
          affected_assets: ["@图1"],
          affected_dialogues: ["D01"],
          affected_dimensions: ["Character RM"],
        },
      ],
    },
    null,
    2
  )
);

console.log(`Incremental smoke package created: ${outputDir}`);
