/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Hero Slideshow
   API fields: IMAGE_URL, ORDER, STATUS
   Fades between slides every 4 seconds.
   Falls back to the existing CSS gradient slides if no images.
═══════════════════════════════════════════════════════ */

(async function initHero() {
  const track    = document.querySelector('.hero__slides');
  const dotsWrap = document.querySelector('.hero__dots');
  if (!track || !dotsWrap) return;

  let images = [];
  try {
    images = await fetchHeroImages();
  } catch (err) {
    console.error('[hero] fetch failed:', err);
  }

  const validImages = (images || []).filter(img => img.IMAGE_URL && img.IMAGE_URL.trim());

  if (!validImages.length) {
    startSlideshow(track, dotsWrap);
    return;
  }

  // Build slides from API data
  track.innerHTML    = '';
  dotsWrap.innerHTML = '';

  validImages.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero__slide' + (i === 0 ? ' hero__slide--active' : '');
    slide.style.backgroundImage    = `url('${img.IMAGE_URL}')`;
    slide.style.backgroundSize     = 'cover';
    slide.style.backgroundPosition = 'center';
    slide.setAttribute('aria-hidden', 'true');
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'hero__dot' + (i === 0 ? ' hero__dot--active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dotsWrap.appendChild(dot);
  });

  startSlideshow(track, dotsWrap);
})();

function startSlideshow(track, dotsWrap) {
  const slides = track.querySelectorAll('.hero__slide');
  const dots   = dotsWrap.querySelectorAll('.hero__dot');
  if (slides.length < 2) return;

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove('hero__slide--active');
    if (dots[current]) dots[current].classList.remove('hero__dot--active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('hero__slide--active');
    if (dots[current]) dots[current].classList.add('hero__dot--active');
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    clearInterval(timer);
    goTo(i);
  }));

  const timer = setInterval(() => goTo(current + 1), 4000);
  track.addEventListener('mouseenter', () => clearInterval(timer));
}
