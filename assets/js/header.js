// header.js - Reusable header component
(() => {
  "use strict";

  /**
   * Renders the header component and injects it into the page
   * @param {string} currentPage - The current page path (e.g., 'index.html', 'about.html')
   */
  function renderHeader(currentPage) {
    const currentPagePath = currentPage || window.location.pathname.split('/').pop() || 'index.html';
    
    // Determine which page is active
    const activePage = currentPagePath.toLowerCase();
    const isHome = activePage === 'index.html' || activePage === '';
    const isAbout = activePage === 'about.html';
    const isContact = activePage === 'contact.html';
    const isSafety = activePage === 'safety.html';
    const isServices = activePage === 'services.html';

    const headerHTML = `
<header class="header">
  <div class="header__top">
    <div class="container header__top-inner">
      <div class="header__contact">
        <a class="header__contact-link" href="tel:3037021147">(303) 702-1147</a>
        <a class="header__contact-link" href="mailto:info@nlineelectric.com">info@nlineelectric.com</a>
      </div>
      <div class="header__social">
        <a class="header__social-link" href="http://www.facebook.com/nlineelectric" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a class="header__social-link" href="https://x.com/NLineElectric" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a class="header__social-link" href="https://www.instagram.com/nlineelectricofficial/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a class="header__social-link" href="https://www.linkedin.com/company/n-line-electric/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>
    </div>
  </div>
  <div class="container header__inner">
    <a class="brand" href="./index.html">
      <img class="brand__logo" src="./assets/images/n-line-logo.png" alt="N Line Electric" />
      <div class="brand__tag">Exemplary Electrical Services for Industry & Commerce</div>
    </a>

    <nav class="nav" aria-label="Primary navigation">
      <a class="nav__link" ${isHome ? 'aria-current="page"' : ''} href="./index.html">Home</a>
      <a class="nav__link" ${isServices ? 'aria-current="page"' : ''} href="./services.html">Services</a>
      <a class="nav__link" ${isAbout ? 'aria-current="page"' : ''} href="./about.html">About</a>
      <a class="nav__link" ${isSafety ? 'aria-current="page"' : ''} href="./safety.html">Safety</a>
      <a class="nav__link" ${isContact ? 'aria-current="page"' : ''} href="./contact.html">Contact</a>
    </nav>

    <div class="mobile-toggle">
      <button type="button" data-mobile-toggle aria-expanded="false" aria-controls="mobilePanel">Menu</button>
    </div>
  </div>

  <div class="container">
    <div id="mobilePanel" class="mobile-panel" data-mobile-panel data-open="false">
      <a href="./index.html">Home</a>
      <a href="./services.html">Services</a>
      <a href="./about.html">About</a>
      <a href="./safety.html">Safety</a>
      <a href="./contact.html">Contact</a>
    </div>
  </div>
</header>`;

    // Find the header placeholder [data-header] and replace it
    const headerTarget = document.querySelector('[data-header]');
    const existingHeader = document.querySelector('.header');
    
    if (headerTarget) {
      // Replace the [data-header] element with the header HTML
      headerTarget.outerHTML = headerHTML;
    } else if (existingHeader) {
      // Replace existing header (for backwards compatibility)
      existingHeader.outerHTML = headerHTML;
    } else {
      // Fallback: insert after skip-link or at start of body
      const skipLink = document.querySelector('.skip-link');
      if (skipLink) {
        skipLink.insertAdjacentHTML('afterend', headerHTML);
      } else {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
      }
    }
  }

  // Auto-render on load if data-header attribute is present
  // Render synchronously if DOM is ready, otherwise wait for DOMContentLoaded
  function initHeader() {
    const headerTarget = document.querySelector('[data-header]');
    if (headerTarget) {
      renderHeader();
      initScrollHide();
    }
  }

  // Scroll hide functionality
  function initScrollHide() {
    let lastScrollTop = 0;
    let scrollThreshold = 100; // Hide after scrolling 100px
    const header = document.querySelector('.header');
    
    if (!header) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only hide if scrolled past threshold
      if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          // Scrolling down - hide header
          header.classList.add('header--hidden');
        } else {
          // Scrolling up - show header
          header.classList.remove('header--hidden');
        }
      } else {
        // Near top - always show
        header.classList.remove('header--hidden');
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    // DOM is already ready, render immediately
    initHeader();
  }

  // Export for manual use
  window.renderHeader = renderHeader;
})();