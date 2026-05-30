/**
 * BeHistorical Teacher Hub — Apps Script
 *
 * Paste into Extensions → Apps Script inside the Google Sheet linked to
 * the BeHistorical Student Response Form.
 *
 * Run order: setupBeHistoricalHub() → installTrigger() → processPendingRows()
 *
 * Before running: paste your Gemini API key into CONFIG.GEMINI_API_KEY below.
 */

// ─── Configuration ─────────────────────────────────────────────────────────────

const CONFIG = {
  GEMINI_API_KEY: 'PASTE_YOUR_GEMINI_API_KEY_HERE',
  GEMINI_MODEL: 'gemini-2.5-flash',
  FORM_RESPONSES_ORIGINAL: 'Form Responses 1',
  TABS: {
    RAW: 'Raw Responses',
    ANALYSIS: 'AI Analysis Outputs',
    SKILLS: 'Historical Thinking Skills Matrix',
    MASTERY: 'Topic Mastery',
    MISCONCEPTIONS: 'Misconception Tracker',
    INSIGHTS: 'Teacher Insights',
    PROMPTS: 'Prompt Registry',
  },
};

// Column indices (0-based) for the Raw Responses tab.
// IMPORTANT: After setup, open Raw Responses, check columns B–L against the
// Google Form field order, and update these indices if the form placed any
// columns differently than the list below.
//
// Expected order from form:
//   A(0) Timestamp | B(1) Student Name | C(2) Class Period | D(3) Topic
//   E(4) Prompt ID | F(5) Response Type | G(6) Skill Focus
//   H(7) Student Response | I(8) Confidence Level | J(9) AI Coach Used?
//   K(10) Revision Attempt | L(11) Email | M(12) Processed (added by script)
const COL = {
  TIMESTAMP: 0,
  STUDENT_NAME: 1,
  CLASS_PERIOD: 2,
  TOPIC: 3,
  PROMPT_ID: 4,
  RESPONSE_TYPE: 5,
  SKILL_FOCUS: 6,
  STUDENT_RESPONSE: 7,
  CONFIDENCE_LEVEL: 8,
  AI_COACH_USED: 9,
  REVISION_ATTEMPT: 10,
  EMAIL: 11,
  PROCESSED: 12,
};

// ─── Menu ──────────────────────────────────────────────────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('BeHistorical Hub')
    .addItem('1. Setup Hub Tabs', 'setupBeHistoricalHub')
    .addItem('2. Install Form Trigger', 'installTrigger')
    .addItem('3. Process Pending Rows', 'processPendingRows')
    .addSeparator()
    .addItem('Generate Class Insight…', 'promptGenerateClassInsight')
    .addToUi();
}

// ─── Setup ─────────────────────────────────────────────────────────────────────

