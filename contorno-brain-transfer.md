# Contorno Collective — Complete Brain Transfer

> **Purpose of this file:** A complete knowledge dump about Contorno Collective — the brand, the website, the tech stack, the DNS setup, the deploy flow, and the history of decisions made so far. Paste this into any new AI chat, upload it as a knowledge file to a custom GPT / Claude Project / Notion AI, or feed it to any RAG system to bootstrap full context in one shot.
>
> **Last updated:** 2026-09-30
> **Owner:** Gabe (gabe@golocalgroup.com)
> **Public contact:** hello@contornocollective.com

---

## 1. What Contorno Is

**Contorno Collective** is an arts collective documenting the process of building in **Puerto Escondido, Oaxaca, México**. The brand and website are wrapped around a single core idea: **not a finished thing — a thing becoming.** The site is a real-time record of construction: the decisions made on site, the materials handled by hand, the moments between the plans and the pour. It follows two principals — **Nick and Ricardo** — through the arc of building, from raw land to finished structure, told in photographs and in real time.

- **Location:** Puerto Escondido, Oaxaca, México (roughly 15.8442° N, 97.0418° W)
- **Timeframe on site:** 2026
- **Public voice:** documentary, restrained, quiet-modernist. Lowercase headings. Present tense.

---

## 2. Brand Guidelines

Canonical brand reference lives at: **https://contornocollective.com/brandguide.html**

### 2.1 Color palette

Defined as CSS custom properties on `:root` in `src/styles/global.css`:

| Token | Hex | Role |
|---|---|---|
| `--terracotta` | `#C0583A` | Primary accent (links, CTAs, dividers) |
| `--charcoal` | `#2A2A2A` | Body text, high-contrast surfaces |
| `--cream` | `#EDE6D6` | Primary background |
| `--offwhite` | `#F5F0E8` | Secondary / card backgrounds |

### 2.2 Typography

Loaded via Google Fonts in `src/layouts/BaseLayout.astro`:

| Font | Role | Weights used |
|---|---|---|
| **Gabarito** | Display / headlines | 400, 500, 600, 700 |
| **DM Sans** | Body copy + uppercase labels (replaces any monospace usage) | 300, 400, 500, 700 |
| **Cormorant Garamond** | Italic accents (used inside `<em>` in intros / editorial callouts) | 300, 400, italic 300, italic 400 |

Voice: DM Sans uppercase for labels/meta, **not** a monospace. Any prior use of DM Mono or Inter has been replaced.

### 2.3 Editorial conventions

- **Lowercase** for nav labels, section headings, buttons ("artist residency", "work", "about", "contact →").
- **Em dashes** ( — ) for pause and emphasis, not colons.
- **Italic phrases** (Cormorant) used sparingly inside otherwise sans headlines for editorial rhythm.
- **Geographic coordinates** sometimes appear as a subtle mark of place ("15.8442° N / 97.0418° W").

---

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro 4.16** | Static site generator, outputs plain HTML/CSS/JS to `dist/` |
| Hosting | **Vercel** | Auto-deploys on push to `main`, PR previews on every branch |
| Registrar / DNS | **GoDaddy** | Owns `contornocollective.com` |
| Email | **Google Workspace** | Serves `hello@contornocollective.com` |
| Repo | **GitHub** | `watchgabe/contorno` |

### 3.1 URLs

- **Production:** https://contornocollective.com (redirects apex → `www` via 308)
- **Canonical (with `www`):** https://www.contornocollective.com
- **Vercel-assigned URL:** https://contorno.vercel.app
- **Old GitHub Pages URL (still live but stale):** https://watchgabe.github.io/contorno/ — should be turned off eventually
- **Repo:** https://github.com/watchgabe/contorno
- **Brand guide (live):** https://contornocollective.com/brandguide.html

---

## 4. Repo Structure

