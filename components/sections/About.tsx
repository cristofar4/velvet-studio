"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SplitWords } from "@/components/fx/Reveal";
import CountUp from "@/components/fx/CountUp";
import { about, site } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const calm = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calm) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power3.out", scrollTrigger: { trigger: revealRef.current, start: "top 82%" } }
      );
      gsap.fromTo(
        imgRef.current,
        { yPercent: -8, scale: 1.2 },
        { yPercent: 8, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.fromTo(
        sigRef.current,
        { yPercent: 14 },
        { yPercent: -14, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [calm]);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-28 lg:py-40">
      <div className="pointer-events-none absolute right-0 top-24 size-[420px] rounded-full bg-crimson/[0.06] blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* lead line, oversized */}
        <div className="mb-16 max-w-4xl lg:mb-24">
          <Reveal>
            <span className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs text-crimson">00</span>
              <span className="h-px w-10 bg-line-strong" />
              <span className="eyebrow">{about.eyebrow}</span>
            </span>
          </Reveal>
          <p className="font-display text-3xl leading-[1.18] text-bone sm:text-4xl lg:text-[2.9rem]">
            <SplitWords text={about.lead} stagger={0.018} />
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* imagery */}
          <div className="relative lg:col-span-6">
            <div ref={revealRef} className="relative overflow-hidden rounded-3xl border border-line shadow-edge">
              <div ref={imgRef} className="relative aspect-[4/5] will-change-transform">
                <Image src={about.image.src} alt={about.image.alt} fill quality={92} sizes="(min-width:1024px) 46vw, 92vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            </div>

            <Reveal delay={0.2} className="absolute -bottom-12 -right-3 w-[44%] sm:right-6 lg:-right-10">
              <div className="overflow-hidden rounded-2xl border border-crimson/25 shadow-glow-crimson">
                <div ref={sigRef} className="relative aspect-[3/4] scale-[1.18] will-change-transform">
                  <Image src={about.signature.src} alt={about.signature.alt} fill quality={92} sizes="(min-width:1024px) 20vw, 42vw" className="object-cover" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* story */}
          <div className="lg:col-span-6 lg:pl-8">
            <h2 className="font-display text-4xl leading-[1.06] text-bone sm:text-5xl">
              <SplitWords text={about.title} wordClassName={(_, i) => (i === 3 ? "italic text-crimson-gradient pr-1" : undefined)} />
            </h2>

            <div className="mt-8 flex flex-col gap-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.1}>
                  <p className="leading-relaxed text-ash">{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
              {about.pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={0.08 + i * 0.08}>
                  <div className="group flex items-baseline gap-6 py-5 transition-colors duration-500 hover:bg-bone/[0.02]">
                    <span className="font-mono text-sm text-crimson">{pillar.no}</span>
                    <div>
                      <h3 className="font-display text-xl text-bone transition-colors duration-300 group-hover:text-crimson">{pillar.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-smoke">{pillar.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-10 flex items-end gap-8">
                <div>
                  <span className="font-display text-5xl text-bone">
                    <CountUp value={site.established} />
                  </span>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">Established</p>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-ash">
                  One chair on Greenwich Avenue, then a name the city learned to trust.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