function setupBeHistoricalHub() {
  const ss = SpreadsheetApp.getActive();

  // Rename the form responses tab to Raw Responses (or create it)
  let rawSheet = ss.getSheetByName(CONFIG.TABS.RAW);
  if (!rawSheet) {
    const formSheet = ss.getSheetByName(CONFIG.FORM_RESPONSES_ORIGINAL);
    if (formSheet) {
      formSheet.setName(CONFIG.TABS.RAW);
      rawSheet = formSheet;
    } else {
      rawSheet = ss.insertSheet(CONFIG.TABS.RAW);
    }
  }

  // Add Processed column header at M1 if not already present
  const processedCell = rawSheet.getRange(1, COL.PROCESSED + 1);
  if (!processedCell.getValue()) processedCell.setValue('Processed');

  setupAnalysisOutputsTab_(ss);
  setupSkillsMatrixTab_(ss);
  setupTopicMasteryTab_(ss);
  setupMisconceptionTrackerTab_(ss);
  setupTeacherInsightsTab_(ss);
  setupPromptRegistryTab_(ss);

  SpreadsheetApp.getUi().alert(
    'BeHistorical Hub setup complete!\n\n' +
    'Next steps:\n' +
    '1. Verify column mapping (see Raw Responses tab, columns B–L)\n' +
    '2. Run "2. Install Form Trigger"\n' +
    '3. Run "3. Process Pending Rows" for any existing submissions'
  );
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function setupAnalysisOutputsTab_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.TABS.ANALYSIS);
  sheet.clearContents();
  const headers = [
    'Source Row', 'Processed At', 'Student Name', 'Class Period', 'Topic',
    'Prompt ID', 'Response Type', 'Skill Focus', 'Revision Attempt', 'Confidence',
    'Argumentation', 'Causation', 'Comparison', 'CCOT', 'Contextualization',
    'Evidence', 'Sourcing', 'Feedback Summary', 'Misconceptions', 'Strengths',
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function setupSkillsMatrixTab_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.TABS.SKILLS);
  sheet.clearContents();
  const headers = [
    'Student Name', 'Class Period',
    'Argumentation', 'Causation', 'Comparison', 'CCOT',
    'Contextualization', 'Evidence', 'Sourcing',
    'Response Count', 'Last Updated',
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function setupTopicMasteryTab_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.TABS.MASTERY);
  sheet.clearContents();
  const headers = [
    'Student Name', 'Class Period', 'Topic',
    'Average Score', 'Response Count', 'Last Submission',
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function setupMisconceptionTrackerTab_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.TABS.MISCONCEPTIONS);
  sheet.clearContents();
  const headers = ['Misconception', 'Count', 'Related Topics', 'Notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);

  const misconceptions = [
    ['The Silk Road was a single road traveled end-to-end by one merchant', 0, '1.1, 1.2, 1.5', ''],
    ['Mongol rule was purely destructive with no benefits to trade or culture', 0, '1.3, 1.5', ''],
    ['Islam spread primarily through violent conquest', 0, '1.2, 1.5', ''],
    ['The Black Death only significantly affected Europe', 0, '1.5, 1.6', ''],
    ['Song China was a major military power', 0, '1.1', ''],
    ['The civil service exam was fully meritocratic and open to all Chinese', 0, '1.1', ''],
    ['Champa rice was a Chinese invention rather than an import from Vietnam', 0, '1.1', ''],
    ['Neo-Confucianism and original Confucianism were identical belief systems', 0, '1.1', ''],
    ['Western Europe dominated global trade networks in 1200 CE', 0, '1.1, 1.2, 1.5', ''],
    ['Columbus discovered a previously unknown or uninhabited land', 0, '1.3, 1.4', ''],
  ];
  sheet.getRange(2, 1, misconceptions.length, 4).setValues(misconceptions);
}

