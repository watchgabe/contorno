# Contorno — Complete Brain Transfer File

**Version:** 1.0 · September 2026
**Purpose:** A single self-contained document with everything a new Claude Code session, ChatGPT thread, or custom AI brain needs to understand and work on the Contorno project. Drop this into any AI context and it will know the brand, the tech, the infrastructure, and the history.

> **How to use this file:**
> 1. **In a new Claude Code session on this repo** → it's read automatically along with `CLAUDE.md`. Nothing to do.
> 2. **In a Claude/ChatGPT/Gemini web chat** → upload this file as an attachment, or paste its contents into the first message.
> 3. **In a custom AI brain / RAG / Notion AI / Custom GPT** → drop this file into the knowledge base. It's already structured for retrieval.
> 4. **Raw URL (share with any AI):** `https://raw.githubusercontent.com/watchgabe/contorno/main/CONTORNO_BRAIN.md` (available once merged to `main`)

---

## Table of Contents

1. [What Contorno Is](#1-what-contorno-is)
2. [Sub-brands](#2-sub-brands)
3. [Brand Voice & Tone](#3-brand-voice--tone)
4. [Brand Character](#4-brand-character)
5. [Color Palette](#5-color-palette)
6. [Typography](#6-typography)
7. [Imagery & Photography Direction](#7-imagery--photography-direction)
8. [Website Tech Stack](#8-website-tech-stack)
9. [Repository Structure](#9-repository-structure)
10. [Where to Make Changes](#10-where-to-make-changes)
11. [Deploy Flow](#11-deploy-flow)
12. [Hosting: Vercel](#12-hosting-vercel)
13. [Domain & DNS: GoDaddy](#13-domain--dns-godaddy)
14. [Email: Google Workspace](#14-email-google-workspace)
15. [Version Control: GitHub](#15-version-control-github)
16. [Full Connector Inventory](#16-full-connector-inventory)
17. [Session History & Decisions](#17-session-history--decisions)
18. [Common Gotchas](#18-common-gotchas)
19. [Live URLs & Endpoints](#19-live-urls--endpoints)
20. [Working With Claude on This Project](#20-working-with-claude-on-this-project)

---

## 1. What Contorno Is

**Contorno** is a creative collective and property on La Punta, Puerto Escondido, Oaxaca, México — where the Pacific crashes into jungle and polished concrete. It brings the world's creative minds to one of Mexico's last unspoiled coastal paradises.

**Contorno is NOT:**
- A hotel with an art program
- A real estate play dressed up in aesthetics
- A generic luxury travel brand

**Contorno IS:**
- A space where art, architecture, and natural beauty converge
- Where creation meets connection
- A space designed for makers, not tourists
- *"An art program with exceptional rooms."*

**Location:** La Punta · Puerto Escondido · Oaxaca, México (15.8442° N, 97.0418° W)

---

## 2. Sub-brands

Contorno is a parent brand with three sub-brands:

### 2.1 Contorno Property
> *"Chill luxury. La Punta views."*

The stay experience. Luxury living with amenities designed for creatives who want to work, rest, and exist beautifully — without a resort's performative polish. Direct bookings only.
- La Punta views & Pacific access
- Badass gym & shared amenities
- Direct bookings — no Airbnb fees
- Property management & sublets
- Repeat traveler community

### 2.2 ARC — Artist Residency at Contorno
> *"We're an art program with exceptional rooms."*

A dedicated unit, meals through Tea & Sol, and the time and space for serious creative work. Art created during the residency is the currency. Selection by taste and influence.
- 30-day residency periods
- Meals via Tea & Sol partnership
- Artist selection: taste + influence
- Online gallery — 50/50 split
- Applications open Summer 2025 → first cohort in 2026

### 2.3 Contorno Collective
> *"The Puerto you didn't know you were looking for."*

The lifestyle and inspiration arm. The Collective celebrates Puerto Escondido's artists, small businesses, and cultural scene — not as a tourist guide, but as a participant.
- Puerto Escondido live guide
- Local small business features
- Community of artists
- Studio & creator space
- Spotify playlist integration

---

## 3. Brand Voice & Tone

Four voice pillars. Every piece of copy should read like at least one of these — often more than one at once.

### Playfully sophisticated
Like finding a Matisse sketch in a beach shack. We don't take ourselves too seriously, but we take the work seriously.

### Romantically rebellious
Channeling Bowie, Byron, and Wes Anderson. We break rules beautifully. We never do the expected thing.

### Culturally curious
Celebrating Puerto's spirit authentically. Learning from the local art scene rather than importing over it.

### Unpretentious luxury
Polished concrete and jungle palms, not marble and gold. We earn sophistication through taste, not price tags.

### Voice in Practice — Reference Lines

> "Some people collect art. We collect artists."

> "Most residencies give you a desk. We give you a month, meals from Boca, and views that make you forget your phone exists."

> "We're not a hotel with an art program. We're an art program with exceptional rooms."

> "This isn't an Airbnb. This is what happens when an architect falls in love with a place and decides to share it."

---

## 4. Brand Character

Four axes describe the brand personality. Use these when evaluating whether copy, design, or partnerships feel "on brand."

| Axis | Values |
|---|---|
| **Character** | Understated · Authentic · Elegant · Structured |
| **Feeling** | Contemporary · Visionary · Empowering · Inspiring |
| **Function** | Luxe · Ordered · Transformative · Intentional |
| **Spirit** | Rebellious · Playful · Culturally curious · Unpretentious |

### If Contorno were…
- **Music:** Outkast & David Bowie
- **Painters:** Michelangelo & Matisse
- **Writer:** Oscar Wilde
- **Directors:** Kubrick & Wes Anderson
- **Aesthetic:** Matisse meets Barragán

---

## 5. Color Palette

Colors are drawn from the physical world of La Punta: sun-baked concrete, jungle canopy, and the Pacific at dusk. **Not trend colors — the actual colors of the place.**

| Name | Role | HEX | RGB | CMYK |
|---|---|---|---|---|
| **Terracotta** | Primary — Hero Color | `#C0583A` | 192 / 88 / 58 | 0 / 54 / 70 / 25 |
| **Jungle Green** | Secondary | `#2D5A3D` | 45 / 90 / 61 | 50 / 0 / 32 / 65 |
| **Faded Ocean** | Accent | `#7BA4B8` | 123 / 164 / 184 | 33 / 11 / 0 / 28 |
| **Warm Cream** | Neutral — Background | `#EDE6D6` | 237 / 230 / 214 | 0 / 3 / 10 / 7 |
| **Charcoal** | Neutral — Text / Dark BG | `#2A2A2A` | 42 / 42 / 42 | 0 / 0 / 0 / 84 |
| **Off-white** | Neutral — light BG | `#F5F0E8` | 245 / 240 / 232 | — |
| **Neon yellow** | Hand-drawn overlay marks ONLY | `#E8FF00` | — | — |

### Color Hierarchy (usage %)
- Terracotta — Primary: **40%**
- Jungle Green — Secondary: **30%**
- Faded Ocean — Accent: **20%**
- Warm Cream — Background: **10%**

**Rule:** Avoid using tints not specified in this system.

### CSS variables (as defined in `src/styles/global.css`)

```css
:root {
  --cream:    #EDE6D6;
  --offwhite: #F5F0E8;
  --ink:      #2A2A2A;   /* charcoal */
  --rust:     #C0583A;   /* terracotta */
  --mid:      #888;
}
```

*(Note: jungle green and faded ocean are NOT yet in the CSS — add as `--jungle` and `--ocean` if/when needed.)*

---

## 6. Typography

Three-typeface system. All from Google Fonts.

### 6.1 Gabarito — Primary / Display
- **Weight:** Medium (500)
- **Use for:** All display moments, headings, large typographic statements, hero titles, section titles, wordmark
- **Character:** Geometric, characterful sans-serif with warmth and confidence. Rounded terminals give personality without sacrificing strength.

### 6.2 Cormorant Garamond — Accent (decorative only)
- **Weight:** Light (300), Regular (400) — italic and roman
- **Use for:** Small italic pull-quotes, oversized low-opacity decorative accents (background numerals/letters at 0.2–0.3 opacity), the `.page-lede` italic paragraph on interior pages
- **DO NOT USE FOR:** Inline emphasis inside Gabarito headlines (feels like FSCreative "script-on-sans" style — off-brand)
- **For headline emphasis instead:** Keep the Gabarito font, use `color: var(--rust)` with `font-weight: 600`

### 6.3 DM Sans — Secondary / Body
- **Weight:** Light (300), Regular (400), Medium (500), Bold (700)
- **Use for:** Body copy, navigation, captions, UI elements, uppercase labels (letter-spacing 0.14–0.2em)

### Type Scale (from brand guide)

| Style | Sample | Typeface | Size | Weight |
|---|---|---|---|---|
| Display | CONTORNO | Gabarito | 64–120px | 500 |
| Heading | Artist Residency | Cormorant Garamond | 32–56px | 300 |
| Subhead | Where creation meets connection | DM Sans | 18–24px | 500 |
| Body | A space designed for makers, not tourists. | DM Sans | 13–16px | 300 |
| Label | ARTIST RESIDENCY PROGRAM | DM Sans | 10–12px | 500 Caps |

### Google Fonts loader (from `src/layouts/BaseLayout.astro`)
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500;700&family=Gabarito:wght@400;500;600;700;900&display=swap" rel="stylesheet">
```

---

## 7. Imagery & Photography Direction

Photography lives in the tension between documentation and poetry. Images should feel like they were taken by someone who actually loves the place — not by a photographer hired for a shoot.

### Do
- Film grain & natural light
- Real moments, unstaged
- Architecture without people
- Graphic color overlays (from the brand palette)
- Hand-drawn annotations (neon yellow `#E8FF00`)
- La Punta light & shadow

### Don't
- Overproduced editorial
- Stock photography
- Perfect blue-sky travel
- Heavy retouching
- Generic "luxury hotel" framing
- Posed, artificial subjects

### Imagery systems

**01 · Raw & Film** — Natural grain, available light, uncropped moments. Architecture as sculpture. People as evidence of life, not lifestyle. Film grain · high contrast · natural shadows · warm tones · imperfect framing.

**02 · Photo Overlay — Color Blocks** — Terracotta, Jungle, or Ocean only. Geometric shapes (rectangles, squares). Blocks converse with the image, never obscure it.

**03 · Photo Overlay — Hand-drawn Marks** — Neon yellow `#E8FF00` only. Strokes are gestural and loose. Max one image per layout. Never on purely typographic compositions.

**04 · Matisse Collage** — Cut-paper organic shapes in brand colors, layered over/alongside photography. Biomorphic forms (leaf, figure, wave). Used for: ARC program materials, social campaign art, editorial inserts.

---

## 8. Website Tech Stack

| Layer | Tool | Version | Notes |
|---|---|---|---|
| Site generator | **Astro** | 4.16 | Static output to `dist/` |
| Language | HTML/CSS/JS via `.astro` files | — | Frontmatter is server-side; body is JSX-like |
| Hosting | **Vercel** | — | Auto-deploys from GitHub `main` |
| Domain registrar + DNS | **GoDaddy** | — | contornocollective.com |
| Email | **Google Workspace** | — | hello@contornocollective.com |
| Version control | **GitHub** | — | watchgabe/contorno |

### Local dev
```bash
npm install
npm run dev    # → http://localhost:4321
npm run build  # → outputs to dist/
npm run preview
```

### `package.json` (dependencies)
```json
{
  "name": "contorno",
  "type": "module",
  "dependencies": { "astro": "^4.16.18" }
}
```

### `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://contornocollective.com',
  trailingSlash: 'ignore',
});
```

---

## 9. Repository Structure

```
contorno/
├── CLAUDE.md                     ← Concise repo context (auto-loaded by Claude Code)
├── CONTORNO_BRAIN.md             ← THIS FILE — full brand + infra dump
├── astro.config.mjs              ← Astro site config
├── package.json                  ← npm scripts + deps
├── package-lock.json
├── .gitignore
├── README.md
├── public/                       ← Static assets served at site root
│   ├── arc.html                  ← Legacy standalone ARC landing page
│   ├── brandguide.html           ← Brand guidelines reference page (canonical guide)
│   └── Edited copy/              ← All brand photography assets (jpg/mp4)
└── src/
    ├── env.d.ts
    ├── layouts/
    │   └── BaseLayout.astro      ← <head>, fonts, page shell — wraps every page
    ├── components/
    │   ├── Nav.astro             ← Top nav (links + contact email constant)
    │   └── Footer.astro          ← Footer (links + contact email constant + giant wordmark)
    ├── pages/                    ← Each .astro file becomes a route
    │   ├── index.astro           ← Homepage → /
    │   └── artist-residency.astro ← /artist-residency
    └── styles/
        └── global.css            ← Brand colors, fonts, all site-wide CSS
```

---

## 10. Where to Make Changes

| Change | File |
|---|---|
| Nav links / contact email in nav | `src/components/Nav.astro` |
| Footer content | `src/components/Footer.astro` |
| Homepage copy | `src/pages/index.astro` |
| Artist Residency copy | `src/pages/artist-residency.astro` |
| Site-wide colors / fonts / CSS variables | `src/styles/global.css` (`:root` block) |
| `<head>`, fonts, meta tags | `src/layouts/BaseLayout.astro` |
| Add a new page | Drop `src/pages/<name>.astro` → becomes `/<name>` automatically |
| Add static asset (image, PDF) | Drop in `public/` → served from site root |
| Brand guide reference page | `public/brandguide.html` |

---

## 11. Deploy Flow

**Automatic via Vercel's GitHub integration.** No CI config file — Vercel watches the repo directly.

1. Edit files locally
2. Commit + push (any branch)
3. **Push to `main`** → Vercel deploys to production at `contornocollective.com` (~10–20 sec)
4. **Push to a feature branch / open a PR** → Vercel builds a **preview URL** for review before merge

**Branch policy:**
- Default branch: `main`
- Claude sessions develop on a feature branch (specified in session config), open a PR, human merges into `main`
- **Never push directly to `main` without explicit user permission**
- **Never open a PR unless the user asks**

---

## 12. Hosting: Vercel

- **Project:** `contorno` (linked to GitHub repo `watchgabe/contorno`)
- **Preview URL (Vercel-owned):** https://contorno.vercel.app
- **Custom domains attached:** `contornocollective.com` and `www.contornocollective.com` (both Valid)
- **HTTPS:** Auto-provisioned via Let's Encrypt / Vercel-managed cert
- **PR previews:** Enabled — every branch push generates a URL like `contorno-git-<branch>-watchgabe.vercel.app`

### Vercel-recommended DNS (currently applied)
- Vercel is transitioning to project-scoped DNS records. The "old" records `76.76.21.21` and `cname.vercel-dns.com` still work. The user has applied the newer project-scoped records:
  - `www` CNAME → `0dab931d87edecd3.vercel-dns-017.com.`
  - `@` A → project-scoped IP (see Vercel domain settings for exact value)

---

## 13. Domain & DNS: GoDaddy

**Registrar:** GoDaddy
**Domain:** `contornocollective.com`
**Nameservers:** `ns05.domaincontrol.com`, `ns06.domaincontrol.com` (GoDaddy defaults — DO NOT CHANGE)

### Full DNS record set

| Type | Name | Value | Purpose |
|---|---|---|---|
| NS | @ | ns05.domaincontrol.com | GoDaddy nameserver (required) |
| NS | @ | ns06.domaincontrol.com | GoDaddy nameserver (required) |
| SOA | @ | Primary: ns05.domaincontrol.com | Required, can't delete |
| A | @ | Vercel IP (project-scoped or `76.76.21.21`) | **Points root domain at Vercel** |
| CNAME | www | `0dab931d87edecd3.vercel-dns-017.com.` (or `cname.vercel-dns.com`) | **Points www at Vercel** |
| CNAME | _domainconnect | `_domainconnect.gd.domaincontrol.com` | GoDaddy setup helper |
| CNAME | pay | `paylinks.commerce.godaddy.com` | GoDaddy commerce paylinks |
| MX | @ | `aspmx.l.google.com` (Priority 1) | **Google Workspace email — DO NOT TOUCH** |
| MX | @ | `alt1.aspmx.l.google.com` (Priority 5) | Google Workspace email |
| MX | @ | `alt2.aspmx.l.google.com` (Priority 5) | Google Workspace email |
| MX | @ | `alt3.aspmx.l.google.com` (Priority 10) | Google Workspace email |
| MX | @ | `alt4.aspmx.l.google.com` (Priority 10) | Google Workspace email |
| TXT | @ | `google-site-verification=qPuA0_m7bmwPbBpvgXR2Vy5EnIR1bR5l8vZiJAH5VGk` | Google ownership proof |
| TXT | @ | `v=spf1 include:dc-aa8e722993._spfm.contornocollective.com ~all` | Email SPF |
| TXT | `dc-aa8e722993._spfm` | `v=spf1 include:_spf.google.com ~all` | SPF helper record |
| TXT | `google._domainkey` | `v=DKIM1;k=rsa;p=MIIBIjAN…` (full DKIM key) | Email DKIM signing |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net;` | Email DMARC policy |
| TXT | `_github-pages-challenge-watchgabe` | `f2d456cf781232cd45d4e127429381` | Leftover from prior GitHub Pages verification — harmless to leave |

### DNS rules
- **NEVER delete or modify:** All MX records, all TXT records related to SPF/DKIM/DMARC. Doing so breaks `hello@contornocollective.com` instantly.
- **NEVER touch:** NS records or SOA (GoDaddy locked; also required for the domain to work).
- **A record on @:** Points at Vercel. Was previously 4 GitHub Pages IPs (185.199.108-111.153) — those have been replaced.

---

## 14. Email: Google Workspace

- **Provider:** Google Workspace (formerly G Suite)
- **Primary address:** `hello@contornocollective.com`
- **Records in DNS:** MX (5 records to aspmx.l.google.com), SPF, DKIM (google._domainkey), DMARC
- **Where email appears on the site:**
  - `src/components/Nav.astro` — as the top-right CTA button
  - `src/components/Footer.astro` — in the contact column
- **Both use the same `CONTACT_EMAIL` constant** at the top of each component. If email changes: update both files.

---

## 15. Version Control: GitHub

- **Repo:** https://github.com/watchgabe/contorno
- **Owner/user:** `watchgabe`
- **Default branch:** `main`
- **CI/CD:** None (Vercel handles deploys directly from the GitHub webhook — no `.github/workflows/` files)
- **Access:** Public repo (adjust if this changes)

### Branching model
- Human-invoked Claude sessions get a session-specific branch (e.g. `claude/update-brand-guidelines-TIPUy`)
- Work commits to that branch
- Human opens/approves PR into `main`
- Merge to `main` triggers Vercel production deploy

---

## 16. Full Connector Inventory

Every third-party account/service touching the Contorno website, in one place:

| Service | Role | Login / URL | Managed by |
|---|---|---|---|
| **GitHub** | Source code, version control | github.com/watchgabe/contorno | watchgabe |
| **Vercel** | Hosting, CI/CD, previews, HTTPS | vercel.com → contorno project | watchgabe |
| **GoDaddy** | Domain registrar, DNS | account.godaddy.com → contornocollective.com | watchgabe |
| **Google Workspace** | Email (hello@contornocollective.com) | admin.google.com | watchgabe |
| **Google Fonts** | Serves Gabarito, DM Sans, Cormorant Garamond | fonts.google.com (public CDN) | Public |

### NOT currently connected (candidates for later)
- No CMS (all content is in `.astro` files — could add Notion/Sanity/Contentful later)
- No analytics (could add Vercel Analytics, Plausible, or GA4)
- No email marketing (could add Mailchimp/Kit/Resend for ARC applications)
- No form backend (contact = mailto: link; a form would need Formspree/Vercel Functions)
- No CRM (leads via email only)
- No booking system (would be needed for Contorno Property direct bookings)
- No payment processor other than GoDaddy Paylinks (pay.contornocollective.com CNAME exists)

---

## 17. Session History & Decisions

Chronological log of significant decisions and changes across chat sessions.

### Prior chat session (before this one)
- **Brand refresh (2026):** Site updated to new brand guidelines — Gabarito, DM Sans, Cormorant Garamond; palette to terracotta/charcoal/cream.
- **Static HTML → Astro:** Converted single `index.html` to Astro project with shared components (`Nav.astro`, `Footer.astro`, `BaseLayout.astro`) so nav/footer are DRY.
- **Artist Residency page added:** New `src/pages/artist-residency.astro` reachable at `/artist-residency`.
- **Contact email set:** `hello@contornocollective.com` used in both Nav and Footer.
- **Vercel connected:** GitHub → Vercel integration set up. Domain `contornocollective.com` attached in Vercel dashboard.
- **Path config:** `astro.config.mjs` set to `site: 'https://contornocollective.com'` with no base path (Vercel serves at root, not at `/contorno`).

### This chat session
1. **DNS setup:** User configured GoDaddy DNS for Vercel:
   - Deleted the default "Parked" A record
   - Added 4 GitHub Pages A records initially (185.199.108-111.153) — later replaced
   - Then reconfigured for Vercel: A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`
   - Applied Vercel-recommended project-scoped records: `www` → `0dab931d87edecd3.vercel-dns-017.com.`
2. **GitHub Pages abandoned in favor of Vercel:** Realized both were competing; Vercel wins on preview deploys, edge speed, and future-proofing.
3. **Repo cleanup PR (merged):** Deleted `public/CNAME` (GH Pages artifact), deleted `.github/workflows/deploy.yml` (GH Actions Pages deploy — not needed with Vercel), added `CLAUDE.md`.
4. **GitHub Pages custom domain removed:** In repo Settings → Pages, custom domain cleared so it stops fighting with Vercel.
5. **Domain verified in Vercel:** Both `contornocollective.com` and `www.contornocollective.com` show green checkmarks / Valid Configuration.
6. **Typography fix:** The emphasized words (`<em>`) inside `.intro-headline`, `.about-headline`, and `.page-title` were rendering in italic Cormorant Garamond — a "script-on-sans" contrast that read as an FSCreative rip-off. Fixed to align with brand guide's `.brand-mission em` and `.cover-title em` pattern: keep Gabarito, color terracotta, weight 600. (Branch: `claude/fix-header-typography-brand` — open PR at time of writing.)
7. **CLAUDE.md created and merged:** Concise repo-context file at repo root that Claude Code auto-reads on every session.
8. **This file (CONTORNO_BRAIN.md):** Comprehensive brand + infrastructure dump for feeding into external AI brains / new chat contexts.

---

## 18. Common Gotchas

Watch for these:

- **Don't touch email DNS records.** MX, SPF, DKIM, DMARC — deleting any of these breaks `hello@contornocollective.com` instantly. If a service asks you to add a TXT/CNAME for verification, that's fine — ADD one, don't delete an existing.
- **Don't add a `public/CNAME` file.** That's a GitHub Pages artifact. Vercel ignores it. The site is no longer served from GitHub Pages.
- **No GitHub Actions deploy.** Vercel handles deploys directly from the GitHub webhook. There should be no `.github/workflows/` directory. If one appears, question whether it's needed.
- **Astro pages are `.astro`.** Frontmatter (between `---`) is server-side (imports, data prep). Body is HTML/JSX-like. Do not use React syntax like `className` — use plain `class`.
- **Shared components matter.** Edit `Nav.astro` or `Footer.astro` once, every page updates. Don't duplicate nav/footer HTML into individual pages.
- **Cormorant Garamond misuse.** Do NOT use inline inside Gabarito headlines. Use only for: small italic pull-quotes (`.page-lede` pattern), or oversized low-opacity decorative accents. Emphasis in headlines = same Gabarito font, colored terracotta, heavier weight.
- **Neon yellow (`#E8FF00`) is only for hand-drawn overlay marks.** Never as a background, button, or type color.
- **The image folder is called `Edited copy/`** (with a space and lowercase 'c'). Assets are referenced via a `BASE`-prefixed path helper in the frontmatter of each page.
- **Contact email is duplicated in two files.** If it moves, update both `Nav.astro` and `Footer.astro`.

---

## 19. Live URLs & Endpoints

| What | URL |
|---|---|
| **Production site (root)** | https://contornocollective.com |
| **Production site (www)** | https://www.contornocollective.com |
| **Vercel-owned preview** | https://contorno.vercel.app |
| **Artist Residency page** | https://contornocollective.com/artist-residency |
| **ARC legacy standalone page** | https://contornocollective.com/arc.html |
| **Brand guide** | https://contornocollective.com/brandguide.html |
| **GitHub repo** | https://github.com/watchgabe/contorno |
| **This brain file (raw)** | https://raw.githubusercontent.com/watchgabe/contorno/main/CONTORNO_BRAIN.md *(once merged to main)* |
| **CLAUDE.md (raw)** | https://raw.githubusercontent.com/watchgabe/contorno/main/CLAUDE.md |
| **GoDaddy paylinks (subdomain)** | https://pay.contornocollective.com → GoDaddy commerce |

---

## 20. Working With Claude on This Project

### For a new Claude Code session (CLI, IDE extension, or claude.ai/code)
The repo already has `CLAUDE.md` at the root. Claude will auto-load it. You can just say what you want:
- *"Change the terracotta color to a deeper red."*
- *"Add a new page at /about."*
- *"Update the artist residency copy."*
- *"Wire the Artist Residency nav link to the actual page."*

### For a fresh chat with NO repo access (Claude.ai chat, ChatGPT, Gemini)
1. Attach or paste this entire file (`CONTORNO_BRAIN.md`)
2. State the task
3. The model will have full context of brand, infra, and history

### For a Custom GPT / Notion AI / RAG brain
1. Drop this file into the knowledge base
2. Also include `CLAUDE.md` if you want a compact quick-reference
3. Optionally scrape `public/brandguide.html` for the visual brand guide

### Working style Claude should follow
- Develop on a feature branch (session config specifies name)
- Commit + push to that branch
- **Do not push directly to `main`** without explicit user permission
- **Do not open a PR** unless the user asks
- After push, mention the Vercel PR preview URL for review
- Before shipping visual changes, verify they match the brand guide (colors, typography, voice)

---

## Appendix A — Where the Brand Guide Lives (Canonical)

The authoritative visual brand guide is the HTML file at:
- **Source:** `public/brandguide.html`
- **Live:** https://contornocollective.com/brandguide.html

This markdown file summarizes and transcribes it — if there's ever a conflict, the HTML brand guide wins because it shows the actual visual system (color swatches, type specimens, imagery examples) rendered.

## Appendix B — Contact

- **Public email:** hello@contornocollective.com
- **Owner GitHub:** @watchgabe

---

*End of Contorno brain transfer file. Version 1.0 · September 2026.*
