"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useReducedMotion } from "framer-motion";
import { gallery } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function Lightbox({ index, onClose, onNavigate }: { index: number; onClose: () => void; onNavigate: (n: number) => void }) {
  const item = gallery[index];
  const prev = useCallback(() => onNavigate((index - 1 + gallery.length) % gallery.length), [index, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % gallery.length), [index, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="glass-deep fixed inset-0 z-[170] flex items-center justify-center p-4 sm:p-10"
      onClick={onClose} role="dialog" aria-modal="true" aria-label={`${item.title}, gallery viewer`}
    >
      <motion.figure
        key={item.full}
        initial={{ opacity: 0, scale: 0.94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[78vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}
      >
        <Image src={item.full} alt={item.alt} fill quality={95} sizes="92vw" className="rounded-2xl object-contain" priority />
        <figcaption className="absolute inset-x-0 -bottom-2 flex translate-y-full items-center justify-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-crimson">{item.category}</span>
          <span className="font-display text-lg italic text-bone">{item.title}</span>
        </figcaption>
      </motion.figure>

      {[["left", prev, "rotate-180"], ["right", next, ""]].map(([side, fn, rot]) => (
        <button
          key={side as string}
          onClick={(e) => { e.stopPropagation(); (fn as () => void)(); }}
          aria-label={side === "left" ? "Previous" : "Next"}
          className={`absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-obsidian/60 text-bone backdrop-blur transition-all hover:border-crimson/60 ${side === "left" ? "left-3 sm:left-8" : "right-3 sm:right-8"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`size-4 ${rot}`}>
            <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
      <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-line bg-obsidian/60 text-bone backdrop-blur transition-all hover:rotate-90 hover:border-crimson/60 sm:right-8 sm:top-8">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4"><path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" /></svg>
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const lenis = useLenis();
  const calm = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (calm) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current!;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => { tween.kill(); };
    });
    return () => mm.revert();
  }, [calm]);

  useEffect(() => {
    if (!lenis) return;
    if (open !== null) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <section id="gallery" className="relative bg-obsidian">
      <div ref={pinRef} className="relative flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* heading overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-24 lg:px-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="mb-3 flex items-center gap-4">
                <span className="font-mono text-xs text-crimson">03</span>
                <span className="h-px w-10 bg-line-strong" />
                <span className="eyebrow">The Campaign</span>
              </span>
              <h2 className="font-display text-4xl leading-none text-bone sm:text-6xl">
                Not a gallery. <span className="italic text-crimson-gradient">A campaign.</span>
              </h2>
            </div>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-smoke lg:block">
              Scroll to pan →
            </span>
          </div>
        </div>

        {/* horizontal track (pinned on desktop, native scroll on mobile) */}
        <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto px-6 lg:snap-none lg:overflow-visible lg:px-0">
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform lg:gap-7 lg:pl-10 lg:pr-24"
          >
            {gallery.map((item, i) => (
              <figure
                key={item.src}
                onClick={() => setOpen(i)}
                data-cursor="View"
                className="group relative h-[58vh] w-[78vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-3xl border border-line sm:w-[60vw] lg:h-[64vh] lg:w-[34vw]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={90}
                  sizes="(min-width:1024px) 34vw, (min-width:640px) 60vw, 78vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-obsidian/10" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-crimson">{item.category}</span>
                    <p className="mt-1 font-display text-2xl italic text-bone">{item.title}</p>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-full border border-bone/40 text-bone opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4"><path d="M7 17 17 7M17 7H9M17 7v8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </figcaption>
                <span className="absolute left-5 top-5 font-mono text-xs text-bone/70">{String(i + 1).padStart(2, "0")}</span>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
