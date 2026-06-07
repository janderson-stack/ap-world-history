# BeHistorical — Project Status
Last audited: 2026-06-07 | `node scripts/validate.js` → 202 files, **58 errors, 63 warnings**

---

## What This Project Is

BeHistorical is a static HTML/JS AP World History lesson platform. Every lesson follows the **10-module standard** documented in CLAUDE.md. Content is driven by JavaScript data files; a shared renderer populates the page. There is no build step — everything runs in the browser directly from files in this repo.

---

## Overall Completion: ~57%

| Section | Status |
|---|---|
| Unit 1 (7 topics) | Complete |
| Unit 2 (7 topics) | Complete — has placeholder YouTube IDs |
| Unit 3 (4 topics) | Complete — has placeholder YouTube IDs |
| Unit 4 (8 topics) | Complete — F&10 files have validation errors (fixable pattern) |
| Unit 5 (8 topics) | Complete — F&10 files have validation errors (fixable pattern) |
| Unit 6 (8 topics) | Hub page only — **no lesson content exists** |
| Unit 7 (multiple topics) | Hub page only — **no lesson content exists** |
| Unit 8 (multiple topics) | Hub page only — **no lesson content exists** |
| Unit 9 (multiple topics) | Hub page only — **no lesson content exists** |
| Foundations 1–5 (new) | Complete (10-module standard) |
| Foundations 01–05 (old) | Exist but have validation errors — legacy format |
| BeInTheRoom | Unit 1 only (9 scenarios) — Units 2–9 not implemented |

---

## File Structure per Completed Lesson

For any completed unit lesson (e.g., Topic 2.3):

```
unit-2/
  lesson-2-3-indian-ocean.html              ← lesson shell (HTML)
  first-and-10-topic-2-3-indian-ocean.html  ← F&10 standalone reading
  first-and-10-topic-2-3-indian-ocean-capture.html  ← iframe wrapper

assets/data/
  lesson-2-3-indian-ocean.js               ← data file (window.BEHISTORICAL_LESSON)
  lesson-2-3-renderer-config.js            ← renderer amendments (IIFE)
```

For a completed foundations lesson (e.g., Foundations 3):

```
foundations/
  foundations-3-states-power.html          ← lesson shell
  foundations-3-states-power-data.js       ← data file (window.FOUNDATION_TOPIC)
  first-and-10-foundations-3-states-power.html
  first-and-10-foundations-3-states-power-capture.html
```

---

## Exact Lesson Inventory

### Unit 1 — The Global Tapestry (c. 1200–1450) ✓
All files complete and passing validation.
- 1.1 `song-china`
- 1.2 `dar-al-islam`
- 1.3 `south-southeast-asia`
- 1.4 `americas`
- 1.5 `africa`
- 1.6 `europe`
- 1.7 `comparison`

### Unit 2 — Networks of Exchange (c. 1200–1450) ✓ (warnings only)
All files complete. Placeholder YouTube IDs need real Heimler's History video IDs.
- 2.1 `silk-roads`
- 2.2 `mongol-empire`
- 2.3 `indian-ocean`
- 2.4 `trans-saharan`
- 2.5 `cultural-consequences`
- 2.6 `environmental-consequences`
- 2.7 `comparison`

### Unit 3 — Land-Based Empires (c. 1300–1700) ✓ (warnings only)
All files complete. Topic 3.4 has placeholder YouTube IDs.
- 3.1 `empires-expand`
- 3.2 `empires-administration`
- 3.3 `belief-systems`
- 3.4 `comparison`

### Unit 4 — Maritime Empires (c. 1450–1800) — errors in F&10 files
All lesson shells, data files, and renderer configs are complete and valid.
The F&10 standalone HTML files were built before the form-config system was standardized.
Each F&10 file is missing: `var TOPIC_KEY`, `var TOPIC_LABEL`, and the `behistorical-form-config.js` script load.
- 4.1 `technological-innovations`
- 4.2 `exploration`
- 4.3 `columbian-exchange`
- 4.4 `maritime-empires-established`
- 4.5 `maritime-empires-maintained`
- 4.6 `internal-external-challenges`
- 4.7 `changing-social-hierarchies`
- 4.8 `continuity-and-change`

### Unit 5 — Revolutions (c. 1750–1900) — same F&10 errors as Unit 4
All lesson shells, data files, and renderer configs are complete and valid.
Same missing TOPIC_KEY / TOPIC_LABEL / form-config pattern as Unit 4.
- 5.1 `enlightenment`
- 5.2 `nationalism-and-revolutions`
- 5.3 `industrial-revolution-begins`
- 5.4 `industrialization-spreads`
- 5.5 `technology-of-industrialization`
- 5.6 `industrialization-government-and-society`
- 5.7 `economic-developments-and-innovations`
- 5.8 `reactions-to-industrial-economy`

### Units 6–9 — NOT BUILT
Only `unit-N/index.html` hub pages exist. No lesson shells, data files, renderer configs, or F&10 files.
The hub pages contain topic card lists that indicate what topics are planned, but no lesson content has been created.

