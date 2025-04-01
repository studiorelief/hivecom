import 'swiper/css';

import { Swiper } from 'swiper/bundle';
// import { Autoplay, Mousewheel } from 'swiper/modules';

export function swiperPortfolio() {
  const swiperContainers = document.querySelectorAll('.swiper.is-portfolio');

  swiperContainers.forEach((container) => {
    new Swiper(container as HTMLElement, {
      //   modules: [Autoplay, Mousewheel],
      direction: 'horizontal',
      loop: false,
      spaceBetween: 1.875 * 16,
      //   freeMode: true,
      mousewheel: {
        forceToAxis: true,
      },
      //   cssMode: true,
      breakpoints: {
        320: {
          slidesPerView: 'auto',
        },
        768: {
          slidesPerView: 'auto',
        },
        992: {
          slidesPerView: 'auto',
        },
      },
      navigation: {
        nextEl: '.swiper-right',
        prevEl: '.swiper-left',
      },
      on: {
        init: function () {
          // Activate the first slide's portfolio card on initialization
          const firstSlide = container.querySelector('.swiper-slide:first-child');
          if (firstSlide) {
            const button = firstSlide.querySelector('.portfolio_cards_button');
            const portfolioCard = firstSlide.querySelector('.portfolio_cards');

            if (button) {
              button.classList.add('is-active');
            }

            if (portfolioCard) {
              const contentElement = portfolioCard.querySelector('.portfolio_cards_content');
              if (contentElement) {
                contentElement.classList.remove('is-active');
              }
            }
          }
        },
      },
    });
  });
}

export function portfolioCardToggle() {
  const portfolioCardButtons = document.querySelectorAll('.portfolio_cards_button');

  portfolioCardButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
      // Find the parent card element
      const portfolioCard = button.closest('.portfolio_cards');

      // Find the content element within the card and toggle the is-active class
      if (portfolioCard) {
        const contentElement = portfolioCard.querySelector('.portfolio_cards_content');
        if (contentElement) {
          contentElement.classList.toggle('is-active');
        }
      }

      // Trouver l'instance Swiper parent et mettre à jour sa taille
      const swiperContainer = button.closest('.swiper');
      if (swiperContainer) {
        // Access the Swiper instance using the Swiper API
        const swiperInstance = (swiperContainer as HTMLElement & { swiper: Swiper }).swiper;
        if (swiperInstance) {
          setTimeout(() => {
            swiperInstance.updateSize();
            swiperInstance.updateSlides();
          }, 300); // Petit délai pour laisser le temps à l'animation de se terminer
        }
      }
    });
  });
}
