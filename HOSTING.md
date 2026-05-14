# Contorno Collective — Hosting & Access Reference

Single source of truth for **where everything lives and how to log in**.
Code-level details (file structure, how to make changes) are in [`CLAUDE.md`](./CLAUDE.md).

> **Owner account / billing:** `gabe@golocalgroup.com` (use this email when in doubt — every service below is registered to it unless noted).
>
> **Passwords / MFA codes:** Stored in your password manager (1Password / Bitwarden / etc.) — **not in this repo, never commit them**.

---

## Quick-paste prompt for a new AI thread

Copy everything between the lines below into a fresh Claude / Perplexity / ChatGPT session whenever you start a new thread about this project. It tells the AI exactly what it's looking at without re-explaining.

```
I'm working on the Contorno Collective website.

- Live site: https://contornocollective.com (also www.contornocollective.com)
- Repo: https://github.com/watchgabe/contorno (default branch: main)
- Framework: Astro 4 (static site, builds to plain HTML/CSS/JS)
- Hosted on: Vercel (auto-deploys on push to main; every PR gets a preview URL)
- Domain registrar / DNS: GoDaddy
- Email (hello@contornocollective.com): Google Workspace — DO NOT touch MX/SPF/DKIM/DMARC records
- Owner account on every service: gabe@golocalgroup.com

Full project context is in CLAUDE.md at the repo root.
Hosting / login map is in HOSTING.md at the repo root.

Sub-brands / extra pages live at:
- /artist-residency  — current Astro page
- /arc.html          — newer ARC landing page (static, in public/)
- /brandguide.html   — brand guidelines reference

When making changes:
- Edit Astro pages under src/pages/, components under src/components/, styles in src/styles/global.css
- Static-only HTML (like arc.html) lives in public/ and is served verbatim
- Never push directly to main without my OK — open a PR and I'll review the Vercel preview
```

---

## Services map

| # | What | URL | Account login | Purpose |
|---|---|---|---|---|
| 1 | **Production site** | https://contornocollective.com | — (public) | What visitors see. Served by Vercel. |
| 2 | **GitHub (source of truth)** | https://github.com/watchgabe/contorno | github.com/login — user `watchgabe` (email: `gabe@golocalgroup.com`) | Stores all code + history. Every push to `main` triggers a Vercel deploy. |
| 3 | **Vercel (hosting / builds)** | https://vercel.com/dashboard | vercel.com/login — sign in **with GitHub** as `watchgabe` | Builds the Astro site and serves it. Shows deploy logs, preview URLs, domain config. |
| 4 | **GoDaddy (domain + DNS)** | https://dcc.godaddy.com/control-portal | godaddy.com/sign-in — `gabe@golocalgroup.com` | Owns `contornocollective.com` registration. DNS records point to Vercel + Google. |
| 5 | **Google Workspace (email)** | https://admin.google.com | admin.google.com — `gabe@golocalgroup.com` (admin) | Runs the `hello@contornocollective.com` mailbox. |
| 6 | **Inbox for hello@** | https://mail.google.com | mail.google.com — `hello@contornocollective.com` | Where applications + general contact land. |
| 7 | **Typeform (ARC application form)** | https://admin.typeform.com | typeform.com/login — `gabe@golocalgroup.com` | Hosts the ARC residency application embedded on `/arc.html`. **The iframe in `public/arc.html` currently uses placeholder `TYPEFORM_URL` — swap it for the real share URL once the form is published.** |
| 8 | **Instagram (@contornocollective)** | https://instagram.com/contornocollective | instagram.com — handle `contornocollective` | Social. Linked from footer. |

---

## How the pieces connect

```
[ GitHub repo: watchgabe/contorno ]
            │
            │ push to main
            ▼
[ Vercel build (Astro → static HTML) ]
            │
            │ deploys to
            ▼
[ contornocollective.com  ◄── DNS via GoDaddy ──► Vercel edge ]

[ hello@contornocollective.com ]  ◄── MX records on GoDaddy ──► [ Google Workspace ]

[ /arc.html  →  Typeform iframe (TYPEFORM_URL) ]
```

