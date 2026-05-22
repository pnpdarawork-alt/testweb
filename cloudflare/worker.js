/* ═══════════════════════════════════════════════════════
   VCK COOL SPACE — Cloudflare Worker
   Routes Google Sheets API → clean JSON
   Auth: Google Service Account JWT (OAuth2)
   Env secrets: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY
═══════════════════════════════════════════════════════ */

const ROUTES = {
  '/hero':       { sheet: 'Hero_Images',      filter: r => r.STATUS === 'active',                         sort: (a,b) => (a.ORDER||0)-(b.ORDER||0) },
  '/recurring':  { sheet: 'Recurring_Events', filter: r => r.STATUS === 'active',                         sort: null },
  '/weekly-thu': { sheet: 'Weekly_THU',       filter: r => r.STATUS === 'active' || r.STATUS === 'draft', sort: null },
  '/promotion':  { sheet: 'Promotion',        filter: r => r.STATUS === 'active',                         sort: (a,b) => (a.ORDER||0)-(b.ORDER||0) },
  '/gallery':    { sheet: 'Gallery',          filter: r => r.STATUS === 'active',                         sort: (a,b) => (a.ORDER||0)-(b.ORDER||0) },
  '/service':    { sheet: 'Service',          filter: r => r.STATUS === 'active',                         sort: (a,b) => (Number(a.ID)||0)-(Number(b.ID)||0) },
};

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/* ── JWT helpers (Web Crypto API) ── */

function base64urlEncode(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function arrayBufferToBase64url(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function importPrivateKey(pem) {
  /* Secrets set via wrangler may use literal \n; normalise both forms. */
  const pemStr = pem.replace(/\\n/g, '\n');
  const body   = pemStr
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s+/g, '');
  const der = Uint8Array.from(atob(body), c => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'pkcs8',
    der.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

async function getAccessToken(email, privateKeyPem) {
  const key = await importPrivateKey(privateKeyPem);
  const now = Math.floor(Date.now() / 1000);

  const header  = base64urlEncode({ alg: 'RS256', typ: 'JWT' });
  const payload = base64urlEncode({
    iss:   email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud:   'https://oauth2.googleapis.com/token',
    iat:   now,
    exp:   now + 3600,
  });

  const sigInput = `${header}.${payload}`;
  const sigBuf   = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(sigInput),
  );
  const jwt = `${sigInput}.${arrayBufferToBase64url(sigBuf)}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed (${res.status}): ${err}`);
  }
  const { access_token } = await res.json();
  return access_token;
}

/* ── Sheets fetcher ── */

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS, ...extra },
  });
}

function rowsToObjects(values) {
  if (!values || values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    return obj;
  });
}

async function fetchSheet(sheetName, spreadsheetId, accessToken, useCache, ctx) {
  const cacheKey = `https://vck-sheets-cache/${sheetName}`;
  const cache    = caches.default;

  if (useCache) {
    const cached = await cache.match(cacheKey);
    if (cached) return cached.json();
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}`;
  const res  = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Sheets API ${res.status} for ${sheetName}`);

  const { values } = await res.json();
  const data = rowsToObjects(values);

  /* Always repopulate the cache after a live Sheets fetch, even on
     refresh=true, so subsequent normal requests get the fresh data. */
  ctx.waitUntil(cache.put(
    cacheKey,
    new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=86400' },
    }),
  ));

  return data;
}

/* ── Request handler (called from outer try/catch) ── */

async function handleRequest(request, env, ctx) {
  const url          = new URL(request.url);
  const path         = url.pathname;
  const forceRefresh = url.searchParams.get('refresh') === 'true';

  // CORS preflight
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

  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, SPREADSHEET_ID } = env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    return json({ error: 'Google service account secrets not configured' }, 500);
  }
  if (!SPREADSHEET_ID) {
    return json({ error: 'SPREADSHEET_ID not configured' }, 500);
  }

  try {
    const token = await getAccessToken(GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY);
    let data    = await fetchSheet(route.sheet, SPREADSHEET_ID, token, !forceRefresh, ctx);
    data        = data.filter(route.filter);
    if (route.sort) data = data.sort(route.sort);
    return json(data, 200, { 'Cache-Control': 'public, max-age=86400' });
  } catch (err) {
    return json({ error: err.message }, 502);
  }
}

/* ── Worker entry points ── */

export default {
  async fetch(request, env, ctx) {
    /* Outer try/catch ensures CORS headers are present on ALL responses,
       including unexpected runtime errors that would otherwise return a
       Cloudflare-generated 500 with no CORS headers. */
    try {
      return await handleRequest(request, env, ctx);
    } catch (err) {
      return new Response(JSON.stringify({ error: `Unhandled: ${err.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS },
      });
    }
  },

  /* Daily cron: purge cache so next request fetches fresh data */
  async scheduled(_event, _env, ctx) {
    const cache = caches.default;
    ctx.waitUntil(
      Promise.all(
        Object.values(ROUTES).map(r => cache.delete(`https://vck-sheets-cache/${r.sheet}`)),
      ),
    );
  },
};
