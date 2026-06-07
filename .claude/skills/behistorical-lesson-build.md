---
description: Build a complete BeHistorical lesson — HTML shell, data file, renderer config, First & 10 standalone, and capture wrapper — for either a Unit topic or a Foundations topic. Validates with node scripts/validate.js before finishing.
---

# BeHistorical Lesson Build

Use this skill whenever asked to create a new lesson page (Unit or Foundations). Always commit and push to `main` when done.

---

## Quick Reference: File Types per Lesson

| File | Unit Lesson | Foundations Lesson |
|---|---|---|
| HTML shell | `unit-N/lesson-N-N-SLUG.html` | `foundations/foundations-N-SLUG.html` |
| Data file | `assets/data/lesson-N-N-SLUG.js` | `foundations/foundations-N-SLUG-data.js` |
| Renderer config | `assets/data/lesson-N-N-renderer-config.js` | *(shared renderer — no per-lesson config)* |
| F&10 standalone | `unit-N/first-and-10-topic-N-N-SLUG.html` | `foundations/first-and-10-foundations-N-SLUG.html` |
| F&10 capture | `unit-N/first-and-10-topic-N-N-SLUG-capture.html` | `foundations/first-and-10-foundations-N-SLUG-capture.html` |

---

## Step 1 — Collect inputs from the user

Before writing any files, confirm:

- **Type**: Unit or Foundations?
- **Unit/number**: e.g., Unit 2, Foundations 6
- **Topic number**: e.g., 2.3, Foundations-6
- **Slug**: kebab-case, e.g., `indian-ocean`, `belief-systems`
- **Title**: full display title
- **Subtitle**: one-line descriptor
- **Content**: learning targets, lecture segments, map info, evidence items, AP skill focus, beSurreal scenario, checkpoints, beInTheRoom URL (if any), F&10 reading text

If any content is missing, ask or use clearly marked `[TODO]` placeholders.

---

## Step 2 — Unit Lesson HTML Shell

**Path:** `unit-N/lesson-N-N-SLUG.html`

Copy the exact structure from `unit-1/lesson-1-1-song-china.html`. Change only:

1. `<title>` → `BeHistorical | AP World N.N`
2. Nav link: `<a href="../unit-N/index.html">Unit N</a>`
3. Script tags at the bottom — update all three filenames:
   - `../assets/data/lesson-N-N-SLUG.js?v=1`
   - `../assets/data/lesson-N-N-renderer-config.js?v=1`
   - `../assets/js/behistorical-topic-renderer-v1.js?v=btn-inline-v1` *(unchanged)*

**Required DOM IDs (must all be present):**
`lesson-title`, `lesson-subtitle`, `inline-targets`, `college-board-key-concepts`, `module-grid`, `lecture-title`, `lecture-intro`, `main-lecture-grid`, `content-video-clips`, `footer-topic-label`, `pop-modal`, `pop-eyebrow`, `pop-title`, `pop-body`, `lecture-modal`, `lecture-modal-title`, `lecture-modal-bullets`, `lecture-modal-img`, `lecture-modal-caption`, `lightbox`, `lightbox-img`, `lightbox-caption`

**Classroom Flow** — hardcode this inside `.lesson-roadmap` (never customize):
```html
<div class="lesson-roadmap">
  <div class="roadmap-step"><strong>1. Build Context</strong>Review the targets, examine the map, and read the First &amp; 10 narrative.</div>
  <div class="roadmap-step"><strong>2. Learn &amp; Practice</strong>Use the module cards, then move into the main lecture-card section.</div>
  <div class="roadmap-step"><strong>3. Check Understanding</strong>Complete checkpoints with self-check and response tools.</div>
</div>
```

**Script load order is critical:**
```html
<script src="../assets/js/behistorical-form-config.js?v=unified-v1"></script>
<script src="../assets/data/lesson-N-N-SLUG.js?v=1"></script>
<script src="../assets/data/lesson-N-N-renderer-config.js?v=1"></script>
<script src="../assets/js/behistorical-topic-renderer-v1.js?v=btn-inline-v1"></script>
```

---

## Step 3 — Unit Data File

**Path:** `assets/data/lesson-N-N-SLUG.js`

