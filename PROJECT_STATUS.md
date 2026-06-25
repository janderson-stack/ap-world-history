# BeHistorical — Project Status

> Note: this file did not exist before 2026-06-12; it was created during the BeInTheRoom theme-alignment audit session. Earlier project history is in `git log`.

## BeInTheRoom

### Theme-Alignment Hard Rule (codified 2026-06-12)

The **Step 0 — Theme Alignment Gate** is now codified in [`docs/beintheroom-scenario-blueprint.md`](docs/beintheroom-scenario-blueprint.md), preceding the existing scenario-requirement steps. Before drafting any scenario, the topic's CED thematic focus / learning objective pairs must be stated, and the premise AND decision points must directly enact at least one listed pair. A central dilemma that survives transplant to a different topic without changing the theme it exercises fails the gate. Every future BeInTheRoom build (including the 23 scenarios currently referenced by Unit 2–7 lessons but not yet built) must clear Step 0 first.

### Theme-Alignment Audit (2026-06-12)

Full report: [`docs/beintheroom-theme-audit.md`](docs/beintheroom-theme-audit.md). All nine existing scenarios (all in `beintheroom/unit-1/`) were audited against the Step 0 gate. No scenario HTML was edited.

| File | Topic | Verdict |
|---|---|---|
| `beintheroom/unit-1/song-court.html` | 1.1 East Asia | PASS |
| `beintheroom/unit-1/dar-al-islam-council.html` | 1.2 Dar al-Islam | PASS |
| `beintheroom/unit-1/abbasid-fragmentation.html` | 1.2 Dar al-Islam (orphaned) | PASS |
| `beintheroom/unit-1/angkor-council.html` | 1.3 South & Southeast Asia | PASS |
| `beintheroom/unit-1/khmer-court.html` | 1.3 South & Southeast Asia (orphaned) | **DRIFT** |
| `beintheroom/unit-1/cahokia-council.html` | 1.4 Americas (orphaned) | PASS |
| `beintheroom/unit-1/inca-court.html` | 1.4 Americas | PASS |
| `beintheroom/unit-1/great-zimbabwe-court.html` | 1.5 Africa | PASS |
| `beintheroom/unit-1/feudal-manor.html` | 1.6 Europe | PASS |

## Unit 8 — Cold War and Decolonization

### Topic 8.1 — Setting the Stage for the Cold War and Decolonization (built 2026-06-24)

| Deliverable | File | Status |
|---|---|---|
| Lesson shell | `unit-8/lesson-8-1-cold-war-stage.html` | DONE |
| Topic data | `assets/data/lesson-8-1-cold-war-stage.js` | DONE |
| Renderer config | `assets/data/lesson-8-1-renderer-config.js` | DONE |
| First & 10 reading | `unit-8/first-and-10-topic-8-1-cold-war-stage.html` | DONE |
| First & 10 capture wrapper | `unit-8/first-and-10-topic-8-1-cold-war-stage-capture.html` | DONE |
| BeInTheRoom scenario | `beintheroom/unit-8/empire-accounts.html` | DONE |
| Unit 8 index link | `unit-8/index.html` (Topic 8.1 card href updated) | DONE |

**BeInTheRoom scenario frame:** "caught between superpowers" — London, February 1947, PM Attlee's cabinet facing simultaneous crises in India, Greece/Turkey, and Palestine. Decision points require reasoning from 1947 knowledge (no hindsight framing). Continuity hooks to Topics 8.5–8.6 (Nehru, Nkrumah).

**Step 0 gate:** PASS — premise directly enacts KC-6.2.II (imperial exhaustion → dissolution of empires) and KC-6.2.IV.C.i (superpower balance of power shift). All four decision options exercise Governance/state-formation pairs from the CED thematic focus.

### Topic 8.2 — The Cold War (built 2026-06-25)

| Deliverable | File | Status |
|---|---|---|
| Lesson shell | `unit-8/lesson-8-2-the-cold-war.html` | DONE |
| Topic data | `assets/data/lesson-8-2-the-cold-war.js` | DONE |
| Renderer config | `assets/data/lesson-8-2-renderer-config.js` | DONE |
| First & 10 reading | `unit-8/first-and-10-topic-8-2-cold-war.html` | DONE |
| First & 10 capture wrapper | `unit-8/first-and-10-topic-8-2-cold-war-capture.html` | DONE |
| BeInTheRoom scenario | `beintheroom/unit-8/bandung-table.html` | DONE |
| Unit 8 index link | `unit-8/index.html` (Topic 8.2 card href updated) | DONE |

**BeInTheRoom scenario frame:** "The Bandung Table" — Bandung, Indonesia, April 1955, as a senior advisor in Sukarno's foreign ministry during the first Afro-Asian Conference (29 nations). Decision points: formal non-aligned bloc vs. loose principles forum; acceptance of superpower aid with conditions; how hard to condemn all colonialism (including Soviet). Four roles: Indonesian Foreign Ministry advisor, Indian Panchsheel delegate (Nehru), West African Pan-African observer (Nkrumah continuity hook), Pakistani military diplomat (SEATO-aligned, creates tension).

