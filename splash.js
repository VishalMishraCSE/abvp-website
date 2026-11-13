/* ==========================================================================
   72nd National Conference of ABVP — Splash Screen Logic
   ========================================================================== */

(function () {
  'use strict';

  var splashCompleted = false;

  function removeSplash() {
    if (splashCompleted) return;
    splashCompleted = true;

    var splash = document.getElementById('splash-screen');
    if (!splash) {
      document.dispatchEvent(new CustomEvent('splashComplete'));
      return;
    }

    splash.classList.add('fade-out');
    setTimeout(function () {
      splash.classList.add('hidden');
      document.dispatchEvent(new CustomEvent('splashComplete'));
    }, 750);
  }

  window.skipSplash = function () {
    removeSplash();
  };

  function runSplash() {
    var splash = document.getElementById('splash-screen');
    if (!splash) return;

    var logoContainer = splash.querySelector('.splash-logo-container');

    // Phase 3: Golden Pulse burst at 3.0s
    setTimeout(function () {
      if (logoContainer) logoContainer.classList.add('pulse');
    }, 3000);

    // Phase 4: Dissolve & Reveal website at 3.6s
    setTimeout(function () {
      removeSplash();
    }, 3600);

    // Escape key skips instantly
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') removeSplash();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runSplash);
  } else {
    runSplash();
  }
})();
