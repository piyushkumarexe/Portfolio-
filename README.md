# Portfolio

Personal portfolio site for **Piyush Kumar** — Coder & Developer building mobile apps, Discord bots and automations.

A dark, developer-themed, responsive single-page portfolio built with plain **HTML, CSS & JavaScript**. No framework, no build step.

## ✨ Features

- Animated hero with a status card & gradient stats
- Skills / stack grid
- Projects (IND Editor, Rebiton bot)
- Journey timeline
- Contact section (Discord, Instagram, Email, GitHub)
- Responsive (mobile menu, grid → single column)
- Reveal-on-scroll & reduced-motion support
- Custom "Piyush" developer avatar (`assets/piyush-avatar.png`)

## 🚀 Run locally

```bash
python3 -m http.server 8080     # or: npx serve .
```

Then visit <http://localhost:8080>.

## 📦 Deploy

Fully static — deploy the folder to **Cloudflare Pages**, **Vercel**, **Netlify**, or **GitHub Pages** (no build command needed).

## ✏️ Editing

All content lives in `index.html`. Key pieces:

- Hero name, strap, status card → `index.html`
- Stats numbers (`data-target`) → `index.html`
- Projects & links → `index.html`
- Contact links (`Discord`, `Instagram`, `Email`) → `index.html`
- Theme colours & fonts → `css/style.css` (`:root` tokens)
- Loader, nav, reveal, counters → `js/main.js`

### Contact details currently in the site

- **Discord:** @piyushkumarexe
- **Instagram:** @Piyushkumar.exee
- **Email:** piyushpk811@gmail.com
- **GitHub:** @piyushkumarexe