```
contorno/
├── astro.config.mjs            ← site URL config, no base path (was /contorno on Pages)
├── package.json                ← npm scripts (dev / build / preview)
├── package-lock.json
├── .gitignore
├── CLAUDE.md                   ← project instructions loaded automatically each session
├── contorno-brain-transfer.md  ← THIS FILE — full context dump
├── arc.html                    ← legacy standalone ARC page (kept at repo root, also copied to public/)
├── public/
│   ├── arc.html                ← legacy ARC page (served at /arc.html)
│   ├── brandguide.html         ← brand guidelines reference page (served at /brandguide.html)
│   └── Edited copy/            ← brand photo/video assets (hundreds of jpg/mp4 files)
└── src/
    ├── env.d.ts
    ├── layouts/
    │   └── BaseLayout.astro    ← <head>, fonts, page shell — wraps EVERY page
    ├── components/
    │   ├── Nav.astro           ← top nav (links + contact email)
    │   └── Footer.astro        ← footer (links + contact email)
    ├── pages/
    │   ├── index.astro         ← homepage content only
    │   └── artist-residency.astro  ← /artist-residency page
    └── styles/
        └── global.css          ← brand colors, fonts, all site-wide CSS
```

### 4.1 Shared components — the whole point of the Astro conversion

The site was originally a set of standalone `.html` files. It was converted to Astro **specifically** to make edits atomic across pages:

- Change **one file** → **every page** picks up the change.
- The `Nav` and `Footer` components hold the shared contact email and link set.
- The `BaseLayout` holds the `<head>`, font imports, and page shell.

### 4.2 Where to make each kind of change

| Kind of change | File to edit |
|---|---|
| Nav links / contact email in nav | `src/components/Nav.astro` |
| Footer copy, footer links, footer email | `src/components/Footer.astro` |
| Homepage copy | `src/pages/index.astro` |
| Artist Residency page copy | `src/pages/artist-residency.astro` |
| Site-wide colors / fonts / CSS variables | `src/styles/global.css` (`:root` block at top) |
| `<head>`, fonts, meta tags | `src/layouts/BaseLayout.astro` |
| Add a new page | Drop `src/pages/<name>.astro` — becomes `/<name>` automatically |
| Add static asset (image, PDF) | Drop in `public/` — served from site root |

### 4.3 Current Nav (`src/components/Nav.astro`)

```
--- (frontmatter) ---
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const link = (path: string) => `${base}${path}`;
const CONTACT_EMAIL = 'hello@contornocollective.com';

--- (template) ---
<nav id="main-nav">
  <div class="nav-left">
    <a href={link('/artist-residency')}>artist residency</a>
    <a href={link('/#work')}>work</a>
    <a href={link('/#about')}>about</a>
  </div>
  <a href={link('/')} class="nav-logo">contorno</a>
  <div class="nav-right">
    <a href={`mailto:${CONTACT_EMAIL}`} class="nav-cta">contact →</a>
  </div>
</nav>
```

### 4.4 Current Footer (`src/components/Footer.astro`)

Four columns: brand wordmark + tagline, location (Puerto Escondido / Oaxaca, México), links (artist residency, the build, about), contact (mailto). Below: a giant "contorno" wordmark as bottom typography.

---

## 5. Deploy Flow

1. Edit files locally (or via a Claude Code session).
2. Commit + push to any branch.
3. **Push to `main`** → Vercel auto-deploys to production at `contornocollective.com` (~10–20 sec build).
4. **Push to a feature branch / open a PR** → Vercel builds a preview URL automatically. Look for it in Vercel dashboard → Deployments, tagged "Preview".

### 5.1 Local development

```
npm install       # once
npm run dev       # http://localhost:4321 with hot reload
npm run build     # produces dist/
npm run preview   # serves dist/ locally to sanity-check the built site
```

### 5.2 Branch policy (for AI sessions and collaborators)

