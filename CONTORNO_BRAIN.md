# Contorno Collective — Brain Dump / Transfer File

**Purpose:** everything an AI or a fresh human collaborator needs to work on Contorno without re-explaining the project. Feed this whole file into a new chat, a project memory, or a knowledge base and the assistant should be able to pick up where we left off.

**Last updated:** 2026-09-30

---

## 1. What Contorno is

Contorno Collective is an arts collective documenting the process of building a structure in Puerto Escondido, Oaxaca, México. The website is the public face — part portfolio, part real-time build documentation, part launchpad for programs (Artist Residency, stays, etc.).

- **Founders / on-site team:** Nick and Ricardo
- **Location:** Puerto Escondido, Oaxaca, México (15.8442° N, 97.0418° W)
- **Public contact:** hello@contornocollective.com
- **Public brand-guide reference:** https://contornocollective.com/brandguide.html

---

## 2. Live infrastructure

### Domain / DNS
- **Registrar:** GoDaddy
- **Domain:** `contornocollective.com` (and `www.contornocollective.com`)
- **DNS is managed at GoDaddy.** Records pointing at Vercel:
  - `A @` → `76.76.21.21` (Vercel)
  - `CNAME www` → `cname.vercel-dns.com`
- **Email records (Google Workspace) — NEVER TOUCH:**
  - `MX` records → Google
  - `TXT` SPF (`v=spf1 include:_spf.google.com ~all`)
  - `TXT` DKIM (`google._domainkey`)
  - `TXT` DMARC (`_dmarc`)
  - Modifying any of these instantly breaks `hello@contornocollective.com`
- **Other DNS entries present:**
  - `CNAME pay` → GoDaddy commerce paylinks
  - `TXT _github-pages-challenge-watchgabe` → leftover verification from a prior GH Pages setup; harmless

### Hosting
- **Vercel** hosts the built static site.
- Auto-deploys on every push to `main` (~10–20 sec to production).
- Every PR gets a preview URL like `contorno-git-<branch>-<user>.vercel.app`.
- Vercel project has both `contornocollective.com` and `www.contornocollective.com` attached in Domains.
- Preview URL: https://contorno.vercel.app

### Email
- **Google Workspace** for the domain.
- Primary mailbox: `hello@contornocollective.com`
- This address appears in `src/components/Nav.astro` and `src/components/Footer.astro` — change in both if it ever moves.

### Repo
- **GitHub:** https://github.com/watchgabe/contorno
- Owner: `watchgabe` (personal account)
- Default branch: `main`
- Session convention for AI branches: `claude/<slug>`

---

## 3. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Static site generator | **Astro 4.16** | Component-based, outputs plain HTML/CSS/JS |
| Runtime for builds | Node 20 (Vercel) / 22 (local) | |
| Package manager | npm | `package-lock.json` is committed |
| Hosting | Vercel | Not GitHub Pages anymore |
| CSS | Hand-written in `src/styles/global.css` | No Tailwind, no CSS-in-JS |
| Fonts | Google Fonts (Gabarito, DM Sans, Cormorant Garamond) | Loaded in `BaseLayout.astro` |
| Content | Copy lives inline in `.astro` pages | No CMS |

**Why this stack:**
- Astro over Next.js/Nuxt: the site is fully static, no server logic needed. Astro's zero-JS-by-default output = fastest possible pages.
- Vercel over GitHub Pages: custom domain, PR previews, faster deploys, no `base: '/contorno'` gymnastics.
- No CMS yet: two pages of copy don't justify a CMS. If content grows, Sanity or a headless option would fit.

---

## 4. Repo structure

```
contorno/
├── astro.config.mjs           ← site URL config (currently just site: 'https://contornocollective.com')
├── package.json               ← npm scripts (dev/build/preview/sync-guide)
├── CLAUDE.md                  ← project instructions loaded by every Claude Code session
├── CONTORNO_BRAIN.md          ← THIS FILE (full transfer dump)
├── scripts/
│   └── sync-guide.mjs         ← script that keeps the brand guide in sync
├── public/                    ← served from site root, untouched by Astro build
│   ├── arc.html               ← standalone legacy ARC (residency) page
│   ├── brandguide.html        ← brand-guidelines reference (large single file)
│   ├── img/                   ← additional imagery
│   └── Edited copy/           ← primary photography library (Nick, Ricardo, site shots)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro   ← <head>, fonts, page shell; supports header: 'full' | 'minimal' | 'none' and footer: true/false
    ├── components/
    │   ├── Nav.astro          ← top nav (the project, residency, stay, guide + contact CTA)
    │   └── Footer.astro       ← footer (location, explore, contact, wordmark)
    ├── pages/
    │   ├── index.astro        ← homepage (/)
    │   ├── artist-residency.astro   ← /artist-residency
    │   ├── stay.astro         ← /stay
    │   └── guide.astro        ← /guide
    └── styles/
        └── global.css         ← all site-wide CSS + brand tokens on :root
```

