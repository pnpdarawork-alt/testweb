/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Events Renderer
   API field names: TH, EN, ZH_S, ZH_T, TIME_1, TIME_2,
                    IMAGE_URL, DAY, STATUS, SLOT
   Fixed display order: MON → TUE → WED → THU → FRI → SAT → SUN
═══════════════════════════════════════════════════════ */

// Index 0=Sun … 6=Sat, matches Date.getDay()
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_ABBR  = ['sun','mon','tue','wed','thu','fri','sat'];

// Display order: Mon(1)→Tue(2)→Wed(3)→Thu(4)→Fri(5)→Sat(6)→Sun(0)
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

/* ── Field accessors ──────────────────────────────── */

function evName(ev) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return ev.ZH_S || ev.EN || ev.TH || '';
  if (lang === 'zh-t') return ev.ZH_T || ev.EN || ev.TH || '';
  if (lang === 'en')   return ev.EN   || ev.TH || '';
  return ev.TH || ev.EN || '';
}

function evDetail(ev) {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  if (lang === 'zh-s') return ev.DETAIL_ZH_S || ev.DETAIL_EN || ev.DETAIL_TH || '';
  if (lang === 'zh-t') return ev.DETAIL_ZH_T || ev.DETAIL_EN || ev.DETAIL_TH || '';
  if (lang === 'en')   return ev.DETAIL_EN   || ev.DETAIL_TH || '';
  return ev.DETAIL_TH || ev.DETAIL_EN || '';
}

function evTime(ev) {
  const t1 = (ev.TIME_1 || '').trim();
  const t2 = (ev.TIME_2 || '').trim();
  if (t1 && t2) return `${t1} – ${t2}`;
  return t1 || t2;
}

/* Handles: 'Monday' | 'MON' | 'mon' | 'monday' → 'Monday' */
function normalizeDayName(val) {
  if (!val) return '';
  const v = val.trim().toLowerCase();
  for (let i = 0; i < DAY_NAMES.length; i++) {
    if (v === DAY_NAMES[i].toLowerCase() || v === DAY_ABBR[i].toLowerCase()) {
      return DAY_NAMES[i];
    }
  }
  console.warn('[events] unrecognised DAY value:', val);
  return val;
}

/* Current date/time in Bangkok (GMT+7) */
function getThaiNow() {
  const now        = new Date();
  const bangkokStr = now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  const bk         = new Date(bangkokStr);
  const dayIdx     = bk.getDay();
  // Build YYYY-MM-DD in Bangkok time
  const y  = bk.getFullYear();
  const m  = String(bk.getMonth() + 1).padStart(2, '0');
  const dy = String(bk.getDate()).padStart(2, '0');
  const dateStr = `${y}-${m}-${dy}`;
  return { dateStr, dayName: DAY_NAMES[dayIdx], dayIdx };
}

/* ── DOM helpers ────────────────────────────────── */

function makePlaceholder(label) {
  const el = document.createElement('div');
  el.className = 'img-placeholder img-placeholder--card';
  el.innerHTML = `<span>${label || ''}</span>`;
  return el;
}

function makeImg(url, alt) {
  if (!url) return null;
  const img = document.createElement('img');
  img.src       = url;
  img.alt       = alt || '';
  img.className = 'img-cover';
  img.loading   = 'lazy';
  img.onerror   = function () { this.style.display = 'none'; };
  return img;
}

/* ── Today card ─────────────────────────────────── */

function renderTodayCard(recurring, weeklyThu, todayInfo) {
  const section = document.querySelector('.events__today');
  if (!section) { console.warn('[events] .events__today not found'); return; }

  console.log('[events] today:', todayInfo.dayName, todayInfo.dateStr);

  let ev = null;
  if (todayInfo.dayName === 'Thursday') {
    ev = weeklyThu.find(e => e.DATE === todayInfo.dateStr) || null;
    console.log('[events] today THU event (Weekly_THU):', ev);
  } else {
    ev = recurring.find(e => normalizeDayName(e.DAY) === todayInfo.dayName) || null;
    console.log('[events] today event (Recurring_Events):', ev);
  }

  if (!ev) {
    console.log('[events] no event for today');
    const card = section.querySelector('.events__today-card');
    if (card) {
      card.innerHTML =
        `<div class="events__today-info" style="padding:48px;">` +
        `<p class="events__today-day" data-i18n="events.today"></p>` +
        `<h3 class="events__today-name" data-i18n="events.noEvent"></h3>` +
        `</div>`;
    }
    return;
  }

  const dayEl    = section.querySelector('.events__today-day');
  const nameEl   = section.querySelector('.events__today-name');
  const altEl    = section.querySelector('.events__today-name-alt');
  const timeEl   = section.querySelector('.events__today-time');
  const detailEl = section.querySelector('.events__today-detail');
  const imgWrap  = section.querySelector('.events__today-image');

  if (dayEl)  dayEl.textContent  = todayInfo.dayName;
  if (nameEl) nameEl.textContent = ev.TH  || ev.EN || '';
  if (altEl)  altEl.textContent  = ev.EN  || '';
  if (timeEl) {
    const icon = timeEl.querySelector('.events__time-icon');
    timeEl.textContent = '';
    if (icon) timeEl.appendChild(icon);
    timeEl.appendChild(document.createTextNode(' ' + evTime(ev)));
  }
  if (detailEl) {
    const detail = evDetail(ev);
    detailEl.textContent = detail;
    detailEl.style.display = detail ? '' : 'none';
  } else {
    const detail = evDetail(ev);
    if (detail && timeEl) {
      const p = document.createElement('p');
      p.className = 'events__today-detail events__card-detail';
      p.textContent = detail;
      timeEl.insertAdjacentElement('afterend', p);
    }
  }
  if (imgWrap && ev.IMAGE_URL) {
    const img = makeImg(ev.IMAGE_URL, ev.EN);
    if (img) { imgWrap.innerHTML = ''; imgWrap.appendChild(img); }
  }
}