The data file must assign `window.BEHISTORICAL_LESSON` and include all base content. The renderer config will layer on checkpoints, stableImages, beSurreal, and skillBuilder — so the data file holds the structural content only.

```javascript
window.BEHISTORICAL_LESSON = {

  meta: {
    course: "AP WORLD HISTORY",
    unit: "Unit N: [Unit Title]",
    topic: "Topic N.N",
    title: "[Full Lesson Title]",
    subtitle: "[Subtitle / Time Period]",
    feedbackToolUrl: "https://student.magicschool.ai/s/login?joinCode=czwb9Q",
    canvasSubmissionNote: "Use this space to draft your checkpoint response before submitting to Canvas."
  },

  learningTargets: [
    { target: "I can ...", kc: "KC-N.N.I.X", theme: "[Theme]" },
    { target: "I can ...", kc: "KC-N.N.I.X", theme: "[Theme]" },
    { target: "I can ...", kc: "KC-N.N.I.X", theme: "[Theme]" }
  ],

  successCriteria: [
    { criteria: "I can use specific evidence such as ...", kc: "KC-N.N.I.X", theme: "[Theme]" },
    { criteria: "I can use specific evidence such as ...", kc: "KC-N.N.I.X", theme: "[Theme]" },
    { criteria: "I can use specific evidence such as ...", kc: "KC-N.N.I.X", theme: "[Theme]" }
  ],

  collegeBoardKeyConcepts: [
    {
      code: "KC-N.N.I.X",
      theme: "[Theme]",
      text: "[Key concept text]",
      illustrativeExamples: ["[Example 1]", "[Example 2]"]
    }
  ],

  lecture: {
    title: "[Lecture Title]",
    intro: "[One sentence describing what students will do with these cards]",
    videos: [
      {
        title: "[Video Title]",
        url: "https://youtu.be/[ID]",
        youtubeId: "[ID]",
        prompt: "[Viewing guide prompt]"
      }
    ],
    segments: [
      {
        title: "[Segment Title]",
        bullets: [
          "[Bullet with **bold** key terms]",
          "[Bullet with **bold** key terms]",
          "[Bullet with **bold** key terms]"
        ],
        image: {
          title: "[Image title]",
          caption: "[Caption]",
          url: "https://commons.wikimedia.org/wiki/Special:FilePath/[filename]",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:[filename]"
        }
      }
    ]
  },

  map: {
    title: "[Map Title]",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/[filename]",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:[filename]",
    caption: "[Caption]",
    intro: "[How to use this map]",
    prompt: "[Map analysis prompt]",
    notes: [
      "[Geographic observation 1]",
      "[Geographic observation 2]",
      "[Geographic observation 3]"
    ]
  },

  first10: {
    title: "First & 10: [Reading Title]",
    embedUrl: "first-and-10-topic-N-N-SLUG-capture.html"
  },

  evidenceLab: {
    title: "Evidence Lab: [Lab Title]",
    intro: "[How to use the evidence]",
    prompt: "[Evidence analysis prompt]",
    items: [
      { title: "[Evidence item]", detail: "[What this evidence shows]" },
      { title: "[Evidence item]", detail: "[What this evidence shows]" },
      { title: "[Evidence item]", detail: "[What this evidence shows]" }
    ]
  },

  primarySource: {
    title: "Primary Source: [Source Title]",
    intro: "[Context for the source]",
    text: "[Source excerpt]",
    questions: [
      "[Question 1]",
      "[Question 2]",
      "[Question 3]"
    ]
  }

};
```

**Image URL rule:** Never use Wikimedia URLs with parentheses in the path component (they break CSS). Use `Special:FilePath/filename` form for the display `url`, and `File:filename` form for `sourceUrl`.

---

## Step 4 — Unit Renderer Config

**Path:** `assets/data/lesson-N-N-renderer-config.js`

The renderer config wraps everything in an IIFE and layers on the fields the renderer needs that aren't in the data file.

