/* ══════════════════════════════════════════
   tilt.js — 3D tilt suave nos cards
   Yasmin Labanca Films
══════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const MAX_CARDS = 12;
  const MAX_WORK = 7;
  const RESET_MS = 480;
  const EASE_IN = 'transform .14s ease';
  const EASE_OUT = `transform ${RESET_MS}ms cubic-bezier(0.16,1,0.3,1)`;

  function applyTilt(el, maxDeg) {
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    el.addEventListener('mouseenter', () => {
      el.style.transition = EASE_IN;
    });

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * maxDeg;
      const ry = ((x - r.width / 2) / r.width) * -maxDeg;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = EASE_OUT;
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      setTimeout(() => { el.style.transition = ''; }, RESET_MS);
    });
  }

  /* Cards de serviços e depoimentos */
  document.querySelectorAll('.svc-card, .tcard').forEach(el => applyTilt(el, MAX_CARDS));

  /* Work items — tilt mais sutil */
  document.querySelectorAll('.work-item').forEach(el => applyTilt(el, MAX_WORK));

  /* About badge */
  const badge = document.querySelector('.about-badge');
  if (badge) applyTilt(badge, 8);

})();