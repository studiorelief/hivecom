import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up a GSAP ScrollTrigger animation for the concept process line
 */
export function processLine() {
  // Create the scroll trigger animation
  gsap
    .timeline({
      scrollTrigger: {
        markers: false,
        trigger: '.concept_process_content',
        start: 'top 65%', // Start when the top of the element hits the middle of the viewport
        end: 'bottom 65%', // End when the bottom of the element hits the middle of the viewport
        scrub: true,
      },
    })
    .fromTo(
      '.concept_process_line-active',
      { height: '2.5rem' }, // Starting state
      { height: '100%', ease: 'none' } // Ending state
    );
}
