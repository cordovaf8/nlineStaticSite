// page-transition.js - Fade in/out animation on page transitions
(() => {
  "use strict";

  // Add fade-in class to body on page load
  function initFadeIn() {
    // Set initial state
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(10px)';
    document.body.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Trigger fade-in after content is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
      });
    });
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
      document.body.style.transform = 'translateY(-10px)';
      document.body.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
      
      // Navigate after fade-out
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    }
  });

  // Initialize fade-in on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Wait for images and other resources
      window.addEventListener('load', () => {
        setTimeout(initFadeIn, 50);
      });
      // Fallback if load event doesn't fire quickly
      setTimeout(initFadeIn, 300);
    });
  } else {
    // If DOM is already ready, wait a bit for content to settle
    setTimeout(initFadeIn, 50);
  }
})();