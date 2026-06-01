# BeHistorical — Claude Code Rules

## Git

- Always commit and push directly to `main`.
- Do not create feature branches or pull requests.

---

## Project Overview

**BeHistorical** is an AP World History: Modern platform hosted on GitHub Pages at `janderson-stack.github.io/ap-world-history`.

The architecture is data-driven: HTML shells + JS data files + shared renderer scripts. Content lives in data files, not in HTML. Never hardcode lesson content directly into HTML.

**Directory structure:**
```
/foundations/          Foundations Boot Camp (5-day pre-unit bridge)
/unit-1/               Unit 1 lessons (1.1–1.7)
/unit-2/ … /unit-9/    Future units (index stubs only)
/assets/css/           Shared stylesheets
/assets/js/            Shared scripts (form config, renderers)
/assets/data/          Unit lesson data files
/beintheroom/          Immersive simulation pages
/teacher/              Teacher dashboard
```

---

## Foundations Architecture

### Script loading order (required)
Every Foundations topic page must load scripts in this exact order:
```html
<script src="../assets/js/behistorical-form-config.js?v=unified-v1"></script>
<script src="foundations-N-topic-name-data.js"></script>
<script src="foundations-topic-renderer.js"></script>
```
Loading the data script before `behistorical-form-config.js` breaks form URLs. Loading the renderer before the data script crashes with `window.FOUNDATION_TOPIC` undefined.

### Required DOM IDs on every Foundations topic HTML page
The renderer (`foundations-topic-renderer.js`) calls `byId()` on these IDs — a missing ID throws a TypeError that stops the entire script and renders a blank page:

| ID | Element | Used for |
|---|---|---|
| `inline-targets` | `<div>` | Learning targets + success criteria |
| `block-plan-roadmap` | `<div>` | Lesson Command Center flow |
| `module-grid` | `<div>` | 9 module cards |
| `main-lecture-grid` | `<div>` | Lecture cards |
| `content-video-clips` | `<div>` | Video clip cards |
| `lesson-title` | any | Page `<h1>` title |
| `lesson-subtitle` | any | Subtitle/deck text |
| `lecture-title` | any | Lecture section heading |
| `lecture-intro` | any | Lecture section intro |
| `pop-modal` | `<div>` | Module popup overlay |
| `pop-eyebrow`, `pop-title`, `pop-body` | any | Module popup content |
| `lecture-modal` | `<div>` | Lecture card popup overlay |
| `lecture-modal-title`, `lecture-modal-bullets`, `lecture-modal-img`, `lecture-modal-caption` | any | Lecture popup content |
| `lightbox`, `lightbox-img`, `lightbox-caption` | any | Image lightbox |

**Wrong ID names that caused blank pages in the past:**
- `id="targets"` → must be `id="inline-targets"`
- `id="lecture-grid"` → must be `id="main-lecture-grid"`
- `id="video-grid"` → must be `id="content-video-clips"`

### Foundations data file shape (`window.FOUNDATION_TOPIC`)
Every data file must export `window.FOUNDATION_TOPIC` with these required keys:
```js
window.FOUNDATION_TOPIC = {
  id:             'foundations-N',       // matches BH_FORM.topics key
  code:           'FOUNDATIONS N',
  title:          '...',
  subtitle:       '...',
  heroImage:      'https://commons.wikimedia.org/wiki/Special:FilePath/...',
  commandCopy:    '...',
  learningTargets: [...],                // array of strings
  successCriteria: [...],               // array of strings
  blockPlan:      [...],                // array of [timeRange, title, desc]
  timeline:       [...],                // array of {date, event}
  timelinePrompt: '...',
  map: { title, url, sourceUrl, caption, desc, key, questions, prompt },
  lecture:        [...],                // array of {title, bullets[], image:{url,title,caption,sourceUrl}}
  videos:         [...],                // array of {title, youtubeId, url, prompt}
  terms:          [...],                // array of {term, definition}
  evidence:       { title, task, prompt, items:[{title,url,sourceUrl,caption,prompt}] },
  aiCoach:        { title, intro, prompts:[] },
  skill:          { title, desc, prompt, rubric:[] },
  checkpoint:     { title, prompt },
  first10:        { embedUrl: 'first-and-10-foundations-N-topic-name.html' }
};
```
The renderer reads `T.lecture[i].image.url` for module card images — missing or broken image URLs produce dark/blank cards.

---

## Image URL Rules

**Always use the Wikimedia Special:FilePath pattern:**
```
https://commons.wikimedia.org/wiki/Special:FilePath/Filename.jpg
```
The renderer's `sanitizeImageUrl()` passes these through as-is. Direct `upload.wikimedia.org` thumbnail URLs work too — the sanitizer converts them. Never use raw Wikipedia article URLs (`/wiki/File:...`) in CSS `--module-img` backgrounds because they redirect and break CSS parsing.

**Never use filenames with parentheses in CSS `url()` values.** Parentheses in filenames break CSS `url()` parsing. Example of what broke: `Along_the_River_During_the_Qingming_Festival_(detail_of_original).jpg`.