**Step 0 gate:** PASS — premise directly enacts KC-6.2.V.B (groups and individuals, including the Non-Aligned Movement, opposing and promoting alternatives to existing orders). The Bandung setting cannot be transplanted without changing the CDI theme it exercises.

### Topic 8.3 — Effects of the Cold War (built 2026-06-25)

| Deliverable | File | Status |
|---|---|---|
| Lesson shell | `unit-8/lesson-8-3-effects-cold-war.html` | DONE |
| Topic data | `assets/data/lesson-8-3-effects-cold-war.js` | DONE |
| Renderer config | `assets/data/lesson-8-3-renderer-config.js` | DONE |
| First & 10 reading | `unit-8/first-and-10-topic-8-3-effects-cold-war.html` | DONE |
| First & 10 capture wrapper | `unit-8/first-and-10-topic-8-3-effects-cold-war-capture.html` | DONE |
| BeInTheRoom scenario | `beintheroom/unit-8/luanda-decision.html` | DONE |
| Unit 8 index link | `unit-8/index.html` (Topic 8.3 card href updated) | DONE |

**BeInTheRoom scenario frame:** "The Luanda Decision" — Luanda, Angola, November 1975, as a senior advisor within the MPLA leadership circle with independence day approaching and South African forces advancing from the south, FNLA from the north. Three decisions: accept Cuban troops and Soviet arms; pursue quiet U.S. recognition talks; appeal to the OAU and Bandung-era principles. Four roles: MPLA Political Commissar, Angolan Nationalist Intellectual, Cuban Liaison Officer, OAU Secretary-General Liaison.

**Step 0 gate:** PASS — premise directly enacts KC-6.2.IV.D (proxy wars between and within postcolonial states in Africa) and LO C (compare how U.S. and Soviet Union sought to maintain influence). The Angolan Independence Day setting is the moment where both superpowers' methods are simultaneously visible and the student must reason through the comparison from the inside. Continuity hook to Bandung 1955 (Topic 8.2): the reflection prompt explicitly asks whether the non-alignment promise survives contact with a real war.

### Topic 8.4 — Spread of Communism After 1900 (built 2026-06-25)

| Deliverable | File | Status |
|---|---|---|
| Lesson shell | `unit-8/lesson-8-4-spread-of-communism.html` | DONE |
| Topic data | `assets/data/lesson-8-4-spread-of-communism.js` | DONE |
| Renderer config | `assets/data/lesson-8-4-renderer-config.js` | DONE |
| First & 10 reading | `unit-8/first-and-10-topic-8-4-spread-of-communism.html` | DONE |
| First & 10 capture wrapper | `unit-8/first-and-10-topic-8-4-spread-of-communism-capture.html` | DONE |
| BeInTheRoom scenario | `beintheroom/unit-8/harvest-report.html` | DONE |
| Unit 8 index link | `unit-8/index.html` (Topic 8.4 card href updated) | DONE |