```javascript
(() => {
  const lesson = window.BEHISTORICAL_LESSON;
  if (!lesson) return;

  // ─── College Board Key Concepts (if amending) ─────────────────────────────
  // (Omit this block if already set in the data file and nothing changes.)
  // lesson.collegeBoardKeyConcepts = [...];

  // ─── First & 10 embedUrl confirmation ────────────────────────────────────
  lesson.first10 = {
    ...lesson.first10,
    embedUrl: 'first-and-10-topic-N-N-SLUG-capture.html'
  };

  // ─── Map key legend ───────────────────────────────────────────────────────
  lesson.map = {
    ...lesson.map,
    key: [
      { label: '[Map feature]', detail: '[Historical significance]' },
      { label: '[Map feature]', detail: '[Historical significance]' },
      { label: '[Map feature]', detail: '[Historical significance]' }
    ]
  };

  // ─── Stable images (one Wikimedia URL per module, no parentheses) ─────────
  lesson.stableImages = {
    map:             'https://commons.wikimedia.org/wiki/Special:FilePath/[map-image]',
    first10:         'https://commons.wikimedia.org/wiki/Special:FilePath/[f10-image]',
    contentDelivery: 'https://commons.wikimedia.org/wiki/Special:FilePath/[lecture-image]',
    besurreal:       'https://commons.wikimedia.org/wiki/Special:FilePath/[besurreal-image]',
    skill:           'https://commons.wikimedia.org/wiki/Special:FilePath/[skill-image]',
    checkpoint1:     'https://commons.wikimedia.org/wiki/Special:FilePath/[cp1-image]',
    evidence:        'https://commons.wikimedia.org/wiki/Special:FilePath/[evidence-image]',
    source:          'https://commons.wikimedia.org/wiki/Special:FilePath/[source-image]',
    beintheroom:     'https://commons.wikimedia.org/wiki/Special:FilePath/[bitr-image]',
    checkpoint2:     'https://commons.wikimedia.org/wiki/Special:FilePath/[cp2-image]'
  };

  // ─── BeInTheRoom ──────────────────────────────────────────────────────────
  // Set url to the external experience path, or omit if none yet.
  lesson.beInTheRoom = {
    url: '../beintheroom/unit-N/[experience-slug].html',
    desc: '[One sentence describing the immersive experience]'
  };

  // ─── BeSurreal ────────────────────────────────────────────────────────────
  lesson.beSurreal = {
    title: 'BeSurreal: [Short scenario title]',
    desc:  '[One sentence teaser for the scenario]',
    intro: '[Opening line placing the student in the historical moment]',
    detail: '[2-3 sentences of sensory/daily-life detail]',
    prompt: '[AP connection question]'
  };

  // ─── AP Skill Builder ─────────────────────────────────────────────────────
  lesson.skillBuilder = {
    label: '[Skill name, e.g. Causation practice]',
    title: '[Skill Builder Title]',
    intro: '[What this skill is and why it matters for AP]',
    steps: [
      { label: '[Step label]', text: '[Step instructions]' },
      { label: '[Step label]', text: '[Step instructions]' },
      { label: '[Step label]', text: '[Step instructions]' }
    ],
    prompt: '[Writing prompt for skill practice]'
  };

  // ─── Checkpoints (exactly 2) ──────────────────────────────────────────────
  lesson.checkpoints = [
    {
      title: 'Checkpoint 1: [Title]',
      subtitle: 'Checks Learning Target 1 and Success Criteria 1.',
      cardDesc: '[Brief card description for the module grid]',
      learningTargets: [lesson.learningTargets[0].target],
      successCriteria: [lesson.successCriteria[0].criteria],
      prompt: '[Checkpoint 1 writing prompt]',
      responseType: 'Checkpoint 1',
      terms: ['[term1]', '[term2]', '[term3]', '[term4]', '[term5]'],
      focus: [
        '[Focus checklist item 1]',
        '[Focus checklist item 2]',
        '[Focus checklist item 3]'
      ]
    },
    {
      title: 'Checkpoint 2: [Title]',
      subtitle: 'Checks Learning Targets 2–3 and Success Criteria 2–3.',
      cardDesc: '[Brief card description for the module grid]',
      learningTargets: [lesson.learningTargets[1].target, lesson.learningTargets[2].target],
      successCriteria: [lesson.successCriteria[1].criteria, lesson.successCriteria[2].criteria],
      prompt: '[Checkpoint 2 writing prompt]',
      responseType: 'Checkpoint 2',
      terms: ['[term1]', '[term2]', '[term3]', '[term4]', '[term5]'],
      focus: [
        '[Focus checklist item 1]',
        '[Focus checklist item 2]',
        '[Focus checklist item 3]'
      ]
    }
  ];
})();
```

