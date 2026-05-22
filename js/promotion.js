/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Promotion Renderer
   Fetches promos from API, renders ticket-style cards.
═══════════════════════════════════════════════════════ */

function getPromoDesc(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s' && item.DESC_ZHS) return item.DESC_ZHS;
  if (lang === 'zh-t' && item.DESC_ZHT) return item.DESC_ZHT;
  if (lang === 'en'   && item.DESC_EN)  return item.DESC_EN;
  return item.DESC_TH || item.DESC_EN || '';
}

function getPromoName(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  return (lang === 'th' ? item.NAME_TH : item.NAME_EN) || item.NAME_TH || item.NAME_EN || '';
}

const TICKET_ICONS = { 0: '🎫', 1: '🧡', 2: '🎟️', 3: '🎓' };

let _promos = [];

function buildTicketCard(item, idx) {
  const card = document.createElement('div');
  card.className = 'ticket' + (idx === 1 ? ' ticket--featured' : '');
  card.dataset.promoIndex = idx;

  const descKey = ['promo.valueDesc','promo.vclubDesc','promo.daypassDesc','promo.studentDesc'][idx] || '';
  const nameKey = ['promo.value','promo.vclub','promo.daypass','promo.student'][idx] || '';

  card.innerHTML = `
    <div class="ticket__body">
      <div class="ticket__icon" aria-hidden="true">${TICKET_ICONS[idx] || '🎫'}</div>
      <h3 class="ticket__name" data-i18n="${nameKey}">${getPromoName(item)}</h3>
      <p class="ticket__desc" data-i18n="${descKey}">${getPromoDesc(item)}</p>
    </div>
    <div class="ticket__perf">
      <span class="ticket__notch ticket__notch--l"></span>
      <span class="ticket__notch ticket__notch--r"></span>
    </div>
    <div class="ticket__stub">
      <span class="ticket__code">${item.CODE || 'VCK-' + String(idx+1).padStart(3,'0')}</span>
      <a href="https://line.me/vckcoolspace" target="_blank" rel="noopener noreferrer"
         class="btn btn--gold btn--sm" data-i18n="cta.inquire">สอบถาม</a>
    </div>`;

  return card;
}

function renderPromoCards() {
  const grid = document.querySelector('.promo__grid');
  if (!grid || !_promos.length) return;
  grid.innerHTML = '';
  _promos.slice(0, 4).forEach((item, i) => {
    grid.appendChild(buildTicketCard(item, i));
  });
  if (typeof switchLanguage === 'function') switchLanguage(getLang());
}

async function initPromotion() {
  const grid = document.querySelector('.promo__grid');
  if (!grid) return;

  const promos = await fetchPromotion();
  if (!promos || promos.length === 0) return;

  _promos = promos;
  renderPromoCards();
}

document.addEventListener('DOMContentLoaded', initPromotion);
document.addEventListener('langchange', renderPromoCards);
