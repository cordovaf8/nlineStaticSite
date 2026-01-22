# VoltWise Energy (Static Multi-Page Website)

## What's included
- Multi-page static site (no build tools required)
- Desktop dropdown navigation + mobile menu
- Tabbed content on Services / Pricing / FAQ
- Contact form with Formspree stub

## File structure
- `index.html`, `services.html`, `pricing.html`, `faq.html`, `about.html`, `contact.html`
- `assets/css/styles.css`
- `assets/js/site.js` (dropdowns, mobile menu, tabs)
- `assets/js/config.js` (Formspree endpoint)
- `assets/js/contact.js` (contact form submit)

## Setup (Formspree)
1. Create a Formspree form and copy its endpoint (example: https://formspree.io/f/xxxxxxx)
2. Edit `assets/js/config.js` and replace `REPLACE_ME`
3. Upload all files to your host (e.g., GoDaddy cPanel) so `index.html` is in the web root.

## Notes
- Rates and details are demo content.
