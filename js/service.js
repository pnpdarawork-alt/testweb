/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Service Renderer
   Sheet fields: ID, TH_TITLE, EN_TITLE, ZH_S_TITLE, ZH_T_TITLE,
                 TH_DETAIL, EN_DETAIL, ZH_S_DETAIL, ZH_T_DETAIL,
                 IMAGE_URL, TH, EN, ZH_S, ZH_T, CTA_URL, STATUS
   TH/EN/ZH_S/ZH_T = per-row CTA button labels.
═══════════════════════════════════════════════════════ */

function getServiceName(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.ZH_S_TITLE || item.EN_TITLE || item.TH_TITLE || '';
  if (lang === 'zh-t') return item.ZH_T_TITLE || item.EN_TITLE || item.TH_TITLE || '';
  if (lang === 'en')   return item.EN_TITLE   || item.TH_TITLE || '';
  return item.TH_TITLE || item.EN_TITLE || '';
}

function getServiceDesc(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.ZH_S_DETAIL || item.EN_DETAIL || item.TH_DETAIL || '';
  if (lang === 'zh-t') return item.ZH_T_DETAIL || item.EN_DETAIL || item.TH_DETAIL || '';
  if (lang === 'en')   return item.EN_DETAIL   || item.TH_DETAIL || '';
  return item.TH_DETAIL || item.EN_DETAIL || '';
}

function getServiceCta(item) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return item.ZH_S || item.EN || item.TH || '';
  if (lang === 'zh-t') return item.ZH_T || item.EN || item.TH || '';
  if (lang === 'en')   return item.EN   || item.TH || '';
  return item.TH || item.EN || '';
}

let _services = [];

function buildServiceItem(item, idx) {
  const wrap = document.createElement('div');
  wrap.className = 'services__item' + (idx % 2 === 1 ? ' services__item--reverse' : '');
  wrap.dataset.serviceId = item.ID || '';

  const altText  = item.EN_TITLE || item.TH_TITLE || '';
  const ctaUrl   = item.CTA_URL || 'https://line.me/vckcoolspace';
  const ctaLabel = getServiceCta(item) || '';

  const imgHtml = item.IMAGE_URL
    ? `<img src="${item.IMAGE_URL}" alt="${altText}" class="img-cover" loading="lazy">`
    : `<div class="img-placeholder img-placeholder--service"><span>${altText}</span></div>`;

  const ctaHtml = ctaLabel
    ? `<a href="${ctaUrl}" target="_blank" rel="noopener noreferrer"
           class="btn btn--outline-gold btn--sm">${ctaLabel}</a>`
    : `<a href="${ctaUrl}" target="_blank" rel="noopener noreferrer"
           class="btn btn--outline-gold btn--sm" data-i18n="cta.inquire"></a>`;

  wrap.innerHTML = `
    <div class="services__item-img">${imgHtml}</div>
    <div class="services__item-content">
      <h3 class="services__item-title">${getServiceName(item)}</h3>
      <p class="services__item-desc">${getServiceDesc(item)}</p>
      <div class="services__item-ctas">${ctaHtml}</div>
    </div>`;

  return wrap;
}

function renderServiceList() {
  if (!_services.length) return;
  const list = document.querySelector('.services__list');
  if (!list) return;
  list.innerHTML = '';
  _services.forEach((item, i) => list.appendChild(buildServiceItem(item, i)));
  if (typeof applyI18n === 'function') applyI18n(list);
}

async function initService() {
  const list = document.querySelector('.services__list');
  if (!list) return;

  let services = [];
  try {
    services = await fetchService();
  } catch (err) {
    console.error('[service] fetch failed:', err);
  }

  if (!services || services.length === 0) return;

  _services = services;
  renderServiceList();
}

document.addEventListener('DOMContentLoaded', initService);
document.addEventListener('langchange', renderServiceList);
