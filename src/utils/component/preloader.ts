import { DotLottie } from '@lottiefiles/dotlottie-web';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

export function preloaderHivecom() {
  // Custom ease pattern for the animation
  const customEase =
    'M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1';

  // Initialize counter and duration
  const counter = {
    value: 0,
  };
  const loaderDuration = 5;

  // Check for previous visits in this session
  if (sessionStorage.getItem('visited') !== null) {
    // Skip preloader entirely if already visited
    const preloaderComponent = document.querySelector('.preloader_component');
    if (preloaderComponent) {
      (preloaderComponent as HTMLElement).style.display = 'none';
    }
    // Return early to prevent the rest of the preloader code from executing
    return;
  }

  // Set initial display to flex for first-time visitors
  const preloaderComponent = document.querySelector('.preloader_component');
  if (preloaderComponent) {
    (preloaderComponent as HTMLElement).style.display = 'flex';
  }

  sessionStorage.setItem('visited', 'true');

  // Initialize the Lottie animation
  const lottieCanvas = document.querySelector('#dotlottie-canvas');
  if (lottieCanvas) {
    new DotLottie({
      autoplay: true,
      loop: true,
      canvas: lottieCanvas as HTMLCanvasElement,
      src: 'https://lottie.host/b9a6a533-09f9-4f12-8219-782f9c749603/qphYzkbz3K.json',
    });
  }

  // Helper functions
  const updateLoaderText = () => {
    const progress = Math.round(counter.value);
    const loaderNumber = document.querySelector('.preloader_number');
    if (loaderNumber) {
      loaderNumber.textContent = progress.toString();
    }
  };

  const endLoaderAnimation = () => {
    // Create a fade-out animation for the preloader
    const preloaderNumber = document.querySelector('.preloader_number');
    const preloaderComponent = document.querySelector('.preloader_component');

    // Animate the number moving down and fading out
    gsap.to(preloaderNumber, {
      y: 4 * 16,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    // Fade out the entire preloader component
    gsap.to(preloaderComponent, {
      opacity: 0,
      duration: 0.5,
      delay: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        // Set display none after fade completes
        if (preloaderComponent) {
          (preloaderComponent as HTMLElement).style.display = 'none';
        }
      },
    });
  };

  // Create and configure the GSAP timeline
  const tl = gsap.timeline({
    onComplete: endLoaderAnimation,
  });

  // Add animations to the timeline
  tl.to(counter, {
    value: 100,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: CustomEase.create('custom', customEase),
  });

  tl.to(
    '.preloader_progress',
    {
      width: '100%',
      duration: loaderDuration,
      ease: CustomEase.create('custom', customEase),
    },
    0
  );

  // Return the timeline in case we need to control it externally
  return tl;
}
