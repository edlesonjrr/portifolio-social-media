/* ══════════════════════════════════════════
   hero-mouse.js
   Parallax suave com mouse: blobs de fundo,
   foto da Yasmin e anéis decorativos.
   Yasmin Labanca Films
══════════════════════════════════════════ */
(function () {
    'use strict';

    const noAnim = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMob = window.matchMedia('(hover: none)').matches;
    if (noAnim || isMob) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const photo = hero.querySelector('.hero-photo');
    const blob1 = hero.querySelector('.hero-blob-1');
    const blob2 = hero.querySelector('.hero-blob-2');
    const blob3 = hero.querySelector('.hero-blob-3');
    const ring1 = hero.querySelector('.hero-img-ring-1');
    const ring2 = hero.querySelector('.hero-img-ring-2');
    const tag = hero.querySelector('.hero-tag');

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let rafId = null, isOver = false;

    function onMove(e) {
        tx = (e.clientX / window.innerWidth - .5) * 2;
        ty = (e.clientY / window.innerHeight - .5) * 2;
        if (!isOver) { isOver = true; startLoop(); }
    }
    function onLeave() { isOver = false; }

    function tr(el, x, y, s, extra) {
        if (!el) return;
        el.style.transform = `translate3d(${x * s}px,${y * s}px,0)${extra || ''}`;
    }

    function loop() {
        const spd = isOver ? .055 : .032;
        cx += (tx - cx) * spd;
        cy += (ty - cy) * spd;

        if (!isOver && Math.abs(cx) + Math.abs(cy) < .0008) {
            cx = 0; cy = 0; rafId = null;
            /* reset suave */
            [blob1, blob2, blob3, tag].forEach(el => { if (el) el.style.transform = ''; });
            if (photo) photo.style.transform = '';
            if (ring1) ring1.style.transform = '';
            if (ring2) ring2.style.transform = '';
            return;
        }

        /* Blobs — movem em direções opostas para profundidade */
        tr(blob1, cx, cy, -20);
        tr(blob2, cx, cy, 15);
        tr(blob3, cx, cy, -11);

        /* Foto — parallax + tilt 3D suave */
        if (photo) {
            photo.style.transform = `
        translate3d(${cx * -9}px, ${cy * -7}px, 0)
        rotateX(${cy * 3.5}deg)
        rotateY(${-cx * 3.5}deg)
      `;
        }

        /* Anéis — layer diferente */
        if (ring1) ring1.style.transform = `rotate(${cx * 6}deg) translateY(${cy * 4}px)`;
        if (ring2) ring2.style.transform = `rotate(${-cx * 5}deg) translateY(${cy * 3}px)`;

        /* Tag no rodapé da foto */
        tr(tag, cx, cy, -7);

        rafId = requestAnimationFrame(loop);
    }

    function startLoop() { if (!rafId) rafId = requestAnimationFrame(loop); }

    /* Brilho direcional sutil na foto */
    if (photo) {
        const baseFilter = 'drop-shadow(0 24px 56px rgba(232,86,122,.15)) drop-shadow(0 6px 18px rgba(0,0,0,.07))';
        photo.style.transformStyle = 'preserve-3d';
        photo.style.willChange = 'transform';

        hero.addEventListener('mousemove', e => {
            const r = hero.getBoundingClientRect();
            const py = ((e.clientY - r.top) / r.height - .5) * 2;
            const b = 1 + Math.max(0, -py) * 0.035;
            photo.style.filter = `${baseFilter} brightness(${b})`;
        });
        hero.addEventListener('mouseleave', () => {
            photo.style.filter = baseFilter;
        });
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave);
})();