"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/fx/Magnetic";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <motion.svg key={i} initial={{ opacity: 0, scale: 0.4, rotate: -30 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.25 + i * 0.08, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }} viewBox="0 0 24 24" className="size-4">
            <defs>
              <linearGradient id={`cb-star-${i}-${fill}`}>
                <stop offset={`${fill * 100}%`} stopColor="#c8102e" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(241,236,226,0.18)" />
              </linearGradient>
            </defs>
            <path fill={`url(#cb-star-${i}-${fill})`} d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
          </motion.svg>
        );
      })}
    </div>
  );
}

export default function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: number) => {
    setIndex(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(1), 6000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative overflow-hidden border-t border-line bg-ink py-28 lg:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 rounded-[100%] bg-crimson/[0.06] blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -top-10 left-4 select-none font-display text-[16rem] italic leading-none text-bone/[0.04] lg:left-20">“</span>

      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading index="06" eyebrow="Acclaim" title="The city keeps talking" crimsonWord={3} align="center" />

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="perspective-deep relative min-h-[400px] sm:min-h-[330px]">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 80, rotateY: direction * 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, rotateY: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: direction * -80, rotateY: direction * -26, filter: "blur(8px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
                onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
                className="glass absolute inset-0 flex cursor-grab flex-col justify-between rounded-3xl p-8 active:cursor-grabbing sm:p-12"
              >
                <div>
                  <Stars rating={t.rating} />
                  <p className="mt-6 font-display text-xl italic leading-relaxed text-bone sm:text-2xl">“{t.quote}”</p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <span className="relative size-14 overflow-hidden rounded-full border border-crimson/40">
                    <Image src={t.avatar} alt={t.name} fill sizes="56px" className="object-cover" draggable={false} />
                  </span>
                  <span>
                    <span className="block font-semibold text-bone">{t.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{t.title}</span>
                  </span>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setIndex([i, i > index ? 1 : -1])} aria-label={`Review ${i + 1}`}
                  className={cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-10 bg-crimson" : "w-4 bg-bone/15 hover:bg-bone/30")} />
              ))}
            </div>
            <div className="flex gap-3">
              {[["prev", -1, "rotate-180"], ["next", 1, ""]].map(([k, d, rot]) => (
                <Magnetic key={k as string} strength={0.3}>
                  <button onClick={() => go(d as number)} aria-label={k === "prev" ? "Previous" : "Next"}
                    className="flex size-12 items-center justify-center rounded-full border border-line text-ash transition-all hover:border-crimson/60 hover:text-bone">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`size-4 ${rot}`}><path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
