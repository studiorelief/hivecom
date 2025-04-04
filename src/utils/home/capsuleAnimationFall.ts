import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initCapsuleAnimationFall = () => {
  const capsules = document.querySelectorAll('.home_concept_capsule');

  capsules.forEach((capsule, index) => {
    // Définir des rotations différentes selon la classe
    let initialRotation = 0;
    if (capsule.classList.contains('is-1')) {
      initialRotation = 25;
    } else if (capsule.classList.contains('is-2')) {
      initialRotation = -30;
    } else if (capsule.classList.contains('is-3')) {
      initialRotation = 20;
    }

    gsap.set(capsule, {
      opacity: 0,
      y: -300,
      rotation: initialRotation,
      transformOrigin: 'center center',
    });

    // Animation de chute brutale
    const tl = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: capsule,
        start: 'top 70%',
        toggleActions: 'play none none reset',
      },
    });

    tl.to(capsule, {
      opacity: 1,
      duration: 0.5,
    })
      .to(capsule, {
        y: 0,
        duration: 0.8,
        ease: 'bounce.out',
        delay: index * 0.15,
      })
      .to(
        capsule,
        {
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        },
        '-=0.3'
      );
  });
};
