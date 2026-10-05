// Shared Kit (formerly ConvertKit) V4 helpers for the Vercel functions.
// Files that start with an underscore are not exposed as routes.

const KIT_BASE = 'https://api.kit.com/v4';

export async function kitFetch(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${KIT_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Kit-Api-Key': process.env.KIT_API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { /* leave empty */ }
  return { ok: res.ok, status: res.status, data, raw: text };
}

// Walk a paginated list endpoint and return the first item the matcher accepts.
async function findInList(path, key, matcher, maxPages = 10) {
  let after = null;
  for (let page = 0; page < maxPages; page++) {
    const sep = path.includes('?') ? '&' : '?';
    const qs = after ? `${sep}after=${encodeURIComponent(after)}` : '';
    const { ok, data } = await kitFetch(`${path}${qs}`);
    if (!ok) return null;
    const items = Array.isArray(data[key]) ? data[key] : [];
    const hit = items.find(matcher);
    if (hit) return hit;
    after = data.pagination && data.pagination.has_next_page ? data.pagination.end_cursor : null;
    if (!after) break;
  }
  return null;
}

export async function getAccountName() {
  const r = await kitFetch('/account');
  return r.ok && r.data.account ? r.data.account.name || r.data.account.primary_email_address || 'unknown' : null;
}

// Find a tag by name (case-insensitive), or create it.
export async function ensureTag(name) {
  const lower = name.toLowerCase();
  const found = await findInList('/tags', 'tags', (t) => t.name && t.name.toLowerCase() === lower);
  if (found) return found.id;
  const created = await kitFetch('/tags', { method: 'POST', body: { name } });
  return created.ok && created.data.tag ? created.data.tag.id : null;
}

// Create the subscriber, or return the existing one.
export async function upsertSubscriber(email) {
  const r = await kitFetch('/subscribers', { method: 'POST', body: { email_address: email } });
  const id = r.ok && r.data.subscriber ? r.data.subscriber.id : null;
  return { ok: r.ok, id, status: r.status, raw: r.raw };
}

export async function tagSubscriber(tagId, subscriberId) {
  return kitFetch(`/tags/${tagId}/subscribers/${subscriberId}`, { method: 'POST' });
}

// The V4 form endpoint wants the numeric form id. Accept either the id or the public uid.
export async function resolveFormId(idOrUid) {
  if (!idOrUid) return null;
  if (/^\d+$/.test(String(idOrUid))) return String(idOrUid);
  const form = await findInList('/forms', 'forms', (f) => f.uid === idOrUid);
  return form ? String(form.id) : null;
}

export async function findSequenceId(name) {
  const lower = name.toLowerCase();
  const seq = await findInList('/sequences', 'sequences', (s) => s.name && s.name.toLowerCase() === lower);
  return seq ? seq.id : null;
}

export async function addToSequence(sequenceId, email) {
  return kitFetch(`/sequences/${sequenceId}/subscribers`, { method: 'POST', body: { email_address: email } });
}

export function parseEmail(req) {
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = (body && body.email ? String(body.email) : '').trim().toLowerCase();
  const honeypot = body && body.company ? String(body.company) : '';
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
  return { email, ok, honeypot };
}
