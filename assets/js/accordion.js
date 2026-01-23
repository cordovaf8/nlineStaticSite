// accordion.js - Accordion functionality for services page
(() => {
  "use strict";

  // Map of hash fragments to accordion item IDs
  const hashToAccordionId = {
    'mv': 'mv',
    'overhead': 'overhead',
    'underground': 'underground',
    'design': 'design',
    'substation': 'substation',
    'industrial': 'industrial'
  };

  function openAccordionByHash() {
    const hash = window.location.hash.slice(1); // Remove the #
    if (!hash || !hashToAccordionId[hash]) return;

    // Wait for header to be injected and DOM to be fully ready
    function tryOpenAccordion(attempts = 0) {
      const accordionItem = document.getElementById(hashToAccordionId[hash]);
      if (!accordionItem) {
        // If not found and we haven't tried too many times, try again
        if (attempts < 10) {
          setTimeout(() => tryOpenAccordion(attempts + 1), 100);
        }
        return;
      }

      const button = accordionItem.querySelector("[data-accordion-button]");
      const panel = accordionItem.querySelector("[data-accordion-panel]");
      
      if (!button || !panel) {
        if (attempts < 10) {
          setTimeout(() => tryOpenAccordion(attempts + 1), 100);
        }
        return;
      }

      // Close all other panels
      document.querySelectorAll("[data-accordion]").forEach(accordionRoot => {
        const allButtons = Array.from(accordionRoot.querySelectorAll("[data-accordion-button]"));
        const allPanels = Array.from(accordionRoot.querySelectorAll("[data-accordion-panel]"));
        
        allButtons.forEach(btn => {
          btn.setAttribute("aria-expanded", "false");
        });
        allPanels.forEach(p => {
          p.setAttribute("data-active", "false");
        });
      });

      // Hide scrollbar temporarily to prevent visible scroll
      document.body.classList.add('accordion-scrolling');
      
      // Calculate scroll position BEFORE opening panel
      const headerOffset = 100;
      const rectBefore = accordionItem.getBoundingClientRect();
      const targetScrollPosition = rectBefore.top + window.pageYOffset - headerOffset;
      
      // Set scroll position FIRST, before opening panel
      window.scrollTo(0, targetScrollPosition);
      document.documentElement.scrollTop = targetScrollPosition;
      if (document.body) {
        document.body.scrollTop = targetScrollPosition;
      }
      
      // Force synchronous layout
      void accordionItem.offsetHeight;
      
      // Open the target panel
      button.setAttribute("aria-expanded", "true");
      panel.setAttribute("data-active", "true");
      
      // Force another layout to ensure panel is rendered
      void panel.offsetHeight;
      
      // Adjust scroll if needed after panel opens
      const rectAfter = accordionItem.getBoundingClientRect();
      const finalPosition = rectAfter.top + window.pageYOffset - headerOffset;
      window.scrollTo(0, finalPosition);
      document.documentElement.scrollTop = finalPosition;
      if (document.body) {
        document.body.scrollTop = finalPosition;
      }
      
      // Re-enable scrolling after a brief moment
      requestAnimationFrame(() => {
        document.body.classList.remove('accordion-scrolling');
      });
    }

    // Start trying after a short delay
    setTimeout(() => tryOpenAccordion(), 100);
  }

  document.querySelectorAll("[data-accordion]").forEach(accordionRoot => {
    const buttons = Array.from(accordionRoot.querySelectorAll("[data-accordion-button]"));
    const panels = Array.from(accordionRoot.querySelectorAll("[data-accordion-panel]"));

    function togglePanel(button) {
      const panelId = button.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      const isExpanded = button.getAttribute("aria-expanded") === "true";
      
      // Close all panels
      buttons.forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
      });
      panels.forEach(p => {
        p.setAttribute("data-active", "false");
      });

      // Open clicked panel if it was closed
      if (!isExpanded) {
        button.setAttribute("aria-expanded", "true");
        panel.setAttribute("data-active", "true");
      }
    }

    buttons.forEach(button => {
      button.addEventListener("click", () => togglePanel(button));
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePanel(button);
        }
      });
    });
  });

  // Check for hash on page load - wait for everything to be ready
  function initAccordionHash() {
    // Wait a bit longer to ensure header.js has injected the header
    setTimeout(() => {
      openAccordionByHash();
    }, 300);
  }

  // Try multiple times to ensure it works
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordionHash);
  } else {
    initAccordionHash();
  }

  // Also try on window load as a fallback
  window.addEventListener('load', () => {
    setTimeout(() => openAccordionByHash(), 100);
  });

  // Also check for hash changes (e.g., if user navigates back/forward)
  window.addEventListener('hashchange', () => {
    setTimeout(() => openAccordionByHash(), 100);
  });
})();