---

## Step 5 — First & 10 Standalone HTML

**Path:** `unit-N/first-and-10-topic-N-N-SLUG.html` (or `foundations/first-and-10-foundations-N-SLUG.html`)

Use the exact structure from `unit-1/first-and-10-topic-1-1-song-china.html`. The required structure in order:

1. `module-header` — badge (`Module 01`), `module-name` (`First & 10 Reading`), `module-subtitle`
2. `reading-title-band` — `reading-eyebrow`, `h1.reading-title` (one word in `<em>`), `p.reading-deck`, `.skill-tags`
3. `reading-body` (warm-paper bg):
   - `.support-strip` — two `.support-card` elements ("Before You Read" + "Reading Target")
   - `.vocab-strip` — `.term-chip` pills
   - Multiple `.section` divs each with: `.section-number` watermark, `.section-label`, `h2.section-heading`, `.reading-text` paragraphs, at least one `.ap-callout`
   - `.be-ready` strip
4. `.check-section` — exactly **three** `.question-item` elements, each with `.q-num`, `.q-skill`, `.q-text`, `textarea.q-textarea`
5. Builder section 1 — "Build Your Google Form Response" (`.builder-section`, `buildGooglePrompt()`, `#google-output`, `submitToGoogleForm()`)
6. Builder section 2 — "Build Your AI Coach Prompt" (`.builder-section`, `buildAiPrompt()`, `copyAiPrompt()`, Open MagicSchool, `#ai-output`)
7. `.page-footer-note`
8. `.module-footer` — nav links (← Map & Geography | Content Delivery →)

**CSS class name rule:** Always use full class names. Never abbreviate (`.check-section` not `.cs`, `.question-item` not `.qi`, `.module-footer` not `.mf`, etc.).

### Builder script template

Add inline `<script>` before `</body>`:

```html
<script>
  function buildGooglePrompt() {
    const q1 = (document.getElementById('q1') || {}).value || '';
    const q2 = (document.getElementById('q2') || {}).value || '';
    const q3 = (document.getElementById('q3') || {}).value || '';
    const out = [
      'TOPIC: [Topic N.N — Title]',
      '',
      'Q1 (Causation):', q1.trim() || '[No response]',
      '',
      'Q2 ([Skill]):', q2.trim() || '[No response]',
      '',
      'Q3 ([Skill]):', q3.trim() || '[No response]'
    ].join('\n');
    const el = document.getElementById('google-output');
    if (el) el.value = out;
  }

  function submitToGoogleForm() {
    buildGooglePrompt();
    const url = '[GOOGLE_FORM_URL]';
    window.open(url, '_blank');
  }

  function buildAiPrompt() {
    const q1 = (document.getElementById('q1') || {}).value || '';
    const q2 = (document.getElementById('q2') || {}).value || '';
    const q3 = (document.getElementById('q3') || {}).value || '';
    const out = [
      'I am an AP World History student working on Topic [N.N]: [Title].',
      '',
      'My answers:',
      'Q1: ' + (q1.trim() || '[No response]'),
      'Q2: ' + (q2.trim() || '[No response]'),
      'Q3: ' + (q3.trim() || '[No response]'),
      '',
      'Please give me Socratic feedback: ask follow-up questions, point out what I missed, and help me strengthen my historical reasoning.'
    ].join('\n');
    const el = document.getElementById('ai-output');
    if (el) el.value = out;
  }

  function copyAiPrompt() {
    buildAiPrompt();
    const el = document.getElementById('ai-output');
    if (!el || !el.value.trim()) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(el.value).catch(() => {
        el.select();
        document.execCommand('copy');
      });
    } else {
      el.select();
      document.execCommand('copy');
    }
  }
</script>
```

---

## Step 6 — First & 10 Capture Wrapper

**Path:** `unit-N/first-and-10-topic-N-N-SLUG-capture.html` (or `foundations/first-and-10-foundations-N-SLUG-capture.html`)

Copy the exact content from `unit-1/first-and-10-topic-1-1-song-china-capture.html` and change:

