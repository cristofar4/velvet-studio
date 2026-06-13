"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/fx/TiltCard";
import { artists, type Artist } from "@/lib/data";
import { cn } from "@/lib/utils";

function SocialMini({ label }: { label: Artist["socials"][number]["label"] }) {
  if (label === "Instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-3.5">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (label === "TikTok")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6c0 3.4-2.6 5.8-5.9 5.8A5.8 5.8 0 0 1 4.8 15c0-3.3 2.7-5.9 6.2-5.7v3.1c-1.7-.3-3.1.8-3.1 2.5 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.8-1.2 2.8-3V3h3.1z" /></svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M18.9 2H22l-7 8 8.3 12h-6.6l-5.1-7.1L5.6 22H2.4l7.5-8.6L2 2h6.7l4.6 6.4L18.9 2z" /></svg>
  );
}

export default function Team() {
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 140, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="team" className="relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute right-10 top-20 size-[360px] rounded-full bg-crimson/[0.05] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="The Artists"
          title="Four names the city books out"
          crimsonWord={2}
          copy="Each artist trained for years before earning a chair and a mirror. Hover a name to meet them."
        />

        {/* desktop cast list with cursor-following portrait */}
        <div
          ref={listRef}
          onPointerMove={onMove}
          onPointerLeave={() => setHovered(null)}
          className="relative hidden lg:block"
        >
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key={artists[hovered].id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ x: sx, y: sy, pointerEvents: "none" }}
                className="absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative h-80 w-64 overflow-hidden rounded-2xl border border-crimson/30 shadow-glow-crimson">
                  <Image src={artists[hovered].image} alt={artists[hovered].name} fill quality={90} sizes="256px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {artists.map((artist, i) => (
            <div
              key={artist.id}
              onPointerEnter={() => setHovered(i)}
              data-cursor="Meet"
              className="group relative grid grid-cols-12 items-center gap-6 border-b border-line py-9 first:border-t"
            >
              <span className={cn("col-span-1 font-mono text-sm transition-colors duration-300", hovered === i ? "text-crimson" : "text-smoke")}>
                {artist.alias.replace("The ", "")}
              </span>
              <h3 className={cn("col-span-6 font-display text-5xl italic transition-all duration-500 xl:text-6xl", hovered === i ? "translate-x-4 text-bone" : "text-bone/40")}>
                {artist.name}
              </h3>
              <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">{artist.role}</span>
              <div className="col-span-2 flex justify-end gap-2.5">
                {artist.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`${artist.name} on ${s.label}`}
                    className="flex size-9 items-center justify-center rounded-full border border-line text-ash transition-all duration-300 hover:border-crimson/70 hover:text-bone">
                    <SocialMini label={s.label} />
                  </a>
                ))}
              </div>
              <p className="col-span-9 col-start-2 -mt-4 max-w-xl text-sm leading-relaxed text-smoke opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {artist.bio}
              </p>
            </div>
          ))}
        </div>

        {/* mobile portrait cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {artists.map((artist) => (
            <TiltCard key={artist.id} maxTilt={8} className="group" data-cursor="Meet">
              <article className="relative overflow-hidden rounded-3xl border border-line bg-graphite">
                <div className="relative aspect-[3/4]">
                  <Image src={artist.image} alt={artist.name} fill quality={88} sizes="(min-width:640px) 46vw, 92vw" className="object-cover grayscale-[0.4] transition-all duration-700 group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full border border-line bg-obsidian/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-steel backdrop-blur">
                    {artist.alias}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-display text-2xl text-bone">{artist.name}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash">{artist.role}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {artist.specialties.map((s) => (
                        <span key={s} className="rounded-full border border-crimson/30 bg-crimson/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
