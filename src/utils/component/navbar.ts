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

// Function to handle navbar height change on scroll
export function navbarScrollHeight() {
  const navbarContainer = document.querySelector('.navbar_container');

  if (!navbarContainer) return;

  // Using GSAP to animate the navbar height when scrolling
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const navbarLogo = document.querySelector('.navbar_logo-link');
    const navbarComponent = document.querySelector('.navbar_component');

    if (scrollPosition > 25 * 16) {
      // When scrolled more than 50rem, shrink the navbar
      gsap.to(navbarContainer, {
        maxWidth: 'var(--site-container--small)',
        padding: 'var(--_responsive---margin--padding--spacer--gap--small)',
        borderRadius: 'var(--radius--xmedium)',
        duration: 0.3,
        ease: 'power2.out',
      });

      if (navbarLogo) {
        gsap.to(navbarLogo, {
          height: '2rem',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (navbarComponent) {
        gsap.to(navbarComponent, {
          marginTop: '0rem',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    } else {
      // Reset to original width when back to top
      gsap.to(navbarContainer, {
        maxWidth: 'var(--site-container--large)', // Using width instead of maxWidth
        padding:
          'var(--_responsive---margin--padding--spacer--gap--large) var(--_responsive---margin--padding--spacer--gap--large) var(--_responsive---margin--padding--spacer--gap--large) var(--_responsive---margin--padding--spacer--gap--xxlarge)',
        borderRadius: 'var(--radius--xxlarge)',
        duration: 0.3,
        ease: 'power2.out',
      });

      if (navbarLogo) {
        gsap.to(navbarLogo, {
          height: '3rem',
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (navbarComponent) {
        gsap.to(navbarComponent, {
          marginTop: 'var(--_responsive---margin--padding--spacer--gap--small)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  };

  // Add scroll event listener with throttling to improve performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check in case page loads already scrolled
  handleScroll();
}
