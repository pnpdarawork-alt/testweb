/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Gallery + Lightbox
   API fields: IMAGE_URL, ALT_TH, ALT_EN, ORDER, STATUS
   Renders 3×2 grid; "All Photos >" opens fullscreen lightbox.
═══════════════════════════════════════════════════════ */

let allGalleryImages = [];

function galleryAlt(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'en') return item.ALT_EN || item.ALT_TH || '';
  return item.ALT_TH || item.ALT_EN || '';
}

function buildGalleryItem(item) {
  const el = document.createElement('div');
  el.className    = 'gallery__item';
  el.style.cursor = 'pointer';

  if (item.IMAGE_URL && item.IMAGE_URL.trim()) {
    const img = document.createElement('img');
    img.src       = item.IMAGE_URL;
    img.alt       = galleryAlt(item);
    img.className = 'img-cover';
    img.loading   = 'lazy';
    el.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'img-placeholder img-placeholder--gallery';
    ph.innerHTML = `<span>${galleryAlt(item)}</span>`;
    el.appendChild(ph);
  }

  el.addEventListener('click', () => openLightbox(allGalleryImages.indexOf(item)));
  return el;
}

function buildPopupGrid(images) {
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  const grid = popup.querySelector('.gallery__popup-grid');
  if (!grid) return;
  grid.innerHTML = '';

  images.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery__popup-item';

    if (item.IMAGE_URL && item.IMAGE_URL.trim()) {
      const img = document.createElement('img');
      img.src       = item.IMAGE_URL;
      img.alt       = galleryAlt(item);
      img.loading   = 'lazy';
      el.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'img-placeholder img-placeholder--popup';
      ph.innerHTML = `<span>${galleryAlt(item)}</span>`;
      el.appendChild(ph);
    }
    grid.appendChild(el);
  });
}

function openLightbox() {
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

  let images = [];
  try {
    images = await fetchGallery();
  } catch (err) {
    console.error('[gallery] fetch failed:', err);
  }

  if (!images || images.length === 0) return;

  allGalleryImages = images;

  grid.innerHTML = '';
  images.slice(0, 6).forEach(item => grid.appendChild(buildGalleryItem(item)));

  // Wire lightbox close events
  const popup = document.getElementById('gallery-popup');
  if (popup) {
    popup.querySelector('.gallery__popup-overlay')
      ?.addEventListener('click', closeLightbox);
    popup.querySelector('.gallery__popup-close')
      ?.addEventListener('click', closeLightbox);
    popup.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  document.querySelector('.gallery__all-btn')
    ?.addEventListener('click', openLightbox);
}

function renderGalleryGrid() {
  if (!allGalleryImages.length) return; // langchange firing before initGallery completes
  const grid = document.querySelector('.gallery__grid');
  if (!grid) return;
  grid.innerHTML = '';
  allGalleryImages.slice(0, 6).forEach(item => grid.appendChild(buildGalleryItem(item)));
}

document.addEventListener('DOMContentLoaded', initGallery);
document.addEventListener('langchange', renderGalleryGrid);
