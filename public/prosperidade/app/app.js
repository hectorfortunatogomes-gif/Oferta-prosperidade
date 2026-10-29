
const APP_DATA = window.__APP_DATA__;
const modules = APP_DATA.modules;
const rituals = APP_DATA.rituals;
const books = APP_DATA.books;
const plannerFields = APP_DATA.planner;
const visualCards = [
  {src:'./assets/generated/cover-blueprint.b10a5b3d7a55.webp', title:'Strategic Prosperity', body:'A visual reminder that clarity, structure, and direction create expansion.'},
  {src:'./assets/generated/cover-faith.298907fd7fce.webp', title:'Faith & Inner Power', body:'Ground your actions in certainty, peace, and emotional steadiness.'},
  {src:'./assets/generated/cover-money.caa1d6fa23d1.webp', title:'Wealth Stewardship', body:'Treat money, time, and energy like assets that deserve intentional leadership.'},
  {src:'./assets/generated/cover-workbook.002f6d80ca1c.webp', title:'Guided Implementation', body:'Transform concepts into real life through planning, writing, and daily execution.'}
];
const stateKey = 'prosperity_inner_circle_v2';

const baseState = {
  profile: null,
  signedOut: false,
  ritualDate: '',
  legacyProgress: null,
  completedLessons: [],
  completedRituals: [],
  challengeDays: [],
  openedBooks: [],
  journal: '',
  vision: '',
  planner: {},
  streak: 0,
  lastOpenDate: null,
  history: []
};
let state = loadState();
let activeLesson = null;

const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

