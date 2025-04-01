import './index.css';

import { initBeeLineAnimation } from '$utils/component/beeLine';
import { navbarHoverButton, navbarHoverLink, navbarScrollHeight } from '$utils/component/navbar';
import { portfolioCardToggle, swiperPortfolio } from '$utils/component/portfolioSwiper';
import { preloaderHivecom } from '$utils/component/preloader';
import { stickyButton } from '$utils/component/stickyButton';
import { textFollowLine } from '$utils/component/textLine';
import { conceptExperts, expertsFilter } from '$utils/concept/conceptExperts';
import { processLine } from '$utils/concept/process';
import loadScript from '$utils/global/loadScript';
import { svgComponent } from '$utils/global/tricks';
import { initCapsuleAnimation } from '$utils/home/capsuleAnimation';

window.Webflow ||= [];
window.Webflow.push(() => {
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),
    loadScript('https://cdn.jsdelivr.net/gh/videsigns/webflow-tools@latest/multi-step.js'),
    loadScript(
      'https://cdn.jsdelivr.net/gh/videsigns/webflow-tools@latest/Media%20Player/flowplayplus.js'
    ),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-selectcustom@1/selectcustom.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js'),
  ]);

  // icons in component
  svgComponent();

  // preloader
  preloaderHivecom();

  // portfolio
  swiperPortfolio();
  portfolioCardToggle();

  // navbar
  navbarHoverLink();
  navbarHoverButton();
  if (window.innerWidth > 991) {
    navbarScrollHeight();
  }

  // sticky buttons
  stickyButton();

  // text following SVG path
  textFollowLine();

  // bee line
  initBeeLineAnimation();

  // concept
  processLine();
  conceptExperts();
  expertsFilter();
  initCapsuleAnimation();
});
