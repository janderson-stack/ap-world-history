const byId=id=>document.getElementById(id);
const md=s=>String(s||'').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
function sanitizeImageUrl(url){
  const raw=String(url||'').trim();
  if(!raw)return '';
  if(raw.includes('commons.wikimedia.org/wiki/Special:FilePath/'))return raw;
  const thumbMatch=raw.match(/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^/]+\/[^/]+\/([^/?#]+)/i);
  if(thumbMatch){return `https://commons.wikimedia.org/wiki/Special:FilePath/${thumbMatch[1]}`;}
  const fileMatch=raw.match(/commons\.wikimedia\.org\/wiki\/File:([^?#]+)/i);
  if(fileMatch){return `https://commons.wikimedia.org/wiki/Special:FilePath/${fileMatch[1]}`;}
  return raw;
}
function bg(url){return `url('${sanitizeImageUrl(url)}')`;}
const T=window.FOUNDATION_TOPIC;

// ── Meta ──────────────────────────────────────────────────────────────────────
document.title=`BeHistorical | ${T.code} · ${T.title}`;
byId('lesson-title').textContent=T.title;
byId('lesson-subtitle').textContent=T.subtitle;

const lectTitle=byId('lecture-title');
if(lectTitle)lectTitle.textContent=T.title+' — Lecture Cards';
const lectIntro=byId('lecture-intro');
if(lectIntro)lectIntro.textContent='Use these cards from the main page. Each card opens a projection-friendly pop-up with enlarged content and an image.';

// ── Data helpers ───────────────────────────────────────────────────────────────
const first10=T.first10||T.reading;
const evidence=T.evidence||{title:'Evidence Lab',task:'Use visual and textual evidence from this topic to support a historical claim.',prompt:'What evidence from this topic best supports the main idea?',items:[{title:T.map.title,url:T.map.url,sourceUrl:T.map.sourceUrl,caption:T.map.caption,prompt:T.map.prompt}]};
const mapKey=T.map.key||[];
const timeline=T.timeline||[];
const aiCoach=T.aiCoach||{title:'AI Historical Coach',intro:'Use these questions to deepen your historical reasoning before submitting your response.',prompts:['What pattern do you notice?','How did geography influence this development?','What changed, and what stayed the same?']};
const blockPlan=T.blockPlan||[
  ['0-10','Launch Question','Students answer the essential question in one sentence, then revise after the lesson.'],
  ['10-25','Map & Context','Use the map module to build geographic or regional context.'],
  ['25-45','First & 10','Read the narrative foundation and mark one claim, one evidence detail, and one confusion.'],
  ['45-65','Lecture Cards','Use projection-friendly lecture cards for direct instruction and discussion.'],
  ['65-80','AP Skill Builder','Practice the day\'s AP thinking skill with a short written response.'],
  ['80-90','Checkpoint','Complete the exit ticket and confidence reflection.']
];

// Distinct images per module — draw from lecture segments to avoid all-same-image
function segImg(i){return T.lecture&&T.lecture[i]&&T.lecture[i].image?sanitizeImageUrl(T.lecture[i].image.url):sanitizeImageUrl(T.map.url);}

// Hardcoded images for module types that don't have a natural content image
const FIRST10_IMG='https://commons.wikimedia.org/wiki/Special:FilePath/Silk_route.jpg';
const SOCRATES_IMG='https://commons.wikimedia.org/wiki/Special:FilePath/Socrates_Louvre.jpg';
const SKILL_IMG='https://commons.wikimedia.org/wiki/Special:FilePath/Song%20Imperial%20Examination.JPG';

// ── Block Plan (Lesson Command Center) ────────────────────────────────────────
const roadmapEl=byId('block-plan-roadmap');
if(roadmapEl){
  roadmapEl.innerHTML=`
    <div class="roadmap-step"><strong>1. Build Context</strong>Launch question, map check, and thematic orientation.</div>
    <div class="roadmap-step"><strong>2. Learn &amp; Practice</strong>First &amp; 10 reading, lecture cards, and module work.</div>
    <div class="roadmap-step"><strong>3. Check Understanding</strong>AP Skill Builder, checkpoint, and confidence reflection.</div>`;
}

// ── Learning Targets (inline Unit-1 style) ────────────────────────────────────
byId('inline-targets').innerHTML=`
  <div class="inline-targets">
    <article class="inline-target-card">
      <h3>Learning Targets</h3>
      ${T.learningTargets.map((t,i)=>`
        <div class="inline-target-item">
          <span class="inline-target-number">${i+1}</span>
          <div class="inline-target-text"><p>${t}</p></div>
        </div>`).join('')}
    </article>
    <article class="inline-target-card">
      <h3>Success Criteria</h3>
      ${T.successCriteria.map((c,i)=>`
        <div class="inline-target-item">
          <span class="inline-target-number">${i+1}</span>
          <div class="inline-target-text"><p>${c}</p></div>
        </div>`).join('')}
    </article>
  </div>`;

// ── Module grid ────────────────────────────────────────────────────────────────
const modules=[
  {id:'map',       label:'Module 01',title:'Map & Geography Check',        desc:T.map.desc||'Connect geography to historical development.',                   img:sanitizeImageUrl(T.map.url), render:renderMap},
  {id:'first10',   label:'Module 02',title:'First & 10 Reading',           desc:'Narrative foundation for today\'s Foundations topic.',                       img:FIRST10_IMG,                 render:renderFirst10},
  {id:'contentdelivery',label:'Module 03',title:'Content Delivery',        desc:'Jump down to the main lecture-card section.',                                img:segImg(1),                   jump:'#lecture'},
  {id:'timeline',  label:'Module 04',title:'Road to 1200 Timeline',        desc:'A visual progression that keeps the five-day bridge anchored in time.',       img:segImg(2),                   render:renderTimeline},
  {id:'terms',     label:'Module 05',title:'Foundation Terms',             desc:'Key vocabulary students need before AP World begins.',                        img:segImg(3),                   render:renderTerms},
  {id:'evidence',  label:'Module 06',title:'Evidence Lab',                 desc:evidence.task,                                                                img:sanitizeImageUrl(evidence.items&&evidence.items[0]?evidence.items[0].url:segImg(1)), render:renderEvidence},
  {id:'coach',     label:'Module 07',title:'Socrates AI Coach',            desc:'Socratic prompts that help students notice patterns and improve reasoning.',   img:SOCRATES_IMG,                render:renderCoach},
  {id:'skill',     label:'Module 08',title:T.skill.title,                  desc:T.skill.desc,                                                                 img:SKILL_IMG,                   render:renderSkill},
  {id:'checkpoint',label:'Module 09',title:T.checkpoint.title,             desc:'Exit ticket and checkpoint for this Foundations topic.',                       img:segImg(4),                   render:renderCheckpoint}
];

byId('module-grid').innerHTML=modules.map(m=>`
  <article class="module-card" tabindex="0" role="button"
    onclick="${m.jump?`jumpToSection('${m.jump}')`:`openModule('${m.id}')`}"
    onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();${m.jump?`jumpToSection('${m.jump}')`:`openModule('${m.id}')`}}"
    style="--module-img:${bg(m.img)}">
    <div class="module-label">${m.label}</div>
    <h3>${m.title}</h3>
    <p>${m.desc}</p>
  </article>`).join('');

// ── Lecture cards ──────────────────────────────────────────────────────────────
byId('main-lecture-grid').innerHTML=T.lecture.map((seg,i)=>`
  <article class="card dark-card lecture-topic-card" tabindex="0" role="button"
    onclick="openLecture(${i})"
    onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openLecture(${i})}">
    <h3>${seg.title}</h3>
    <ul class="lecture-list">${seg.bullets.map(b=>`<li>${md(b)}</li>`).join('')}</ul>
  </article>`).join('');

// ── Video clips ────────────────────────────────────────────────────────────────
byId('content-video-clips').innerHTML=T.videos.map(v=>{
  const preview=v.youtubeId?`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`:'';
  return `<article class="card video-card">
    <h3>Video Clip</h3>
    <div class="media-card">
      <div class="thumb video-thumb" style="${preview?`background-image:linear-gradient(rgba(26,28,29,.25),rgba(26,28,29,.55)),url('${preview}');background-size:cover;background-position:center`:''}"><span>Video Clip</span></div>
      <p><strong>${v.title}</strong></p>
      <p>${v.prompt}</p>
      <a class="btn" href="${v.url}" target="_blank" rel="noopener">Open Video</a>
    </div>
  </article>`;
}).join('');

// ── Modal controls ─────────────────────────────────────────────────────────────
function jumpToSection(sel){const el=document.querySelector(sel);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}

function openModule(id){
  const m=modules.find(x=>x.id===id);
  if(!m||m.jump)return;
  byId('pop-eyebrow').textContent=m.label;
  byId('pop-title').textContent=m.title;
  byId('pop-body').innerHTML=m.render();
  byId('pop-modal').classList.add('show');
  loadDrafts();
}
function closeModule(){byId('pop-modal').classList.remove('show');}

function openLecture(i){
  const seg=T.lecture[i];
  if(!seg)return;
  byId('lecture-modal-title').textContent=seg.title;
  byId('lecture-modal-bullets').innerHTML=seg.bullets.map(b=>`<li>${md(b)}</li>`).join('');
  const imgUrl=sanitizeImageUrl(seg.image&&seg.image.url?seg.image.url:'');
  byId('lecture-modal-img').src=imgUrl;
  byId('lecture-modal-img').alt=seg.image&&seg.image.title?seg.image.title:'';
  byId('lecture-modal-caption').innerHTML=seg.image?`<strong>${seg.image.title}</strong><br>${seg.image.caption}<br><a class="source-link" href="${seg.image.sourceUrl||seg.image.url}" target="_blank" rel="noopener">Open image source</a>`:'';
  byId('lecture-modal').classList.add('show');
}
function closeLectureModal(){byId('lecture-modal').classList.remove('show');}

function openImageLightbox(url,caption){
  byId('lightbox-img').src=sanitizeImageUrl(url);
  byId('lightbox-img').alt=caption||'';
  byId('lightbox-caption').textContent=caption||'';
  byId('lightbox').classList.add('show');
}
function closeLightbox(){byId('lightbox').classList.remove('show');}

// ── Module render functions ────────────────────────────────────────────────────

function renderMap(){
  return `
    <article class="card map-card">
      <div class="map-grid">
        <figure class="map-figure">
          <img src="${sanitizeImageUrl(T.map.url)}" alt="${T.map.title}" onclick="openImageLightbox('${sanitizeImageUrl(T.map.url)}','${T.map.title}')">
          <figcaption><strong>${T.map.title}</strong><br>${T.map.caption}<br><a class="source-link" href="${T.map.sourceUrl}" target="_blank" rel="noopener">Open map source</a></figcaption>
        </figure>
        <div class="map-notes">
          <h3>${T.map.title}</h3>
          <p>${T.map.desc||''}</p>
          <ul>${T.map.questions.map(q=>`<li>${q}</li>`).join('')}</ul>
          ${mapKey.length?`<div class="map-key"><h4>Map Key</h4>${mapKey.map(k=>`<div class="map-key-item"><div class="map-key-label">${k.label}</div><div>${k.detail}</div></div>`).join('')}</div>`:''}
          ${draft(`${T.id}-map`,T.map.prompt)}
        </div>
      </div>
    </article>`;
}

function renderFirst10(){
  if(first10.embedUrl){
    return `
      <div class="card" style="padding:0;overflow:hidden;border-radius:4px;">
        <iframe src="${first10.embedUrl}" style="width:100%;height:720px;border:none;display:block;" title="${first10.title}" loading="lazy"></iframe>
      </div>`;
  }
  return `
    <div class="card reading">
      <h3>${first10.title}</h3>
      ${(first10.paragraphs||[]).map(p=>`<p>${p}</p>`).join('')}
    </div>
    <div class="card" style="margin-top:1.25rem;">
      <h3>First &amp; 10 Response</h3>
      ${draft(`${T.id}-first10`,first10.prompt)}
    </div>`;
}

function renderTimeline(){
  return `
    <article class="card">
      <h3>Visual Timeline Strip</h3>
      <p>This strip places today's topic on the road to c.1200.</p>
      <div class="timeline-strip">
        ${timeline.map(t=>`<div class="timeline-node"><strong>${t.date}</strong><span>${t.event}</span></div>`).join('')}
      </div>
    </article>
    ${draft(`${T.id}-timeline`,T.timelinePrompt||'Which timeline moment best explains why the world of c.1200 did not emerge out of nowhere?')}`;
}

function renderTerms(){
  return `
    <article class="card">
      <h3>Terms to Know</h3>
      <p>${T.terms.map(x=>`<span class="term-chip">${x}</span>`).join('')}</p>
      <table class="mini-table">
        <tr><th>Term</th><th>Why it matters</th></tr>
        ${T.termTable.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}
      </table>
    </article>`;
}

function renderEvidence(){
  return `
    <div class="component-note"><strong>${evidence.title}</strong><br>${evidence.task}</div>
    <div class="pop-grid">
      ${evidence.items.map(item=>`
        <article class="card image-card pop-half">
          <img src="${sanitizeImageUrl(item.url)}" alt="${item.title}" onclick="openImageLightbox('${sanitizeImageUrl(item.url)}','${item.title}')">
          <div class="image-caption">
            <strong>${item.title}</strong><br>${item.caption}<br><em>${item.prompt}</em><br>
            <a class="source-link" href="${item.sourceUrl||item.url}" target="_blank" rel="noopener">Open source</a>
          </div>
        </article>`).join('')}
    </div>
    ${draft(`${T.id}-evidence`,evidence.prompt)}`;
}

function renderCoach(){
  return `
    <article class="card">
      <h3>${aiCoach.title}</h3>
      <p>${aiCoach.intro}</p>
      <div class="coach-list">
        ${aiCoach.prompts.map((p,i)=>`
          <div class="coach-prompt">
            <strong>Prompt ${i+1}</strong><span>${p}</span>
          </div>`).join('')}
      </div>
      <div class="magicschool-bridge" style="margin-top:1rem;">
        <span class="bridge-label">AI Coach</span>
        <a class="btn secondary" href="https://app.magicschool.ai/" target="_blank" rel="noopener">Open in MagicSchool</a>
      </div>
    </article>
    ${draft(`${T.id}-coach`,aiCoach.responsePrompt||'Use one AI coach prompt to improve your historical explanation.')}`;
}

function renderSkill(){
  return `
    <article class="card">
      <h3>${T.skill.title}</h3>
      <p>${T.skill.intro}</p>
      <div class="skill-steps">
        ${T.skill.steps.map((s,i)=>`<div class="skill-step"><strong>Step ${i+1}</strong>${s}</div>`).join('')}
      </div>
    </article>
    ${draft(`${T.id}-skill`,T.skill.prompt)}`;
}

function renderCheckpoint(){
  return `
    <article class="dark-callout">
      <h3>${T.checkpoint.title}</h3>
      <p>${T.checkpoint.prompt}</p>
    </article>
    <article class="card">
      <h3>Exit Ticket</h3>
      <p>${T.exitTicket||T.checkpoint.prompt}</p>
    </article>
    <article class="card">
      <h3>Strong Response Checklist</h3>
      <ul>${T.checkpoint.checklist.map(x=>`<li>${x}</li>`).join('')}</ul>
    </article>
    <div class="magicschool-bridge" style="margin-top:1rem;">
      <span class="bridge-label">Feedback Tool</span>
      <a class="btn secondary" href="https://app.magicschool.ai/" target="_blank" rel="noopener">Get AI Feedback</a>
    </div>
    ${draft(`${T.id}-checkpoint`,T.checkpoint.prompt)}`;
}

// ── Form integration ──────────────────────────────────────────────────────────
window.submitResponseToGoogleForm = window.submitResponseToGoogleForm || function(responseId, formUrl) {
  const responseEl = byId(responseId);
  const resultEl   = byId(responseId + '-result');
  const text       = responseEl ? (responseEl.value || '').trim() : '';
  const openForm   = () => window.open(formUrl, '_blank', 'noopener');
  if (!text) {
    if (resultEl) resultEl.textContent = 'Form opened. Add your response before submitting.';
    openForm(); return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => { if (resultEl) resultEl.textContent = 'Response copied — paste it into the Student Response field on the form.'; openForm(); })
      .catch(() => { if (resultEl) resultEl.textContent = 'Form opened. Copy your response manually before submitting.'; openForm(); });
  } else {
    if (resultEl) resultEl.textContent = 'Form opened. Manually copy your response before submitting.';
    openForm();
  }
};

const FORM_URLS = (function() {
  if (!window.BH_FORM) return {};
  const topicLabel = BH_FORM.topics[T.id];
  if (!topicLabel) return {};
  const base = BH_FORM.baseURL;
  const unit = 'Foundations Boot Camp';
  const enc  = v => encodeURIComponent(v).replace(/%20/g, '+');
  const sfEntry = 'entry.1963461515';
  function buildUrl(promptId, responseType, skills) {
    const skillParams = (skills||[]).map(s=>`&${sfEntry}=${enc(s)}`).join('');
    return `${base}?usp=pp_url&entry.125385659=${enc(unit)}&entry.187055090=${enc(topicLabel)}&entry.1549761827=${enc(promptId)}&entry.2107637366=${enc(responseType)}${skillParams}`;
  }
  const k = T.id;
  return {
    [`${k}-map`]:        buildUrl(`${k}-map`,        'Map Response',     ['Contextualization','Evidence Usage']),
    [`${k}-timeline`]:   buildUrl(`${k}-timeline`,   'Timeline',         ['Causation','CCOT']),
    [`${k}-evidence`]:   buildUrl(`${k}-evidence`,   'Evidence Lab',     ['Evidence Usage','Sourcing']),
    [`${k}-coach`]:      buildUrl(`${k}-coach`,      'Socrates Coach',   ['Argumentation','Causation']),
    [`${k}-skill`]:      buildUrl(`${k}-skill`,      'AP Skill Builder', ['Contextualization','Argumentation']),
    [`${k}-checkpoint`]: buildUrl(`${k}-checkpoint`, 'Checkpoint',       ['Argumentation','Claims & Thesis']),
    [`${k}-first10`]:    buildUrl(`${k}-first10`,    'First and 10',     ['Contextualization'])
  };
})();

// ── Draft / save / copy ────────────────────────────────────────────────────────
function draft(id,prompt){
  const formUrl = FORM_URLS[id];
  const submitBtn = formUrl ? `<button class="btn secondary" type="button" onclick="submitResponseToGoogleForm('${id}','${formUrl}')">Submit to Form</button>` : '';
  return `
    <div class="prompt-box">
      <h3>Draft Your Thinking</h3>
      <p>${prompt}</p>
      <textarea class="response-area" id="${id}" placeholder="Type your response here..."></textarea>
      <div class="tool-row">
        <button class="btn" type="button" onclick="saveDraft('${id}')">Save Draft</button>
        <button class="btn secondary" type="button" onclick="copyResponse('${id}')">Copy Response</button>
        ${submitBtn}
      </div>
      <div id="${id}-result" class="check-result"></div>
    </div>`;
}

function saveDraft(id){
  const t=byId(id);
  if(!t)return;
  localStorage.setItem(`foundations-topic-${id}`,t.value||'');
  const r=byId(id+'-result');
  if(r)r.textContent='Draft saved on this device.';
}

function copyResponse(id){
  const t=byId(id);
  if(!t)return;
  navigator.clipboard.writeText(t.value||'')
    .then(()=>{const r=byId(id+'-result');if(r)r.textContent='Response copied.';})
    .catch(()=>{const r=byId(id+'-result');if(r)r.textContent='Copy failed. Select and copy manually.';});
}

function loadDrafts(){
  document.querySelectorAll('textarea.response-area').forEach(t=>{
    const saved=localStorage.getItem(`foundations-topic-${t.id}`);
    if(saved)t.value=saved;
  });
}

// ── Keyboard escape ────────────────────────────────────────────────────────────
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeModule();closeLectureModal();closeLightbox();}
});
