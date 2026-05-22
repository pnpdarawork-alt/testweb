/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Promotion Renderer
   Sheet fields: ID, TH_TITLE, EN_TITLE, ZH_S_TITLE, ZH_T_TITLE,
                 TH_DETAIL, EN_DETAIL, ZH_S_DETAIL, ZH_T_DETAIL,
                 CTA_URL, STATUS, ORDER
   CTA button text is NOT fetched — it comes from lang.js
   translations keyed by `promo.cta.<ID>`.
═══════════════════════════════════════════════════════ */

function getPromoName(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.ZH_S_TITLE || item.EN_TITLE || item.TH_TITLE || '';
  if (lang === 'zh-t') return item.ZH_T_TITLE || item.EN_TITLE || item.TH_TITLE || '';
  if (lang === 'en')   return item.EN_TITLE   || item.TH_TITLE || '';
  return item.TH_TITLE || item.EN_TITLE || '';
}

function getPromoDesc(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.ZH_S_DETAIL || item.EN_DETAIL || item.TH_DETAIL || '';
  if (lang === 'zh-t') return item.ZH_T_DETAIL || item.EN_DETAIL || item.TH_DETAIL || '';
  if (lang === 'en')   return item.EN_DETAIL   || item.TH_DETAIL || '';
  return item.TH_DETAIL || item.EN_DETAIL || '';
}

const TICKET_ICONS = { 0: '🎫', 1: '🧡', 2: '🎓', 3: '🎟️' };

let _promos = [];

function buildTicketCard(item, idx) {
  const card = document.createElement('div');
  card.className = 'ticket' + (idx === 1 ? ' ticket--featured' : '');
  card.dataset.promoIndex = idx;

  const ctaUrl  = item.CTA_URL || 'https://line.me/vckcoolspace';
  const ctaKey  = 'promo.cta.' + (item.ID || (idx + 1));
  const code    = item.ID || String(idx + 1);

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
      <span class="ticket__code">${code}</span>
      <a href="${ctaUrl}" target="_blank" rel="noopener noreferrer"
         class="btn btn--gold btn--sm" data-i18n="${ctaKey}"></a>
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
