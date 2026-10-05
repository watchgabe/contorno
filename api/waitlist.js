// Vercel serverless function: POST /api/waitlist
// Subscribes email to a Kit (formerly ConvertKit) form via the V4 API,
// then applies a tag by name.
//
// Env vars required on Vercel (Production + Preview):
//   KIT_API_KEY   - V4 key, starts with "kit_"
//   KIT_FORM_UID  - form id (numeric) or public uid (e.g. "1b272f8845")
//   KIT_TAG_NAME  - (optional) tag name to apply, e.g. "contorno-stay-waitlist"

import {
  ensureTag, upsertSubscriber, tagSubscriber, resolveFormId, kitFetch, parseEmail,
} from './_kit.js';

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

  const { email, ok } = parseEmail(req);
  if (!ok) {
    return res.status(400).json({ error: 'Please provide a valid email.' });
  }

  try {
    const debug = req.query && req.query.debug === '1';

    // 1) Add to the form. The V4 endpoint needs the numeric form id, so accept the public uid too.
    const formId = await resolveFormId(KIT_FORM_UID);
    let subscriberId = null;
    if (formId) {
      const sub = await kitFetch(`/forms/${formId}/subscribers`, { method: 'POST', body: { email_address: email } });
      if (sub.ok) {
        subscriberId = (sub.data.subscriber && sub.data.subscriber.id) || null;
      } else {
        console.error('Kit form subscribe error', sub.status, sub.raw);
      }
    } else {
      console.error('Kit form not found for', KIT_FORM_UID);
    }

    // 2) If the form step did not work, still save the subscriber so the signup is not lost.
    if (!subscriberId) {
      const sub = await upsertSubscriber(email);
      if (!sub.ok || !sub.id) {
        console.error('Kit subscriber error', sub.status, sub.raw);
        const detail = debug ? ` [${sub.status}: ${String(sub.raw).slice(0, 200)}]` : '';
        return res.status(502).json({ error: 'Subscription service is unavailable.' + detail });
      }
      subscriberId = sub.id;
    }

    // 3) Apply the tag (best effort, created if it does not exist).
    if (KIT_TAG_NAME && subscriberId) {
      try {
        const tagId = await ensureTag(KIT_TAG_NAME);
        if (tagId) {
          const tagRes = await tagSubscriber(tagId, subscriberId);
          if (!tagRes.ok) console.error('Kit tag error', tagRes.status, tagRes.raw);
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