---

## DNS records (current — do not change without reason)

Set in GoDaddy → My Products → Domains → `contornocollective.com` → DNS.

| Type | Name | Value | Purpose | Safe to edit? |
|---|---|---|---|---|
| A | `@` | `76.76.21.21` | Points root domain at Vercel | Only if Vercel changes their IP |
| CNAME | `www` | `cname.vercel-dns.com` | Points `www.` at Vercel | Only if Vercel changes |
| MX | `@` | (Google's 5 records) | Routes email to Google Workspace | **NEVER TOUCH** |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | SPF for email auth | **NEVER TOUCH** |
| TXT | `google._domainkey` | (DKIM key) | DKIM for email auth | **NEVER TOUCH** |
| TXT | `_dmarc` | (DMARC policy) | DMARC for email auth | **NEVER TOUCH** |
| CNAME | `pay` | (GoDaddy commerce) | GoDaddy paylinks (legacy) | Optional — remove if unused |
| TXT | `_github-pages-challenge-watchgabe` | (verification token) | Leftover from previous GH Pages setup | Harmless. Can delete. |

If `hello@` ever stops receiving mail, the first place to look is whether MX/SPF/DKIM/DMARC got modified.

---

## Deploy flow

1. Edit code locally (or in a Claude session on a feature branch).
2. Commit + push the feature branch → Vercel builds a **preview URL** automatically. Vercel comments the link on the PR.
3. Review the preview URL in a browser.
4. Merge the PR into `main` → Vercel deploys to **production** at `contornocollective.com` (~15–30 sec).

**Local dev:**
```bash
npm install
npm run dev   # http://localhost:4321
```

---

## Common ops tasks — where to do them

| Need to… | Where |
|---|---|
| Change copy / layout / nav / footer / styles | Edit code in the repo (see `CLAUDE.md` for the file map) |
| Add a new page | Drop `src/pages/<name>.astro` (becomes `/<name>` URL) |
| Replace the Typeform on `/arc` | Edit `public/arc.html`, replace `TYPEFORM_URL` with the real share URL from Typeform |
| Check why a deploy failed | Vercel dashboard → Project: `contorno` → Deployments → click the red one → "Build Logs" |
| Roll back a bad deploy | Vercel dashboard → Deployments → pick a previous green one → "Promote to Production" |
| Add a new contributor | GitHub repo → Settings → Collaborators |
| Recover a deleted file | GitHub repo → file history, or `git log --diff-filter=D --summary` locally |
| Change the production domain | Vercel project → Settings → Domains, **and** update DNS in GoDaddy |
| Update `hello@` mailbox password | Google Workspace admin → Users → `hello@contornocollective.com` |

---

## Recovery / fallback access

If you lose access to any of these, use the recovery flow in this order:

1. **GoDaddy** — the registrar. If this is lost, the whole domain (site + email) is lost. Make sure 2FA recovery codes are saved somewhere offline.
2. **Google Workspace admin** — controls `hello@`. Recovery typically routes through the admin's personal recovery email.
3. **GitHub** — controls the code. Sign-in via Vercel breaks if this breaks. Keep 2FA recovery codes.
4. **Vercel** — signs in via GitHub. As long as GitHub access is intact, Vercel is fine.
5. **Typeform** — applications. Not critical for the site to load, but losing it means losing the ARC application form.

**Strong recommendation:** store 2FA recovery codes for **GoDaddy, Google Workspace, and GitHub** in your password manager. Those three are the irreversible ones.

---

## When in doubt

- Code question → `CLAUDE.md`
- "Where does X live / how do I log in" → this file (`HOSTING.md`)
- "Is the site down?" → check https://vercel.com/dashboard, then the production URL, then DNS via `dig contornocollective.com`
