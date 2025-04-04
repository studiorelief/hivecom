import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

/**
 * Creates an animation for concept cards that appear from bottom to top with a bounce effect
 * Similar to reference animation where cards linger in the center before moving out
 * Only activates on desktop screens (>991px)
 */
export function conceptCards() {
  // Store animation context references
  const ctx = {
    pinHeight: null as HTMLElement | null,
    scrollTrigger: null as ScrollTrigger | null,
    timeline: null as gsap.core.Timeline | null,
    isDesktop: window.innerWidth > 991,
  };

  // Function to initialize the animation
  const initAnimation = () => {
    const cardsContainer = document.querySelector('.section_concept_avantages');
    const cards = document.querySelectorAll('.concept_avantages_cards');

    if (!cardsContainer || cards.length === 0) return;

    // Create a container for pinning if it doesn't exist
    const pinHeight = document.createElement('div');
    pinHeight.className = 'concept_avantages_pin-height';
    cardsContainer.parentNode?.insertBefore(pinHeight, cardsContainer);
    pinHeight.appendChild(cardsContainer);
    ctx.pinHeight = pinHeight;

    // Set the pin-height to be tall enough for the animation
    gsap.set(pinHeight, {
      height: '300vh', // You can adjust this value as needed for your scroll distance
    });

    if (ctx.isDesktop) {
      gsap.set('.section_concept_process', {
        marginTop: '-75vh',
      });
    } else {
      gsap.set('.section_concept_process', {
        marginTop: '0rem',
      });
    }

    // Add resize listener to update margin when screen size changes
    window.addEventListener('resize', () => {
      const isDesktop = window.innerWidth > 991;
      if (isDesktop) {
        gsap.set('.section_concept_process', {
          marginTop: '-75vh',
        });
      } else {
        gsap.set('.section_concept_process', {
          marginTop: '0rem',
        });
      }
    });

    // Set initial position of cards - move them below the viewport
    gsap.set(cards, {
      yPercent: 50,
      y: 0.5 * window.innerHeight,
      opacity: 1,
    });

    // Pin the container during scroll
    ctx.scrollTrigger = ScrollTrigger.create({
      trigger: pinHeight,
      markers: false,
      start: 'top top',
      end: 'bottom bottom',
      pin: cardsContainer,
      pinSpacing: false,
      scrub: true,
    });

    // Create custom ease for the bouncing effect
    const customBounceEase = CustomEase.create(
      'custom',
      'M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1'
    );

    // Create the animation timeline
    ctx.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: pinHeight,
        start: 'top 100%',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // Animate each card
    ctx.timeline
      .to(
        cards,
        {
          yPercent: -50,
          y: -0.5 * window.innerHeight,
          opacity: 1,
          duration: 1,
          stagger: 0.12, // Offset each card's animation start for a wave effect
          ease: customBounceEase,
        },
        'step'
      )
      // Add rotation on the way up
      .to(
        cards,
        {
          rotation: () => (Math.random() - 0.5) * 20, // Random rotation between -10 and 10 degrees
          stagger: 0.12,
          duration: 0.5,
          ease: 'power3.out',
        },
        'step'
      )
      // Animate the decorative element to disappear as cards leave
      // First make the decorative element appear (0% to 30%)
      .fromTo(
        '.concept_avantages_decorative',
        { opacity: 1 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.12,
        },
        'step' // Start at the beginning of the animation
      )
      // Then make it disappear (70% to 100%)
      .to(
        '.concept_avantages_decorative',
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          stagger: 0.12,
        },
        'step+=0.7' // Start at 70% of the animation
      )
      // Straighten cards back as they exit
      .to(
        cards,
        {
          rotation: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power3.in',
        },
        'step+=0.5'
      );
  };

  // Function to clean up and reset animation
  const destroyAnimation = () => {
    // Kill the ScrollTrigger instance
    if (ctx.scrollTrigger) {
      ctx.scrollTrigger.kill();
      ctx.scrollTrigger = null;
    }

    // Kill the timeline
    if (ctx.timeline) {
      ctx.timeline.kill();
      ctx.timeline = null;
    }

    // Remove the pin-height element and restore DOM
    if (ctx.pinHeight) {
      const cardsContainer = ctx.pinHeight.querySelector('.section_concept_avantages');
      if (cardsContainer) {
        // Move the container back to its original position
        ctx.pinHeight.parentNode?.insertBefore(cardsContainer, ctx.pinHeight);
        // Remove the pin-height element
        ctx.pinHeight.parentNode?.removeChild(ctx.pinHeight);
      }
      ctx.pinHeight = null;
    }

    // Reset any card styles
    const cards = document.querySelectorAll('.concept_avantages_cards');
    gsap.set(cards, {
      yPercent: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      clearProps: 'all',
    });

    // Reset decorative elements
    const decoratives = document.querySelectorAll('.concept_avantages_decorative');
    gsap.set(decoratives, {
      opacity: 1,
      scale: 1,
      clearProps: 'all',
    });
  };

  // Function to handle resize events
  const handleResize = () => {
    const isNowDesktop = window.innerWidth > 991;

    // Check if we've changed state between desktop and mobile
    if (isNowDesktop !== ctx.isDesktop) {
      // Update the state
      ctx.isDesktop = isNowDesktop;

      // If we switched to desktop, initialize the animation
      if (isNowDesktop) {
        initAnimation();
      }
      // If we switched to mobile, destroy the animation
      else {
        destroyAnimation();
      }
    }
    // If still in desktop mode, just refresh ScrollTrigger
    else if (isNowDesktop && ctx.scrollTrigger) {
      // Update card positions based on new window size
      const cards = document.querySelectorAll('.concept_avantages_cards');
      gsap.set(cards, {
        y: (i, el) => {
          const yPercentValue = gsap.getProperty(el, 'yPercent') as number;
          return yPercentValue > 0 ? 0.5 * window.innerHeight : -0.5 * window.innerHeight;
        },
      });

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    }
  };

  // Add resize handler
  window.addEventListener('resize', handleResize);

  // Initialize on first load if in desktop mode
  if (ctx.isDesktop) {
    initAnimation();
  }
}
