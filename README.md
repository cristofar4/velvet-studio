# Velvet Fade Studio

> Precision Cuts. Timeless Style.

A cinematic, luxury-grade website for a premium barbershop — dark editorial design with gold & silver accents, glassmorphism, real barbershop film and photography, and motion design throughout. Built as a portfolio-quality, production-ready single page experience.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first tokens in `app/globals.css`) |
| Motion | Framer Motion (in-view choreography, carousel, modals) + GSAP ScrollTrigger (scroll-driven parallax) |
| Scrolling | Lenis smooth scrolling, synced to GSAP's ticker |
| Type | Playfair Display (display serif) + Manrope (grotesque) via `next/font` |

## Experience map

- **Preloader** — brand letters, gold hairline sweep, 0→100 counter, curtain exit gating the hero choreography.
- **Hero** — full-screen barbershop film (cottonbro studio via Pexels) with layered gradients, film grain, word-by-word headline reveal, parallax on scrub, glowing magnetic CTAs, and a glass statistics shelf with count-up numbers.
- **Marquee** — infinite editorial ticker.
- **The House (About)** — split layout, dual parallax imagery, rotating "Est. 2012" badge, numbered pillars, pull-quote.
- **Services** — five ritual cards with pointer-tracked 3D tilt, cursor sheen, hover glow, and a wide "Most Coveted" VIP card.
- **Masters** — four barber portraits: grayscale→color hover, rising veil, specialty tags, social links, staggered entrances.
- **Gallery** — masonry archive with zoom-on-hover captions and a keyboard-navigable lightbox.
- **Reviews** — draggable, auto-advancing testimonial carousel with animated star ratings.
- **Booking** — glass reservation form with live validation, shake-on-error, time-slot chips, ambient film panel, and a confirmation modal with an animated gold check.
- **Footer** — outline wordmark, hours, socials, newsletter signup, magnetic back-to-top.
- **Micro-interactions** — bespoke two-part cursor with contextual labels, magnetic buttons, click ripples, hover glows. All gated behind `pointer: fine` and `prefers-reduced-motion`.

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
  fx/                 Cursor · Magnetic · Reveal/SplitWords · CountUp · Marquee · TiltCard
  ui/                 Buttons (ripple/glow/magnetic) · SectionHeading
  layout/             Preloader · Navbar · Footer
  sections/           Hero · About · Services · Barbers · Gallery · Testimonials · Booking
lib/                  site data & Pexels media helpers
```

## Media

All photography and footage is royalty-free from [Pexels](https://www.pexels.com) (notably cottonbro studio and RDNE Stock project), hotlinked through the Pexels CDN — no placeholders. Swap any asset in `lib/data.ts`.

## Notes

- The booking flow is a front-end simulation (no backend); wire `components/sections/Booking.tsx` to your scheduler of choice.
- Structured data (`BarberShop` JSON-LD), Open Graph and Twitter cards are configured in `app/layout.tsx` / `app/page.tsx`.
