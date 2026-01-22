// carousel.js - Image carousel with auto-rotation
(() => {
  "use strict";

  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('[data-carousel-track]');
  const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
  const indicators = Array.from(carousel.querySelectorAll('[data-carousel-indicator]'));
  
  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoRotateInterval = null;

  // Initialize indicators
  indicators.forEach((indicator, index) => {
    if (index === 0) {
      indicator.setAttribute('data-active', 'true');
    }
    indicator.addEventListener('click', () => goToSlide(index));
  });

  function updateCarousel() {
    // Move track to show current slide
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.setAttribute('data-active', 'true');
      } else {
        indicator.removeAttribute('data-active');
      }
    });
  }

  function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    currentIndex = index;
    updateCarousel();
    resetAutoRotate();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function startAutoRotate() {
    stopAutoRotate();
    autoRotateInterval = setInterval(nextSlide, 5000); // 5 seconds
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);

  // Pause on focus (keyboard navigation)
  carousel.addEventListener('focusin', stopAutoRotate);
  carousel.addEventListener('focusout', startAutoRotate);

  // Initialize
  updateCarousel();
  startAutoRotate();
})();