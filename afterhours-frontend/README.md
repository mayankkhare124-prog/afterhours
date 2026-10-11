# AFTERHOURS — Hackathon Website

Premium concept site for a **36-hour hackathon** by **GDG on Campus MITS**, built as a recruitment-task frontend.

**Brand line:** *36 HOURS. ONE DEADLINE. SOMETHING REAL.*  
**Theme:** *Build beyond the obvious.*  
**Art direction:** Midnight Futurism — midnight navy, ice silver, restrained electric cyan.

## Run locally

Requires Node.js 18+ (20+ recommended).

```bash
cd afterhours-frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Output lands in `dist/`. Deploy as a static Vite app (Vercel, Netlify, GitHub Pages, etc.).

## Configure event details

All organizer-facing content lives in `src/data/`:

| File | Purpose |
|------|---------|
| `event.js` | Name, dates, venue, team size, registration URL, socials, judging criteria |
| `tracks.js` | Challenge tracks (filter/search/detail/deep links) |
| `schedule.js` | Full 36h timeline with `H+XX` markers |
| `faq.js` | FAQ copy |
| `prizes.js` | Prize placeholders (`TBA` until confirmed) |
| `rules.js` | Rules & eligibility groups |

Important flags in `event.js`:

- `datesConfirmed` — set `true` only when start/end are official (enables live countdown + calendar `.ics`)
- `registrationUrl` / `registrationUrlPending` — set the real form URL and flip pending to `false`
- `email` / `social.*` — leave empty until verified (the UI will not invent dead links)

## Project structure

```text
src/
  App.jsx                 # Page composition
  main.jsx                # React entry (React import required for JSX)
  components/             # Header, Hero, Scene3D, sections, modals
  data/                   # Centralized event content
  hooks/                  # Countdown, media query, active section
  styles/global.css       # Design tokens + all layout styles
```

## Design & technical choices (walkthrough notes)

1. **Midnight Futurism tokens** — CSS variables for palette, type, space, motion; Syne (display) + IBM Plex Sans/Mono (body/meta).
2. **Hero brand first** — AFTERHOURS wordmark is the dominant signal; headline is the brand line; CTAs are Explore Challenges / View Schedule.
3. **3D with restraint** — React Three Fiber metallic portal, `frameloop="demand"`, lower DPR on mobile, CSS fallback when WebGL is missing or reduced-motion is on.
4. **Data-driven sections** — tracks, schedule, FAQ, prizes, and rules are editable without hunting through JSX.
5. **Challenge explorer** — category filters, search, accessible dialog, copyable `#challenge-*` deep links.
6. **Honest placeholders** — unconfirmed dates, prizes, contacts, and registration are labelled pending; demo registration uses localStorage and never pretends to be official.

## Stack

- React 18 + Vite 6
- Three.js + React Three Fiber + Drei
- Framer Motion
- Lucide React
- Custom CSS (no competing UI frameworks)

## Demo limitations

- Registration and project submission demos write to **browser localStorage only**.
- They are not authentication, email delivery, or a shared organizer database.
- Do not store passwords or payment data in the demo forms.
- Replace all TBA / pending fields before any public launch.

## Accessibility & performance

- Keyboard-friendly nav, FAQ, dialogs (Escape to close)
- Visible `:focus-visible` rings
- `prefers-reduced-motion` disables ticker / 3D motion and uses the CSS portal
- Lazy-loaded 3D scene; paused when off-screen

## Before publishing / submission video

1. Confirm dates, venue, rules, prizes, registration URL, eligibility.
2. Fill `event.js` contact + socials with official values only.
3. Swap track/schedule copy for organizer-approved content.
4. Record the walkthrough: running site, key interactions, `src/data` config, 3D + fallback, and demo vs real registration.
