const CITIES = [
  { name: '서울',       en: 'Seoul',       tz: 'Asia/Seoul' },
  { name: '도쿄',       en: 'Tokyo',       tz: 'Asia/Tokyo' },
  { name: '두바이',     en: 'Dubai',       tz: 'Asia/Dubai' },
  { name: '런던',       en: 'London',      tz: 'Europe/London' },
  { name: '파리',       en: 'Paris',       tz: 'Europe/Paris' },
  { name: '뉴욕',       en: 'New York',    tz: 'America/New_York' },
  { name: '로스앤젤레스', en: 'Los Angeles', tz: 'America/Los_Angeles' },
  { name: '시드니',     en: 'Sydney',      tz: 'Australia/Sydney' },
];

const grid = document.getElementById('clock-grid');
const localInfo = document.getElementById('local-info');

const hmFmtCache = new Map();
const sFmtCache = new Map();
const dateFmtCache = new Map();
const hourFmtCache = new Map();
const offsetFmtCache = new Map();

const get = (cache, key, build) => {
  let v = cache.get(key);
  if (!v) { v = build(); cache.set(key, v); }
  return v;
};

const hmFmt = (tz) => get(hmFmtCache, tz, () => new Intl.DateTimeFormat('en-GB', {
  timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false,
}));
const sFmt = (tz) => get(sFmtCache, tz, () => new Intl.DateTimeFormat('en-GB', {
  timeZone: tz, second: '2-digit',
}));
const dateFmt = (tz) => get(dateFmtCache, tz, () => new Intl.DateTimeFormat('ko-KR', {
  timeZone: tz, month: 'short', day: 'numeric', weekday: 'short',
}));
const hourFmt = (tz) => get(hourFmtCache, tz, () => new Intl.DateTimeFormat('en-GB', {
  timeZone: tz, hour: '2-digit', hour12: false,
}));
const offsetFmt = (tz) => get(offsetFmtCache, tz, () => new Intl.DateTimeFormat('en-US', {
  timeZone: tz, timeZoneName: 'shortOffset',
}));

const hourInTz = (tz, now) => {
  const parts = hourFmt(tz).formatToParts(now);
  return parseInt(parts.find(p => p.type === 'hour').value, 10);
};

const offsetInTz = (tz, now) => {
  const parts = offsetFmt(tz).formatToParts(now);
  const v = parts.find(p => p.type === 'timeZoneName')?.value || '';
  return v.replace('GMT', 'UTC');
};

const tone = (h) => {
  if (h < 5 || h >= 20) return 'night';
  if (h < 8) return 'dawn';
  if (h < 17) return 'day';
  return 'dusk';
};

const cells = CITIES.map((city) => {
  const li = document.createElement('li');
  li.className = 'clock';
  li.dataset.tone = 'night';
  li.innerHTML = `
    <div class="clock-bg" aria-hidden="true"></div>
    <div class="clock-content">
      <div class="city-line">
        <span class="city-name">${city.name}</span>
        <span class="city-en">${city.en}</span>
      </div>
      <time class="time" aria-label="${city.name} 현재 시각">
        <span class="hm">--:--</span><span class="seconds">--</span>
      </time>
      <div class="meta">
        <span class="date">—</span>
        <span class="offset">—</span>
      </div>
    </div>
  `;
  grid.appendChild(li);
  return {
    city,
    el: li,
    bg: li.querySelector('.clock-bg'),
    hm: li.querySelector('.hm'),
    sec: li.querySelector('.seconds'),
    date: li.querySelector('.date'),
    offset: li.querySelector('.offset'),
  };
});

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localDateFmt = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' });

function tick() {
  const now = new Date();
  for (const c of cells) {
    c.hm.textContent = hmFmt(c.city.tz).format(now);
    c.sec.textContent = sFmt(c.city.tz).format(now);
    c.date.textContent = dateFmt(c.city.tz).format(now);
    c.offset.textContent = offsetInTz(c.city.tz, now);
    const t = tone(hourInTz(c.city.tz, now));
    if (c.el.dataset.tone !== t) c.el.dataset.tone = t;
  }
  localInfo.textContent = `현재 위치 ${localTz} · ${localDateFmt.format(now)}`;
}

tick();
setInterval(tick, 1000);
