# Contorno website: project context

This file is read automatically at the start of every Claude Code session. It is the briefing for anyone, human or Claude, who changes the site.

## What this is

The website for **Contorno**, a creative collective and property on La Punta, Puerto Escondido, Oaxaca. Nick Paloukos owns Contorno and developed it.

- Live: https://www.contornocollective.com
- Repo: https://github.com/watchgabe/contorno
- Instagram: https://instagram.com/contornocollective
- Contact: hello@contornocollective.com

While the site is in review the whole site is behind a password (see Gate below), except the Puerto Guide at `/guide`, which is public.

## Tech

- **Astro 4**: builds plain HTML, CSS and JS into `dist/`.
- **Vercel**: hosts the site. Every push to `main` deploys to the live site in about a minute. The serverless code in `api/` runs on Vercel.
- **GoDaddy**: registrar and DNS. **Google Workspace**: email for hello@contornocollective.com.
- **Beds24 (Prestige Booking)**: availability and prices for the homes. **Google Apps Script**: receives residency applications into a Google Sheet and emails hello@.
- **Stripe**: not connected yet. The checkout at `/checkout` is a demo with a simulated payment. Leave it exactly as it is.

## Pages and where to edit them

| Page | File |
|---|---|
| Home (`/`) | `src/pages/index.astro` |
| The build (`/build`) | `src/pages/build.astro` |
| Artist residency and the application form (`/artist-residency`) | `src/pages/artist-residency.astro`, form logic in `public/apply-form.js` |
| Inspiration (`/inspiration`) | `src/pages/inspiration.astro` (swap the `images` list) |
| Puerto Guide (`/guide`) | `src/pages/guide.astro`, data in `src/data/guide.json` |
| Home pages for each unit (`/homes/<slug>`, `/penthouse`) | `src/pages/homes/[slug].astro`, content in `src/data/homes.ts` |
| Checkout demo (`/checkout`) | `src/pages/checkout.astro`, `public/checkout-demo.js` |
| Menu | `src/components/Nav.astro` |
| Footer | `src/components/Footer.astro` |
| Colors, fonts, shared CSS | `src/styles/global.css` |
| `<head>`, fonts, page shell | `src/layouts/BaseLayout.astro` |
| Booking and form servers | `api/` (`availability.js`, `quote.js`, `apply.js`, `_beds24.js`) |
| Site password | `middleware.js` |
| Photos | `public/img/` |

New page: add `src/pages/<name>.astro` and it becomes `/<name>`.

The four homes: La Escultura (Penthouse, available), La Valquiria (Loft 5, available), La Artista (Loft 1, coming soon), La Poeta (Loft 6, coming soon). Several details on the coming soon homes are bracketed placeholders until confirmed.

## Gate

`middleware.js` password-protects every page while the site is private. Ask Gabe for the word; it can be changed with the `GATE_PASSWORD` setting in Vercel. `/guide` is the only open page. To launch publicly, delete `middleware.js`.

## Brand

- Colors (CSS variables in `global.css`): terracotta `--rust` `#C0583A`, charcoal `#2A2A2A`, cream `#F5F0E8`, offwhite `#FBF9F4`.
- Fonts: Gabarito for display, DM Sans for body, DM Mono for small labels.
- Neon yellow is only for hand drawn marks. No Cormorant italic inside headlines.
- Reference page: `/brandguide.html`.

## Writing rules (always)

- **Never use em dashes.** Not in copy, page titles, alt text or code comments. Use periods, commas, colons or line breaks.
- **Never say "cohort."** Use "residency," "round" or "artist." The residency hosts one artist at a time.
- **Never write about an architect.** Not as a character, a founder or a story beat. The word "architecture" as a design idea is fine.
- **Never call the email list a "newsletter."** It is "a note from us."
- **No hype or resort language.** No "paradise," "oasis," "luxurious," no superlative stacks, no "y'all" or "hey guys." Use specific details instead of adjectives.
- **Avoid AI copy patterns:** stacked sentences with the same opening, "it's not X, it's Y," lists of fragments like "No X. No Y.," rhetorical questions, "here's the thing," the word "shift," sentences starting with "Most," and bold, italic or underline inside copy. Write direct statements with natural connectors (so, but, because).
- Name the material, the place and the person. Credit local businesses and artists by name.
- Do not invent facts. Prices, dates, sizes and status that are not confirmed go in [brackets] and get raised with Gabe.

## Safety rules

- **Never touch email DNS** (MX, SPF, DKIM, DMARC, Google verification, NS, SOA). It would break hello@contornocollective.com instantly. These live in GoDaddy, not in this repo.
- Never add `public/CNAME`. Never add `base: '/contorno'` to `astro.config.mjs`.
- Never put keys, passwords or tokens in the repo or in chat. Secrets go only into Vercel environment variables.
- Run `npm run build` before pushing. A failed build does not update the live site.

## Working and deploying

- Dev server: `npm run dev` (http://localhost:4321). Booking and the form need Vercel keys, so they do not work locally.
- Build: `npm run build`.
- Push to `main` goes live in about a minute. For a large change, work on a branch first and show the result before merging.
- To undo a bad change, revert the commit or roll back the deployment in the Vercel dashboard.

## People

- Nick Paloukos: owner and developer of Contorno.
- Gabe Harris: marketing, builds and runs the website with Claude.
