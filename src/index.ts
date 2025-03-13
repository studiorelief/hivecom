import './index.css';

import { navbarHoverButton, navbarHoverLink } from '$utils/component/navbarHover';
import { svgComponent } from '$utils/global/tricks';
// import { heroPastilleHover } from '$utils/home/homeHero';

window.Webflow ||= [];
window.Webflow.push(() => {
  // icons in component
  svgComponent();

  // navbar hover
  navbarHoverLink();
  navbarHoverButton();

  // hero pastille hover
  //   heroPastilleHover();
});
