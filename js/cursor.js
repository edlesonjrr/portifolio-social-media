/* ══════════════════════════════════════════
   cursor.js
══════════════════════════════════════════ */

(function () {
  'use strict';
  const isMob = window.matchMedia('(hover: none)').matches;
  if (isMob) return;

  const cur = document.getElementById('cur');
  const dot = document.getElementById('curDot');
  if (!cur || !dot) return;

  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top  = ty + 'px';
  });

  (function loop() {
    cx += (tx - cx) * .12;
    cy += (ty - cy) * .12;
    cur.style.left = cx + 'px';
    cur.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();

  /* Hover states */
  document.querySelectorAll('a, button, .svc-card, .tcard').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('h'));
    el.addEventListener('mouseleave', () => cur.classList.remove('h'));
  });

  document.querySelectorAll('.work-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.classList.remove('h');
      cur.classList.add('p');
    });
    el.addEventListener('mouseleave', () => cur.classList.remove('p'));
  });
})();
