import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, ScrollTrigger);

export function initBeeLineAnimation(): void {
  // Get the SVG path, bee element and background element
  const decorativePath = document.querySelector('.animation_decorative path') as SVGPathElement;
  const beeElement = document.querySelector('.animation_decorative-bee-position');
  const backgroundElement = document.querySelector('.animation_decorative-background');

  if (!decorativePath || !beeElement || !backgroundElement) return;

  // Create a timeline for the animations
  const tl = gsap.timeline();

  // Reset elements to their initial state to avoid glitches
  gsap.set(decorativePath, { drawSVG: '0%' });
  gsap.set(beeElement, {
    clearProps: 'all',
    x: 0,
    y: 0,
    rotation: 0,
    motionPath: {
      path: decorativePath,
      align: decorativePath,
      autoRotate: true,
      alignOrigin: [0.5, 0.5],
      start: 1,
      end: 1,
    },
  });

  // Create the animation sequence
  const beeLineAnimation = () => {
    tl.to(beeElement, {
      motionPath: {
        path: decorativePath,
        align: decorativePath,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
        start: 1,
        end: 0,
      },
      duration: 4,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(beeElement, {
          rotation: 45,
          duration: 2,
          ease: 'power2.out',
        });
      },
    }).then(() => {
      gsap.to(beeElement, {
        y: '+=5',
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Animate the SVG path drawing from 0 to 100%
    tl.fromTo(
      decorativePath,
      { drawSVG: '0%' },
      {
        drawSVG: '-97.5%',
        duration: 4,
        ease: 'power1.inOut',
      },
      '-=3.8' // Start 0.5s before the previous animation completes
    );
  };

  ScrollTrigger.create({
    markers: false,
    trigger: backgroundElement,
    start: '-50% 80%', // Start when the top of the element hits 80% from the top of viewport
    onEnter: beeLineAnimation,
    once: true, // Trigger only once
  });
}
