import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputDir = join(root, ".test-output", "smoke", "wuxia-temple");
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
  assert(existsSync(path(relativePath)), `Missing smoke output file: ${relativePath}`);
}

function assertIncludes(relativePath, expected) {
  const text = read(relativePath);
  assert(text.includes(expected), `${relativePath} should include: ${expected}`);
}

function parseAssetTypes() {
  const text = read("state/asset-map.md");
  return [...text.matchAll(/\| @图\d+ \| ([^|]+) \|/g)].map((match) => match[1].trim());
}

test("smoke output package exists with all required files", () => {
  const metadata = JSON.parse(read("metadata.json"));

  for (const file of metadata.expected_files) {
    assertFile(file);
  }
});

test("project registry contains resolved project, style, character, and scene variables", () => {
  for (const value of [
    "SMOKE-WUXIA-TEMPLE",
    "雨夜古寺",
    "武侠",
    "10s",
    "Seedance",
    "VS5 暴力美学",
    "墨渊",
    "无名剑客",
    "破旧佛像",
  ]) {
    assertIncludes("state/variable-registry.md", value);
  }
});

test("asset map contains the minimum video reference package", () => {
  const types = parseAssetTypes();

  for (const requiredType of ["scene_reference", "character_sheet", "storyboard_board", "keyframe", "end_frame"]) {
    assert(types.includes(requiredType), `asset-map should include ${requiredType}`);
  }
});

test("shot state has five shots and the dialogue is bound to the final shot", () => {
  const shotState = read("state/shot-state.md");
  const shotCount = (shotState.match(/shot_id: SH\d+/g) || []).length;

  assert(shotCount === 5, `shot-state should include 5 shots, found ${shotCount}`);
  assertIncludes("state/shot-state.md", "climax_shot: SH03");
  assertIncludes("state/dialogue-map.md", "SH05");
  assertIncludes("state/dialogue-map.md", "所有人感受。");
  assertIncludes("state/dialogue-map.md", "lip_sync");
});

test("prompts are generated for character, scene, storyboard, and video", () => {
  assertIncludes("prompts/character.md", "角色卡 Prompt");
  assertIncludes("prompts/character.md", "固定特征");
  assertIncludes("prompts/scene.md", "场景图 Prompt");
  assertIncludes("prompts/scene.md", "固定元素");
  assertIncludes("prompts/storyboard.md", "分镜图 Prompt");
  assertIncludes("prompts/storyboard.md", "SH03");
  assertIncludes("prompts/video.md", "视频 Prompt");
  assertIncludes("prompts/video.md", "state/asset-map.md 动态映射");
});

test("video prompt uses semantic asset references and dynamic mapping", () => {
  for (const semanticRef of [
    "@图(scene_reference)",
    "@图(character_sheet)",
    "@图(storyboard_board)",
    "@图(keyframe)",
    "@图(end_frame)",
  ]) {
    assertIncludes("prompts/video.md", semanticRef);
  }
});

test("quality report and render package mark the smoke run executable", () => {
  assertIncludes("qc/final-video-qc.md", "致命阻断项 | 0");
  assertIncludes("qc/final-video-qc.md", "asset-map 引用一致 | PASS");
  assertIncludes("render-package.md", "视频生成执行包");
  assertIncludes("render-package.md", "执行顺序");
  assertIncludes("render-package.md", "prompts/video.md");
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
  console.error(`\n${failed}/${tests.length} smoke tests failed`);
  process.exit(1);
}

console.log(`\n${tests.length}/${tests.length} smoke tests passed`);
