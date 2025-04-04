import './index.css';

import { initBeeLineAnimation } from '$utils/component/beeLine';
import { buttonSvgHoverEffect } from '$utils/component/button';
import { navbarHoverButton, navbarHoverLink, navbarScrollHeight } from '$utils/component/navbar';
import { portfolioCardToggle, swiperPortfolio } from '$utils/component/portfolioSwiper';
import { preloaderHivecom } from '$utils/component/preloader';
import { stickyButton } from '$utils/component/stickyButton';
import { textFollowLine } from '$utils/component/textLine';
import { conceptCards } from '$utils/concept/conceptCards';
import { conceptExperts, expertsFilter } from '$utils/concept/conceptExperts';
import { conceptPicturesStackAnimation } from '$utils/concept/conceptScrollStack';
import { processLine } from '$utils/concept/process';
import loadScript from '$utils/global/loadScript';
import { initMarker } from '$utils/global/marker';
import { svgComponent } from '$utils/global/tricks';
import { initCapsuleAnimationFall } from '$utils/home/capsuleAnimationFall';

window.Webflow ||= [];
window.Webflow.push(() => {
  // scripts
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'),

    loadScript(
      'https://cdn.jsdelivr.net/gh/videsigns/webflow-tools@latest/Media%20Player/flowplayplus.js'
    ),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-selectcustom@1/selectcustom.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js'),
    loadScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js'),
  ]);

  if (window.location.pathname.includes('/contact')) {
    loadScript('https://cdn.jsdelivr.net/gh/videsigns/webflow-tools@latest/multi-step.js');
  }

  /* 
  ! Global 
  */

  //recettage
  initMarker();

  // preloader
  preloaderHivecom();

  // navbar
  navbarHoverLink();
  navbarHoverButton();
  navbarScrollHeight();

  // icons in component
  svgComponent();

  // sticky buttons
  stickyButton();

  // button SVG hover effect
  buttonSvgHoverEffect();

  // portfolio
  swiperPortfolio();
  portfolioCardToggle();

  // text following SVG path
  textFollowLine();

  // bee line
  initBeeLineAnimation();

  /* 
  ! Concept
  */
  processLine();
  conceptExperts();
  expertsFilter();
  conceptCards();
  conceptPicturesStackAnimation();
  initCapsuleAnimationFall();
});