### Editing map — where to change what

| Change | File |
|---|---|
| Nav links / contact email in nav | `src/components/Nav.astro` |
| Footer | `src/components/Footer.astro` |
| Homepage copy | `src/pages/index.astro` |
| Artist Residency copy | `src/pages/artist-residency.astro` |
| Stay page | `src/pages/stay.astro` |
| Guide page | `src/pages/guide.astro` |
| Site-wide colors / fonts / CSS variables | `src/styles/global.css` (`:root` block) |
| `<head>`, fonts, meta tags | `src/layouts/BaseLayout.astro` |
| Add a new page | Drop `src/pages/<name>.astro` — becomes `/<name>` automatically |
| Add static asset (image, PDF) | Drop in `public/` — served from site root |

---

## 5. Brand guidelines

The canonical, visual reference is https://contornocollective.com/brandguide.html. Below is the compressed version.

### Color palette

CSS variables live in `src/styles/global.css` under `:root`. Note: internal variable names use legacy shorthand (`--rust`, `--ink`, `--cream`) that map to the branded names.

| Token | CSS var | Hex | Role |
|---|---|---|---|
| Terracotta (primary accent) | `--rust` | `#C0583A` | Accent, hover, italic highlights, CTAs |
| Terracotta light | — | `#D4795E` | Available in brandguide |
| Terracotta muted | — | `#E8A48A` | Available in brandguide |
| Jungle | — | `#2D5A3D` | Sub-brand / signals |
| Jungle light | — | `#4A7A5A` | |
| Ocean | — | `#7BA4B8` | Sub-brand / signals |
| Ocean light | — | `#A8C4D4` | |
| Cream (page bg) | `--cream` | `#EDE6D6` | Primary page background |
| Offwhite | `--offwhite` | `#F5F0E8` | Alt background, sections |
| Charcoal (body text) | `--ink` | `#2A2A2A` | Text, nav CTA background |
| Charcoal mid | — | `#4A4A4A` | Secondary body copy |
| Charcoal light | `--mid` | `#888` | Muted labels, dividers |

### Typography

| Family | CSS var | Role |
|---|---|---|
| **Gabarito** | `--display` | Display headlines, section titles, wordmark. Weight 500 by default. `letter-spacing: -0.02em` for large sizes, `0.18em` uppercase for wordmark. |
| **DM Sans** | `--sans` / `--label` | Body copy (300–400). Also used for uppercase labels at 10–11px, `letter-spacing: 0.14em–0.2em`. |
| **Cormorant Garamond** | `--serif` | Italic accents only. Applied via `<em>` inside display headlines, colored `--rust`. |

Load line (in `BaseLayout.astro`):
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500;700&family=Gabarito:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Voice / tone (from brandguide)
- **Grounded, process-forward, unhurried.** The subject is *becoming*, not finished.
- Sentence fragments and em-dashes for texture.
- Small labels in caps + wide letter-spacing (like architectural drawing labels).
- Italic accents in Cormorant Garamond terracotta = the emotional beats.
- Never advertise-y. Documents, doesn't sell.

### Iconography / marks
- The wordmark is set in **Gabarito 500, uppercase, `letter-spacing: 0.18em`**. It appears in the nav (centered) and footer (larger, faded 0.07 opacity as a "giant" watermark).

---

## 6. Current pages

| Path | File | Purpose |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage — hero, intro, "the build" photo gallery, feature image, about/team |
| `/artist-residency` | `src/pages/artist-residency.astro` | Contorno residency program landing |
| `/stay` | `src/pages/stay.astro` | Stay / lodging info |
| `/guide` | `src/pages/guide.astro` | Guide (Puerto Escondido travel/site guide) |
| `/brandguide.html` | `public/brandguide.html` | Full brand guidelines (static, imported from an outside doc) |
| `/arc.html` | `public/arc.html` | Legacy standalone ARC residency page — still linked to, not yet consolidated with `/artist-residency` |

---

## 7. Deploy flow

1. Edit files locally (or in a Claude Code session)
2. Commit + push (any branch)
3. **Push to `main`** → Vercel deploys to production at `contornocollective.com` (~10–20 sec)
4. **Push to a feature branch / open a PR** → Vercel builds a preview URL

**Local dev:** `npm install`, then `npm run dev` → http://localhost:4321

**Build:** `npm run build` → outputs static site to `dist/`

There is **no** GitHub Actions workflow anymore. An old `.github/workflows/deploy.yml` from the GitHub Pages era should be removed if it's still around (superseded by Vercel).

