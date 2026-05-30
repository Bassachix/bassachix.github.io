// ============================
// Creative Hub — Main Entry Point
// ============================

import { initNavigation } from './modules/navigation.js?v=59';
import { initAnimations } from './modules/animations.js?v=59';
import { initFilters } from './modules/filters.js?v=59';
import { initParticles } from './modules/particles.js?v=59';
import { initPreloader } from './modules/preloader.js?v=59';
import { initTime } from './modules/time.js?v=59';
import { initLightbox } from './modules/lightbox.js?v=59';
import { initAudio } from './modules/audio.js?v=59';
import { initEasterEgg } from './modules/easterEgg.js?v=64';
import { initMeta } from './modules/meta.js?v=59';
import { initContextMenu } from './modules/contextMenu.js?v=59';
import { initI18n } from './modules/i18n.js?v=59';

// Preloader initializes itself immediately to hook into window.onload
initPreloader();

function initApp() {
  // Initialize dynamic copyright year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Initialize all modules
  initParticles();
  initNavigation();
  initAnimations();
  initFilters();
  initTime();
  initLightbox();
  initAudio();
  initEasterEgg();
  initMeta();
  initContextMenu();
  initI18n();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
