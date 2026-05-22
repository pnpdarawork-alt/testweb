/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Gallery + Lightbox
   API fields: ORDER, IMAGE_URL, STATUS
   - Click gallery item  → single-photo fullscreen popup
   - Click "All Photos >" → grid popup (paginated, 9 per page)
   - Click photo in grid → single-photo fullscreen popup
═══════════════════════════════════════════════════════ */

let allGalleryImages = [];
let _currentPhotoIdx = 0;
let _gridPage = 0;
const GRID_PAGE_SIZE = 9;

function galleryAlt(item) {
  return `VCK Cool Space ${item.ORDER || ''}`.trim();
}

// ─── Single-photo fullscreen popup ───────────────────

function _onPhotoKey(e) {
  if (e.key === 'Escape')     closePhotoPopup();
  if (e.key === 'ArrowLeft')  openPhotoPopup(_currentPhotoIdx - 1);
  if (e.key === 'ArrowRight') openPhotoPopup(_currentPhotoIdx + 1);
}

function openPhotoPopup(idx) {
  const popup = document.getElementById('gallery-photo-popup');
  if (!popup || !allGalleryImages.length) return;
  _currentPhotoIdx = Math.max(0, Math.min(idx, allGalleryImages.length - 1));
  const item = allGalleryImages[_currentPhotoIdx];

  const img = popup.querySelector('.gallery__photo-img');
  if (img) { img.src = item.IMAGE_URL || ''; img.alt = galleryAlt(item); }

  const prevBtn = popup.querySelector('.gallery__photo-prev');
  const nextBtn = popup.querySelector('.gallery__photo-next');
  if (prevBtn) prevBtn.disabled = _currentPhotoIdx === 0;
  if (nextBtn) nextBtn.disabled = _currentPhotoIdx >= allGalleryImages.length - 1;

  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', _onPhotoKey);
}

function closePhotoPopup() {
  const popup = document.getElementById('gallery-photo-popup');
  if (!popup) return;
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', _onPhotoKey);
}

// ─── Grid popup (all photos, paginated) ──────────────

function buildPopupGrid(page) {
  _gridPage = page;
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  const grid = popup.querySelector('.gallery__popup-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const total      = allGalleryImages.length;
  const totalPages = Math.ceil(total / GRID_PAGE_SIZE);
  const start      = page * GRID_PAGE_SIZE;
  const pageImages = allGalleryImages.slice(start, start + GRID_PAGE_SIZE);

  pageImages.forEach((item, localIdx) => {
    const globalIdx = start + localIdx;
    const el = document.createElement('div');
    el.className    = 'gallery__popup-item';
    el.style.cursor = 'pointer';

    if (item.IMAGE_URL && item.IMAGE_URL.trim()) {
      const img = document.createElement('img');
      img.src     = item.IMAGE_URL;
      img.alt     = galleryAlt(item);
      img.loading = 'lazy';
      el.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'img-placeholder img-placeholder--popup';
      el.appendChild(ph);
    }

    el.addEventListener('click', () => {
      closeGridPopup();
      openPhotoPopup(globalIdx);
    });

    grid.appendChild(el);
  });

  // Pagination visibility
  const pagination = popup.querySelector('.gallery__popup-pagination');
  if (pagination) {
    pagination.style.display = totalPages > 1 ? 'flex' : 'none';
    const prevBtn = popup.querySelector('.gallery__popup-prev');
    const nextBtn = popup.querySelector('.gallery__popup-next');
    if (prevBtn) prevBtn.disabled = page === 0;
    if (nextBtn) nextBtn.disabled = page >= totalPages - 1;
  }
}

function _onGridKey(e) {
  if (e.key === 'Escape') closeGridPopup();
}

function openGridPopup() {
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  buildPopupGrid(0);
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', _onGridKey);
}

function closeGridPopup() {
  const popup = document.getElementById('gallery-popup');
  if (!popup) return;
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', _onGridKey);
}

// ─── Gallery grid (preview, 6 items) ─────────────────

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
    el.appendChild(ph);
  }

  el.addEventListener('click', () => openPhotoPopup(allGalleryImages.indexOf(item)));
  return el;
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
  grid.innerHTML   = '';
  images.slice(0, 6).forEach(item => grid.appendChild(buildGalleryItem(item)));

  // Wire grid popup events
  const gridPopup = document.getElementById('gallery-popup');
  if (gridPopup) {
    gridPopup.querySelector('.gallery__popup-overlay')
      ?.addEventListener('click', closeGridPopup);
    gridPopup.querySelector('.gallery__popup-close')
      ?.addEventListener('click', closeGridPopup);
    gridPopup.querySelector('.gallery__popup-prev')
      ?.addEventListener('click', () => buildPopupGrid(_gridPage - 1));
    gridPopup.querySelector('.gallery__popup-next')
      ?.addEventListener('click', () => buildPopupGrid(_gridPage + 1));
  }

  // Wire single-photo popup events
  const photoPopup = document.getElementById('gallery-photo-popup');
  if (photoPopup) {
    photoPopup.querySelector('.gallery__photo-overlay')
      ?.addEventListener('click', closePhotoPopup);
    photoPopup.querySelector('.gallery__photo-close')
      ?.addEventListener('click', closePhotoPopup);
    photoPopup.querySelector('.gallery__photo-prev')
      ?.addEventListener('click', () => openPhotoPopup(_currentPhotoIdx - 1));
    photoPopup.querySelector('.gallery__photo-next')
      ?.addEventListener('click', () => openPhotoPopup(_currentPhotoIdx + 1));
  }

  document.querySelector('.gallery__all-btn')
    ?.addEventListener('click', openGridPopup);
}

function renderGalleryGrid() {
  if (!allGalleryImages.length) return;
  const grid = document.querySelector('.gallery__grid');
  if (!grid) return;
  grid.innerHTML = '';
  allGalleryImages.slice(0, 6).forEach(item => grid.appendChild(buildGalleryItem(item)));
}

document.addEventListener('DOMContentLoaded', initGallery);
document.addEventListener('langchange', renderGalleryGrid);
