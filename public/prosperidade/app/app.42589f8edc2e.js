
const modules = [
  {
    title: 'Module 1 · Foundation Reset',
    summary: 'Understand the Prosperity framework, clean up limiting beliefs, and create a fresh internal starting point.',
    lessons: [
      { id: 'm1l1', title: 'The Prosperity Mindset Shift', tag: '12 min', description: 'Prosperity is not random. This lesson reframes abundance as alignment plus disciplined action. You will identify the emotional patterns that keep you in scarcity and replace them with a clearer framework for growth.', bullets: ['Recognize scarcity language and emotional loops.', 'Learn the four pillars of the Prosperity framework.', 'Define what “abundance” means in practical daily life.'] },
      { id: 'm1l2', title: 'Breaking Hidden Mental Blocks', tag: '15 min', description: 'Use guided awareness to expose inherited narratives about money, self-worth, and receiving. This lesson helps you notice invisible patterns before they keep repeating.', bullets: ['Identify family and cultural scripts about money.', 'Separate fear signals from real strategy decisions.', 'Write the top three beliefs you are now replacing.'] },
      { id: 'm1l3', title: 'Personal Prosperity Map', tag: '18 min', description: 'Create a clear map for where you are now and where you are moving next in finances, relationships, health, and peace of mind.', bullets: ['Assess your current baseline honestly.', 'Set 90-day focus outcomes.', 'Choose your first non-negotiable habit.'] }
    ]
  },
  {
    title: 'Module 2 · Faith & Identity',
    summary: 'Strengthen inner certainty, self-concept, and the emotional stability required to carry greater results.',
    lessons: [
      { id: 'm2l1', title: 'Identity Before Results', tag: '14 min', description: 'Transformation becomes sustainable when your identity changes first. This lesson helps you step into the mindset of a prosperous person now, before visible evidence appears.', bullets: ['Build an identity statement rooted in clarity.', 'Understand how behavior follows self-image.', 'Use repetition to reinforce your new baseline.'] },
      { id: 'm2l2', title: 'Faith, Focus, and Emotional Discipline', tag: '17 min', description: 'Faith is not passivity. This lesson teaches emotional self-regulation and faithful decision-making while life is still catching up to your vision.', bullets: ['Shift from panic to intentional response.', 'Use gratitude to create emotional steadiness.', 'Protect your attention from chaos and noise.'] },
      { id: 'm2l3', title: 'Receiving Without Guilt', tag: '11 min', description: 'Many people sabotage growth because receiving feels unsafe. Learn to normalize support, money, favor, and opportunity.', bullets: ['Notice guilt around success.', 'Create healthier boundaries around giving and receiving.', 'Anchor new beliefs through evidence journaling.'] }
    ]
  },
  {
    title: 'Module 3 · Money Alignment',
    summary: 'Create structure around income, stewardship, generosity, and financial calm.',
    lessons: [
      { id: 'm3l1', title: 'Money as Stewardship', tag: '16 min', description: 'This lesson positions money as a tool to direct wisely. Prosperity increases when you become a better steward of what you already hold.', bullets: ['Track inflow and outflow with honesty.', 'Give every dollar a job.', 'Build margin before chasing complexity.'] },
      { id: 'm3l2', title: 'From Financial Noise to Clarity', tag: '19 min', description: 'Create a calm financial operating system for your life. Eliminate confusion, hidden leaks, and emotional spending patterns.', bullets: ['Use a weekly money review.', 'Create a simple emergency buffer goal.', 'Know your personal wealth priorities.'] },
      { id: 'm3l3', title: 'Income Expansion Mindset', tag: '12 min', description: 'This lesson connects practical growth with opportunity awareness, value creation, and strategic consistency.', bullets: ['Think in terms of value, not desperation.', 'Track opportunity sources around you.', 'Turn ideas into focused revenue experiments.'] }
    ]
  },
  {
    title: 'Module 4 · Daily Activation Rituals',
    summary: 'Build sustainable daily routines that reinforce energy, focus, gratitude, and execution.',
    lessons: [
      { id: 'm4l1', title: 'Morning Prosperity Routine', tag: '10 min', description: 'Set the tone of your day with intentional habits that align your mind, emotions, and body before the world pulls on your attention.', bullets: ['Use breath, gratitude, and declarations.', 'Review your top priority before messages and feeds.', 'Activate confidence through consistency.'] },
      { id: 'm4l2', title: 'Midday Recalibration', tag: '9 min', description: 'Regain focus in the middle of the day. This lesson helps you prevent drift, fatigue, and negative momentum.', bullets: ['Use a two-minute reset process.', 'Review your current energy and attention.', 'Choose one high-impact move for the next block.'] },
      { id: 'm4l3', title: 'Nightly Review & Release', tag: '13 min', description: 'End the day with peace and learning. Close emotional loops, document wins, and prepare your subconscious for better decisions tomorrow.', bullets: ['Capture evidence of progress.', 'Release emotional residue.', 'Prepare the next day in advance.'] }
    ]
  },
  {
    title: 'Module 5 · Action, Opportunity & Momentum',
    summary: 'Translate inner alignment into measurable, bold, and practical action.',
    lessons: [
      { id: 'm5l1', title: 'Opportunity Recognition', tag: '15 min', description: 'Prosperity grows where awareness increases. Learn to notice people, ideas, skills, and situations that can turn into meaningful progress.', bullets: ['Train yourself to scan for value and gaps.', 'Capture ideas immediately.', 'Use a simple filter to evaluate opportunities.'] },
      { id: 'm5l2', title: 'Consistency Over Intensity', tag: '14 min', description: 'Lasting growth rarely comes from random bursts. This lesson helps you build a repeatable pace that compounds.', bullets: ['Replace all-or-nothing cycles.', 'Track micro-wins daily.', 'Use weekly reviews for momentum.'] },
      { id: 'm5l3', title: 'Courageous Action Framework', tag: '18 min', description: 'Use fear as information, not instruction. This framework helps you move forward without waiting to feel perfect.', bullets: ['Clarify the risk, reward, and next move.', 'Reduce overwhelm by shrinking the task.', 'Build trust in your own follow-through.'] }
    ]
  },
  {
    title: 'Module 6 · 21-Day Prosperity Integration',
    summary: 'Bring everything together through a focused 21-day challenge with habits, journaling, and measurable growth.',
    lessons: [
      { id: 'm6l1', title: 'Days 1–7: Inner Alignment', tag: '20 min', description: 'Start by building clarity, emotional stability, and a stronger identity. These first days create the internal container for growth.', bullets: ['Clean up language and mental clutter.', 'Use guided journaling every day.', 'Track evidence that your state is changing.'] },
      { id: 'm6l2', title: 'Days 8–14: Financial & Practical Order', tag: '20 min', description: 'Organize your environment and money habits. Build routines that support opportunity instead of stress.', bullets: ['Audit subscriptions and financial leakage.', 'Create a simple weekly plan.', 'Establish one revenue-focused action daily.'] },
      { id: 'm6l3', title: 'Days 15–21: Expansion & Multiplication', tag: '20 min', description: 'Finish strong by turning internal progress into visible results. This phase is about bold movement and consistency.', bullets: ['Share value more confidently.', 'Make a high-courage move this week.', 'Write your next 30-day expansion plan.'] }
    ]
  }
];

