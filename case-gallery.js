document.querySelectorAll('.design-showcase').forEach((showcase) => {
  const tabs = [...showcase.querySelectorAll('.design-tab')];
  const panel = showcase.querySelector('[role="tabpanel"]');
  const imageFrame = showcase.querySelector('.design-image-frame');
  const title = showcase.querySelector('.design-copy h3');
  const description = showcase.querySelector('.design-copy > p:not(.case-label)');
  const label = showcase.querySelector('.design-copy .case-label');

  const wireCarousel = (carousel) => {
    if (!carousel) return;

    const sources = carousel.dataset.images.split('|');
    const image = carousel.querySelector('.workflow-image');
    const previous = carousel.querySelector('.workflow-prev');
    const next = carousel.querySelector('.workflow-next');
    let index = 0;
    const updateButtons = () => {
      previous.disabled = index === 0;
      next.disabled = index === sources.length - 1;
    };
    const move = (direction) => {
      index += direction;
      image.classList.add('is-fading');
      window.setTimeout(() => {
        image.src = sources[index];
        image.alt = `流程配置界面 ${index + 1}`;
        image.classList.remove('is-fading');
      }, 120);
      updateButtons();
    };

    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    updateButtons();
  };

  const showImages = (tab) => {
    const sources = tab.dataset.images ? tab.dataset.images.split('|') : [tab.dataset.image];

    imageFrame.classList.add('is-fading');
    window.setTimeout(() => {
      imageFrame.classList.toggle('has-gallery', sources.length > 1);
      imageFrame.innerHTML = sources.length > 1
        ? `<div class="workflow-carousel" data-images="${sources.join('|')}"><button class="workflow-nav workflow-prev" type="button" aria-label="查看上一张${tab.textContent}界面" disabled>‹</button><img class="design-image workflow-image" src="${sources[0]}" alt="${tab.dataset.alt} 1" /><button class="workflow-nav workflow-next" type="button" aria-label="查看下一张${tab.textContent}界面">›</button></div>`
        : `<img class="design-image" src="${sources[0]}" alt="${tab.dataset.alt}" />`;
      wireCarousel(imageFrame.querySelector('.workflow-carousel'));
      imageFrame.classList.remove('is-fading');
    }, 140);
  };

  const selectTab = (tab) => {
    if (tab.classList.contains('is-active')) return;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });

    showImages(tab);
    window.setTimeout(() => {
      title.textContent = tab.dataset.title;
      description.textContent = tab.dataset.description;
      label.textContent = `0${tabs.indexOf(tab) + 1} / ${tab.textContent}`;
      panel.setAttribute('aria-labelledby', tab.id);
    }, 140);
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => selectTab(tab)));
  wireCarousel(imageFrame.querySelector('.workflow-carousel'));
});

document.querySelectorAll('.darl-gallery').forEach((gallery) => {
  const sources = gallery.dataset.images.split('|');
  const image = gallery.querySelector('.darl-gallery-image');
  const previous = gallery.querySelector('.darl-gallery-prev');
  const next = gallery.querySelector('.darl-gallery-next');
  const count = gallery.querySelector('.darl-gallery-count span');
  let index = 0;

  const update = () => {
    previous.disabled = index === 0;
    next.disabled = index === sources.length - 1;
    count.textContent = String(index + 1).padStart(2, '0');
  };
  const move = (direction) => {
    index += direction;
    image.classList.add('is-fading');
    window.setTimeout(() => {
      image.src = sources[index];
      image.alt = `DARL 工业元宇宙界面 ${index + 1}`;
      image.classList.remove('is-fading');
    }, 150);
    update();
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  update();
});
