# Bubalan S — Portfolio

Personal portfolio website built with **Next.js 14**, **Tailwind CSS**, and **React 18**.

## Live Site

> Deploy URL goes here (Netlify / Vercel)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + styled-components |
| Language | JavaScript (React 18) |
| Icons | react-icons |
| Animations | CSS keyframes, IntersectionObserver |
| Typewriter | react-simple-typewriter |
| Scroll | react-scroll |

## Sections

- **Hero** — Name, typewriter role, CTA buttons, social links
- **About** — Bio, education chips, availability status
- **Technologies** — Scrolling ticker with tech logos
- **Coding Arena** — LeetCode stats (292 solved), heatmap embed
- **Resume** — Education timeline + Skills by category
- **Projects** — Bento grid layout with GitHub links
- **Footer** — Contact email, social icons, availability badge

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Design

- Light theme with **EsperPraxi** colour palette
- Primary accent: `#2EA88A` (green)
- Secondary accent: `#2B8EC9` (blue)
- Background: `#FFFFFF` · Cards: `#F5F7FA` · Text: `#111827`
- Inter font (Google Fonts)
- Custom loading screen: `B.` logo → animated crosshair + spin → site reveal

## Project Structure

```
app/
  layout.js        # Root layout
  page.js          # Entry — SSR-safe dynamic import
  Portfolio.js     # Main client component
  Loader.js        # Loading screen animation
  globals.css      # Tailwind directives + global styles
  registry.js      # styled-components SSR registry

src/components/
  navbar/          # Fixed nav with scroll-aware glass effect
  banner/          # Hero section
  contact/         # About section
  features/        # Scrolling tech ticker
  tesimonial/      # LeetCode / Coding Arena stats
  resume/          # Education timeline + Skills grid
  projects/        # Bento grid project cards
  footer/          # Footer + bottom bar
  layouts/         # Shared Title component
```

## About Me

**Bubalan Shanmuga Sundaram** — Full Stack Developer  
MSc Computer Science · Open to SDE / SWE internship or full-time opportunities  
📧 bubalan.shanmugasundaram@predigle.com
