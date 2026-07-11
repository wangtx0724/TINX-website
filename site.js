document.querySelectorAll('.case-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (window.matchMedia('(hover: hover)').matches || card.classList.contains('is-open')) return;
    event.preventDefault();
    document.querySelectorAll('.case-card.is-open').forEach((item) => item.classList.remove('is-open'));
    card.classList.add('is-open');
  });
});
