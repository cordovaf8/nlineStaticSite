// lightbox.js - Image lightbox functionality for pictures page
(() => {
  "use strict";

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox?.querySelector('.lightbox__image');
    const lightboxClose = lightbox?.querySelector('.lightbox__close');
    const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
    const lightboxNext = lightbox?.querySelector('.lightbox__next');
    const lightboxOverlay = lightbox?.querySelector('.lightbox__overlay');
    const pictureItems = document.querySelectorAll('[data-lightbox]');

    if (!lightbox || !lightboxImage || pictureItems.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(pictureItems).map(item => {
      const img = item.querySelector('img');
      return img ? img.src : null;
    }).filter(Boolean);

    function openLightbox(index) {
      if (index < 0 || index >= images.length) return;
      
      currentIndex = index;
      lightboxImage.src = images[currentIndex];
      lightboxImage.alt = pictureItems[currentIndex]?.querySelector('img')?.alt || 'N Line Electric project';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Update navigation buttons visibility
      lightboxPrev.style.display = images.length > 1 ? 'flex' : 'none';
      lightboxNext.style.display = images.length > 1 ? 'flex' : 'none';
    }

    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showNext() {
      const nextIndex = (currentIndex + 1) % images.length;
      openLightbox(nextIndex);
    }

    function showPrev() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(prevIndex);
    }

    // Add click handlers to picture items
    pictureItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    // Close button
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Overlay click
    if (lightboxOverlay) {
      lightboxOverlay.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          showNext();
        } else if (e.key === 'ArrowLeft') {
          showPrev();
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