- Default branch: **`main`**
- Claude / agent sessions develop on a feature branch (session config assigns one, e.g. `claude/<slug>`).
- **Never push directly to `main` without explicit user permission.**
- **Never open a PR unless the user asks.**
- Use Vercel's PR preview URL to review changes before merging.

### 5.3 No GitHub Actions

There is no `.github/workflows/` directory anymore. Vercel handles deploys directly from GitHub. The old `deploy.yml` for GitHub Pages was removed as part of the Vercel migration.

---

## 6. `astro.config.mjs`

Current config:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://contornocollective.com',
  trailingSlash: 'ignore',
});
```

**Historical note:** Originally had `base: '/contorno'` because the site was hosted at `watchgabe.github.io/contorno`. When migrating to Vercel (which serves at the root of the domain), the `base` line was removed. Leaving it in caused all CSS/JS asset URLs to 404 and rendered the site as unstyled HTML.

---

## 7. Domain & DNS Setup (GoDaddy → Vercel)

### 7.1 In Vercel — attached domains

| Domain | Role |
|---|---|
| `www.contornocollective.com` | Production (canonical) |
| `contornocollective.com` | Redirects (308) → `www.contornocollective.com` |

### 7.2 GoDaddy DNS records — CURRENT state

Everything below is the actual live config. **Do not modify Google Workspace records** — doing so breaks `hello@contornocollective.com` instantly.

#### Records added for Vercel

| Type | Name | Value | Purpose |
|---|---|---|---|
| **A** | `@` | `216.198.79.1` | Points apex to Vercel |
| **CNAME** | `www` | `0dab931d87edecd3.vercel-dns-017.com.` | Points `www` to Vercel |

Note: Vercel also accepts the older values `76.76.21.21` (A) and `cname.vercel-dns.com` (CNAME) — both work. The new hashed CNAME is Vercel's preferred, per their planned IP range expansion.

#### Records to leave alone — DO NOT TOUCH

| Type | Name | Value | Purpose |
|---|---|---|---|
| NS | `@` | `ns05.domaincontrol.com.` | GoDaddy nameserver (GoDaddy blocks deletion) |
| NS | `@` | `ns06.domaincontrol.com.` | GoDaddy nameserver (GoDaddy blocks deletion) |
| SOA | `@` | `Primary nameserver: ns05.domaincontrol.com.` | Required, blocked from deletion |
| MX | `@` | `aspmx.l.google.com.` (Priority 1) | **Google Workspace email — breaks inbox if removed** |
| MX | `@` | `alt1.aspmx.l.google.com.` (Priority 5) | Google Workspace email |
| MX | `@` | `alt2.aspmx.l.google.com.` (Priority 5) | Google Workspace email |
| MX | `@` | `alt3.aspmx.l.google.com.` (Priority 10) | Google Workspace email |
| MX | `@` | `alt4.aspmx.l.google.com.` (Priority 10) | Google Workspace email |
| TXT | `@` | `google-site-verification=qPuA0_m7bmwPbBpvgXR2Vy5EnIR1bR5l8vZiJAH5VGk` | Google domain verification |
| TXT | `@` | `v=spf1 include:dc-aa8e722993._spfm.contornocollective.com ~all` | SPF (email auth) |
| TXT | `dc-aa8e722993._spfm` | `v=spf1 include:_spf.google.com ~all` | SPF Google delegation |
| TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjAN...` (long RSA key) | DKIM (email auth) |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | DMARC (email auth) |

#### Records deleted during the Vercel migration

- `A · @ · Parked` (600s) — GoDaddy's parking-page placeholder. Replaced by the Vercel A record.
- `CNAME · www · contornocollective.com.` — GoDaddy's default "www → apex" pointer. Replaced by the Vercel CNAME.
- `CNAME · _domainconnect · _domainconnect.gd.domaincontrol.com.` — GoDaddy's setup-helper CNAME. No longer needed once DNS was manually configured.

#### Optional (kept)

