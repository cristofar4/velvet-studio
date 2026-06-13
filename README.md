# Crown & Blade

> The art of precision grooming.

An Awwwards‑grade, cinematic website for a fictional luxury barbershop atelier. Obsidian‑and‑bone editorial design with a single razor‑crimson accent, a real WebGL hero, a pinned horizontal gallery, and one continuous scroll‑driven journey.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS‑first tokens in `app/globals.css`) |
| 3D | Three.js + React Three Fiber + drei (in‑scene Lightformers, no external HDR) |
| Motion | GSAP + ScrollTrigger (scroll choreography, pinned horizontal scroll) and Framer Motion (transitions, carousels, modals) |
| Scrolling | Lenis smooth scroll, synced to GSAP's ticker |
| UI | Shadcn‑style components (cva + Radix Dialog) |
| Type | Bodoni Moda (display) · Manrope (sans) · JetBrains Mono (labels) |

## Signature moments

- **Preloader** — the wordmark assembles, a crimson edge sweeps, a counter runs to 100, then two panels part to reveal the hero.
- **Hero** — cinematic barbershop video graded to obsidian, a **real‑time WebGL blade fan** (polished steel lit by in‑scene light cards, crimson edge, pointer‑reactive) dynamically loaded with the video as graceful fallback, kinetic split‑word headline, parallax on scroll.
- **About** — an oversized lead line, a GSAP clip‑path image reveal that wipes open from the floor, dual‑speed parallax frames, numbered pillars.
- **Services** — an interactive index: hover a ritual and a large cinematic preview morphs with a clip reveal while the row expands. Reinvented from a card grid.
- **Gallery** — a **pinned horizontal‑scroll campaign**: the section pins and pans through editorial frames as you scroll, with a keyboard‑navigable lightbox. Native snap‑scroll on mobile.
- **Team** — a cast list where a portrait follows the cursor and swaps per artist, names sliding on hover; tilt cards on mobile.
- **Booking** — a validated glass form (shake on error, time‑slot chips) with a **Shadcn Dialog** confirmation and an animated crimson check.
- **Testimonials** — a draggable, auto‑advancing carousel that turns through 3D space, with animated star ratings.
- **Contact** — editorial footer: address, hours, newsletter, socials, and a giant outline wordmark.
- **Micro‑interactions** — bespoke two‑part cursor with contextual labels, magnetic buttons, ink ripples, all gated behind `pointer: fine` and `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Structure

```
app/                  layout (fonts, metadata, providers), page, theme tokens
components/
  providers/          Lenis smooth-scroll context · intro/preloader gate
  three/              BladeScene — the React Three Fiber hero object
  fx/                 Cursor · Magnetic · Reveal/SplitWords · CountUp · TiltCard · Marquee
  ui/                 Button (cva CTA) · dialog (Radix) · SectionHeading
  layout/             Preloader · Navbar
  sections/           Hero · About · Services · Gallery · Team · Booking · Testimonials · Contact
lib/                  brand data & Pexels media helpers
```

## Media

All photography and footage is royalty‑free from [Pexels](https://www.pexels.com) (notably cottonbro studio and RDNE Stock project), hotlinked through the Pexels CDN — every asset is unique, no placeholders. Swap any asset in `lib/data.ts`.

## Notes

- The WebGL hero degrades gracefully: it is client‑only (`ssr: false`) and the graded hero video sits behind it, so the hero is unforgettable even without WebGL.
- The booking flow is a front‑end simulation; wire `components/sections/Booking.tsx` to your scheduler of choice.
- `HairSalon` JSON‑LD, Open Graph and Twitter cards are configured in `app/layout.tsx` / `app/page.tsx`.
