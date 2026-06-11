/**
 * Loads the shared Google Analytics snippet from the canonical component.
 * Keep the tracking snippet itself in /components/analytics.html.
 */
(function loadUroAnalytics() {
  if (window.__uroAnalyticsLoaded) return;
  window.__uroAnalyticsLoaded = true;

  fetch('/components/analytics.html')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then(html => {
      const temp = document.createElement('div');
      temp.innerHTML = html;

      temp.querySelectorAll('script').forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) newScript.src = script.src;
        else newScript.textContent = script.textContent;
        if (script.async) newScript.async = true;
        document.head.appendChild(newScript);
      });
    })
    .catch(error => {
      if (window.UroConstants?.FEATURES?.DEBUG_MODE) {
        console.warn('Analytics not loaded:', error);
      }
    });
})();
