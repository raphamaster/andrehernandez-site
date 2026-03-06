const setCurrentYear = () => {
  const yearEl = document.getElementById('ano');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

const initPhotoFallback = () => {
  const foto = document.getElementById('foto-andre');
  const placeholder = document.getElementById('foto-placeholder');
  if (!foto || !placeholder) return;

  const showPlaceholder = () => {
    foto.classList.add('hidden');
    placeholder.classList.remove('hidden');
  };

  foto.addEventListener('error', showPlaceholder);
  if (foto.complete && foto.naturalWidth === 0) {
    showPlaceholder();
  }
};

const initTestimonialsCarousel = () => {
  const viewport = document.getElementById('depoimentos-viewport');
  const track = document.getElementById('depoimentos-track');
  const currentEl = document.getElementById('depoimentos-current');
  const totalEl = document.getElementById('depoimentos-total');

  if (!viewport || !track || track.children.length === 0) return;

  const slides = track.children.length;
  let pageIndex = 0;
  let viewportWidth = viewport.offsetWidth;

  const updateSlide = () => {
    track.style.transform = `translateX(-${pageIndex * viewportWidth}px)`;
    if (currentEl) currentEl.textContent = String(pageIndex + 1);
    if (totalEl) totalEl.textContent = String(slides);
  };

  window.addEventListener('resize', () => {
    viewportWidth = viewport.offsetWidth;
    updateSlide();
  });

  document.querySelectorAll('[data-carousel]').forEach((button) => {
    button.addEventListener('click', () => {
      const dir = button.getAttribute('data-carousel');
      if (dir === 'next') {
        pageIndex = (pageIndex + 1) % slides;
      } else if (dir === 'prev') {
        pageIndex = (pageIndex - 1 + slides) % slides;
      }
      updateSlide();
    });
  });

  updateSlide();
};

window.addEventListener('DOMContentLoaded', () => {
  setCurrentYear();
  initPhotoFallback();
  initTestimonialsCarousel();
});
