#!/usr/bin/env node
// scripts/sync-guide.mjs
//
// Pulls the Puerto guide from the Google Sheet (public CSV export) and
// writes a normalized JSON file at src/data/guide.json. Zero deps.
//
// Usage:  npm run sync-guide
//
// The sheet MUST be shared as "Anyone with the link — Viewer" for the
// CSV export URL to work anonymously. It is today (usp=sharing).

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHEET_ID = '1GEw-s1u9OrIkQ6BYZFz1ggjhNuaCdSqAX0Ma2O6dYBI';
const SHEET_GID = '0';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const __filename = fileURLToPath(import.meta.url);
const OUT_PATH = resolve(dirname(__filename), '..', 'src', 'data', 'guide.json');

// Minimal RFC4180-ish CSV parser (handles quoted fields, embedded commas, "" escapes, CRLF)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else {
        field += c;
      }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\r') { /* skip; \n will finish the row */ }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else { field += c; }
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

const clean = (v) => (v == null ? '' : String(v).replace(/\s+/g, ' ').trim());
const nullIfEmpty = (v) => { const s = clean(v); return s === '' || s === '-' ? null : s; };

function normalizeDistrict(raw) {
  const s = clean(raw);
  // "Carretera (La Punta)" collapses to Carretera; typos normalized
  return s
    .replace(/^Carretera\s*\(.*\)$/i, 'Carretera')
    .replace(/^Tamarino$/i, 'Tamarindo')
    .replace(/^La Bomba \(walking distance\)$/i, 'La Bomba');
}

function normalizeType(raw) {
  const s = clean(raw).replace(/\//g, ' / ').replace(/\s+/g, ' ');
  // Title-case common variants
  const map = { 'cafe': 'Cafe', 'dinner': 'Dinner', 'lunch': 'Lunch', 'drinks': 'Drinks',
                'bar / club': 'Bar / Club', 'beach spot': 'Beach Spot', 'groceries': 'Groceries',
                'yoga': 'Yoga', 'market': 'Market' };
  return map[s.toLowerCase()] || s;
}

function slugify(s) {
  return String(s).toLowerCase()
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function main() {
  console.log(`Fetching sheet CSV: ${CSV_URL}`);
  const res = await fetch(CSV_URL, { redirect: 'follow' });
  if (!res.ok) {
    console.error(`Failed to fetch CSV (${res.status} ${res.statusText}). Is the sheet set to "Anyone with the link — Viewer"?`);
    process.exit(1);
  }
  const csv = await res.text();
  const rows = parseCsv(csv);

  // Header row is the second row (first row is empty separator in this sheet).
  // Find the row whose first cell is exactly "District".
  const headerIdx = rows.findIndex((r) => clean(r[0]).toLowerCase() === 'district');
  if (headerIdx < 0) { console.error('Could not find a "District" header row.'); process.exit(1); }

  const cols = { district: 0, type: 1, name: 2, nickname: 3, vibe: 4, mustGo: 5,
                 description: 6, orderThis: 7, gmap: 8, instagram: 9, brandGuide: 10 };

  const entries = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    const type = clean(r[cols.type]);
    const name = clean(r[cols.name]);
    const nickname = clean(r[cols.nickname]);
    // Skip section-header rows (Type empty) and rows with no identifier
    if (!type) continue;
    const displayName = name || nickname;
    if (!displayName) continue;
    // Skip meta rows like "Curated Nights" (they have no District+Type real values)
    const district = normalizeDistrict(r[cols.district]);
    if (!district || district.toLowerCase() === 'curated nights') continue;

    entries.push({
      slug: slugify(`${district}-${displayName}`),
      district,
      type: normalizeType(type),
      name: name || null,
      displayName,
      nickname: nickname || null,
      vibe: nullIfEmpty(r[cols.vibe]),
      mustGo: /^x$/i.test(clean(r[cols.mustGo])),
      description: nullIfEmpty(r[cols.description]),
      orderThis: nullIfEmpty(r[cols.orderThis]),
      gmap: nullIfEmpty(r[cols.gmap]),
      instagram: nullIfEmpty(r[cols.instagram]),
    });
  }

  // Sort: MUST GO first, then District, then Type, then Name
  entries.sort((a, b) => {
    if (a.mustGo !== b.mustGo) return a.mustGo ? -1 : 1;
    if (a.district !== b.district) return a.district.localeCompare(b.district);
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return a.displayName.localeCompare(b.displayName);
  });

  const payload = {
    updatedAt: new Date().toISOString(),
    source: `https://docs.google.com/spreadsheets/d/${SHEET_ID}`,
    entries,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${entries.length} entries → ${OUT_PATH}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
