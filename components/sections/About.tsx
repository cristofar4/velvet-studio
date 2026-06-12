"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, SplitWords } from "@/components/fx/Reveal";
import { about } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Rotating circular badge anchored to the imagery. */
function SinceBadge() {
  const text = "VELVET FADE STUDIO · EST. 2012 · ";
  return (
    <div className="absolute -right-7 -top-7 z-20 hidden size-36 items-center justify-center md:flex">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-gold text-[8.2px] uppercase tracking-[2.6px]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-night/80 backdrop-blur">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-6 text-champagne">
          <circle cx="6" cy="7" r="2.6" />
          <circle cx="6" cy="17" r="2.6" />
          <path d="M8.4 8.6 20 20M8.4 15.4 20 4" strokeLinecap="round" />
        </svg>
      </span>
    </div>
  );
}

export default function About() {
  const calm = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calm) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        primaryRef.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        secondaryRef.current,
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [calm]);

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-28 lg:py-40">
      {/* ambient glow */}
      <div className="pointer-events-none absolute right-0 top-24 size-[420px] rounded-full bg-gold/[0.05] blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* imagery */}
        <div className="relative lg:col-span-6">
          <SinceBadge />
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-card">
              <div ref={primaryRef} className="relative aspect-[4/5] scale-[1.16] will-change-transform">
                <Image
                  src={about.imagePrimary.src}
                  alt={about.imagePrimary.alt}
                  fill
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-night/15" />
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            className="absolute -bottom-12 -right-3 w-[46%] sm:right-6 lg:-right-8"
          >
            <div className="overflow-hidden rounded-2xl border border-gold/30 shadow-glow-gold">
              <div ref={secondaryRef} className="relative aspect-[3/4] scale-[1.18] will-change-transform">
                <Image
                  src={about.imageSecondary.src}
                  alt={about.imageSecondary.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* story */}
        <div className="mt-10 lg:col-span-6 lg:mt-0 lg:pl-8">
          <Reveal>
            <span className="flex items-center gap-4">
              <span className="hairline-gold w-10" />
              <span className="eyebrow">{about.eyebrow}</span>
            </span>
          </Reveal>

          <h2 className="mt-5 font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
            <SplitWords
              text={about.title}
              wordClassName={(_, i) => (i === 2 ? "italic text-gold-gradient pr-1" : undefined)}
            />
          </h2>

          <div className="mt-8 flex flex-col gap-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12}>
                <p className="leading-relaxed text-fog">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
            {about.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.1 + i * 0.1}>
                <div className="group flex items-baseline gap-6 py-5 transition-colors duration-500 hover:bg-cream/[0.02]">
                  <span className="font-display text-sm italic text-gold">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-cream transition-colors duration-300 group-hover:text-champagne">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-mist">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <blockquote className="mt-10 border-l-2 border-gold/60 pl-6">
              <p className="font-display text-xl italic leading-snug text-silver">
                “{about.quote}”
              </p>
              <cite className="eyebrow mt-3 block text-mist! not-italic">
                — {about.quoteBy}
              </cite>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
