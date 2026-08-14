/**
 * ==========================================================================
 * MAIN SITE JAVASCRIPT
 * ==========================================================================
 * Manages theme switching, mobile navigation, clipboard interactions,
 * and toast notifications.
 */

(function () {
  'use strict';

  // --- THEME MANAGEMENT ---
  const THEME_KEY = 'site-theme-preference';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeToggleUI(theme);
  }

  function updateThemeToggleUI(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);

  // Listen for OS system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- DOM READY BINDINGS ---
  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle buttons
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target) && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Dynamic Year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear().toString();
    }

    // Copy to clipboard helper
    const copyTriggers = document.querySelectorAll('[data-copy-text]');
    copyTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = trigger.getAttribute('data-copy-text');
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(trigger.getAttribute('data-toast-msg') || 'Copied to clipboard!');
          }).catch(() => {
            showToast('Failed to copy to clipboard');
          });
        }
      });
    });
  });

  // --- TOAST NOTIFICATION ---
  window.showToast = function (message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    // Trigger reflow & show
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  };

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
