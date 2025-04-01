import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initCapsuleAnimation = () => {
  const capsules = document.querySelectorAll('.home_concept_capsule');

  capsules.forEach((capsule, index) => {
    // Définir des rotations différentes selon la classe
    let initialRotation = 0;
    if (capsule.classList.contains('is-1')) {
      initialRotation = 15;
    } else if (capsule.classList.contains('is-2')) {
      initialRotation = -20;
    } else if (capsule.classList.contains('is-3')) {
      initialRotation = 10;
    }

    gsap.set(capsule, {
      opacity: 0,
      y: -50,
      rotation: initialRotation,
      transformOrigin: 'center center',
    });

    gsap.to(capsule, {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 1,
      delay: index * 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: capsule,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
};
