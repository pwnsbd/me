/* =========================================================
   GALLERY.JS — Lightbox for photography page
   ========================================================= */

const images = [
  { src: './assets/stanford_sunset.png',    caption: 'Stanford Sunset' },
  { src: './assets/sf_evening_sunset_2.jpg', caption: 'SF Evening'      },
  { src: './assets/yosemite_22.jpg',         caption: 'Yosemite 2022'   }
];

let currentIndex = 0;

const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src         = images[index].src;
  lightboxImg.alt         = images[index].caption;
  lightboxCaption.textContent = images[index].caption;

  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('is-open');

  // iOS-safe scroll lock
  document.body.style.position = 'fixed';
  document.body.style.width    = '100%';

  requestAnimationFrame(() => {
    lightbox.classList.add('is-visible');
  });
}

function closeLightbox() {
  lightbox.classList.remove('is-visible');

  lightbox.addEventListener('transitionend', () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.position = '';
    document.body.style.width    = '';
  }, { once: true });
}

function navigate(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  lightboxImg.src             = images[currentIndex].src;
  lightboxImg.alt             = images[currentIndex].caption;
  lightboxCaption.textContent = images[currentIndex].caption;
}

// Wire gallery items — each item has data-index attribute
document.querySelectorAll('.gallery-item').forEach((item) => {
  const index = parseInt(item.getAttribute('data-index'), 10);
  item.addEventListener('click', () => openLightbox(index));
});

// Controls
document.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox__prev').addEventListener('click', () => navigate(-1));
document.querySelector('.lightbox__next').addEventListener('click', () => navigate(1));

// Click backdrop to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   navigate(-1);
  if (e.key === 'ArrowRight')  navigate(1);
});
