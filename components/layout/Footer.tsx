"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";
import { site } from "@/lib/data";

function SocialGlyph({ label }: { label: string }) {
  switch (label) {
    case "Instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "TikTok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6c0 3.4-2.6 5.8-5.9 5.8A5.8 5.8 0 0 1 4.8 15c0-3.3 2.7-5.9 6.2-5.7v3.1c-1.7-.3-3.1.8-3.1 2.5 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.8-1.2 2.8-3V3h3.1z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.2A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M18.9 2H22l-7 8 8.3 12h-6.6l-5.1-7.1L5.6 22H2.4l7.5-8.6L2 2h6.7l4.6 6.4L18.9 2zm-1.2 18h1.8L7.1 3.9H5.2L17.7 20z" />
        </svg>
      );
  }
}

export default function Footer() {
  const lenis = useLenis();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [newsletterError, setNewsletterError] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterError(true);
      return;
    }
    setNewsletterError(false);
    setJoined(true);
  };

  return (
    <footer className="relative overflow-hidden border-t border-line bg-coal">
      {/* glow backdrop */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-gold/[0.05] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-10">
        <Reveal>
          <p
            aria-hidden
            className="text-outline select-none whitespace-nowrap font-display text-[14vw] leading-none tracking-tight lg:text-[10rem]"
          >
            VELVET FADE
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="flex flex-col gap-4">
              <h3 className="eyebrow">Visit</h3>
              {site.address.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-fog">
                  {line}
                </p>
              ))}
              <a
                href={site.phoneHref}
                className="text-sm text-cream transition-colors hover:text-champagne"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-cream transition-colors hover:text-champagne"
              >
                {site.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-col gap-4">
              <h3 className="eyebrow">Hours</h3>
              {site.hours.map((h) => (
                <div key={h.days} className="flex flex-col gap-0.5">
                  <span className="text-sm text-cream">{h.days}</span>
                  <span className="text-sm tabular-nums text-fog">{h.time}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex flex-col gap-4">
              <h3 className="eyebrow">Follow</h3>
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm text-fog transition-colors hover:text-champagne"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border border-line text-cream transition-all duration-400 group-hover:border-gold/60 group-hover:text-champagne group-hover:shadow-glow-gold">
                    <SocialGlyph label={s.label} />
                  </span>
                  <span>
                    {s.label}
                    <span className="block text-xs text-mist">{s.handle}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="flex flex-col gap-4">
              <h3 className="eyebrow">The Sharp List</h3>
              <p className="text-sm leading-relaxed text-fog">
                One email a month, open chairs, style notes, and first call on
                limited VIP slots.
              </p>
              {joined ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-champagne"
                >
                  Welcome to the list. Stay sharp.
                </motion.p>
              ) : (
                <form onSubmit={subscribe} className="flex flex-col gap-2" noValidate>
                  <div
                    className={`flex items-center overflow-hidden rounded-full border bg-night/60 transition-colors ${
                      newsletterError ? "border-red-400/60" : "border-line focus-within:border-gold/60"
                    }`}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      aria-label="Email address"
                      className="w-full bg-transparent px-5 py-3 text-sm text-cream placeholder:text-mist focus:outline-none"
                    />
                    <Magnetic strength={0.25} className="shrink-0 pr-1.5">
                      <button
                        type="submit"
                        aria-label="Subscribe"
                        className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-champagne via-gold to-bronze text-night transition-all hover:shadow-glow-gold"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                          <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </Magnetic>
                  </div>
                  {newsletterError && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pl-4 text-xs text-red-300"
                    >
                      Please enter a valid email.
                    </motion.span>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs tracking-wide text-mist">
            © {new Date().getFullYear()} Velvet Fade Studio · Crafted in SoHo
          </p>
          <p className="text-xs tracking-wide text-mist">
            Photography and film via Pexels artists, with thanks.
          </p>
          <Magnetic>
            <button
              onClick={() =>
                lenis
                  ? lenis.scrollTo(0, { duration: 1.6 })
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Back to top"
              className="group flex size-12 items-center justify-center rounded-full border border-line text-fog transition-all duration-400 hover:border-gold/60 hover:text-champagne hover:shadow-glow-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="size-4 transition-transform duration-400 group-hover:-translate-y-0.5"
              >
                <path d="M12 20V5m0 0-6 6m6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