function setupTeacherInsightsTab_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.TABS.INSIGHTS);
  sheet.clearContents();
  const headers = [
    'Timestamp', 'Class Period', 'Topic',
    'Insight Summary', 'Common Misconceptions', 'Skill Gaps', 'Recommendations',
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function setupPromptRegistryTab_(ss) {
  const sheet = getOrCreateSheet_(ss, CONFIG.TABS.PROMPTS);
  sheet.clearContents();
  const headers = ['Prompt ID', 'Topic', 'Response Type', 'Skill Focus', 'Prompt Text', 'Notes'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);

  const prompts = [
    // ── Topic 1.1 — Song China (fully populated) ──────────────────────────────
    [
      '1.1-F10-01', '1.1 Song China', 'First and 10', 'Evidence, Argumentation',
      'In 10 minutes, list 10 specific facts about Song China\'s economy, government, or society. For each fact, include the historical term or piece of evidence that supports it.',
      'Opening activity; builds vocabulary bank',
    ],
    [
      '1.1-APB-01', '1.1 Song China', 'AP Skill Builder', 'Causation',
      'Explain the causes of economic growth in Song China. Identify at least two specific factors (e.g., civil service exam, Champa rice, Grand Canal) and explain how each contributed to the commercialization of Chinese society.',
      'Focus: causation; requires claim + 2 evidence + reasoning',
    ],
    [
      '1.1-APB-02', '1.1 Song China', 'AP Skill Builder', 'Continuity and Change Over Time',
      'How did the role of Confucian ideas in Chinese governance change between the Han and Song dynasties? Identify one continuity and one change, and explain the significance of each.',
      'Focus: CCOT across dynasties',
    ],
    [
      '1.1-CHK1-01', '1.1 Song China', 'Checkpoint 1', 'Argumentation, Evidence',
      'How did the expansion of the civil service exam system affect Song Chinese society? Identify the change, explain its significance, and connect it to one broader historical pattern.',
      'Formative checkpoint; 3–5 sentences expected',
    ],
    [
      '1.1-EVL-01', '1.1 Song China', 'Evidence Lab', 'Evidence',
      'Using at least two specific pieces of historical evidence, support this claim: "Song China experienced a period of significant technological and economic innovation that shaped East Asian society."',
      'Focus: evidence selection and integration',
    ],
    [
      '1.1-PRS-01', '1.1 Song China', 'Primary Source', 'Sourcing, Contextualization',
      'Analyze the primary source from the lesson. Identify: (1) who created it and why, (2) the historical context in which it was produced, and (3) what it reveals about Song Chinese society.',
      'Sourcing + contextualization; SAQ format',
    ],
    [
      '1.1-BITR-01', '1.1 Song China', 'BeInTheRoom', 'Argumentation, Contextualization',
      'You are a scholar-official in Song China writing a letter to a friend about the pressures of the civil service examination system. Write 2–3 sentences using specific historical details to describe your experience.',
      'Historical empathy + evidence; BeInTheRoom immersive',
    ],
    [
      '1.1-CHK2-01', '1.1 Song China', 'Checkpoint 2', 'Argumentation, Evidence, Causation',
      'AP SAQ: Briefly explain ONE specific development from Song China and explain its historical significance for either East Asia or the broader world in the period 900–1279 CE.',
      'Summative; mirrors AP exam SAQ format',
    ],

    // ── Topic 1.2 — Dar al-Islam (stubs) ─────────────────────────────────────
    ['1.2-F10-01', '1.2 Dar al-Islam', 'First and 10', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.2-APB-01', '1.2 Dar al-Islam', 'AP Skill Builder', 'Causation', '[Stub — add prompt text]', ''],
    ['1.2-CHK1-01', '1.2 Dar al-Islam', 'Checkpoint 1', 'Argumentation', '[Stub — add prompt text]', ''],
    ['1.2-EVL-01', '1.2 Dar al-Islam', 'Evidence Lab', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.2-PRS-01', '1.2 Dar al-Islam', 'Primary Source', 'Sourcing, Contextualization', '[Stub — add prompt text]', ''],
    ['1.2-BITR-01', '1.2 Dar al-Islam', 'BeInTheRoom', 'Contextualization', '[Stub — add prompt text]', ''],
    ['1.2-CHK2-01', '1.2 Dar al-Islam', 'Checkpoint 2', 'Argumentation, Evidence', '[Stub — add prompt text]', ''],

    // ── Topic 1.3 — Africa and the Americas (stubs) ───────────────────────────
    ['1.3-F10-01', '1.3 Empires of Africa and the Americas', 'First and 10', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.3-APB-01', '1.3 Empires of Africa and the Americas', 'AP Skill Builder', 'Comparison', '[Stub — add prompt text]', ''],
    ['1.3-CHK1-01', '1.3 Empires of Africa and the Americas', 'Checkpoint 1', 'Argumentation', '[Stub — add prompt text]', ''],
    ['1.3-EVL-01', '1.3 Empires of Africa and the Americas', 'Evidence Lab', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.3-PRS-01', '1.3 Empires of Africa and the Americas', 'Primary Source', 'Sourcing', '[Stub — add prompt text]', ''],
    ['1.3-BITR-01', '1.3 Empires of Africa and the Americas', 'BeInTheRoom', 'Contextualization', '[Stub — add prompt text]', ''],
    ['1.3-CHK2-01', '1.3 Empires of Africa and the Americas', 'Checkpoint 2', 'Argumentation, Comparison', '[Stub — add prompt text]', ''],

    // ── Topic 1.4 — The Mongols (stubs) ──────────────────────────────────────
    ['1.4-F10-01', '1.4 The Mongols', 'First and 10', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.4-APB-01', '1.4 The Mongols', 'AP Skill Builder', 'Causation, Comparison', '[Stub — add prompt text]', ''],
    ['1.4-CHK1-01', '1.4 The Mongols', 'Checkpoint 1', 'Argumentation', '[Stub — add prompt text]', ''],
    ['1.4-EVL-01', '1.4 The Mongols', 'Evidence Lab', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.4-PRS-01', '1.4 The Mongols', 'Primary Source', 'Sourcing, Contextualization', '[Stub — add prompt text]', ''],
    ['1.4-BITR-01', '1.4 The Mongols', 'BeInTheRoom', 'Contextualization', '[Stub — add prompt text]', ''],
    ['1.4-CHK2-01', '1.4 The Mongols', 'Checkpoint 2', 'Argumentation, Causation', '[Stub — add prompt text]', ''],

    // ── Topic 1.5 — Trade Networks (stubs) ───────────────────────────────────
    ['1.5-F10-01', '1.5 Trade Networks', 'First and 10', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.5-APB-01', '1.5 Trade Networks', 'AP Skill Builder', 'Causation', '[Stub — add prompt text]', ''],
    ['1.5-CHK1-01', '1.5 Trade Networks', 'Checkpoint 1', 'Argumentation', '[Stub — add prompt text]', ''],
    ['1.5-EVL-01', '1.5 Trade Networks', 'Evidence Lab', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.5-PRS-01', '1.5 Trade Networks', 'Primary Source', 'Sourcing, Contextualization', '[Stub — add prompt text]', ''],
    ['1.5-BITR-01', '1.5 Trade Networks', 'BeInTheRoom', 'Contextualization', '[Stub — add prompt text]', ''],
    ['1.5-CHK2-01', '1.5 Trade Networks', 'Checkpoint 2', 'Argumentation, Evidence', '[Stub — add prompt text]', ''],

    // ── Topic 1.6 — Consequences of Connectivity (stubs) ─────────────────────
    ['1.6-F10-01', '1.6 Consequences of Connectivity', 'First and 10', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.6-APB-01', '1.6 Consequences of Connectivity', 'AP Skill Builder', 'Causation, CCOT', '[Stub — add prompt text]', ''],
    ['1.6-CHK1-01', '1.6 Consequences of Connectivity', 'Checkpoint 1', 'Argumentation', '[Stub — add prompt text]', ''],
    ['1.6-EVL-01', '1.6 Consequences of Connectivity', 'Evidence Lab', 'Evidence', '[Stub — add prompt text]', ''],
    ['1.6-PRS-01', '1.6 Consequences of Connectivity', 'Primary Source', 'Sourcing', '[Stub — add prompt text]', ''],
    ['1.6-BITR-01', '1.6 Consequences of Connectivity', 'BeInTheRoom', 'Contextualization', '[Stub — add prompt text]', ''],
    ['1.6-CHK2-01', '1.6 Consequences of Connectivity', 'Checkpoint 2', 'Argumentation, Causation', '[Stub — add prompt text]', ''],

    // ── Topic 1.7 — Comparison Across Regions (stubs) ────────────────────────
    ['1.7-F10-01', '1.7 Comparison Across Regions', 'First and 10', 'Evidence, Comparison', '[Stub — add prompt text]', ''],
    ['1.7-APB-01', '1.7 Comparison Across Regions', 'AP Skill Builder', 'Comparison', '[Stub — add prompt text]', ''],
    ['1.7-CHK1-01', '1.7 Comparison Across Regions', 'Checkpoint 1', 'Argumentation, Comparison', '[Stub — add prompt text]', ''],
    ['1.7-EVL-01', '1.7 Comparison Across Regions', 'Evidence Lab', 'Evidence, Comparison', '[Stub — add prompt text]', ''],
    ['1.7-PRS-01', '1.7 Comparison Across Regions', 'Primary Source', 'Sourcing, Comparison', '[Stub — add prompt text]', ''],
    ['1.7-BITR-01', '1.7 Comparison Across Regions', 'BeInTheRoom', 'Contextualization, Comparison', '[Stub — add prompt text]', ''],
    ['1.7-CHK2-01', '1.7 Comparison Across Regions', 'Checkpoint 2', 'Argumentation, Comparison', '[Stub — add prompt text]', ''],
  ];

  sheet.getRange(2, 1, prompts.length, 6).setValues(prompts);
  sheet.autoResizeColumns(1, 6);
}

// ─── Trigger ───────────────────────────────────────────────────────────────────

function installTrigger() {
  // Remove any existing onFormSubmit triggers for this script to avoid duplicates
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'onFormSubmitHandler')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('onFormSubmitHandler')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onFormSubmit()
    .create();

  SpreadsheetApp.getUi().alert(
    'Form submit trigger installed.\nNew submissions will be analyzed automatically.'
  );
}

// ─── Form Submit Handler ────────────────────────────────────────────────────────

function onFormSubmitHandler(e) {
  try {
    const ss = SpreadsheetApp.getActive();
    const rawSheet = ss.getSheetByName(CONFIG.TABS.RAW);
    if (!rawSheet) return;

    const lastRow = rawSheet.getLastRow();
    const rowData = rawSheet.getRange(lastRow, 1, 1, COL.PROCESSED + 1).getValues()[0];

    if (rowData[COL.PROCESSED]) return;

    const analysis = analyzeResponseWithGemini_(rowData);
    if (!analysis) return;

    writeAnalysisOutput_(ss, analysis, rowData, lastRow);
    updateSkillsMatrix_(ss, analysis, rowData);
    updateTopicMastery_(ss, analysis, rowData);
    markRowProcessed_(rawSheet, lastRow);
  } catch (err) {
    Logger.log('onFormSubmitHandler error: ' + err.toString());
  }
}

// ─── Gemini API ─────────────────────────────────────────────────────────────────

function analyzeResponseWithGemini_(rowData) {
  if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    Logger.log('Gemini API key not configured.');
    return null;
  }

  const studentResponse = String(rowData[COL.STUDENT_RESPONSE] || '').trim();
  if (!studentResponse) return null;

  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    CONFIG.GEMINI_MODEL +
    ':generateContent?key=' +
    CONFIG.GEMINI_API_KEY;

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      contents: [{ parts: [{ text: buildGeminiPrompt_(rowData) }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.3 },
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() !== 200) {
    Logger.log('Gemini error ' + response.getResponseCode() + ': ' + response.getContentText());
    return null;
  }

  try {
    const json = JSON.parse(response.getContentText());
    return JSON.parse(json.candidates[0].content.parts[0].text);
  } catch (err) {
    Logger.log('Failed to parse Gemini response: ' + err.toString());
    return null;
  }
}

function buildGeminiPrompt_(rowData) {
  return (
    'You are an AP World History: Modern instructional coach. ' +
    'Analyze this student response and return structured JSON only — no other text.\n\n' +
    'Topic: ' + (rowData[COL.TOPIC] || '') + '\n' +
    'Prompt ID: ' + (rowData[COL.PROMPT_ID] || '') + '\n' +
    'Response Type: ' + (rowData[COL.RESPONSE_TYPE] || '') + '\n' +
    'Skill Focus: ' + (rowData[COL.SKILL_FOCUS] || '') + '\n' +
    'Student Response: ' + (rowData[COL.STUDENT_RESPONSE] || '') + '\n' +
    'Confidence Level: ' + (rowData[COL.CONFIDENCE_LEVEL] || '') + '/5\n' +
    'Revision Attempt: ' + (rowData[COL.REVISION_ATTEMPT] || '') + '\n\n' +
    'Score on AP historical thinking skills using 0–2 scale:\n' +
    '  0 = not demonstrated\n' +
    '  1 = emerging / partially demonstrated\n' +
    '  2 = clear and effective\n' +
    'Use null for skills not relevant to this prompt type.\n\n' +
    'Return ONLY this JSON structure:\n' +
    '{\n' +
    '  "argumentation": <0|1|2|null>,\n' +
    '  "causation": <0|1|2|null>,\n' +
    '  "comparison": <0|1|2|null>,\n' +
    '  "ccot": <0|1|2|null>,\n' +
    '  "contextualization": <0|1|2|null>,\n' +
    '  "evidence": <0|1|2|null>,\n' +
    '  "sourcing": <0|1|2|null>,\n' +
    '  "feedbackSummary": "<2–3 sentence teacher-facing analysis>",\n' +
    '  "misconceptions": ["<specific historical misconceptions detected, or empty array>"],\n' +
    '  "strengths": ["<specific historical thinking strengths, or empty array>"]\n' +
    '}'
  );
}

// ─── Write Outputs ──────────────────────────────────────────────────────────────

function writeAnalysisOutput_(ss, analysis, rowData, sourceRowIndex) {
  const sheet = ss.getSheetByName(CONFIG.TABS.ANALYSIS);
  if (!sheet) return;

  sheet.appendRow([
    sourceRowIndex,
    new Date(),
    rowData[COL.STUDENT_NAME],
    rowData[COL.CLASS_PERIOD],
    rowData[COL.TOPIC],
    rowData[COL.PROMPT_ID],
    rowData[COL.RESPONSE_TYPE],
    rowData[COL.SKILL_FOCUS],
    rowData[COL.REVISION_ATTEMPT],
    rowData[COL.CONFIDENCE_LEVEL],
    analysis.argumentation,
    analysis.causation,
    analysis.comparison,
    analysis.ccot,
    analysis.contextualization,
    analysis.evidence,
    analysis.sourcing,
    analysis.feedbackSummary || '',
    (analysis.misconceptions || []).join('; '),
    (analysis.strengths || []).join('; '),
  ]);
}

function updateSkillsMatrix_(ss, analysis, rowData) {
  const sheet = ss.getSheetByName(CONFIG.TABS.SKILLS);
  if (!sheet) return;

  const studentName = String(rowData[COL.STUDENT_NAME] || '').trim();
  const classPeriod = String(rowData[COL.CLASS_PERIOD] || '').trim();
  if (!studentName) return;

  const data = sheet.getDataRange().getValues();
  const skillKeys = ['argumentation', 'causation', 'comparison', 'ccot', 'contextualization', 'evidence', 'sourcing'];
  // Columns: 0=Name, 1=Period, 2–8=skills, 9=count, 10=lastUpdated

  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === studentName && String(data[i][1]).trim() === classPeriod) {
      rowIndex = i;
      break;
    }
  }

  if (rowIndex === -1) {
    const newRow = [studentName, classPeriod];
    skillKeys.forEach(skill => {
      const val = analysis[skill];
      newRow.push(val !== null && val !== undefined ? val : '');
    });
    newRow.push(1, new Date());
    sheet.appendRow(newRow);
    return;
  }

  // Update running averages for non-null scores
  const existingCount = Number(data[rowIndex][9]) || 0;
  const newCount = existingCount + 1;
  const updatedRow = [studentName, classPeriod];

  skillKeys.forEach((skill, i) => {
    const newScore = analysis[skill];
    const existingVal = data[rowIndex][2 + i];
    if (newScore === null || newScore === undefined) {
      updatedRow.push(existingVal !== '' ? existingVal : '');
    } else {
      const prevAvg = existingVal !== '' ? Number(existingVal) : null;
      if (prevAvg === null) {
        updatedRow.push(newScore);
      } else {
        updatedRow.push(Math.round(((prevAvg * existingCount + newScore) / newCount) * 100) / 100);
      }
    }
  });

  updatedRow.push(newCount, new Date());
  sheet.getRange(rowIndex + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
}

function updateTopicMastery_(ss, analysis, rowData) {
  const sheet = ss.getSheetByName(CONFIG.TABS.MASTERY);
  if (!sheet) return;

  const studentName = String(rowData[COL.STUDENT_NAME] || '').trim();
  const classPeriod = String(rowData[COL.CLASS_PERIOD] || '').trim();
  const topic = String(rowData[COL.TOPIC] || '').trim();
  if (!studentName || !topic) return;

  const skillKeys = ['argumentation', 'causation', 'comparison', 'ccot', 'contextualization', 'evidence', 'sourcing'];
  const scores = skillKeys.map(s => analysis[s]).filter(v => v !== null && v !== undefined);
  const avgScore = scores.length
    ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100
    : null;

  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (
      String(data[i][0]).trim() === studentName &&
      String(data[i][1]).trim() === classPeriod &&
      String(data[i][2]).trim() === topic
    ) {
      rowIndex = i;
      break;
    }
  }

  if (rowIndex === -1) {
    sheet.appendRow([studentName, classPeriod, topic, avgScore, 1, new Date()]);
    return;
  }

  const existingCount = Number(data[rowIndex][4]) || 0;
  const existingAvg = Number(data[rowIndex][3]) || 0;
  const newCount = existingCount + 1;
  const newAvg =
    avgScore !== null
      ? Math.round(((existingAvg * existingCount + avgScore) / newCount) * 100) / 100
      : existingAvg;

  sheet.getRange(rowIndex + 1, 1, 1, 6).setValues([[studentName, classPeriod, topic, newAvg, newCount, new Date()]]);
}

function markRowProcessed_(rawSheet, rowIndex) {
  rawSheet.getRange(rowIndex, COL.PROCESSED + 1).setValue('Processed ' + new Date().toISOString());
}

// ─── Batch Processing ───────────────────────────────────────────────────────────

function processPendingRows() {
  const ss = SpreadsheetApp.getActive();
  const rawSheet = ss.getSheetByName(CONFIG.TABS.RAW);
  if (!rawSheet) {
    SpreadsheetApp.getUi().alert('Raw Responses tab not found. Run Setup first.');
    return;
  }

  const data = rawSheet.getDataRange().getValues();
  let processed = 0;
  let skipped = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (row[COL.PROCESSED] || !String(row[COL.STUDENT_RESPONSE] || '').trim()) {
      skipped++;
      continue;
    }

    try {
      const analysis = analyzeResponseWithGemini_(row);
      if (analysis) {
        writeAnalysisOutput_(ss, analysis, row, i + 1);
        updateSkillsMatrix_(ss, analysis, row);
        updateTopicMastery_(ss, analysis, row);
        markRowProcessed_(rawSheet, i + 1);
        processed++;
      }
    } catch (err) {
      Logger.log('Error on row ' + (i + 1) + ': ' + err.toString());
    }

    // Stay within Gemini free-tier rate limits (~15 requests/min)
    Utilities.sleep(4000);
  }

  SpreadsheetApp.getUi().alert(
    'Batch processing complete.\n' +
    'Processed: ' + processed + '\n' +
    'Skipped (already done or blank): ' + skipped
  );
}

// ─── Class Insights ─────────────────────────────────────────────────────────────

function promptGenerateClassInsight() {
  const ui = SpreadsheetApp.getUi();
  const periodResult = ui.prompt(
    'Generate Class Insight',
    'Enter class period (e.g., Silver 1):',
    ui.ButtonSet.OK_CANCEL
  );
  if (periodResult.getSelectedButton() !== ui.Button.OK) return;

  const topicResult = ui.prompt(
    'Generate Class Insight',
    'Enter topic (e.g., 1.1):',
    ui.ButtonSet.OK_CANCEL
  );
  if (topicResult.getSelectedButton() !== ui.Button.OK) return;

  generateClassInsight(periodResult.getResponseText().trim(), topicResult.getResponseText().trim());
}

function generateClassInsight(classPeriod, topic) {
  if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'PASTE_YOUR_GEMINI_API_KEY_HERE') {
    SpreadsheetApp.getUi().alert('Set CONFIG.GEMINI_API_KEY before generating insights.');
    return;
  }

  const ss = SpreadsheetApp.getActive();
  const analysisSheet = ss.getSheetByName(CONFIG.TABS.ANALYSIS);
  if (!analysisSheet) {
    SpreadsheetApp.getUi().alert('AI Analysis Outputs tab not found. Run setup and process rows first.');
    return;
  }

  const data = analysisSheet.getDataRange().getValues();
  // Analysis tab columns: 0=sourceRow,1=processedAt,2=name,3=period,4=topic,
  //   5=promptId,6=responseType,7=skillFocus,8=revision,9=confidence,
  //   10=arg,11=cau,12=com,13=ccot,14=ctx,15=evd,16=src,17=feedback,18=misc,19=strengths

  const filtered = data.slice(1).filter(row => {
    return (
      String(row[3] || '').trim().toLowerCase().includes(classPeriod.toLowerCase()) &&
      String(row[4] || '').trim().toLowerCase().includes(topic.toLowerCase())
    );
  });

  if (!filtered.length) {
    SpreadsheetApp.getUi().alert('No analyzed responses found for ' + classPeriod + ' / Topic ' + topic + '.');
    return;
  }

  const skillCols = { Argumentation: 10, Causation: 11, Comparison: 12, CCOT: 13, Contextualization: 14, Evidence: 15, Sourcing: 16 };
  const skillAverages = {};
  Object.entries(skillCols).forEach(([skill, col]) => {
    const vals = filtered.map(r => r[col]).filter(v => v !== null && v !== undefined && v !== '');
    skillAverages[skill] = vals.length
      ? Math.round((vals.reduce((a, b) => a + Number(b), 0) / vals.length) * 100) / 100
      : null;
  });

  const allMisconceptions = filtered.flatMap(r =>
    String(r[18] || '').split(';').map(m => m.trim()).filter(Boolean)
  );
  const misconceptionCounts = allMisconceptions.reduce((acc, m) => {
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {});
  const topMisconceptions = Object.entries(misconceptionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([m]) => m);

  const avgConfidence = filtered.reduce((sum, r) => sum + (Number(r[9]) || 0), 0) / filtered.length;

  const insightPrompt =
    'You are an AP World History instructional coach. ' +
    'Generate a brief, actionable teacher insight. Return ONLY this JSON — no other text.\n\n' +
    'Class Period: ' + classPeriod + '\n' +
    'Topic: ' + topic + '\n' +
    'Response Count: ' + filtered.length + '\n' +
    'Average Confidence: ' + avgConfidence.toFixed(1) + '/5\n\n' +
    'Skill Averages (0–2 scale):\n' +
    Object.entries(skillAverages)
      .filter(([, v]) => v !== null)
      .map(([k, v]) => '  ' + k + ': ' + v)
      .join('\n') + '\n\n' +
    'Top Misconceptions Detected:\n' +
    (topMisconceptions.length ? topMisconceptions.map(m => '  - ' + m).join('\n') : '  None detected') + '\n\n' +
    'Return ONLY:\n' +
    '{\n' +
    '  "insightSummary": "<2–3 sentence class-level summary>",\n' +
    '  "skillGaps": ["<skill names below 1.0 that need attention>"],\n' +
    '  "recommendations": ["<2–3 specific actionable teaching moves>"]\n' +
    '}';

  const url =
    'https://generativelanguage.googleapis.com/v1beta/models/' +
    CONFIG.GEMINI_MODEL +
    ':generateContent?key=' +
    CONFIG.GEMINI_API_KEY;

  let insight;
  try {
    const resp = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        contents: [{ parts: [{ text: insightPrompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.4 },
      }),
      muteHttpExceptions: true,
    });
    const json = JSON.parse(resp.getContentText());
    insight = JSON.parse(json.candidates[0].content.parts[0].text);
  } catch (err) {
    Logger.log('Insight generation error: ' + err.toString());
    SpreadsheetApp.getUi().alert('Error generating insight. Check Apps Script execution logs.');
    return;
  }

  const insightsSheet = ss.getSheetByName(CONFIG.TABS.INSIGHTS);
  if (insightsSheet) {
    insightsSheet.appendRow([
      new Date(),
      classPeriod,
      topic,
      insight.insightSummary || '',
      topMisconceptions.join('; '),
      (insight.skillGaps || []).join('; '),
      (insight.recommendations || []).join(' | '),
    ]);
  }

  SpreadsheetApp.getUi().alert(
    'Class insight generated for ' + classPeriod + ' / Topic ' + topic + '.\n' +
    'See the "Teacher Insights" tab.'
  );
}
