// Project expand/collapse functionality - must work independently
function initProjects() {
    const projectToggles = document.querySelectorAll('.project__toggle');
    
    if (projectToggles.length === 0) {
        // Retry if elements aren't ready yet
        setTimeout(initProjects, 100);
        return;
    }
    
    projectToggles.forEach(toggle => {
        // Skip if already initialized
        if (toggle.dataset.initialized === 'true') {
            return;
        }
        toggle.dataset.initialized = 'true';
        
        // Handle both click and touch events for mobile
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
        
        // Use passive: false to allow preventDefault
        toggle.addEventListener('click', handleToggle, { passive: false });
        toggle.addEventListener('touchend', handleToggle, { passive: false });
        // Also handle touchstart to prevent double-firing
        toggle.addEventListener('touchstart', (e) => {
            // Just prevent default, don't toggle yet
        }, { passive: false });
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
    initProjects();
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
