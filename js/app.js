(function () {
  'use strict';

  /* ─── State ─────────────────────────────────────────── */
  const state = {
    data: [],
    filter: 'all',
  };

  /* ─── DOM refs ──────────────────────────────────────── */
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  const grid = $('#cardsGrid');
  const noResults = $('#noResults');
  const totalEl = $('#total-count');
  const catEl = $('#cat-count');
  const hero = $('#hero');
  const canvas = $('#particleCanvas');
  const progressThumb = $('#progressThumb');
  const filterBar = $('.filter-bar');
  const modal = $('#badgeModal');
  const modalImg = $('#modalBadgeImg');
  const modalClose = $('#modalClose');
  const modalLink = $('#modalLink');
  const modalCertTitle = $('#modalCertTitle');

  /* ─── Data helpers ──────────────────────────────────── */
  function categories() {
    return [...new Set(state.data.map(function (c) { return c.category; }))];
  }

  function filtered() {
    return state.filter === 'all'
      ? state.data
      : state.data.filter(function (c) { return c.category === state.filter; });
  }

  /* ─── Render ─────────────────────────────────────────── */
  function cardHTML(c, i) {
    var iconMap = { network: '🌐', ai: '🤖', linux: '🐧', other: '📎' };
    var badgeMap = { network: 'Networking', ai: 'AI', linux: 'Linux & OS', other: 'Other' };
    return '<article class="card" data-category="' + c.category + '" data-index="' + i + '" role="listitem">'
      + '<div class="card-accent" aria-hidden="true"></div>'
      + '<div class="card-header">'
      + '<span class="card-icon">' + (iconMap[c.category] || '📜') + '</span>'
      + '<span class="card-badge ' + c.category + '">' + (badgeMap[c.category] || c.category) + '</span>'
      + '</div>'
      + '<h2 class="card-title">' + c.title + '</h2>'
      + '<p class="card-issuer">🏛️ ' + c.issuer + '</p>'
      + '<p class="card-date">📅 ' + c.date + '</p>'
      + '<p class="card-desc">' + c.description + '</p>'
      + (c.badgeImage
        ? '<div class="card-badge-img-wrapper" tabindex="0" role="button" aria-label="View badge">'
          + '<img src="' + c.badgeImage + '" alt="' + c.title + ' badge" class="card-badge-img" loading="lazy">'
          + '</div>'
        : '')
      + '<div class="card-footer">'
      + '<a href="' + c.credentialUrl + '" class="card-link" target="_blank" rel="noopener">🔗 View Certificate</a>'
      + '</div>'
      + '</article>';
  }

  function render() {
    var items = filtered();
    grid.innerHTML = items.map(function (c, i) { return cardHTML(c, i); }).join('');
    noResults.classList.toggle('visible', items.length === 0);
    updateStats();
    bindCardEvents();
    bindBadgeClicks();
    initScrollReveal();
  }

  function updateStats() {
    totalEl.textContent = state.data.length;
    catEl.textContent = categories().length;
    animateCounter(totalEl, state.data.length);
    animateCounter(catEl, categories().length);
  }

  /* ─── Counter animation ─────────────────────────────── */
  var counterObserved = false;

  function animateCounter(el, target) {
    var dur = 1200;
    var start = performance.now();

    function step(now) {
      var t = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target);
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counterObserved) {
      counterObserved = true;
      animateCounter(totalEl, state.data.length);
      animateCounter(catEl, categories().length);
    }
  }, { threshold: 0.5 }).observe($('.hero-stats'));

  /* ─── Filter ─────────────────────────────────────────── */
  function setFilter(f) {
    state.filter = f;
    $$('.filter-btn').forEach(function (b) {
      var active = b.dataset.filter === f;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    render();
  }

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (btn) setFilter(btn.dataset.filter);
  });

  /* ─── Keyboard nav for filter buttons ────────────────── */
  filterBar.addEventListener('keydown', function (e) {
    var btns = $$('.filter-btn');
    var idx = btns.indexOf(document.activeElement);
    if (idx === -1) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      btns[(idx + 1) % btns.length].focus();
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      btns[(idx - 1 + btns.length) % btns.length].focus();
    }
  });

  /* ─── Card events (3D tilt) ──────────────────────────── */
  function bindCardEvents() {
    $$('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        var cx = r.width / 2, cy = r.height / 2;
        card.style.setProperty('--rotX', ((y - cy) / cy) * -8 + 'deg');
        card.style.setProperty('--rotY', ((x - cx) / cx) * 8 + 'deg');
      });
      card.addEventListener('mouseleave', function () {
        card.style.setProperty('--rotX', '0deg');
        card.style.setProperty('--rotY', '0deg');
      });
    });
  }

  /* ─── Badge image click → modal ──────────────────────── */
  function bindBadgeClicks() {
    $$('.card-badge-img-wrapper').forEach(function (wrapper, i) {
      wrapper.addEventListener('click', function () { openModal(i); });
      wrapper.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(i); }
      });
    });
  }

  function openModal(idx) {
    var items = filtered();
    var cert = items[idx];
    if (!cert || !cert.badgeImage) return;
    modalImg.src = cert.badgeImage;
    modalImg.alt = cert.title + ' badge';
    modalCertTitle.textContent = cert.title;
    modalLink.href = cert.credentialUrl;
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('modal-open')) closeModal();
  });

  /* ─── Scroll reveal ──────────────────────────────────── */
  function initScrollReveal() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-appear');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.card:not(.card-appear)').forEach(function (card) { obs.observe(card); });
  }

  /* ─── Progress bar ───────────────────────────────────── */
  window.addEventListener('scroll', function () {
    var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressThumb.style.transform = 'scaleX(' + Math.min(pct, 1) + ')';
  });

  /* ─── Typewriter ─────────────────────────────────────── */
  (function typewriter() {
    var el = $('#typewriter');
    var text = 'A compilation of officially acquired and recognized skills.';
    var i = 0;
    el.textContent = '';
    el.style.opacity = '1';

    function tick() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(tick, 28 + Math.random() * 22);
      }
    }
    setTimeout(tick, 600);
  })();

  /* ─── Particles ──────────────────────────────────────── */
  (function particles() {
    var pts = [];
    var mouse = { x: -1000, y: -1000 };
    var COUNT = Math.min(80, Math.floor(window.innerWidth / 12));
    var animId;

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }

    function init() {
      pts = [];
      for (var i = 0; i < COUNT; i++) {
        pts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    }

    resize();
    init();

    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', function () { mouse.x = -1000; mouse.y = -1000; });

    var ctx = canvas.getContext('2d');

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        var dist = Math.hypot(dx, dy);

        if (dist < 180) {
          var f = (180 - dist) / 180 * 0.02;
          p.vx += dx * f;
          p.vy += dy * f;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(50,108,229,0.35)';
        ctx.fill();

        for (var j = i + 1; j < pts.length; j++) {
          var p2 = pts[j];
          var d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(50,108,229,' + (1 - d / 120) * 0.25 + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { resize(); init(); }, 200);
    });

    draw();
  })();

  /* ─── Year ───────────────────────────────────────────── */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Init ───────────────────────────────────────────── */
  function init() {
    var jsonUrl = 'data/certifications.json?t=' + Date.now();

    fetch(jsonUrl)
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load certifications');
        return r.json();
      })
      .then(function (json) {
        state.data = json.certifications || json;
        render();
        document.body.classList.add('js-animate');
      })
      .catch(function (err) {
        console.error(err);
        grid.innerHTML = '<p class="no-results visible">⚠️ Failed to load certifications. Please try again later.</p>';
      });
  }

  init();
})();
