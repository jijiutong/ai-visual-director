# AI Visual Director

<p align="center">
  <a href="./README.md">中文</a> · <a href="./README.en.md"><b>🇬🇧 English</b></a>
</p>

> From story to visuals — a complete production pipeline

AI Visual Director transforms any story, novel, or script into cinematic visual development proposals. 52 core capabilities, 51 reference files, covering the complete workflow from **input → analysis → generation → anchoring → continuation → bridging → export → video**.

Supports 9 image platforms + 5 video platforms with direct API calls, one-click Obsidian Vault reading.

---

## Capability Matrix

![AI Visual Director Capability Matrix](examples/capability-matrix.png)

---

## `/xxx` Commands (6 Sub-skills)

Don't want to remember trigger words? Use `/` commands directly:

| Command | Function | Example |
|---------|----------|---------|
| `/storyboard` | Quick storyboard | `/storyboard Rainy night, a person on an overpass` |
| `/character` | Character design (8 consistency methods) | `/character Sword master, white hair, green robe` |
| `/scene` | Scene design (7 scene-locking methods) | `/scene Cyberpunk underground city` |
| `/poster` | Movie poster (vertical/horizontal) | `/poster Sword Tomb Duel` |
| `/video` | AI video full pipeline | `/video 15s storyboard of sword splitting the sky` |
| `/style` | Style browser/fusion/migration | `/style Wong Kar-wai + Ghibli` |

Install the full skill to use all `/storyboard`, `/character`, `/scene`, `/poster`, `/video`, `/style` commands.
Or install individual sub-skills: copy `sub-skills/<name>/SKILL.md` to `~/.claude/skills/<name>/SKILL.md`.

---

## Quick Start

### Default Mode (recommend first, you choose, then generate)

```
You: [paste your story]
AI: [Smart Recommendation] Based on your story, here are the best matches...
     Recommend 1 (best match): Style X + Format Y — reason
     Recommend 2 (backup):     Style A + Format B — reason
     Recommend 3 (different):  Style C + Format D — reason
You: 1          ← Reply with number to confirm, or say "全来" for 4 at once
AI: [Full prompt]
```

### Quick Mode (skip recommendations, output directly)

| Command | Effect |
|---------|--------|
| `一键生成` (one-click generate) | Full pipeline auto, no options shown |
| `一键全平台` (one-click all platforms) | Full pipeline + GPT/MJ/SD outputs |
| `一键多版本` (one-click multi-version) | Full pipeline + A/B/C comparison |
| `一键全来` (one-click everything) | 3 styles × 4 formats × 3 platforms = 36 prompts |
| `全来` | 4 most relevant format prompts |

---

## Examples

### Example 1: Eastern Fantasy · Enemy Duel

```
You: In a cultivation world, two sword cultivators duel at a sword tomb, they were once master and apprentice
AI: [Smart Recommendation]
  Recommend 1: Style 3 (Eastern Fantasy) + Format 1 (Full Board, with master-apprentice relationship bonus)
  Recommend 2: Style 32 (Chinese Ink) + Format 5 (Poster)

You: 1
AI: [Full board prompt with master-apprentice composition bonus]
```

![Enemy Duel - Full Board](examples/enemy-duel-board.png)
> Enemy Duel · Eastern Fantasy · Full Board · R3 Master-Apprentice Relationship

---

### Example 2: Urban Scene · Rain Night Walker

```
You: Rainy night, a person walking alone on a city overpass, very sorrowful
AI: [Smart Recommendation]
  Recommend 1 (best match): Style 5 (Urban Emotion Film) + Format 4 (Scene Concept Card)
  Recommend 2 (backup): Style 27 (Wong Kar-wai) + Format 7 (Mood Board)

You: 1
AI: [Full scene concept card prompt]
```

![Rain Night Walker - Scene Concept Card](examples/rain-night-scene.png)
> Rain Night Walker · Urban Emotion Film Board · Scene Concept Card

---

### Example 3: BL · Office Ambiguity

```
You: Office setting, two male leads, more ambiguous tension
AI: [Smart Recommendation]
  Recommend 1: Style 5 (Urban Emotion) + R14 (Ambiguous Pull) + Format 4 (Scene Concept Card)
  Recommend 2: Style 27 (Wong Kar-wai) + Format 5 (Poster)

You: 1
AI: [Ambiguous scene prompt with R14 relationship bonus]
```

