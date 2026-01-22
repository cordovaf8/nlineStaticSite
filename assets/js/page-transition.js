// page-transition.js - Fade in/out animation on page transitions
(() => {
  "use strict";

  // Add fade-in class to body on page load
  function initFadeIn() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    // Trigger fade-in after a brief delay
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 10);
  }

  // Handle link clicks for fade-out
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Only fade for internal links (not external, mailto, tel, anchor links, etc.)
    if ((href.startsWith('./') || href.startsWith('/') || 
         (href.startsWith('http') && href.includes(window.location.hostname))) &&
        !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      
      // Prevent default to allow fade-out
      e.preventDefault();
      
      // Fade out
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.2s ease-in-out';
      
      // Navigate after fade-out
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  });

  // Initialize fade-in on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFadeIn);
  } else {
    initFadeIn();
  }
})();