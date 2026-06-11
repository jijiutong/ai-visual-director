import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outputDir = join(root, ".test-output", "incremental", "wuxia-temple");
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
  assert(existsSync(path(relativePath)), `Missing incremental output file: ${relativePath}`);
}

function assertIncludes(relativePath, expected) {
  const text = read(relativePath);
  assert(text.includes(expected), `${relativePath} should include: ${expected}`);
}

const metadata = JSON.parse(read("metadata.incremental.json"));

test("incremental package preserves the original executable project package", () => {
  for (const file of [
    "project.md",
    "state/variable-registry.md",
    "state/asset-map.md",
    "state/shot-state.md",
    "state/dialogue-map.md",
    "prompts/character.md",
    "prompts/scene.md",
    "prompts/storyboard.md",
    "prompts/video.md",
    "qc/final-video-qc.md",
    "render-package.md",
  ]) {
    assertFile(file);
  }
});

test("single-shot lighting change is limited to the SH03 three-shot window", () => {
  const change = metadata.changes.find((item) => item.id === "shot-SH03-lighting");

  assert(change, "missing SH03 lighting change metadata");
  assert(JSON.stringify(change.affected_shots) === JSON.stringify(["SH02", "SH03", "SH04"]), "SH03 lighting should affect SH02-SH04 window");
  assert(JSON.stringify(change.updated_shots) === JSON.stringify(["SH03"]), "only SH03 should be directly updated");
  assert(JSON.stringify(change.skipped_shots) === JSON.stringify(["SH01", "SH05"]), "SH01 and SH05 should be skipped");
  assertIncludes("reports/incremental-shot-SH03.md", "evaluation_mode: incremental");
  assertIncludes("reports/incremental-shot-SH03.md", "affected_dimensions: Story RM");
});

test("single-shot lighting update changes SH03 prompt and shot-state only", () => {
  assertIncludes("state/shot-state.md", "lighting: 剑光自发光 / darker, deeper shadows, lower exposure");
  assertIncludes("prompts/video.md", "剑光自发光，暗部更深");
  assertIncludes("reports/incremental-shot-SH03.md", "实际更新：1 镜（SH03.lighting）");
});

test("character DNA change marks character state and character asset for regeneration", () => {
  const change = metadata.changes.find((item) => item.id === "character-C1-scar");

  assert(change, "missing C1 character change metadata");
  assert(change.affected_assets.includes("@图1"), "C1 scar change should affect @图1");
  assert(change.affected_dimensions.includes("Character RM"), "C1 scar change should require Character RM");
  assertIncludes("state/variable-registry.md", "左眉细疤加深");
  assertIncludes("state/asset-map.md", "@图1");
  assertIncludes("state/asset-map.md", "待重新生成（角色DNA变更：疤痕）");
  assertIncludes("prompts/character.md", "左眉细疤加深");
});

test("incremental character report skips unrelated RM dimensions", () => {
  assertIncludes("reports/incremental-character-C1.md", "evaluation_mode: incremental");
  assertIncludes("reports/incremental-character-C1.md", "affected_dimensions: Character RM");
  assertIncludes("reports/incremental-character-C1.md", "skipped_dimensions: Scene RM, Style RM");
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
  console.error(`\n${failed}/${tests.length} incremental tests failed`);
  process.exit(1);
}

console.log(`\n${tests.length}/${tests.length} incremental tests passed`);
