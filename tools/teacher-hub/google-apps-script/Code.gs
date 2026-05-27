/**
 * BeHistorical Teacher Hub Analysis Layer
 *
 * Paste this file into Extensions > Apps Script inside the Google Sheet that receives
 * BeHistorical Student Response Form submissions. Deploy as a Web App only after
 * reviewing school privacy expectations.
 *
 * Prototype goal:
 * - Read Google Form responses from the active response Sheet.
 * - Filter by Unit, Topic, Response Type, Prompt ID, and Class Period.
 * - Generate a structured Teacher Hub JSON payload.
 * - Optionally write the result to TeacherHub_Analysis and TeacherHub_StudentFlags.
 * - Serve the latest analysis to the GitHub Pages Teacher Hub through doGet().
 */

const BEHISTORICAL_CONFIG = {
  responseSheetName: 'Form Responses 1',
  analysisSheetName: 'TeacherHub_Analysis',
  studentFlagsSheetName: 'TeacherHub_StudentFlags',
  settingsSheetName: 'TeacherHub_Settings',
  defaultUnit: 'Unit 1 - The Global Tapestry',
  defaultTopic: '1.1 - Song China',
  shortResponseThreshold: 80,
  lowConfidenceThreshold: 3,
  responseTypes: [
    'First and 10',
    'AP Skill Builder',
    'Checkpoint 1',
    'Evidence Lab',
    'Primary Source',
    'Checkpoint 2'
  ]
};

const HEADER_ALIASES = {
  timestamp: ['Timestamp'],
  studentName: ['Student Name', 'Name', 'Student'],
  classPeriod: ['Class Period', 'Period'],
  unit: ['Unit'],
  topic: ['Topic'],
  responseType: ['Response Type', 'Question Type', 'Activity'],
  promptId: ['Prompt ID', 'Prompt Id', 'PromptID'],
  studentResponse: ['Student Response', 'Response', 'Written Response'],
  confidenceLevel: ['Confidence Level', 'Confidence', 'Confidence Check'],
  aiCoachingReflection: ['AI Coaching Reflection', 'AI Reflection', 'Revision Notes']
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('BeHistorical')
    .addItem('Analyze Topic 1.1', 'analyzeTopic11')
    .addItem('Analyze Selected Filters...', 'showAnalyzeSidebar')
    .addSeparator()
    .addItem('Create/Repair Teacher Hub Tabs', 'ensureTeacherHubTabs')
    .addToUi();
}

function analyzeTopic11() {
  const payload = buildTeacherHubAnalysis_({
    unit: BEHISTORICAL_CONFIG.defaultUnit,
    topic: BEHISTORICAL_CONFIG.defaultTopic,
    responseType: 'All Response Types',
    classPeriod: 'All Periods'
  });
  writeTeacherHubAnalysis_(payload);
  SpreadsheetApp.getUi().alert('Teacher Hub analysis updated for Topic 1.1.');
}

function showAnalyzeSidebar() {
  const html = HtmlService.createHtmlOutput(`
    <div style="font-family:Arial,sans-serif;padding:14px;line-height:1.4">
      <h2 style="margin-top:0">BeHistorical Analysis</h2>
      <label>Topic<br><input id="topic" style="width:100%" value="${BEHISTORICAL_CONFIG.defaultTopic}"></label><br><br>
      <label>Response Type<br>
        <select id="responseType" style="width:100%">
          <option>All Response Types</option>
          ${BEHISTORICAL_CONFIG.responseTypes.map(type => `<option>${type}</option>`).join('')}
        </select>
      </label><br><br>
      <label>Class Period<br><input id="classPeriod" style="width:100%" value="All Periods"></label><br><br>
      <button onclick="run()">Analyze</button>
      <p id="status"></p>
      <script>
        function run(){
          document.getElementById('status').textContent = 'Analyzing...';
          google.script.run
            .withSuccessHandler(function(){ document.getElementById('status').textContent = 'Analysis complete.'; })
            .withFailureHandler(function(err){ document.getElementById('status').textContent = err.message || err; })
            .analyzeWithFilters({
              topic: document.getElementById('topic').value,
              responseType: document.getElementById('responseType').value,
              classPeriod: document.getElementById('classPeriod').value
            });
        }
      </script>
    </div>
  `).setTitle('BeHistorical Analysis');
  SpreadsheetApp.getUi().showSidebar(html);
}

