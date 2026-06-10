import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputDir = join(root, ".test-output", "obsidian", "novel");
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function path(relativePath) {
  return join(outputDir, relativePath);
}

function read(relativePath) {
  return readFileSync(path(relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertFile(relativePath) {
  assert(existsSync(path(relativePath)), `Missing Obsidian smoke output file: ${relativePath}`);
}

function assertIncludes(relativePath, expected) {
  const text = read(relativePath);
  assert(text.includes(expected), `${relativePath} should include: ${expected}`);
}

function chapterDir(number) {
  return `chapters/chapter-${String(number).padStart(2, "0")}`;
}

const metadata = JSON.parse(read("metadata.json"));

test("obsidian scan discovers three chapters and shared notes", () => {
  assert(metadata.chapters.length === 3, `expected 3 chapters, found ${metadata.chapters.length}`);
  assertIncludes("scan-report.md", "characters.md");
  assertIncludes("scan-report.md", "settings.md");
  assertIncludes("scan-report.md", "第1章：雨夜古寺");
  assertIncludes("scan-report.md", "第2章：师门旧事");
  assertIncludes("scan-report.md", "第3章：入魔真相");
});

test("each chapter package contains required project, state, prompt, qc, and render files", () => {
  for (const chapter of metadata.chapters) {
    for (const file of metadata.expected_chapter_files) {
      assertFile(`${chapter.output_dir}/${file}`);
    }
  }
});

test("frontmatter values flow into every chapter registry", () => {
  for (const chapter of metadata.chapters) {
    const registry = `${chapter.output_dir}/state/variable-registry.md`;

    assertIncludes(registry, "剑道独尊");
    assertIncludes(registry, `| project.chapter | ${chapter.number} |`);
    assertIncludes(registry, "武侠");
    assertIncludes(registry, "Seedance");
    assertIncludes(registry, "VS7 东方玄幻武侠");
  }
});

test("shared character DNA is inherited across all chapters", () => {
  for (const chapter of metadata.chapters) {
    const registry = `${chapter.output_dir}/state/variable-registry.md`;
    const characterPrompt = `${chapter.output_dir}/prompts/character.md`;

    assertIncludes(registry, "墨渊");
    assertIncludes(registry, "顾长空");
    assertIncludes(registry, "黑发长至腰际");
    assertIncludes(registry, "魔化血色瞳孔");
    assertIncludes(characterPrompt, "佩剑破妄");
    assertIncludes(characterPrompt, "额头旧伤疤");
  }
});

test("scene notes are associated with the correct chapter scenes", () => {
  assertIncludes(`${chapterDir(1)}/state/variable-registry.md`, "雨夜古寺大殿");
  assertIncludes(`${chapterDir(1)}/prompts/scene.md`, "释迦牟尼金身");
  assertIncludes(`${chapterDir(2)}/state/variable-registry.md`, "剑宗山门（过去）");
  assertIncludes(`${chapterDir(2)}/prompts/scene.md`, "九十九级白玉台阶");
  assertIncludes(`${chapterDir(3)}/state/variable-registry.md`, "魔域裂隙");
  assertIncludes(`${chapterDir(3)}/prompts/scene.md`, "暗紫色脉动光");
});

test("chapter continuity snapshots form a chain", () => {
  assertIncludes("series-state.md", "CH01 -> CH02 -> CH03");
  assertIncludes(`${chapterDir(1)}/state/continuity-snapshot.md`, "墨渊拔剑冲向顾长空");
  assertIncludes(`${chapterDir(2)}/state/variable-registry.md`, "继承第1章尾帧");
  assertIncludes(`${chapterDir(3)}/state/variable-registry.md`, "继承第2章尾帧");
  assertIncludes(`${chapterDir(3)}/state/continuity-snapshot.md`, "师徒二人走向魔域裂隙");
});

test("each chapter video prompt reads dynamic assets and binds dialogue to SH05", () => {
  for (const chapter of metadata.chapters) {
    const base = chapter.output_dir;

    assertIncludes(`${base}/state/asset-map.md`, "scene_reference");
    assertIncludes(`${base}/state/asset-map.md`, "character_sheet");
    assertIncludes(`${base}/state/asset-map.md`, "storyboard_board");
    assertIncludes(`${base}/prompts/video.md`, "state/asset-map.md 动态映射");
    assertIncludes(`${base}/prompts/video.md`, "SH05 口型同步");
    assertIncludes(`${base}/state/dialogue-map.md`, "SH05");
    assertIncludes(`${base}/qc/final-video-qc.md`, "致命阻断项 | 0");
  }
});

let failed = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`not ok - ${name}`);
    console.error(`  ${error.message}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed}/${tests.length} Obsidian smoke tests failed`);
  process.exit(1);
}

console.log(`\n${tests.length}/${tests.length} Obsidian smoke tests passed`);
