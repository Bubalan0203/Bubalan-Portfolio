# bubalan.dev — portfolio (Next.js)

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger (`@gsap/react`) · Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static prerender
```

- **Photo:** drop `photo.jpg` into `public/`. An animated monogram shows until it loads.
- **Content:** all copy lives in `lib/content.ts` (résumé is the source of truth); skill icons in `lib/skills.ts`; ⌘K answers in `lib/kb.ts`.
- **Structure:** `components/chrome/*` (loader, nav, cursor, status bar, ⌘K, smooth scroll), `components/sections/*` (one file per section), `lib/motion.ts` (GSAP setup + shared helpers).
- **Styling:** Tailwind theme tokens map to the site's CSS variables (`bg-surface`, `text-ink`, `font-display`, …). Bespoke component styles sit in `@layer components` in `app/globals.css`, so utilities can override them.
- **Motion:** every animation is gated by `prefers-reduced-motion` via `gsap.matchMedia()`; reduced motion shows final states.
