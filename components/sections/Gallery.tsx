"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/fx/TiltCard";
import { Reveal } from "@/components/fx/Reveal";
import { gallery } from "@/lib/data";
import { cn } from "@/lib/utils";

function Lightbox({
  index,
  onClose,
  onNavigate,
}: {
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const item = gallery[index];

  const prev = useCallback(
    () => onNavigate((index - 1 + gallery.length) % gallery.length),
    [index, onNavigate]
  );
  const next = useCallback(
    () => onNavigate((index + 1) % gallery.length),
    [index, onNavigate]
  );

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-deep fixed inset-0 z-[170] flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.caption}, gallery viewer`}
    >
      {/* frame */}
      <motion.figure
        key={item.full}
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[78vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.full}
          alt={item.alt}
          fill
          sizes="92vw"
          className="rounded-2xl object-contain"
          priority
        />
        <figcaption className="absolute inset-x-0 -bottom-2 translate-y-full text-center">
          <span className="font-display text-lg italic text-champagne">
            {item.caption}
          </span>
          <span className="ml-3 text-xs tracking-[0.3em] text-mist tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </span>
        </figcaption>
      </motion.figure>

      {/* controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-night/60 text-cream backdrop-blur transition-all hover:border-gold/60 hover:text-champagne sm:left-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4 rotate-180">
          <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-night/60 text-cream backdrop-blur transition-all hover:border-gold/60 hover:text-champagne sm:right-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-line bg-night/60 text-cream backdrop-blur transition-all hover:rotate-90 hover:border-gold/60 hover:text-champagne sm:right-8 sm:top-8"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-4">
          <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const lenis = useLenis();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (!lenis) return;
    if (open !== null) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return (
    <section id="gallery" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Archive"
          title="Proof, framed in light"
          goldWord={1}
          copy="Shot on the studio floor between appointments, no retouching, just sharp lines and warm tungsten."
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {gallery.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
              <TiltCard
                maxTilt={6}
                role="button"
                aria-label={`Open ${item.caption} in viewer`}
                data-cursor="View"
                onClick={() => setOpen(i)}
                className={cn(
                  "group relative block cursor-pointer overflow-hidden rounded-2xl border border-line transition-colors duration-500 hover:border-gold/40",
                  item.ratio
                )}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={88}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-[1.3s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-display text-lg italic text-cream">
                    {item.caption}
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border border-gold/50 bg-night/50 text-champagne backdrop-blur">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-3.5">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </figcaption>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
        )}
      </AnimatePresence>
    </section>
  );
}