---

## 8. Branch / PR policy

- Default branch: `main`
- Claude sessions develop on a feature branch (usually `claude/<slug>`), then open a PR into `main`
- **Never push directly to `main` without explicit user permission**
- **Never open a PR unless the user asks**
- Use Vercel's PR preview URL to review changes before merging
- The user is not a developer by trade — always explain terms like "PR", "branch", "merge" in plain language when they come up

---

## 9. Available connectors / integrations (this account)

These are the MCP servers currently connected to the user's Claude account. An AI can call any of these when relevant.

**Design / creative:**
- **Adobe for Creativity** — Firefly, Express, Photoshop-like image editing, PDF ops, video, fonts, InDesign export
- **Canva** — designs, brand templates, exports, folders
- **HyperFrames by HeyGen** — programmable HTML video projects
- **Cloudinary** — asset management, image/video transforms, generation
- **Claude Docs** — Claude-native shared docs

**Comms / email:**
- **Gmail** — read/send/label messages and threads (user's account)
- **Resend** — transactional email, broadcasts, templates
- **Kit** (formerly ConvertKit) — creator email, sequences, tags, broadcasts
- **Klaviyo** — ecom email + SMS marketing
- **Slack** — read/write channels, threads, canvases

**Productivity / storage:**
- **Google Calendar** — events, availability, scheduling
- **Google Drive** — files, folders, sharing
- **Notion** — pages, databases, search, comments
- **Zoom for Claude** — meetings, recordings, canvas files

**Analytics / infra:**
- **PostHog** — product analytics, experiments, session recordings, flags
- **Supabase** — databases, migrations, edge functions
- **Vercel** — deploys, domains, envs, logs, sandboxes
- **GitHub** — repos, PRs, issues, actions, reviews
- **Sandcastles** — video analytics / discovery
- **Facebook Ads MCP** — Meta ads campaigns, catalogs, audiences
- **Wispr Flow** — meeting notes and calendar

If a task fits one of these, the AI should reach for the connector directly rather than telling the user to do it manually.

---

## 10. Conversation history — what we've done so far

This is the sequence of work through this session, so a new AI understands the state.

### Session start
- Site was static HTML on GitHub Pages at `watchgabe.github.io/contorno/`
- Two files: `index.html` and `brandguide.html`
- Nav email was `hello@contorno.mx`
- Fonts were Inter + DM Mono
- Palette: cream `#f8f0dd`, ink `#121212`, rust `#9f4c29`

### Round 1: Brand alignment (PR #1 — merged)
Aligned the existing `index.html` to the 2026 brand guide:
- Swapped fonts: Inter + DM Mono → **Gabarito** (display) + **DM Sans** (body/labels) + **Cormorant Garamond** (italic accents)
- Palette shift:
  - `--cream` `#f8f0dd` → `#EDE6D6`
  - `--ink` `#121212` → `#2A2A2A`
  - `--rust` `#9f4c29` → `#C0583A`
  - Added `--offwhite` `#F5F0E8`
- Added "Artist Residency" link to top-left nav (placeholder `href="#"` at the time)
- Changed contact email in nav CTA and footer: `hello@contorno.mx` → `hello@contornocollective.com`

### Round 2: Astro conversion (PR #2 — merged)
Converted the site to Astro so header/footer/logo/colors become single-source-of-truth:
- Scaffolded Astro 4.16 (`package.json`, `astro.config.mjs`, `.gitignore`, `node_modules/`)
- Created `src/layouts/BaseLayout.astro` (owns `<head>`, fonts, `<body>`, slots)
- Extracted `src/components/Nav.astro` and `src/components/Footer.astro`
- Moved global styles into `src/styles/global.css`
- Converted `index.html` → `src/pages/index.astro`, with gallery images as a data array
- Created `src/pages/artist-residency.astro` (skeleton)
- Moved `Edited copy/` and `brandguide.html` into `public/`
- Added a GitHub Actions workflow to build Astro and deploy `dist/` to GitHub Pages (this was later replaced by Vercel)

### Round 3: Deploy debugging
- After merging the Astro PR, GitHub Pages was returning 403 on all URLs
- Root cause: Pages was still set to "Deploy from a branch" (which serves raw files from `main` — but `main` no longer had `index.html` at the root; it was in `dist/` after build). Both the built-in `pages-build-deployment` workflow AND our custom `Deploy to GitHub Pages` workflow were running.
- Fix path: switch Pages source in repo Settings → Pages → Source → "GitHub Actions"

### Round 4: Site consolidation (done outside this session by user + other agents)
Between then and now:
- Migrated hosting from GitHub Pages to **Vercel** with the custom domain `contornocollective.com`
- Removed the old `.github/workflows/` (Vercel handles deploys)
- Added `public/arc.html` — a standalone ARC (residency) landing page reusing the design system
- Added new pages: `src/pages/stay.astro`, `src/pages/guide.astro`
- Nav updated to: **the project · residency · stay · guide · contact →** with active-link highlighting
- Footer's "links" column renamed to "explore": the project · residency · stay
- `BaseLayout.astro` now accepts `header` (`'full' | 'minimal' | 'none'`) and `footer` (bool) props
- `astro.config.mjs` simplified: `site: 'https://contornocollective.com'`, `trailingSlash: 'ignore'` (dropped the `base: '/contorno'` since it's on a custom domain now)
- `scripts/sync-guide.mjs` added — appears to sync the brand guide from an external source
- CLAUDE.md added to the repo root as persistent project context

---

## 11. Key decisions & trade-offs (why things are the way they are)

- **Astro over Next.js:** static output, zero JS by default, simpler mental model. Two-page site did not need SSR or client hydration.
- **Vercel over GH Pages:** custom domain support, PR preview URLs, no build-step gymnastics.
- **Kept `public/brandguide.html` and `public/arc.html` as-is** (not converted to Astro pages) because they're heavy single-file HTML artifacts and low-frequency edits. Convert only if they need to share the nav/footer.
- **Copy lives inline in `.astro` files, not a CMS.** Right choice for now. Reassess if content editors get involved.
- **Terracotta = "rust" in the code.** The CSS variable is still named `--rust` even though the brand color is officially "terracotta." Don't rename without a codebase-wide sweep (the token is referenced everywhere).

---

## 12. Common gotchas

- **Do NOT touch email DNS records.** MX, SPF, DKIM, DMARC all belong to Google Workspace. Deleting any breaks `hello@contornocollective.com`.
- **Do NOT add `public/CNAME`.** GitHub Pages artifact, ignored by Vercel, only causes confusion.
- **Astro pages are `.astro` files.** Frontmatter between `---` is server-side JS/TS; body is JSX-like HTML.
- **Shared components:** edit `Nav.astro` or `Footer.astro` once, every page updates. If you find yourself editing the nav in two places you're doing it wrong.
- **Contact email lives in two files:** `Nav.astro` and `Footer.astro`. Update both.
- **Legacy `--rust` variable name.** It's the terracotta accent; don't be misled by the name.
- **No GitHub Actions.** All deploys go through Vercel. Don't recreate `.github/workflows/`.

---

## 13. Recommended workflow for a new AI session

1. Read this file (`CONTORNO_BRAIN.md`) and `CLAUDE.md` first
2. Live site: https://contornocollective.com
3. Live brand ref: https://contornocollective.com/brandguide.html
4. Repo: https://github.com/watchgabe/contorno
5. Before making changes, check whether the change is:
   - **Content copy** → edit the relevant `src/pages/*.astro`
   - **Nav / footer** → edit `src/components/Nav.astro` or `Footer.astro`
   - **Colors / fonts / spacing** → edit `src/styles/global.css`
   - **New page** → drop `src/pages/<name>.astro`, then add to `Nav.astro` if user-facing
6. Ship via feature branch + PR unless explicitly told otherwise
7. Use Vercel preview URL on the PR to visually confirm before merging

---

## 14. Open items / TODOs the AI should know about

- **`public/arc.html` vs `src/pages/artist-residency.astro`** — two artist-residency assets exist; the standalone `arc.html` is fuller (hero, cohorts, FAQ, Typeform placeholder) while the Astro page is a lighter skeleton. Eventually consolidate into one Astro page that uses the shared nav/footer.
- **Typeform integration** — `arc.html` references a `TYPEFORM_URL` placeholder. Needs a real form.
- **Copy on `/stay` and `/guide`** — created recently; may still be placeholder-y. Review needed.
- **Image optimization** — the `Edited copy/` folder ships full-resolution jpgs. Astro's image optimization (`astro:assets`) or a Cloudinary integration would cut page weight substantially.
- **Analytics** — no PostHog / Plausible / GA installed yet. Worth adding once traffic matters.
- **CMS decision** — content is inline in `.astro`. If a non-technical editor needs to update copy without a PR, consider Sanity or Notion-as-CMS.

---

## 15. Contact / ownership

- **Owner:** Gabe (github: watchgabe)
- **Public email:** hello@contornocollective.com
- **Repo access:** private to the owner + granted collaborators
- **Vercel project:** owned by the same account

---

*End of transfer file. If you're an AI reading this fresh: everything you need to work on Contorno is above. When in doubt, prefer editing shared components (`Nav`, `Footer`, `global.css`) over duplicating markup across pages.*
