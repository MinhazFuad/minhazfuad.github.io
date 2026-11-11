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
      if (window.updateHeroDotGridTheme) {
        window.updateHeroDotGridTheme();
      }
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
      var rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add('is-visible');
      } else {
        observer.observe(item);
      }
    });
  }

  function initHeroDotGrid() {
    var canvas = document.getElementById('hero-canvas');
    var hero = document.getElementById('top');
    if (!canvas || !hero) return;

    try {
      var gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
      if (!gl) {
        initHeroFallback2D(canvas, hero);
        return;
      }

    var VERTEX = `#version 300 es
precision highp float;

layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec4 aMotion;
layout(location = 2) in vec2 aState;

uniform vec2 uResolution;
uniform float uSize;
uniform float uSwell;
uniform float uStretch;
uniform float uGlow;

out vec2 vLocal;
out vec2 vPoint;
out float vLength;
out float vRadius;
out float vEnergy;

void main() {
  float energy = aState.x;
  float radius = 0.5 * uSize * aState.y * (1.0 + uSwell * energy);
  float speed = length(aMotion.zw);
  float angle = speed > 0.001 ? atan(aMotion.w, aMotion.z) : 0.0;
  float axis = floor(angle / 1.5707963 + 0.5) * 1.5707963;
  angle = axis + (angle - axis) * smoothstep(8.0, 70.0, speed);
  vec2 dir = vec2(cos(angle), sin(angle));
  float halfLength = min(uSize * 2.0, speed * uStretch * 0.02);
  float pad = radius * (1.0 + uGlow * energy * 2.5) + 2.0;
  vec2 local = aCorner * vec2(halfLength + pad, pad);
  vec2 point = aMotion.xy + dir * local.x + vec2(-dir.y, dir.x) * local.y;
  vLocal = local;
  vPoint = point;
  vLength = halfLength;
  vRadius = radius;
  vEnergy = energy;
  vec2 clip = point / uResolution * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}
`;

    var FRAGMENT = `#version 300 es
precision highp float;

in vec2 vLocal;
in vec2 vPoint;
in float vLength;
in float vRadius;
in float vEnergy;

uniform vec2 uResolution;
uniform vec3 uBase;
uniform vec3 uActive;
uniform float uGlow;
uniform float uOpacity;
uniform float uFade;
uniform int uShape;

out vec4 outColor;

float smootherstep01(float t) {
  t = clamp(t, 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void main() {
  float d;
  if (uShape == 1) {
    float corner = vRadius * 0.3;
    vec2 q = abs(vLocal) - vec2(vLength + vRadius, vRadius) + corner;
    d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - corner;
  } else {
    d = length(vec2(max(abs(vLocal.x) - vLength, 0.0), vLocal.y)) - vRadius;
  }
  float aa = max(fwidth(d), 0.0001);
  float body = clamp(0.5 - d / aa, 0.0, 1.0);
  float halo = uGlow * vEnergy * 0.5 * exp(-max(d, 0.0) / max(vRadius * 1.3, 0.6));
  float alpha = body + (1.0 - body) * halo;
  vec3 color = mix(uBase, uActive, clamp(vEnergy * 1.2, 0.0, 1.0));
  float fade = 1.0;
  if (uFade > 0.0) {
    vec2 edge = min(vPoint, uResolution - vPoint) / (uFade * 0.4 * min(uResolution.x, uResolution.y));
    fade = smootherstep01(edge.x) * smootherstep01(edge.y);
  }
  alpha *= uOpacity * fade;
  outColor = vec4(color * alpha, alpha);
}
`;

    function compileShader(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('DotGrid shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    var vs = compileShader(gl.VERTEX_SHADER, VERTEX);
    var fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) {
      initHeroFallback2D(canvas, hero);
      return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('DotGrid link error:', gl.getProgramInfoLog(program));
      initHeroFallback2D(canvas, hero);
      return;
    }

    var uniformNames = [
      'uResolution',
      'uSize',
      'uSwell',
      'uStretch',
      'uGlow',
      'uBase',
      'uActive',
      'uOpacity',
      'uFade',
      'uShape'
    ];
    var uniforms = {};
    for (var u = 0; u < uniformNames.length; u++) {
      uniforms[uniformNames[u]] = gl.getUniformLocation(program, uniformNames[u]);
    }

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    var cornerBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cornerBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    var instanceBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 24, 0);
    gl.vertexAttribDivisor(1, 1);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 24, 16);
    gl.vertexAttribDivisor(2, 1);
    gl.bindVertexArray(null);

    var settings = {
      dotSize: 2.5,
      gap: 18,
      proximity: 140,
      strength: 0.5,
      bounce: 0.3,
      tension: 0.4,
      returnDuration: 1.4,
      shockRadius: 320,
      shockStrength: 5,
      swell: 0.4,
      stretch: 0.2,
      glow: 0.25,
      shape: 'circle',
      fade: 0.5,
      opacity: 1,
      intro: true,
      mouseInteraction: true,
      clickShock: true,
      paused: false
    };

    function toRgb(color) {
      var match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(color).trim());
      if (!match) return [1, 1, 1];
      var hex = match[1].length === 3 ? match[1].replace(/./g, function (d) { return d + d; }) : match[1];
      return [0, 2, 4].map(function (idx) {
        return parseInt(hex.slice(idx, idx + 2), 16) / 255;
      });
    }

    function smootherstep(t) {
      var x = Math.min(1, Math.max(0, t));
      return x * x * x * (x * (x * 6 - 15) + 10);
    }

    function backOut(t) {
      var s = 1.9;
      var x = t - 1;
      return 1 + x * x * ((s + 1) * x + s);
    }

    function getThemeColors() {
      var isDark = root.classList.contains('dark');
      return isDark
        ? { base: '#3a3446', active: '#f97316' }
        : { base: '#d4d4d8', active: '#ea580c' };
    }

    var reduced = reduceMotion.matches;
    var view = { width: 0, height: 0, left: 0, top: 0, ratio: 1 };
    var grid = { count: 0, cols: 1, rows: 1, cell: 1, centerX: 0, centerY: 0, reach: 1 };
    var rest = new Float32Array(0);
    var offset = new Float32Array(0);
    var velocity = new Float32Array(0);
    var force = new Float32Array(0);
    var next = new Float32Array(0);
    var wave = new Float32Array(0);
    var energy = new Float32Array(0);
    var instances = new Float32Array(0);
    var pointer = { x: 0, y: 0, vx: 0, vy: 0, time: 0, inside: false, presence: 0 };
    var shocks = [];
    var introStart = settings.intro && !reduced ? -1 : null;
    var visible = true;
    var raf = 0;
    var nowTime = function () { return (window.performance && window.performance.now) ? window.performance.now() : Date.now(); };
    var last = 0;

    function rebuild() {
      var size = settings.dotSize;
      var spacing = settings.gap;
      var cell = Math.max(2, size + spacing);
      var cols = Math.max(1, Math.floor((view.width + spacing) / cell));
      var rows = Math.max(1, Math.floor((view.height + spacing) / cell));
      var startX = (view.width - (cols * cell - spacing)) / 2 + size / 2;
      var startY = (view.height - (rows * cell - spacing)) / 2 + size / 2;
      var count = cols * rows;

      rest = new Float32Array(count * 2);
      offset = new Float32Array(count * 2);
      velocity = new Float32Array(count * 2);
      force = new Float32Array(count * 2);
      next = new Float32Array(count * 2);
      wave = new Float32Array(count * 4);
      energy = new Float32Array(count);
      instances = new Float32Array(count * 6);

      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          var index = (row * cols + col) * 2;
          rest[index] = startX + col * cell;
          rest[index + 1] = startY + row * cell;
        }
      }

      grid.count = count;
      grid.cols = cols;
      grid.rows = rows;
      grid.cell = cell;
      grid.centerX = view.width / 2;
      grid.centerY = view.height / 2;
      grid.reach = Math.hypot(view.width, view.height) / 2;

      gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, instances.byteLength, gl.DYNAMIC_DRAW);
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      var width = Math.max(1, Math.round(rect.width));
      var height = Math.max(1, Math.round(rect.height));
      view.width = width;
      view.height = height;
      view.left = rect.left;
      view.top = rect.top;
      view.ratio = ratio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      rebuild();
      render(nowTime());
    }

    function step(dt, now) {
      var s = settings;
      var motion = reduced ? 0 : 1;
      var zeta = 1 - 0.85 * Math.min(1, Math.max(0, s.bounce));
      var omega = 4 / (zeta * Math.max(0.2, s.returnDuration));
      var stiffness = omega * omega;
      var damping = 2 * zeta * omega;
      var radius = Math.max(1, s.proximity);
      var speed = Math.hypot(pointer.vx, pointer.vy);
      var drive = s.mouseInteraction && pointer.inside ? 6500 * Math.tanh(speed / 900) * s.strength * motion : 0;
      var dirX = speed > 0.001 ? pointer.vx / speed : 0;
      var dirY = speed > 0.001 ? pointer.vy / speed : 0;
      var width = grid.cell * 1.4;
      var travel = 650;

      var active = shocks.map(function (shock) {
        var front = ((now - shock.start) / 1000) * travel;
        var power = smootherstep(1 - front / Math.max(1, s.shockRadius));
        return {
          x: shock.x,
          y: shock.y,
          start: shock.start,
          front: front,
          amplitude: power * s.shockStrength * grid.cell * 0.24 * motion
        };
      });

      var coupling = Math.pow(Math.max(0, s.tension) * 900, 2) / (grid.cell * grid.cell);
      var viscosity = Math.sqrt(coupling) * 0.06;
      var limit = Math.sqrt(stiffness + 8 * coupling) + damping + 8 * viscosity;
      var steps = Math.min(24, Math.max(1, Math.ceil(dt / Math.min(1 / 120, 1.2 / limit))));
      var h = dt / steps;

      for (var i = 0; i < grid.count; i++) {
        var index = i * 2;
        var rx = rest[index];
        var ry = rest[index + 1];
        var ax = 0;
        var ay = 0;

        if (drive > 0) {
          var ex = rx + offset[index] - pointer.x;
          var ey = ry + offset[index + 1] - pointer.y;
          var distance = Math.hypot(ex, ey);
          if (distance < radius) {
            var weight = smootherstep(1 - distance / radius) * drive;
            var nx = distance > 0.001 ? ex / distance : 0;
            var ny = distance > 0.001 ? ey / distance : 0;
            ax += weight * (dirX + nx * 0.6);
            ay += weight * (dirY + ny * 0.6);
          }
        }

        var wx = 0;
        var wy = 0;
        var wvx = 0;
        var wvy = 0;

        for (var sIdx = 0; sIdx < active.length; sIdx++) {
          var shock = active[sIdx];
          if (shock.amplitude <= 0) continue;
          var sex = rx - shock.x;
          var sey = ry - shock.y;
          var sdist = Math.hypot(sex, sey);
          var u = (sdist - shock.front) / width;
          if (Math.abs(u) < 3 && sdist > 0.001) {
            var snx = sex / sdist;
            var sny = sey / sdist;
            var profile = Math.exp(-u * u);
            var push = shock.amplitude * profile;
            var rate = ((shock.amplitude * 2 * u * profile) / width) * travel;
            wx += snx * push;
            wy += sny * push;
            wvx += snx * rate;
            wvy += snx * rate;
            ax += snx * push * stiffness * 0.35;
            ay += sny * push * stiffness * 0.35;
          }
        }

        force[index] = ax;
        force[index + 1] = ay;
        var target = i * 4;
        wave[target] = wx;
        wave[target + 1] = wy;
        wave[target + 2] = wvx;
        wave[target + 3] = wvy;
      }

      var cols = grid.cols;
      var rows = grid.rows;
      var stride = cols * 2;

      for (var n = 0; n < steps; n++) {
        for (var row = 0; row < rows; row++) {
          for (var col = 0; col < cols; col++) {
            var pIndex = (row * cols + col) * 2;
            var cax = force[pIndex] - stiffness * offset[pIndex] - damping * velocity[pIndex];
            var cay = force[pIndex + 1] - stiffness * offset[pIndex + 1] - damping * velocity[pIndex + 1];

            if (coupling > 0) {
              var lx = -4 * offset[pIndex];
              var ly = -4 * offset[pIndex + 1];
              var mx = -4 * velocity[pIndex];
              var my = -4 * velocity[pIndex + 1];

              if (col > 0) {
                lx += offset[pIndex - 2];
                ly += offset[pIndex - 1];
                mx += velocity[pIndex - 2];
                my += velocity[pIndex - 1];
              }
              if (col < cols - 1) {
                lx += offset[pIndex + 2];
                ly += offset[pIndex + 3];
                mx += velocity[pIndex + 2];
                my += velocity[pIndex + 3];
              }
              if (row > 0) {
                lx += offset[pIndex - stride];
                ly += offset[pIndex - stride + 1];
                mx += velocity[pIndex - stride];
                my += velocity[pIndex - stride + 1];
              }
              if (row < rows - 1) {
                lx += offset[pIndex + stride];
                ly += offset[pIndex + stride + 1];
                mx += velocity[pIndex + stride];
                my += velocity[pIndex + stride + 1];
              }

              cax += coupling * lx + viscosity * mx;
              cay += coupling * ly + viscosity * my;
            }

            next[pIndex] = velocity[pIndex] + cax * h;
            next[pIndex + 1] = velocity[pIndex + 1] + cay * h;
          }
        }

        for (var k = 0; k < offset.length; k++) {
          velocity[k] = next[k];
          offset[k] += velocity[k] * h;
        }
      }

      for (var m = 0; m < grid.count; m++) {
        var eIndex = m * 2;
        var eTarget = m * 4;
        energy[m] = Math.min(
          1,
          (Math.hypot(velocity[eIndex] + wave[eTarget + 2], velocity[eIndex + 1] + wave[eTarget + 3]) / 380) * 0.85 +
            (Math.hypot(offset[eIndex] + wave[eTarget], offset[eIndex + 1] + wave[eTarget + 1]) / (grid.cell * 2.2)) * 0.35
        );
      }

      for (var sEnd = shocks.length - 1; sEnd >= 0; sEnd--) {
        if (active[sEnd] && active[sEnd].front > s.shockRadius + width * 3) {
          shocks.splice(sEnd, 1);
        }
      }

      var decay = 1 - Math.exp(-dt / 0.08);
      pointer.vx -= pointer.vx * decay;
      pointer.vy -= pointer.vy * decay;
      var presenceTarget = s.mouseInteraction && pointer.inside ? 1 : 0;
      pointer.presence += (presenceTarget - pointer.presence) * (1 - Math.exp(-dt / 0.2));
    }

    function render(now) {
      var s = settings;
      var radius = Math.max(1, s.proximity);
      var introAge = introStart === null ? Infinity : introStart < 0 ? 0 : (now - introStart) / 1000;
      var introFront = introAge * grid.reach * 1.25;
      var introBand = grid.cell * 4;

      for (var i = 0; i < grid.count; i++) {
        var index = i * 2;
        var source = i * 4;
        var x = rest[index] + offset[index] + wave[source];
        var y = rest[index + 1] + offset[index + 1] + wave[source + 1];
        var glowing = energy[i];

        if (pointer.presence > 0.001) {
          var distance = Math.hypot(x - pointer.x, y - pointer.y);
          if (distance < radius) {
            glowing = Math.max(glowing, smootherstep(1 - distance / radius) * 0.4 * pointer.presence);
          }
        }

        var scale = 1;
        if (introStart !== null) {
          var distCenter = Math.hypot(rest[index] - grid.centerX, rest[index + 1] - grid.centerY);
          var appear = Math.min(1, Math.max(0, (introFront - distCenter) / introBand));
          scale = appear >= 1 ? 1 : Math.max(0, backOut(appear));
          glowing = Math.max(glowing, Math.sin(appear * Math.PI) * 0.6);
        }

        var target = i * 6;
        instances[target] = x;
        instances[target + 1] = y;
        instances[target + 2] = velocity[index] + wave[source + 2];
        instances[target + 3] = velocity[index + 1] + wave[source + 3];
        instances[target + 4] = glowing;
        instances[target + 5] = scale;
      }

      var themeColors = getThemeColors();
      var base = toRgb(themeColors.base);
      var accent = toRgb(themeColors.active);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(program);

      gl.uniform2f(uniforms.uResolution, view.width, view.height);
      gl.uniform1f(uniforms.uSize, Math.max(0.5, s.dotSize));
      gl.uniform1f(uniforms.uSwell, reduced ? 0 : Math.max(0, s.swell));
      gl.uniform1f(uniforms.uStretch, reduced ? 0 : Math.max(0, s.stretch));
      gl.uniform1f(uniforms.uGlow, Math.max(0, s.glow));
      gl.uniform3f(uniforms.uBase, base[0], base[1], base[2]);
      gl.uniform3f(uniforms.uActive, accent[0], accent[1], accent[2]);
      gl.uniform1f(uniforms.uOpacity, Math.min(1, Math.max(0, s.opacity)));
      gl.uniform1f(uniforms.uFade, Math.min(1, Math.max(0, s.fade)));
      gl.uniform1i(uniforms.uShape, s.shape === 'square' ? 1 : 0);

      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, instanceBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, instances);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, grid.count);
      gl.bindVertexArray(null);
    }

    function settled(now) {
      if (shocks.length) return false;
      if (introStart !== null) {
        if (introStart < 0 || (now - introStart) / 1000 < 1.6) return false;
        introStart = null;
      }
      if (Math.abs(pointer.vx) + Math.abs(pointer.vy) > 1) return false;
      var presenceTarget = settings.mouseInteraction && pointer.inside ? 1 : 0;
      if (Math.abs(presenceTarget - pointer.presence) > 0.002) return false;
      for (var i = 0; i < offset.length; i++) {
        if (Math.abs(offset[i]) > 0.02 || Math.abs(velocity[i]) > 0.5) return false;
      }
      return true;
    }

    function frame(now) {
      raf = 0;
      if (settings.paused || !visible) return;
      if (introStart !== null && introStart < 0) introStart = now;
      var dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      step(dt, now);
      render(now);
      if (!settled(now)) raf = window.requestAnimationFrame(frame);
    }

    function wake() {
      if (raf || settings.paused || !visible) return;
      last = nowTime();
      raf = window.requestAnimationFrame(frame);
    }

    function locate(event) {
      var rect = canvas.getBoundingClientRect();
      view.left = rect.left;
      view.top = rect.top;
      return [event.clientX - rect.left, event.clientY - rect.top];
    }

    function onMove(event) {
      if (!settings.mouseInteraction) return;
      var loc = locate(event);
      var x = loc[0];
      var y = loc[1];
      var inside = x >= 0 && y >= 0 && x <= view.width && y <= view.height;
      var time = event.timeStamp || nowTime();
      if (inside && pointer.inside && pointer.time) {
        var elapsed = Math.max(4, time - pointer.time) / 1000;
        var vx = (x - pointer.x) / elapsed;
        var vy = (y - pointer.y) / elapsed;
        pointer.vx += (vx - pointer.vx) * 0.6;
        pointer.vy += (vy - pointer.vy) * 0.6;
      } else {
        pointer.vx = 0;
        pointer.vy = 0;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.time = time;
      if (inside !== pointer.inside || inside) {
        pointer.inside = inside;
        wake();
      }
    }

    function onLeave() {
      pointer.inside = false;
      pointer.time = 0;
      wake();
    }

    function onOut(event) {
      if (!event.relatedTarget) onLeave();
    }

    function onDown(event) {
      if (!settings.clickShock || reduced) return;
      var loc = locate(event);
      var x = loc[0];
      var y = loc[1];
      if (x < 0 || y < 0 || x > view.width || y > view.height) return;
      shocks.push({ x: x, y: y, start: nowTime() });
      if (shocks.length > 6) shocks.shift();
      wake();
    }

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerout', onOut);
    window.addEventListener('blur', onLeave);

    var resizeObserver = window.ResizeObserver ? new ResizeObserver(function () {
      resize();
      wake();
    }) : null;
    if (resizeObserver) resizeObserver.observe(canvas);
    else window.addEventListener('resize', resize, { passive: true });

    var visibilityObserver = window.IntersectionObserver ? new IntersectionObserver(function (entries) {
      if (!entries || !entries[0]) return;
      visible = entries[0].isIntersecting;
      if (visible) wake();
    }) : null;
    if (visibilityObserver) visibilityObserver.observe(canvas);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      } else {
        wake();
      }
    });

    window.updateHeroDotGridTheme = function () {
      render(nowTime());
      wake();
    };

    resize();
    wake();
  } catch (err) {
    console.warn('HeroDotGrid initialization error, using 2D fallback:', err);
    initHeroFallback2D(canvas, hero);
  }
}

  function initHeroFallback2D(canvas, hero) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    function draw() {
      var rect = canvas.getBoundingClientRect();
      var width = Math.max(1, Math.round(rect.width));
      var height = Math.max(1, Math.round(rect.height));
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      var isDark = root.classList.contains('dark');
      ctx.fillStyle = isDark ? '#3a3446' : '#d4d4d8';
      var gap = 18;
      for (var x = gap / 2; x < width; x += gap) {
        for (var y = gap / 2; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 1.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    window.addEventListener('resize', draw, { passive: true });
    window.updateHeroDotGridTheme = draw;
    draw();
  }

  function initScrollEffects() {
    var parallaxItems = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
    var marqueeTrack = document.querySelector('[data-scroll-marquee]');
    var marqueeBand = document.querySelector('[data-scroll-marquee-band]');
    var marqueeGroup = marqueeTrack ? marqueeTrack.querySelector('.marquee-group') : null;
    var pubSection = document.getElementById('publications');
    var pubLine = document.querySelector('.pub-timeline-line');
    var footerCurtain = document.getElementById('contact') || document.getElementById('footer-curtain');
    var footerGiantText = document.getElementById('footer-giant-text');
    var footerHeading = document.getElementById('footer-heading');
    var footerPills = document.getElementById('footer-pills');
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

      if (pubSection && pubLine) {
        var pRect = pubSection.getBoundingClientRect();
        var pProgress = (viewportHeight - pRect.top) / (viewportHeight + pRect.height * 0.7);
        pProgress = Math.max(0, Math.min(1, pProgress));
        pubLine.style.transform = 'scaleX(' + pProgress.toFixed(3) + ')';
      }

      if (footerCurtain && footerGiantText) {
        var fRect = footerCurtain.getBoundingClientRect();
        if (fRect.top < viewportHeight) {
          var fProgress = (viewportHeight - fRect.top) / viewportHeight;
          fProgress = Math.max(0, Math.min(1, fProgress));

          var yOffset = (1 - fProgress) * 7;
          var scale = 0.88 + fProgress * 0.12;
          var opacity = 0.3 + fProgress * 0.7;
          footerGiantText.style.transform = 'translate3d(-50%, ' + yOffset.toFixed(2) + 'vh, 0) scale(' + scale.toFixed(3) + ')';
          footerGiantText.style.opacity = opacity.toFixed(3);

          if (footerHeading) {
            var hY = Math.max(0, (1 - fProgress * 1.3) * 35);
            var hOp = Math.max(0, Math.min(1, fProgress * 1.5));
            footerHeading.style.transform = 'translate3d(0, ' + hY.toFixed(1) + 'px, 0)';
            footerHeading.style.opacity = hOp.toFixed(3);
          }

          if (footerPills) {
            var pY = Math.max(0, (1 - fProgress * 1.1) * 45);
            var pOp = Math.max(0, Math.min(1, (fProgress - 0.1) * 1.4));
            footerPills.style.transform = 'translate3d(0, ' + pY.toFixed(1) + 'px, 0)';
            footerPills.style.opacity = pOp.toFixed(3);
          }
        }
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

    if (!parallaxItems.length && !marqueeTrack && !pubLine && !footerCurtain) return;

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

  function initChipWave() {
    if (reduceMotion.matches) {
      document.querySelectorAll('[data-chip]').forEach(function (c) {
        c.classList.add('is-chip-visible');
      });
      return;
    }
    var groups = Array.prototype.slice.call(document.querySelectorAll('[data-chip-group]'));
    if (!groups.length) return;

    var globalIndex = 0;
    groups.forEach(function (group) {
      var chips = Array.prototype.slice.call(group.querySelectorAll('[data-chip]'));
      chips.forEach(function (chip) {
        chip.style.setProperty('--chip-delay', String(globalIndex));
        globalIndex += 1;
      });
    });

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-chip]').forEach(function (c) {
        c.classList.add('is-chip-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var chips = Array.prototype.slice.call(entry.target.querySelectorAll('[data-chip]'));
          chips.forEach(function (chip) {
            chip.classList.add('is-chip-visible');
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    groups.forEach(function (g) {
      var rect = g.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        var chips = Array.prototype.slice.call(g.querySelectorAll('[data-chip]'));
        chips.forEach(function (chip) {
          chip.classList.add('is-chip-visible');
        });
      } else {
        observer.observe(g);
      }
    });
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

      // Slot-machine roll effect before settling
      var rolls = 5;
      var rollInterval = 60;
      var rollCount = 0;

      var rollTimer = window.setInterval(function () {
        rollCount += 1;
        if (rollCount >= rolls) {
          window.clearInterval(rollTimer);
          runCountEase(counter, target);
        } else {
          counter.textContent = String(Math.floor(Math.random() * 9) + 1);
        }
      }, rollInterval);
    }

    function runCountEase(counter, target) {
      var duration = 900;
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

  function initMagneticButtons() {
    if (reduceMotion.matches) return;
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.magnetic-btn'));
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var halfW = rect.width / 2;
        var halfH = rect.height / 2;
        var x = e.clientX - rect.left - halfW;
        var y = e.clientY - rect.top - halfH;

        btn.style.transform =
          'translate3d(' + (x * 0.35).toFixed(1) + 'px, ' + (y * 0.35).toFixed(1) + 'px, 0) ' +
          'scale(1.05) rotateX(' + (-y * 0.12).toFixed(1) + 'deg) rotateY(' + (x * 0.12).toFixed(1) + 'deg)';
        btn.style.transition = 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate3d(0, 0, 0) scale(1) rotateX(0deg) rotateY(0deg)';
        btn.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }

  function initFooterBackToTop() {
    var btn = document.getElementById('footer-back-to-top');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  try { initThemeToggle(); } catch (e) { console.error('Theme toggle error:', e); }
  try { initMobileMenu(); } catch (e) { console.error('Mobile menu error:', e); }
  try { initScrollProgress(); } catch (e) { console.error('Scroll progress error:', e); }
  try { initActiveNav(); } catch (e) { console.error('Active nav error:', e); }
  try { initScrollReveal(); } catch (e) { console.error('Scroll reveal error:', e); }
  try { initScrollEffects(); } catch (e) { console.error('Scroll effects error:', e); }
  try { initProjectStack(); } catch (e) { console.error('Project stack error:', e); }
  try { initHeroDotGrid(); } catch (e) { console.error('Hero DotGrid error:', e); }
  try { initChipWave(); } catch (e) { console.error('Chip wave error:', e); }
  try { initCountUp(); } catch (e) { console.error('Count up error:', e); }
  try { initCopyEmail(); } catch (e) { console.error('Copy email error:', e); }
  try { initFooterYear(); } catch (e) { console.error('Footer year error:', e); }
  try { initMagneticButtons(); } catch (e) { console.error('Magnetic buttons error:', e); }
  try { initFooterBackToTop(); } catch (e) { console.error('Footer back to top error:', e); }
})();
