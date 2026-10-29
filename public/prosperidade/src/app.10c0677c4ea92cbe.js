import { mountOfferPlayer } from '/prosperidade/src/offer-player.js';
import { config } from './config.f69cee476cc7cba0.js';
// Layout release: ui-r3-20261005T193609Z.
document.documentElement.dataset.prosperidadeUi = 'ui-r3-20261005T193609Z';
const runtimeStyle = document.createElement('style');
runtimeStyle.id = 'prosperidade-runtime-layout';
runtimeStyle.textContent = "\n/* Keep the header and the question in separate, scroll-safe layout regions. */\n.vq-app {\n  display: flex;\n  flex-direction: column;\n}\n.vq-app .vq-hud,\n.vq-app.is-guided-speaking .vq-hud {\n  position: relative;\n  inset: auto;\n  flex: 0 0 auto;\n  width: calc(100% - 74px);\n  margin: 14px 60px 0 14px;\n  text-align: left;\n  text-shadow: 0 2px 5px #000, 0 0 12px #000;\n}\n.vq-app .vq-hello,\n.vq-app.is-guided-speaking .vq-hello {\n  font-size: 12px;\n  line-height: 1.3;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.vq-app .vq-hud > span,\n.vq-app.is-guided-speaking .vq-hud > span {\n  margin-top: 6px;\n  font-size: 10px;\n  line-height: 1.2;\n}\n.vq-app .vq-hud > strong,\n.vq-app.is-guided-speaking .vq-hud > strong {\n  margin-top: 4px;\n  font-size: 22px;\n  line-height: 1.1;\n}\n.vq-app .vq-energy,\n.vq-app.is-guided-speaking .vq-energy {\n  margin-top: 8px;\n  font-size: 10px;\n  line-height: 1.3;\n}\n.vq-app .vq-energy-track,\n.vq-app.is-guided-speaking .vq-energy-track {\n  height: 7px;\n  margin-top: 4px;\n}\n/* Unlocked icons always stay in the header, immediately below the bar. */\n.vq-app .vq-strip,\n.vq-app.is-guided-speaking .vq-strip {\n  position: static;\n  inset: auto;\n  display: flex;\n  flex-flow: row wrap;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 6px;\n  width: 100%;\n  max-height: none;\n  margin: 0;\n  padding: 8px 0 0;\n  overflow: visible;\n}\n.vq-app .vq-strip:empty { display: none; }\n.vq-app .vq-strip img,\n.vq-app.is-guided-speaking .vq-strip img {\n  display: block;\n  flex: 0 0 30px;\n  width: 30px;\n  height: 30px;\n  margin: 0;\n  border-radius: 8px;\n  object-fit: contain;\n  object-position: center;\n}\n.vq-app .vq-panel,\n.vq-app.is-guided-speaking .vq-panel {\n  position: relative;\n  inset: auto;\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  min-height: 0;\n  width: 100%;\n  padding: 16px 16px max(22px, env(safe-area-inset-bottom));\n  overflow-x: hidden;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n}\n.vq-app.is-guided-speaking .vq-panel {\n  padding-bottom: clamp(24px, 13dvh, 108px);\n}\n.vq-app .vq-panel > .vq-screen {\n  flex: 0 0 auto;\n  width: 100%;\n  margin-top: auto;\n}\n.vq-app .vq-answers { max-height: none; overflow: visible; }\n.vq-app .vq-answers button { flex-shrink: 0; }\n/* Center complete popup images; keep tall popups and buttons reachable. */\n.vq-app .vq-overlay {\n  padding: 18px;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  overscroll-behavior: contain;\n}\n.vq-app .vq-modal {\n  flex: 0 1 auto;\n  width: 100%;\n  max-width: 394px;\n  max-height: 100%;\n  min-height: 0;\n  margin: auto;\n  padding: 22px 18px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  text-align: center;\n  overflow-wrap: anywhere;\n}\n.vq-app .vq-modal > img {\n  display: block;\n  width: auto;\n  height: auto;\n  max-width: min(160px, 65%);\n  max-height: min(160px, 28dvh);\n  margin: 0 auto 14px;\n  object-fit: contain;\n  object-position: center;\n}\n.vq-app .vq-modal > h2 { margin: 10px 0 12px; line-height: 1.2; }\n.vq-app .vq-modal > p { line-height: 1.45; }\n.vq-app .vq-modal > button {\n  display: block;\n  width: 100%;\n  margin: 14px auto 0;\n  white-space: normal;\n  line-height: 1.3;\n}\n@media (max-height: 600px) {\n  .vq-app .vq-overlay { padding: 12px; }\n  .vq-app .vq-modal { padding: 16px 14px; }\n  .vq-app .vq-modal > img { max-height: 105px; max-width: 130px; }\n  .vq-app .vq-modal-title { font-size: 17px; }\n  .vq-app .vq-modal > h2 { font-size: 22px; }\n}\n/* END PROSPERIDADE UI FIX 20261005 */\n\n#quiz .vq-strip,#quiz.is-guided-speaking .vq-strip{position:static!important;inset:auto!important;transform:none!important;display:flex!important;flex-flow:row wrap!important;align-items:center;justify-content:flex-start;gap:6px;width:100%;max-height:none!important;margin:0!important;padding:8px 0 0!important;overflow:visible!important}\n#quiz .vq-strip:empty{display:none!important}\n#quiz .vq-strip>img,#quiz.is-guided-speaking .vq-strip>img{display:block;flex:0 0 30px!important;width:30px!important;height:30px!important;margin:0!important;object-fit:contain;object-position:center}\n#quiz .vq-modal>img{display:block!important;float:none!important;position:static!important;width:auto!important;height:auto!important;max-width:min(160px,65%)!important;max-height:min(160px,28dvh)!important;margin:0 auto 14px!important;object-fit:contain!important;object-position:center!important}\n@media(max-height:600px){#quiz .vq-modal>img{max-height:105px!important;max-width:130px!important}}";
document.head.appendChild(runtimeStyle);
for (const oldIcon of document.head.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="mask-icon"]')) oldIcon.remove();
for (const [rel, size, href] of [
  ['icon', '32x32', '/prosperidade/assets/site-icon-none-ui-r3-20261005T193609Z.png'],
  ['shortcut icon', '32x32', '/prosperidade/assets/site-icon-none-ui-r3-20261005T193609Z.png'],
  ['apple-touch-icon', '180x180', '/prosperidade/assets/touch-icon-none-ui-r3-20261005T193609Z.png']
]) {
  const link = document.createElement('link');
  link.rel = rel; link.sizes = size; link.type = 'image/png'; link.href = href;
  document.head.appendChild(link);
}

