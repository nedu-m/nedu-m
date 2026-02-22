// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.frame__menu-btn');
    const nav = document.querySelector('.frame__nav');
    const frame = document.querySelector('.frame');
    if (!menuBtn || !nav || !frame) return;

    const closeMenu = () => {
        frame.classList.remove('frame--open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        frame.classList.add('frame--open');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const toggleMenu = (e) => {
        e.preventDefault();
        if (frame.classList.contains('frame--open')) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    nav.querySelectorAll('.frame__link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && frame.classList.contains('frame--open')) {
            closeMenu();
            menuBtn.focus();
        }
    });
}

// Project expand/collapse functionality
function initProjects() {
    const projectToggles = document.querySelectorAll('.project__toggle');

    if (projectToggles.length === 0) {
        setTimeout(initProjects, 100);
        return;
    }

    projectToggles.forEach(toggle => {
        if (toggle.dataset.initialized === 'true' || toggle.dataset.setup === 'true') {
            return;
        }
        toggle.dataset.initialized = 'true';
        toggle.dataset.setup = 'true';

        const handleToggle = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const project = toggle.closest('.project');
            if (!project) return;

            const isExpanded = project.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded ? 'true' : 'false';

            project.setAttribute('aria-expanded', newState);
            toggle.setAttribute('aria-expanded', newState);
        };

        toggle.addEventListener('click', handleToggle, { passive: false });
        toggle.addEventListener('touchend', handleToggle, { passive: false });
        toggle.addEventListener('touchstart', () => {}, { passive: false });
    });
}

// Work card expand/collapse functionality
function initWorkCards() {
    const workCards = document.querySelectorAll('.work-card');

    if (workCards.length === 0) {
        setTimeout(initWorkCards, 100);
        return;
    }

    workCards.forEach((workCard, index) => {
        if (workCard.dataset.initialized === 'true') {
            return;
        }
        workCard.dataset.initialized = 'true';

        // Find toggle and content within THIS card only
        const toggle = workCard.querySelector('.work-card__toggle');
        const content = workCard.querySelector('.work-card__content');

        if (!toggle || !content) {
            return;
        }

        // Store reference to this specific card in closure
        const handleToggle = (function(card, cardToggle, cardContent) {
            return function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Verify we're working with the correct card
                const clickedCard = e.currentTarget.closest('.work-card');
                if (clickedCard !== card) {
                    return;
                }

                const isExpanded = card.getAttribute('aria-expanded') === 'true';
                const newState = !isExpanded ? 'true' : 'false';

                // Only update THIS specific card
                card.setAttribute('aria-expanded', newState);
                cardToggle.setAttribute('aria-expanded', newState);
            };
        })(workCard, toggle, content);

        toggle.addEventListener('click', handleToggle, { passive: false });
        toggle.addEventListener('touchend', handleToggle, { passive: false });
    });
}

// Scroll-triggered reveal animations
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        reveals.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger the reveal slightly based on order
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el, i) => {
        // Add staggered delay for sections after the hero
        if (i > 0) {
            el.style.transitionDelay = `${i * 0.05}s`;
        }
        observer.observe(el);
    });
}

// Live local time (WAT — UTC+1)
function initLocalTime() {
    const el = document.getElementById('localTime');
    if (!el) return;

    function update() {
        const now = new Date();
        const wat = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Lagos',
            hour12: false
        }).format(now);
        el.textContent = wat + ' WAT';
    }

    update();
    setInterval(update, 30000);
}