![Office Ambiguity](examples/office-romance.png)
> Office Ambiguity · Urban Emotion · R14 Ambiguous Pull Relationship

---

### Example 4: Style Fusion · Wong Kar-wai × Ghibli

```
You: Transform the rain night scene into Wong Kar-wai × Ghibli fusion style
AI: [Fusion style prompt, 60% Wong Kar-wai neon + 40% Ghibli watercolor]
```

![Wong Kar-wai × Ghibli](examples/fusion-style.png)
> Style Fusion · Wong Kar-wai Neon × Ghibli Watercolor

---

### Example 5: Multi-Version Comparison

```
You: Show me multiple versions
AI: [Version A: Eastern Fantasy] [prompt A]
    [Version B: Chinese Ink] [prompt B]
    [Version C: Ghibli] [prompt C]
```

![Version A: Eastern Fantasy](examples/wong-ghibli-fusion.png)
> Version A · Eastern Fantasy

![Version B: Chinese Ink](examples/multi-version-compare.png)
> Version B · Chinese Ink

![Version C: Ghibli](examples/full-pipeline.png)
> Version C · Ghibli

---

### Example 6: One-Click All Platforms

```
You: 一键全平台 (all platforms)
AI: [GPT Image 2 version] [Full Chinese description]
    [Midjourney v6 version] [English + --cref + --v 6]
    [Stable Diffusion XL version] [Positive/Negative/Params]
```

---

## Capability Summary

### Input (2)
| Capability | Description |
|------------|-------------|
| Direct Story Paste | Paste any story, smart recommendation of best style + format combinations |
| Obsidian Vault Reading | Scan vault directory → select chapter + duration + shot count → batch generate |

### Visual (9)
| Capability | Description |
|------------|-------------|
| **50+ Visual Styles** | Black-gold action → Chinese ink, including Disney/Pixar/Ghibli/Wong Kar-wai/Zhang Yimou/Wes Anderson/Tim Burton |
| **Style Fusion Engine** | "Wong Kar-wai + Ghibli" auto-fusion, 60% primary + 40% secondary |
| **140+ Camera Techniques** | 15 shot sizes / 66 camera moves / 21 angles / 11 focal lengths / 10 aspect ratios / 10 transitions / 8 special angles / 20 emotional shots / 8 narrative freezes |
| **40+ Lighting Schemes** | Full lighting + film palette reference |
| **Mood Slider** | 24 dimensions: more intense/cruel/sweet/depressing/ambiguous/horror/epic/healing/tense/dreamy |
| **60+ Color Narratives** | Colors evolve with emotion, 5 narrative models, color psychology mapping |
| **43 Micro-Expressions** | Ekman micro-expressions + 8 gaze patterns |
| **Dialogue Rhythm** | Pause/stress/speed/silence notation |
| **Style Migration** | Cross-style transfer while keeping character DNA intact |

### Character (5)
| Capability | Description |
|------------|-------------|
| **30+ Relationship Types** | Enemies to lovers/mutual crush/master-apprentice/age gap/marriage first/redemption/forced/comrades |
| **8 Consistency Methods** | Character card / 3-view / 5 face angles / 12 expressions / costume-weapon detail / 14-image ref / IP-Adapter / DNA text |
| **Character DNA (20 Fields)** | Cross-shot clothing/hair/facial consistency, state tracking |
| **Series/Sequel Support** | "Episode 2/continue" auto-extends DNA/colors/scenes |
| **Continuity Checking** | Auto-checks timeline/space/character/emotion continuity |

### Scene (1)
| Capability | Description |
|------------|-------------|
| **7 Scene-Locking Methods** | Overhead shot / 4-grid / 9-grid / all-in-one ref / 720° panorama / orbit video / text scene lock |

### Narrative (6)
| Capability | Description |
|------------|-------------|
| **12 Narrative Structures** | Three-act / hero's journey / Save the Cat / Kishōtenketsu / etc. |
| **Emotion Curve Driven** | Emotion stages dynamically adjust shot size/camera/lighting/color |
| **Pacing Engine** | Quick-cut/standard/slow/progressive/comedy rhythm modes |
| **AI Auto-Narrative Continuation** | AI auto-writes next chapter + matches bridging techniques |
| **36 Director Bridging Techniques** | Cross-segment continuity (hard-lock/soft-lock/ambiguity detection) |
| **Cross-Segment Continuity** | Full continuity guarantee across shots and segments |

