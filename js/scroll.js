/* ══════════════════════════════════════════
   scroll.js — GSAP avançado + Lazy Loading
   Yasmin Labanca Films
══════════════════════════════════════════ */
(function () {
  'use strict';

  const noAnim = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMob = window.matchMedia('(hover: none)').matches;

  /* ════════════════════════
     LAZY LOADING
  ════════════════════════ */
  function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const img = en.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity .65s ease';
        const onLoad = () => { img.style.opacity = '1'; };
        if (img.complete) onLoad();
        else img.addEventListener('load', onLoad, { once: true });
        imgObs.unobserve(img);
      });
    }, { rootMargin: '220px 0px' });

    imgs.forEach(img => imgObs.observe(img));
  }

  /* ════════════════════════
     SCROLL REVEAL (CSS)
  ════════════════════════ */
  function initReveal() {
    const all = document.querySelectorAll('[data-r],[data-r-left],[data-r-right],[data-r-scale]');
    if (noAnim) { all.forEach(el => el.classList.add('in')); return; }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.style.transitionDelay = (parseFloat(el.dataset.d || 0)) + 's';
        el.classList.add('in');
        obs.unobserve(el);
      });
    }, { threshold: .08, rootMargin: '0px 0px -40px 0px' });

    all.forEach(el => obs.observe(el));
  }

  /* ════════════════════════
     COUNTER ANIMATION
  ════════════════════════ */
  function animateCounter(el) {
    const raw = el.dataset.count || el.textContent;
    const isInf = raw.includes('∞');
    if (isInf) return;
    const isPlus = raw.includes('+');
    const isPct = raw.includes('%');
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return;

    if (typeof gsap !== 'undefined') {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: num, duration: 2.2, ease: 'power2.out',
        onUpdate() {
          el.textContent = (isPlus ? '+' : '') + Math.round(obj.v) + (isPct ? '%' : '');
        }
      });
    }
  }

  /* ════════════════════════
     GSAP — on load
  ════════════════════════ */
  window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    /* ── Hero parallax content ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        // FIX: remove opacity do scrub — o GSAP não revertia opacity:0
        // ao voltar ao topo, causando texto invisível.
        // Mantém só yPercent (parallax visual sem esconder conteúdo).
        gsap.fromTo(heroContent,
          { yPercent: 0 },
          {
            yPercent: -14, ease: 'none',
            scrollTrigger: {
              trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true
            }
          }
        );
      }

      // Bg move lento
      const heroBg = document.querySelector('.hero-bg img');
      if (heroBg) {
        gsap.fromTo(heroBg,
          { yPercent: 0 },
          {
            yPercent: 14, ease: 'none',
            scrollTrigger: {
              trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true
            }
          }
        );
      }

      // Scroll arrow desaparece
      const scrollEl = document.querySelector('.hero-scroll');
      if (scrollEl) {
        gsap.fromTo(scrollEl,
          { opacity: 1, y: 0 },
          {
            opacity: 0, y: 12, ease: 'none',
            scrollTrigger: {
              trigger: '.hero', start: 'top top', end: '18% top', scrub: true
            }
          }
        );
      }
    }

    /* ── About imagem parallax ── */
    if (!noAnim && !isMob && typeof ScrollTrigger !== 'undefined') {
      const aboutImg = document.querySelector('.about-img-wrap img');
      if (aboutImg) {
        gsap.fromTo(aboutImg, { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: {
            trigger: '.about-img-wrap', start: 'top bottom', end: 'bottom top', scrub: true
          }
        });
      }

      const badge = document.querySelector('.about-badge');
      if (badge) {
        gsap.to(badge, {
          y: -20, ease: 'none',
          scrollTrigger: {
            trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1
          }
        });
      }
    }

    /* ── Work grid stagger ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      const items = document.querySelectorAll('.work-item');
      if (items.length) {
        // Reset pois data-r pode conflitar
        items.forEach(el => { el.style.opacity = ''; el.style.transform = ''; el.classList.remove('in'); });
        gsap.set(items, { opacity: 0, y: 45, scale: .96 });
        ScrollTrigger.create({
          trigger: '.work-grid', start: 'top 82%', once: true,
          onEnter() {
            gsap.to(items, {
              opacity: 1, y: 0, scale: 1,
              duration: .85, stagger: .09, ease: 'power3.out'
            });
          }
        });
      }
    }

    /* ── Services stagger ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      const cards = document.querySelectorAll('.svc-card');
      if (cards.length) {
        cards.forEach(el => el.classList.remove('in'));
        gsap.set(cards, { opacity: 0, y: 55 });
        ScrollTrigger.create({
          trigger: '.svc-grid', start: 'top 80%', once: true,
          onEnter() {
            gsap.to(cards, {
              opacity: 1, y: 0,
              duration: .9, stagger: .13, ease: 'power3.out'
            });
          }
        });
      }
    }

    /* ── Process lines draw ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('.step-line:not(.last)').forEach(line => {
        gsap.fromTo(line,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1, duration: .9, ease: 'power2.inOut',
            scrollTrigger: { trigger: line, start: 'top 80%', once: true }
          }
        );
      });
    }

    /* ── CTA bg zoom ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      const ctaBg = document.querySelector('.cta-bg img');
      if (ctaBg) {
        gsap.fromTo(ctaBg, { scale: 1.12 }, {
          scale: 1, ease: 'none',
          scrollTrigger: {
            trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true
          }
        });
      }
    }

    /* ── Stat counters ── */
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-count]').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter() { animateCounter(el); }
        });
      });
    }

    /* ── Marquee fade in ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      const mw = document.querySelector('.marquee-wrap');
      if (mw) {
        gsap.fromTo(mw,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: mw, start: 'top 88%', once: true }
          }
        );
      }
    }

    /* ── Section labels fly in ── */
    if (!noAnim && typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('.lbl').forEach(el => {
        if (!el.closest('[data-r]')) {
          gsap.fromTo(el,
            { opacity: 0, x: -20 },
            {
              opacity: 1, x: 0, duration: .7, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            }
          );
        }
      });
    }

    ScrollTrigger.refresh();
  });

  /* ════════════════════════
     INIT
  ════════════════════════ */
  initLazyLoad();
  initReveal();

})();