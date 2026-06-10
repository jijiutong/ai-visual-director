# AI Visual Director

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README.en.md"><b>🇬🇧 English</b></a>
</p>

> Turn a story into character sheets, scene references, storyboard boards, video prompts, and an executable video generation package.
> Paste text / Markdown / Obsidian projects → get production-ready prompts for AI image/video tools.

---

## What It Is

AI Visual Director is a Claude Code Skill. Paste a story → get a professional visual development plan. Read an Obsidian or Markdown project → batch-generate chapter video packages.

Core abilities:

- 🎬 **One-click story to video** — auto-intake story → plan assets → output a complete video package
- 🧭 **Source routing** — direct paste / Markdown / Obsidian / frontmatter / batch chapters
- 🎞️ **Story to storyboard** — auto-extract characters/scenes/conflict → full board with lighting/camera/color
- 👤 **Character design** — 6-module character sheets + DNA anchoring
- 🏯 **Scene design** — all-in-one reference + director-annotated mode
- 🎥 **Video prompts** — one complete prompt for Seedance / Runway / Kling
- 🎨 **50+ visual styles** — Eastern Fantasy / Wong Kar-wai / Cyberpunk / Ink Wash / 3D Animation…
- 🧩 **40 layout styles** — all-in-one boards / character boards / scene boards / storyboard boards
- 📱 **Multi-platform** — GPT Image / Midjourney primary; SD / DALL-E compatible

---

## 30-Second Start

```text
/create one-click Two swordsmen face off in a rainy temple. The master realizes his disciple has fallen to the dark side. 15s 7 shots
```

Output: story intake → shot budget → character anchors → scene anchors → storyboard → video prompt → execution package

---

## 6 Core Commands

| Command | Use | Example |
|---------|-----|---------|
| `/create` | One-click orchestration | `/create one-click [story] 15s 7shots` |
| `/source` | Obsidian / Markdown project intake | `/source read Obsidian [project]` |
| `/storyboard` | Core asset: storyboard board | `/storyboard [story]` |
| `/character` | Core asset: character sheet | `/character Name description` |
| `/scene` | Core asset: scene reference | `/scene Scene description` |
| `/video` | Video prompt / execution package | `/video prompt` |

`/style` and `/poster` remain available as compatibility entries for style actions and poster outputs.

Core asset relationship: character sheets lock **who**, scene references lock **where**, storyboards lock **how to shoot**, and `/create` orchestrates them into a complete video execution package.

## Common Actions

| Command | Use |
|---------|-----|
| `一键生成` | Auto best plan, full video execution package |
| `多版本` | A/B/C version comparison |
| `看全部` | Browse all styles & formats |
| `Shot X...` | Precise single-shot edit |
| `Change to X style but keep characters` | Style transfer |
| `Read from Obsidian` | Load project/chapters and enter batch workflow |
| `评分` | Prompt quality score + optimization |
| `检查连续性` | Check character/scene/timeline continuity |

---

## Examples

| # | Genre | Story | Style | Sample |
|---|-------|-------|-------|--------|
| 01 | Wuxia | Master vs disciple in rainy temple | Eastern Fantasy | `examples/video/01-rainy-temple-action.md` |
| 02 | Urban | Exes meet at late-night convenience store | Urban Mood | `examples/video/02-convenience-store-mood.md` |
| 03 | Sci-fi | Android girl in derelict spaceport | Dark Sci-fi | `examples/video/03-spaceport-countdown.md` |
| 04 | Cute | Blue desk pet delivers milk | 3D Animation | `examples/video/04-desk-pet-comedy.md` |

---

## Advanced Usage

| Topic | Document |
|-------|----------|
| All commands + API reference | [docs/commands.md](docs/commands.md) |
| User guide | [docs/user-guide.md](docs/user-guide.md) |
| Rules & constraints | [docs/rules.md](docs/rules.md) |
| Full skill docs | [docs/SKILL.md](docs/SKILL.md) |
| System architecture | [docs/system-architecture.md](docs/system-architecture.md) |
| Video workflow | [docs/video-workflow.md](docs/video-workflow.md) |
| Obsidian / batch / series | [docs/obsidian-workflow.md](docs/obsidian-workflow.md) |
| Platform prompt formats | [docs/platform-prompts.md](docs/platform-prompts.md) |
| More examples | [examples/](examples/) |

---

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| GPT Image | ✅ Primary | Long natural-language prompts, character sheets, full boards |
| Midjourney | ✅ Primary | Visual style art, posters, keyframes |
| SD / SDXL / SD3 | 📝 Template-compatible | Pos/neg prompts provided; local params user-adjusted |
| DALL-E 3 | 📝 Template-compatible | Natural-language image prompts |
| ComfyUI / IP-Adapter | 🔧 Community extension | No built-in local deployment; PRs welcome |

> This is a Prompt Workflow Skill, not a local image generation framework.
> Platform issues → [Open an Issue](https://github.com/jijiutong/ai-visual-director/issues)

---

## Tests

90 regression tests, all passing. See [CHANGELOG.md](CHANGELOG.md).

---

## License

MIT
