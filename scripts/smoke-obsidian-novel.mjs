import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const root = process.cwd();
const fixtureDir = join(root, "tests", "obsidian-fixtures", "novel");
const outputDir = join(root, ".test-output", "obsidian", "novel");

function write(relativePath, content) {
  const filePath = join(outputDir, relativePath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${content.trim()}\n`, "utf8");
}

function readFixture(fileName) {
  return readFileSync(join(fixtureDir, fileName), "utf8");
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 3);
  if (end === -1) return {};

  const raw = text.slice(3, end).trim();
  const data = {};

  for (const line of raw.split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index === -1) continue;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();
    data[key] = value;
  }

  return data;
}

function bodyWithoutFrontmatter(text) {
  if (!text.startsWith("---")) return text.trim();
  const end = text.indexOf("\n---", 3);
  return end === -1 ? text.trim() : text.slice(end + 4).trim();
}

function extractSection(text, heading) {
  const pattern = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`);
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

function detectScene(sceneValue) {
  if (sceneValue.includes("魔域裂隙")) return "魔域裂隙";
  if (sceneValue.includes("剑宗山门")) return "剑宗山门（过去）";
  return sceneValue;
}

function shotRows(chapter) {
  const base = [
    ["SH01", "0-2s", "建立", "LS", "缓慢推近", chapter.scene],
    ["SH02", "2-4s", "关系", "MS", "横移压近", "墨渊与顾长空"],
    ["SH03", "4-6s", "转折", "CU", "快速近推", chapter.turningPoint],
    ["SH04", "6-8s", "爆发", "WS", "环绕半圈", chapter.climax],
    ["SH05", "8-10s", "收束", "ECU", "极慢推近", chapter.ending],
  ];

  return [
    "| 镜号 | 时间 | 阶段 | 景别 | 运镜 | 内容 |",
    "|------|------|------|------|------|------|",
    ...base.map((row) => `| ${row.join(" | ")} |`),
  ].join("\n");
}

function assetTable(chapter) {
  return [
    "| @编号 | type | name | source | locks |",
    "|-------|------|------|--------|-------|",
    `| @图0 | scene_reference | ${chapter.scene} 场景图 | /prompts/scene.md | 空间布局 / 主光方向 / 固定元素 |`,
    "| @图1 | character_sheet | 墨渊角色卡 | /prompts/character.md | 面部 / 长发 / 玄色长袍 / 破妄剑 / 魔化瞳孔 |",
    "| @图2 | character_sheet | 顾长空角色卡 | /prompts/character.md | 灰白鬓发 / 旧伤疤 / 蓑衣或素白长袍 / 青锋剑 |",
    `| @图3 | storyboard_board | 第${chapter.number}章五镜分镜图 | /prompts/storyboard.md | 镜头顺序 / 构图 / 运镜 |`,
    `| @图4 | end_frame | 第${chapter.number}章尾帧锚点 | /shot/SH05 | 尾帧状态 / 跨章衔接 |`,
  ].join("\n");
}

function writeChapter(chapter, previousChapter) {
  const dir = `chapters/chapter-${String(chapter.number).padStart(2, "0")}`;
  const inherited = previousChapter
    ? `继承第${previousChapter.number}章尾帧：${previousChapter.ending}`
    : "首章无前置快照";

  write(
    `${dir}/project.md`,
    `
# 第${chapter.number}章：${chapter.chapterTitle}

- **项目**：${chapter.title}
- **章节**：${chapter.number}
- **类型**：${chapter.genre}
- **风格**：${chapter.style}
- **场景**：${chapter.scene}
- **情绪**：${chapter.emotion}
- **输入文件**：${chapter.fileName}

## 镜头概览

${shotRows(chapter)}
`
  );

  write(
    `${dir}/state/variable-registry.md`,
    `
# 变量注册中心（Obsidian Smoke）

| 变量 | 值 | 写入方 |
|------|-----|--------|
| project.title | ${chapter.title} | obsidian-ingest |
| project.chapter | ${chapter.number} | obsidian-ingest |
| project.chapter_title | ${chapter.chapterTitle} | obsidian-ingest |
| project.genre | ${chapter.genre} | frontmatter-parser |
| project.duration | 10s | shot-budget |
| project.aspect_ratio | 16:9 | story-intake |
| project.target_platform | Seedance | story-intake |
| style.visual_style | VS7 东方玄幻武侠 | video-director |
| style_memory.locked | true | video-director |
| style_memory.director_reference | Zhang-Yimou | video-director |
| characters.protagonist.name | 墨渊 | obsidian-ingest |
| characters.protagonist.dna_id | C1 | video-director |
| characters.protagonist.immutable_features | 黑发长至腰际 / 玄色长袍 / 魔化血色瞳孔 / 佩剑破妄 | asset-plan |
| characters.antagonist.name | 顾长空 | obsidian-ingest |
| characters.antagonist.dna_id | C2 | video-director |
| characters.supporting | 苏长老 | obsidian-ingest |
| scene.primary.name | ${chapter.scene} | obsidian-ingest |
| scene.primary.scene_id | S${chapter.number} | video-director |
| scene.primary.fixed_elements | ${chapter.sceneDetails} | asset-plan |
| continuity.inherited_from_previous | ${inherited} | continuity-snapshot |
`
  );

  write(`${dir}/state/asset-map.md`, `# 资产映射表（Obsidian Smoke）\n\n${assetTable(chapter)}`);
  write(
    `${dir}/state/shot-state.md`,
    `
# 镜头状态表（Obsidian Smoke）

${shotRows(chapter)}

climax_shot: SH04

## end_state

- character_position: ${chapter.ending}
- emotion: ${chapter.emotion}
- scene: ${chapter.scene}
- prop_state: 破妄剑在手
- continuity_anchor: 第${chapter.number}章尾帧
`
  );
  write(
    `${dir}/state/dialogue-map.md`,
    `
# 台词映射（Obsidian Smoke）

| dialogue_id | shot_id | speaker | text | subtitle | lip_sync |
|-------------|---------|---------|------|----------|----------|
| D${chapter.number}01 | SH05 | 墨渊 | ${chapter.dialogue} | 底部中央 | true |
`
  );
  write(
    `${dir}/state/continuity-snapshot.md`,
    `
# 第${chapter.number}章连续性快照

- 章节：${chapter.chapterTitle}
- 尾帧：SH05
- 主角位置：${chapter.ending}
- 情绪状态：${chapter.emotion}
- 场景：${chapter.scene}
- 道具：破妄剑在手
- 下一章继承约束：角色DNA、破妄剑状态、师徒关系、魔种侵蚀状态必须继承
`
  );

  write(
    `${dir}/prompts/character.md`,
    `
# 角色卡 Prompt

读取 characters.md 中的墨渊和顾长空。
墨渊固定：黑发长至腰际、玄色长袍、血色瞳孔、佩剑破妄。
顾长空固定：灰白鬓发、额头旧伤疤、宗师气质、青锋剑。
`
  );
  write(
    `${dir}/prompts/scene.md`,
    `
# 场景图 Prompt

场景：${chapter.scene}
固定元素：${chapter.sceneDetails}
风格：东方玄幻武侠，电影级光影。
`
  );
  write(
    `${dir}/prompts/storyboard.md`,
    `
# 分镜图 Prompt

第${chapter.number}章《${chapter.chapterTitle}》五镜分镜。

${shotRows(chapter)}
`
  );
  write(
    `${dir}/prompts/video.md`,
    `
# 视频 Prompt

生成 10s 电影级视频，第${chapter.number}章《${chapter.chapterTitle}》。
参考图片按 state/asset-map.md 动态映射。
继承约束：${inherited}。
台词：SH05 口型同步「${chapter.dialogue}」。

${shotRows(chapter)}
`
  );
  write(
    `${dir}/qc/final-video-qc.md`,
    `
# 最终质检（Obsidian Smoke）

| 检查项 | 结果 |
|--------|------|
| frontmatter 已解析 | PASS |
| 角色笔记已关联 | PASS |
| 场景设定已关联 | PASS |
| continuity snapshot 已输出 | PASS |
| asset-map 引用一致 | PASS |
| 致命阻断项 | 0 |
`
  );
  write(
    `${dir}/render-package.md`,
    `
# 第${chapter.number}章视频生成执行包

- 项目：${chapter.title}
- 章节：${chapter.chapterTitle}
- 平台：Seedance
- 输出：角色卡、场景图、分镜图、视频 prompt、QC、连续性快照
`
  );
}

const files = readdirSync(fixtureDir)
  .filter((fileName) => /^\d+-.*\.md$/.test(fileName))
  .sort();

const charactersText = readFixture("characters.md");
const settingsText = readFixture("settings.md");
const characterNames = ["墨渊", "顾长空", "苏长老"].filter((name) => charactersText.includes(`## ${name}`));

const sceneDetails = {
  "雨夜古寺大殿": extractSection(settingsText, "雨夜古寺大殿").replace(/\s+/g, " ").slice(0, 140),
  "剑宗山门（过去）": extractSection(settingsText, "剑宗山门（过去）").replace(/\s+/g, " ").slice(0, 140),
  "魔域裂隙": extractSection(settingsText, "魔域裂隙").replace(/\s+/g, " ").slice(0, 140),
};

const chapters = files.map((fileName) => {
  const text = readFixture(fileName);
  const frontmatter = parseFrontmatter(text);
  const body = bodyWithoutFrontmatter(text);
  const number = Number(frontmatter.chapter);
  const scene = detectScene(frontmatter.scene ?? "未知场景");

  return {
    fileName,
    number,
    title: frontmatter.title ?? "未命名项目",
    chapterTitle: frontmatter.chapter_title ?? basename(fileName, ".md"),
    genre: frontmatter.genre ?? "剧情",
    style: frontmatter.style ?? "默认电影感",
    emotion: frontmatter.emotion ?? "标准",
    scene,
    sceneDetails: sceneDetails[scene] ?? frontmatter.scene ?? "未匹配场景设定",
    turningPoint:
      number === 1 ? "墨渊质问正道" : number === 2 ? "苏长老叛变" : "双生魔种真相揭开",
    climax:
      number === 1 ? "墨渊拔剑冲向师父" : number === 2 ? "墨渊转移魔种" : "墨渊走向暗道",
    ending:
      number === 1 ? "墨渊拔剑冲向顾长空" : number === 2 ? "墨渊把魔种引入自己体内" : "师徒二人走向魔域裂隙",
    dialogue:
      number === 1 ? "这世上根本就没有正道。" : number === 2 ? "我把魔种转移到自己体内。" : "这一剑，让我替自己砍。",
    wordCount: body.length,
  };
});

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

write(
  "scan-report.md",
  `
# Obsidian 项目扫描结果（Smoke）

- 路径：tests/obsidian-fixtures/novel
- 章节数：${chapters.length}
- 角色笔记：characters.md（${characterNames.join(" / ")}）
- 场景设定：settings.md
- 模式：全章批量，每章 10s / 5镜

## 章节

${chapters.map((chapter) => `- 第${chapter.number}章：${chapter.chapterTitle}（${chapter.fileName}，${chapter.wordCount}字）`).join("\n")}
`
);

chapters.forEach((chapter, index) => writeChapter(chapter, chapters[index - 1]));

write(
  "series-state.md",
  `
# 系列状态（Obsidian Smoke）

- 项目：${chapters[0]?.title ?? "未知"}
- 总章数：${chapters.length}
- style_memory.locked: true
- style_memory.visual_style: VS7 东方玄幻武侠
- character_dna.locked: 墨渊 / 顾长空
- continuity_chain: ${chapters.map((chapter) => `CH${String(chapter.number).padStart(2, "0")}`).join(" -> ")}
- final_anchor: ${chapters.at(-1)?.ending ?? "无"}
`
);

write(
  "metadata.json",
  JSON.stringify(
    {
      generated_by: "scripts/smoke-obsidian-novel.mjs",
      fixture: "tests/obsidian-fixtures/novel",
      chapters: chapters.map((chapter) => ({
        number: chapter.number,
        title: chapter.chapterTitle,
        scene: chapter.scene,
        output_dir: `chapters/chapter-${String(chapter.number).padStart(2, "0")}`,
      })),
      expected_chapter_files: [
        "project.md",
        "state/variable-registry.md",
        "state/asset-map.md",
        "state/shot-state.md",
        "state/dialogue-map.md",
        "state/continuity-snapshot.md",
        "prompts/character.md",
        "prompts/scene.md",
        "prompts/storyboard.md",
        "prompts/video.md",
        "qc/final-video-qc.md",
        "render-package.md",
      ],
    },
    null,
    2
  )
);

console.log(`Obsidian smoke package created: ${outputDir}`);
