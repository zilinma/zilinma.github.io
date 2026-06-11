document.addEventListener('DOMContentLoaded', () => {
    initAurora();
    initCanvas();
    initHeaderScroll();
    initScrollReveal();
    initMobileMenu();
    initRotatingWords();
    initFooterYear();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Inject the aurora gradient layer behind everything */
function initAurora() {
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    aurora.setAttribute('aria-hidden', 'true');
    document.body.prepend(aurora);
}

/* Constellation canvas — drifting particles with proximity links,
   gently attracted to the pointer */
function initCanvas() {
    const canvas = document.getElementById('fun-canvas');
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width, height, particles;
    const mouse = { x: null, y: null };

    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('pointerleave', () => { mouse.x = mouse.y = null; });

    const COUNT = Math.min(90, Math.floor(width * height / 18000));
    const LINK_DIST = 130;

    particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
    }));

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
            // Gentle pull toward the pointer
            if (mouse.x !== null) {
                const dx = mouse.x - p.x, dy = mouse.y - p.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 160 * 160 && d2 > 1) {
                    p.vx += dx / d2 * 1.4;
                    p.vy += dy / d2 * 1.4;
                }
            }
            // Speed cap keeps motion calm
            const speed = Math.hypot(p.vx, p.vy);
            if (speed > 0.6) { p.vx *= 0.6 / speed; p.vy *= 0.6 / speed; }

            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(14, 155, 192, 0.40)';
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.hypot(dx, dy);
                if (dist < LINK_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(14, 155, 192, ${0.12 * (1 - dist / LINK_DIST)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    };
    animate();
}

/* Glass header once scrolled */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    const update = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* Reveal-on-scroll with stagger inside grids */
function initScrollReveal() {
    const selectors = [
        '.section-header', '.project-tile', '.publication-item', '.publication-year',
        '.cv-item', '.cv-section > h3', '.persona-card', '.method-box',
        '.publication-card', '.stat-highlight', '.project-image-large',
        '.portfolio-intro', '.contact-form', '.page-hero', '.marquee',
    ];
    const elements = document.querySelectorAll(selectors.join(','));
    if (!elements.length) return;

    elements.forEach(el => {
        el.classList.add('reveal');
        // Stagger siblings that reveal together (cards in a grid)
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.style.setProperty('--reveal-delay', `${Math.min(idx, 5) * 0.07}s`);
    });

    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

/* Mobile menu */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-menu');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

/* Typewriter rotation for the hero tagline */
function initRotatingWords() {
    const el = document.querySelector('.rotating');
    if (!el) return;

    let words;
    try { words = JSON.parse(el.dataset.words); } catch { return; }
    if (!Array.isArray(words) || !words.length) return;

    if (reducedMotion) { el.textContent = words[0]; return; }

    let wordIdx = 0, charIdx = 0, deleting = false;

    const tick = () => {
        const word = words[wordIdx];
        charIdx += deleting ? -1 : 1;
        el.textContent = word.slice(0, charIdx);

        let delay = deleting ? 40 : 70;
        if (!deleting && charIdx === word.length) {
            delay = 2200;
            deleting = true;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            delay = 350;
        }
        setTimeout(tick, delay);
    };
    tick();
}

/* Keep the copyright year current */
function initFooterYear() {
    document.querySelectorAll('.footer-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

/* Citation toggle / copy (publications page) */
function toggleCitation(id) {
    const citation = document.getElementById(id);
    if (!citation) return;
    const isOpen = citation.style.display === 'block';
    document.querySelectorAll('.hidden-citation').forEach(el => { el.style.display = 'none'; });
    citation.style.display = isOpen ? 'none' : 'block';
}

function copyCitation(id) {
    const pre = document.getElementById(id);
    if (!pre) return;
    navigator.clipboard.writeText(pre.textContent).then(() => {
        const button = pre.parentElement.querySelector('.copy-button');
        const original = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => { button.innerHTML = original; }, 2000);
    });
}