function analyzeWithFilters(filters) {
  const payload = buildTeacherHubAnalysis_({
    unit: filters.unit || BEHISTORICAL_CONFIG.defaultUnit,
    topic: filters.topic || BEHISTORICAL_CONFIG.defaultTopic,
    responseType: filters.responseType || 'All Response Types',
    classPeriod: filters.classPeriod || 'All Periods'
  });
  writeTeacherHubAnalysis_(payload);
  return payload;
}

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const payload = buildTeacherHubAnalysis_({
    unit: params.unit || BEHISTORICAL_CONFIG.defaultUnit,
    topic: params.topic || BEHISTORICAL_CONFIG.defaultTopic,
    responseType: params.responseType || 'All Response Types',
    classPeriod: params.classPeriod || 'All Periods'
  });

  if (String(params.write || '').toLowerCase() === 'true') {
    writeTeacherHubAnalysis_(payload);
  }

  return ContentService
    .createTextOutput(JSON.stringify(payload, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildTeacherHubAnalysis_(filters) {
  const rows = getNormalizedResponseRows_();
  const filtered = filterRows_(rows, filters);
  const totalResponses = filtered.length;
  const confidenceValues = filtered
    .map(row => parseConfidence_(row.confidenceLevel))
    .filter(value => !isNaN(value));
  const averageConfidence = confidenceValues.length
    ? roundTo_(confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length, 1)
    : null;

  const lowConfidenceRows = filtered.filter(row => parseConfidence_(row.confidenceLevel) < BEHISTORICAL_CONFIG.lowConfidenceThreshold);
  const shortRows = filtered.filter(row => String(row.studentResponse || '').trim().length > 0 && String(row.studentResponse || '').trim().length < BEHISTORICAL_CONFIG.shortResponseThreshold);
  const blankRows = filtered.filter(row => !String(row.studentResponse || '').trim());
  const responseTypeCounts = countBy_(filtered, 'responseType');
  const periodCounts = countBy_(filtered, 'classPeriod');
  const promptCounts = countBy_(filtered, 'promptId');
  const evidence = detectCommonEvidence_(filtered);
  const misconceptions = detectCommonMisconceptions_(filtered);
  const skillGaps = detectSkillGaps_(filtered);
  const studentFlags = buildStudentFlags_(filtered, lowConfidenceRows, shortRows, blankRows, misconceptions, skillGaps);
  const reteachSuggestions = buildReteachSuggestions_(misconceptions, skillGaps, averageConfidence, totalResponses);

  return {
    generatedAt: new Date().toISOString(),
    source: 'Google Sheets + BeHistorical Apps Script prototype',
    filters: {
      unit: filters.unit || BEHISTORICAL_CONFIG.defaultUnit,
      topic: filters.topic || BEHISTORICAL_CONFIG.defaultTopic,
      responseType: filters.responseType || 'All Response Types',
      classPeriod: filters.classPeriod || 'All Periods'
    },
    summary: {
      totalResponses,
      completionRate: totalResponses ? 'Collected' : 'No responses yet',
      averageConfidence,
      lowConfidenceCount: lowConfidenceRows.length,
      shortResponseCount: shortRows.length,
      blankResponseCount: blankRows.length,
      responseTypeCounts,
      periodCounts,
      promptCounts
    },
    classSummary: buildClassSummary_(totalResponses, averageConfidence, evidence, misconceptions, skillGaps),
    commonEvidence: evidence,
    topMisconceptions: misconceptions,
    skillGaps,
    reteachSuggestions,
    studentFlags,
    aiPrompt: buildAiPrompt_(filtered, filters),
    rows: filtered.map(row => ({
      timestamp: row.timestamp,
      studentName: row.studentName,
      classPeriod: row.classPeriod,
      responseType: row.responseType,
      promptId: row.promptId,
      confidenceLevel: row.confidenceLevel,
      studentResponse: row.studentResponse
    }))
  };
}

function getNormalizedResponseRows_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(BEHISTORICAL_CONFIG.responseSheetName);
  if (!sheet) throw new Error(`Missing response sheet: ${BEHISTORICAL_CONFIG.responseSheetName}`);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  const index = buildHeaderIndex_(headers);
  return values.slice(1).map(row => normalizeRow_(row, index));
}

function buildHeaderIndex_(headers) {
  const index = {};
  Object.keys(HEADER_ALIASES).forEach(key => {
    const aliases = HEADER_ALIASES[key];
    const found = aliases.map(alias => headers.indexOf(alias)).find(position => position >= 0);
    index[key] = typeof found === 'number' ? found : -1;
  });
  return index;
}

function normalizeRow_(row, index) {
  const get = key => index[key] >= 0 ? row[index[key]] : '';
  return {
    timestamp: formatCell_(get('timestamp')),
    studentName: formatCell_(get('studentName')),
    classPeriod: formatCell_(get('classPeriod')),
    unit: formatCell_(get('unit')),
    topic: formatCell_(get('topic')),
    responseType: formatCell_(get('responseType')),
    promptId: formatCell_(get('promptId')),
    studentResponse: formatCell_(get('studentResponse')),
    confidenceLevel: formatCell_(get('confidenceLevel')),
    aiCoachingReflection: formatCell_(get('aiCoachingReflection'))
  };
}

function filterRows_(rows, filters) {
  const topicNeedle = normalizeFilter_(filters.topic || '');
  const responseType = normalizeFilter_(filters.responseType || 'All Response Types');
  const classPeriod = normalizeFilter_(filters.classPeriod || 'All Periods');
  return rows.filter(row => {
    const topicMatches = !topicNeedle || normalizeFilter_(row.topic).includes(topicNeedle.split(' - ')[0]) || normalizeFilter_(row.topic) === topicNeedle;
    const responseMatches = responseType === 'all response types' || !responseType || normalizeFilter_(row.responseType) === responseType;
    const periodMatches = classPeriod === 'all periods' || !classPeriod || normalizeFilter_(row.classPeriod) === classPeriod;
    return topicMatches && responseMatches && periodMatches;
  });
}

function detectCommonEvidence_(rows) {
  const evidenceBank = [
    ['civil service exam', ['civil service', 'exam', 'keju']],
    ['Confucian bureaucracy', ['confucian', 'bureaucracy', 'bureaucratic']],
    ['scholar-officials', ['scholar official', 'scholar-official', 'officials']],
    ['Champa rice', ['champa', 'rice']],
    ['Grand Canal', ['grand canal', 'canal']],
    ['paper money / jiaozi', ['paper money', 'jiaozi', 'flying cash']],
    ['Neo-Confucianism', ['neo-confucian', 'zhu xi']],
    ['Buddhism', ['buddhism', 'buddhist', 'mahayana', 'theravada', 'tibetan']],
    ['urbanization / Hangzhou', ['urban', 'city', 'cities', 'hangzhou', 'kaifeng']],
    ['commercialization', ['commercial', 'trade', 'market', 'merchant']]
  ];
  return scoreKeywordBank_(rows, evidenceBank, 6);
}

function detectCommonMisconceptions_(rows) {
  const misconceptionBank = [
    ['Civil service exam treated as pure meritocracy', ['everyone could take', 'anyone could take', 'pure meritocracy', 'open to everyone']],
    ['Economic strength confused with military strength', ['song was militarily strong', 'strong army', 'powerful military']],
    ['Champa rice described as a Chinese invention', ['invented champa', 'created champa', 'china invented rice']],
    ['Neo-Confucianism and original Confucianism treated as identical', ['same as confucianism', 'no difference', 'identical']],
    ['Paper money described as fully replacing coins', ['replaced coins', 'only paper money', 'no coins']]
  ];
  return scoreKeywordBank_(rows, misconceptionBank, 5);
}

function detectSkillGaps_(rows) {
  const gaps = [];
  const withText = rows.filter(row => String(row.studentResponse || '').trim());
  if (!withText.length) return gaps;
  const becauseCount = withText.filter(row => /because|therefore|this shows|this helped|as a result|led to|so that/i.test(row.studentResponse)).length;
  const evidenceCount = withText.filter(row => /civil service|confucian|champa|canal|paper money|jiaozi|buddh|neo-confucian|bureaucr/i.test(row.studentResponse)).length;
  const claimCount = withText.filter(row => String(row.studentResponse || '').trim().split(/\s+/).length >= 25).length;
  if (claimCount / withText.length < 0.7) gaps.push('Responses are often too short to make a complete historical claim.');
  if (evidenceCount / withText.length < 0.7) gaps.push('Many responses need more specific historical evidence.');
  if (becauseCount / withText.length < 0.7) gaps.push('Many responses need stronger reasoning that connects evidence to the claim.');
  return gaps;
}

function buildStudentFlags_(rows, lowConfidenceRows, shortRows, blankRows, misconceptions, skillGaps) {
  const flags = [];
  blankRows.forEach(row => flags.push(makeFlag_(row, 'High', 'Blank or missing response', 'Have the student complete the response before analysis.')));
  shortRows.forEach(row => flags.push(makeFlag_(row, 'Medium', 'Short response', 'Ask for a complete claim, specific evidence, and one because statement.')));
  lowConfidenceRows.forEach(row => flags.push(makeFlag_(row, 'Medium', 'Low confidence', 'Conference briefly or assign a targeted revision question.')));
  rows.forEach(row => {
    const text = String(row.studentResponse || '').toLowerCase();
    if (text && !/because|therefore|this shows|as a result|led to|so that/i.test(text)) {
      flags.push(makeFlag_(row, 'Medium', 'Missing reasoning language', 'Ask: Why does this evidence prove your claim?'));
    }
  });
  return dedupeFlags_(flags).slice(0, 30);
}

function makeFlag_(row, status, issue, next) {
  return {
    student: row.studentName || 'Unnamed student',
    classPeriod: row.classPeriod || '',
    task: row.responseType || row.promptId || 'Unknown task',
    status,
    issue,
    next
  };
}

function buildReteachSuggestions_(misconceptions, skillGaps, averageConfidence, totalResponses) {
  const suggestions = [];
  if (!totalResponses) {
    suggestions.push({ priority: 'High', focus: 'No response data yet', action: 'Have students submit one checkpoint response before using the dashboard pulse.' });
    return suggestions;
  }
  skillGaps.forEach(gap => suggestions.push({ priority: 'High', focus: gap, action: 'Model a one-paragraph AP response using claim + evidence + because reasoning.' }));
  misconceptions.forEach(mis => suggestions.push({ priority: 'Medium', focus: mis, action: 'Use a two-minute misconception correction before the next activity.' }));
  if (averageConfidence !== null && averageConfidence < 3) {
    suggestions.push({ priority: 'High', focus: 'Low class confidence', action: 'Use a low-stakes pair revision before collecting the next checkpoint.' });
  }
  if (!suggestions.length) {
    suggestions.push({ priority: 'Low', focus: 'Responses look stable', action: 'Move forward, but use one model response to reinforce reasoning.' });
  }
  return suggestions.slice(0, 8);
}

function buildClassSummary_(totalResponses, averageConfidence, evidence, misconceptions, skillGaps) {
  if (!totalResponses) return 'No matching responses have been collected yet.';
  const confidenceText = averageConfidence === null ? 'Confidence data is not available' : `Average confidence is ${averageConfidence}/5`;
  const evidenceText = evidence.length ? `Common evidence includes ${evidence.slice(0, 3).join(', ')}.` : 'Students are not yet using much detectable specific evidence.';
  const misconceptionText = misconceptions.length ? `Watch for: ${misconceptions.slice(0, 2).join('; ')}.` : 'No high-frequency misconception pattern was detected by the rule-based scan.';
  const skillText = skillGaps.length ? `Main skill gap: ${skillGaps[0]}` : 'Most responses include basic claim/evidence/reasoning markers.';
  return `${totalResponses} matching responses were analyzed. ${confidenceText}. ${evidenceText} ${misconceptionText} ${skillText}`;
}

function buildAiPrompt_(rows, filters) {
  const responseLines = rows.map((row, index) => {
    return `${index + 1}. ${row.studentName || 'Student'} | ${row.classPeriod || 'No period'} | ${row.responseType || 'No type'} | Confidence: ${row.confidenceLevel || 'N/A'}\n${row.studentResponse || '[blank]'}`;
  }).join('\n\n');
  return `You are an AP World History instructional coach helping analyze BeHistorical student responses.\n\nTopic: ${filters.topic || BEHISTORICAL_CONFIG.defaultTopic}\nResponse Type: ${filters.responseType || 'All Response Types'}\nClass Period: ${filters.classPeriod || 'All Periods'}\n\nAnalyze the class set and return:\n1. A concise class summary\n2. Common accurate evidence\n3. Common misconceptions\n4. Missing AP skill components, especially claim/evidence/reasoning\n5. Students who may need follow-up, identified by name only if provided\n6. One 3-minute reteach activity\n\nStudent responses:\n\n${responseLines}`;
}

function writeTeacherHubAnalysis_(payload) {
  ensureTeacherHubTabs();
  const ss = SpreadsheetApp.getActive();
  const analysisSheet = ss.getSheetByName(BEHISTORICAL_CONFIG.analysisSheetName);
  const flagsSheet = ss.getSheetByName(BEHISTORICAL_CONFIG.studentFlagsSheetName);
  analysisSheet.clear();
  analysisSheet.getRange(1, 1, 1, 2).setValues([['Field', 'Value']]);
  const rows = [
    ['generatedAt', payload.generatedAt],
    ['unit', payload.filters.unit],
    ['topic', payload.filters.topic],
    ['responseType', payload.filters.responseType],
    ['classPeriod', payload.filters.classPeriod],
    ['totalResponses', payload.summary.totalResponses],
    ['averageConfidence', payload.summary.averageConfidence],
    ['lowConfidenceCount', payload.summary.lowConfidenceCount],
    ['shortResponseCount', payload.summary.shortResponseCount],
    ['blankResponseCount', payload.summary.blankResponseCount],
    ['classSummary', payload.classSummary],
    ['commonEvidence', payload.commonEvidence.join(' | ')],
    ['topMisconceptions', payload.topMisconceptions.join(' | ')],
    ['skillGaps', payload.skillGaps.join(' | ')],
    ['reteachSuggestionsJson', JSON.stringify(payload.reteachSuggestions)],
    ['teacherHubJson', JSON.stringify(payload)]
  ];
  analysisSheet.getRange(2, 1, rows.length, 2).setValues(rows);
  analysisSheet.autoResizeColumns(1, 2);

  flagsSheet.clear();
  flagsSheet.getRange(1, 1, 1, 6).setValues([['Student', 'Class Period', 'Task', 'Status', 'Issue', 'Next Step']]);
  if (payload.studentFlags.length) {
    flagsSheet.getRange(2, 1, payload.studentFlags.length, 6).setValues(payload.studentFlags.map(flag => [
      flag.student,
      flag.classPeriod,
      flag.task,
      flag.status,
      flag.issue,
      flag.next
    ]));
  }
  flagsSheet.autoResizeColumns(1, 6);
}

function ensureTeacherHubTabs() {
  const ss = SpreadsheetApp.getActive();
  [
    BEHISTORICAL_CONFIG.analysisSheetName,
    BEHISTORICAL_CONFIG.studentFlagsSheetName,
    BEHISTORICAL_CONFIG.settingsSheetName
  ].forEach(name => {
    if (!ss.getSheetByName(name)) ss.insertSheet(name);
  });
}

function countBy_(rows, key) {
  return rows.reduce((counts, row) => {
    const value = row[key] || 'Blank';
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function scoreKeywordBank_(rows, bank, limit) {
  const scores = bank.map(([label, keywords]) => {
    const count = rows.filter(row => {
      const text = String(row.studentResponse || '').toLowerCase();
      return keywords.some(keyword => text.includes(keyword.toLowerCase()));
    }).length;
    return { label, count };
  }).filter(item => item.count > 0);
  scores.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  return scores.slice(0, limit).map(item => item.label);
}

function parseConfidence_(value) {
  const match = String(value || '').match(/[1-5]/);
  return match ? Number(match[0]) : NaN;
}

function formatCell_(value) {
  if (value instanceof Date) return value.toISOString();
  return String(value == null ? '' : value).trim();
}

function normalizeFilter_(value) {
  return String(value || '').trim().toLowerCase();
}

function roundTo_(value, places) {
  const factor = Math.pow(10, places || 0);
  return Math.round(value * factor) / factor;
}

function dedupeFlags_(flags) {
  const seen = new Set();
  return flags.filter(flag => {
    const key = [flag.student, flag.classPeriod, flag.task, flag.issue].join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
