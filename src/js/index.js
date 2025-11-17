import { Cursor } from './cursor';
import { preloadFonts } from './utils';

// Initialize custom cursor
new Cursor(document.querySelectorAll('.cursor'), 'a, .project__toggle');

// Project expand/collapse functionality
function initProjects() {
    const projectToggles = document.querySelectorAll('.project__toggle');
    projectToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const project = toggle.closest('.project');
            const isExpanded = project.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded ? 'true' : 'false';
            
            project.setAttribute('aria-expanded', newState);
            toggle.setAttribute('aria-expanded', newState);
        });
    });
}

// Preload fonts and remove loader
preloadFonts('jdl7wqk').then(() => {
    document.body.classList.remove('loading');
    initProjects();
});
