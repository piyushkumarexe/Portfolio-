# Portfolio

Personal portfolio site for **Piyush Kumar** — Coder & Developer building mobile apps, Discord bots and automations.

A dark, editorial single-page portfolio in a **serif + gold "Discord developer" aesthetic** (Playfair Display type, monospace labels, Discord-style profile card), built with plain **HTML, CSS & JavaScript**. No framework, no build step.

## ✨ Features

- Editorial hero: mono kicker, oversized serif name with gold italic accent, live IST clock in the navbar
- Discord-style profile card (striped banner, circular avatar + status dot, activity widgets, social buttons)
- Stats band with animated counters
- 01 Skills & Stack · 02 Projects · 03 Journey · 04 Get In Touch — numbered serif section headers
- Project cards with ghost monograms, status chips, tag pills and feature lists
- Journey timeline with gold rail
- **Project case-study pages** (`projects/`) reusing the same shell: breadcrumb, release card, screenshot gallery with a keyboard-accessible lightbox, feature grid, spec strip and APK download table
- Contact cards, location strip and a gold CTA banner
- Loader, reveal-on-scroll (staggered), active-section nav highlight, subtle card tilt
- Responsive (mobile menu, grids collapse) & `prefers-reduced-motion` support

## 🚀 Run locally

```bash
python3 -m http.server 8080     # or: npx serve .
```

Then visit <http://localhost:8080>. The simple Python server does not support Vercel's
clean URLs, so open <http://localhost:8080/projects/tourism.html> directly for the case
study. Use Vercel locally or in production to test the `/projects/tourism` link.

## 📦 Deploy

Fully static — deploy to **Vercel** with no build command. Other static hosts require
equivalent clean-URL routing for `/projects/tourism` and the preferred-domain redirect.

## ✏️ Editing

Home-page content lives in `index.html`; each case study is one file in `projects/`. Key pieces:

- Hero name, kicker, meta, description, profile card → `index.html`
- Stats numbers (`data-target` / `data-suffix`) → `index.html`
- Projects, tags & links → `index.html`
- Tourism case study → `projects/tourism.html`
- Contact links (Discord, GitHub, Instagram, Email) → `index.html`
- Theme tokens (colors, fonts, radii) → `css/style.css` (`:root`)
- Loader, IST clock, nav, reveal, counters, tilt, screenshot lightbox → `js/main.js`

### Contact details currently in the site

- **Discord:** @piyushkumarexe (ID `1106606259454611507` — used for live presence)
- **Instagram:** @Piyushkumar.exee
- **Email:** piyushpk811@gmail.com
- **GitHub:** @piyushkumarexe

### Live Discord presence (Lanyard)

`js/main.js` polls the [Lanyard](https://github.com/Phineas/lanyard) API to show your real
status (online/idle/dnd/offline), your Discord avatar, name, and Spotify "now listening".
To activate it once:

1. Join the Lanyard Discord server: `discord.gg/lanyard` (stay in it — it only monitors members).
2. For Spotify: connect Spotify to Discord, enable **Share my listening activity**, keep it playing.

Until then the card keeps its styled static fallback — nothing breaks.

## 🧭 Projects on the site

| Project | Card | Detail page |
| --- | --- | --- |
| **Tourism** (Flutter Android app: maps, AI guide, safety zones, SOS, Digital ID, Eco Score) | `index.html` (first, featured) | [`projects/tourism.html`](projects/tourism.html) → `/projects/tourism` |
| **IND Editor** (Flutter video editor) | `index.html` (featured) | — |
| **Rebiton** (AI agent bot) | `index.html` | — |
| **Client Automations** | `index.html` | — |

The Tourism case study links to the source at
[`piyushkumarexe/travelling`](https://github.com/piyushkumarexe/travelling) and to the
per-ABI release APKs published by GitHub Actions under the
[`apk-latest`](https://github.com/piyushkumarexe/travelling/releases/tag/apk-latest) tag.

### Adding another case study

Copy `projects/tourism.html`, swap the copy and assets, then:

1. add the project card at the top of `.projects` in `index.html`,
2. drop the screenshots in `assets/<project>/`,
3. add the new URL to `sitemap.xml`.

No CSS or JS changes are needed — the case-study styles and the lightbox are already in
`css/style.css` and `js/main.js`, and both activate only when the matching markup exists.

### Assets

- `assets/piyush-photo.png` — profile-card avatar (illustrated stand-in; auto-replaced by your real Discord photo once Lanyard is joined)
- `assets/rebiton-logo.png`, `assets/rebiton-banner.jpg` — Rebiton project card
- `assets/ind-editor-logo.png`, `assets/ind-editor-banner.jpg` — IND Editor project card
- `assets/tourism-logo.png`, `assets/tourism-banner.jpg` — Tourism project card
- `assets/tourism/*.webp` — seven app screenshots used by the case-study gallery and lightbox
- To use your real selfie: GitHub → repo → `assets/` → **Add file → Upload files** → upload as `piyush-photo.png` (same name = instant swap, no code change).


## Search visibility

The canonical site is `https://www.piyushsdevportfolio.dev/`. The homepage and Tourism page
include unique titles, descriptions, social sharing metadata and structured data; `robots.txt`
and `sitemap.xml` point to the same domain. Update these URLs if the production domain changes.
The statistics count projects overall; the projects section is a selection rather than a list
of every project.

After deployment, confirm the custom domain and HTTPS work in Vercel. The apex domain redirects to
the `www` domain in Vercel, and `vercel.json` redirects the public Vercel domain to it. Verify
`https://www.piyushsdevportfolio.dev/` in Google Search Console (the existing verification tag is
preserved), submit `https://www.piyushsdevportfolio.dev/sitemap.xml`, and request indexing of the
homepage and case study. Google controls indexing and rankings, so neither immediate indexing
nor a first-place result can be guaranteed.
