// Vercel serverless function: POST /api/waitlist
// Subscribes email to a Kit (formerly ConvertKit) form via the V4 API,
// then applies a tag by name.
//
// Env vars required on Vercel (Production + Preview):
//   KIT_API_KEY   - V4 key, starts with "kit_"
//   KIT_FORM_UID  - public form UID (e.g. "1b272f8845")
//   KIT_TAG_NAME  - (optional) tag name to apply, e.g. "contorno-stay-waitlist"

const KIT_BASE = 'https://api.kit.com/v4';

// Module-level cache so warm invocations skip the tag lookup
let cachedTagId = null;
let cachedTagName = null;
let cachedFormId = null;
let cachedFormKey = null;

async function kitFetch(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${KIT_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Kit-Api-Key': process.env.KIT_API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { /* leave empty */ }
  return { ok: res.ok, status: res.status, data, raw: text };
}

async function resolveTagId(tagName) {
  if (!tagName) return null;
  if (cachedTagId && cachedTagName === tagName) return cachedTagId;

  // V4: GET /tags returns { tags: [{ id, name, ... }], pagination: {...} }
  let after = null;
  for (let page = 0; page < 5; page++) {
    const qs = after ? `?after=${encodeURIComponent(after)}` : '';
    const { ok, data } = await kitFetch(`/tags${qs}`);
    if (!ok) break;
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const match = tags.find(t => t.name && t.name.toLowerCase() === tagName.toLowerCase());
    if (match) {
      cachedTagId = match.id;
      cachedTagName = tagName;
      return match.id;
    }
    after = data.pagination && data.pagination.has_next_page ? data.pagination.end_cursor : null;
    if (!after) break;
  }
  return null;
}

// Kit V4 form endpoints require the NUMERIC form id (e.g. 1234567), not the
// hex embed UID (e.g. "1b272f8845") used in V3 / embed snippets. If the
// configured value isn't numeric, look the form up via GET /v4/forms and
// match it against the form's id / uid / embed url, then use the numeric id.
async function resolveFormId(configured) {
  if (!configured) return null;
  const value = String(configured).trim();
  if (/^\d+$/.test(value)) return value;
  if (cachedFormId && cachedFormKey === value) return cachedFormId;

  let after = null;
  for (let page = 0; page < 10; page++) {
    const qs = after ? `?after=${encodeURIComponent(after)}` : '';
    const { ok, data } = await kitFetch(`/forms${qs}`);
    if (!ok) break;
    const forms = Array.isArray(data.forms) ? data.forms : [];
    const match = forms.find((f) => {
      const blob = [f.id, f.uid, f.embed_url, f.embed_js, f.url, f.slug]
        .filter(Boolean)
        .map(String)
        .join(' ');
      return blob.includes(value);
    });
    if (match && match.id != null) {
      cachedFormId = String(match.id);
      cachedFormKey = value;
      return cachedFormId;
    }
    after = data.pagination && data.pagination.has_next_page ? data.pagination.end_cursor : null;
    if (!after) break;
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { KIT_API_KEY, KIT_FORM_UID, KIT_TAG_NAME } = process.env;
  if (!KIT_API_KEY || !KIT_FORM_UID) {
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  // Parse body (Vercel auto-parses JSON; handle string fallback)
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }

  const debug = req.query && req.query.debug === '1';

  try {
    // 0) Resolve the numeric form id (Kit V4 needs the numeric id, not the
    //    hex embed UID). Self-heals whether the env var holds either value.
    const formId = await resolveFormId(KIT_FORM_UID);
    if (!formId) {
      console.error('Kit form not resolvable from KIT_FORM_UID:', KIT_FORM_UID);
      const detail = debug
        ? ` [KIT_FORM_UID="${KIT_FORM_UID}" is not a numeric Kit V4 form id and no matching form was found via GET /v4/forms]`
        : '';
      return res.status(502).json({ error: 'Subscription service is unavailable.' + detail });
    }

    // 1) Subscribe to the form
    const sub = await kitFetch(`/forms/${formId}/subscribers`, {
      method: 'POST',
      body: { email_address: email },
    });

    if (!sub.ok) {
      console.error('Kit subscribe error', sub.status, sub.raw);
      // Surface the real error in debug mode so the UI can show it
      const detail = debug ? ` [${sub.status}: ${sub.raw.slice(0, 200)}]` : '';
      return res.status(502).json({ error: 'Subscription service is unavailable.' + detail });
    }

    const subscriberId =
      (sub.data.subscriber && sub.data.subscriber.id) ||
      (sub.data.subscribers && sub.data.subscribers[0] && sub.data.subscribers[0].id) ||
      null;

    // 2) Apply tag (best-effort; don't fail the request if tagging fails)
    if (KIT_TAG_NAME && subscriberId) {
      try {
        const tagId = await resolveTagId(KIT_TAG_NAME);
        if (tagId) {
          const tagRes = await kitFetch(`/tags/${tagId}/subscribers/${subscriberId}`, {
            method: 'POST',
          });
          if (!tagRes.ok) {
            console.error('Kit tag error', tagRes.status, tagRes.raw);
          }
        } else {
          console.error('Kit tag not found:', KIT_TAG_NAME);
        }
      } catch (tagErr) {
        console.error('Kit tag exception', tagErr);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Waitlist handler error', err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
