# BeHistorical Teacher Hub — Setup Guide

The Teacher Hub collects student historical thinking data via Google Forms,
analyzes it with Gemini AI, and surfaces insights in a Google Sheet dashboard.

---

## How to Open the Apps Script Editor

1. Open the Google Sheet:
   `https://docs.google.com/spreadsheets/d/1hWqcFd9_J1zmCDWHe8O_3WiiaZxhEB8b-xPZrVwHuNc/`
2. Click **Extensions → Apps Script**
3. Delete any existing code in the editor
4. Paste the full contents of `google-apps-script/Code.gs`
5. Click **Save** (disk icon or Ctrl+S)

---

## Where to Paste Your Gemini API Key

At the top of `Code.gs`, find:

```js
const CONFIG = {
  GEMINI_API_KEY: 'PASTE_YOUR_GEMINI_API_KEY_HERE',
```

Replace `PASTE_YOUR_GEMINI_API_KEY_HERE` with your actual key.
Get a free key at: **Google AI Studio → Get API key**
Free tier: 1,500 requests/day, no credit card required.

---

## Run Order

Run these three functions in order from the Apps Script editor
(**Run → Run function → select name**) or from the **BeHistorical Hub**
menu that appears in the Sheet after setup.

### 1. `setupBeHistoricalHub()`

Creates (or renames) the following 7 tabs:

| Tab | Contents |
|-----|----------|
| Raw Responses | Renamed from "Form Responses 1"; adds a Processed column |
| AI Analysis Outputs | One row per analyzed submission with per-skill scores |
| Historical Thinking Skills Matrix | Running per-student averages across all 7 AP skills |
| Topic Mastery | Per-student, per-topic average score |
| Misconception Tracker | Pre-populated with 10 common AP World History misconceptions |
| Teacher Insights | Class-level insights generated on demand |
| Prompt Registry | All Topic 1.1 prompts fully written; Topics 1.2–1.7 as stubs |

### 2. `installTrigger()`

Installs an onFormSubmit trigger so every new form response is automatically
analyzed by Gemini and written to the appropriate tabs.

### 3. `processPendingRows()`

Batch-analyzes any existing form responses that haven't been processed yet.
A 4-second pause between rows keeps within Gemini free-tier rate limits.
For large backlogs (50+ rows), run in sections across multiple sessions.

---

## Verifying Column Mapping

**This step is important.** Google Forms sometimes places columns in a
different order than expected.

After running `setupBeHistoricalHub()`:

1. Open the **Raw Responses** tab
2. Look at row 1 (headers) in columns B through L
3. Compare them to the expected order in `Code.gs` (see the `COL` object comments)
4. If any column is in the wrong position, update the matching index in the
   `COL` object (0-based, so column A = 0, B = 1, C = 2, etc.)

Expected form field order:

```
A  Timestamp
B  Student Name
C  Class Period
D  Topic
E  Prompt ID
F  Response Type
G  Skill Focus
H  Student Response
I  Confidence Level
J  AI Coach Used?
K  Revision Attempt
L  Email
M  Processed  ← added by the script
```

---

## Scoring Scale

All AI Analysis Outputs use a 0–2 scale per AP historical thinking skill:

| Score | Meaning |
|-------|---------|
| 0 | Not demonstrated |
| 1 | Emerging / partially demonstrated |
| 2 | Clear and effective |
| null | Skill not relevant to this prompt type |

---

## Generating a Class Insight

After responses are processed, use **BeHistorical Hub → Generate Class Insight…**
to produce a Gemini-generated summary for a specific class period and topic.
The result is saved to the **Teacher Insights** tab with skill gaps and
recommended teaching moves.

---

## Class Periods

Silver 1, Silver 2, Silver 3, Silver 4, Green 4

## Topics Covered (Unit 1)

1.1 Song China · 1.2 Dar al-Islam · 1.3 Africa and the Americas  
1.4 The Mongols · 1.5 Trade Networks · 1.6 Consequences of Connectivity  
1.7 Comparison Across Regions
