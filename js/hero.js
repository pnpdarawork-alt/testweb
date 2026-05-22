/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Hero Slideshow
   Fetches images from API, fades every 4 seconds.
═══════════════════════════════════════════════════════ */

(async function initHero() {
  const track   = document.querySelector('.hero__slides');
  const dotsWrap = document.querySelector('.hero__dots');
  if (!track || !dotsWrap) return;

  const images = await fetchHeroImages();
  if (!images || images.length === 0) return;

  const validImages = images.filter(img => img.IMAGE_URL);
  if (validImages.length === 0) return;

  track.innerHTML  = '';
  dotsWrap.innerHTML = '';

  validImages.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero__slide' + (i === 0 ? ' hero__slide--active' : '');
    slide.style.backgroundImage = `url('${img.IMAGE_URL}')`;
    slide.setAttribute('aria-hidden', 'true');
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'hero__dot' + (i === 0 ? ' hero__dot--active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  let current = 0;
  const slides = track.querySelectorAll('.hero__slide');
  const dots   = dotsWrap.querySelectorAll('.hero__dot');

  function goTo(index) {
    slides[current].classList.remove('hero__slide--active');
    dots[current].classList.remove('hero__dot--active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('hero__slide--active');
    dots[current].classList.add('hero__dot--active');
  }

  const timer = setInterval(() => goTo(current + 1), 4000);

  track.addEventListener('mouseenter', () => clearInterval(timer));
})();
