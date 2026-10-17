// GET /api/availability?room=709444&from=2026-10-17&days=365
// Returns the nights that are NOT available for one room, so the date picker
// can grey them out. A night is the date a guest sleeps over.

import { beds24, isDate, isId, fail } from './_beds24.js';

const addDays = (iso, n) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const room = req.query.room;
  if (!isId(room)) return res.status(400).json({ error: 'room is required' });
  const today = new Date().toISOString().slice(0, 10);
  const from = isDate(req.query.from) && req.query.from >= today ? req.query.from : today;
  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 365, 1), 540);
  const to = addDays(from, days);

  try {
    const j = await beds24('/inventory/rooms/availability', {
      roomId: room, startDate: from, endDate: to,
    });
    const rows = Array.isArray(j.data) ? j.data : [];
    const row = rows.find((r) => String(r.roomId) === String(room)) || rows[0] || {};
    const map = row.availability || {};
    const unavailable = [];
    for (const [date, ok] of Object.entries(map)) {
      if (ok !== true && ok !== 1 && ok !== '1') unavailable.push(date);
    }
    unavailable.sort();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ room, from, to, unavailable });
  } catch (e) {
    return fail(res, e);
  }
}
