/* ============================================================
   Lorenzo Airoldi · Portfolio — Main Application
   ============================================================ */
(function () {
  'use strict';

  /* ─── State ─────────────────────────────────────────── */
  const state = {
    data: {},           // will hold all JSON data
    filter: 'all',
    skillsAnimated: false,
  };

  /* ─── DOM shortcuts ─────────────────────────────────── */
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  /* ─── DOM refs ──────────────────────────────────────── */
  const navbar       = $('#navbar');
  const navLinks     = $('#navLinks');
  const navToggle    = $('#navToggle');
  const progressThumb = $('#progressThumb');
  const hero         = $('#hero');
  const canvas       = $('#particleCanvas');
  const yearEl       = $('#year');
  const typewriterEl = $('#typewriter');
  const skillsGrid   = $('#skillsGrid');
  const cardsGrid    = $('#cardsGrid');
  const noResults    = $('#noResults');
  const filterBar    = $('.filter-bar');
  const modal        = $('#badgeModal');
  const modalImg     = $('#modalBadgeImg');
  const modalClose   = $('#modalClose');
  const modalLink    = $('#modalLink');
  const modalCertTitle = $('#modalCertTitle');
  const projectsGrid = $('#projectsGrid');
  const contactItems = $('#contactItems');
  const contactForm  = $('#contactForm');

  /* ─── Load data ─────────────────────────────────────── */
  function loadJSON(url) {
    return fetch(url + '?t=' + Date.now()).then(function (r) {
      if (!r.ok) throw new Error('Failed: ' + url);
      return r.json();
    });
  }

  function loadAllData() {
    return Promise.all([
      loadJSON('data/certifications.json'),
      loadJSON('data/skills.json'),
      loadJSON('data/projects.json'),
      loadJSON('data/contacts.json'),
    ]).then(function (results) {
      state.data.certs = results[0].certifications || results[0];
      state.data.skills = results[1].skills || results[1];
      state.data.projects = results[2].projects || results[2];
      state.data.contacts = results[3];
    });
  }

  /* ─── Navigation ────────────────────────────────────── */
  // Mobile toggle
  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  // Close nav on link click (mobile)
  navLinks.addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Scroll-based: navbar border + active section
  var allSections = ['hero', 'about', 'skills', 'certifications', 'projects', 'contact'];
  var sectionTops = [];

  function updateNav() {
    var scrollY = window.scrollY + 80;
    var active = 'hero';

    for (var i = sectionTops.length - 1; i >= 0; i--) {
      if (scrollY >= sectionTops[i]) {
        active = allSections[i];
        break;
      }
    }

    $$('.nav-link').forEach(function (link) {
      var section = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', section === active);
    });

    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  function refreshSectionTops() {
    sectionTops = allSections.map(function (id) {
      var el = document.getElementById(id);
      return el ? el.offsetTop : 0;
    });
  }

  // Debounced resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshSectionTops, 150);
  });

  window.addEventListener('scroll', updateNav, { passive: true });

  /* ─── Progress bar ──────────────────────────────────── */
  window.addEventListener('scroll', function () {
    var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressThumb.style.transform = 'scaleX(' + Math.min(pct, 1) + ')';
  }, { passive: true });

  /* ─── Year ──────────────────────────────────────────── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── Typewriter ────────────────────────────────────── */
  (function typewriter() {
    var text = 'Building secure, scalable, and reliable cloud solutions on Microsoft Azure.';
    var i = 0;
    typewriterEl.textContent = '';
    typewriterEl.style.opacity = '1';

    function tick() {
      if (i < text.length) {
        typewriterEl.textContent += text[i];
        i++;
        setTimeout(tick, 28 + Math.random() * 22);
      }
    }
    setTimeout(tick, 600);
  })();

  /* ─── Particles ─────────────────────────────────────── */
  (function particles() {
    var pts = [];
    var mouse = { x: -1000, y: -1000 };
    var COUNT = Math.min(80, Math.floor(window.innerWidth / 12));
    var ctx = canvas.getContext('2d');
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

    var resizeTimer2;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer2);
      resizeTimer2 = setTimeout(function () { resize(); init(); }, 200);
    });

    draw();
  })();

  /* ─── Counter animation ─────────────────────────────── */
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

  var counterObserved = false;
  var statsObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counterObserved && state.data.certs) {
      counterObserved = true;
      animateCounter($('#stat-certs'), state.data.certs.filter(function (c) { return c.status !== 'planned'; }).length);
      animateCounter($('#stat-skills'), state.data.skills.reduce(function (acc, cat) { return acc + cat.items.length; }, 0));
      animateCounter($('#stat-projects'), state.data.projects.length);
    }
  }, { threshold: 0.5 });
  if ($('#heroStats')) statsObserver.observe($('#heroStats'));

  /* ─── Scroll reveal (IntersectionObserver) ──────────── */
  var scrollReveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollReveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  function observeReveal(selector) {
    $$(selector).forEach(function (el) {
      if (!el.classList.contains('revealed')) scrollReveal.observe(el);
    });
  }

  /* ─── Skills rendering ──────────────────────────────── */
  function renderSkills() {
    if (!state.data.skills || !state.data.skills.length) {
      skillsGrid.innerHTML = '<p class="no-results visible">Skills data unavailable.</p>';
      return;
    }

    skillsGrid.innerHTML = state.data.skills.map(function (cat) {
      return '<div class="skill-category reveal-observe">'
        + '<div class="skill-category-header">'
        + '<span class="skill-category-icon">' + (cat.icon || '📌') + '</span>'
        + '<h3 class="skill-category-name">' + cat.category + '</h3>'
        + '</div>'
        + cat.items.map(function (skill) {
          return '<div class="skill-item">'
            + '<div class="skill-item-header">'
            + '<span class="skill-name">' + skill.name + '</span>'
            + '<span class="skill-percent">' + skill.level + '%</span>'
            + '</div>'
            + '<div class="skill-bar">'
            + '<div class="skill-bar-fill" data-width="' + skill.level + '"></div>'
            + '</div>'
            + (skill.description ? '<p class="skill-desc">' + skill.description + '</p>' : '')
            + '</div>';
        }).join('')
        + '</div>';
    }).join('');

    observeReveal('.skill-category');
  }

  /* Animate skill bars when skills section is visible */
  var skillsAnimated = false;
  var skillsObserver = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !skillsAnimated && state.data.skills) {
      skillsAnimated = true;
      $$('.skill-bar-fill').forEach(function (bar) {
        var w = bar.getAttribute('data-width');
        requestAnimationFrame(function () {
          bar.style.width = w + '%';
        });
      });
    }
  }, { threshold: 0.2 });
  if (skillsGrid) skillsObserver.observe(skillsGrid);

  /* ─── Certifications rendering ──────────────────────── */
  function categories() {
    return [...new Set(state.data.certs.map(function (c) { return c.category; }))];
  }

  function filtered() {
    return state.filter === 'all'
      ? state.data.certs
      : state.data.certs.filter(function (c) { return c.category === state.filter; });
  }

  var iconMap = { network: '🌐', ai: '🤖', linux: '🐧', other: '📎' };
  var badgeMap = { network: 'Networking', ai: 'AI', linux: 'Linux & OS', other: 'Other' };
  var statusLabel = { 'earned': '', 'in-progress': '🔄 In Progress', 'planned': '📅 Planned' };

  function cardHTML(c, i) {
    var statusHtml = c.status && c.status !== 'earned'
      ? '<span class="card-status ' + c.status + '">' + (statusLabel[c.status] || '') + '</span>'
      : '';

    return '<article class="card animate-in" data-category="' + c.category + '" data-index="' + i + '" role="listitem">'
      + '<div class="card-accent" aria-hidden="true"></div>'
      + '<div class="card-header">'
      + '<span class="card-icon">' + (iconMap[c.category] || '📜') + '</span>'
      + '<div style="display:flex;gap:6px;align-items:center">'
      + statusHtml
      + '<span class="card-badge ' + c.category + '">' + (badgeMap[c.category] || c.category) + '</span>'
      + '</div>'
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
      + (c.credentialUrl
        ? '<div class="card-footer"><a href="' + c.credentialUrl + '" class="card-link" target="_blank" rel="noopener">🔗 View Certificate</a></div>'
        : '')
      + '</article>';
  }

  function renderCerts() {
    var items = filtered();
    cardsGrid.innerHTML = items.map(function (c, i) { return cardHTML(c, i); }).join('');
    noResults.classList.toggle('visible', items.length === 0);
    bindBadgeClicks();
  }

  /* Filter */
  function setFilter(f) {
    state.filter = f;
    $$('.filter-btn').forEach(function (b) {
      var active = b.dataset.filter === f;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    renderCerts();
  }

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (btn) setFilter(btn.dataset.filter);
    });

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
  }

  /* Badge modal */
  function bindBadgeClicks() {
    var items = filtered();
    $$('.card-badge-img-wrapper').forEach(function (wrapper) {
      var idx = parseInt(wrapper.closest('.card').dataset.index);
      wrapper.addEventListener('click', function () { openModal(idx); });
      wrapper.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(idx); }
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
    modalLink.href = cert.credentialUrl || '#';
    modalLink.style.display = cert.credentialUrl ? '' : 'none';
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

  /* ─── Projects rendering ────────────────────────────── */
  function renderProjects() {
    if (!state.data.projects || !state.data.projects.length) {
      projectsGrid.innerHTML = '<p class="no-results visible">Projects coming soon.</p>';
      return;
    }

    projectsGrid.innerHTML = state.data.projects.map(function (p) {
      return '<div class="project-card reveal-observe">'
        + '<div class="project-card-header">'
        + '<h3 class="project-card-title">' + p.title + '</h3>'
        + (p.githubUrl
          ? '<a href="' + p.githubUrl + '" class="project-card-github" target="_blank" rel="noopener" aria-label="View on GitHub">'
            + '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>'
            + '</a>'
          : '')
        + '</div>'
        + '<p class="project-card-desc">' + p.description + '</p>'
        + '<div class="project-card-tech">'
        + p.techStack.map(function (t) { return '<span class="project-tech-tag">' + t + '</span>'; }).join('')
        + '</div>'
        + (p.githubUrl
          ? '<div class="project-card-action"><a href="' + p.githubUrl + '" class="card-link" target="_blank" rel="noopener">View on GitHub</a></div>'
          : '')
        + '</div>';
    }).join('');

    observeReveal('.project-card');
  }

  /* ─── Contact rendering ─────────────────────────────── */
  function renderContacts() {
    var c = state.data.contacts;
    if (!c) return;

    var items = [];

    if (c.email) {
      items.push({ icon: '✉️', label: 'Email', value: c.email, href: 'mailto:' + c.email });
    }
    if (c.linkedin) {
      items.push({ icon: '💼', label: 'LinkedIn', value: c.linkedin.replace('https://', ''), href: c.linkedin });
    }
    if (c.github) {
      items.push({ icon: '🐙', label: 'GitHub', value: c.github.replace('https://', ''), href: c.github });
    }
    if (c.phone) {
      items.push({ icon: '📞', label: 'Phone', value: c.phone, href: 'tel:' + c.phone });
    }

    contactItems.innerHTML = items.map(function (item) {
      return '<div class="contact-item reveal-observe">'
        + '<div class="contact-item-icon">' + item.icon + '</div>'
        + '<div class="contact-item-content">'
        + '<p class="contact-item-label">' + item.label + '</p>'
        + '<p class="contact-item-value"><a href="' + item.href + '" target="_blank" rel="noopener">' + item.value + '</a></p>'
        + '</div>'
        + '</div>';
    }).join('');

    observeReveal('.contact-item');
  }

  /* ─── Contact form ──────────────────────────────────── */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('.btn-submit');
      btn.classList.add('sent');
      setTimeout(function () {
        btn.classList.remove('sent');
        contactForm.reset();
      }, 2500);
    });
  }

  /* ─── Init ──────────────────────────────────────────── */
  function init() {
    loadAllData()
      .then(function () {
        // Render all sections
        renderSkills();
        renderCerts();
        renderProjects();
        renderContacts();

        // Set initial filter state
        $$('.filter-btn').forEach(function (b) {
          if (b.dataset.filter === 'all') {
            b.classList.add('active');
            b.setAttribute('aria-selected', 'true');
          }
        });

        // Refresh section tops for nav highlighting
        refreshSectionTops();
        updateNav();

        // Animate in
        document.body.classList.add('js-animate');
      })
      .catch(function (err) {
        console.error(err);
        cardsGrid.innerHTML = '<p class="no-results visible">⚠️ Failed to load data. Please refresh.</p>';
      });
  }

  init();
})();
