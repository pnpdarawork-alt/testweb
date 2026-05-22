/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Events Renderer
   Loads recurring + weekly THU, renders Today + This Week.
═══════════════════════════════════════════════════════ */

const DAY_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAY_KEYS  = ['sun','mon','tue','wed','thu','fri','sat'];

function getThaiToday() {
  const str = new Date().toLocaleString('en-CA', { timeZone: 'Asia/Bangkok' }).split(',')[0];
  const d = new Date(str + 'T00:00:00');
  return { dateStr: str, dayName: DAY_NAMES[d.getDay()], dayIdx: d.getDay() };
}

function getThaiDate(offsetDays) {
  const base = new Date().toLocaleString('en-CA', { timeZone: 'Asia/Bangkok' }).split(',')[0];
  const d = new Date(base + 'T00:00:00');
  d.setDate(d.getDate() + offsetDays);
  const iso = d.toISOString().split('T')[0];
  return { dateStr: iso, dayName: DAY_NAMES[d.getDay()], dayIdx: d.getDay() };
}

function makePlaceholder(label) {
  const d = document.createElement('div');
  d.className = 'img-placeholder img-placeholder--card';
  d.innerHTML = `<span>${label}</span>`;
  return d;
}

function makeImg(url, alt) {
  if (!url) return null;
  const img = document.createElement('img');
  img.src = url;
  img.alt = alt || '';
  img.className = 'img-cover';
  img.onerror = function() { this.style.display = 'none'; };
  return img;
}

function renderTodayCard(events, dateInfo, weeklyThu) {
  const section = document.querySelector('.events__today');
  if (!section) return;

  let todayEvents = [];

  if (dateInfo.dayName === 'Thursday') {
    const thu = weeklyThu.find(e => e.DATE === dateInfo.dateStr || !e.DATE) || weeklyThu[0];
    if (thu) todayEvents = [thu];
  } else {
    todayEvents = events.filter(e => e.DAY === dateInfo.dayName);
  }

  const badge = section.querySelector('.events__today-badge');
  if (badge) badge.setAttribute('data-i18n', 'events.today');

  if (!todayEvents.length) {
    const card = section.querySelector('.events__today-card');
    if (card) card.innerHTML = `<div class="events__today-info" style="padding:48px;"><p class="events__today-day" data-i18n="events.today"></p><h3 class="events__today-name" data-i18n="events.noEvent"></h3></div>`;
    return;
  }

  const ev = todayEvents[0];
  const nameEl   = section.querySelector('.events__today-name');
  const nameAlt  = section.querySelector('.events__today-name-alt');
  const timeEl   = section.querySelector('.events__today-time');
  const dayEl    = section.querySelector('.events__today-day');
  const imgWrap  = section.querySelector('.events__today-image');

  if (dayEl)  dayEl.textContent  = dateInfo.dayName;
  if (nameEl) nameEl.textContent = ev.NAME_TH || ev.NAME_EN || '';
  if (nameAlt) nameAlt.textContent = ev.NAME_EN || '';
  if (timeEl) {
    const icon = timeEl.querySelector('.events__time-icon');
    timeEl.textContent = '';
    if (icon) timeEl.appendChild(icon);
    timeEl.appendChild(document.createTextNode(' ' + (ev.TIME || '')));
  }
  if (imgWrap && ev.IMAGE_URL) {
    imgWrap.innerHTML = '';
    const img = makeImg(ev.IMAGE_URL, ev.NAME_EN);
    if (img) imgWrap.appendChild(img);
  }
}

function buildWeekCard(dayInfo, dayEvents, isThu) {
  const card = document.createElement('div');
  const isMulti = dayEvents.length > 1;
  card.className = 'events__card events__card--row' +
    (DAY_KEYS[dayInfo.dayIdx] === 'fri' || DAY_KEYS[dayInfo.dayIdx] === 'sat' || DAY_KEYS[dayInfo.dayIdx] === 'sun' ? '2' : '1') +
    (isThu ? ' events__card--thu' : '') +
    (isMulti ? ' events__card--multi' : '');

  const dayLabel = document.createElement('div');
  dayLabel.className = 'events__card-day';
  dayLabel.setAttribute('data-i18n', 'events.' + DAY_KEYS[dayInfo.dayIdx]);
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
      imgDiv.appendChild(img || document.createElement('span'));
      if (!img) imgDiv.querySelector('span').textContent = ev.NAME_EN || '';

      const info = document.createElement('div');
      info.className = 'events__mini-info';
      info.innerHTML = `<p class="events__mini-name">${ev.NAME_TH || ev.NAME_EN || ''}</p><p class="events__mini-time">${ev.TIME || ''}</p>`;

      mini.appendChild(imgDiv);
      mini.appendChild(info);
      multiRow.appendChild(mini);
    });
    card.appendChild(multiRow);
  } else {
    const ev = dayEvents[0] || {};
    const imgDiv = document.createElement('div');
    imgDiv.className = 'events__card-img';
    const ph = makePlaceholder(ev.NAME_EN || '');
    imgDiv.appendChild(ph);
    if (ev.IMAGE_URL) {
      imgDiv.innerHTML = '';
      const img = makeImg(ev.IMAGE_URL, ev.NAME_EN);
      if (img) imgDiv.appendChild(img);
    }
    card.appendChild(imgDiv);

    const body = document.createElement('div');
    body.className = 'events__card-body';
    body.innerHTML = `
      <h4 class="events__card-name">${ev.NAME_TH || ev.NAME_EN || ''}</h4>
      <p class="events__card-name-en">${ev.NAME_EN || ''}</p>
      <p class="events__card-time">${ev.TIME || ''}</p>`;
    card.appendChild(body);
  }

  return card;
}

async function initEvents() {
  const grid = document.querySelector('.events__grid');
  if (!grid) return;

  const [recurring, weeklyThu] = await Promise.all([fetchRecurringEvents(), fetchWeeklyThu()]);

  const today = getThaiToday();
  renderTodayCard(recurring, today, weeklyThu);

  grid.innerHTML = '';

  for (let offset = 0; offset < 7; offset++) {
    const info = getThaiToday();
    const dayShift = getThaiDate(offset);
    const dayIdx   = dayShift.dayIdx;
    const dayName  = dayShift.dayName;
    const isThu    = dayName === 'Thursday';
    const isWeekend = dayName === 'Friday' || dayName === 'Saturday' || dayName === 'Sunday';

    let dayEvents = [];
    if (isThu) {
      const thu = weeklyThu.find(e => e.DATE === dayShift.dateStr || !e.DATE) || weeklyThu[0];
      if (thu) dayEvents = [thu];
    } else {
      dayEvents = recurring.filter(e => e.DAY === dayName)
        .sort((a, b) => (a.SLOT || 0) - (b.SLOT || 0));
    }

    if (dayEvents.length === 0 && !isThu) {
      dayEvents = [{ NAME_TH: '—', NAME_EN: '—', TIME: '' }];
    }

    const card = buildWeekCard(dayShift, dayEvents, isThu);
    grid.appendChild(card);
  }

  if (typeof switchLanguage === 'function') switchLanguage(getLang());
}

document.addEventListener('DOMContentLoaded', initEvents);
document.addEventListener('langchange', () => {
  const lang = getLang();
  const t = translations[lang] || translations.th;
  document.querySelectorAll('.events__card-day[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
});
