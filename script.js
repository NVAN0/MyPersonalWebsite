// Theme toggle
    (function() {
      const toggle = document.querySelector('[data-theme-toggle]');
      const html = document.documentElement;
      const sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
      let theme = sysDark ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);
      const moonIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      const sunIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
      if (toggle) {
        toggle.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
        toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
        toggle.addEventListener('click', () => {
          theme = theme === 'dark' ? 'light' : 'dark';
          html.setAttribute('data-theme', theme);
          toggle.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
          toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
        });
      }
    })();

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => observer.observe(s));

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
      if (open) {
        mobileMenu.classList.add('open');
        mobileMenu.style.display = 'block';
        requestAnimationFrame(() => {
          mobileMenu.style.opacity = '1';
          mobileMenu.style.transform = 'translateY(0)';
        });
      } else {
        mobileMenu.classList.remove('open');
        setTimeout(() => { mobileMenu.style.display = ''; }, 300);
      }
    });
    document.querySelectorAll('.mobile-menu a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        setTimeout(() => { mobileMenu.style.display = ''; }, 300);
      });
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Skill bar animation (IntersectionObserver)
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const pct = parseInt(el.dataset.width) / 100;
          el.style.setProperty('--pct', pct);
          setTimeout(() => el.classList.add('animated'), 100);
          skillObserver.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => skillObserver.observe(fill));

    // Counter animation
    const counterEls = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const duration = 1200;
          const step = 16;
          const increment = target / (duration / step);
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            el.textContent = Math.round(current) + '+';
            if (current >= target) clearInterval(timer);
          }, step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));

    // Portfolio filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.transition = 'opacity 0.3s, transform 0.3s';
          card.style.opacity = show ? '1' : '0.2';
          card.style.pointerEvents = show ? '' : 'none';
        });
      });
    });

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('.form-submit');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
      btn.style.background = '#22c55e';
      btn.style.boxShadow = '0 0 20px rgba(34,197,94,0.4)';
      setTimeout(() => {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message';
        btn.style.background = '';
        btn.style.boxShadow = '';
        e.target.reset();
      }, 3000);
    });
