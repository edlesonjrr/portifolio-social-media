/* ══════════════════════════════════════════
   navbar.js
   FIX: aria-hidden no mob, dois listeners
        de scroll fundidos em um, scroll
        nativo com offset para navbar fixa
   Yasmin Labanca Films
══════════════════════════════════════════ */
(function () {
  'use strict';

  const prog = document.getElementById('prog');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mob = document.getElementById('mob');

  /* ── FIX: um único listener de scroll para tudo ── */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.body.scrollHeight - window.innerHeight;

    // Progress bar
    if (prog) {
      const pct = max > 0 ? (scrolled / max * 100) : 0;
      prog.style.width = pct + '%';
      prog.setAttribute('aria-valuenow', Math.round(pct));
    }

    // Navbar scroll class
    if (nav) nav.classList.toggle('s', scrolled > 80);

  }, { passive: true });

  /* ── Burger menu ── */
  if (burger && mob) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('o');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu de navegação');
      mob.classList.toggle('o', open);
      // FIX: aria-hidden correto no menu mobile
      mob.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('o');
        mob.classList.remove('o');
        mob.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu de navegação');
        document.body.style.overflow = '';
      });
    });

    // FIX: fechar menu mobile com Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mob.classList.contains('o')) {
        burger.classList.remove('o');
        mob.classList.remove('o');
        mob.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Abrir menu de navegação');
        document.body.style.overflow = '';
        burger.focus();
      }
    });
  }

  /* ── Smooth scroll com offset para navbar fixa ── */
  const NAV_HEIGHT = 70; // px — altura aproximada da navbar

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      // FIX: scroll com offset para não esconder conteúdo sob a navbar
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });

      // FIX: atualiza URL sem recarregar
      history.pushState(null, '', href);
    });
  });
})();