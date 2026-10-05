// Vercel serverless function: POST /api/guide
// Saves the email in Kit, tags it, and adds it to the guide delivery sequence
// so the Puerto Guide email goes out.
//
// Env vars (Production + Preview):
//   KIT_API_KEY         V4 key, starts with "kit_"
//   KIT_GUIDE_TAG       optional, tag to apply (default "contorno-puerto-guide")
//   KIT_GUIDE_SEQUENCE  optional, sequence name (default "Puerto Guide delivery")
//
// Add ?debug=1 to see which Kit steps worked.

import {
  getAccountName, ensureTag, upsertSubscriber, tagSubscriber,
  findSequenceId, addToSequence, parseEmail,
} from './_kit.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.KIT_API_KEY) return res.status(500).json({ error: 'Server is not configured.' });

  const { email, ok, honeypot } = parseEmail(req);
  if (honeypot) return res.status(200).json({ ok: true }); // bots get a quiet success
  if (!ok) return res.status(400).json({ error: 'Please enter a valid email.' });

  const debug = req.query && req.query.debug === '1';
  const steps = {};
  const tagName = process.env.KIT_GUIDE_TAG || 'contorno-puerto-guide';
  const seqName = process.env.KIT_GUIDE_SEQUENCE || 'Puerto Guide delivery';

  try {
    if (debug) steps.account = await getAccountName();

    const sub = await upsertSubscriber(email);
    steps.subscriber = sub.ok;
    if (!sub.ok || !sub.id) {
      console.error('Kit subscriber error', sub.status, sub.raw);
      return res.status(502).json({
        error: 'Could not save your email. Please try again.',
        ...(debug ? { steps, detail: `${sub.status}: ${String(sub.raw).slice(0, 200)}` } : {}),
      });
    }

    // Tag and sequence are best effort. The email is already saved.
    try {
      const tagId = await ensureTag(tagName);
      steps.tag = tagId ? (await tagSubscriber(tagId, sub.id)).ok : false;
    } catch (e) { steps.tag = false; console.error('Kit tag error', e); }

    try {
      const seqId = await findSequenceId(seqName);
      steps.sequenceFound = Boolean(seqId);
      if (seqId) steps.sequenceAdded = (await addToSequence(seqId, email)).ok;
    } catch (e) { steps.sequenceAdded = false; console.error('Kit sequence error', e); }

    return res.status(200).json({ ok: true, ...(debug ? { steps } : {}) });
  } catch (err) {
    console.error('Guide handler error', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
