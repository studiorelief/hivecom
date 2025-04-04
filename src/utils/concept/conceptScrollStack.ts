import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const conceptPicturesStackAnimation = (): void => {
  const container = document.querySelector('.section_concept_pictures');
  const images = document.querySelectorAll(
    '.concept_pictures_assets-wrapper .concept_pictures_assets'
  );

  if (!container || images.length === 0) return;

  // Hide all images initially
  gsap.set(images, { autoAlpha: 0, rotation: 0, scale: 0.9 });

  // Define different rotation values for each image
  const rotations = [-5, 3, -2, 4, -3];

  // Create ScrollTrigger instances array to manage them
  const scrollTriggers: ScrollTrigger[] = [];

  // Function to create animations
  const createAnimations = () => {
    // Clear any existing ScrollTrigger instances
    scrollTriggers.forEach((trigger) => trigger.kill());
    scrollTriggers.length = 0;

    // Create the animation for each image
    images.forEach((image, index) => {
      const rotation = rotations[index % rotations.length];

      gsap.to(image, {
        scrollTrigger: {
          trigger: container,
          start: `top+=${index * 22.5}% center`,
          end: 'bottom bottom',
          scrub: 0.5,
          markers: false,
          onRefresh: (self) => {
            // Store the ScrollTrigger instance for later cleanup
            scrollTriggers.push(self);
          },
        },
        autoAlpha: 1,
        rotation: rotation,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        delay: index * 0.2,
      });
    });
  };

  // Initial creation of animations
  createAnimations();

  // Add resize event listener to recreate animations on window resize
  // Add resize event listener to recreate animations on window resize
  let resizeTimeout: number | undefined;
  window.addEventListener('resize', () => {
    // Debounce the resize event to avoid excessive recalculations
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      createAnimations();
    }, 250);
  });
};
