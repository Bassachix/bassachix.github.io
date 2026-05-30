export function initFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const creationCards = document.querySelectorAll('.creation-card');

  if (filterTabs.length > 0 && creationCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        creationCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hide');
            // Timeout to allow display:block to apply before animating opacity
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.classList.add('hide');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
          }
        });
      });
    });
  }
}
