export function conceptExperts() {
  const expertsCardButtons = document.querySelectorAll('.concept_experts_cards_card-button');

  // Add document click event listener to close cards when clicking outside
  document.addEventListener('click', (event) => {
    const target = event.target as Element;
    const isClickInsideCard = target.closest('.concept_experts_cards_card-content');
    const isClickOnButton = target.closest('.concept_experts_cards_card-button');

    if (!isClickInsideCard && !isClickOnButton) {
      // Close all active cards
      const allContentElements = document.querySelectorAll(
        '.concept_experts_cards_card-content.is-active'
      );
      const allButtons = document.querySelectorAll('.concept_experts_cards_card-button.is-active');

      allContentElements.forEach((content) => {
        content.classList.remove('is-active');
      });

      allButtons.forEach((btn) => {
        btn.classList.remove('is-active');
      });
    }
  });

  expertsCardButtons.forEach((button: Element) => {
    button.addEventListener('click', () => {
      button.classList.toggle('is-active');
      // Find the parent card element
      const expertsCard = button.closest('.concept_experts_cards');

      // Find the content element within the card and toggle the is-active class
      if (expertsCard) {
        const contentElement = expertsCard.querySelector('.concept_experts_cards_card-content');
        if (contentElement) {
          contentElement.classList.toggle('is-active');
        }

        // Close other open cards when clicking on a card
        const allContentElements = document.querySelectorAll(
          '.concept_experts_cards_card-content.is-active'
        );
        const allButtons = document.querySelectorAll(
          '.concept_experts_cards_card-button.is-active'
        );

        allContentElements.forEach((content) => {
          if (content !== contentElement && content.classList.contains('is-active')) {
            content.classList.remove('is-active');
          }
        });

        allButtons.forEach((btn) => {
          if (btn !== button && btn.classList.contains('is-active')) {
            btn.classList.remove('is-active');
          }
        });
      }
    });
  });
}

// Catégorie - Statuts
export function expertsFilter() {
  const catalogueCatAll = document.querySelector('.concept_experts_filter_button-all');
  const catalogueCatFilters = document.querySelectorAll('.concept_experts_filter_button-checkbox');

  catalogueCatFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      if (catalogueCatAll) {
        catalogueCatAll.classList.remove('is-active');
      }
    });
  });

  catalogueCatAll?.addEventListener('click', () => {
    catalogueCatAll.classList.add('is-active');
  });

  const catalogueCatAllField = document.querySelector('.concept_experts_filter_button-all');

  // Check if no filter has 'is-active' class
  const checkNoActiveFilter = () => {
    const activeFilters = document.querySelectorAll(
      '.concept_experts_filter_button-checkbox.fs-cmsfilter_active.is-active-inputactive'
    );
    if (activeFilters.length === 0 && catalogueCatAllField) {
      catalogueCatAllField.classList.add('is-active');
    }
  };

  // Add event listener to each filter
  catalogueCatFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      setTimeout(checkNoActiveFilter, 0);
    });
  });

  // Initial check
  checkNoActiveFilter();
}
