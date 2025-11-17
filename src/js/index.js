import { Cursor } from './cursor';

// Initialize when DOM is ready
function init() {
    // Initialize custom cursor
    new Cursor(document.querySelectorAll('.cursor'), 'a, .project__toggle');

    // Project expand/collapse functionality
    const projectToggles = document.querySelectorAll('.project__toggle');
    projectToggles.forEach(toggle => {
        // Handle both click and touch events for mobile
        const handleToggle = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const project = toggle.closest('.project');
            const isExpanded = project.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded ? 'true' : 'false';
            
            project.setAttribute('aria-expanded', newState);
            toggle.setAttribute('aria-expanded', newState);
        };
        
        toggle.addEventListener('click', handleToggle);
        toggle.addEventListener('touchend', handleToggle);
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
