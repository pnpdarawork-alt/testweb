/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Data Layer
   Fetches from Cloudflare Worker API, falls back to FALLBACK.
═══════════════════════════════════════════════════════ */

const API_BASE = 'https://vck-data.panupondara-work.workers.dev';

async function _fetch(path, fallbackKey) {
  try {
    const res = await fetch(API_BASE + path, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${API_BASE + path}`);
    const data = await res.json();
    console.log(`[data] ✓ ${path} — ${Array.isArray(data) ? data.length + ' rows' : 'object'}`, data);
    return data;
  } catch (err) {
    console.error(`[data] ✗ fetch ${path} failed:`, err.message || err);
    if (typeof FALLBACK !== 'undefined' && FALLBACK[fallbackKey]) {
      console.warn(`[data] using fallback data for "${fallbackKey}"`);
      return FALLBACK[fallbackKey];
    }
    console.warn(`[data] no fallback for "${fallbackKey}", returning []`);
    return [];
  }
}

async function fetchHeroImages()      { return _fetch('/hero',       'heroImages'); }
async function fetchRecurringEvents() { return _fetch('/recurring',  'recurringEvents'); }
async function fetchWeeklyThu()       { return _fetch('/weekly-thu', 'weeklyThu'); }
async function fetchPromotion()       { return _fetch('/promotion',  'promotion'); }
async function fetchGallery()         { return _fetch('/gallery',    'gallery'); }
