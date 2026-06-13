"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Services() {
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const current = services[active];

  const book = () => {
    if (lenis) lenis.scrollTo("#booking", { offset: -72, duration: 1.5 });
    else document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative border-t border-line bg-ink py-28 lg:py-36">
      <div className="pointer-events-none absolute left-0 top-1/3 size-[440px] rounded-full bg-crimson/[0.05] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="The Rituals"
          title="Five disciplines of the chair"
          crimsonWord={2}
          copy="Hover a ritual to bring it into focus. Every service closes with a hot towel, a styling lesson, and a handshake."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* sticky cinematic preview, desktop */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line shadow-edge">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.08, clipPath: "inset(0 0 100% 0)" }}
                    animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image src={current.image} alt={current.name} fill quality={92} sizes="44vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-crimson">{current.tagline}</p>
                    <p className="mt-1 font-display text-2xl text-bone">{current.name}</p>
                  </div>
                  <p className="font-display text-3xl text-steel-gradient">${current.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* the index */}
          <ul className="lg:col-span-7">
            {services.map((service, i) => {
              const open = active === i;
              return (
                <li
                  key={service.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group cursor-pointer border-b border-line py-7 transition-colors duration-500",
                    i === 0 && "border-t"
                  )}
                  data-cursor="View"
                >
                  <div className="flex items-baseline gap-5">
                    <span className={cn("font-mono text-sm transition-colors duration-300", open ? "text-crimson" : "text-smoke")}>
                      {service.no}
                    </span>
                    <h3
                      className={cn(
                        "flex-1 font-display text-3xl transition-all duration-500 sm:text-4xl lg:text-5xl",
                        open ? "text-bone" : "text-bone/45 group-hover:text-bone/80"
                      )}
                    >
                      {service.name}
                    </h3>
                    <span className={cn("font-mono text-sm transition-colors duration-300", open ? "text-bone" : "text-smoke")}>
                      {service.duration}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pl-9 pt-6 sm:grid-cols-2">
                          {/* inline image for mobile */}
                          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line lg:hidden">
                            <Image src={service.image} alt={service.name} fill quality={88} sizes="92vw" className="object-cover" />
                          </div>
                          <div>
                            <p className="text-sm leading-relaxed text-ash">{service.description}</p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                              {service.features.map((f) => (
                                <li key={f} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-steel">
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-end justify-between sm:flex-col sm:items-end sm:justify-end sm:gap-4">
                            <p className="font-display text-4xl text-steel-gradient">${service.price}</p>
                            <button
                              onClick={(e) => { e.stopPropagation(); book(); }}
                              className="group/btn flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-obsidian transition-colors hover:bg-crimson hover:text-bone"
                            >
                              Reserve
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 transition-transform group-hover/btn:translate-x-0.5">
                                <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
