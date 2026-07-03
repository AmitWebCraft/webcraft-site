/* ===== BOLD / MOTION EFFECTS ===== */
/* Skip all of this for touch devices or users who prefer reduced motion */
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== PARALLAX ORBS / SHAPES ===== */
if (!reduceMotion) {
    const parallaxEls = Array.from(document.querySelectorAll('.parallax[data-speed]'));
    if (parallaxEls.length) {
        let ticking = false;
        const updateParallax = () => {
            const y = window.scrollY;
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.dataset.speed) || 0.2;
                el.style.transform = `translateY(${y * speed}px)`;
            });
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; }
        }, { passive: true });
        updateParallax();
    }
}

/* ===== 3D TILT + MAGNETIC BUTTONS (delegated, works for dynamically-rendered cards) ===== */
if (canHover && !reduceMotion) {
    let activeTilt = null;
    let activeMagnet = null;

    document.addEventListener('pointermove', e => {
        const tiltEl = e.target.closest('.tilt');
        if (activeTilt && activeTilt !== tiltEl) {
            activeTilt.style.transform = '';
            activeTilt = null;
        }
        if (tiltEl) {
            activeTilt = tiltEl;
            const r = tiltEl.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            const rotateY = px * 12;
            const rotateX = -py * 12;
            tiltEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }

        const magnetEl = e.target.closest('.magnetic');
        if (activeMagnet && activeMagnet !== magnetEl) {
            activeMagnet.style.transform = '';
            activeMagnet = null;
        }
        if (magnetEl) {
            activeMagnet = magnetEl;
            const r = magnetEl.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
            const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
            magnetEl.style.transform = `translate(${dx}px, ${dy}px)`;
        }
    });

    document.documentElement.addEventListener('mouseleave', () => {
        if (activeTilt) { activeTilt.style.transform = ''; activeTilt = null; }
        if (activeMagnet) { activeMagnet.style.transform = ''; activeMagnet = null; }
    });
}

/* ===== CURSOR SPOTLIGHT ===== */
if (canHover && !reduceMotion) {
    document.addEventListener('pointermove', e => {
        const el = e.target.closest('.spotlight');
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
}
