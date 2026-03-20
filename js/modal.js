/* ══════════════════════════════════════════
   modal.js — Marquee touch pause
   (Modal de vídeo removido — portfólio
    agora usa links diretos para Instagram)
   Yasmin Labanca Films
══════════════════════════════════════════ */
(function () {
  'use strict';

  /* Pausa marquee no touch */
  const mw = document.querySelector('.marquee-wrap');
  if (!mw) return;

  mw.addEventListener('touchstart', () => {
    mw.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'paused';
    });
  }, { passive: true });

  mw.addEventListener('touchend', () => {
    mw.querySelectorAll('.marquee-track').forEach(t => {
      t.style.animationPlayState = 'running';
    });
  });
})();