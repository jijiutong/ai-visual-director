import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
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

const coreCommands = ["/create", "/source", "/storyboard", "/character", "/scene", "/video"];
const compatibilityCommands = ["/style", "/poster"];
const requiredDirectories = [
  "sources",
  "engines",
  "knowledge",
  "rules",
  "templates",
  "platforms",
  "state",
  "projects",
  "imitation",
  "sub-skills",
  "docs",
  "examples",
];

test("core command contract is documented and has sub-skill entry files", () => {
  for (const command of coreCommands) {
    assertIncludes("SKILL.md", command);
    assertIncludes("docs/commands.md", command);
  }

  for (const name of ["create", "source", "storyboard", "character", "scene", "video"]) {
    assertFile(`sub-skills/${name}/SKILL.md`);
    assertIncludes("sub-skills/README.md", `/${name}`);
  }
});

test("compatibility commands remain documented and routable", () => {
  for (const command of compatibilityCommands) {
    assertIncludes("SKILL.md", command);
    assertIncludes("docs/commands.md", command);
    assertFile(`sub-skills/${command.slice(1)}/SKILL.md`);
  }

  assertMatches("engines/task-router.md", /风格|style|\/style/);
  assertMatches("engines/task-router.md", /海报|poster|\/poster/);
});

test("create orchestrates core assets without replacing them", () => {
  assertIncludes("SKILL.md", "`/create` 不替代 `/storyboard`、`/character`、`/scene`");
  assertIncludes("docs/commands.md", "`/create` 不替代三大核心资产入口");
  assertIncludes("sub-skills/create/SKILL.md", "它不替代 `/storyboard`、`/character`、`/scene`");

  for (const phrase of ["核心资产：故事板", "核心资产：角色卡", "核心资产：场景图"]) {
    assertIncludes("SKILL.md", phrase);
    assertIncludes("docs/commands.md", phrase);
  }
});

test("main route includes project, state, graph, RM, repair, and package stages", () => {
  const requiredStages = [
    "project-manager",
    "state/variable-registry",
    "state/asset-map",
    "project-graph",
    "consistency-engine",
    "prompt-scorer",
    "auto-repair",
    "final-video-qc",
    "render-package",
  ];

  for (const stage of requiredStages) {
    assertIncludes("engines/task-router.md", stage);
  }
});

test("base capability subroutes write state and asset-map before QC", () => {
  const router = read("engines/task-router.md");

  for (const section of ["/character", "/scene", "/storyboard"]) {
    assert(router.includes(section), `task-router should define ${section} subroute`);
  }

  assertMatches("engines/task-router.md", /\/character[\s\S]*state\/variable-registry[\s\S]*state\/asset-map[\s\S]*final-video-qc/);
  assertMatches("engines/task-router.md", /\/scene[\s\S]*state\/variable-registry[\s\S]*state\/asset-map[\s\S]*final-video-qc/);
  assertMatches("engines/task-router.md", /\/storyboard[\s\S]*state\/shot-state[\s\S]*state\/asset-map[\s\S]*final-video-qc/);
});

test("state contract files exist and video assembly reads dynamic asset mappings", () => {
  for (const file of [
    "state/variable-registry.md",
    "state/asset-map.md",
    "state/shot-state.md",
    "state/dialogue-map.md",
    "state/prompt-contract.md",
    "state/project-graph.md",
  ]) {
    assertFile(file);
  }

  assertIncludes("engines/video-prompt-assembly.md", "state/asset-map.md");
  assertIncludes("engines/video-prompt-assembly.md", "动态读取");
  assertIncludes("state/asset-map.md", "由 `reference-anchor`");
  assertIncludes("state/prompt-contract.md", "video-prompt-assembly");
});

test("project graph and incremental update capabilities are present", () => {
  for (const file of [
    "projects/README.md",
    "projects/.template/project.md",
    "engines/project-manager.md",
    "engines/project-graph.md",
    "engines/incremental-update.md",
    "state/project-graph.md",
  ]) {
    assertFile(file);
  }

  assertIncludes("engines/task-router.md", "incremental-update");
  assertIncludes("engines/task-router.md", "project-manager");
});

test("imitation library is discoverable", () => {
  for (const file of [
    "imitation/wong-kar-wai.md",
    "imitation/villeneuve.md",
    "imitation/nolan.md",
    "imitation/ghibli.md",
    "imitation/pixar.md",
    "imitation/zhang-yimou.md",
  ]) {
    assertFile(file);
  }

  assertMatches("engines/style-migration.md", /imitation|模仿|导演/);
});

test("README install and release package include all runtime directories", () => {
  for (const dir of requiredDirectories) {
    assertIncludes("README.md", `\`${dir}/\``);
    assertIncludes("package.json", `"${dir}/"`);
  }

  assertIncludes("README.md", "`SKILL.md`");
  assertIncludes("package.json", "\"SKILL.md\"");
  assertIncludes("README.md", "`.agents/`");
  assertIncludes("README.md", "`.claude/`");
});

test("install docs expose npx and sh paths", () => {
  assertIncludes("README.md", "npx ai-visual-director");
  assertIncludes("README.md", "install.sh | sh");
  assertIncludes("README.en.md", "npx ai-visual-director");
  assertIncludes("README.en.md", "install.sh | sh");
  assertIncludes("package.json", "\"bin\"");
  assertIncludes("package.json", "\"ai-visual-director\"");
});

test("node installer copies every runtime entry", () => {
  const temp = mkdtempSync(join(tmpdir(), "avd-install-"));

  try {
    execFileSync("node", ["scripts/install.mjs", "--skills-dir", temp], {
      cwd: root,
      stdio: "pipe",
    });

    for (const entry of ["SKILL.md", ...requiredDirectories]) {
      assert(existsSync(join(temp, "ai-visual-director", entry)), `Installer should copy ${entry}`);
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
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
  console.error(`\n${failed}/${tests.length} tests failed`);
  process.exit(1);
}

console.log(`\n${tests.length}/${tests.length} tests passed`);
