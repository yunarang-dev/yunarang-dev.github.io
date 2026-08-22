(() => {
  'use strict';

  if (document.getElementById('astral-sky-canvas')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'astral-sky-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const finePointer = window.matchMedia('(pointer: fine)');

  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let meteors = [];
  let mode = 'dark';
  let lastFrame = 0;
  let nextMeteorAt = 0;

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const scroll = { y: window.scrollY || 0, ty: window.scrollY || 0 };

  function resolveMode() {
    const explicit = root.dataset.mode;
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return systemDark.matches ? 'dark' : 'light';
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    width = Math.max(1, window.innerWidth);
    height = Math.max(1, window.innerHeight);
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const mobile = width < 760;
    const areaFactor = Math.sqrt((width * height) / (1440 * 900));
    const baseCount = mobile ? 76 : 142;
    const count = Math.round(Math.min(mobile ? 105 : 220, Math.max(mobile ? 60 : 105, baseCount * areaFactor)));

    stars = Array.from({ length: count }, (_, i) => {
      const depth = random(0.22, 1);
      const warm = Math.random() < 0.105;
      const bright = Math.random() < 0.12;
      return {
        x: Math.random(),
        y: Math.random(),
        r: bright ? random(1.15, 2.05) : random(0.45, 1.35),
        depth,
        phase: random(0, Math.PI * 2),
        twinkle: random(0.45, 1.35),
        alpha: bright ? random(0.62, 0.98) : random(0.2, 0.72),
        warm,
        glow: bright && Math.random() < 0.58,
        id: i,
      };
    });

    meteors = [];
    scheduleMeteor(performance.now(), true);
    if (reducedMotion.matches) draw(performance.now());
  }

  function scheduleMeteor(now, initial = false) {
    nextMeteorAt = now + (initial ? random(1800, 4600) : random(6500, 12500));
  }

  function spawnMeteor(now) {
    if (width < 620 || mode === 'light' || reducedMotion.matches) {
      scheduleMeteor(now);
      return;
    }

    const fromRight = Math.random() > 0.28;
    const speed = random(540, 760);
    const angle = random(0.47, 0.62);
    const direction = fromRight ? -1 : 1;
    const vx = Math.cos(angle) * speed * direction;
    const vy = Math.sin(angle) * speed;

    meteors.push({
      x: fromRight ? random(width * 0.62, width * 1.06) : random(-width * 0.06, width * 0.18),
      y: random(-40, height * 0.22),
      vx,
      vy,
      born: now,
      life: random(760, 1120),
      length: random(86, 148),
      width: random(0.8, 1.45),
    });

    scheduleMeteor(now);
  }

  function drawStar(star, now, globalAlpha) {
    const t = now * 0.001;
    const pulse = reducedMotion.matches ? 0.86 : 0.72 + Math.sin(star.phase + t * star.twinkle) * 0.28;
    const parallaxX = pointer.x * star.depth;
    const parallaxY = pointer.y * star.depth;
    const scrollShift = scroll.y * (0.022 + star.depth * 0.075);
    const wrapHeight = height + 56;
    const x = star.x * width + parallaxX;
    const rawY = star.y * height + parallaxY - scrollShift;
    const y = ((rawY + 28) % wrapHeight + wrapHeight) % wrapHeight - 28;
    const a = Math.max(0.03, star.alpha * pulse * globalAlpha);

    if (star.glow) {
      const glowRadius = star.r * 5.5;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
      if (star.warm) {
        gradient.addColorStop(0, `rgba(255, 201, 156, ${a * 0.24})`);
      } else {
        gradient.addColorStop(0, `rgba(198, 225, 247, ${a * 0.28})`);
      }
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = star.warm
      ? `rgba(255, 194, 143, ${a})`
      : `rgba(222, 239, 252, ${a})`;
    ctx.beginPath();
    ctx.arc(x, y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMeteor(meteor, now, globalAlpha) {
    const age = now - meteor.born;
    const p = age / meteor.life;
    if (p >= 1) return false;

    const dt = age / 1000;
    const x = meteor.x + meteor.vx * dt;
    const y = meteor.y + meteor.vy * dt;
    const speed = Math.hypot(meteor.vx, meteor.vy);
    const ux = meteor.vx / speed;
    const uy = meteor.vy / speed;
    const tailX = x - ux * meteor.length;
    const tailY = y - uy * meteor.length;
    const fade = Math.sin(Math.PI * Math.min(1, p)) * globalAlpha;

    const gradient = ctx.createLinearGradient(x, y, tailX, tailY);
    gradient.addColorStop(0, `rgba(245, 250, 255, ${0.88 * fade})`);
    gradient.addColorStop(0.12, `rgba(194, 224, 247, ${0.55 * fade})`);
    gradient.addColorStop(0.68, `rgba(120, 165, 205, ${0.16 * fade})`);
    gradient.addColorStop(1, 'rgba(120,165,205,0)');

    ctx.strokeStyle = gradient;
    ctx.lineWidth = meteor.width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    ctx.fillStyle = `rgba(255,255,255,${0.85 * fade})`;
    ctx.beginPath();
    ctx.arc(x, y, meteor.width * 1.35, 0, Math.PI * 2);
    ctx.fill();

    return true;
  }

  function draw(now) {
    mode = resolveMode();
    ctx.clearRect(0, 0, width, height);

    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;
    scroll.y += (scroll.ty - scroll.y) * 0.08;

    const globalAlpha = mode === 'dark' ? 1 : 0.28;
    for (const star of stars) drawStar(star, now, globalAlpha);

    if (!reducedMotion.matches && mode === 'dark' && now >= nextMeteorAt) spawnMeteor(now);
    meteors = meteors.filter((meteor) => drawMeteor(meteor, now, globalAlpha));
  }

  function animate(now) {
    if (now - lastFrame >= 1000 / 45) {
      lastFrame = now;
      draw(now);
    }
    if (!reducedMotion.matches) requestAnimationFrame(animate);
  }

  function onScroll() {
    scroll.ty = window.scrollY || document.documentElement.scrollTop || 0;
    if (reducedMotion.matches) {
      scroll.y = scroll.ty;
      draw(performance.now());
    }
  }

  function onPointerMove(event) {
    if (!finePointer.matches || reducedMotion.matches) return;
    const nx = event.clientX / Math.max(width, 1) - 0.5;
    const ny = event.clientY / Math.max(height, 1) - 0.5;
    pointer.tx = nx * 18;
    pointer.ty = ny * 12;
  }

  function onPointerLeave() {
    pointer.tx = 0;
    pointer.ty = 0;
  }

  const modeObserver = new MutationObserver(() => {
    mode = resolveMode();
    if (reducedMotion.matches) draw(performance.now());
  });
  modeObserver.observe(root, { attributes: true, attributeFilter: ['data-mode'] });

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('mouseleave', onPointerLeave, { passive: true });
  systemDark.addEventListener?.('change', () => {
    if (!root.dataset.mode && reducedMotion.matches) draw(performance.now());
  });
  reducedMotion.addEventListener?.('change', () => {
    resize();
    if (!reducedMotion.matches) requestAnimationFrame(animate);
  });

  resize();
  mode = resolveMode();
  if (reducedMotion.matches) draw(performance.now());
  else requestAnimationFrame(animate);
})();
