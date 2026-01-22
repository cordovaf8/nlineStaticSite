// site.js
(() => {
  "use strict";

  // ----- Dropdowns (desktop + mobile) -----
  function closeAllDropdowns() {
    document.querySelectorAll("[data-dropdown-menu]").forEach(m => m.dataset.open = "false");
    document.querySelectorAll("[data-dropdown-button]").forEach(b => b.setAttribute("aria-expanded", "false"));
  }

  function toggleDropdown(button) {
    const id = button.getAttribute("aria-controls");
    const menu = id ? document.getElementById(id) : null;
    if (!menu) return;

    const open = menu.dataset.open === "true";
    closeAllDropdowns();
    menu.dataset.open = open ? "false" : "true";
    button.setAttribute("aria-expanded", open ? "false" : "true");
  }

  document.addEventListener("click", (e) => {
    const mobileBtn = e.target.closest("[data-mobile-toggle]");
    if (mobileBtn) {
      const mobilePanel = document.querySelector("[data-mobile-panel]");
      if (mobilePanel) {
        const open = mobilePanel.dataset.open === "true";
        mobilePanel.dataset.open = open ? "false" : "true";
        mobileBtn.setAttribute("aria-expanded", open ? "false" : "true");
        if (!open) closeAllDropdowns();
      }
      return;
    }
    const btn = e.target.closest("[data-dropdown-button]");
    if (btn) {
      e.preventDefault();
      toggleDropdown(btn);
      return;
    }
    // click outside closes
    if (!e.target.closest("[data-dropdown]")) closeAllDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  // ----- Mobile panel -----
  // Uses event delegation (see click handler above) so it works after header.js
  // injects the header on DOMContentLoaded.

  // ----- Tabs -----
  // For each [data-tabs] container:
  document.querySelectorAll("[data-tabs]").forEach(tabsRoot => {
    const tabButtons = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabsRoot.querySelectorAll('[role="tabpanel"]'));

    function activate(tabId) {
      tabButtons.forEach(btn => {
        const isActive = btn.id === tabId;
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach(p => {
        const isActive = p.getAttribute("aria-labelledby") === tabId;
        p.dataset.active = isActive ? "true" : "false";
      });
    }

    // Default active: aria-selected=true or first tab
    const initial = tabButtons.find(b => b.getAttribute("aria-selected") === "true") || tabButtons[0];
    if (initial) activate(initial.id);

    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => activate(btn.id));
      btn.addEventListener("keydown", (e) => {
        const i = tabButtons.indexOf(btn);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const next = tabButtons[(i + 1) % tabButtons.length];
          next.focus();
          activate(next.id);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prev = tabButtons[(i - 1 + tabButtons.length) % tabButtons.length];
          prev.focus();
          activate(prev.id);
        }
      });
    });
  });
})();