### Video Workflow (4)
| Capability | Description |
|------------|-------------|
| **Recommended 5-Step Pipeline** | Prep → panorama → storyboard → prompt → video |
| **Seedance Full/Lite Mode** | Full (7 images) / Lite (3 images) upload |
| **Long Video Cross-Segment** | End-frame → Start-frame anchoring |
| **10-Item Post-Gen Checklist** | Quality verification after video generation |

### Output (5)
| Capability | Description |
|------------|-------------|
| **10 Output Formats** | Full board / quick storyboard / character card / scene card / poster / manga panel / mood board / 4-panel / 3-view / keyframe |
| **Multi-Version A/B/C** | 3 different visual interpretations of the same story |
| **Multi-Aspect Adaptive** | 16:9/9:16/1:1/2:3/21:9/32:9 one-click switch |
| **Industry Format Export** | Storyboard Pro / FrameForge / Celtx standard formats |
| **Batch Story Processing** | Auto-split novel chapters, batch generate storyboards |

### Workflow (6)
| Capability | Description |
|------------|-------------|
| **One-Click Workflow** | "一键生成/全平台/多版本/全来" full pipeline auto |
| **Precise Single-Shot Edit** | Edit only specified shot, DNA propagation |
| **Prompt Quality Scorer** | 0-100 auto-evaluation, 9 dimensions |
| **Prompt Version Management** | Records edit history, rollback, comparison |
| **Prompt Compression** | Auto-compress to MJ(1000 words)/SD(380 words)/Kling(500 chars) |
| **Thumbnail Storyboard** | Keyword-based quick validation |

### Extended (16)
| Capability | Description |
|------------|-------------|
| 36 Creature Designs | Beasts/monsters/mythical creatures |
| 36 Environment Designs | World-building across genres |
| 46 Props & Weapons | Artifacts/weapons/accessories |
| 26 Weather & Atmosphere | Full atmospheric effects library |
| 46 Body Language Types | Gestures/postures/movement |
| 36 Material Textures | Fabric/metal/skin/stone/etc. |
| 36 Animal Designs | Horses/raptors/beasts/mythical |
| 15 Historical Eras | Pre-Qin → Space sci-fi |
| Video Prompt Adapter | Storyboard → video platform native format |
| Video Character Card | Character consistency for video generation |
| Cultural Accuracy | Precise dynasty/country descriptions |
| Director Notes | Rationale for lens/color/character/rhythm choices |
| Multi-Platform Optimization | MJ --cref / SD ControlNet / GPT layout |
| Auto Negative Prompts | Style/format/relationship/platform-specific |
| Transitions & Montage | 5 hard cuts / 6 soft transitions / 10 montage types |
| Sound Design | 16 ambient / 20 foley / 12 music moods |

### API Integration (2)
| Capability | Description |
|------------|-------------|
| **9 Image Platforms** | GPT Image / Nano Banana / Flux / Ideogram / Tongyi Wanxiang / ComfyUI / SD / Recraft |
| **5 Video Platforms** | Seedance / Runway / Kling / Luma / Pika |

Total: **52 core capabilities**, **51 reference files**

---

## File Structure

