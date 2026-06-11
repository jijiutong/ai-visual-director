#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const skillName = "ai-visual-director";
const runtimeEntries = [
  "SKILL.md",
  "api-config.template.env",
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

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Usage: npx ${skillName} [--skills-dir <dir>] [--target <dir>] [--dry-run]

Options:
  --skills-dir <dir>  Parent skills directory. Default: ~/.claude/skills
  --target <dir>      Exact destination directory. Overrides --skills-dir
  --dry-run           Print what would be installed without copying
  -h, --help          Show this help

Environment:
  CLAUDE_SKILLS_DIR or AI_VISUAL_DIRECTOR_SKILLS_DIR can set the parent skills directory.`);
}

function parseArgs(argv) {
  const options = { dryRun: false };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--skills-dir") {
      i += 1;
      if (!argv[i]) throw new Error("--skills-dir requires a value");
      options.skillsDir = argv[i];
    } else if (arg === "--target") {
      i += 1;
      if (!argv[i]) throw new Error("--target requires a value");
      options.target = argv[i];
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function expandHome(path) {
  if (path === "~") return process.env.HOME || path;
  if (path.startsWith("~/")) return join(process.env.HOME || "~", path.slice(2));
  return path;
}

function defaultSkillsDir() {
  return (
    process.env.CLAUDE_SKILLS_DIR ||
    process.env.AI_VISUAL_DIRECTOR_SKILLS_DIR ||
    join(process.env.HOME || ".", ".claude", "skills")
  );
}

function destinationFor(options) {
  if (options.target) return resolve(expandHome(options.target));
  return resolve(expandHome(options.skillsDir || defaultSkillsDir()), skillName);
}

function assertPackageRoot() {
  for (const entry of runtimeEntries) {
    const path = join(root, entry);
    if (!existsSync(path)) {
      throw new Error(`Missing runtime entry in package: ${entry}`);
    }
  }
}

function install(options) {
  assertPackageRoot();

  const target = destinationFor(options);
  if (options.dryRun) {
    console.log(`Would install ${skillName} to ${target}`);
    for (const entry of runtimeEntries) console.log(`- ${entry}`);
    return;
  }

  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });

  for (const entry of runtimeEntries) {
    cpSync(join(root, entry), join(target, entry), {
      recursive: true,
      force: true,
      errorOnExist: false,
    });
  }

  console.log(`Installed ${skillName} to ${target}`);
  console.log("Restart Claude Code, then use /create to start.");
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
  } else {
    install(options);
  }
} catch (error) {
  console.error(`Install failed: ${error.message}`);
  process.exit(1);
}
