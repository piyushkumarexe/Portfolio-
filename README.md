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
- Contact cards, location strip and a gold CTA banner
- Loader, reveal-on-scroll (staggered), active-section nav highlight, subtle card tilt
- Responsive (mobile menu, grids collapse) & `prefers-reduced-motion` support

## 🚀 Run locally

```bash
python3 -m http.server 8080     # or: npx serve .
```

Then visit <http://localhost:8080>.

## 📦 Deploy

Fully static — deploy the folder to **Cloudflare Pages**, **Vercel**, **Netlify**, or **GitHub Pages** (no build command needed).

## ✏️ Editing

All content lives in `index.html`. Key pieces:

- Hero name, kicker, meta, description, profile card → `index.html`
- Stats numbers (`data-target` / `data-suffix`) → `index.html`
- Projects, tags & links → `index.html`
- Contact links (Discord, GitHub, Instagram, Email) → `index.html`
- Theme tokens (colors, fonts, radii) → `css/style.css` (`:root`)
- Loader, IST clock, nav, reveal, counters, tilt → `js/main.js`

### Contact details currently in the site

- **Discord:** @piyushkumarexe
- **Instagram:** @Piyushkumar.exee
- **Email:** piyushpk811@gmail.com
- **GitHub:** @piyushkumarexe
