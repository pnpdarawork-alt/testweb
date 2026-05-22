/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Promotion Renderer
   Sheet fields: ORDER, CODE, TH, EN, ZH_S, ZH_T,
                 DESC_TH, DESC_EN, DESC_ZHS, DESC_ZHT, STATUS
═══════════════════════════════════════════════════════ */

function getPromoName(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.ZH_S || item.EN || item.TH || '';
  if (lang === 'zh-t') return item.ZH_T || item.EN || item.TH || '';
  if (lang === 'en')   return item.EN   || item.TH || '';
  return item.TH || item.EN || '';
}

function getPromoDesc(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.DESC_ZHS || item.DESC_EN || item.DESC_TH || '';
  if (lang === 'zh-t') return item.DESC_ZHT || item.DESC_EN || item.DESC_TH || '';
  if (lang === 'en')   return item.DESC_EN  || item.DESC_TH || '';
  return item.DESC_TH || item.DESC_EN || '';
}

const TICKET_ICONS = { 0: '🎫', 1: '🧡', 2: '🎟️', 3: '🎓' };

let _promos = [];

function buildTicketCard(item, idx) {
  const card = document.createElement('div');
  card.className = 'ticket' + (idx === 1 ? ' ticket--featured' : '');
  card.dataset.promoIndex = idx;

  /* Dynamic name/desc come from API in the current language — no data-i18n.
     The "Inquire" CTA stays static and keeps data-i18n. */
  card.innerHTML = `
    <div class="ticket__body">
      <div class="ticket__icon" aria-hidden="true">${TICKET_ICONS[idx] || '🎫'}</div>
      <h3 class="ticket__name">${getPromoName(item)}</h3>
      <p class="ticket__desc">${getPromoDesc(item)}</p>
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
  if (!_promos.length) return; // langchange firing before initPromotion completes
  const grid = document.querySelector('.promo__grid');
  if (!grid) return;
  grid.innerHTML = '';
  _promos.slice(0, 4).forEach((item, i) => grid.appendChild(buildTicketCard(item, i)));
  if (typeof applyI18n === 'function') applyI18n(grid);
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
