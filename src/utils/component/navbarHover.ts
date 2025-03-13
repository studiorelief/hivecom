import gsap from 'gsap';

// Utility function to create hover animations for different elements
function createHoverAnimation(config: {
  elementSelector: string;
  hoverSelector: string;
  textSelector: string;
}) {
  const { elementSelector, hoverSelector, textSelector } = config;

  const elements = document.querySelectorAll(elementSelector);

  elements.forEach((element) => {
    const hover = element.querySelector(hoverSelector);
    const text = element.querySelector(textSelector);

    // Skip if required elements aren't found
    if (!hover || !text) return;

    // Create enter animation timeline
    const enterTl = gsap.timeline({ paused: true });
    enterTl
      .to(hover, { y: '0%', duration: 0.8, ease: 'bounce.out' }, 0)
      .to(hover, { opacity: 1, duration: 0.15, ease: 'ease.out' }, 0)
      .to(text, { y: '4rem', opacity: 0, duration: 0.3, ease: 'ease.out' }, 0);

    // Create leave animation timeline
    const leaveTl = gsap.timeline({ paused: true });
    leaveTl
      .to(hover, { y: '-100%', duration: 0.3, ease: 'ease.out' }, 0)
      .to(hover, { opacity: 0, duration: 0.3, ease: 'ease.out' }, 0)
      .to(text, { y: '0', opacity: 1, duration: 0.8, ease: 'bounce.out' }, 0);

    // Add event listeners
    element.addEventListener('mouseenter', () => {
      leaveTl.pause();
      enterTl.restart();
    });

    element.addEventListener('mouseleave', () => {
      enterTl.pause();
      leaveTl.restart();
    });
  });
}

// Main export function that handles all hover animations
export function initHoverAnimations() {
  // Navbar links hover animation
  createHoverAnimation({
    elementSelector: '.navbar_link',
    hoverSelector: '.navbar_hover',
    textSelector: '.navbar_text',
  });

  // Special buttons hover animation
  createHoverAnimation({
    elementSelector: '.button.is-special-navbar',
    hoverSelector: '.button_special-hover',
    textSelector: '.button_special-text',
  });
}

// Individual exports for backward compatibility or separate initialization
export function navbarHoverLink() {
  createHoverAnimation({
    elementSelector: '.navbar_link',
    hoverSelector: '.navbar_hover',
    textSelector: '.navbar_text',
  });
}

export function navbarHoverButton() {
  createHoverAnimation({
    elementSelector: '.button.is-special-navbar',
    hoverSelector: '.button_special-hover',
    textSelector: '.button_special-text',
  });
}
