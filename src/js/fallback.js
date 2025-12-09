// Fallback script for browsers that don't support ES modules
// This file uses ES5 syntax for maximum compatibility
(function () {
  // Helper for classList (IE10+ support)
  function hasClass(el, cls) {
    return el.className && el.className.indexOf(cls) !== -1;
  }
  function addClass(el, cls) {
    if (!hasClass(el, cls)) {
      el.className = (el.className ? el.className + ' ' : '') + cls;
    }
  }
  function removeClass(el, cls) {
    if (el.className) {
      el.className = el.className.replace(new RegExp('(^|\\s)' + cls + '(\\s|$)', 'g'), ' ').trim();
    }
  }

  // Mobile menu toggle
  function setupMobileMenu() {
    var menuBtn = document.querySelector('.frame__menu-btn');
    var nav = document.querySelector('.frame__nav');
    var frame = document.querySelector('.frame');
    if (!menuBtn || !nav || !frame) return;

    function closeMenu() {
      removeClass(frame, 'frame--open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openMenu() {
      addClass(frame, 'frame--open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function toggleMenu(e) {
      e.preventDefault();
      if (hasClass(frame, 'frame--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    var links = nav.querySelectorAll('.frame__link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && hasClass(frame, 'frame--open')) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  // Project toggles
  function setupProjectToggles() {
    var toggles = document.querySelectorAll('.project__toggle');
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        if (toggle.getAttribute('data-setup')) return;
        toggle.setAttribute('data-setup', 'true');

        var handler = function (e) {
          e.preventDefault();
          e.stopPropagation();
          var project = toggle.parentElement;
          while (project && !hasClass(project, 'project')) {
            project = project.parentElement;
          }
          if (!project) return;
          var isExpanded = project.getAttribute('aria-expanded') === 'true';
          var newState = isExpanded ? 'false' : 'true';
          project.setAttribute('aria-expanded', newState);
          toggle.setAttribute('aria-expanded', newState);
        };

        toggle.addEventListener('click', handler);
      })(toggles[i]);
    }
  }

  // Initialize
  function init() {
    setupMobileMenu();
    setupProjectToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