const actions = [
  { id: 'a1', title: 'Read your declaration out loud', body: 'Speak your chosen declaration with intention and calm for at least 60 seconds.' },
  { id: 'a2', title: 'Write 3 gratitude points', body: 'Train your nervous system to notice provision, progress, and possibility.' },
  { id: 'a3', title: 'Review your 90-day vision', body: 'Reconnect emotionally with where you are going and why it matters.' },
  { id: 'a4', title: 'Complete one revenue-producing action', body: 'Send the message, make the offer, follow up, or publish the asset.' },
  { id: 'a5', title: 'Spend 10 minutes in stillness or prayer', body: 'Use quiet time to center your focus and reset emotional reactivity.' },
  { id: 'a6', title: 'Update your money awareness', body: 'Review your inflow, outflow, or one money metric without avoidance.' },
  { id: 'a7', title: 'Journal your progress evidence', body: 'Write one paragraph about how your mindset or actions are changing.' }
];

const books = [
  { id: 'b1', title: 'The Prosperity Blueprint', href: './books/prosperity-blueprint.html', cover: '../assets/optimized/reward-mult.757d988b2f2b.webp', desc: 'A complete guide to abundance thinking, aligned decision-making, and a practical prosperity operating system.' },
  { id: 'b2', title: 'Faith Activation Playbook', href: './books/faith-activation-playbook.html', cover: '../assets/optimized/reward-faith.4118fd64201f.webp', desc: 'A structured handbook for building emotional steadiness, faith-based discipline, and deeper internal security.' },
  { id: 'b3', title: 'Money Reset & Wealth Habits', href: './books/money-reset-wealth-habits.html', cover: '../assets/optimized/reward-abundance.7e06c10a4f14.webp', desc: 'A detailed book on stewardship, financial clarity, opportunity awareness, and wealth-building habits.' },
  { id: 'b4', title: '21-Day Prosperity Workbook', href: './books/21-day-prosperity-workbook.html', cover: '../assets/optimized/reward-future.a12cc272949e.webp', desc: 'A guided workbook with daily prompts, weekly reviews, action plans, and integration exercises.' }
];

