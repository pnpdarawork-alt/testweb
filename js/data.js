/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Data Layer
   Fetches from Cloudflare Worker API, falls back to FALLBACK.
═══════════════════════════════════════════════════════ */

const API_BASE = 'https://vck-data.panupondara-work.workers.dev';

async function _fetch(path, fallbackKey) {
  try {
    const res = await fetch(API_BASE + path, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch {
    if (typeof FALLBACK !== 'undefined' && FALLBACK[fallbackKey]) {
      return FALLBACK[fallbackKey];
    }
    return [];
  }
}

async function fetchHeroImages()      { return _fetch('/hero',       'heroImages'); }
async function fetchRecurringEvents() { return _fetch('/recurring',  'recurringEvents'); }
async function fetchWeeklyThu()       { return _fetch('/weekly-thu', 'weeklyThu'); }
async function fetchPromotion()       { return _fetch('/promotion',  'promotion'); }
async function fetchGallery()         { return _fetch('/gallery',    'gallery'); }
