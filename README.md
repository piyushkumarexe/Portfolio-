# Piyush Kr — Portfolio

A dark, Discord-bot-developer style single-page portfolio, rebuilt 1:1 in structure
and look from a reference design and personalised for **Piyush Kr**.

## Structure

```
index.html            — full page markup
assets/style.css      — theme, layout, animations
assets/main.js        — loader, scroll reveal, counters, presence (Lanyard)
assets/images/        — avatar, project logos & banners
```

## Sections

- Hero (name, meta, intro, CTA) + profile card (Discord activity + Spotify)
- Stats (Projects / Experience / Client Served / Years Old)
- 01 · Skills & Stack
- 02 · Projects — **Rebiton™** (Discord bot) and **Ind Editor** (code editor app)
- 03 · Journey (timeline)
- 04 · Get In Touch

## Customise your details

Open `index.html` and replace the placeholders:

- Discord user link — search `discord.com/users/`
- GitHub link — search `github.com/`
- Spotify link — search `open.spotify.com`
- Email — search `mailto:`

For live Discord presence + Spotify, set your Discord user ID in
`assets/main.js` → `DISCORD_ID` (uses the [Lanyard API](https://lanyard.rest)).
It gracefully falls back to "Offline / Not listening" when unset.

## Run locally

```bash
python3 -m http.server 8000 --directory .
```

Then open http://localhost:8000