```
ai-visual-director/
├── SKILL.md                          # Main entry: workflow + capability matrix + execution rules
├── README.md                         # Project documentation (Chinese)
├── README.en.md                      # Project documentation (English)
├── api-config.template.env           # API Key config template (14 platforms)
├── sub-skills/                       # Sub-skills (6 independent /xxx commands)
│   ├── storyboard/SKILL.md           # /storyboard quick storyboard
│   ├── character/SKILL.md            # /character character design
│   ├── scene/SKILL.md                # /scene scene design
│   ├── poster/SKILL.md               # /poster movie poster
│   ├── video/SKILL.md                # /video video pipeline
│   └── style/SKILL.md                # /style style browser
├── examples/                         # Example output images
├── references/                       # Reference files (51)
│   ├── styles.md                     # 50+ visual styles
│   ├── fusion.md                     # Style fusion engine
│   ├── formats.md                    # 10 output formats
│   ├── relationships.md              # 30+ character relationships
│   ├── act-structure.md              # 12 narrative structures
│   ├── emotion-curve.md              # 12 emotion curve models
│   ├── color-narrative.md            # 60+ color narrative schemes
│   ├── mood-slider.md                # Mood slider (24 dimensions)
│   ├── negative-prompt.md            # Auto negative prompts
│   ├── multi-version.md              # Multi-version A/B/C
│   ├── series.md                     # Sequel/series support
│   ├── character-dna.md              # 20-field character DNA + state tracking
│   ├── pacing.md                     # Storyboard pacing engine
│   ├── cultural-accuracy.md          # Cultural accuracy (dynasties/countries)
│   ├── camera.md                     # 140+ camera techniques (9 categories)
│   ├── lighting.md                   # 40+ lighting schemes + film palettes
│   ├── micro-expressions.md          # 43 Ekman micro-expressions + 8 gaze patterns
│   ├── dialogue-rhythm.md            # Dialogue rhythm notation
│   ├── composition.md                # 35+ composition rules
│   ├── quality.md                    # 100+ AI error library + quality constraints
│   ├── platform.md                   # Multi-platform format adaptation
│   ├── platform-advanced.md          # Platform deep optimization
│   ├── one-click.md                  # One-click workflow
│   ├── video-prompt.md               # AI video prompt (Sora/Runway/Kling/Luma/Pika)
│   ├── video-prompt-assembly.md      # Video prompt assembly (storyboard + character + shot anchors)
│   ├── single-shot-edit.md           # Precise single-shot editing
│   ├── audio-reference.md            # Music & SFX reference
│   ├── industry-export.md            # Industry format export
│   ├── thumbnail-board.md            # Thumbnail storyboard
│   ├── director-notes.md             # Director notes
│   ├── prompt-scorer.md              # Prompt quality scorer
│   ├── continuity-check.md           # Continuity checking
│   ├── multi-aspect.md               # Multi-aspect adaptation
│   ├── version-control.md            # Prompt version management
│   ├── style-migration.md            # Style migration
│   ├── prompt-compression.md         # Prompt compression
│   ├── creatures.md                  # 36 creature/beast/monster designs
│   ├── environments.md               # 36 environment/world designs
│   ├── props.md                      # 46 props/weapons/artifacts
│   ├── weather.md                    # 26 weather & atmospheric effects
│   ├── body-language.md              # 46 body language/gesture types
│   ├── materials.md                  # 36 material/texture references
│   ├── transitions.md                # Transitions & montage (5 hard/6 soft/10 montage)
│   ├── sound-design.md               # Sound design (16 ambient/20 foley/12 music moods)
│   ├── animals.md                    # 36 animal designs
│   ├── historical-eras.md            # 15 historical eras
│   ├── api-integration.md            # Image API integration (9 platforms)
│   ├── video-api-integration.md      # Video API integration (5 platforms)
│   ├── scene-consistency.md          # Scene consistency methods (7 types)
│   ├── character-consistency.md      # Character consistency methods (8 types)
│   └── batch-chapter.md              # Batch chapter processing
└── templates/                        # Template files (7)
    ├── full-board.md                 # Full board template
    ├── quick-board.md                # Quick storyboard + keyframe sequence
    ├── character-sheet.md            # Character sheet + 3-view
    ├── scene-card.md                 # Scene concept card
    ├── poster.md                     # Poster template
    ├── manga-page.md                 # Manga panel + 4-panel
    └── mood-board.md                 # Mood board template
```

---

## Command Quick Reference

### Input Commands

| Command | Effect |
|---------|--------|
| `[story content]` | Paste story, smart recommendation of 2-3 best combinations |
| `从 Obsidian 读取 [dir]` | Scan Obsidian Vault, show chapter/character/scene list |
| `Obsidian 读取 [dir] 全部 15s 7镜` | Batch chapter: specify duration + shot count |

### Core Commands

| Command | Effect |
|---------|--------|
| `一键生成` | Full pipeline auto, no options shown |
| `一键全平台` | Full pipeline + GPT/MJ/SD |
| `一键多版本` | A/B/C three version comparison |
| `一键全来` | 36 prompts (3 styles × 4 formats × 3 platforms) |
| `看全部` | Show all 53 styles + 10 formats |
| `全来` / `批量` | Output 4 most relevant formats |

### Scene Consistency

