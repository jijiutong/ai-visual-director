import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertFile(path) {
  assert(existsSync(join(root, path)), `Missing required file: ${path}`);
}

function assertIncludes(path, expected) {
  const text = read(path);
  assert(text.includes(expected), `${path} should include: ${expected}`);
}

function assertMatches(path, pattern) {
  const text = read(path);
  assert(pattern.test(text), `${path} should match: ${pattern}`);
}

function assertOrder(path, orderedTerms) {
  const text = read(path);
  let cursor = -1;

  for (const term of orderedTerms) {
    const next = text.indexOf(term, cursor + 1);
    assert(next > cursor, `${path} should include "${term}" after previous stage`);
    cursor = next;
  }
}

const sampleStory = {
  text: "雨夜古寺，两名剑客在佛像前对峙。墨渊拔剑，烛火熄灭，他低声说：所有人感受。",
  expectedGenre: "武侠",
  expectedDuration: "10s",
  expectedMaxRoles: "2",
  expectedPlatform: "Seedance",
};

test("short story can enter the one-click route without a blocking question", () => {
  assert(sampleStory.text.length <= 100, "fixture should exercise the short-story fast path");

  assertIncludes("engines/task-router.md", "SHORT_INPUT_THRESHOLD_CHARS");
  assertIncludes("engines/task-router.md", "零确认");
  assertIncludes("engines/task-router.md", "一键生成最快路径");
  assertIncludes("engines/task-router.md", "雨夜古寺，两名剑客在佛像前对峙");
});

test("main story-to-video route keeps the required stage order", () => {
  assertOrder("engines/task-router.md", [
    "project-manager",
    "sources/",
    "story-intake",
    "shot-budget",
    "video-director",
    "asset-plan",
    "reference-anchor",
    "motion-physics",
    "project-graph",
    "video-prompt-assembly",
    "consistency-engine",
    "prompt-scorer",
    "auto-repair",
    "final-video-qc",
    "render-package",
  ]);
});

test("story intake and shot budget can classify the sample story", () => {
  assertIncludes("engines/story-intake.md", "剑/刀/复仇/恩怨 | 武侠");
  assertIncludes("engines/story-intake.md", "api-config.template.env");
  assertIncludes("engines/story-intake.md", "VIDEO_PLATFORM_DEFAULT");
  assertIncludes("engines/story-intake.md", "DEFAULT_ASPECT_RATIO");
  assertIncludes("engines/shot-budget.md", "角色 ≤ 2（10-15s）");
  assertIncludes("engines/shot-budget.md", "10s（3-7镜）");

  assert(sampleStory.expectedGenre === "武侠", "fixture should map to wuxia");
  assert(sampleStory.expectedDuration === "10s", "fixture should map to short video duration");
  assert(sampleStory.expectedMaxRoles === "2", "fixture should stay inside short-video role budget");
});

test("director stage writes shot, style, and dialogue state needed downstream", () => {
  assertIncludes("engines/video-director.md", "写入 `state/variable-registry.md`");
  assertIncludes("engines/video-director.md", "写入 `state/shot-state.md`");
  assertIncludes("engines/video-director.md", "写入 `state/dialogue-map.md`");
  assertIncludes("state/shot-state.md", "shot_id");
  assertIncludes("state/dialogue-map.md", "speaker");
  assertIncludes("state/dialogue-map.md", "lip_sync");
});

test("asset planning produces the minimum references for character, scene, storyboard, and video", () => {
  assertIncludes("engines/asset-plan.md", "角色卡");
  assertIncludes("engines/asset-plan.md", "场景全景");
  assertIncludes("engines/asset-plan.md", "首帧");
  assertIncludes("engines/asset-plan.md", "尾帧");
  assertIncludes("engines/asset-plan.md", "不满足 → 禁止输出视频 prompt");
});

test("reference anchor dynamically maps platform assets for video prompt assembly", () => {
  assertIncludes("engines/reference-anchor.md", sampleStory.expectedPlatform);
  assertIncludes("engines/reference-anchor.md", "写入 `state/asset-map.md`");
  assertIncludes("engines/reference-anchor.md", "最终 @编号从 0 开始连续编号");
  assertIncludes("state/asset-map.md", "scene_reference");
  assertIncludes("state/asset-map.md", "character_sheet");
  assertIncludes("state/asset-map.md", "storyboard_board");
  assertIncludes("state/asset-map.md", "keyframe");
  assertIncludes("state/asset-map.md", "end_frame");
});

test("video prompt assembly reads state instead of hardcoding changing references", () => {
  assertIncludes("engines/video-prompt-assembly.md", "读取 `state/asset-map.md`");
  assertIncludes("engines/video-prompt-assembly.md", "读取 `state/shot-state.md`");
  assertIncludes("engines/video-prompt-assembly.md", "读取 `state/dialogue-map.md`");
  assertIncludes("engines/video-prompt-assembly.md", "实际 @编号→用途映射以 `state/asset-map.md` 为准");
  assertIncludes("engines/video-prompt-assembly.md", "台词：帧 N 口型同步");
});

test("template contract covers the outputs required by one-click generation", () => {
  for (const file of [
    "templates/full-board.md",
    "templates/quick-board.md",
    "templates/character-sheet.md",
    "templates/scene-card.md",
    "engines/video-prompt-assembly.md",
  ]) {
    assertFile(file);
  }

  for (const output of [
    "prompt.full_board",
    "prompt.storyboard",
    "prompt.character_sheet",
    "prompt.scene_card",
    "prompt.video",
  ]) {
    assertIncludes("state/prompt-contract.md", output);
  }
});

test("quality and repair stages can block or repair bad output before packaging", () => {
  assertMatches("engines/consistency-engine.md", /RM|评分|阻断/);
  assertMatches("engines/prompt-scorer.md", /评分|阈值/);
  assertMatches("engines/auto-repair.md", /修复|最多3轮/);
  assertMatches("rules/final-video-qc.md", /asset-map|引用|致命|阻断/);
  assertIncludes("engines/render-package.md", "执行清单");
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
  console.error(`\n${failed}/${tests.length} integration tests failed`);
  process.exit(1);
}

console.log(`\n${tests.length}/${tests.length} integration tests passed`);
