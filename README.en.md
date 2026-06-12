# AI Visual Director

<p align="center">
  <b>Prompt Production OS</b> — The AI director that turns stories into films<br>
  <sub>53 Styles · 44 Layouts · 140+ Camera Techniques · 5 Video Platforms · Zero-Hallucination Governance</sub>
</p>

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README.en.md"><b>English</b></a>
</p>

---

A story goes in. Character sheets, scene references, full boards, storyboard frames, and video prompts come out.

Not an inspiration toy. A **production line** with command gates, format contracts, asset-purpose separation, state locking, and multi-dimensional QC.

```text
Story → Intake → Shot Budget → Director Decisions → Asset Planning → Consistency Anchoring → Platform Adaptation → QC → Execution Package
```

## Why

AI image and video tools are powerful. **Stability** is their Achilles' heel. Characters shift between frames. Scenes drift between shots. Prompts start hallucinating halfway through.

AI Visual Director encodes **the director's workflow as a constraint system**. Every prompt passes through gates, reads locked state, and conforms to a format contract before generation. Not to limit creativity — to lock it within executable bounds.

```text
Full capability preserved → Default authority constrained → Exploration explicitly triggered → State committed only after confirmation → Video assembled, never redesigned
```

## By the Numbers

| | |
|---|---|
| **53** visual styles | From Black-Gold Action to Ghibli to Glitch Art. Wong Kar-wai. Zhang Yimou. Wes Anderson. Nolan. |
| **44** layout systems | Cinematic full board. Sci-fi HUD console. Mythic four-shot sequence. Horizontal timeline. Zen minimal. |
| **140+** camera techniques | 15 shot sizes × 66 movements × 21 angles × 11 focal lengths × 10 aspect ratios × 8 special POVs |
| **19** numbering systems | VS/EC/CN/CP/ME/BL/EV/WT/MT/CR/PR/HE/TR/SD/SE/FX/MU/RS/DR — fully auto-populated |
| **5** video platforms | Seedance · Runway · Kling · Luma · Pika. Single storyboard, multi-platform output. |
| **8** character consistency methods | 6-panel sheet → 5-angle face → 12 expressions → costume/weapon details → IP-Adapter → DNA anchoring |
| **7** scene consistency methods | All-in-one reference → 9-grid → 720° panorama → blueprint → surround capture → diptych anchor |
| **36** transition techniques | Graphic match cut · J-Cut · L-Cut · Freeze frame · Split screen · Color desaturation… tail-frame → head-frame lock |
| **12** QC checkpoints | Scene / character / lighting / props / motion / framing / transitions / subtitles / materials / visual cleanliness / asset purpose / dialogue & sound |

## Install

```bash
npx ai-visual-director
```

Or:

```bash
curl -fsSL https://raw.githubusercontent.com/jijiutong/ai-visual-director/main/install.sh | sh
```

```bash
git clone https://github.com/jijiutong/ai-visual-director.git && cd ai-visual-director && sh install.sh
```

Restart Claude Code. Type `/create`.

## 30 Seconds

```text
/create Two swordsmen face off in a rain-drenched temple. The master realizes his disciple has fallen. 15s 7 shots
```

Default `/create standard`:

```text
Story intake → Character anchor → Scene anchor → Full board prompt → Video prompt → QC → Execution checklist
```

## Commands

| Command | Does | Doesn't |
|---------|------|---------|
| `/create` | One-click orchestration: fast / standard / full | Choose tier automatically |
| `/character` | Character sheets, 8 consistency methods | Touch sound, series, or multi-version |
| `/scene` | Scene references, 7 spatial anchoring methods | Rewrite character faces |
| `/storyboard` | Full boards, storyboard frames, shot design | Rewrite character DNA |
| `/video` | Video prompt + execution package, 5-platform output | Redesign. Assembling only. |
| `/source` | Obsidian / Markdown / paste / batch input | Anything beyond structuring |
| `/dialogue` | Dialogue script + rhythm notation + subtitle plan | Writes per-shot dialogue-map |
| `/sound` | Ambience / foley / music / reverb design | 16 SE × 20 FX × 12 MU × 8 RS |
| `/poster` | Movie posters, 10 styles × 3 aspect ratios | Enter video pipeline. marketing_asset. |
| `/style` | 53 style browser, fusion, migration, 14 director imitations | Write back. derived by default. |
| `/compact` | Token compression, context management, visual declutter | Redesign characters or story |

Governance: `/lock` `/commit` `/unlock` `/check`

## `/create` Tiers

| | fast | standard ⭐ | full |
|---|------|------------|------|
| Story intake | ✅ | ✅ | ✅ |
| Shot budget | ✅ | ✅ | ✅ |
| Character sheet | inline DNA | template | template |
| Scene reference | inline DNA | template | template |
| Full board | — | ✅ | ✅ |
| Video prompt | ✅ | ✅ | ✅ |
| Dialogue + sound | — | — | ✅ |
| QC report | — | ✅ | ✅ |
| Use case | Quick validation | Production | Full delivery |

## Governance

AI Visual Director is a four-layer constraint system:

| Layer | Policy | Role |
|-------|--------|------|
| **Stable** | always on | command-gate · format-contract · lock-state · prompt-qc · asset-qc |
| **Asset** | command-driven | character sheets · scene references · storyboards · video prompts · dialogue · sound · posters |
| **Enhanced** | project mode | camera · pacing · emotion curves · color narratives · motion physics · continuity |
| **Exploratory** | explicit trigger | multi-version · style fusion · director imitation · migration · series · mood slider |

```
draft (default, no write-back) → locked (confirmed, immutable) → committed (persisted)
```

## Architecture

| Directory | What |
|-----------|------|
| `engines/` | 40 decision engines — routing, gating, directing, planning, scoring, repair, packaging |
| `rules/` | 19 rule files — format contracts, numbering, QC, consistency, negatives, platform red lines |
| `templates/` | 12 prompt templates — full boards, character sheets, scene cards, storyboards, posters, dialogue, sound |
| `knowledge/` | 32 knowledge bases — camera, lighting, composition, expression, materials, sound, era, props |
| `sub-skills/` | 9 entry points — create / character / scene / storyboard / video / source / poster / style / compact |
| `state/` | 14 state files — variable registry, locks, asset map, shot state, dialogue/sound maps, dependency graph |
| `imitation/` | 14 director style libraries — Wong Kar-wai, Villeneuve, Nolan, Ghibli, Pixar, Zhang Yimou… |

## Platforms

| Image | Video |
|-------|-------|
| GPT Image 2 · Midjourney v6/7 | Seedance · Runway Gen-4 · Kling |
| DALL-E 3 · SDXL · SD3 | Luma · Pika |
| Flux · Ideogram · Tongyi · Recraft | ComfyUI / IP-Adapter (community) |

## License

MIT
