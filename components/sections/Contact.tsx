"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal, SplitWords } from "@/components/fx/Reveal";
import { site } from "@/lib/data";

function Social({ label }: { label: string }) {
  const common = "size-4";
  if (label === "Instagram")
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>;
  if (label === "TikTok")
    return <svg viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6c0 3.4-2.6 5.8-5.9 5.8A5.8 5.8 0 0 1 4.8 15c0-3.3 2.7-5.9 6.2-5.7v3.1c-1.7-.3-3.1.8-3.1 2.5 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.8-1.2 2.8-3V3h3.1z" /></svg>;
  if (label === "YouTube")
    return <svg viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.2C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.2A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z" /></svg>;
  return <svg viewBox="0 0 24 24" fill="currentColor" className={common}><path d="M18.9 2H22l-7 8 8.3 12h-6.6l-5.1-7.1L5.6 22H2.4l7.5-8.6L2 2h6.7l4.6 6.4L18.9 2z" /></svg>;
}

export default function Contact() {
  const lenis = useLenis();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(true); return; }
    setError(false); setJoined(true);
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line bg-obsidian">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-crimson/[0.05] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="mb-6 flex items-center gap-4">
                <span className="font-mono text-xs text-crimson">07</span>
                <span className="h-px w-10 bg-line-strong" />
                <span className="eyebrow">Contact</span>
              </span>
            </Reveal>
            <h2 className="max-w-2xl font-display text-5xl leading-[1.02] text-bone sm:text-7xl">
              <SplitWords text="Come sit in the chair" wordClassName={(_, i) => (i === 4 ? "italic text-crimson-gradient" : undefined)} />
            </h2>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <Reveal>
                <h3 className="eyebrow mb-4">The Atelier</h3>
                {site.address.map((l) => <p key={l} className="leading-relaxed text-ash">{l}</p>)}
                <a href={site.phoneHref} className="mt-3 block text-bone transition-colors hover:text-crimson">{site.phone}</a>
                <a href={`mailto:${site.email}`} className="block text-bone transition-colors hover:text-crimson">{site.email}</a>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="eyebrow mb-4">Hours</h3>
                {site.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline justify-between gap-4 border-b border-line py-1.5">
                    <span className="text-sm text-bone">{h.days}</span>
                    <span className="font-mono text-xs tabular-nums text-ash">{h.time}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-line bg-graphite/40 p-8">
                <h3 className="font-display text-2xl text-bone">The List</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">One letter a month. Open chairs, new rituals, and first call on limited seats.</p>
                {joined ? (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-xl border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-bone">
                    You are on the list. Sharpen up.
                  </motion.p>
                ) : (
                  <form onSubmit={subscribe} className="mt-5 flex flex-col gap-2" noValidate>
                    <div className={`flex items-center overflow-hidden rounded-full border bg-obsidian/60 transition-colors ${error ? "border-ember/60" : "border-line focus-within:border-crimson/60"}`}>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" aria-label="Email" className="w-full bg-transparent px-5 py-3 text-sm text-bone placeholder:text-smoke focus:outline-none" />
                      <Magnetic strength={0.25} className="shrink-0 pr-1.5">
                        <button type="submit" aria-label="Subscribe" className="flex size-9 items-center justify-center rounded-full bg-crimson text-bone transition-all hover:shadow-glow-crimson">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                      </Magnetic>
                    </div>
                    {error && <span className="pl-4 text-xs text-ember">Please enter a valid email.</span>}
                  </form>
                )}

                <div className="mt-8 flex flex-col gap-3">
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-ash transition-colors hover:text-bone">
                      <span className="flex size-9 items-center justify-center rounded-full border border-line text-bone transition-all duration-300 group-hover:border-crimson/60 group-hover:text-crimson">
                        <Social label={s.label} />
                      </span>
                      <span>{s.label}<span className="block font-mono text-[10px] uppercase tracking-wider text-smoke">{s.handle}</span></span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* giant wordmark */}
        <Reveal>
          <p aria-hidden className="mt-16 select-none whitespace-nowrap text-center font-display text-[18vw] leading-none text-outline lg:text-[13rem]">
            CROWN &amp; BLADE
          </p>
        </Reveal>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-line py-8 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-wider text-smoke">© {new Date().getFullYear()} Crown &amp; Blade · {site.city}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-smoke">Imagery via Pexels artists, with thanks</p>
          <Magnetic>
            <button onClick={() => lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
              className="group flex size-12 items-center justify-center rounded-full border border-line text-ash transition-all duration-300 hover:border-crimson/60 hover:text-bone">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4 transition-transform group-hover:-translate-y-0.5"><path d="M12 20V5m0 0-6 6m6-6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