### Foundations (new, 10-module standard) ✓
Complete and passing validation (warnings only — missing DOMContentLoaded handlers in F&10 files).
- foundations-1 `geography`
- foundations-2 `belief-systems`
- foundations-3 `states-power`
- foundations-4 `trade-networks`
- foundations-5 `world-at-1200`

### Foundations (old format, 01–05) — errors
These were built before the 10-module standard. They use the old inline `paragraphs` array for first10 instead of `embedUrl`, and they are missing `beSurreal`. Do not use these as templates.
- foundations-01 `why-1200`
- foundations-02 `power-before-1200`
- foundations-03 `belief-before-1200`
- foundations-04 `networks-before-1200`
- foundations-05 `world-at-1200`

---

## Current Validation Errors (58 total — must fix before deploying)

### Group 1: Unit 4 & 5 First & 10 files (48 errors across 16 files)
Each of the 16 F&10 standalone files in unit-4/ and unit-5/ is missing three things:
1. `var TOPIC_KEY = '[N.N-first10]';` near the top of the `<script>` block
2. `var TOPIC_LABEL = '[N.N — Title]';` near the top of the `<script>` block
3. `<script src="../assets/js/behistorical-form-config.js?v=unified-v1"></script>` loaded before the inline script

Look at `unit-1/first-and-10-topic-1-1-song-china.html` or `unit-3/first-and-10-topic-3-1-empires-expand.html` as working references. Fix all 16 files.

### Group 2: Old-style Foundations data files (10 errors across 5 files)
`foundations/foundations-01-why-1200-data.js` through `foundations-05-world-at-1200-data.js`:
- Missing `beSurreal` field (needs `title`, `desc`, `intro`, `detail`, `prompt`)
- `first10` uses inline `paragraphs` array instead of `embedUrl` pointing to a capture wrapper

These old files are lower priority. If asked to fix them, add the `beSurreal` object and convert `first10` to use `embedUrl`. Also create the corresponding F&10 standalone + capture wrapper files.

---

## Current Validation Warnings (63 total — fix before class)

| Warning | Count | Fix |
|---|---|---|
| Placeholder YouTube IDs in data files | 8 | Replace `YT_*` placeholders with real Heimler's History video IDs |
| Missing `canvasSubmissionNote` in meta | 4 | Add to `meta` object in `lesson-1-3`, `1-4`, `1-6`, `1-7` data files |
| Missing DOMContentLoaded handler in F&10 files | 26 | Add handler that assigns textarea IDs at load time |
| `submitToGoogleForm` may use hardcoded URL | 16 | Verify Unit 4/5 F&10 files use `BH_FORM.baseURL` not a hardcoded URL |
| Topics 1.2, 1.3, 1.5 F&10 missing textareas | 3 | Check if these files are complete — may need response textarea section added |

---

## Key Shared Files (do not break these)

| File | Purpose |
|---|---|
| `assets/js/behistorical-topic-renderer-v1.js` | Renders all unit lesson pages — do not edit without understanding full impact |
| `foundations/foundations-topic-renderer.js` | Renders all foundations lesson pages |
| `assets/js/behistorical-form-config.js` | Central Google Form config — every lesson's topic key must be registered here |
| `assets/css/behistorical.css` | Global styles |
| `assets/css/behistorical-brand-lock.css` | Brand enforcement layer |
| `assets/css/behistorical-topic-template-v1.css` | Lesson page layout |
| `foundations/foundations-topic.css` | Foundations-specific styles |
| `scripts/validate.js` | Run after every change: `node scripts/validate.js` |

---

## BeInTheRoom Status

`beintheroom/unit-1/` contains 9 interactive scenario pages (one per Unit 1 topic plus extras). Units 2–9 have no BeInTheRoom content. Renderer configs for Units 2–5 reference `beInTheRoom.url` paths that don't exist yet — those show a placeholder in the module grid.

---

## What to Work On Next (priority order)

1. **Fix Unit 4 & 5 F&10 errors** — 48 errors, all the same pattern, systematic fix across 16 files
2. **Fix topics 1.2, 1.3, 1.5 F&10 missing textareas** — 3 files need check section added
3. **Fill in real YouTube IDs** for Units 2 and 3 — need actual Heimler's History video IDs
4. **Add `canvasSubmissionNote`** to 4 Unit 1 data files
5. **Build Unit 6** — 8 topics, all files need to be created from scratch
6. **Build Units 7, 8, 9** — same as Unit 6
7. **Upgrade old Foundations 01–05** — add beSurreal, convert first10 to embedUrl pattern

---

## How New Lessons Are Built

Use the `/behistorical-lesson-build` skill. It documents every file, template, and validation requirement. The skill file is at `.claude/skills/behistorical-lesson-build.md`.

The unit lesson template files to copy from are:
- HTML shell: `unit-1/lesson-1-1-song-china.html`
- F&10 capture wrapper: `unit-1/first-and-10-topic-1-1-song-china-capture.html`
- F&10 standalone: `unit-1/first-and-10-topic-1-1-song-china.html`
- Data file: `assets/data/lesson-2-1-silk-roads.js` (Unit 2+ pattern)
- Renderer config: `assets/data/lesson-2-1-renderer-config.js`

Always run `node scripts/validate.js` after any changes. Commit directly to `main`.
