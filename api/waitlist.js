// Vercel serverless function: POST /api/waitlist
// Subscribes email to a ConvertKit form (Contorno account).
// Env vars required on Vercel:
//   CONVERTKIT_API_SECRET   - from CK Settings → Advanced
//   CONVERTKIT_FORM_ID      - numeric form id from CK
//   CONVERTKIT_TAG_ID       - (optional) numeric tag id

export default async function handler(req, res) {
  // CORS — same-origin in prod, but harmless to set permissively for previews
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { CONVERTKIT_API_SECRET, CONVERTKIT_FORM_ID, CONVERTKIT_TAG_ID } = process.env;

  if (!CONVERTKIT_API_SECRET || !CONVERTKIT_FORM_ID) {
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  // Parse body (Vercel parses JSON automatically, but handle form-encoded too)
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { /* keep as string */ }
  }
  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }

  try {
    const ckUrl = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;
    const ckRes = await fetch(ckUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_secret: CONVERTKIT_API_SECRET,
        email,
        tags: CONVERTKIT_TAG_ID ? [Number(CONVERTKIT_TAG_ID)] : undefined,
      }),
    });

    if (!ckRes.ok) {
      const text = await ckRes.text();
      console.error('ConvertKit error', ckRes.status, text);
      return res.status(502).json({ error: 'Subscription service is unavailable.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist handler error', err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
