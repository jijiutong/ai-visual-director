# Test Strategy

This repository treats the skill as a production runtime, not only a prompt pack. Tests are split by risk level so local branches can validate the system before anything is merged or released.

## Current Runnable Tests

```bash
npm test
npm run test:unit
npm run test:integration
npm run smoke
npm run test:e2e
npm run smoke:obsidian
npm run test:e2e:obsidian
npm run smoke:incremental
npm run test:incremental
```

- `test:unit` checks static architecture contracts: command entries, runtime directories, state files, dynamic asset-map rules, project graph, and imitation library presence.
- `test:integration` simulates the one-click story-to-video route and verifies that story intake, shot budget, director state, asset planning, reference anchoring, video prompt assembly, RM, repair, QC, and packaging stay connected.
- `smoke` creates a deterministic local package at `.test-output/smoke/wuxia-temple/` without calling any AI model.
- `test:e2e` runs the smoke generator and verifies that the generated package contains project state, prompts, dynamic asset mappings, QC, and render instructions.
- `smoke:obsidian` scans `tests/obsidian-fixtures/novel/` and writes a deterministic three-chapter package to `.test-output/obsidian/novel/`.
- `test:e2e:obsidian` verifies frontmatter ingestion, shared character DNA, scene-note association, chapter continuity snapshots, dynamic asset maps, dialogue binding, QC, and render packages.
- `smoke:incremental` creates a deterministic edited copy of the story smoke package at `.test-output/incremental/wuxia-temple/`.
- `test:incremental` verifies single-shot edits stay inside a three-shot window and character DNA changes mark the correct asset for regeneration.

## Manual Test Specs

The older Markdown files in `tests/` remain useful as human regression scripts. They should be converted into runnable tests when a real CLI/runtime wrapper exists.

## Future Test Layers

1. **Contract tests**: parse `state/prompt-contract.md` and verify every template read path has a writer.
2. **Fixture tests**: run wuxia, sci-fi, horror, romance, and Obsidian chapter fixtures through the same route.
3. **Scene incremental tests**: change one scene property and verify `project-graph` returns only affected scene shots/assets.
4. **Golden prompt tests**: snapshot final prompt packages for stable stories and detect accidental prompt drift.
5. **Real CLI smoke tests**: when a CLI exists, run `/create` and `/source Obsidian` through the actual runtime instead of deterministic fixture generators.
6. **Release gate**: before publishing a skill package, run `npm test`, `npm run test:e2e`, `npm run test:e2e:obsidian`, `npm run test:incremental`, plus the manual checklist in `tests/skill-test-checklist.md`.
