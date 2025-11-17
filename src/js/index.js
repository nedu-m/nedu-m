import { Cursor } from './cursor';

// Initialize custom cursor
new Cursor(document.querySelectorAll('.cursor'), 'a, .project__toggle');

// Project expand/collapse functionality
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
