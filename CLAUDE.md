# Contorno Collective — Project Context

This file is read automatically at the start of every Claude Code session. It contains everything a fresh chat needs to pick up work without re-explaining the project.

## What this is

The website for **Contorno Collective**, an arts collective. Live at:

- **Production:** https://contornocollective.com
- **Vercel preview URL:** https://contorno.vercel.app
- **Repo:** https://github.com/watchgabe/contorno

## Tech stack

- **Astro 4.16** — static site generator. Builds to plain HTML/CSS/JS in `dist/`.
- **Vercel** — hosts the built site. Auto-deploys on every push to `main`. Every PR also gets its own preview URL.
- **GoDaddy** — registrar + DNS for `contornocollective.com`.
- **Google Workspace** — email for `hello@contornocollective.com` (do NOT touch MX/SPF/DKIM/DMARC records).

## Repo structure

```
contorno/
├── astro.config.mjs           ← site URL config
├── package.json               ← npm scripts (dev/build/preview)
├── public/
│   ├── arc.html               ← legacy ARC page (static)
│   ├── brandguide.html        ← brand guidelines reference page
│   └── Edited copy/           ← brand assets
└── src/
    ├── layouts/
    │   └── BaseLayout.astro   ← <head>, fonts, page shell — wraps every page
    ├── components/
    │   ├── Nav.astro          ← top nav (links + contact email)
    │   └── Footer.astro       ← footer (links + contact email)
    ├── pages/
    │   ├── index.astro        ← homepage content
    │   └── artist-residency.astro  ← /artist-residency page
    └── styles/
        └── global.css         ← brand colors, fonts, all site-wide CSS
```

## How to make changes

| Change | File to edit |
|---|---|
| Nav links / contact email in nav | `src/components/Nav.astro` |
| Footer | `src/components/Footer.astro` |
| Homepage copy | `src/pages/index.astro` |
| Artist Residency copy | `src/pages/artist-residency.astro` |
| Site-wide colors / fonts / CSS variables | `src/styles/global.css` (`:root` block) |
| `<head>`, fonts, meta tags | `src/layouts/BaseLayout.astro` |
| Add a new page | Drop `src/pages/<name>.astro` — becomes `/<name>` automatically |
| Add static asset (image, PDF) | Drop in `public/` — served from site root |

## Brand guidelines

Live reference: https://contornocollective.com/brandguide.html

- **Colors** (CSS vars in `global.css`):
  - `--terracotta` `#C0583A` (primary accent)
  - `--charcoal` `#2A2A2A` (body text)
  - `--cream` `#EDE6D6` (background)
  - `--offwhite` `#F5F0E8`
- **Fonts:**
  - Gabarito — display / headings
  - DM Sans — body + uppercase labels
  - Cormorant Garamond — italic accents (use `<em>`)

## Deploy flow

1. Edit files locally
2. Commit + push (any branch)
3. **Push to `main`** → Vercel deploys to production at `contornocollective.com` (~10–20 sec)
4. **Push to a feature branch / open a PR** → Vercel builds a preview URL for review

**Local dev:** `npm install` then `npm run dev` → http://localhost:4321

## Branch policy

- Default branch: `main`
- Claude sessions develop on a feature branch (specified in session config), then open a PR into `main`
- **Never push directly to `main` without explicit user permission**
- **Never open a PR unless the user asks**
- Use Vercel's PR preview URL to review changes before merging

## DNS setup (already done — for reference only)

GoDaddy DNS for contornocollective.com points at Vercel:

- **A `@`** → `76.76.21.21` (Vercel)
- **CNAME `www`** → `cname.vercel-dns.com`
- **MX / SPF / DKIM / DMARC records** → Google Workspace email — **NEVER DELETE OR MODIFY**
- **CNAME `pay`** → GoDaddy commerce paylinks
- **TXT `_github-pages-challenge-watchgabe`** → leftover from prior GitHub Pages setup, harmless to leave

In Vercel project → Domains: `contornocollective.com` and `www.contornocollective.com` are both attached.

## Common gotchas

- **Don't touch email DNS records** — breaks `hello@contornocollective.com` instantly.
- **Don't add a `public/CNAME` file** — that's a GitHub Pages artifact. Vercel ignores it. The site is no longer served from GitHub Pages.
- **Astro pages are `.astro`** — frontmatter (between `---`) is server-side, body is HTML/JSX-like.
- **Shared components** — edit `Nav.astro` or `Footer.astro` once, every page updates.
- **No GitHub Actions deploy** — Vercel handles deploys directly from GitHub. There's no `.github/workflows/` directory.

## Contact

- Public email: `hello@contornocollective.com`
- This email appears in `Nav.astro` and `Footer.astro` — change in both if it ever moves.
