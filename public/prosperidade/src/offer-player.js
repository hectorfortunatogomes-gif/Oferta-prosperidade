export function mountOfferPlayer(container, { src, poster }) {
  const stylesheet = '/prosperidade/src/offer-player.css';
  if (!document.querySelector(`link[href="${stylesheet}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheet;
    document.head.appendChild(link);
  }

  container.classList.add('direct-player');
  const video = document.createElement('video');
  video.className = 'direct-player-video';
  video.src = src;
  video.poster = poster;
  video.preload = 'metadata';
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('aria-label', 'Your personalized message');

  const listen = document.createElement('button');
  listen.type = 'button';
  listen.className = 'direct-player-listen';
  listen.innerHTML = '<span class="direct-player-prompt"><span class="direct-player-play" aria-hidden="true">▶</span><strong>CLICK TO LISTEN</strong><span>Watch your message with sound</span></span>';
  listen.setAttribute('aria-label', 'Play your message from the beginning with sound');

  const status = document.createElement('p');
  status.className = 'direct-player-status';
  status.setAttribute('role', 'status');
  status.hidden = true;
  container.replaceChildren(video, listen, status);

  video.addEventListener('loadedmetadata', () => {
    if (video.videoWidth && video.videoHeight) {
      container.style.setProperty('--player-ratio', `${video.videoWidth} / ${video.videoHeight}`);
    }
  });

  listen.addEventListener('click', async () => {
    listen.disabled = true;
    video.loop = false;
    video.muted = false;
    video.volume = 1;
    video.currentTime = 0;
    video.controls = true;
    try {
      await video.play();
      listen.hidden = true;
      status.hidden = true;
      video.focus();
    } catch {
      listen.disabled = false;
      status.textContent = 'Tap to play your message.';
      status.hidden = false;
    }
  });

  video.addEventListener('error', () => {
    listen.hidden = true;
    status.replaceChildren(document.createTextNode('The video could not load. '));
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.textContent = 'Try again';
    retry.addEventListener('click', () => {
      status.hidden = true;
      listen.disabled = false;
      listen.hidden = false;
      video.load();
      video.play().catch(() => {});
    });
    status.appendChild(retry);
    status.hidden = false;
  });

  // Browsers that block silent autoplay keep the poster and listen button visible.
  video.play().catch(() => {});
  return video;
}
