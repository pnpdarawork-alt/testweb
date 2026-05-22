/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Cloudflare Worker
   Routes Google Sheets API → clean JSON
   Env secrets: GOOGLE_API_KEY
═══════════════════════════════════════════════════════ */

const SPREADSHEET_ID = '1irZdpSaHsQ_-e4UbMF_cgNmjkxP0ZnHBw_A11oPZUAM';

const ROUTES = {
  '/hero':       { sheet: 'Hero_Images',      filter: r => r.STATUS === 'active',                          sort: (a,b) => (a.ORDER||0)-(b.ORDER||0) },
  '/recurring':  { sheet: 'Recurring_Events', filter: r => r.STATUS === 'active',                          sort: null },
  '/weekly-thu': { sheet: 'Weekly_THU',       filter: r => r.STATUS === 'active' || r.STATUS === 'draft',  sort: null },
  '/promotion':  { sheet: 'Promotion',        filter: r => r.STATUS === 'active',                          sort: (a,b) => (a.ORDER||0)-(b.ORDER||0) },
  '/gallery':    { sheet: 'Gallery',          filter: r => r.STATUS === 'active',                          sort: (a,b) => (a.ORDER||0)-(b.ORDER||0) },
};

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS, ...extraHeaders },
  });
}

async function fetchSheet(sheetName, apiKey, useCache, ctx) {
  const cacheKey = `https://vck-sheets-cache/${sheetName}`;
  const cache    = caches.default;

  if (useCache) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached.json();
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API ${res.status} for ${sheetName}`);

  const raw  = await res.json();
  const rows = raw.values || [];
  if (rows.length < 2) return [];

  const headers = rows[0];
  const data    = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] ?? ''; });
    return obj;
  });

  if (useCache) {
    const cacheRes = new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    });
    ctx.waitUntil(cache.put(cacheKey, cacheRes));
  }

  return data;
}

export default {
  async fetch(request, env, ctx) {
    const url    = new URL(request.url);
    const path   = url.pathname;
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const route = ROUTES[path];
    if (!route) {
      return json({ error: 'Not found', routes: Object.keys(ROUTES) }, 404);
    }

    const apiKey = env.GOOGLE_API_KEY;
    if (!apiKey) {
      return json({ error: 'GOOGLE_API_KEY secret not configured' }, 500);
    }

    try {
      let data = await fetchSheet(route.sheet, apiKey, !forceRefresh, ctx);
      data = data.filter(route.filter);
      if (route.sort) data = data.sort(route.sort);
      return json(data, 200, { 'Cache-Control': 'public, max-age=86400' });
    } catch (err) {
      return json({ error: err.message }, 502);
    }
  },

  /* Daily scheduled purge so fresh data loads next request */
  async scheduled(event, env, ctx) {
    const cache = caches.default;
    for (const route of Object.values(ROUTES)) {
      await cache.delete(`https://vck-sheets-cache/${route.sheet}`);
    }
  },
};
