/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Gallery + Lightbox
   Fetches images from API, renders 3x2 grid.
   "All photos >" button opens fullscreen lightbox.
═══════════════════════════════════════════════════════ */

let allGalleryImages = [];

function getCaption(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  return (lang === 'th' ? item.CAPTION_TH : item.CAPTION_EN) || item.CAPTION_TH || '';
}

function buildGalleryItem(item) {
  const el = document.createElement('div');
  el.className = 'gallery__item';

  if (item.IMAGE_URL) {
    const img = document.createElement('img');
    img.src = item.IMAGE_URL;
    img.alt = getCaption(item);
    img.className = 'img-cover';
    img.loading = 'lazy';
    el.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'img-placeholder img-placeholder--gallery';
    ph.innerHTML = `<span>${getCaption(item)}</span>`;
    el.appendChild(ph);
  }

  el.style.cursor = 'pointer';
  el.addEventListener('click', () => openLightbox(allGalleryImages.indexOf(item)));
  return el;
}

function buildPopupGrid(images) {
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  const grid = popup.querySelector('.gallery__popup-grid');
  if (!grid) return;
  grid.innerHTML = '';
  images.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'gallery__popup-item';
    if (item.IMAGE_URL) {
      const img = document.createElement('img');
      img.src = item.IMAGE_URL;
      img.alt = getCaption(item);
      img.className = 'img-cover';
      img.loading = 'lazy';
      el.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'img-placeholder img-placeholder--popup';
      ph.innerHTML = `<span>${getCaption(item)}</span>`;
      el.appendChild(ph);
    }
    grid.appendChild(el);
  });
}

function openLightbox(startIndex) {
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  buildPopupGrid(allGalleryImages);
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function initGallery() {
  const grid = document.querySelector('.gallery__grid');
  if (!grid) return;

  const images = await fetchGallery();
  if (!images || images.length === 0) return;

  allGalleryImages = images;

  grid.innerHTML = '';
  images.slice(0, 6).forEach(item => {
    grid.appendChild(buildGalleryItem(item));
  });

  const popup = document.getElementById('gallery-popup');
  if (popup) {
    const overlay = popup.querySelector('.gallery__popup-overlay');
    const closeBtn = popup.querySelector('.gallery__popup-close');
    if (overlay) overlay.addEventListener('click', closeLightbox);
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    popup.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  const allBtn = document.querySelector('.gallery__all-btn');
  if (allBtn) allBtn.addEventListener('click', () => openLightbox(0));
}

document.addEventListener('DOMContentLoaded', initGallery);
