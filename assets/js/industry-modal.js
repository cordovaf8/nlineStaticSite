// industry-modal.js - Industry tab-like description functionality
(() => {
  "use strict";

  // Industry definitions
  const industryDefinitions = {
    'municipal': {
      text: 'We provide comprehensive electrical services for municipal infrastructure including city facilities, public works, street lighting, traffic systems, and community buildings. Our expertise ensures reliable power distribution for essential public services.'
    },
    'manufacturing': {
      text: 'Industrial manufacturing facilities require robust electrical systems for production lines, machinery, and process control. We design, install, and maintain electrical infrastructure that supports high-demand manufacturing operations with minimal downtime.'
    },
    'warehouses': {
      text: 'Warehouse and distribution centers need efficient electrical systems for lighting, material handling equipment, HVAC, and security systems. We provide reliable electrical solutions that support 24/7 operations and ensure worker safety.'
    },
    'utilities': {
      text: 'We work with utility companies on medium voltage distribution, substation construction, and infrastructure maintenance. Our services support reliable power delivery to communities and industrial customers.'
    },
    'water-treatment': {
      text: 'Water and wastewater treatment facilities require specialized electrical systems for pumps, controls, and monitoring equipment. We provide electrical services that ensure continuous operation of critical water treatment processes.'
    },
    'agriculture': {
      text: 'Agricultural operations including farms, ranches, and processing facilities need reliable electrical power for irrigation systems, equipment, and facilities. We understand the unique requirements of agricultural electrical systems and provide solutions tailored to rural and agricultural settings.'
    }
  };

  function initIndustryTabs() {
    const descriptionContainer = document.getElementById('industryDescription');
    const descriptionText = descriptionContainer?.querySelector('.industry-description__text');
    const industryButtons = document.querySelectorAll('button.industry-chip');
    const industriesSection = descriptionContainer?.closest('.section');

    if (!descriptionContainer || !descriptionText) return;

    // Check for hash on page load to activate industry from homepage
    function activateIndustryFromHash() {
      const hash = window.location.hash.slice(1);
      if (!hash || !hash.startsWith('industry-')) return;

      const industryKey = hash.replace('industry-', '');
      if (industryDefinitions[industryKey]) {
        // Show the description
        showDescription(industryKey);
        // Replace hash in URL without scrolling (clean URL)
        if (history.replaceState) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        // One more scroll to top to be sure
        setTimeout(() => window.scrollTo(0, 0), 50);
      }
    }

    function showDescription(industryKey) {
      const definition = industryDefinitions[industryKey];
      if (!definition) return;

      // Update all buttons' aria-selected state
      industryButtons.forEach(btn => {
        const isSelected = btn.getAttribute('data-industry') === industryKey;
        btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      });

      // Update text
      descriptionText.textContent = definition.text;
      
      // Show container - CSS will handle the animation
      descriptionContainer.setAttribute('data-visible', 'true');
      
      // Add class to section for spacing
      if (industriesSection) {
        industriesSection.classList.add('has-description');
      }
    }

    function hideDescription() {
      industryButtons.forEach(btn => {
        btn.setAttribute('aria-selected', 'false');
      });
      
      // Hide container - CSS will handle the animation
      descriptionContainer.setAttribute('data-visible', 'false');
      
      // Remove class from section for tighter spacing
      if (industriesSection) {
        industriesSection.classList.remove('has-description');
      }
    }

    // Handle button clicks
    industryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event from bubbling up
        const industryKey = button.getAttribute('data-industry');
        const isSelected = button.getAttribute('aria-selected') === 'true';
        
        if (isSelected) {
          // If already selected, hide the description
          hideDescription();
        } else if (industryKey && industryDefinitions[industryKey]) {
          // Show the selected industry's description
          showDescription(industryKey);
        }
      });
    });

    // Hide description when clicking outside industry buttons or description
    document.addEventListener('click', (e) => {
      // Check if click is on an industry button
      const clickedButton = e.target.closest('button.industry-chip');
      // Check if click is on the description container
      const clickedDescription = e.target.closest('#industryDescription');
      
      // If click is outside both, hide the description
      if (!clickedButton && !clickedDescription) {
        const isVisible = descriptionContainer.getAttribute('data-visible') === 'true';
        if (isVisible) {
          hideDescription();
        }
      }
    });

    // Check for hash on page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Ensure we're at top
        window.scrollTo(0, 0);
        setTimeout(() => {
          window.scrollTo(0, 0);
          activateIndustryFromHash();
        }, 100);
      });
    } else {
      // Ensure we're at top
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        activateIndustryFromHash();
      }, 100);
    }

    // Also try on window load as a fallback
    window.addEventListener('load', () => {
      setTimeout(() => activateIndustryFromHash(), 100);
    });

    // Also check for hash changes
    window.addEventListener('hashchange', () => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        window.scrollTo(0, 0);
        activateIndustryFromHash();
      }, 50);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndustryTabs);
  } else {
    initIndustryTabs();
  }
})();
