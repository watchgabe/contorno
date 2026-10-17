// Shared helper for the Beds24 / Prestige Booking API v2.
// Env (Vercel): BEDS24_REFRESH_TOKEN (secret), BEDS24_PROPERTY_ID.
// The refresh token is exchanged for a 24 hour access token, cached in memory
// for as long as the serverless instance stays warm.

const BASE = 'https://beds24.com/api/v2';
let cached = { token: null, exp: 0 };

export async function accessToken() {
  const now = Date.now();
  if (cached.token && cached.exp - 60_000 > now) return cached.token;
  const refresh = process.env.BEDS24_REFRESH_TOKEN;
  if (!refresh) throw new Error('not_configured');
  const r = await fetch(`${BASE}/authentication/token`, { headers: { refreshToken: refresh } });
  if (!r.ok) throw new Error(`token_${r.status}`);
  const j = await r.json();
  cached = { token: j.token, exp: now + (Number(j.expiresIn) || 3600) * 1000 };
  return cached.token;
}

export async function beds24(path, params = {}) {
  const token = await accessToken();
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`${BASE}${path}${qs ? `?${qs}` : ''}`, { headers: { token } });
  if (!r.ok) throw new Error(`api_${r.status}`);
  return r.json();
}

export const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || ''));
export const isId = (s) => /^\d{1,12}$/.test(String(s || ''));

export function fail(res, e) {
  const msg = String(e && e.message || e);
  const status = msg === 'not_configured' ? 503 : 502;
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json({ error: 'availability_unavailable', detail: msg });
}
