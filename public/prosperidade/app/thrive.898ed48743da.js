const ROOT = new URL('./', import.meta.url);
const STORAGE = 'thrive_member_v4';
const LEGACY = ['prosperity_inner_circle_v2', 'prosperity_app_state_v1'];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = (value, max = 1000000) => typeof value === 'string' ? value.slice(0, max) : '';
const isObject = value => !!value && typeof value === 'object' && !Array.isArray(value);
const dayKey = (d = new Date()) => [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-');
const validDay = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value+'T12:00:00').valueOf());
const displayDate = key => new Date(key+'T12:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
const validEmail = email => typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
const iconPaths = {
  today:'<path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/><circle cx="12" cy="12" r="4"/>',
  learn:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  library:'<path d="M12 5v15M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Z"/>',
  routine:'<path d="M5 4v16m0-14h5m-5 6h5m-5 6h5m4-13 2 2 4-4m-6 8 2 2 4-4m-6 8 2 2 4-4"/>',
  journal:'<path d="M14 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8M10 14l1-4 7-7 3 3-7 7-4 1Z"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
  print:'<path d="M6 8V3h12v5M6 17H3V9h18v8h-3M6 14h12v7H6zM17 11h1"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.arrow}</svg>`;
const navItems = [['today','Today'],['learn','Learn'],['library','Books'],['routine','Routine'],['journal','Notes']];
let content, state, lessons, lessonIds, bookIds, ritualIds;
let route = 'today', journalDay = dayKey(), selectedDay = 1, toastTimer, saveTimer;
let pendingWrite = false, canSave = true;

function parseStore(key) {
  try { const v = JSON.parse(localStorage.getItem(key) || 'null'); return isObject(v) ? v : null; } catch { return null; }
}
function validArray(value, allowed) {
  return [...new Set(Array.isArray(value) ? value.filter(v => allowed.includes(v)) : [])];
}
function normalize(raw = {}) {
  const result = {schema:4, profile:null, signedOut:false, completedLessons:[], openedBooks:[],
    ritualHistory:{}, challengeDays:[], chapterProgress:{}, bookPositions:{}, journals:{}, journalArchive:'',
    vision:'', planner:{}, lessonNotes:{}, readingSize:19, lastLesson:'', legacyProgress:null};
  const profile = raw.profile || raw.user;
  if (isObject(profile)) result.profile = {name:plain(profile.name,60).trim(), email:plain(profile.email,254).trim()};
  result.signedOut = raw.signedOut === true;
  const isOldCurriculum = !raw.schema && !!raw.user && !raw.profile;
  result.completedLessons = isOldCurriculum ? [] : validArray(raw.completedLessons,lessonIds);
  result.openedBooks = validArray(raw.openedBooks, bookIds);
  result.challengeDays = validArray(raw.challengeDays,Array.from({length:21},(_,i)=>'d'+(i+1)));
  result.vision = plain(raw.vision);
  result.journalArchive = plain(raw.journalArchive || raw.journal);
  for(const key of ['journals', 'ritualHistory']) if(isObject(raw[key])) {
    for(const [date, value] of Object.entries(raw[key])) if(validDay(date)) result[key][date] = key === 'journals' ? plain(value) : validArray(value,ritualIds);
  }
  if(!raw.schema || raw.schema < 4) {
    const date=validDay(raw.ritualDate || raw.actionDate) ? (raw.ritualDate || raw.actionDate) : dayKey();
    const oldRituals=raw.completedRituals || (Array.isArray(raw.completedActions)?raw.completedActions.map(a=>String(a).replace(/^a/,'r')):[]);
    result.ritualHistory[date]=validArray(oldRituals,ritualIds);
  }
  for(const [key, allowed] of [['planner',['p1','p2','p3','p4','p5']],['lessonNotes',lessonIds]]) {
    if(isObject(raw[key])) for(const id of allowed) result[key][id]=plain(raw[key][id]);
  }
  for(const book of content.books) {
    const id=book.id, chapterIds=book.chapters.map(c=>c.id);
    result.chapterProgress[id]=validArray(raw.chapterProgress?.[id],chapterIds);
    const pos=raw.bookPositions?.[id]; result.bookPositions[id]=Number.isInteger(pos)&&chapterIds.includes(pos)?pos:0;
  }
  result.readingSize=[17,19,21,23].includes(raw.readingSize)?raw.readingSize:19;
  result.lastLesson=lessonIds.includes(raw.lastLesson)?raw.lastLesson:'';
  result.legacyProgress=isObject(raw.legacyProgress)?raw.legacyProgress:isOldCurriculum?raw:null;
  return result;
}
function loadState() {
  const saved=parseStore(STORAGE);
  if(saved) return normalize(saved);
  for(const key of LEGACY) {const old=parseStore(key);if(old)return normalize(old);}
  return normalize();
}
function persist(notify = false) {
  clearTimeout(saveTimer);pendingWrite=false;
  try {localStorage.setItem(STORAGE,JSON.stringify(state));canSave=true;} catch {canSave=false;}
  $('#storage-warning').hidden=canSave;
  $$('[data-save-status]').forEach(el=>el.textContent=canSave?'Saved on this device':'Not saved — export your notes');
  if(notify) toast(canSave?'Saved.':'Your browser could not save. Export a copy from your account.');
  return canSave;
}
function scheduleSave() {
  pendingWrite=true;$$('[data-save-status]').forEach(el=>el.textContent='Saving…');clearTimeout(saveTimer);saveTimer=setTimeout(()=>persist(),350);
}
function toast(message) {
  clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;
  toastTimer=setTimeout(()=>$('#toast').hidden=true,3300);
}
function signedIn() {return !!state.profile?.name && validEmail(state.profile?.email) && !state.signedOut;}
function nextLesson() {
  return lessons.find(l=>l.id===state.lastLesson&&!state.completedLessons.includes(l.id)) || lessons.find(l=>!state.completedLessons.includes(l.id)) || lessons[0];
}
function noteCount(value) {return plain(value).trim().split(/\s+/).filter(Boolean).length;}
function navigation() {
  for(const id of ['desktop-nav','mobile-nav']) $('#'+id).innerHTML=navItems.map(([key,title])=>`<a href="#${key}" data-nav="${key}">${icon(key)}<span>${title}</span></a>`).join('');
}
function showAccount() {
  $('#profile-name').value=state.profile?.name || '';$('#profile-email').value=state.profile?.email || '';$('#profile-error').hidden=true;$('#account-dialog').showModal();
}
function resolveRoute() {
  let hash=location.hash.slice(1);
  const aliases={overview:'today',roadmap:'learn',rituals:'routine'};
  hash=aliases[hash]||hash||'today';
  const parts=hash.split('/');
  if(parts[0]==='lesson' && lessonIds.includes(parts[1]))return hash;
  if(parts[0]==='book' && bookIds.includes(parts[1]))return hash;
  return navItems.some(n=>n[0]===hash)?hash:'today';
}
function renderRoute(moveFocus = false) {
  if(pendingWrite)persist();
  $('#loading').hidden=true;
  $('#access').hidden=signedIn();$('#workspace').hidden=!signedIn();
  if(!signedIn()) {
    $('#member-name').value=state.profile?.name || '';$('#member-email').value=state.profile?.email || '';
    document.title='Welcome · Time to Thrive';return;
  }
  route=resolveRoute();const [kind,id,index]=route.split('/');
  const selected=kind==='lesson'?'learn':kind==='book'?'library':kind;
  $$('[data-nav]').forEach(a=>{a.classList.toggle('active',a.dataset.nav===selected);if(a.dataset.nav===selected)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  $$('[data-name]').forEach(el=>el.textContent=state.profile.name);
  $$('[data-initial]').forEach(el=>el.textContent=state.profile.name[0].toUpperCase());
  $('#top-date').textContent=new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'});
  $('#top-context').textContent={today:'Your daily space',learn:'One step at a time',library:'Your reading shelf',routine:'Small, steady actions',journal:'Room to reflect'}[selected];
  document.documentElement.style.setProperty('--reader-size',state.readingSize+'px');
  const renderers={today:renderToday,learn:renderLearn,library:renderLibrary,routine:renderRoutine,journal:renderJournal};
  if(kind==='lesson')renderLesson(id);else if(kind==='book')renderBook(id,index);else renderers[kind]();
  document.title=selected==='today'?'Time to Thrive':`${navItems.find(x=>x[0]===selected)?.[1] || 'Read'} · Time to Thrive`;
  if(moveFocus){scrollTo(0,0);$('#main').focus({preventScroll:true});}
}
const COVER_FILES = {"blueprint": "blueprint.0b2daec7c49b.webp", "faith": "faith.db508d84a067.webp", "money": "money.add5b8df7d14.webp", "workbook": "workbook.00255cd8e12a.webp"};
function cover(name) {return new URL('assets/'+COVER_FILES[name],ROOT).href;}
function heading(title, subtitle) {return `<div class="page-title"><h1>${esc(title)}</h1>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div>`;}
function shelf() {return content.books.map(b=>`<a class="shelf-book" href="#book/${b.id}/${state.bookPositions[b.id]||0}"><div class="shelf-cover"><img src="${cover(b.cover)}" alt="" width="220" height="294" loading="lazy" decoding="async"></div><span class="shelf-title">${esc(b.shortTitle)}</span><small>${b.chapters.length} chapters</small></a>`).join('');}
function ritualList(ids, full = false) {
  const checked=state.ritualHistory[dayKey()]||[];
  return content.rituals.filter(r=>ids.includes(r.id)).map(r=>`<label class="daily-item"><input type="checkbox" data-ritual="${r.id}" ${checked.includes(r.id)?'checked':''}><span><strong>${esc(r.title)}</strong>${full?`<small>${esc(r.body)}</small>`:''}</span></label>`).join('');
}
function renderToday() {
  const next=nextLesson(), complete=state.completedLessons.length, percent=Math.round(complete/lessons.length*100);
  const first=state.profile.name.split(/\s+/)[0]; const hour=new Date().getHours(); const greeting=hour<12?'Good morning':hour<18?'Good afternoon':'Good evening';
  const daily=state.ritualHistory[dayKey()]||[];
  $('#main').innerHTML=`${heading(`${greeting}, ${first}.`,'Make a little room for what matters.')}
    <section class="feature" aria-labelledby="continue-title"><div class="feature-copy"><p class="eyebrow">${complete===lessons.length?'Return to a favorite':'Pick up where you left off'}</p><h2 id="continue-title">${esc(next.title)}</h2><p>${esc(next.summary)}</p><a class="button primary" href="#lesson/${next.id}">${state.lastLesson===next.id?'Continue reading':'Start reading'} ${icon('arrow')}</a><span class="quiet-meta">Chapter ${next.module.number} · ${esc(next.module.title)}</span></div><div class="feature-image"><img src="${cover(next.module.cover)}" alt="" width="220" height="294" fetchpriority="high"></div></section>
    <div class="thin-progress"><span>${complete} of ${lessons.length} lessons completed</span><div class="bar" role="progressbar" aria-label="Lessons completed" aria-valuenow="${complete}" aria-valuemin="0" aria-valuemax="${lessons.length}"><span style="width:${percent}%"></span></div><span>${percent}%</span></div>
    <div class="home-two"><section class="panel"><div class="row-head"><h2>A little practice.</h2><span class="subtle-count">${daily.length} / ${content.rituals.length}</span></div>${ritualList(['r1','r2','r7'])}<a class="text-button" href="#routine">See your routine ${icon('arrow')}</a></section>
    <section class="panel reflection-card"><p class="eyebrow">Something to sit with</p><blockquote>What is one small thing you can give your attention to today?</blockquote><a class="text-button" href="#journal">Write a few lines ${icon('arrow')}</a></section></div>
    <section class="section"><div class="row-head"><h2>Your reading shelf.</h2><a class="text-button" href="#library">View all ${icon('arrow')}</a></div><div class="bookshelf">${shelf()}</div></section>`;
}
function moduleList(query = '') {
  query=query.toLowerCase().trim(); const next=nextLesson();
  return content.modules.map(m=>{
    const matches=m.lessons.filter(l=>`${m.title} ${l.title} ${l.summary}`.toLowerCase().includes(query));if(!matches.length)return '';
    const n=m.lessons.filter(l=>state.completedLessons.includes(l.id)).length;
    return `<details class="module" ${(query||m.id===next.module.id)?'open':''}><summary><span class="module-number">${String(m.number).padStart(2,'0')}</span><img class="module-thumb" src="${cover(m.cover)}" alt="" width="56" height="62" loading="lazy"><div class="module-info"><h2>${esc(m.title)}</h2><p>${m.lessons.length} lessons · ${n} completed</p></div><span class="module-chev">${icon('chevron')}</span></summary><div class="lessons">${matches.map(l=>`<a class="lesson-link" href="#lesson/${l.id}"><span class="lesson-status ${state.completedLessons.includes(l.id)?'done':''}" aria-label="${state.completedLessons.includes(l.id)?'Completed':'Not completed'}">${state.completedLessons.includes(l.id)?icon('check'):''}</span><span>${esc(l.title)}</span><small>Study note</small></a>`).join('')}</div></details>`;
  }).join('')||'<p class="empty">No lessons match. Try another word.</p>';
}
function renderLearn() {
  $('#main').innerHTML=`${heading('A path of your own.','Read a little. Try something. Return when you’re ready.')}<div class="search-wrap">${icon('search')}<input type="search" id="lesson-search" placeholder="Find a lesson" aria-label="Search lessons"></div><div id="module-list">${moduleList()}</div>`;
}
function renderLibrary() {
  $('#main').innerHTML=`${heading('Your library.','Four guides to read at your own pace.')}<div class="library-grid">${content.books.map(b=>{
    const read=state.chapterProgress[b.id]?.length||0;const started=state.openedBooks.includes(b.id);
    return `<article class="library-book"><a href="#book/${b.id}/${state.bookPositions[b.id]||0}" aria-label="Read ${esc(b.title)}"><img class="library-cover" src="${cover(b.cover)}" alt="" width="126" height="180" loading="lazy"></a><div class="library-copy"><h2>${esc(b.shortTitle)}</h2><p>${esc(b.description)}</p><small>${b.chapters.length} chapters${read?` · ${read} read`:''}</small><a class="text-button" href="#book/${b.id}/${state.bookPositions[b.id]||0}">${started?'Continue reading':'Open book'} ${icon('arrow')}</a></div></article>`;
  }).join('')}</div>`;
}
function renderRoutine() {
  selectedDay=Math.min(21,Math.max(1,selectedDay));const day=content.plan[selectedDay-1];const done=state.challengeDays.includes('d'+selectedDay);
  const daily=state.ritualHistory[dayKey()]||[];
  $('#main').innerHTML=`${heading('Small things, often.','A gentle routine. A place to begin again.')}<div class="routine-grid"><section class="panel"><div class="row-head"><h2>Today’s practice.</h2><span class="subtle-count">${daily.length} / 8</span></div><p class="routine-header">Choose what fits your day. Your checklist starts fresh each morning.</p>${ritualList(ritualIds,true)}</section><section class="panel"><div class="row-head"><h2>21 days of intention.</h2><span class="subtle-count">${state.challengeDays.length} / 21</span></div><p class="routine-header">Follow the prompts at your own pace. A missed day is just a place to return.</p><div class="day-grid" aria-label="Choose a practice day">${content.plan.map(d=>`<button type="button" data-day="${d.day}" class="day-button ${d.day===selectedDay?'active':''} ${state.challengeDays.includes('d'+d.day)?'done':''}" aria-pressed="${d.day===selectedDay}" aria-label="Day ${d.day}${state.challengeDays.includes('d'+d.day)?', completed':''}">${d.day}</button>`).join('')}</div><div class="day-detail"><p class="eyebrow">Day ${day.day}</p><h3>${esc(day.title)}</h3><p>${esc(day.reflection)}</p><p class="day-action">${esc(day.action)}</p><button class="button ${done?'secondary':'primary'}" id="complete-day" aria-pressed="${done}" type="button">${done?icon('check')+' Completed':'Mark day complete'}</button></div></section></div>`;
}
function renderJournal() {
  const journal=state.journals[journalDay]||'';
  const prompts=['What felt important today?','What did you notice about yourself?','What could you approach with a little more care?','What is one thing you are ready to set down?'];
  const prompt=prompts[new Date(journalDay+'T12:00:00').getDate()%prompts.length];
  $('#main').innerHTML=`${heading('A place for your thoughts.','No score. No right answer. Just a few honest lines.')}<div class="journal-grid"><section class="panel"><div class="date-control"><button class="icon-button" type="button" data-journal-day="-1" aria-label="Previous day">${icon('back')}</button><span>${journalDay===dayKey()?'Today · ':''}${displayDate(journalDay)}</span><button class="icon-button" type="button" data-journal-day="1" ${journalDay>=dayKey()?'disabled':''} aria-label="Next day">${icon('arrow')}</button></div><p class="writing-prompt">${esc(prompt)}</p><textarea class="journal-paper" id="journal-entry" data-note="journal" maxlength="1000000" aria-label="Reflection for ${displayDate(journalDay)}" placeholder="Begin anywhere…">${esc(journal)}</textarea><div class="save-line"><span class="note-saved">${icon('check')}<span data-save-status>${canSave?'Saved on this device':'Not saved'}</span></span><span id="journal-words">${noteCount(journal)} words</span></div></section><div class="writing-tools"><details><summary>Your next 90 days ${icon('chevron')}</summary><p class="tool-note">One direction. A few actions within your control.</p><textarea data-note="vision" maxlength="1000000" aria-label="90-day vision" placeholder="What would you like to make room for?">${esc(state.vision)}</textarea><p class="tool-note" data-save-status>Saved on this device</p></details><details><summary>A simple focus plan ${icon('chevron')}</summary>${content.planner.map((p,i)=>`<label class="field"><span>${esc(p[0])}</span><input data-note="planner" data-key="p${i+1}" maxlength="10000" value="${esc(state.planner['p'+(i+1)]||'')}" placeholder="${esc(p[1])}"></label>`).join('')}<p class="tool-note" data-save-status>Saved on this device</p></details>${state.journalArchive?`<details><summary>Earlier notes ${icon('chevron')}</summary><p class="tool-note">Your notes from the previous app are kept here.</p><textarea data-note="archive" maxlength="1000000" aria-label="Earlier journal notes">${esc(state.journalArchive)}</textarea></details>`:''}</div></div>`;
}
function readerTools(back, label, isBook=false) {
  return `<div class="reader-toolbar"><a class="reader-back" href="#${back}">${icon('back')} ${esc(label)}</a><div class="reader-actions">${isBook?'<button class="text-button" data-contents type="button">Contents</button>':''}<button class="icon-button" type="button" data-type="-2" aria-label="Smaller reading text">A−</button><button class="icon-button" type="button" data-type="2" aria-label="Larger reading text">A+</button>${isBook?`<button class="icon-button" type="button" data-print aria-label="Print the complete book">${icon('print')}</button>`:''}</div></div>`;
}
function renderLesson(id) {
  const l=lessons.find(x=>x.id===id);if(!l)return renderLearn();state.lastLesson=id;persist();const complete=state.completedLessons.includes(id);const next=lessons[lessons.indexOf(l)+1];
  $('#main').innerHTML=`${readerTools('learn','Back to lessons')}<article class="reader"><p class="chapter-marker">Chapter ${l.module.number} · ${esc(l.module.title)}</p><h1>${esc(l.title)}</h1><p class="reading-sub">${esc(l.summary)}</p><section class="practice-block"><p class="eyebrow">Put it into practice</p><h2>${esc(l.practiceTitle)}</h2><p>${esc(l.practice)}</p></section><section class="reflection-field"><label class="field"><span>${esc(l.prompt)}</span><textarea data-note="lesson" data-key="${id}" maxlength="1000000" placeholder="A thought to keep…">${esc(state.lessonNotes[id]||'')}</textarea></label><p class="fineprint" data-save-status>${canSave?'Saved on this device':'Not saved'}</p></section><footer class="reader-footer"><button id="complete-lesson" data-lesson="${id}" class="button ${complete?'secondary':'primary'}" aria-pressed="${complete}" type="button">${complete?icon('check')+' Completed':'Mark lesson complete'}</button>${next?`<a class="next-read" href="#lesson/${next.id}">Next lesson ${icon('arrow')}</a>`:'<a class="next-read" href="#learn">Return to lessons</a>'}</footer></article>`;
}
function renderBook(id, pos) {
  const book=content.books.find(x=>x.id===id);let index=Number(pos);if(!Number.isInteger(index)||!book.chapters[index])index=state.bookPositions[id]||0;
  const ch=book.chapters[index];state.bookPositions[id]=index;if(!state.openedBooks.includes(id))state.openedBooks.push(id);persist();
  const read=(state.chapterProgress[id]||[]).includes(index);
  $('#main').innerHTML=`${readerTools('library','Back to books',true)}<article class="reader"><p class="book-name">${esc(book.title)}</p><p class="chapter-marker">Chapter ${index+1} of ${book.chapters.length}</p><h1>${esc(ch.title)}</h1><div class="reader-body">${ch.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div><footer class="reader-footer"><button class="button ${read?'secondary':'primary'}" type="button" id="complete-chapter" data-book="${id}" data-chapter="${index}" aria-pressed="${read}">${read?icon('check')+' Chapter read':'Mark chapter read'}</button>${index<book.chapters.length-1?`<a class="next-read" href="#book/${id}/${index+1}">Next chapter ${icon('arrow')}</a>`:'<a class="next-read" href="#library">Back to library</a>'}</footer><p class="reader-note">Prepared for ${esc(state.profile.name)} · Your reading place is saved on this device.</p><div class="print-content" id="print-content"></div></article>`;
}
function openContents() {
  const [,id]=route.split('/');const book=content.books.find(b=>b.id===id);if(!book)return;
  $('#contents-title').textContent=book.shortTitle;
  $('#contents-list').innerHTML=book.chapters.map(c=>`<a class="contents-item ${state.bookPositions[id]===c.id?'active':''}" href="#book/${id}/${c.id}"><small>${String(c.id+1).padStart(2,'0')}</small><span>${esc(c.title)}</span>${state.chapterProgress[id].includes(c.id)?icon('check'):''}</a>`).join('');$('#contents-dialog').showModal();
}
function printBook() {
  const [,id]=route.split('/');const book=content.books.find(b=>b.id===id);if(!book)return;
  $('#print-content').innerHTML=`<header><h1>${esc(book.title)}</h1><p>Prepared for ${esc(state.profile.name)}</p></header>`+book.chapters.map(c=>`<section><p class="eyebrow">Chapter ${c.id+1}</p><h2>${esc(c.title)}</h2>${c.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</section>`).join('');
  document.body.classList.add('printing-book');
  try { window.print(); } finally { document.body.classList.remove('printing-book');$('#print-content').innerHTML=''; }
}

function validateAccess(form, custom = false) {
  const name=plain(form.elements.name.value,60).trim(), email=plain(form.elements.email.value,254).trim();
  if(custom){$('#profile-error').textContent=!name?'Please enter your name.':!validEmail(email)?'Please enter a valid email address.':'';$('#profile-error').hidden=!!name&&validEmail(email);}
  else {for(const [id,valid,message] of [['name',!!name,'Please enter your name.'],['email',validEmail(email),'Please enter a valid email address.']]){$('#'+id+'-error').textContent=message;$('#'+id+'-error').hidden=valid;$('#member-'+id).setAttribute('aria-invalid',String(!valid));}}
  if(!name||!validEmail(email)){(form.elements[!name?'name':'email']).focus();return null;}return {name,email};
}
function exportData() {
  if(pendingWrite)persist();const legacy={};for(const key of LEGACY){const value=parseStore(key);if(value)legacy[key]=value;}
  const blob=new Blob([JSON.stringify({app:'Time to Thrive',exportedAt:new Date().toISOString(),state,previousEditions:legacy},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='time-to-thrive-'+dayKey()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);toast('Your copy is ready. Keep it somewhere private.');
}
async function restoreData(file) {
  if(!file)return;if(file.size>10*1024*1024){toast('Please choose a notes file smaller than 10 MB.');return;}
  try {const parsed=JSON.parse(await file.text()), raw=parsed.state||parsed;if(!isObject(raw)||(!raw.profile&&!raw.user&&!raw.schema))throw Error('Not a notes export');
    if(!confirm('Replace the notes and progress in this browser with this saved copy? Export your current notes first if you need to keep both.'))return;
    state=normalize(raw);persist();$('#account-dialog').close();renderRoute(true);toast('Your saved copy has been restored.');
  } catch {toast('That file could not be restored. Choose a Time to Thrive notes export.');}finally{$('#import-file').value='';}
}
function setupEvents() {
  $('#access-form').addEventListener('submit',event=>{event.preventDefault();const profile=validateAccess(event.currentTarget);if(!profile)return;state.profile=profile;state.signedOut=false;persist();renderRoute(true);});
  $('#profile-form').addEventListener('submit',event=>{event.preventDefault();const profile=validateAccess(event.currentTarget,true);if(!profile)return;state.profile=profile;persist();$('#account-dialog').close();renderRoute();toast('Details updated.');});
  $$('[data-account]').forEach(b=>b.addEventListener('click',showAccount));$('#close-account').addEventListener('click',()=>$('#account-dialog').close());$('#close-contents').addEventListener('click',()=>$('#contents-dialog').close());
  $('#contents-list').addEventListener('click',e=>{if(e.target.closest('a'))$('#contents-dialog').close();});
  for(const dialog of $$('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close();}});
  $('#signout').addEventListener('click',()=>{if(pendingWrite)persist();state.signedOut=true;persist();$('#account-dialog').close();renderRoute(true);});
  $('#export-data').addEventListener('click',exportData);$('#import-data').addEventListener('click',()=>$('#import-file').click());$('#import-file').addEventListener('change',e=>restoreData(e.target.files[0]));
  $('#main').addEventListener('change',e=>{const el=e.target;if(el.matches('[data-ritual]')){const day=dayKey();const list=state.ritualHistory[day]||[];state.ritualHistory[day]=el.checked?[...new Set([...list,el.dataset.ritual])]:list.filter(x=>x!==el.dataset.ritual);persist();const oldScroll=scrollY;renderRoute();scrollTo(0,oldScroll);}});
  $('#main').addEventListener('input',e=>{
    const el=e.target;if(el.id==='lesson-search'){$('#module-list').innerHTML=moduleList(el.value);return;}
    if(!el.dataset.note)return;const value=el.value;
    if(el.dataset.note==='journal'){state.journals[journalDay]=value;$('#journal-words').textContent=noteCount(value)+' words';}
    if(el.dataset.note==='vision')state.vision=value;
    if(el.dataset.note==='planner')state.planner[el.dataset.key]=value;
    if(el.dataset.note==='archive')state.journalArchive=value;
    if(el.dataset.note==='lesson')state.lessonNotes[el.dataset.key]=value;
    scheduleSave();
  });
  $('#main').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.day){selectedDay=Number(b.dataset.day);const y=scrollY;renderRoutine();scrollTo(0,y);}
    if(b.id==='complete-day'){const id='d'+selectedDay;const before=state.challengeDays.includes(id);state.challengeDays=before?state.challengeDays.filter(d=>d!==id):[...state.challengeDays,id];persist();renderRoutine();if(!before)toast('Day saved. Keep going at your own pace.');}
    if(b.dataset.journalDay){const date=new Date(journalDay+'T12:00:00');date.setDate(date.getDate()+Number(b.dataset.journalDay));journalDay=dayKey(date);if(pendingWrite)persist();renderJournal();}
    if(b.id==='complete-lesson'){const id=b.dataset.lesson;const before=state.completedLessons.includes(id);state.completedLessons=before?state.completedLessons.filter(x=>x!==id):[...state.completedLessons,id];persist();const y=scrollY;renderLesson(id);scrollTo(0,y);if(!before)toast('Lesson completed.');}
    if(b.id==='complete-chapter'){const id=b.dataset.book,n=Number(b.dataset.chapter),list=state.chapterProgress[id]||[];state.chapterProgress[id]=list.includes(n)?list.filter(x=>x!==n):[...list,n];persist();const y=scrollY;renderBook(id,n);scrollTo(0,y);}
    if(b.dataset.type){state.readingSize=Math.max(17,Math.min(23,state.readingSize+Number(b.dataset.type)));document.documentElement.style.setProperty('--reader-size',state.readingSize+'px');persist();}
    if(b.hasAttribute('data-contents'))openContents();if(b.hasAttribute('data-print'))printBook();
  });
  window.addEventListener('hashchange',()=>renderRoute(true));
  window.addEventListener('pagehide',()=>{if(pendingWrite)persist();});
  let lastDay=dayKey();document.addEventListener('visibilitychange',()=>{if(document.hidden){if(pendingWrite)persist();return;}if(dayKey()!==lastDay){lastDay=dayKey();journalDay=dayKey();if(!pendingWrite)renderRoute();}});
}
async function boot() {
  try {const response=await fetch(new URL('content.4f050caabde8.json',ROOT));if(!response.ok)throw Error('Could not load reading material');content=await response.json();
    lessons=content.modules.flatMap(m=>m.lessons.map(l=>({...l,module:m})));lessonIds=lessons.map(l=>l.id);bookIds=content.books.map(b=>b.id);ritualIds=content.rituals.map(r=>r.id);
    state=loadState();selectedDay=content.plan.find(d=>!state.challengeDays.includes('d'+d.day))?.day||1;navigation();setupEvents();renderRoute();
  } catch(error){$('#loading').innerHTML='<div class="error-state"><h1>Let’s try again.</h1><p>Your reading space could not load. Your saved notes have not been deleted.</p><button class="button primary" id="retry-load">Reload</button></div>';$('#retry-load').addEventListener('click',()=>location.reload());console.error(error);}
}
boot();
