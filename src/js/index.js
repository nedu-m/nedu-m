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

// Initialize custom cursor (optional, don't block if it fails)
function initCursor() {
    try {
        import('./cursor.js').then(({ Cursor }) => {
            const cursors = document.querySelectorAll('.cursor');
            if (cursors.length > 0) {
                new Cursor(cursors, 'a, .project__toggle');
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
