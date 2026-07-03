/* ===== BEAMS BACKGROUND =====
   Vanilla-canvas port of an animated rising-light-beams effect (originally a
   React/canvas component) — same visual, no framework/build step required. */
(function () {
    const canvas = document.getElementById('beams-canvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Blur is applied once via CSS (GPU-composited) instead of per-frame via the
    // canvas 2D context — ctx.filter on every frame was expensive enough to jank
    // the whole page, since this animation loop otherwise runs forever.
    canvas.style.filter = 'blur(22px)';

    const ctx = canvas.getContext('2d');
    // If the canvas lives inside a <section> (a viewport-sized content block), size
    // to that. Otherwise (e.g. a fixed full-page background with no such wrapper)
    // fall back to the window itself.
    const container = canvas.closest('section');
    const MINIMUM_BEAMS = 14;
    let beams = [];
    let running = false;
    let rafId = null;

    function createBeam(width, height) {
        const angle = -35 + Math.random() * 10;
        return {
            x: Math.random() * width * 1.5 - width * 0.25,
            y: Math.random() * height * 1.5 - height * 0.25,
            width: 30 + Math.random() * 60,
            length: height * 2.5,
            angle,
            speed: 0.6 + Math.random() * 1.2,
            opacity: 0.16 + Math.random() * 0.18,
            hue: 190 + Math.random() * 140, // spans cyan -> indigo -> purple -> pink (brand range)
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
        };
    }

    function resetBeam(beam, index, total, width, height) {
        const column = index % 3;
        const spacing = width / 3;
        beam.y = height + 100;
        beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
        beam.width = 100 + Math.random() * 100;
        beam.speed = 0.5 + Math.random() * 0.4;
        beam.hue = 190 + (index * 140) / total;
        beam.opacity = 0.22 + Math.random() * 0.12;
    }

    function drawBeam(beam) {
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);
        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
        gradient.addColorStop(0,   `hsla(${beam.hue}, 85%, 65%, 0)`);
        gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
        gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
        gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
        gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
    }

    let width = 0, height = 0;

    function updateCanvasSize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR — 3x on some phones is wasteful here
        width = container ? container.clientWidth : window.innerWidth;
        height = container ? container.clientHeight : window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const total = Math.floor(MINIMUM_BEAMS * 1.5);
        beams = Array.from({ length: total }, () => createBeam(width, height));
    }

    function animate() {
        if (!running) return;
        ctx.clearRect(0, 0, width, height);
        const total = beams.length;
        beams.forEach((beam, i) => {
            beam.y -= beam.speed;
            beam.pulse += beam.pulseSpeed;
            if (beam.y + beam.length < -100) resetBeam(beam, i, total, width, height);
            drawBeam(beam);
        });
        rafId = requestAnimationFrame(animate);
    }

    function start() {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(animate);
    }

    function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    if (container) {
        // Only animate while the section is actually visible — this runs forever
        // otherwise, and canvas redraws add up even when scrolled far away.
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => (e.isIntersecting ? start() : stop())),
            { threshold: 0 }
        );
        observer.observe(container);
    } else {
        // Fixed full-page background — just pause when the tab isn't visible.
        document.addEventListener('visibilitychange', () => {
            document.hidden ? stop() : start();
        });
        start();
    }
})();