const stateKey = 'prosperity_app_state_v1';
function localDay() { const d = new Date(); return [d.getFullYear(), String(d.getMonth()+1).padStart(2,'0'), String(d.getDate()).padStart(2,'0')].join('-'); }

let state = {
  user: null,
  signedOut: false,
  actionDate: localDay(),
  completedLessons: [],
  completedActions: [],
  openedBooks: [],
  journal: '',
  vision: ''
};
let activeLesson = null;

const $ = (sel) => document.querySelector(sel);
const moduleList = $('#module-list');
const actionList = $('#action-list');
const bookGrid = $('#book-grid');

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(stateKey) || 'null');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      if (saved.user && typeof saved.user.name === 'string') state.user = {name: saved.user.name.slice(0,40), email: typeof saved.user.email === 'string' ? saved.user.email.slice(0,80) : ''};
      const permitted = {completedLessons: modules.flatMap(m => m.lessons.map(l => l.id)), completedActions: actions.map(a => a.id), openedBooks: books.map(b => b.id)};
      for (const key of Object.keys(permitted)) state[key] = [...new Set(Array.isArray(saved[key]) ? saved[key].filter(x => permitted[key].includes(x)) : [])];
      state.journal = typeof saved.journal === 'string' ? saved.journal : '';
      state.vision = typeof saved.vision === 'string' ? saved.vision : '';
      state.signedOut = saved.signedOut === true;
      state.actionDate = saved.actionDate || localDay();
      if (state.actionDate !== localDay()) { state.completedActions = []; state.actionDate = localDay(); }
    }
  } catch (_) { /* A malformed or unavailable browser store does not prevent access. */ }
}
function saveState() {
  try {
    localStorage.setItem(stateKey, JSON.stringify(state));
    $('#save-warning')?.classList.add('hidden');
    return true;
  } catch (_) {
    const warning = $('#save-warning');
    if (warning) { warning.textContent = 'Browser storage is unavailable. Your changes work for this visit, but may not survive a refresh. Export your notes to keep a copy.'; warning.classList.remove('hidden'); }
    return false;
  }
}
function enterApp(profile) {
  state.user = profile;
  state.signedOut = false;
  saveState();
  renderApp();
  $('#login-screen').classList.add('hidden');
  $('#dashboard').classList.remove('hidden');
}
function renderApp() {
  const name = state.user?.name?.trim() || 'Friend';
  $('#welcome-name').textContent = `Welcome, ${name}`;
  $('#welcome-line').textContent = 'Your lessons, books, and guided practices are ready. Stay steady and keep moving.';
  $('#journal-text').value = state.journal || '';
  $('#vision-text').value = state.vision || '';
  renderModules();
  renderActions();
  renderBooks();
  updateStats();
}
function renderModules() {
  moduleList.innerHTML = modules.map((module, mIndex) => {
    const completedCount = module.lessons.filter(l => state.completedLessons.includes(l.id)).length;
    return `
      <article class="module-card">
        <div class="module-head">
          <div>
            <h4>${module.title}</h4>
            <p class="module-meta">${module.summary}</p>
          </div>
          <div class="module-meta"><strong>${completedCount}/${module.lessons.length}</strong> lessons</div>
        </div>
        <div class="lesson-items">
          ${module.lessons.map((lesson, index) => {
            const done = state.completedLessons.includes(lesson.id);
            return `
              <div class="lesson-item ${done ? 'completed' : ''}">
                <span class="lesson-check">${done ? '✓' : ''}</span>
                <button class="lesson-open" data-lesson="${lesson.id}">
                  <strong>${index + 1}. ${lesson.title}</strong>
                  <div class="lesson-tag">${lesson.tag}</div>
                </button>
                <button class="btn btn-secondary small lesson-open" data-lesson="${lesson.id}">Open</button>
              </div>`;
          }).join('')}
        </div>
      </article>`;
  }).join('');
  document.querySelectorAll('.lesson-open').forEach(btn => btn.addEventListener('click', () => openLesson(btn.dataset.lesson)));
}
function renderActions() {
  actionList.innerHTML = actions.map(action => {
    const checked = state.completedActions.includes(action.id);
    return `
      <label class="action-item">
        <input type="checkbox" data-action="${action.id}" ${checked ? 'checked' : ''} />
        <div>
          <strong>${action.title}</strong>
          <p>${action.body}</p>
        </div>
      </label>`;
  }).join('');
  actionList.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', () => {
      const id = box.dataset.action;
      if (box.checked && !state.completedActions.includes(id)) state.completedActions.push(id);
      if (!box.checked) state.completedActions = state.completedActions.filter(x => x !== id);
      saveState();
      updateStats();
    });
  });
}
function renderBooks() {
  bookGrid.innerHTML = books.map(book => `
    <article class="book-card">
      <img class="book-cover" src="${book.cover}" alt="${book.title}" />
      <h4>${book.title}</h4>
      <p>${book.desc}</p>
      <div class="book-actions">
        <a class="btn btn-primary small book-link" data-book="${book.id}" href="${book.href}">Read eBook</a>
      </div>
    </article>
  `).join('');
  bookGrid.querySelectorAll('.book-link').forEach(link => link.addEventListener('click', () => {
    const id = link.dataset.book;
    if (!state.openedBooks.includes(id)) {
      state.openedBooks.push(id);
      saveState();
      updateStats();
    }
  }));
}
function updateStats() {
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = state.completedLessons.length;
  const moduleCount = modules.filter(module => module.lessons.every(l => state.completedLessons.includes(l.id))).length;
  const actionCount = state.completedActions.length;
  const bookCount = state.openedBooks.length;
  const totalTrackable = totalLessons + actions.length + books.length;
  const completedTrackable = completedLessons + actionCount + bookCount;
  const percent = Math.round((completedTrackable / totalTrackable) * 100) || 0;
  $('#progress-fill').style.width = `${percent}%`;
  $('#progress-percent').textContent = `${percent}%`;
  $('#modules-completed').textContent = `${moduleCount} / ${modules.length}`;
  $('#books-opened').textContent = `${bookCount} / ${books.length}`;
  $('#actions-done').textContent = `${actionCount} / ${actions.length}`;
}
function openLesson(id) {
  for (const module of modules) {
    const found = module.lessons.find(l => l.id === id);
    if (found) activeLesson = found;
  }
  if (!activeLesson) return;
  $('#modal-title').textContent = activeLesson.title;
  $('#modal-description').textContent = activeLesson.description;
  $('#modal-points').innerHTML = activeLesson.bullets.map(item => `<div class="bullet-item">${item}</div>`).join('');
  $('#lesson-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  $('#lesson-modal .modal-close').focus();
  $('#modal-complete').textContent = state.completedLessons.includes(id) ? 'Completed ✓' : 'Mark Lesson Complete';
}
function closeLesson() {
  $('#lesson-modal').classList.add('hidden');
  document.body.style.overflow = '';
  if (activeLesson) document.querySelector(`[data-lesson="${activeLesson.id}"]`)?.focus();
}

document.addEventListener('click', (e) => {
  const close = e.target.getAttribute('data-close');
  if (close === 'lesson') closeLesson();
});
$('#modal-complete').addEventListener('click', () => {
  if (!activeLesson) return;
  if (!state.completedLessons.includes(activeLesson.id)) state.completedLessons.push(activeLesson.id);
  saveState();
  renderModules();
  updateStats();
  $('#modal-complete').textContent = 'Completed ✓';
});
$('#save-journal').addEventListener('click', () => {
  state.journal = $('#journal-text').value;
  state.vision = $('#vision-text').value;
  saveState();
  $('#journal-status').textContent = saveState() ? 'Journal saved in this browser.' : 'Not saved. Export your notes to keep a copy.';
  setTimeout(() => $('#journal-status').textContent = 'Saved automatically in this browser.', 1800);
});
$('#copy-declaration').addEventListener('click', async () => {
  const text = $('#daily-declaration').textContent.trim();
  try { await navigator.clipboard.writeText(text); $('#copy-declaration').textContent = 'Copied ✓'; } catch (_) { $('#copy-declaration').textContent = 'Select the declaration to copy it'; }
});
$('#logout').addEventListener('click', () => {
  state.signedOut = true;
  saveState();
  $('#dashboard').classList.add('hidden');
  $('#login-screen').classList.remove('hidden');
  $('#login-name').value = state.user?.name || '';
  $('#login-email').value = state.user?.email || '';
  $('#login-name').focus();
});
$('#open-library').addEventListener('click', () => { $('#library-heading').scrollIntoView({ block: 'start', behavior: 'instant' }); $('#library-heading').focus({preventScroll:true}); });
$('#enter-app').addEventListener('click', () => {
  const name = $('#login-name').value.trim();
  const email = $('#login-email').value.trim();
  if (!name) { $('#access-status').textContent = 'Enter your first name or use Quick Access.'; $('#login-name').focus(); return; }
  if (email && !$('#login-email').checkValidity()) { $('#login-email').reportValidity(); return; }
  enterApp({ name, email });
});
$('#quick-access').addEventListener('click', () => {
  const name = $('#login-name').value.trim() || 'Prosperity Member';
  const email = $('#login-email').value.trim() || '';
  enterApp({ name, email });
});
loadState();
if (state.user && !state.signedOut) {
  $('#login-screen').classList.add('hidden');
  $('#dashboard').classList.remove('hidden');
  renderApp();
}

// Save notes as they are edited and flush before navigation.
function saveNotes() {
  if (!state.user || state.signedOut) return;
  state.journal = $('#journal-text').value;
  state.vision = $('#vision-text').value;
  $('#journal-status').textContent = saveState() ? 'Saved automatically in this browser.' : 'Storage unavailable — export your notes.';
}
$('#journal-text').addEventListener('input', saveNotes);
$('#vision-text').addEventListener('input', saveNotes);
window.addEventListener('pagehide', saveNotes);
for (const id of ['#login-name', '#login-email']) $(id).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('#enter-app').click(); } });
document.addEventListener('keydown', e => {
  const modal = $('#lesson-modal');
  if (modal.classList.contains('hidden')) return;
  if (e.key === 'Escape') { e.preventDefault(); closeLesson(); }
  if (e.key === 'Tab') {
    const nodes = [...modal.querySelectorAll('button')];
    const first = nodes[0], last = nodes[nodes.length-1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
$('#export-progress').addEventListener('click', () => {
  saveNotes();
  const text = ['PROSPERITY — PERSONAL NOTES', '', 'Name: '+(state.user?.name || ''), 'Exported: '+new Date().toISOString(), '', '90-DAY VISION', state.vision, '', 'REFLECTION JOURNAL', state.journal, '', 'COMPLETED LESSONS', ...modules.flatMap(m => m.lessons).filter(l => state.completedLessons.includes(l.id)).map(l => l.title)].join('\n');
  const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = 'prosperity-personal-notes.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
});
if (state.signedOut && state.user) { $('#login-name').value = state.user.name; $('#login-email').value = state.user.email || ''; }