| Command | Effect |
|---------|--------|
| `生成场景参考图` / `场景锚点` | Select scene-locking method |
| `全能参考图` / `all-in-one` | One image: scene + character + lighting + props |
| `生成全景图` / `720全景` | 360°×180° panoramic environment |
| `环绕截图` / `视频截图法` | Orbit video → capture 8 angles → stitch |
| `镜头角度分镜` / `camera remix` | Text scene lock · multi-angle storyboard |

### Character Consistency

| Command | Effect |
|---------|--------|
| `生成角色卡` | 6-module character design sheet |
| `三视图` | Front/side/back character turnaround |
| `面部多角度` | 5-angle facial close-ups |
| `12表情` / `表情范围图` | 12 expressions locking emotional range |
| `服装武器细节卡` | Costume + weapon detail reference |
| `14图参考` | Nano Banana strongest character anchor |
| `IP-Adapter` | ComfyUI local character locking |
| `角色 DNA` | 20-field text anchor |

### Video Workflow

| Command | Effect |
|---------|--------|
| `转视频` | Storyboard → recommended pipeline → video |
| `出视频 prompt` | Compressed mode ≤1500 chars, feed to Seedance |
| `详细模式` / `展开 prompt` | Detailed mode 3000+ chars for Runway/Kling |
| `切分各帧` / `逐帧接力` | Frame-to-frame reference chain |
| `生成视频分镜图` / `合并帧` | 3-4 merged shot images |
| `继续下一段` / `续写下一段` | AI auto-continues next chapter + bridging |
| `检查视频` / `视频检查` | 10-item post-generation checklist |

### API Direct Generation

| Command | Effect |
|---------|--------|
| `配置 API` | View API Key configuration |
| `用 Nano Banana 生成` | Gemini API image generation |
| `用 GPT Image 生成` | DALL-E 3 API image generation |
| `用 Seedance 生成视频` | Volcengine Ark video generation |
| `用 Runway 生成视频` | Runway API video generation |
| `用 可灵 生成视频` | DashScope Kling API |
| `用 Luma/Pika 生成视频` | Luma/Pika API video generation |

### Adjustment Commands

| Command | Effect |
|---------|--------|
| `更燃` / `更虐` / `更甜` / `更丧` | Mood slider |
| `更暧昧` / `更恐怖` / `更史诗` | Mood slider |
| `更贵` | Enhance photography specs/material/layout |
| `小红书竖版` | Change aspect ratio to 9:16 |
| `适配抖音` / `适配朋友圈` | Multi-aspect switching |
| `第X镜暗一点` / `换长发` / `雨改雪` | Precise single-shot editing |
| `换成X风格但保持角色` | Style migration, DNA preserved |
| `回滚到第2版` | Version rollback |
| `压缩到MJ` / `压缩到SD` | Prompt compression |
| `检查连续性` | Continuity check report |
| `评分` | Prompt quality score |
| `加导演阐述` | Add director notes |
| `导出 Storyboard Pro` | Industry format export |
| `第X集` / `继续` | Sequel mode |
| `处理这一章` | Batch chapter processing |

---

## Platform Comparison

| Feature | GPT Image 2 | Midjourney v6 | Stable Diffusion XL |
|---------|-------------|---------------|---------------------|
| Chinese Input | ✅ Native support | ⚠️ Needs translation | ❌ Not supported |
| Layout | ⭐⭐ Best | ⭐ Single image | ⭐ Needs ControlNet |
| Character Consistency | ⭐⭐ Medium | ⭐⭐⭐ --cref | ⭐⭐⭐ IP-Adapter |
| Best For | Full board/manga/mood board | Poster/character/scene | Character sheet/local batch |

---

## Installation

### Option 1: npx skills (Recommended)

```bash
# Global install — available in all projects
npx skills add jijiutong/ai-visual-director -g -y

# Project-level — available only in current project
npx skills add jijiutong/ai-visual-director
```

After installation, Claude Code auto-discovers the skill. Paste any story in conversation to start.

### Option 2: Manual Install

```bash
git clone https://github.com/jijiutong/ai-visual-director.git
```

Place `SKILL.md` along with `references/` and `templates/` into `~/.claude/skills/ai-story-board/` (global) or `<project>/.claude/skills/ai-story-board/` (project-level).

### Option 3: Use Directly

No installation needed. In Claude Code, simply say:
```
帮我做这个故事板：[paste your story]
```

AI will generate prompts following the SKILL.md instructions.

---

## License

MIT
