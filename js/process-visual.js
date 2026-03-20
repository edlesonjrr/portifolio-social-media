/* ══════════════════════════════════════════
   process-visual.js
   Elemento decorativo interativo no lado
   direito da seção Processo — desktop only.
   Ícones em órbita que reagem ao mouse
   com parallax em profundidades diferentes.
   Yasmin Labanca Films
══════════════════════════════════════════ */
(function () {
    'use strict';

    if (window.matchMedia('(max-width: 900px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = document.querySelector('.process');
    if (!section) return;

    const hd = section.querySelector('.process-hd');
    const steps = section.querySelector('.steps');
    if (!hd || !steps) return;

    /* ── Ícones SVG temáticos ── */
    const ICONS = [
        /* 1 — câmera de vídeo */
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/>
      <rect x="2" y="6" width="13" height="12" rx="2"/>
    </svg>`,
        /* 2 — claquete */
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.2 6L3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4.3c1-.3 2.1.3 2.4 1.3L20.2 6z"/>
      <path d="M6.2 11.2L7 14"/>
      <path d="M11.2 9.7l.8 2.8"/>
      <path d="M2 13h20v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8z"/>
    </svg>`,
        /* 3 — play */
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
    </svg>`,
        /* 4 — estrela */
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>`,
        /* 5 — coração */
        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>`,
        /* 6 — Instagram */
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>`,
    ];

    /* Fator de parallax por ícone — profundidades diferentes */
    const DEPTH = [18, 28, 22, 16, 25, 20];

    /* ── Reestrutura a seção ── */
    const inner = document.createElement('div');
    inner.className = 'process-inner';

    const left = document.createElement('div');
    left.className = 'process-left';
    left.appendChild(hd);
    left.appendChild(steps);

    /* ── Monta o decorativo ── */
    const deco = document.createElement('div');
    deco.className = 'process-deco';
    deco.setAttribute('aria-hidden', 'true');

    /* Anéis */
    [1, 2, 3].forEach(n => {
        const r = document.createElement('div');
        r.className = `pd-ring pd-ring-${n}`;
        deco.appendChild(r);
    });

    /* Centro */
    deco.innerHTML += `
    <div class="pd-center">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/>
        <rect x="2" y="6" width="13" height="12" rx="2"/>
      </svg>
    </div>`;

    /* Ícones */
    const iconEls = ICONS.map((svg, i) => {
        const el = document.createElement('div');
        el.className = `pd-icon pd-icon-${i + 1}`;
        el.innerHTML = svg;
        deco.appendChild(el);
        return el;
    });

    inner.appendChild(left);
    inner.appendChild(deco);
    section.appendChild(inner);

    /* ── Mouse parallax ── */
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let rafId = null, active = false;

    function onMove(e) {
        const r = deco.getBoundingClientRect();
        /* Normaliza -1 a +1 relativo ao centro do elemento decorativo */
        tx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
        ty = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
        /* Clamp */
        tx = Math.max(-1, Math.min(1, tx));
        ty = Math.max(-1, Math.min(1, ty));
        if (!active) { active = true; startLoop(); }
    }

    function onLeave() { active = false; }

    function loop() {
        const spd = active ? .06 : .03;
        cx += (tx - cx) * spd;
        cy += (ty - cy) * spd;

        if (!active && Math.abs(cx) + Math.abs(cy) < .001) {
            cx = 0; cy = 0;
            iconEls.forEach(el => { el.style.transform = ''; });
            rafId = null;
            return;
        }

        iconEls.forEach((el, i) => {
            const d = DEPTH[i];
            const px = cx * d;
            const py = cy * d;
            /* Preserva a animação CSS de float — usa translateX/Y adicionais via CSS var */
            el.style.setProperty('--px', px + 'px');
            el.style.setProperty('--py', py + 'px');
            el.style.transform = `translate(calc(var(--px, 0px)), calc(var(--py, 0px)))`;
        });

        rafId = requestAnimationFrame(loop);
    }

    function startLoop() { if (!rafId) rafId = requestAnimationFrame(loop); }

    /* Escuta apenas quando a seção está visível */
    let sectionVisible = false;
    const visObs = new IntersectionObserver(entries => {
        sectionVisible = entries[0].isIntersecting;
        if (!sectionVisible) { active = false; }
    }, { threshold: .1 });
    visObs.observe(section);

    section.addEventListener('mousemove', e => {
        if (sectionVisible) onMove(e);
    }, { passive: true });

    section.addEventListener('mouseleave', onLeave);

    /* Hover nos ícones: leve escala */
    iconEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'box-shadow .3s ease, border-color .3s ease, scale .25s var(--ease)';
            el.style.scale = '1.18';
        });
        el.addEventListener('mouseleave', () => {
            el.style.scale = '';
        });
    });

})();