function safeDate(){ const d=new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-'); }
function text(value){ return typeof value === 'string' ? value.trim() : ''; }
function escapeHTML(value){ return String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function loadState(){
  const fresh=JSON.parse(JSON.stringify(baseState)); fresh.ritualDate=safeDate();
  try {
    let raw=JSON.parse(localStorage.getItem(stateKey)||'null');
    if(!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      const old=JSON.parse(localStorage.getItem('prosperity_app_state_v1')||'null');
      if(old && typeof old==='object' && !Array.isArray(old)) {
        // Keep the original store intact; archive old lesson completions rather than
        // incorrectly marking a changed curriculum as already studied.
        raw={profile:old.user,signedOut:old.signedOut,journal:old.journal,vision:old.vision,
          openedBooks:old.openedBooks,legacyProgress:old,ritualDate:old.actionDate,
          completedRituals:Array.isArray(old.completedActions)?old.completedActions.map(x=>String(x).replace(/^a/,'r')):[]};
      } else return fresh;
    }
    if(raw.profile && typeof raw.profile.name==='string' && raw.profile.name.trim())
      fresh.profile={name:raw.profile.name.trim().slice(0,50),email:text(raw.profile.email).slice(0,90)};
    fresh.signedOut=raw.signedOut===true;
    const allowed={completedLessons:modules.flatMap(m=>m.lessons.map(l=>l[0])),completedRituals:rituals.map(r=>r[0]),
      challengeDays:Array.from({length:21},(_,i)=>'d'+(i+1)),openedBooks:books.map(b=>b[0])};
    for(const [key,ids]of Object.entries(allowed)) fresh[key]=[...new Set(Array.isArray(raw[key])?raw[key].filter(x=>ids.includes(x)):[])];
    for(const key of ['journal','vision']) fresh[key]=typeof raw[key]==='string'?raw[key].slice(0,1000000):'';
    if(raw.planner && typeof raw.planner==='object') for(let i=1;i<=5;i++) fresh.planner['p'+i]=typeof raw.planner['p'+i]==='string'?raw.planner['p'+i].slice(0,10000):'';
    if(raw.legacyProgress && typeof raw.legacyProgress==='object' && !Array.isArray(raw.legacyProgress)) fresh.legacyProgress=raw.legacyProgress;
    fresh.ritualDate=typeof raw.ritualDate==='string'?raw.ritualDate:safeDate();
    if(fresh.ritualDate!==safeDate()){fresh.completedRituals=[];fresh.ritualDate=safeDate();}
    fresh.streak=Number.isSafeInteger(raw.streak)&&raw.streak>=0?Math.min(raw.streak,100000):0;
    fresh.lastOpenDate=typeof raw.lastOpenDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(raw.lastOpenDate)?raw.lastOpenDate:null;
    fresh.history=Array.isArray(raw.history)?raw.history.filter(x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)).slice(-3660):[];
  } catch(e) { /* Invalid or unavailable storage must never block entry. */ }
  return fresh;
}
function saveState(){
  try {localStorage.setItem(stateKey,JSON.stringify(state));document.getElementById('storage-warning').hidden=true;return true;}
  catch(e){document.getElementById('storage-warning').hidden=false;return false;}
}
function refreshDailyRituals(){
 if(state.ritualDate===safeDate()) return;
 state.completedRituals=[];state.ritualDate=safeDate();saveState();
 if(state.profile&&!state.signedOut){renderRituals();renderOverview();hydrateProfile();}
}
function updateStreak(){
  const today = safeDate();
  const last = state.lastOpenDate;
  if(!last){ state.streak = 1; state.lastOpenDate = today; return; }
  if(last === today) return;
  const lastDate = new Date(last+'T12:00:00Z');
  const todayDate = new Date(today+'T12:00:00Z');
  const diff = Math.round((todayDate - lastDate)/86400000);
  state.streak = diff === 1 ? (state.streak || 0) + 1 : 1;
  state.lastOpenDate = today;
}
function ensureProfile(name, email=''){
  state.profile = {name: text(name).slice(0,50), email: text(email).slice(0,90)};
  state.signedOut=false;
  updateStreak();
  state.history = Array.isArray(state.history) ? state.history : [];
  if(!state.history.includes(state.lastOpenDate)) state.history.push(state.lastOpenDate);
  saveState();
}
function totalLessons(){ return modules.reduce((sum,m)=>sum + m.lessons.length, 0); }
function completedModules(){ return modules.filter(m => m.lessons.every(l => state.completedLessons.includes(l[0]))).length; }
function journalStrength(){
  const length = text(state.journal).length + text(state.vision).length + Object.values(state.planner || {}).join(' ').length;
  return Math.max(0, Math.min(100, Math.round(length / 18)));
}
function momentumScore(){
  const lessonScore = (state.completedLessons.length / totalLessons()) * 52;
  const ritualScore = (state.completedRituals.length / rituals.length) * 16;
  const challengeScore = (state.challengeDays.length / 21) * 10;
  const bookScore = (state.openedBooks.length / books.length) * 12;
  const journalScore = (journalStrength() / 100) * 10;
  return Math.round(lessonScore + ritualScore + challengeScore + bookScore + journalScore);
}
function percentComplete(){
  const max = totalLessons() + rituals.length + books.length + 21;
  const value = state.completedLessons.length + state.completedRituals.length + state.openedBooks.length + state.challengeDays.length;
  return Math.round((value / max) * 100);
}
function render(){
  if(state.profile && !state.signedOut){
    updateStreak();saveState();
    $('#gate').classList.add('hidden');
    $('#workspace').classList.remove('hidden');
    hydrateProfile();
    renderOverview();
    renderModules();
    renderRituals();
    renderLibrary();
    renderArtGallery();
    hydrateJournal();
    switchSection(location.hash.slice(1)||'overview', false);
  } else {
    $('#gate').classList.remove('hidden');
    $('#workspace').classList.add('hidden');
    $('#name-input').value=state.profile?.name||'';
    $('#email-input').value=state.profile?.email||'';
  }
}
function hydrateProfile(){
  const name = text(state.profile?.name) || 'Member';
  const email = text(state.profile?.email) || 'Private access mode';
  $('#profile-name').textContent = name;
  $('#profile-email').textContent = email;
  $('#welcome-title').textContent = `Welcome, ${name}`;
  $('#welcome-subtitle').textContent = `This is your personal operating system for prosperity, focus, and calm execution, ${name}.`;
  const pct = percentComplete();
  $('#sidebar-progress-fill').style.width = pct + '%';
  $('#sidebar-progress-text').textContent = pct + '% complete';
}
function renderOverview(){
  const score = momentumScore();
  $('#score-value').textContent = score;
  $('#modules-value').textContent = `${completedModules()} / ${modules.length}`;
  $('#lessons-value').textContent = `${state.completedLessons.length} / ${totalLessons()} lessons complete`;
  $('#rituals-value').textContent = `${state.completedRituals.length} / ${rituals.length}`;
  $('#streak-value').textContent = `Streak: ${state.streak || 0} day${(state.streak||0)===1?'':'s'}`;
  $('#books-value').textContent = `${state.openedBooks.length} / ${books.length}`;
  $('#journal-depth').textContent = `Writing activity: ${journalStrength()}%`;

  const nextLesson = getNextLesson();
  $('#next-step-title').textContent = nextLesson ? nextLesson.title : 'You have completed every lesson in the roadmap.';
  $('#next-step-body').textContent = nextLesson ? nextLesson.summary : 'Focus on repetition, ritual consistency, and deeper integration through your journal and workbook.';

  const coach = buildCoachInsights(score, nextLesson);
  $('#coach-main').textContent = coach.main;
  $('#mini-coach').textContent = coach.mini;
  $('#coach-list').innerHTML = coach.points.map(p => `<li>${escapeHTML(p)}</li>`).join('');

  $('#today-plan').innerHTML = plannerFields.map((field, idx) => {
    const key = 'p' + (idx + 1);
    const value = text((state.planner || {})[key]) || field[1];
    return `<div class="today-item"><span>${field[0]}</span><strong>${escapeHTML(value)}</strong></div>`;
  }).join('');
}
function getNextLesson(){
  for(const m of modules){
    for(const l of m.lessons){
      if(!state.completedLessons.includes(l[0])) return {id:l[0], title:l[1], summary:l[2], duration:l[3], module:m.title};
    }
  }
  return null;
}
function buildCoachInsights(score, nextLesson){
  const name = text(state.profile?.name) || 'Member';
  let main = `${name}, prosperity deepens when your inner world and your actions begin agreeing with each other.`;
  let mini = 'Complete one clear move today.';
  const points = [];
  if(score < 25){
    main = `${name}, you are at the ideal starting point: simple structure will outperform motivation. Your fastest transformation now comes from consistency, not intensity.`;
    mini = 'Start Module 1 and finish two rituals.';
    points.push('Begin with the first incomplete lesson instead of trying to do everything at once.');
    points.push('Complete at least two rituals today so your nervous system experiences momentum early.');
    points.push('Write a short journal entry about the identity you are stepping into this season.');
  } else if(score < 55){
    main = `${name}, you already have momentum. The smartest move now is to stabilize it so your progress becomes repeatable and emotionally lighter.`;
    mini = 'Protect your ritual rhythm and complete the next lesson.';
    points.push('Your progress suggests you benefit most from finishing what is already open.');
    points.push('Add one practical revenue or opportunity move to your planner today.');
    points.push('Use your journal to convert insights into specific commitments.');
  } else if(score < 80){
    main = `${name}, you are in a strong expansion zone. Your task now is refinement: make your process cleaner, calmer, and easier to sustain.`;
    mini = 'Refine, simplify, and keep compounding.';
    points.push('Look for patterns that helped you progress faster and design them into your routine.');
    points.push('Use the library to go deeper into stewardship, execution, and long-term order.');
    points.push('Choose one generous or service-based action that aligns with your growth.');
  } else {
    main = `${name}, you are operating with rare consistency. At this level, your next edge is mastery: simplify, teach, and multiply what already works.`;
    mini = 'Stay steady and build your next 90-day expansion plan.';
    points.push('Review your planner and create a more ambitious but elegant next phase.');
    points.push('Revisit one completed module and extract your top principles into a personal manifesto.');
    points.push('Use the workbook to convert this momentum into long-term systems.');
  }
  if(nextLesson) points.unshift(`Your next lesson is ${nextLesson.title} inside ${nextLesson.module}.`);
  return {main, mini, points};
}
function renderModules(){
  $('#module-grid').innerHTML = modules.map((m, mIndex) => {
    const complete = m.lessons.filter(l => state.completedLessons.includes(l[0])).length;
    const pct = Math.round((complete / m.lessons.length) * 100);
    const art = visualCards[mIndex % visualCards.length].src;
    return `<article class="panel glass module-card">
      <div class="module-art"><img src="${art}" alt="${m.title}" /></div>
      <div class="module-top">
        <div>
          <span class="mini-label">${m.level}</span>
          <h4>${m.title}</h4>
          <p class="module-meta">${m.theme}</p>
        </div>
        <div class="module-meta"><strong>${complete}/${m.lessons.length}</strong><br/>complete</div>
      </div>
      <div class="progress-track"><div style="width:${pct}%"></div></div>
      <div class="lesson-list">
        ${m.lessons.map(l => {
          const done = state.completedLessons.includes(l[0]);
          return `<div class="lesson-row ${done ? 'completed' : ''}">
            <div class="lesson-check">${done ? '✓' : ''}</div>
            <div class="lesson-copy">
              <button class="lesson-open" data-id="${l[0]}"><strong>${l[1]}</strong></button>
              <p>${l[2]}</p>
            </div>
            <div class="lesson-time">${l[3]}</div>
          </div>`;
        }).join('')}
      </div>
    </article>`;
  }).join('');
  $$('.lesson-open').forEach(btn => btn.addEventListener('click', () => openLesson(btn.dataset.id)));
}
function lessonById(id){
  for(const m of modules){
    for(const l of m.lessons){ if(l[0] === id) return {module:m, lesson:l}; }
  }
  return null;
}
function openLesson(id){
  activeLesson = id;
  const found = lessonById(id);
  if(!found) return;
  const [lid,title,summary,duration] = found.lesson;
  $('#lesson-modal-title').textContent = title;
  $('#lesson-modal-description').textContent = `${summary} (${duration})`;
  const bullets = [
    'Core shift: identify the perspective or habit this lesson wants you to upgrade.',
    'Embodiment practice: take one visible action within 24 hours so the lesson becomes real.',
    'Journal prompt: write what resistance, insight, or opportunity surfaced as you studied this topic.',
    `Integration cue: ask yourself how ${title.toLowerCase()} changes the way you lead your next week.`
  ];
  $('#lesson-modal-body').innerHTML = bullets.map(b => `<div class="modal-bullet">${b}</div>`).join('');
  $('#mark-complete-btn').textContent = state.completedLessons.includes(id) ? 'Completed ✓' : 'Mark Lesson Complete';
  $('#lesson-modal').classList.remove('hidden');
  document.body.style.overflow='hidden';
  $('#lesson-modal .modal-close').focus();
}
function closeModal(){ $('#lesson-modal').classList.add('hidden');document.body.style.overflow='';document.querySelector(`[data-id="${activeLesson}"]`)?.focus(); }
function markLessonComplete(){
  if(!activeLesson) return;
  if(!state.completedLessons.includes(activeLesson)) state.completedLessons.push(activeLesson);
  saveState();
  renderAllDynamic();
  $('#mark-complete-btn').textContent = 'Completed ✓';
}
function renderRituals(){
  $('#ritual-list').innerHTML = rituals.map(([id,title,body]) => {
    const checked = state.completedRituals.includes(id) ? 'checked' : '';
    return `<label class="ritual-item"><input type="checkbox" data-ritual="${id}" ${checked}/><div><strong>${title}</strong><p>${body}</p></div></label>`;
  }).join('');
  $$('#ritual-list input').forEach(box => box.addEventListener('change', () => {
    const id = box.dataset.ritual;
    if(box.checked && !state.completedRituals.includes(id)) state.completedRituals.push(id);
    if(!box.checked) state.completedRituals = state.completedRituals.filter(x => x !== id);
    saveState();
    renderOverview();hydrateProfile();
  }));

  $('#challenge-grid').innerHTML = Array.from({length:21}, (_,i) => {
    const key = 'd' + (i+1);
    const checked = state.challengeDays.includes(key) ? 'checked' : '';
    return `<label class="challenge-chip"><input type="checkbox" data-day="${key}" ${checked}/><span>${i+1}</span></label>`;
  }).join('');
  $$('#challenge-grid input').forEach(box => box.addEventListener('change', () => {
    const id = box.dataset.day;
    if(box.checked && !state.challengeDays.includes(id)) state.challengeDays.push(id);
    if(!box.checked) state.challengeDays = state.challengeDays.filter(x => x !== id);
    saveState();
    renderOverview();hydrateProfile();
  }));
}
function renderArtGallery(){
  const gallery = $('#art-gallery');
  if(!gallery) return;
  gallery.innerHTML = visualCards.map(card => `
    <article class="art-card">
      <img src="${card.src}" alt="${card.title}" />
      <div class="art-copy">
        <strong>${card.title}</strong>
        <span>${card.body}</span>
      </div>
    </article>
  `).join('');
}

function renderLibrary(){
  $('#library-grid').innerHTML = books.map(([id,title,desc,cover]) => {
    return `<article class="panel glass book-card">
      <div class="book-art"><img src="./${cover}" alt="${title}" /></div>
      <div class="book-body">
        <span class="mini-label">Premium ebook</span>
        <h4>${title}</h4>
        <p>${desc}</p>
        <div class="book-meta">
          <span class="meta-chip">10 rich chapters</span>
          <span class="meta-chip">Personalized opening page</span>
          <span class="meta-chip">Printable layout</span>
        </div>
        <div class="book-actions">
          <a class="btn btn-primary book-link" data-book="${id}" href="./books/${slugify(title)}.html">Read the eBook</a>
        </div>
      </div>
    </article>`;
  }).join('');
  $$('.book-link').forEach(link => link.addEventListener('click', () => {
    const id = link.dataset.book;
    if(!state.openedBooks.includes(id)) state.openedBooks.push(id);
    saveState();
  }));
}
function slugify(str){ return str.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function hydrateJournal(){
  $('#journal-input').value = state.journal || '';
  $('#vision-input').value = state.vision || '';
  $$('.planner-input').forEach(inp => { inp.value = (state.planner || {})[inp.dataset.plan] || ''; });
}
function saveNotes(){
  state.journal = $('#journal-input').value;
  state.vision = $('#vision-input').value;
  const planner = {};
  $$('.planner-input').forEach(inp => planner[inp.dataset.plan] = inp.value);
  state.planner = planner;
  const saved=saveState();
  $('#save-status').textContent = saved?'Saved in this browser.':'Not saved: export your notes.';
  setTimeout(() => { $('#save-status').textContent = 'Everything saves in this browser.'; }, 1600);
  renderOverview();
}
function exportNotes(){
  const payload = {
    profile: state.profile,
    previousEdition: state.legacyProgress,
    momentumScore: momentumScore(),
    completedLessons: state.completedLessons,
    completedRituals: state.completedRituals,
    challengeDays: state.challengeDays,
    openedBooks: state.openedBooks,
    journal: state.journal,
    vision: state.vision,
    planner: state.planner,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'prosperity-notes-' + safeDate() + '.json';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),30000);
}
function renderAllDynamic(){
  hydrateProfile();
  renderOverview();
  renderModules();
  renderRituals();
  renderLibrary();
  hydrateJournal();
}
function switchSection(id, scroll=true){
  if(!['overview','roadmap','rituals','library','journal'].includes(id)) id='overview';
  history.replaceState(null,'','#'+id);
  $$('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.target === id));
  $$('.view-section').forEach(section => section.classList.toggle('active-section', section.id === id));
  if(scroll) window.scrollTo({top:document.querySelector('.main-area').getBoundingClientRect().top+window.scrollY-12,behavior:'auto'});
}

document.addEventListener('click', e => {
  const closeId = e.target.getAttribute('data-close');
  if(closeId === 'lesson-modal') closeModal();
});

$('#enter-btn').addEventListener('click', () => {
  const name = text($('#name-input').value);
  if(!name){ $('#name-input').focus(); return; }
  ensureProfile(name, text($('#email-input').value));
  render();
});
$('#quick-btn').addEventListener('click', () => {
  const name = text($('#name-input').value) || 'Prosperity Member';
  ensureProfile(name, text($('#email-input').value));
  render();
});
$$('.nav-btn').forEach(btn => btn.addEventListener('click', () => switchSection(btn.dataset.target)));
$$('.jump-btn').forEach(btn => btn.addEventListener('click', () => {
  switchSection(btn.dataset.jump);
  document.querySelector('.main-area').scrollTo ? document.querySelector('.main-area').scrollTo({top:0, behavior:'smooth'}) : null;
}));
$('#mark-complete-btn').addEventListener('click', markLessonComplete);
$('#save-notes').addEventListener('click', saveNotes);
$('#export-all').addEventListener('click', exportNotes);
$('#reset-access').addEventListener('click', () => {state.signedOut=true;saveState();render();window.scrollTo(0,0);});
['#journal-input','#vision-input'].forEach(sel => $(sel).addEventListener('input', saveNotes));
$$('.planner-input').forEach(inp => inp.addEventListener('input', saveNotes));
render();

for(const id of ['name-input','email-input']) document.getElementById(id).addEventListener('keydown', e=>{if(e.key==='Enter'){e.preventDefault();document.getElementById('enter-btn').click();}});
document.addEventListener('keydown', e=>{
 const modal=document.getElementById('lesson-modal');if(modal.classList.contains('hidden'))return;
 if(e.key==='Escape')closeModal();
 if(e.key==='Tab'){
  const items=[...modal.querySelectorAll('button:not([disabled]),a[href],input')];const first=items[0],last=items[items.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshDailyRituals();});
setInterval(refreshDailyRituals,60000);