**Confirmed working image URLs (verified against Wikimedia):**
```
Silk_route.jpg                         → Silk Road map (used for FIRST10_IMG)
Socrates_Louvre.jpg                    → Socrates bust (SOCRATES_IMG)
Song%20Imperial%20Examination.JPG      → Civil exam scroll (SKILL_IMG)
Indian_Ocean-CIA_WFB_Map.png           → Indian Ocean CIA map
World_Map_Blank_-_with_blue_sea.svg    → Blank world map
Nile_composite_NASA.jpg                → Nile from space
Silk_Road_in_7th_century_AD.png        → Silk Road route map
```
**When adding a new image:** verify the filename exists in `foundations-4-trade-networks-data.js` or another data file that already renders correctly before using it elsewhere.

---

## Google Form Integration

### Config file: `assets/js/behistorical-form-config.js`
Sets `window.BH_FORM` with `baseURL`, `topics` (key → Google Form dropdown label), and `responseTypes`.

**Topic keys must match Google Form dropdown options exactly.** Current registered keys:
```
'1.1' through '1.7'         Unit 1 topics
'foundations-1' through 'foundations-5'   Foundations topics
```
When adding a new unit, add its topics to `BH_FORM.topics` in `behistorical-form-config.js` first.

### URL construction pattern
```js
BH_FORM.baseURL + '?usp=pp_url'
  + '&entry.187055090=' + encodeURIComponent(topicLabel).replace(/%20/g, '+')
  + '&entry.2107637366=' + responseType
```
The renderer's `FORM_URLS` IIFE builds URLs for all 7 response types per topic.

---

## First & 10 Standalone Files

### File naming
```
foundations/first-and-10-foundations-N-topic-name.html
unit-1/first-and-10-topic-1-N-topic-name.html
```

### Required structure (all F&10 files)
1. Load `behistorical-form-config.js` before any other script
2. Questions use `<textarea class="qta">` — DOMContentLoaded assigns `id="q1"`, `id="q2"`, `id="q3"`
3. Two builder sections appear **below the questions, above the footer**:
   - **Build Your Google Form Response** — Build Google Prompt button → `id="google-output"` readonly textarea → Submit to Google Form button
   - **Build Your AI Coach Prompt** — Build AI Prompt / Copy Prompt / Open MagicSchool buttons → `id="ai-output"` readonly textarea
4. Script block declares `TOPIC_KEY` and `TOPIC_LABEL`, then defines `buildGooglePrompt()`, `submitToGoogleForm()`, `buildAiPrompt()`, `copyAiPrompt()`

### Topic labels for builder scripts
```
foundations-1  →  'Foundations 1 - Geography Shapes Civilization'
foundations-2  →  'Foundations 2 - Belief Systems & Cultural Exchange'
foundations-3  →  'Foundations 3 - States, Power & Social Organization'
foundations-4  →  'Foundations 4 - Trade Networks & Innovation'
foundations-5  →  'Foundations 5 - The World at c.1200'
```

---

## CSS Architecture

**Shared stylesheets (load via `<link>`):**
- `assets/css/behistorical-topic-template-v1.css` — required on all Foundations topic pages; its absence renders the page without any layout
- `assets/css/behistorical.css` — base platform styles
- `foundations/foundations-topic.css` — Foundations-specific overrides

**Inline CSS on F&10 standalone files** — these are self-contained with all styles in `<style>` in `<head>`. Do not add external CSS links; do not remove the inline block.

**Module card images** are set via CSS custom property:
```html
<article class="module-card" style="--module-img:url('...')">
```
The CSS uses `var(--module-img)` as a background. An SVG at this position works but can look identical to other cards using the same SVG. Prefer JPEGs with visible photographic content for visual variety.

---

## Renderer Constants (foundations-topic-renderer.js)

These are shared across all 5 Foundations topics:
```js
FIRST10_IMG  = Special:FilePath/Silk_route.jpg
SOCRATES_IMG = Special:FilePath/Socrates_Louvre.jpg
SKILL_IMG    = Special:FilePath/Song%20Imperial%20Examination.JPG
```
Module 01 image = `T.map.url` (the topic's map)
Module 03 image = `segImg(1)` = `T.lecture[1].image.url`
Do not change these constants without checking that the Wikimedia filename still resolves.

---

## Classroom Flow (Block Plan Roadmap)

The roadmap renders as 3 static steps — do not revert to dynamic `blockPlan` rendering:
```
1. Build Context      — Launch question, map check, and thematic orientation.
2. Learn & Practice   — First & 10 reading, lecture cards, and module work.
3. Check Understanding — AP Skill Builder, checkpoint, and confidence reflection.
```

---

## MagicSchool Integration

MagicSchool buttons always open `https://app.magicschool.ai/` in a new tab with `rel="noopener"`. They appear in:
- AI Coach module popup (`renderCoach()`) — label "AI Coach"
- Checkpoint module popup (`renderCheckpoint()`) — label "Feedback Tool"
- F&10 Build Your AI Coach Prompt section — button text "Open MagicSchool"

---

## Adding a New Unit

Checklist when building a new unit (e.g., Unit 2):

1. Add topic keys to `BH_FORM.topics` in `assets/js/behistorical-form-config.js`
2. Create data files in `assets/data/` following the `lesson-1-N-topic.js` pattern
3. Create HTML pages in `/unit-N/` using `assets/templates/behistorical-topic-template-v1.html` as base
4. Create F&10 standalone HTML files in `/unit-N/` using the Foundations F&10 files as pattern
5. Verify all module card images use confirmed-working Wikimedia filenames (no parentheses)
6. Test that `window.TOPIC_DATA` (or equivalent) renders before pushing
