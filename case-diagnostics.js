const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.machine-rotation').forEach((video) => {
  if (reducedMotion) video.pause();
});
