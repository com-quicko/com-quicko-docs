// Inject styles dynamically based on current page
(function() {
  const STYLE_ID = 'dynamic-page-styles';
  
  // Define all styles
  const indexPageStyles = `
    /* Landing page styles */
    div:has(#navbar) {
      display: block !important;
    }
    
    #sidebar {
      display: none !important;
    }
    
    #content-container {
      margin-right: auto !important;
      margin-left: auto !important;
      margin-top: 0 !important;
      max-width: 80rem !important;
      padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem) !important;
    }
    
    #content-side-layout {
      display: none !important;
    }
    
    #tabs {
      display: none !important;
    }
    
    #navbar-transition-willow {
      display: none !important;
    }
    
    /* Adaptive colors for dark/light themes */
    :root,
    body,
    html {
      --text-primary: #111827 !important;
      --text-secondary: #6b7280 !important;
    }
    
    /* Dark theme support */
    @media (prefers-color-scheme: dark) {
      :root,
      body,
      html {
        --text-primary: #f9fafb !important;
        --text-secondary: #d1d5db !important;
      }
    }
    
    html.dark,
    html.dark *,
    body.dark,
    body.dark *,
    [data-theme="dark"],
    [data-theme="dark"] *,
    [data-theme="dark"] body {
      --text-primary: #f9fafb !important;
      --text-secondary: #d1d5db !important;
    }
    
    /* Light theme explicit support */
    html.light,
    html.light *,
    body.light,
    body.light *,
    [data-theme="light"],
    [data-theme="light"] *,
    [data-theme="light"] body {
      --text-primary: #111827 !important;
      --text-secondary: #6b7280 !important;
    }
  `;
  
  const defaultStyles = `
    /* Default styles for all pages */
    #sidebar-content {
      overflow-x: hidden;
    }
  `;
  
  function applyPageStyles() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/';
    
    // Remove existing style tag if present
    const existingStyle = document.getElementById(STYLE_ID);
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Create new style tag
    const styleTag = document.createElement('style');
    styleTag.id = STYLE_ID;
    
    // Apply appropriate styles based on page
    if (isIndexPage) {
      styleTag.textContent = defaultStyles + indexPageStyles;
    } else {
      styleTag.textContent = defaultStyles;
    }
    
    // Inject into document head
    document.head.appendChild(styleTag);
  }
  
  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyPageStyles);
  } else {
    applyPageStyles();
  }
  
  // Also run when navigation changes (for SPAs)
  window.addEventListener('popstate', applyPageStyles);
  
  // Watch for URL changes in single-page applications
  const pushState = history.pushState;
  history.pushState = function() {
    pushState.apply(history, arguments);
    applyPageStyles();
  };
  
  const replaceState = history.replaceState;
  history.replaceState = function() {
    replaceState.apply(history, arguments);
    applyPageStyles();
  };
})();