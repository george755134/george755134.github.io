# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/booking website for 上新牙醫診所 (Shangxin Dental Clinic), a real operating Taiwanese dental clinic. Originally scaffolded in Google AI Studio (see `metadata.json`, `assets/.aistudio/`). All UI copy and data content is in Traditional Chinese. Brand identity is a "植牙魔術師" (implant magician) theme — logo and all doctor photos use a matching magician-stage motif (gold arch, navy curtains, top hat, wand).

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server on port 3000 (0.0.0.0)
npm run build     # production build (vite build)
npm run preview   # preview the production build
npm run lint      # type-check only (tsc --noEmit) — there is no separate lint config
npm run clean     # rm -rf dist server.js
```

There is no test runner configured in this repo.

## Architecture

Single-page React 19 + TypeScript app built with Vite 6 and Tailwind CSS v4 (via `@tailwindcss/vite`, configured inline through `@theme` in `src/index.css` — there is no `tailwind.config.js`). Brand accent color is `--color-blue-accent: #2C4A66` (navy), used via `bg-blue-accent`/`text-blue-accent`/`.blue-accent` utility classes defined in `index.css`.

**Data flow is one-directional and in-memory, no backend/persistence:**
- `src/types.ts` defines all domain interfaces (`Doctor`, `Service`, `Review`, `Case`, `NewsItem`, `FAQItem`, `Booking`, `ClinicSchedule`, etc.). `Service` has no `price` field — pricing is intentionally not displayed anywhere on the site (CTA buttons only).
- `src/data.ts` holds all static content as typed constants — clinic info, doctor bios, services, reviews, cases, FAQ (`IMPLANT_FAQ`, `ALLON4_FAQ`, `SEDATION_FAQ`, `HOME_VISIT_FAQ`), and `INITIAL_SCHEDULE`/`INITIAL_NEWS` seed data. Editing site copy/content almost always means editing this file, not the components.
- `src/App.tsx` is the single stateful root: it owns `bookings`, `schedule`, `news`, and `notices` in React state (seeded from `data.ts`) and passes both the data and mutation handlers (e.g. `handleAddBooking`, `handleUpdateScheduleSlot`) down as props. There is no context/store — state lives at the top and flows down through props.
- All page sections (`Hero`, `About`, `Services`, `Doctors`, `Cases`, `Reviews`, `FAQ`, `Schedule`, `BookingForm`, `ContactMap`, `LINEBlock`, `Footer`) are rendered in a fixed order in `App.tsx` as one long scrolling landing page; navigation is scroll-to-section via element IDs (e.g. `#booking`, `#services`), not routing.
- `CMSPanel.tsx` is an admin-style overlay (toggled from `Navbar`) that lets an operator manage bookings, weekly doctor schedule, and news/notices — it operates on the same lifted state from `App.tsx`, so changes there flow straight back into the public-facing sections (e.g. `Schedule`). Since state is in-memory only, all CMS edits and new bookings are lost on page reload.
- `FloatingActions` and `LINEBlock` surface the clinic's LINE contact (`CLINIC_LINE_URL`/`CLINIC_LINE_ID` in `data.ts`) as the primary conversion channel alongside the booking form. **This is a personal LINE account, not a LINE Official Account** — avoid "官方" (official) wording in LINE-related copy anywhere on the site, and don't assume Basic-ID-style (`@handle`) add-friend URLs work; `CLINIC_LINE_URL` must be the actual invite link generated from inside the LINE app (Settings → share via URL), which looks like `https://line.me/ti/p/<random-token>`.
- `BookingForm.tsx` submit flow has no backend to actually deliver the booking: on submit it best-effort copies a formatted summary of the form to the clipboard (`navigator.clipboard`) and opens `CLINIC_LINE_URL` in a new tab, so the patient can paste-and-send in LINE. The success screen's message adapts based on whether the clipboard write succeeded.

**Doctor photos** (`public/assets/dr-*.jpg`, referenced via `Doctor.photo` in `data.ts`): all provided as pre-made magician-theme poster images (name calligraphy, arch/curtain background baked in) rather than plain headshots. They're pre-processed to a uniform 900×1200 (3:4) canvas before being dropped in `public/assets` — if a new doctor photo arrives at a different aspect ratio, match it to 3:4 (crop, or extend a blank background region — do not letterbox/pad with a visible border color) before adding it, since `Doctors.tsx` renders the `<img>` at natural size (`w-full h-auto`, no `object-cover` crop) and expects consistent height across the grid.

**Google rating numbers** (Hero stat card, About floating badge, Reviews section header) are manually entered from the clinic's real Google Maps listing (currently 3.9★ / 40 reviews) — not live-fetched. The 3 review cards in `REVIEWS` (`data.ts`) are still placeholder/fictional text, not real reviews. A plan for live-fetching real reviews/rating via the Google Places API exists at `~/.claude/plans/here-is-a-new-quirky-piglet.md` (client-side fetch, restricted API key, no backend needed — deferred pending the clinic setting up a Google Cloud billing account).

**Path alias:** `@/*` maps to the repo root (configured in both `tsconfig.json` and `vite.config.ts`).

**Dev server note:** `vite.config.ts` disables HMR/file-watching when `DISABLE_HMR=true` is set — this is intentional (used by the AI Studio agent environment to avoid flicker during automated edits), don't remove it.

**Navbar/Hero height coupling gotcha:** `Navbar.tsx`'s fixed nav renders differently at the top of the page vs. scrolled (transparent+dark-gradient vs. white), and `Hero.tsx` has a decorative dark overlay `<div>` behind it (`className="absolute top-0 left-0 w-full h-[5.5rem] bg-slate-900..."`) to keep the unscrolled nav text readable. These two heights must stay in sync (currently both 88px / `5.5rem`) — if the navbar's padding changes, update this Hero overlay to match, or a sliver of the dark block will show below the nav content.
