import gsap from 'gsap';

export function stickyButton() {
  const stickyButtons = document.querySelectorAll('.sticky-button_component');

  stickyButtons.forEach((button) => {
    // Create the vibration animation but don't play it yet
    const vibrationAnimation = gsap
      .timeline({ paused: true })
      .to(button, {
        x: 4,
        duration: 0.04,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: -4,
        duration: 0.04,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: 3,
        duration: 0.04,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: -3,
        duration: 0.04,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: 2,
        duration: 0.03,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: -2,
        duration: 0.03,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: 1,
        duration: 0.02,
        ease: 'power2.inOut',
      })
      .to(button, {
        x: 0,
        duration: 0.01,
        ease: 'power2.inOut',
      });

    // Add a slight scale effect for more impact
    const hoverEffect = gsap.timeline({ paused: true }).to(button, {
      scale: 1.05,
      duration: 0.2,
      ease: 'back.out(1.5)',
    });

    // Play the vibration animation on hover
    button.addEventListener('mouseenter', () => {
      vibrationAnimation.restart();
      hoverEffect.play();
    });

    button.addEventListener('mouseleave', () => {
      hoverEffect.reverse();
    });
  });
}
