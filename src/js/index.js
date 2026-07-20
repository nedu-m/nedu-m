const yearEl = document.getElementById('footerYear');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach((link) => {
  const label = link.getAttribute('aria-label') || link.textContent.trim();
  if (label && !label.includes('new tab')) {
    link.setAttribute('aria-label', `${label} (opens in a new tab)`);
  }
});
