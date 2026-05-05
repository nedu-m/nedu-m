function initNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');

    if (!nav || !toggle || !links) return;

    const close = () => {
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    const open = () => {
        nav.classList.add('nav--open');
        toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
        nav.classList.contains('nav--open') ? close() : open();
    });

    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

    document.addEventListener('keydown', e => e.key === 'Escape' && close());
    window.addEventListener('resize', () => window.innerWidth >= 720 && close());
}

function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => observer.observe(el));
}

function initLocalTime() {
    const el = document.getElementById('localTime');
    if (!el) return;

    const fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Lagos',
        hour12: false
    });

    const update = () => { el.textContent = `${fmt.format(new Date())} WAT`; };
    update();
    setInterval(update, 30000);
}

function initStatusLine() {
    const el = document.getElementById('statusLine');
    if (!el) return;

    const statuses = [
        'Hunting vulnerabilities in AI-generated SaaS',
        'Running the recipe library on a new target',
        'Turning LLM training bias into systematic findings',
        'Probing OAuth connectors for state forgery',
        'Building the VibeScan research operation'
    ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = statuses[0];
        return;
    }

    let i = 0;
    el.textContent = statuses[i];

    setInterval(() => {
        i = (i + 1) % statuses.length;
        el.animate(
            [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(6px)' }],
            { duration: 180, fill: 'forwards' }
        ).onfinish = () => {
            el.textContent = statuses[i];
            el.animate(
                [{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }],
                { duration: 240, fill: 'forwards' }
            );
        };
    }, 4200);
}

function initFooterYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
}

function initHeroReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lines = document.querySelectorAll('.hero__line');
    lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(0.6rem)';
        line.style.transition = `opacity 0.8s cubic-bezier(0.0, 0.0, 0.2, 1) ${i * 0.1 + 0.1}s, transform 0.8s cubic-bezier(0.0, 0.0, 0.2, 1) ${i * 0.1 + 0.1}s`;
    });

    const sidebar = document.querySelector('.hero__sidebar');
    if (sidebar) {
        sidebar.style.opacity = '0';
        sidebar.style.transition = 'opacity 0.9s ease 0.45s';
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            lines.forEach(line => {
                line.style.opacity = '1';
                line.style.transform = 'none';
            });
            if (sidebar) sidebar.style.opacity = '1';
        });
    });
}

function init() {
    initNavigation();
    initScrollReveal();
    initLocalTime();
    initStatusLine();
    initFooterYear();
    initHeroReveal();
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
