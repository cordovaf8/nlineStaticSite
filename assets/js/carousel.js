// carousel.js - Reusable image carousel component with auto-rotation
(() => {
  "use strict";

  /**
   * Initializes a carousel component
   * @param {HTMLElement} carousel - The carousel container element
   */
  function initCarousel(carousel) {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const indicators = Array.from(carousel.querySelectorAll('[data-carousel-indicator]'));
    const prevButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    
    if (!track || slides.length === 0) return;

    // Get configuration from data attributes
    const autoRotate = carousel.dataset.autoRotate !== 'false'; // default true
    const rotateInterval = parseInt(carousel.dataset.rotateInterval) || 5000; // default 5 seconds
    const pauseOnHover = carousel.dataset.pauseOnHover !== 'false'; // default true

    let currentIndex = 0;
    let autoRotateInterval = null;
    let isPaused = false;

    // Initialize indicators
    indicators.forEach((indicator, index) => {
      if (index === 0) {
        indicator.setAttribute('data-active', 'true');
      }
      indicator.addEventListener('click', () => goToSlide(index));
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
    });

    function updateCarousel() {
      // Move track to show current slide
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.setAttribute('data-active', 'true');
          indicator.setAttribute('aria-current', 'true');
        } else {
          indicator.removeAttribute('data-active');
          indicator.removeAttribute('aria-current');
        }
      });

      // Update slide visibility for accessibility
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0 || index >= slides.length) return;
      currentIndex = index;
      updateCarousel();
      if (autoRotate) {
        resetAutoRotate();
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    function startAutoRotate() {
      if (!autoRotate || isPaused) return;
      stopAutoRotate();
      autoRotateInterval = setInterval(nextSlide, rotateInterval);
    }

    function stopAutoRotate() {
      if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
      }
    }

    function resetAutoRotate() {
      stopAutoRotate();
      if (autoRotate && !isPaused) {
        startAutoRotate();
      }
    }

    function pause() {
      isPaused = true;
      stopAutoRotate();
    }

    function resume() {
      isPaused = false;
      if (autoRotate) {
        startAutoRotate();
      }
    }

    // Navigation button handlers
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        prevSlide();
        if (autoRotate) resetAutoRotate();
      });
      prevButton.setAttribute('aria-label', 'Previous slide');
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        nextSlide();
        if (autoRotate) resetAutoRotate();
      });
      nextButton.setAttribute('aria-label', 'Next slide');
    }

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
        if (autoRotate) resetAutoRotate();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
        if (autoRotate) resetAutoRotate();
      }
    });

    // Pause on hover (if enabled)
    if (pauseOnHover) {
      carousel.addEventListener('mouseenter', pause);
      carousel.addEventListener('mouseleave', resume);
      carousel.addEventListener('focusin', pause);
      carousel.addEventListener('focusout', resume);
    }

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50; // minimum distance for swipe
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next slide
          nextSlide();
        } else {
          // Swipe right - previous slide
          prevSlide();
        }
        if (autoRotate) resetAutoRotate();
      }
    }

    // Make carousel focusable for keyboard navigation
    if (!carousel.hasAttribute('tabindex')) {
      carousel.setAttribute('tabindex', '0');
    }

    // Initialize
    updateCarousel();
    if (autoRotate) {
      startAutoRotate();
    }
  }

  // Initialize all carousels on the page
  function initAllCarousels() {
    const carousels = document.querySelectorAll('[data-carousel]');
    carousels.forEach(carousel => {
      initCarousel(carousel);
    });
  }

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
  } else {
    initAllCarousels();
  }

  // Export for manual initialization
  window.initCarousel = initCarousel;
  window.initAllCarousels = initAllCarousels;
})();