- `CNAME · pay · paylinks.commerce.godaddy.com.` — GoDaddy Commerce paylinks. Harmless; delete only if never taking payments through GoDaddy Commerce.
- Any leftover `TXT · _github-pages-challenge-watchgabe` — from the old GitHub Pages setup, harmless to leave.

### 7.3 SSL

Fully automatic on Vercel. As soon as DNS resolves to Vercel, they provision a Let's Encrypt cert. No action needed.

---

## 8. Session History — the Full Timeline

This is the chronological record of everything that's been done to the project so far. Useful for understanding *why* things are the way they are.

### Phase 1 — original brand-guidelines refresh

**Ask:** "Match the new brand guidelines. Add an 'Artist Residency' link in the top-left nav. Change contact email to `hello@contornocollective.com`."

**Brand guidelines specified:**
- Colors: terracotta `#C0583A`, charcoal `#2A2A2A`, cream `#EDE6D6`, offwhite `#F5F0E8`
- Fonts: Gabarito (display), DM Sans (body), Cormorant Garamond (italic accents)

**Changes made (single `index.html` at the time):**
- Type system swap: Inter/DM Mono → Gabarito + DM Sans + Cormorant Garamond
- Palette update: `#f8f0dd` → `#EDE6D6`, `#121212` → `#2A2A2A`, `#9f4c29` → `#C0583A`
- Nav: added `artist residency` as first link (placeholder `href="#"` — the page didn't exist yet)
- Contact: nav CTA + footer both updated to `hello@contornocollective.com`
- Removed all `--mono` CSS variables and DM Mono references

**Result:** Merged as PR #1 into `main`, deployed via GitHub Pages Action.

### Phase 2 — Astro conversion

**Ask (implicit):** Make it possible to edit shared elements (nav, footer) in one place across multiple pages.

**Work done:**
- Scaffolded Astro 4.16 project
- Extracted `Nav.astro` and `Footer.astro` as shared components
- Created `BaseLayout.astro` for shared `<head>` + font loading
- Moved `index.html` → `src/pages/index.astro`
- Added `src/styles/global.css` with the brand palette as CSS custom properties
- Created `src/pages/artist-residency.astro` (real page for what had been a `href="#"` link)
- Added `.github/workflows/deploy.yml` for GitHub Pages Astro build
- Moved `Edited copy/` folder into `public/` so assets ship with the Astro build
- Kept `arc.html` and `brandguide.html` as static pages in `public/`

**Config at this point:** `astro.config.mjs` had `site: 'https://watchgabe.github.io'` and `base: '/contorno'` for GitHub Pages path.

### Phase 3 — deployed ARC landing page

- Added an ARC (Artist Residency Contorno) landing page as `arc.html` (later also `public/arc.html`).
- Deployed via GitHub Pages Action — "Deploy to GitHub Pages #2" ran and succeeded (visible in green in the workflow runs screenshot from that session).

### Phase 4 — decision to move to Vercel

**User question:** "What's the best way to actually use the Contorno website?"

**Recommendation given:**
1. Move hosting from GitHub Pages to **Vercel** (auto-detects Astro, faster builds, PR previews, free tier).
2. Point real domain `contornocollective.com` at it.
3. Run `npm run dev` locally for preview workflow.

User agreed. Proceeded with:
- Signed up on vercel.com with GitHub.
- Imported `watchgabe/contorno` — auto-detected Astro.
- Initial deploy succeeded but rendered unstyled because of the `base: '/contorno'` mismatch.

### Phase 5 — base path fix

**Fix:** Removed the `base: '/contorno'` line and updated `site` to `https://contornocollective.com`. Merged into `main`. Vercel production rebuilt with correct asset paths.

**Side effect (known and accepted):** The old GitHub Pages URL (`watchgabe.github.io/contorno`) now serves unstyled, since its assets expect the `/contorno/` prefix. Fine because the site is moving off Pages entirely.

### Phase 6 — domain wiring (this session)

- Added `contornocollective.com` and `www.contornocollective.com` in Vercel → Domains.
- Vercel showed "Invalid Configuration" until DNS was pointed.
- User pulled up GoDaddy DNS Management.
- Deleted GoDaddy's default `A · @ · Parked` record.
- Identified all GoDaddy records: NS, SOA (protected); MX × 5 + TXT × 5 (Google Workspace email — kept); `CNAME · pay` (GoDaddy Commerce, kept); `CNAME · www · contornocollective.com.` (deleted); `CNAME · _domainconnect` (deleted).
- Added Vercel records: `A · @ · 216.198.79.1` and `CNAME · www · 0dab931d87edecd3.vercel-dns-017.com.`
- DNS propagates over 5–30 minutes, Vercel auto-provisions SSL.

### Phase 7 — this file

Created this transfer document as a single-shot brain dump for future AI sessions and knowledge bases.

---

## 9. Connectors & Third-Party Services

Everything currently in the loop:

| Service | What it does for Contorno | Auth / access |
|---|---|---|
| **GitHub** (`watchgabe/contorno`) | Source of truth for code | User's GitHub account |
| **Vercel** | Hosts the production site, serves PR previews | User's Vercel account (`watchgabe's projects`), connected via GitHub OAuth |
| **GoDaddy** | Registrar + DNS for `contornocollective.com` | User's GoDaddy account |
| **Google Workspace** | Email host for `hello@contornocollective.com` | User's Google Workspace account |

### 9.1 Not yet connected but likely candidates

- **Cloudinary** — for image / video optimization + delivery (right now, all the photos and videos in `public/Edited copy/` ship raw and eat bandwidth).
- **Klaviyo / Kit / Resend** — for mailing list around the residency and construction updates.
- **Formspree / Netlify Forms / Resend Inbound / Google Forms** — if a real contact or application form replaces the `mailto:` link.
- **Notion** — plausible knowledge base / editorial pipeline for construction updates.
- **Sanity / TinaCMS / Decap CMS** — if non-technical editors need to update copy without touching Astro files.
- **Adobe Creative / Canva** — for producing brand assets and social graphics.

---

## 10. Working Style & Conventions

- **Voice:** documentary, lowercase, restrained. Present tense. Em dashes. Coordinates and dates in the margins.
- **Commit messages:** short imperative title, blank line, one to three sentences of *why* (not what).
- **Never touch email DNS records.** Full stop. See §7.2.
- **Never add a `public/CNAME` file.** That's a GitHub Pages artifact. Vercel ignores it; it's clutter.
- **Prefer editing existing files.** Don't spin up new abstractions "for the future."
- **Don't add error handling or fallbacks for scenarios that can't happen.** Trust the framework.
- **Comments in code:** default to none. Only when the *why* is non-obvious.

---

## 11. Common Gotchas

- **`base: '/contorno'` in `astro.config.mjs`** — do NOT re-add. That was only needed for GitHub Pages hosting under a subpath. On Vercel it breaks all asset URLs.
- **Google Workspace email records** — the 5 MX rows and the 5 TXT rows (SPF / DKIM / DMARC / Google verification) are load-bearing. Removing any of them breaks the inbox instantly.
- **GitHub Pages URL still exists** — `watchgabe.github.io/contorno` may still be up but is stale. Consider turning off Pages entirely: Repo Settings → Pages → Source: **None**.
- **Astro pages are `.astro`, not `.html`** — frontmatter (between `---`) is server-side JS, body is HTML-like with JSX-style expressions in `{}`.
- **Shared components mean atomic edits.** Change `Nav.astro` once, both `/` and `/artist-residency` pick it up — do not duplicate nav markup into individual pages.
- **`arc.html` exists twice** — once at repo root (`/arc.html`), once in `public/arc.html`. The one in `public/` is what Astro actually ships. The root copy is a leftover.
- **DNS propagation takes 5–30 minutes.** Vercel's "Invalid Configuration" warning during that window is not a mistake — it's just waiting.

---

## 12. Immediate & Near-Term Work

**Currently possible follow-ups (not yet done):**

- Turn off GitHub Pages entirely (Repo → Settings → Pages → Source: None) once `contornocollective.com` is fully live on Vercel.
- Confirm the Vercel deployment renders correctly at the real domain after DNS propagates.
- Optionally clean up `arc.html` at repo root (redundant with `public/arc.html`).
- Optionally consolidate `CONTACT_EMAIL` into a single shared constant (currently duplicated in `Nav.astro` and `Footer.astro`).
- Add real content / imagery to `/artist-residency`.
- Add a real contact form or newsletter signup (right now the site relies on `mailto:` links).
- Consider Cloudinary or Vercel image optimization for the media in `public/Edited copy/`.
- Add a favicon and Open Graph metadata in `BaseLayout.astro`.

---

## 13. Prompt to hand to a fresh AI

Paste this at the top of a new AI chat (Claude Project, custom GPT, Gemini, etc.) after uploading or including this file:

> You now have full context on **Contorno Collective**, an arts collective documenting a building project in Puerto Escondido, Oaxaca, México. The complete project reference is in the attached `contorno-brain-transfer.md`. Read it before answering anything about the brand, the website, the tech stack, or the DNS setup.
>
> Rules of engagement:
> 1. Never modify DNS records related to email (MX / SPF / DKIM / DMARC / Google verification).
> 2. Never re-add `base: '/contorno'` to `astro.config.mjs`.
> 3. When editing shared elements (nav, footer, styles), remember they cascade to every page — edit one file, don't duplicate.
> 4. Voice: lowercase, restrained, documentary. Em dashes not colons.
> 5. Brand colors: terracotta `#C0583A`, charcoal `#2A2A2A`, cream `#EDE6D6`, offwhite `#F5F0E8`. Fonts: Gabarito, DM Sans, Cormorant Garamond italic.
> 6. Deploy flow: push to `main` → Vercel auto-deploys production. Any other branch → Vercel builds a preview URL.
>
> When I ask you to do something, act on Contorno's current state as described here — don't re-derive things this file already tells you.

---

## 14. Quick Reference Card

```
Project:    Contorno Collective
Domain:     contornocollective.com  (www is canonical, apex 308-redirects)
Repo:       github.com/watchgabe/contorno
Hosting:    Vercel  (project name: contorno)
Registrar:  GoDaddy
Email:      Google Workspace  (hello@contornocollective.com)
Stack:      Astro 4.16 → static build → Vercel

Colors:     #C0583A terracotta | #2A2A2A charcoal | #EDE6D6 cream | #F5F0E8 offwhite
Fonts:      Gabarito (display) | DM Sans (body) | Cormorant Garamond (italic)

Edit nav:      src/components/Nav.astro
Edit footer:   src/components/Footer.astro
Edit home:     src/pages/index.astro
Edit residency: src/pages/artist-residency.astro
Edit styles:   src/styles/global.css
Edit head:     src/layouts/BaseLayout.astro
Add page:      drop src/pages/<name>.astro
Add asset:     drop into public/

Local dev:  npm install && npm run dev  →  http://localhost:4321
Deploy:     push to main  →  Vercel auto-builds → live in ~15s
Preview:    push to any branch  →  Vercel builds preview URL

NEVER:      touch MX / SPF / DKIM / DMARC records
NEVER:      re-add base: '/contorno' to astro.config.mjs
NEVER:      push to main without permission
NEVER:      open a PR unless asked
```

---

*End of transfer file. Everything above is safe to feed into a new chat, a Claude Project, a custom GPT, a Notion AI, or any RAG system. If any AI reading this asks a question the file doesn't answer, treat that as a real unknown — don't hallucinate policy.*
