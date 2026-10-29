(function () {
  // Equivalent to the pixel loader supplied for this site.
  if (document.getElementById('tiktok-pixel-loader')) return;

  window.tikTokPixelId = '6ac83c0237d6812b4693df63';
  var script = document.createElement('script');
  script.id = 'tiktok-pixel-loader';
  script.src = 'https://cdn.utmify.com.br/scripts/pixel/pixel-tiktok.js';
  script.async = true;
  script.defer = true;
  (document.head || document.documentElement).appendChild(script);
})();
