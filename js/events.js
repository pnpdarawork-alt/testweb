/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Events Renderer
   Recurring_Events fields: TH, EN, ZH_S, ZH_T, TIME_1, TIME_2,
                             IMAGE_URL, DETAIL_TH/EN/ZH_S/ZH_T,
                             DAY, STATUS, SLOT
   Weekly_THU fields:       DATE, TH, EN, ZH_S, ZH_T, TIME,
                             IMAGE_URL, DETAIL_TH/EN/ZH_S/ZH_T, STATUS
   Fixed display order: MON → TUE → WED → THU → FRI → SAT → SUN
═══════════════════════════════════════════════════════ */

// Index 0=Sun … 6=Sat, matches Date.getDay()
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_ABBR  = ['sun','mon','tue','wed','thu','fri','sat'];

// Display order: Mon(1)→Tue(2)→Wed(3)→Thu(4)→Fri(5)→Sat(6)→Sun(0)
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

// Module-level cache so langchange can re-render without re-fetching
let _recurring = [];
let _weeklyThu = [];
let _eventsReady = false; // true once initEvents has fetched (or fallen back)

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
  const t  = (ev.TIME   || '').trim(); // Weekly_THU single-column
  const t1 = (ev.TIME_1 || '').trim();
  const t2 = (ev.TIME_2 || '').trim();
  if (t)        return t;
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

/* Date of the upcoming Thursday in Bangkok time (today if today is Thursday).
   Format matches Google Sheets DATE column: "YYYY-MM-DD". */
function getWeekThuDate() {
  const now           = new Date();
  const bangkokTime   = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
  const dayOfWeek     = bangkokTime.getDay();          // Sun=0 … Sat=6
  const daysUntilThu  = (4 - dayOfWeek + 7) % 7;       // 0 if Thu, else days forward to Thu
  const thu           = new Date(bangkokTime);
  thu.setDate(bangkokTime.getDate() + daysUntilThu);
  const y = thu.getFullYear();
  const m = String(thu.getMonth() + 1).padStart(2, '0');
  const d = String(thu.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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

/* Localized "Today" day-name label */
function localizedDayName(dayName) {
  const key = 'events.' + DAY_ABBR[DAY_NAMES.indexOf(dayName)];
  return (typeof t === 'function') ? t(key) : dayName;
}

function renderTodayCard(recurring, weeklyThu, todayInfo) {
  const section = document.querySelector('.events__today');
  if (!section) return;

  const ev = (todayInfo.dayName === 'Thursday')
    ? (weeklyThu.find(e => e.DATE === todayInfo.dateStr) || null)
    : (recurring.find(e => normalizeDayName(e.DAY) === todayInfo.dayName) || null);

  const card = section.querySelector('.events__today-card');
  if (!card) return;

  if (!ev) {
    card.innerHTML =
      `<div class="events__today-info" style="padding:48px;">` +
      `<p class="events__today-day" data-i18n="events.today"></p>` +
      `<h3 class="events__today-name" data-i18n="events.noEvent"></h3>` +
      `</div>`;
    if (typeof applyI18n === 'function') applyI18n(card);
    return;
  }

  const dayEl    = section.querySelector('.events__today-day');
  const nameEl   = section.querySelector('.events__today-name');
  const altEl    = section.querySelector('.events__today-name-alt');
  const timeEl   = section.querySelector('.events__today-time');
  const detailEl = section.querySelector('.events__today-detail');
  const imgWrap  = section.querySelector('.events__today-image');

  if (dayEl)  dayEl.textContent  = localizedDayName(todayInfo.dayName);
  if (nameEl) nameEl.textContent = evName(ev);
  if (altEl) {
    const showAlt = getLang() !== 'en' && ev.EN;
    altEl.textContent     = showAlt ? ev.EN : '';
    altEl.style.display   = showAlt ? '' : 'none';
  }
  if (timeEl) {
    const icon = timeEl.querySelector('.events__time-icon');
    timeEl.textContent = '';
    if (icon) timeEl.appendChild(icon);
    timeEl.appendChild(document.createTextNode(' ' + evTime(ev)));
  }
  const detail = evDetail(ev);
  if (detailEl) {
    detailEl.textContent = detail;
    detailEl.style.display = detail ? '' : 'none';
  } else if (detail && timeEl) {
    const p = document.createElement('p');
    p.className = 'events__today-detail events__card-detail';
    p.textContent = detail;
    timeEl.insertAdjacentElement('afterend', p);
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

/* ── Render week section (called on init and langchange) ── */

function renderWeekSection() {
  if (!_eventsReady) return; // skip the langchange firing before initEvents completes

  const week = document.querySelector('.events__week');
  if (!week) return;

  const todayInfo = getThaiNow();
  renderTodayCard(_recurring, _weeklyThu, todayInfo);

  week.querySelectorAll('.events__card').forEach(c => c.remove());

  const thuDate = getWeekThuDate();
  for (const dayIdx of WEEK_ORDER) {
    const dayName = DAY_NAMES[dayIdx];
    const isThu   = dayName === 'Thursday';
    const isToday = dayIdx === todayInfo.dayIdx;

    let dayEvents = [];
    if (isThu) {
      const thu = _weeklyThu.find(e => e.DATE === thuDate);
      if (thu) dayEvents = [thu];
    } else {
      dayEvents = _recurring
        .filter(e => normalizeDayName(e.DAY) === dayName)
        .sort((a, b) => (Number(a.SLOT) || 0) - (Number(b.SLOT) || 0)
                     || (a.TIME_1 || '').localeCompare(b.TIME_1 || ''));
    }

    if (!dayEvents.length) dayEvents = [{ TH: '—', EN: '—' }];

    week.appendChild(buildWeekCard(dayIdx, dayEvents, isThu, isToday));
  }

  // Translate just the data-i18n day labels we just created — no recursion
  if (typeof applyI18n === 'function') applyI18n(week);
}

/* ── Main init ──────────────────────────────────── */

async function initEvents() {
  const week = document.querySelector('.events__week');
  if (!week) return;

  try {
    [_recurring, _weeklyThu] = await Promise.all([
      fetchRecurringEvents(),
      fetchWeeklyThu(),
    ]);
  } catch (err) {
    console.error('[events] fetch failed:', err);
  }

  _eventsReady = true;
  renderWeekSection();
}

document.addEventListener('DOMContentLoaded', initEvents);
document.addEventListener('langchange', renderWeekSection);
