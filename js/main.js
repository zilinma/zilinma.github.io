document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initFooterYear();
});

/* Compact, opaque header once scrolled */
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    const update = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* Mobile menu */
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-menu');
    if (!toggle || !nav) return;

    toggle.setAttribute('aria-expanded', 'false');
    const toggleMenu = () => {
        const open = !toggle.classList.contains('active');
        toggle.classList.toggle('active', open);
        nav.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
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
