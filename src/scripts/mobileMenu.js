let menuOverlay, openBtn, closeBtn, navLinks, backdrop;

function lockScroll(lock) {
  if (lock) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

export function toggleMenu(open) {
  menuOverlay = document.getElementById('mobile-menu-overlay');
  backdrop = document.getElementById('mobile-menu-backdrop');
  if (!menuOverlay) return;
  if (open) {
    menuOverlay.classList.remove('hidden');
    menuOverlay.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.remove('hidden');
    lockScroll(true);
    menuOverlay.focus();
  } else {
    menuOverlay.classList.add('hidden');
    menuOverlay.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.classList.add('hidden');
    lockScroll(false);
  }
}

export function closeMenu() {
  toggleMenu(false);
}

function handleDocumentClick(e) {
  if (
    menuOverlay &&
    !menuOverlay.classList.contains('hidden') &&
    !menuOverlay.contains(e.target) &&
    e.target.id !== 'open-menu-btn'
  ) {
    closeMenu();
  }
}

function handleNavLinkClick() {
  closeMenu();
}

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
}

export function initMobileMenu() {
  menuOverlay = document.getElementById('mobile-menu-overlay');
  openBtn = document.getElementById('open-menu-btn');
  closeBtn = document.getElementById('close-menu-btn');
  navLinks = menuOverlay?.querySelectorAll('nav a');
  backdrop = document.getElementById('mobile-menu-backdrop');

  if (openBtn) {
    openBtn.addEventListener('click', () => toggleMenu(true));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }
  if (navLinks) {
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }
  document.addEventListener('mousedown', handleDocumentClick);
  document.addEventListener('keydown', handleKeyDown);
}

document.addEventListener('DOMContentLoaded', initMobileMenu); 