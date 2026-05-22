/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Events Renderer
   Renders Today card + fixed MON→SUN week grid.
   THU data comes from Weekly_THU; all others from Recurring_Events.
═══════════════════════════════════════════════════════ */

// Index 0=Sun, 1=Mon … 6=Sat — matches JS Date.getDay()
const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_ABBR  = ['sun','mon','tue','wed','thu','fri','sat'];

// Fixed display order: Mon(1) Tue(2) Wed(3) Thu(4) Fri(5) Sat(6) Sun(0)
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

/* Normalize the DAY field from the API sheet.
   Handles: 'Monday' | 'MON' | 'mon' | 'monday' → 'Monday' */
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

/* Current Bangkok date/time — immune to UTC offset issues. */
function getThaiNow() {
  const bangkokStr = new Date().toLocaleString('en-CA', { timeZone: 'Asia/Bangkok' });
  // en-CA gives 'YYYY-MM-DD, HH:MM:SS' — split on comma for date part
  const dateStr = bangkokStr.split(',')[0].trim();
  // Parse at noon local so DST/UTC conversions never shift the date
  const d = new Date(dateStr + 'T12:00:00');
  return {
    dateStr,
    dayName: DAY_NAMES[d.getDay()],
    dayIdx:  d.getDay(),
  };
}

/* ── DOM helpers ── */
function makePlaceholder(label) {
  const el = document.createElement('div');
  el.className = 'img-placeholder img-placeholder--card';
  el.innerHTML = `<span>${label}</span>`;
  return el;
}

function makeImg(url, alt) {
  if (!url) return null;
  const img = document.createElement('img');
  img.src     = url;
  img.alt     = alt || '';
  img.className = 'img-cover';
  img.loading   = 'lazy';
  img.onerror   = function () { this.style.display = 'none'; };
  return img;
}

/* ── Today card ── */
function renderTodayCard(recurring, weeklyThu, todayInfo) {
  const section = document.querySelector('.events__today');
  if (!section) {
    console.warn('[events] .events__today element not found');
    return;
  }
  console.log('[events] renderTodayCard | day:', todayInfo.dayName, '| date:', todayInfo.dateStr);

  let ev = null;
  if (todayInfo.dayName === 'Thursday') {
    ev = weeklyThu.find(e => e.DATE === todayInfo.dateStr) || weeklyThu[0] || null;
    console.log('[events] today THU event (Weekly_THU):', ev);
  } else {
    ev = recurring.find(e => normalizeDayName(e.DAY) === todayInfo.dayName) || null;
    console.log('[events] today event (Recurring_Events):', ev);
  }

  if (!ev) {
    console.log('[events] no event for today — showing empty state');
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

  const dayEl   = section.querySelector('.events__today-day');
  const nameEl  = section.querySelector('.events__today-name');
  const altEl   = section.querySelector('.events__today-name-alt');
  const timeEl  = section.querySelector('.events__today-time');
  const imgWrap = section.querySelector('.events__today-image');

  if (dayEl)  dayEl.textContent  = todayInfo.dayName;
  if (nameEl) nameEl.textContent = ev.NAME_TH || ev.NAME_EN || '';
  if (altEl)  altEl.textContent  = ev.NAME_EN || '';
  if (timeEl) {
    const icon = timeEl.querySelector('.events__time-icon');
    timeEl.textContent = '';
    if (icon) timeEl.appendChild(icon);
    timeEl.appendChild(document.createTextNode(' ' + (ev.TIME || '')));
  }
  if (imgWrap && ev.IMAGE_URL) {
    const img = makeImg(ev.IMAGE_URL, ev.NAME_EN);
    if (img) { imgWrap.innerHTML = ''; imgWrap.appendChild(img); }
  }
}

/* ── Week card builder ── */
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

  // Day header label (data-i18n key e.g. "events.mon")
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
      const img = makeImg(ev.IMAGE_URL, ev.NAME_EN);
      if (img) {
        imgDiv.appendChild(img);
      } else {
        const sp = document.createElement('span');
        sp.textContent = ev.NAME_EN || '';
        imgDiv.appendChild(sp);
      }

      const info = document.createElement('div');
      info.className = 'events__mini-info';
      info.innerHTML =
        `<p class="events__mini-name">${ev.NAME_TH || ev.NAME_EN || ''}</p>` +
        `<p class="events__mini-time">${ev.TIME || ''}</p>`;

      mini.appendChild(imgDiv);
      mini.appendChild(info);
      multiRow.appendChild(mini);
    });
    card.appendChild(multiRow);

  } else {
    const ev = dayEvents[0] || {};
    const imgDiv = document.createElement('div');
    imgDiv.className = 'events__card-img';
    const img = makeImg(ev.IMAGE_URL, ev.NAME_EN);
    imgDiv.appendChild(img || makePlaceholder(ev.NAME_EN || ''));
    card.appendChild(imgDiv);

    const body = document.createElement('div');
    body.className = 'events__card-body';
    body.innerHTML =
      `<h4 class="events__card-name">${ev.NAME_TH || ev.NAME_EN || ''}</h4>` +
      `<p class="events__card-name-en">${ev.NAME_EN || ''}</p>` +
      `<p class="events__card-time">${ev.TIME || ''}</p>`;
    card.appendChild(body);
  }

  return card;
}

/* ── Main init ── */
async function initEvents() {
  const week = document.querySelector('.events__week');
  if (!week) {
    console.error('[events] FATAL: .events__week not found in DOM');
    return;
  }

  console.log('[events] fetching recurring + weeklyThu…');

  let recurring = [], weeklyThu = [];
  try {
    [recurring, weeklyThu] = await Promise.all([
      fetchRecurringEvents(),
      fetchWeeklyThu(),
    ]);
  } catch (err) {
    console.error('[events] fetch error:', err);
  }

  console.log('[events] recurring events received:', recurring.length, recurring);
  console.log('[events] weekly THU received:', weeklyThu.length, weeklyThu);

  const todayInfo = getThaiNow();
  console.log('[events] Bangkok today:', todayInfo);

  // Populate today card
  renderTodayCard(recurring, weeklyThu, todayInfo);

  // Remove stale static cards; keep the h3 title
  week.querySelectorAll('.events__card').forEach(c => c.remove());

  // Render fixed MON→TUE→WED→THU→FRI→SAT→SUN
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
        .sort((a, b) => (Number(a.SLOT) || 0) - (Number(b.SLOT) || 0));
    }

    if (!dayEvents.length) {
      dayEvents = [{ NAME_TH: '—', NAME_EN: '—', TIME: '' }];
    }

    console.log(`[events] ${dayName} (idx ${dayIdx})${isToday ? ' ← TODAY' : ''}:`, dayEvents);

    week.appendChild(buildWeekCard(dayIdx, dayEvents, isThu, isToday));
  }

  // Re-apply active language to the freshly rendered day labels
  if (typeof switchLanguage === 'function') switchLanguage(getLang());
}

document.addEventListener('DOMContentLoaded', initEvents);

document.addEventListener('langchange', () => {
  const lang = (typeof getLang === 'function') ? getLang() : 'th';
  const dict = (typeof translations !== 'undefined')
    ? (translations[lang] || translations.th)
    : {};
  document.querySelectorAll('.events__card-day[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
});
