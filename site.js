document.querySelectorAll('.case-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    if (window.matchMedia('(hover: hover)').matches || card.classList.contains('is-open')) return;
    event.preventDefault();
    document.querySelectorAll('.case-card.is-open').forEach((item) => item.classList.remove('is-open'));
    card.classList.add('is-open');
  });
});

const pageTitle = document.querySelector('#page-title');

if (pageTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lines = [...pageTitle.childNodes]
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent.trim())
    .filter(Boolean);

  if (lines.length) {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        pageTitle.replaceChildren();
        const lineNodes = lines.map((line, index) => {
          const span = document.createElement('span');
          if (index) pageTitle.append(document.createElement('br'));
          pageTitle.append(span);
          return { line, span };
        });
        pageTitle.classList.add('is-typing');

        let lineIndex = 0;
        let characterIndex = 1;
        lineNodes[0].span.textContent = lineNodes[0].line[0];
        const typeNext = () => {
          const current = lineNodes[lineIndex];
          current.span.textContent += current.line[characterIndex++];
          if (characterIndex < current.line.length) {
            window.setTimeout(typeNext, 72);
          } else if (++lineIndex < lineNodes.length) {
            characterIndex = 0;
            window.setTimeout(typeNext, 170);
          } else {
            pageTitle.classList.remove('is-typing');
          }
        };

        window.setTimeout(typeNext, 72);
      });
    }, 180);
  }
}