// Rotating status line
function initStatusLine() {
    const el = document.getElementById('statusLine');
    if (!el) return;

    const statuses = [
        'shipping betsignal',
        'reading the mom test',
        'refactoring something',
        'deploying to production',
        'writing python',
        'building prepcall',
        'debugging at 2am',
        'reviewing pull requests',
        'arguing with a dockerfile',
        'one more migration won\'t hurt',
        'ssh\'d into something',
        'writing fastapi endpoints',
        'grepping through logs',
        'pip install hope',
        'rm -rf node_modules && pray',
        'fixing what worked yesterday',
        'reading man pages at midnight',
        'chmod 777 and looking away',
        'it works on my machine',
        'listening to naval',
    ];

    let current = 0;
    el.textContent = statuses[0];

    setInterval(() => {
        current = (current + 1) % statuses.length;

        // Fade out
        el.style.opacity = '0';
        el.style.transform = 'translateY(4px)';

        setTimeout(() => {
            el.textContent = statuses[current];
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300);
    }, 4000);

    // Add transition styles
    el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    el.style.display = 'inline-block';
}

// Pixel pet wandering
function initPixelPet() {
    const pet = document.getElementById('pixelPet');
    if (!pet) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let posX = window.innerWidth - 64;
    let direction = -1; // -1 = left, 1 = right
    let paused = false;
    let wanderTimeout = null;

    pet.style.right = 'auto';
    pet.style.left = posX + 'px';

    function wander() {
        if (paused) {
            wanderTimeout = setTimeout(wander, 2000 + Math.random() * 3000);
            return;
        }

        // Pick random distance (40-120px)
        const distance = 40 + Math.random() * 80;

        // Maybe flip direction
        if (Math.random() < 0.4) {
            direction *= -1;
        }

        // Keep within bounds
        const newX = posX + (distance * direction);
        if (newX < 20) {
            direction = 1;
            posX = 20;
        } else if (newX > window.innerWidth - 64) {
            direction = -1;
            posX = window.innerWidth - 64;
        } else {
            posX = newX;
        }

        // Flip sprite based on direction
        pet.querySelector('.pet__body').style.transform =
            direction === 1 ? 'scaleX(-1)' : 'scaleX(1)';

        // Animate to new position
        pet.style.transition = 'left 2s ease-in-out';
        pet.style.left = posX + 'px';

        // Randomly pause sometimes (idle)
        if (Math.random() < 0.3) {
            paused = true;
            setTimeout(() => { paused = false; }, 3000 + Math.random() * 4000);
        }

        wanderTimeout = setTimeout(wander, 2500 + Math.random() * 3000);
    }

    // Start wandering after a short delay
    setTimeout(wander, 2000);

    // Update bounds on resize
    window.addEventListener('resize', () => {
        if (posX > window.innerWidth - 64) {
            posX = window.innerWidth - 64;
            pet.style.left = posX + 'px';
        }
    });
}

// Console easter egg
function initConsoleEasterEgg() {
    const art = [
        '%c',
        '   _____ ____  ',
        '  / ____|  _ \\ ',
        ' | |    | | | |',
        ' | |    | |_| |',
        '  \\____|____/ ',
        '',
    ].join('\n');

    const msg = [
        '%cHey, you\'re curious. I like that.',
        '',
        'Let\'s talk → edu.davidson@proton.me',
        'Or check the code → github.com/nedu-m',
    ].join('\n');

    console.log(art, 'color: #c8a55c; font-size: 14px; font-family: monospace;');
    console.log(msg, 'color: #8a8680; font-size: 12px; font-family: monospace;');
}

// Initialize custom cursor (optional, don't block if it fails)
function initCursor() {
    try {
        import('./cursor.js').then(({ Cursor }) => {
            const cursors = document.querySelectorAll('.cursor');
            if (cursors.length > 0) {
                new Cursor(cursors, 'a, .project__toggle, .work-card__toggle');
            }
        }).catch(() => {
            // Cursor failed to load, that's okay
        });
    } catch (e) {
        // Cursor not available, continue without it
    }
}

// Initialize everything
function init() {
    initMobileMenu();
    initProjects();
    initWorkCards();
    initScrollReveal();
    initLocalTime();
    initStatusLine();
    initConsoleEasterEgg();
    initPixelPet();
    initCursor();
}

// Multiple initialization strategies for maximum compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM already loaded
    init();
}

// Also try after a short delay as fallback
setTimeout(init, 50);
