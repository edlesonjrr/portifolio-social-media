/* ══════════════════════════════════════════
   badge.js — Badge circular rotativo no hero
   Usa SVG textPath para texto em círculo
══════════════════════════════════════════ */

(function () {
  'use strict';

  const wrap = document.getElementById('hero-badge');
  if (!wrap) return;

  const SIZE = 130;
  const R    = 52;
  const CX   = SIZE / 2;
  const CY   = SIZE / 2;
  const TEXT = 'VIDEOMAKER · FILMMAKER · SOCIAL MEDIA · ';
  const ID   = 'badgePath';

  const ns  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', SIZE);
  svg.setAttribute('height', SIZE);
  svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`);
  svg.style.cssText = 'position:absolute;inset:0;animation:spin 18s linear infinite;';

  /* Caminho circular */
  const defs = document.createElementNS(ns, 'defs');
  const path = document.createElementNS(ns, 'path');
  path.setAttribute('id', ID);
  path.setAttribute('d', `
    M ${CX},${CY - R}
    a ${R},${R} 0 1,1 -.01,0
    z
  `);
  defs.appendChild(path);
  svg.appendChild(defs);

  /* Texto no caminho */
  const textEl   = document.createElementNS(ns, 'text');
  textEl.setAttribute('font-size', '7.5');
  textEl.setAttribute('font-family', 'DM Sans, sans-serif');
  textEl.setAttribute('font-weight', '600');
  textEl.setAttribute('letter-spacing', '2');
  textEl.setAttribute('fill', '#E8567A');
  textEl.setAttribute('text-transform', 'uppercase');

  const tp = document.createElementNS(ns, 'textPath');
  tp.setAttribute('href', '#' + ID);
  tp.textContent = TEXT;
  textEl.appendChild(tp);
  svg.appendChild(textEl);

  /* Ícone central — câmera SVG */
  const icon = document.createElementNS(ns, 'g');
  icon.setAttribute('transform', `translate(${CX - 14}, ${CY - 12})`);
  icon.innerHTML = `
    <rect x="0" y="3" width="22" height="16" rx="3"
      fill="none" stroke="#E8567A" stroke-width="1.5"/>
    <path d="M22 9 L30 5 L30 19 L22 15"
      fill="none" stroke="#E8567A" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="10" cy="11" r="3"
      fill="none" stroke="#E8567A" stroke-width="1.2"/>
  `;
  svg.appendChild(icon);

  wrap.appendChild(svg);

  /* Anima @keyframes spin via style tag se não existir */
  if (!document.getElementById('badge-spin-style')) {
    const style = document.createElement('style');
    style.id = 'badge-spin-style';
    style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(style);
  }
})();