/* ── Week card builder ──────────────────────────── */

function buildWeekCard(dayIdx, dayEvents, isThu, isToday) {
  const dayName = DAY_NAMES[dayIdx];
  const isRow2  = dayName === 'Friday' || dayName === 'Saturday' || dayName === 'Sunday';
  const isMulti = dayEvents.length > 1;

  const card = document.createElement('div');
  card.className = [
    'events__card',
    isRow2  ? 'events__card--row2'  : 'events__card--row1',
    isThu   ? 'events__card--thu'   : '',
    isMulti ? 'events__card--multi' : '',
    isToday ? 'events__card--today' : '',
  ].filter(Boolean).join(' ');

  // Day header label (data-i18n key: "events.mon" etc.)
  const dayLabel = document.createElement('div');
  dayLabel.className = 'events__card-day';
  dayLabel.setAttribute('data-i18n', 'events.' + DAY_ABBR[dayIdx]);
  card.appendChild(dayLabel);

  if (isMulti) {
    const multiRow = document.createElement('div');
    multiRow.className = 'events__card-multi-row';

    dayEvents.forEach(ev => {
      const mini = document.createElement('div');
      mini.className = 'events__mini-event';

      const imgDiv = document.createElement('div');
      imgDiv.className = 'img-placeholder img-placeholder--mini';
      const img = makeImg(ev.IMAGE_URL, ev.EN);
      if (img) {
        imgDiv.appendChild(img);
      } else {
        const sp = document.createElement('span');
        sp.textContent = ev.EN || '';
        imgDiv.appendChild(sp);
      }

      const info = document.createElement('div');
      info.className = 'events__mini-info';
      const miniDetail = evDetail(ev);
      info.innerHTML =
        `<p class="events__mini-name">${evName(ev)}</p>` +
        `<p class="events__mini-time">${evTime(ev)}</p>` +
        (miniDetail ? `<p class="events__card-detail">${miniDetail}</p>` : '');

      mini.appendChild(imgDiv);
      mini.appendChild(info);
      multiRow.appendChild(mini);
    });
    card.appendChild(multiRow);

  } else {
    const ev = dayEvents[0] || {};
    const imgDiv = document.createElement('div');
    imgDiv.className = 'events__card-img';
    const img = makeImg(ev.IMAGE_URL, ev.EN);
    imgDiv.appendChild(img || makePlaceholder(ev.EN || ''));
    card.appendChild(imgDiv);

    const body = document.createElement('div');
    body.className = 'events__card-body';
    const detail = evDetail(ev);
    body.innerHTML =
      `<h4 class="events__card-name">${evName(ev)}</h4>` +
      `<p class="events__card-name-en">${ev.EN || ''}</p>` +
      `<p class="events__card-time">${evTime(ev)}</p>` +
      (detail ? `<p class="events__card-detail">${detail}</p>` : '');
    card.appendChild(body);
  }

  return card;
}

/* ── Main init ──────────────────────────────────── */

async function initEvents() {
  const week = document.querySelector('.events__week');
  if (!week) { console.error('[events] FATAL: .events__week not found'); return; }

  console.log('[events] fetching data…');
  let recurring = [], weeklyThu = [];
  try {
    [recurring, weeklyThu] = await Promise.all([
      fetchRecurringEvents(),
      fetchWeeklyThu(),
    ]);
  } catch (err) {
    console.error('[events] Promise.all failed:', err);
  }

  console.log('[events] recurring:', recurring.length, recurring);
  console.log('[events] weeklyThu:', weeklyThu.length, weeklyThu);

  const todayInfo = getThaiNow();
  console.log('[events] Bangkok now:', todayInfo);

  renderTodayCard(recurring, weeklyThu, todayInfo);

  // Remove stale static cards, keep the h3 title intact
  week.querySelectorAll('.events__card').forEach(c => c.remove());

  // Always render in fixed MON → TUE → WED → THU → FRI → SAT → SUN order
  for (const dayIdx of WEEK_ORDER) {
    const dayName = DAY_NAMES[dayIdx];
    const isThu   = dayName === 'Thursday';
    const isToday = dayIdx === todayInfo.dayIdx;

    let dayEvents = [];
    if (isThu) {
      const thu = weeklyThu.find(e => e.DATE === todayInfo.dateStr) || weeklyThu[0];
      if (thu) dayEvents = [thu];
    } else {
      dayEvents = recurring
        .filter(e => normalizeDayName(e.DAY) === dayName)
        .sort((a, b) => (Number(a.SLOT) || 0) - (Number(b.SLOT) || 0)
                     || (a.TIME_1 || '').localeCompare(b.TIME_1 || ''));
    }

    if (!dayEvents.length) {
      dayEvents = [{ TH: '—', EN: '—', TIME_1: '' }];
    }

    console.log(`[events] ${dayName}${isToday ? ' ★TODAY' : ''}:`, dayEvents);
    week.appendChild(buildWeekCard(dayIdx, dayEvents, isThu, isToday));
  }

  if (typeof switchLanguage === 'function') switchLanguage(getLang());
}

document.addEventListener('DOMContentLoaded', initEvents);

document.addEventListener('langchange', () => {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  const dict = (typeof translations !== 'undefined')
    ? (translations[lang] || translations.th)
    : {};
  // Re-translate day labels on language switch
  document.querySelectorAll('.events__card-day[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  // Re-render event names in new language
  document.querySelectorAll('.events__card-name, .events__mini-name').forEach(el => {
    el.closest('.events__card');
  });
});
