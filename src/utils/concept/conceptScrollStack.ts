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

      const st = ScrollTrigger.create({
        trigger: container,
        start: `top+=${index * 22.5}% center`,
        end: 'bottom bottom',
        scrub: 0.5,
        markers: false,
        onEnter: () => {
          gsap.to(image, {
            autoAlpha: 1,
            rotation: rotation,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(image, {
            autoAlpha: 0,
            rotation: 0,
            scale: 0.9,
            duration: 0.5,
            ease: 'power2.in',
          });
        },
      });

      scrollTriggers.push(st);
    });
  };

  // Function to force refresh all scroll triggers
  const refreshAllTriggers = () => {
    // First kill existing triggers
    scrollTriggers.forEach((trigger) => trigger.kill());
    scrollTriggers.length = 0;

    // Small delay before recreating to ensure DOM measurements are accurate
    setTimeout(() => {
      createAnimations();
      ScrollTrigger.refresh(true); // true forces a recalculation of all ScrollTriggers
    }, 100);
  };

  // Initialize animations and set up watchers
  const init = () => {
    // Set up intersection observer to detect when container enters/exits viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Container is now visible, refresh triggers to ensure proper positioning
            refreshAllTriggers();
            // We don't need to observe anymore once we've done the initial refresh
            observer.unobserve(container as Element);
          }
        });
      },
      { threshold: 0.1 }
    ); // Trigger when at least 10% of the element is visible

    observer.observe(container as Element);

    // Add scroll event listener with throttling
    let scrollTimeout: number | undefined;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      // Check if scroll position has changed significantly
      if (Math.abs(window.scrollY - lastScrollY) > 100) {
        lastScrollY = window.scrollY;

        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        scrollTimeout = window.setTimeout(() => {
          // Only refresh if container is near viewport
          const rect = (container as Element).getBoundingClientRect();
          const isNearViewport =
            rect.top < window.innerHeight * 1.5 && rect.bottom > -window.innerHeight * 0.5;

          if (isNearViewport) {
            ScrollTrigger.refresh();
          }
        }, 200);
      }
    });

    // Add resize event listener
    let resizeTimeout: number | undefined;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        refreshAllTriggers();
      }, 200);
    });

    // Refresh on page load complete
    window.addEventListener('load', refreshAllTriggers);

    // Also refresh when all images are loaded
    Promise.all(
      Array.from(images).map((img) => {
        return new Promise((resolve) => {
          const imgElement = img as HTMLImageElement;
          if (imgElement.complete) {
            resolve(null);
          } else {
            imgElement.addEventListener('load', () => resolve(null));
            imgElement.addEventListener('error', () => resolve(null));
          }
        });
      })
    ).then(() => {
      refreshAllTriggers();
    });

    // Initial creation of animations
    createAnimations();
  };

  // Start everything
  init();
};
