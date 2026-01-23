# Reusable Components

This directory contains reusable component templates and examples.

## Carousel Component

A fully-featured, accessible image carousel with auto-rotation, keyboard navigation, touch/swipe support, and customizable options.

### Features

- ✅ Auto-rotation (configurable)
- ✅ Pause on hover/focus
- ✅ Keyboard navigation (Arrow keys)
- ✅ Touch/swipe support for mobile
- ✅ Navigation buttons (optional)
- ✅ Slide indicators
- ✅ Accessible (ARIA labels, focus management)
- ✅ Multiple carousels per page supported

### Usage

1. **Copy the HTML structure** from `carousel.html`
2. **Include the JavaScript** in your page:
   ```html
   <script src="./assets/js/carousel.js"></script>
   ```
3. **Customize** images, number of slides, and configuration

### Configuration Options

Add data attributes to the `[data-carousel]` element:

- `data-auto-rotate="false"` - Disable auto-rotation (default: `true`)
- `data-rotate-interval="3000"` - Set rotation interval in milliseconds (default: `5000`)
- `data-pause-on-hover="false"` - Disable pause on hover (default: `true`)

### Example

```html
<div class="carousel" data-carousel data-auto-rotate="true" data-rotate-interval="5000">
  <div class="carousel__track" data-carousel-track>
    <div class="carousel__slide" data-carousel-slide>
      <img src="image1.jpg" alt="Description" />
    </div>
    <div class="carousel__slide" data-carousel-slide>
      <img src="image2.jpg" alt="Description" />
    </div>
  </div>
  <div class="carousel__indicators" data-carousel-indicators>
    <button class="carousel__indicator" data-carousel-indicator></button>
    <button class="carousel__indicator" data-carousel-indicator></button>
  </div>
</div>
```

### Minimal Version

Navigation buttons are optional. You can use just the track and indicators:

```html
<div class="carousel" data-carousel>
  <div class="carousel__track" data-carousel-track>
    <!-- slides -->
  </div>
  <div class="carousel__indicators" data-carousel-indicators>
    <!-- indicators -->
  </div>
</div>
```

### Manual Initialization

If you need to initialize a carousel programmatically:

```javascript
const carousel = document.querySelector('[data-carousel]');
window.initCarousel(carousel);
```

Or initialize all carousels:

```javascript
window.initAllCarousels();
```
