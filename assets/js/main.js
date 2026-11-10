(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  function initThemeToggle() {
    var toggle = document.getElementById('theme-toggle');
    var meta = document.getElementById('theme-color');
    if (!toggle) return;

    var sun = toggle.querySelector('.theme-icon-sun');
    var moon = toggle.querySelector('.theme-icon-moon');

    function syncThemeUI() {
      var isDark = root.classList.contains('dark');
      if (sun) sun.classList.toggle('hidden', !isDark);
      if (moon) moon.classList.toggle('hidden', isDark);
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      if (meta) meta.setAttribute('content', isDark ? '#050505' : '#ffffff');
    }

    toggle.addEventListener('click', function () {
      var nextDark = !root.classList.contains('dark');
      root.classList.toggle('dark', nextDark);
      try {
        localStorage.setItem('portfolio-theme', nextDark ? 'dark' : 'light');
      } catch (error) {
        // Storage can be unavailable in private or restricted contexts.
      }
      syncThemeUI();
    });

    syncThemeUI();
  }

  function initMobileMenu() {
    var menu = document.getElementById('mobile-menu');
    var toggle = document.getElementById('menu-toggle');
    var closeButton = document.getElementById('menu-close');
    var backdrop = document.getElementById('menu-backdrop');
    if (!menu || !toggle || !closeButton) return;

    var lastFocused = null;

    function getFocusable() {
      return Array.prototype.slice
        .call(menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter(function (element) {
          return element.offsetParent !== null;
        });
    }

    function onKeydown(event) {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;

      var focusable = getFocusable();
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function openMenu() {
      lastFocused = document.activeElement;
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      document.addEventListener('keydown', onKeydown);
      window.requestAnimationFrame(function () {
        closeButton.focus();
      });
    }

    function closeMenu() {
      if (!menu.classList.contains('is-open')) return;
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    toggle.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    Array.prototype.forEach.call(menu.querySelectorAll('.mobile-nav-link'), function (link) {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) closeMenu();
    });
  }

  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    var ticking = false;

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, progress)) + ')';
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'));
    if (!links.length) return;

    var sections = links
      .map(function (link) {
        return document.querySelector(link.getAttribute('href'));
      })
      .filter(Boolean);

    var header = document.querySelector('.site-header');
    var ticking = false;

    function update() {
      var offset = (header ? header.offsetHeight : 72) + 100;
      var currentId = null;

      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= offset) {
          currentId = section.id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        currentId = 'contact';
      }

      links.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + currentId;
        link.classList.toggle('is-active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });

      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function initScrollReveal() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-cascade]'), function (group) {
      Array.prototype.forEach.call(group.querySelectorAll('[data-reveal]'), function (item, index) {
        item.style.setProperty('--reveal-delay', Math.min(index * 90, 540) + 'ms');
      });
    });

    var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    var hero = document.getElementById('top');
    if (!canvas || !hero || reduceMotion.matches) return;

    var context = canvas.getContext('2d');
    if (!context) return;

    var width = 0;
    var height = 0;
    var particles = [];
    var frame = null;
    var visible = true;

    function resize() {
      var rect = hero.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = width < 640 ? 16 : width < 1024 ? 30 : 48;
      particles = [];
      for (var i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.4 + 0.6
        });
      }
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      var isDark = root.classList.contains('dark');
      var dotColor = isDark ? 'rgba(249, 115, 22, 0.6)' : 'rgba(194, 65, 12, 0.5)';
      var lineBase = isDark ? 'rgba(249, 115, 22, ' : 'rgba(194, 65, 12, ';
      var maxDistance = width < 640 ? 100 : 140;

      particles.forEach(function (particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = dotColor;
        context.fill();
      });

      for (var i = 0; i < particles.length; i += 1) {
        for (var j = i + 1; j < particles.length; j += 1) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance >= maxDistance) continue;

          var alpha = (1 - distance / maxDistance) * 0.22;
          context.strokeStyle = lineBase + alpha + ')';
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
          context.stroke();
        }
      }
    }

    function loop() {
      if (!visible || document.hidden) {
        frame = null;
        return;
      }
      draw();
      frame = window.requestAnimationFrame(loop);
    }

    function start() {
      if (frame === null && visible && !document.hidden) {
        frame = window.requestAnimationFrame(loop);
      }
    }

    function stop() {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
      }
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          visible = entries[0].isIntersecting;
          if (visible) start();
          else stop();
        },
        { threshold: 0 }
      );
      observer.observe(hero);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });

    window.addEventListener(
      'resize',
      function () {
        resize();
        if (frame === null) draw();
      },
      { passive: true }
    );

    resize();
    draw();
    start();
  }

  function initScrollEffects() {
    var parallaxItems = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    var marqueeTrack = document.querySelector('[data-scroll-marquee]');
    var marqueeBand = document.querySelector('[data-scroll-marquee-band]');
    var marqueeGroup = marqueeTrack ? marqueeTrack.querySelector('.marquee-group') : null;
    var marqueeWidth = 0;
    var ticking = false;

    function measure() {
      marqueeWidth = marqueeGroup ? marqueeGroup.getBoundingClientRect().width : 0;
    }

    function update() {
      if (reduceMotion.matches) {
        ticking = false;
        return;
      }

      var viewportHeight = window.innerHeight;

      parallaxItems.forEach(function (item) {
        var speed = parseFloat(item.getAttribute('data-parallax')) || 0;
        var rect = item.getBoundingClientRect();
        var distance = rect.top + rect.height / 2 - viewportHeight / 2;
        var offset = Math.max(-80, Math.min(80, distance * speed));
        item.style.setProperty('--parallax-y', offset.toFixed(2) + 'px');
      });

      if (marqueeTrack && marqueeBand && marqueeWidth) {
        var bandRect = marqueeBand.getBoundingClientRect();
        var progress = (viewportHeight - bandRect.top) / (viewportHeight + bandRect.height);
        progress = Math.max(0, Math.min(1, progress));
        marqueeTrack.style.transform = 'translate3d(' + (-marqueeWidth * progress).toFixed(2) + 'px, 0, 0)';
      }

      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    function onResize() {
      measure();
      onScroll();
    }

    if (!parallaxItems.length && !marqueeTrack) return;

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }

  function initProjectStack() {
    var stack = document.querySelector('[data-project-stack]');
    if (!stack || reduceMotion.matches) return;

    var items = Array.prototype.slice.call(stack.querySelectorAll('.project-stack-item'));
    if (items.length < 2) return;

    var cards = items.map(function (item) {
      return item.querySelector('.project-stack-card');
    });
    var ticking = false;

    function update() {
      items.forEach(function (item, index) {
        var card = cards[index];
        var next = items[index + 1];
        if (!card) return;

        var progress = 0;
        if (next) {
          var itemRect = item.getBoundingClientRect();
          var nextRect = next.getBoundingClientRect();
          if (itemRect.height > 0) {
            progress = 1 - (nextRect.top - itemRect.top) / itemRect.height;
            progress = Math.max(0, Math.min(1, progress));
          }
        }

        card.style.setProperty('--stack-scale', (1 - progress * 0.05).toFixed(4));
        card.style.setProperty('--stack-shift', (progress * -8).toFixed(2) + 'px');
      });

      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function initCountUp() {
    var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
    if (!counters.length) return;

    function animate(counter) {
      var target = parseInt(counter.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      if (reduceMotion.matches) {
        counter.textContent = String(target);
        return;
      }

      var duration = 1200;
      var startTime = null;

      function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function initCopyEmail() {
    var toast = document.getElementById('toast');
    var message = document.getElementById('toast-message');
    var toastTimer = null;

    function showToast(text) {
      if (!toast || !message) return;
      message.textContent = text;
      toast.classList.add('is-visible');
      if (toastTimer) window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2800);
    }

    function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(
          function () {
            return true;
          },
          function () {
            return fallbackCopy(text);
          }
        );
      }
      return Promise.resolve(fallbackCopy(text));
    }

    function fallbackCopy(text) {
      try {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        var copied = document.execCommand('copy');
        document.body.removeChild(textarea);
        return copied;
      } catch (error) {
        return false;
      }
    }

    Array.prototype.forEach.call(document.querySelectorAll('[data-copy-email]'), function (button) {
      button.addEventListener('click', function () {
        var email = button.getAttribute('data-copy-email');
        if (!email) return;
        copyText(email).then(function (copied) {
          showToast(copied ? 'Email copied to clipboard' : 'Could not copy — email is ' + email);
        });
      });
    });
  }

  function initFooterYear() {
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initActiveNav();
  initScrollReveal();
  initScrollEffects();
  initProjectStack();
  initHeroCanvas();
  initCountUp();
  initCopyEmail();
  initFooterYear();
})();
