import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin);

/**
 * Initializes the button hover effect that draws SVG elements using GSAP's drawSVG
 * This targets buttons with the .button class and animates SVG paths inside elements with the svg="component" attribute
 */
export function buttonSvgHoverEffect(): void {
  // Select all buttons
  const buttons = document.querySelectorAll('.button');

  if (!buttons.length) return;

  buttons.forEach((button) => {
    // Find SVG elements with attribute svg="component" inside the button
    const svgComponents = button.querySelectorAll(
      '[svg="component"] svg path, [svg="component"] path'
    );

    if (!svgComponents.length) return;

    // Set initial state - all paths at 100% (fully visible)
    gsap.set(svgComponents, { drawSVG: '100%' });

    // Store timeline for each button
    const hoverTimeline = gsap.timeline({ paused: true });

    // Animation steps:
    // 1. Quickly set to 0% (invisible)
    // 2. Animate from 0% to 100% (drawing effect)
    hoverTimeline.set(svgComponents, { drawSVG: '0%' }).to(svgComponents, {
      drawSVG: '100%',
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // On hover, play the animation from start
    button.addEventListener('mouseenter', () => {
      // Reset to beginning and play
      hoverTimeline.restart();
    });

    // No need for mouseleave handler - SVG stays at 100% after animation
  });
}