1. `<title>` → `First & 10 Capture Wrapper | Topic N.N [Title]` (or `| Foundations N`)
2. `iframe src` → `first-and-10-topic-N-N-SLUG.html` (no version query string until needed)
3. `iframe title` → `First and 10 Topic N.N [Title]`
4. `PREFILLED_FIRST10_FORM` — update all `entry.*` params:
   - `entry.125385659` = Unit label (e.g., `Unit+N+-+[Title]`)
   - `entry.187055090` = Topic label (e.g., `N.N+-+[Slug Title]`)
   - `entry.1549761827` = Topic ID (e.g., `N.N-first10`)
   - `entry.1963461515` = AP skills (one param per skill: `Causation`, `Contextualization`, etc.)

**Keep the entire `wireFirst10Capture()` function and `load` event listener unchanged.**

The base Google Form URL is always:
`https://docs.google.com/forms/d/e/1FAIpQLSe_0wBPNvSivuE0ea3fhty43c4PDNfE-tEWsGsZYyh0gFCxxw/viewform?usp=pp_url`

---

## Step 7 — Foundations HTML Shell

**Path:** `foundations/foundations-N-SLUG.html`

Copy from `foundations/foundations-1-geography.html`. Change:

1. `<title>` → `BeHistorical | Foundations N · [Title]`
2. `<footer>` text → `Foundations N · [Title] · Before 1200 CE` (or appropriate period)
3. Script tags:
   ```html
   <script src="../assets/js/behistorical-form-config.js?v=unified-v1"></script>
   <script src="foundations-N-SLUG-data.js?v=1"></script>
   <script src="foundations-topic-renderer.js?v=4"></script>
   ```

**Foundations-specific IDs:** `block-plan-roadmap` (class `lesson-roadmap`) is populated by the renderer — leave it empty in HTML. Also include `id="topic-code"` on the subtitle `<p>`.

---

## Step 8 — Foundations Data File

**Path:** `foundations/foundations-N-SLUG-data.js`

Must assign `window.FOUNDATION_TOPIC`. Required fields:

```javascript
window.FOUNDATION_TOPIC = {

  id: 'foundations-N',
  code: 'FOUNDATIONS N',
  title: '[Title]',
  subtitle: '[Subtitle / guiding question]',
  heroImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/[image]',

  commandCopy: '[Teacher-facing description of the lesson purpose]',

  blockPlan: [
    ['0-10',  '[Activity]', '[Description]'],
    ['10-25', '[Activity]', '[Description]'],
    ['25-40', '[Activity]', '[Description]'],
    ['40-65', '[Activity]', '[Description]'],
    ['65-80', '[Activity]', '[Description]'],
    ['80-90', '[Activity]', '[Description]']
  ],

  learningTargets: [
    'I can ...',
    'I can ...',
    'I can ...',
    'I can ...'
  ],

  successCriteria: [
    'I can name a specific ... and connect it to ...',
    'I can explain how ...',
    'I can connect ... to at least one AP World region ...',
    'I can write a ... sentence that ...'
  ],

  map: {
    title: 'Map: [Title]',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/[image]',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:[image]',
    caption: '[Caption / teacher instruction]',
    desc: '[What students should mark or identify on the map]',
    key: [
      { label: '[Feature]', detail: '[Historical significance]' },
      { label: '[Feature]', detail: '[Historical significance]' },
      { label: '[Feature]', detail: '[Historical significance]' }
    ],
    questions: [
      '[Map analysis question 1]',
      '[Map analysis question 2]',
      '[Map analysis question 3]',
      '[Map analysis question 4]'
    ],
    prompt: '[Map writing prompt]'
  },

  first10: {
    title: 'First & 10: [Reading Title]',
    embedUrl: 'first-and-10-foundations-N-SLUG-capture.html'
  },

  beSurreal: {
    title: '[Short scenario title]',
    desc: '[One sentence teaser]',
    intro: '[Opening line placing student in the moment]',
    detail: '[2-3 sentences of sensory/daily-life detail]',
    prompt: '[AP connection question]'
  },

  terms: ['[term1]', '[term2]', '[term3]', '[term4]', '[term5]'],

  termTable: [
    ['[Term]', '[Definition with AP context]'],
    ['[Term]', '[Definition with AP context]']
  ],

  evidence: {
    title: 'Evidence Lab: [Title]',
    task: '[Student task description]',
    prompt: '[Evidence writing prompt]',
    items: [
      {
        title: '[Evidence title]',
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/[image]',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:[image]',
        caption: '[Caption]',
        prompt: '[Image-specific question]'
      }
    ]
  },

  aiCoach: {
    title: 'Socrates Coach: [Title]',
    intro: '[Purpose of this coach]',
    prompts: [
      '[Socratic prompt 1]',
      '[Socratic prompt 2]',
      '[Socratic prompt 3]',
      '[Socratic prompt 4]'
    ],
    responsePrompt: '[What students do with the prompt]'
  },

  skill: {
    title: 'AP Skill Builder: [Skill Name]',
    desc: '[One sentence description]',
    intro: '[Why this skill matters for AP]',
    steps: [
      '[Step 1]',
      '[Step 2]',
      '[Step 3]',
      '[Step 4]'
    ],
    prompt: '[Writing prompt]'
  },

  checkpoint: {
    title: 'Exit Ticket: [Title]',
    prompt: '[Checkpoint writing prompt]',
    checklist: [
      '[Checklist item 1]',
      '[Checklist item 2]',
      '[Checklist item 3]',
      '[Checklist item 4]'
    ]
  },

  exitTicket: '[One-sentence exit question]',

  lecture: [
    {
      title: '[Segment title]',
      bullets: [
        '[Bullet with **bold** key terms]',
        '[Bullet with **bold** key terms]',
        '[Bullet with **bold** key terms]'
      ],
      image: {
        title: '[Image title]',
        url: 'https://commons.wikimedia.org/wiki/Special:FilePath/[image]',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:[image]',
        caption: '[Caption]'
      }
    }
  ],

  videos: [
    {
      title: '[Video title]',
      url: 'https://www.youtube.com/watch?v=[ID]',
      youtubeId: '[ID]',
      prompt: '[Viewing guide]'
    }
  ]

};
```

