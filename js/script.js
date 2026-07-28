/* =========================================================
   VASU — PORTFOLIO SCRIPTS
   Loader, cursor, particles, nav, typing effect, counters,
   skill bars, project filter/search, contact form, theme toggle
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Loading screen ---------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 500);
  });
  // Fallback in case 'load' fires very late (slow assets)
  setTimeout(() => loader && loader.classList.add('hidden'), 3000);

  /* ---------------- AOS init ---------------- */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Scroll progress bar ---------------- */
  const progressBar = document.getElementById('scroll-progress-bar');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });

  /* ---------------- Navbar scrolled state + active link ---------------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section, main#home');

  function onScroll() {
    navbar && navbar.classList.toggle('scrolled', window.scrollY > 30);

    let currentId = 'home';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });

    // Back to top visibility
    backToTop && backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  document.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');
  navToggle && navToggle.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinksList && navLinksList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Theme toggle (dark/light) ---------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'vasu-portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }
  let savedTheme = 'dark';
  try { savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) { /* storage unavailable */ }
  applyTheme(savedTheme);

  themeToggle && themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
  });

  /* ---------------- Custom cursor ---------------- */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isCoarsePointer && cursorDot && cursorRing) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      document.body.classList.add('cursor-active');
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    (function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, input, textarea, .glass-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)');
      el.addEventListener('mouseleave', () => cursorRing.style.transform = 'translate(-50%, -50%) scale(1)');
    });
  }

  /* ---------------- Particle background (lightweight canvas) ---------------- */
  const canvas = document.getElementById('particles');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const COLORS = ['#3B82F6', '#8B5CF6', '#06B6D4'];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    function createParticles() {
      const count = Math.min(70, Math.floor(window.innerWidth / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    }
    resize(); createParticles(); tick();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ---------------- Hero terminal typing effect ---------------- */
  const typedCodeEl = document.getElementById('typedCode');
  const codeSnippet =
`const developer = {
  name: "Vasu",
  role: "Software Developer",
  study: "B.Tech - Information Technology",
  status: "Final Year Student",
  stack: ["Python", "JavaScript", "SQL"],
  lookingFor: "SDE Internship",
  motto: "Keep building, keep learning."
};`;

  if (typedCodeEl) {
    let i = 0;
    function typeChar() {
      if (i <= codeSnippet.length) {
        typedCodeEl.textContent = codeSnippet.slice(0, i);
        i++;
        setTimeout(typeChar, 18);
      }
    }
    setTimeout(typeChar, 900);
  }

  /* ---------------- Animated counters ---------------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------- Animated skill / focus bars ---------------- */
  const bars = document.querySelectorAll('.skill-bar, .focus-bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  /* ---------------- Project filter + search ---------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('projectSearch');
  const emptyState = document.getElementById('projectEmpty');
  let activeFilter = 'all';

  function refreshProjects() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchesSearch = !query || text.includes(query);
      const show = matchesFilter && matchesSearch;
      card.classList.toggle('is-hidden', !show);
      if (show) visibleCount++;
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      refreshProjects();
    });
  });
  searchInput && searchInput.addEventListener('input', refreshProjects);

  /* ---------------- GitHub stats username hookup ---------------- */
  const githubSection = document.getElementById('github');
  const githubUsername = githubSection?.dataset.githubUsername || 'vasu';
  document.querySelectorAll('.github-card img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (src.includes('YOUR_GITHUB_USERNAME')) {
      img.setAttribute('src', src.replace('YOUR_GITHUB_USERNAME', githubUsername));
    }
  });

  /* ---------------- Contact form (client-side validation + mailto fallback) ---------------- */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setError(fieldName, message) {
    const row = form.querySelector(`#${fieldName}`)?.closest('.form-row');
    const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (row) row.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  }

  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();
    let valid = true;

    setError('name', ''); setError('email', ''); setError('subject', ''); setError('message', '');

    if (!name) { setError('name', 'Please enter your name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Please enter a valid email address.'); valid = false;
    }
    if (!subject) { setError('subject', 'Please add a subject.'); valid = false; }
    if (!message) { setError('message', 'Please write a short message.'); valid = false; }

    if (!valid) {
      formStatus.style.color = '#FB7185';
      formStatus.textContent = 'Please fix the highlighted fields.';
      return;
    }

    formStatus.style.color = '';
    formStatus.textContent = 'Opening your email app…';

    const recipient = 'hello@vasu.dev';
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      formStatus.textContent = `Thanks, ${name.split(' ')[0]}! Your message is ready to send — I’ll get back to you soon.`;
      form.reset();
    }, 800);
  });

  /* Initial state */
  onScroll();
  refreshProjects();
});