**Dual-LO topic structure:** Topic 8.4 carries two thematic focus / LO pairs — ECN / LO D (China's adoption of communism: KC-6.2.I.i and KC-6.3.I.A.ii) and SIO / LO E (redistribution movements: KC-6.2.II.D.i with all four illustrative examples verbatim). Both pairs are represented in `lesson-8-4-spread-of-communism.js` `collegeBoardKeyConcepts` array (7 entries) and reproduced verbatim in `lesson-8-4-renderer-config.js`. Renderer constraint finding: `normalizedKeyConcepts()` iterates the full array with no entry-count limit; both pairs and all four illustrative examples render via standard `cb-card` elements with no renderer modification required.

**Checkpoint structure for dual-LO:** CP1 covers LT3 / LO E (redistribution movements — causes and effects of at least two CED examples); CP2 covers LT1+LT2 / LO D (China causation — both causes of 1949 revolution and consequences of Great Leap Forward).

**BeInTheRoom scenario frame:** "The Harvest Report" — Henan Province, China, autumn 1959, as the county party secretary holding an autumn harvest report showing 40% of the spring-reported figure. Decision points require reasoning from inside the system (pressure from party above + villages below), not between competing nations or factions. Three decisions: (a) what to report to the province; (b) what to submit to grain procurement quota; (c) what to tell the villages. Four roles: County Party Secretary, Village Production Team Leader, Provincial Agricultural Inspector, County Agricultural Bureau Chief. Frame explicitly breaks the "caught between superpowers" structure used in 8.1–8.3 — this is "caught inside the system."

**Step 0 gate:** PASS — premise directly enacts KC-6.3.I.A.ii (communist government control of national economy through Great Leap Forward, repressive policies, negative repercussions for population). The county party secretary's dilemma IS the CED key concept made visible from inside the system. Cannot be transplanted to a different topic without changing the ECN theme it exercises. Reflection prompt explicitly bridges both LO D KCs: asks students to explain the gap between the causes of China's communist revolution (1949 promises) and the consequences of communist government (1959 famine), connecting KC-6.2.I.i and KC-6.3.I.A.ii.

### Topic 8.5 — Decolonization After 1900 (built 2026-06-25)

| Deliverable | File | Status |
|---|---|---|
| Lesson shell | `unit-8/lesson-8-5-decolonization.html` | DONE |
| Topic data | `assets/data/lesson-8-5-decolonization.js` | DONE |
| Renderer config | `assets/data/lesson-8-5-renderer-config.js` | DONE |
| First & 10 reading | `unit-8/first-and-10-topic-8-5-decolonization.html` | DONE |
| First & 10 capture wrapper | `unit-8/first-and-10-topic-8-5-decolonization-capture.html` | DONE |
| BeInTheRoom scenario | `beintheroom/unit-8/positive-action.html` | DONE |
| Unit 8 index link | `unit-8/index.html` (Topic 8.5 card href updated) | DONE |

**BeInTheRoom scenario frame:** "Positive Action" — Accra, Gold Coast, January 1950, as a senior strategist in Nkrumah's Convention People's Party. The CPP is deciding whether to launch Positive Action (nonviolent strikes and boycotts) against the British colonial government, which has offered limited constitutional reforms through the Coussey Committee. Three decisions: (a) method — launch full Positive Action, limited strike with safety valves, accept Coussey reforms, or threaten escalation to armed resistance; (b) response to Nkrumah's certain arrest; (c) Cold War positioning to prevent the communist-subversion label. Four roles: CPP Political Strategist, UGCC Moderate, Gold Coast Market Woman, British Colonial Secretary's Advisor. 12 evidence chips: Accra riots 1948, Indian precedent (INC/Gandhi/1947), CPP mass organizational base, Coussey Report, Indochina cost (armed struggle), Cold War framing risk, cocoa economy leverage, 1945 Manchester Pan-African Congress, British post-war politics (Labour/war-weariness), Nkrumah's certain arrest, Gold Coast electorate, CPP-UGCC split.

**Step 0 gate:** PASS — premise directly enacts KC-6.2.II.A (Kwame Nkrumah in British Gold Coast seeking independence) and LO F (compare processes by which peoples pursued independence after 1900). The Accra/January 1950 CPP strategist setting cannot be transplanted without changing the GOV/comparison theme it exercises. Reflection prompt explicitly requires comparison with Algeria or Vietnam (armed struggle cases from KC-6.2.II.B), feeding Checkpoint 2's comparison requirement.

**Continuity hooks:** Nkrumah's third recurrence across Unit 8 — referenced as background figure in 8.1 (empire exhaustion context), present at the Bandung Table in 8.2 (Pan-African observer role), now central protagonist in 8.5 (his own independence struggle). Ho Chi Minh from 8.4 appears as a comparison reference in the evidence bank (Indochina cost chip). Reflection prompt looks forward to Ghana 1957 and Topic 8.6 (newly independent states).

**CED text constraints:** All verbatim CED text reproduced in both `lesson-8-5-decolonization.js` and `lesson-8-5-renderer-config.js` (RUNTIME-AUTHORITATIVE), including exact KC codes (KC-6.2.II.A, KC-6.2.II.B, KC-6.2.I.C — note KC-6.2.I.C, not KC-6.2.II.C), "British Gold Coast (Ghana)" exact, "French empire" lowercase, "Québécois" with accent.

---

### Open Revision Tasks (from the audit)

- **DRIFT — `beintheroom/unit-1/khmer-court.html` (Topic 1.3):** Its central dilemma is a generic state-priorities allocation (temples / military / agriculture / trade) that is structurally identical to `song-court.html` and fails the transplant test; Topic 1.3's listed CDI-G / GOV-H pairing (belief systems shaping state power) drives only one of four options, and its reflection prompt is generic. Recommended: retire it as superseded by `angkor-council.html` (which the lesson actually links), or redesign its decision points and reflection around religion-as-state-power per LO G/H.
- **Discrepancies flagged in the report (not fixed):**
  - D1: Unit 1 renderer configs carry no thematic focus / LO blocks (unlike Unit 7 configs).
  - D2: `assets/data/lesson-1-6-europe.js` mislabels its Europe LO as "Unit 1 Learning Objective H" (H belongs to Topic 1.3).
  - D4: Three orphaned scenario files (`abbasid-fragmentation`, `khmer-court`, `cahokia-council`) are linked from no lesson; the BeInTheRoom hub page lists only `song-court`.
  - D5: 23 BeInTheRoom scenario files referenced by Unit 2–7 lesson data/configs do not exist yet (broken Module 09 links); each must clear Step 0 when built.