---

## Step 9 — Register the topic in form config

After creating all files, check `assets/js/behistorical-form-config.js`. If the new topic key (e.g., `'2.3'` or `'foundations-6'`) is not already registered, add it to the `BH_FORM` object.

---

## Step 10 — Validate

Run:
```
node scripts/validate.js
```

Fix any errors before committing. Common issues:
- `embedUrl` not pointing to the `-capture.html` wrapper
- Missing `beSurreal` fields (`title`, `desc`, `intro`, `detail`, `prompt` all required)
- Image URLs with parentheses in the path
- Missing required DOM IDs in the HTML shell
- Wrong script load order
- `checkpoints` array missing from renderer config (Unit 2+)
- `stableImages` missing from renderer config (Unit 2+)

---

## Step 11 — Commit and push

```
git add [all new files]
git commit -m "Add [Unit/Foundations] N.N [Title] lesson"
git push -u origin main
```

---

## 10-Module Order (canonical)

| # | ID | Title | Unit | Foundations |
|---|---|---|---|---|
| 01 | `map` | Map & Geography Check | `renderMap()` | `renderMap()` |
| 02 | `first10` | First & 10 Reading | `renderFirst10()` | `renderFirst10()` |
| 03 | `contentdelivery` | Content Delivery | jump `#lecture` | jump `#content` |
| 04 | `besurreal` | BeSurreal | `renderBeSurreal()` | `renderBeSurreal()` |
| 05 | `skill` | AP Skill Builder | `renderSkill()` | `renderSkill()` |
| 06 | `checkpoint1` | Checkpoint 1 | `renderCheckpoint1()` | `renderCheckpoint1()` |
| 07 | `evidence` | Evidence Lab | `renderEvidence()` | `renderEvidence()` |
| 08 | `source`/`coach` | Primary Source / Socrates AI Coach | `renderSource()` | `renderCoach()` |
| 09 | `beintheroom` | BeInTheRoom | `window.open(url)` | placeholder if no url |
| 10 | `checkpoint2` | Checkpoint 2 | `renderCheckpoint2()` | `renderCheckpoint2()` |

Module 03 is always a jump link — never a modal. Module 09 is always `window.open` when a URL exists.
