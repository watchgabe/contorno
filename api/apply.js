// POST /api/apply
// Receives a residency application from the site, checks it, and passes it to
// a Google Apps Script web app that adds a row to a Google Sheet and emails
// hello@contornocollective.com.
//
// Env (Vercel): APPLY_WEBHOOK_URL, the web app URL of the Apps Script.

const LIMITS = { short: 300, long: 4000 };
const FIELDS = {
  name: ['short', true], email: ['short', true], based: ['short', true],
  instagram: ['short', false], portfolio: ['short', true], make: ['long', true],
  pieces: ['long', true], now: ['long', false], sentence: ['short', false],
  why: ['long', true], idea: ['long', false], unlock: ['long', false],
  notes: ['long', false], heard: ['short', false],
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : (req.body || {});
  // Spam checks: a hidden field people never see, and a form filled in too fast.
  if (body.company) return res.status(200).json({ ok: true });
  if (Number(body.elapsed) < 3) return res.status(400).json({ error: 'Please take a moment and try again.' });

  const clean = {};
  for (const [key, [kind, required]] of Object.entries(FIELDS)) {
    const v = String(body[key] ?? '').trim();
    if (required && !v) return res.status(400).json({ error: 'Please fill in every required field.', field: key });
    if (v.length > LIMITS[kind]) return res.status(400).json({ error: 'One of the answers is too long.', field: key });
    clean[key] = v;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean.email)) return res.status(400).json({ error: 'Please enter a valid email.', field: 'email' });
  if (!/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}/.test(clean.portfolio)) return res.status(400).json({ error: 'Please enter a link to your portfolio or website.', field: 'portfolio' });

  const url = process.env.APPLY_WEBHOOK_URL;
  if (!url) return res.status(503).json({ error: 'not_configured' });

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...clean, submitted: new Date().toISOString() }),
      redirect: 'follow',
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) throw new Error(j.error || `status_${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ error: 'send_failed' });
  }
}

function safeParse(s) { try { return JSON.parse(s); } catch (e) { return {}; } }