const BASE_PATH = '/prosperidade';
const asset = (name) => `${BASE_PATH}/assets/original/${name}`;
const clips = Object.fromEntries(Array.from({ length: 8 }, (_, index) => [`v${index + 1}`, asset(`v${index + 1}.mp4`)]));
const app = document.querySelector('#app');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function formatMoney(amount) {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function segmentFor(index) {
  return index === 0 ? 'v3' : index <= 5 ? 'v4' : index <= 8 ? 'v5' : index <= 14 ? 'v6' : 'v7';
}

function stageFor(index) {
  return index <= 5 ? 'Financial Awakening' : index <= 8 ? 'Faith & Commitment' : index <= 14 ? 'Vision & Desire' : 'Breaking Blocks';
}

async function mountQuiz() {
  document.title = 'A Message from Archangel Michael — Time To Thrive';
  const data = await fetch(`${BASE_PATH}/src/data.json`).then((response) => {
    if (!response.ok) throw new Error('Question data could not be loaded');
    return response.json();
  });
  const state = {
    gated: true, phase: 'entrance', nameInput: '', name: '', numberInput: '',
    questionIndex: 0, balance: 0, unlocked: [], overlay: null,
    muted: false, speaking: false, activeClip: '', loading: 0,
  };
  let fallbackTimer = null;
  let loadingTimer = null;
  let offerTimer = null;
  let stalledTicks = 0;
  let lastVideoTime = -1;

  app.innerHTML = `<main class="video-quiz-page"><div class="vq-app is-gated" id="quiz">
    <div class="vq-stage" aria-hidden="true">
      <video id="loop-video" src="${asset('loop.mp4')}" muted loop playsinline autoplay preload="auto"></video>
      ${Object.entries(clips).map(([key, url]) => `<video class="vq-speech" data-clip="${key}" src="${url}" playsinline preload="auto"></video>`).join('')}
      <audio id="background-music" src="${asset('bgm.mp3')}" loop preload="auto"></audio>
    </div>
    <div class="vq-scrim-top"></div><div class="vq-scrim-bottom"></div>
    <div class="vq-progress" id="progress" hidden><div id="progress-fill"></div></div>
    <button class="vq-sound" id="sound" type="button" aria-label="Turn sound off" hidden>🔊</button>
    <div class="vq-hud" id="hud" hidden></div>
    <div class="vq-speaking" id="speaking" hidden>Archangel Michael is speaking<i></i><i></i><i></i></div>
    <div class="vq-panel" id="panel" hidden></div>
    <div class="vq-gate" id="gate"><img src="${asset('logo.png')}" alt="Time To Thrive" />
      <h1>A message from Archangel Michael<br />is waiting for you</h1>
      <button type="button" id="begin">▶ TAP TO BEGIN</button><p>Turn your sound on 🔊</p>
    </div>
    <div class="vq-overlay" id="overlay" role="dialog" aria-modal="true" hidden></div>
  </div></main>`;

  const quiz = document.querySelector('#quiz');
  const videoMap = Object.fromEntries([...document.querySelectorAll('[data-clip]')].map((node) => [node.dataset.clip, node]));
  const music = document.querySelector('#background-music');
  const loop = document.querySelector('#loop-video');
  music.volume = 0.1;
  loop.play().catch(() => {});

  function stopFallback() {
    if (fallbackTimer) clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }

  function playClip(key) {
    if (state.activeClip === key) return;
    stopFallback();
    for (const [otherKey, video] of Object.entries(videoMap)) {
      if (otherKey !== key) { video.pause(); video.currentTime = 0; }
    }
    state.activeClip = key;
    const video = videoMap[key];
    video.currentTime = 0;
    video.muted = state.muted;
    state.speaking = true;
    render();
    video.play().catch(() => {
      fallbackTimer = setTimeout(() => {
        state.speaking = false;
        if (key === 'v8' && state.phase === 'loading') setLoading(100);
        render();
      }, 1500);
    });
  }

  for (const [key, video] of Object.entries(videoMap)) {
    video.addEventListener('play', () => { if (state.activeClip === key) { state.speaking = true; render(); } });
    video.addEventListener('playing', () => { if (state.activeClip === key) { state.speaking = true; render(); } });
    video.addEventListener('ended', () => {
      if (state.activeClip !== key) return;
      state.speaking = false;
      render();
      if (key === 'v8' && state.phase === 'loading') setLoading(100);
    });
    video.addEventListener('error', () => {
      if (state.activeClip !== key) return;
      state.speaking = false;
      if (key === 'v8' && state.phase === 'loading') setLoading(100);
      render();
    });
  }

  function setLoading(percent) {
    state.loading = Math.min(100, Math.max(0, percent));
    render();
    if (state.loading >= 100 && !offerTimer) {
      offerTimer = setTimeout(() => {
        music.pause();
        for (const video of Object.values(videoMap)) video.pause();
        try { sessionStorage.setItem('planfaith_offer', JSON.stringify({ fromQuiz: true, name: state.name })); } catch {}
        location.assign(`${BASE_PATH}/offer/`);
      }, 1200);
    }
  }

  function startLoading() {
    state.phase = 'loading';
    state.loading = 0;
    stalledTicks = 0;
    lastVideoTime = -1;
    playClip('v8');
    loadingTimer = setInterval(() => {
      const video = videoMap.v8;
      if (video.duration > 0) {
        if (video.currentTime === lastVideoTime) stalledTicks += 1;
        else stalledTicks = 0;
        lastVideoTime = video.currentTime;
        if (video.ended || video.currentTime >= video.duration - 0.35 || stalledTicks >= 25) setLoading(100);
        else setLoading(Math.min(99, Math.floor(video.currentTime / video.duration * 100)));
      } else setLoading(Math.min(100, state.loading + 1));
      if (state.loading >= 100) { clearInterval(loadingTimer); loadingTimer = null; }
    }, 100);
  }

  function advance() {
    if (state.questionIndex + 1 >= data.questions.length) { startLoading(); return; }
    state.questionIndex += 1;
    state.overlay = null;
    playClip(segmentFor(state.questionIndex));
    render();
  }

  function answer(value) {
    if (state.questionIndex === 0) state.balance = Number(value) * 101;
    const milestone = data.milestones[state.questionIndex];
    if (milestone) { state.overlay = milestone; render(); }
    else advance();
  }

  function continueOverlay() {
    if (!state.overlay) return;
    const key = state.overlay;
    if (key !== 'money' && !state.unlocked.includes(key)) state.unlocked.push(key);
    if (key === 'abundance') { state.overlay = 'money'; render(); }
    else advance();
  }

  function renderHud() {
    const hud = document.querySelector('#hud');
    hud.hidden = state.gated || state.phase !== 'quiz';
    if (hud.hidden) return;
    const percentage = Math.round((state.questionIndex + 1) / data.questions.length * 100);
    hud.innerHTML = `<div class="vq-hello">${state.name ? `Hello, ${escapeHtml(state.name)} — your journey has begun...` : ''}</div>
      <span>ACCOUNT BALANCE</span><strong>${escapeHtml(formatMoney(state.balance))}</strong>
      <div class="vq-energy"><i>Your energy is aligning with the divine...</i><i>${percentage}%</i></div>
      <div class="vq-energy-track"><div style="width:${percentage}%"></div></div>
      <div class="vq-strip" data-layout="below-energy-bar" style="position:static!important;inset:auto!important;float:none!important;transform:none!important;display:flex!important;flex-flow:row wrap!important;align-items:center!important;justify-content:flex-start!important;gap:6px!important;width:100%!important;max-height:none!important;margin:0!important;padding:8px 0 0!important;overflow:visible!important;">${state.unlocked.map((key) => `<img src="${data.overlays[key].image}" alt="${escapeHtml(data.overlays[key].name)}" />`).join('')}</div>`;
  }

  function renderPanel() {
    const panel = document.querySelector('#panel');
    panel.hidden = state.gated || (state.speaking && state.phase !== 'quiz' && state.phase !== 'loading');
    if (panel.hidden) return;
    if (state.phase === 'entrance') {
      panel.innerHTML = `<section class="vq-screen vq-entrance"><div>
        <p>God does not bring you here by accident.<br /><b>Type your name below and step into what was prepared for you.</b></p>
        <input id="name-input" aria-label="Your name" placeholder="Your name" autocomplete="off" />
        <button type="button" id="name-submit">BEGIN</button></div></section>`;
      const input = panel.querySelector('#name-input');
      input.value = state.nameInput;
      input.addEventListener('input', () => { state.nameInput = input.value; });
      input.addEventListener('keydown', (event) => { if (event.key === 'Enter') submitName(); });
      panel.querySelector('#name-submit').addEventListener('click', submitName);
    } else if (state.phase === 'affirmation') {
      panel.innerHTML = `<section class="vq-screen"><div><div class="vq-vow">
        <p>Repeat this phrase out loud:</p><h1>“The life of my dreams begins with my choice.”</h1>
        <p>Only click continue after repeating it out loud.</p></div>
        <button type="button" id="affirmation-continue">Continue Journey</button></div></section>`;
      panel.querySelector('#affirmation-continue').addEventListener('click', () => {
        state.phase = 'quiz'; playClip('v3'); render();
      });
    } else if (state.phase === 'quiz') {
      const question = data.questions[state.questionIndex];
      const questionText = question.text.replaceAll('[NAME]', state.name);
      const answerHtml = state.speaking ? '' : question.type === 'number'
        ? `<div><input id="number-input" aria-label="Account balance" type="number" placeholder="${escapeHtml(question.placeholder)}" />
             <button type="button" id="number-submit">Continue</button></div>`
        : `<div class="vq-answers">${question.options.map((option, index) => `<button type="button" data-answer="${index}">${escapeHtml(option)}</button>`).join('')}</div>`;
      panel.innerHTML = `<section class="vq-screen vq-question"><span>${escapeHtml(stageFor(state.questionIndex))}</span>
        <h1>${escapeHtml(questionText)}</h1>${answerHtml}</section>`;
      if (!state.speaking && question.type === 'number') {
        const input = panel.querySelector('#number-input');
        input.value = state.numberInput;
        input.addEventListener('input', () => { state.numberInput = input.value; });
        input.addEventListener('keydown', (event) => { if (event.key === 'Enter') submitNumber(); });
        panel.querySelector('#number-submit').addEventListener('click', submitNumber);
      } else if (!state.speaking) {
        for (const button of panel.querySelectorAll('[data-answer]')) {
          button.addEventListener('click', () => answer(question.options[Number(button.dataset.answer)]));
        }
      }
    } else if (state.phase === 'loading') {
      const p = state.loading;
      const status = p >= 97 ? 'Finalizing your manifestation...'
        : p >= 85 ? 'Writing your Sacred Script, word by word...'
        : p >= 68 ? 'Breaking spiritual blocks...'
        : p >= 45 ? 'Aligning your energy with the divine...'
        : p >= 22 ? 'Reading the desires of your heart...'
        : 'Starting transformation...';
      panel.innerHTML = `<section class="vq-screen vq-loading"><h1>${escapeHtml(state.name)}, your Divine Manifestation Script is being created...</h1>
        <strong>${status}</strong><div class="vq-load-track"><div style="width:${p}%"></div></div><b>${p}%</b></section>`;
    }
  }

  function renderOverlay() {
    const overlay = document.querySelector('#overlay');
    overlay.hidden = !state.overlay || state.speaking;
    if (overlay.hidden) return;
    if (state.overlay === 'money') {
      overlay.innerHTML = `<div class="vq-modal"><div class="vq-modal-title">💰 &nbsp;Money</div>
        <h2>${escapeHtml(state.name)}</h2><p>Your manifestation potential depends on your choice. Think big to manifest big things — you are the size of your courage.</p>
        <button type="button" id="overlay-continue">Continue Journey</button></div>`;
    } else {
      const item = data.overlays[state.overlay];
      const body = state.overlay === 'mult'
        ? `${escapeHtml(state.name)}, today I'm adding 100x more to your account — do you believe?`
        : escapeHtml(item.sub);
      overlay.innerHTML = `<div class="vq-modal"><div class="vq-modal-title">✓ &nbsp;UNLOCKED! &nbsp;✦</div>
        <div class="vq-modal-media" style="display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:clamp(96px,20dvh,160px)!important;margin:0 auto 14px!important;float:none!important;position:static!important;">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" style="display:block!important;float:none!important;position:static!important;inset:auto!important;transform:none!important;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;margin:auto!important;object-fit:contain!important;object-position:center!important;flex:none!important;" />
        </div><h2>${escapeHtml(item.name)}</h2>
        <p>${body}</p>${state.overlay === 'mult' ? `<div class="vq-balance">New Balance: ${escapeHtml(formatMoney(state.balance))}</div>` : ''}
        <button type="button" id="overlay-continue">${escapeHtml(item.button)}</button></div>`;
    }
    overlay.querySelector('#overlay-continue').addEventListener('click', continueOverlay);
  }

  function render() {
    quiz.className = `vq-app${state.speaking ? ' is-video-speaking' : ''}${state.speaking && state.phase === 'quiz' ? ' is-guided-speaking' : ''}${state.gated ? ' is-gated' : ''}`;
    for (const [key, video] of Object.entries(videoMap)) {
      video.classList.toggle('is-speaking', state.speaking && state.activeClip === key);
    }
    document.querySelector('#gate').hidden = !state.gated;
    const progress = document.querySelector('#progress');
    progress.hidden = state.gated || (state.phase !== 'quiz' && state.phase !== 'loading');
    document.querySelector('#progress-fill').style.width = `${state.phase === 'loading' ? 100 : (state.questionIndex + 1) / data.questions.length * 100}%`;
    const sound = document.querySelector('#sound');
    sound.hidden = state.gated;
    sound.textContent = state.muted ? '🔇' : '🔊';
    sound.setAttribute('aria-label', state.muted ? 'Turn sound on' : 'Turn sound off');
    document.querySelector('#speaking').hidden = state.gated || !state.speaking;
    renderHud(); renderPanel(); renderOverlay();
  }

  function submitName() {
    const trimmed = state.nameInput.trim();
    if (!trimmed) return;
    state.name = trimmed;
    state.phase = 'affirmation';
    playClip('v2'); render();
  }

  function submitNumber() {
    if (state.numberInput === '') return;
    answer(Number(state.numberInput));
  }

  document.querySelector('#begin').addEventListener('click', () => {
    state.gated = false;
    music.muted = state.muted;
    music.play().catch(() => {});
    loop.play().catch(() => {});
    playClip('v1'); render();
  });
  document.querySelector('#sound').addEventListener('click', () => {
    state.muted = !state.muted;
    for (const video of Object.values(videoMap)) video.muted = state.muted;
    music.muted = state.muted;
    render();
  });
  render();
}

async function mountOffer() {
  document.title = 'Your Divine Manifestation Script — Time To Thrive';
  let session = null;
  try { session = JSON.parse(sessionStorage.getItem('planfaith_offer') || 'null'); } catch {}
  const name = String(session?.name || '').trim().toUpperCase();
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const products = [
    { amount: 27, image: 'sedd-of-fath-27.jpg' },
    { amount: 47, image: 'seed-of-faith47.jpg' },
    { amount: 77, image: 'seed-of-fath-77.jpg' },
    { amount: 87, image: 'seed-of-faith-100.jpg' },
  ];
  app.innerHTML = `<main class="faith-shell offer-page"><div class="offer-wrap">
    <img src="${asset('logo.png')}" alt="Time To Thrive" class="offer-logo" />
    <h1>${name ? `${escapeHtml(name)}, you've` : `You've`} made it this far… and that's no accident.</h1>
    <p class="offer-sub">Today is <b>${escapeHtml(today)}</b> – the first day of your new reality.</p>
    <div class="video-box" id="offer-video"></div>
    <div class="product-info"><b>What you receive:</b> a personalized digital inspirational Script and the complete <b>Faith &amp; Abundance Blueprint</b> — a 200+ page biblical guide of prayers, scriptures, and daily declarations for every area of your life.</div>
    <div class="badges"><span>📩 Delivered instantly by email</span><span>💻 100% digital — no shipping</span><span>🔒 Secure checkout</span></div>
    <p class="guarantee">Backed by our 7-day money-back guarantee — see our <a href="${BASE_PATH}/refund/">Refund Policy</a>.</p>
    <h2>${name ? `${escapeHtml(name)}, make` : 'Make'} your choice now</h2>
    <div class="seed-list">${products.map(({ amount, image }) => `<div class="seed-block">
      <button type="button" class="seed-image checkout-btn" data-checkout="${amount}" aria-label="Choose Seed of Faith $${amount}"><img src="${asset(image)}" alt="Seed of Faith $${amount}" /></button>
      <button type="button" class="seed-cta checkout-btn" data-checkout="${amount}">This is the life I choose – $${amount}</button>
    </div>`).join('')}</div>
  </div></main>`;
  const box = document.querySelector('#offer-video');
  mountOfferPlayer(box, { src: config.offerVideo, poster: config.offerPoster });
  for (const button of document.querySelectorAll('[data-checkout]')) {
    button.addEventListener('click', () => {
      const url = config.checkoutUrls[Number(button.dataset.checkout)];
      if (!url) return;
      button.classList.add('is-clicked');
      button.disabled = true;
      setTimeout(() => location.assign(url), 180);
    });
  }
}

function mountLegal(route) {
  const page = {
    refund: {
      title: 'Refund',
      body: `Digital purchases are backed by the stated 7-day money-back guarantee. For assistance, contact ${config.supportEmail}.`,
    },
    privacy: { title: 'Privacy', body: `This page explains the privacy policies governing the Time To Thrive digital experience and purchases. For questions, contact ${config.supportEmail}.` },
    terms: { title: 'Terms', body: `These terms govern the Time To Thrive digital experience and purchases. For questions, contact ${config.supportEmail}.` },
    support: { title: 'Support', body: `For support with your digital product or order, contact ${config.supportEmail}.` },
  }[route];
  document.title = `${page.title} — Time To Thrive`;
  app.innerHTML = `<main class="faith-shell legal-page"><article><h1>${page.title}</h1><p>${escapeHtml(page.body)}</p>
    <a href="${BASE_PATH}/offer-novo/">Return to the offer</a></article></main>`;
}

const pathname = location.pathname.replace(/\/$/, '') || '/';
const route = pathname.startsWith(BASE_PATH) ? (pathname.slice(BASE_PATH.length) || '/') : pathname;
if (route === '/offer') mountOffer().catch(console.error);
else if (['/refund', '/privacy', '/terms', '/support'].includes(route)) mountLegal(route.slice(1));
else mountQuiz().catch((error) => {
  console.error(error);
  app.innerHTML = '<main class="video-quiz-page" style="align-items:center;justify-content:center;text-align:center;padding:24px">The experience could not be loaded. Please refresh the page.</main>';
});
