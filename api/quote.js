// GET /api/quote?room=709444&arrival=2026-12-10&departure=2026-12-13&adults=2
// Asks the booking system for the price of one stay in one room.

import { beds24, isDate, isId, fail } from './_beds24.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { room, arrival, departure } = req.query;
  const adults = Math.min(Math.max(parseInt(req.query.adults, 10) || 2, 1), 10);
  const property = process.env.BEDS24_PROPERTY_ID;
  if (!isId(room) || !isDate(arrival) || !isDate(departure) || departure <= arrival || !property) {
    return res.status(400).json({ error: 'invalid request' });
  }
  try {
    const j = await beds24('/inventory/rooms/offers', {
      propertyId: property, arrival, departure, numAdults: String(adults),
    });
    const rows = Array.isArray(j.data) ? j.data : [];
    const row = rows.find((r) => String(r.roomId) === String(room));
    const offer = row && Array.isArray(row.offers) ? row.offers[0] : null;
    const nights = Math.round((Date.parse(departure) - Date.parse(arrival)) / 86400000);
    res.setHeader('Cache-Control', 's-maxage=60');
    if (!offer) return res.status(200).json({ available: false, nights });
    const total = Number(offer.price);
    return res.status(200).json({
      available: Number.isFinite(total) && total > 0,
      nights,
      total,
      currency: 'MXN',
      perNight: Number.isFinite(total) ? Math.round(total / nights) : null,
    });
  } catch (e) {
    return fail(res, e);
  }
}
