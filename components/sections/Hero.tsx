"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntro } from "@/components/providers/Intro";
import { useLenis } from "@/components/providers/SmoothScroll";
import { SplitWords } from "@/components/fx/Reveal";
import CountUp from "@/components/fx/CountUp";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { heroVideo, site, stats } from "@/lib/data";

const BladeScene = dynamic(() => import("@/components/three/BladeScene"), {
  ssr: false,
  loading: () => null,
});

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const { done } = useIntro();
  const lenis = useLenis();
  const calm = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calm) return;
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 18,
        scale: 1.14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(contentRef.current, {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "90% top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [calm]);

  const go = (href: string, duration = 1.5) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(href, { offset: -72, duration });
    else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* film backdrop */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <video
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroVideo.poster}
          aria-label="A barber at work inside the Crown & Blade atelier"
        >
          {heroVideo.sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      </div>

      {/* grading */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/85 via-obsidian/45 to-obsidian" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/30 to-transparent" />
      <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_8%,transparent_38%,rgba(8,8,10,0.9)_100%)]" />

      {/* the signature 3D object */}
      <div className="pointer-events-none absolute inset-y-0 right-[-8%] z-[5] w-[60%] opacity-90 md:right-0 md:w-[55%]">
        {done && <BladeScene />}
      </div>

      {/* vertical spec label */}
      <motion.span
        variants={fadeUp}
        initial="hidden"
        animate={done ? "visible" : "hidden"}
        custom={1.5}
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.34em] text-smoke xl:block"
      >
        Est. MMXIV · West Village
      </motion.span>

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-40 pt-36 sm:pb-44 lg:px-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={done ? "visible" : "hidden"}
          custom={0.1}
          className="mb-7 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.34em] text-ash"
        >
          <span className="h-px w-12 bg-crimson" />
          The Atelier of Grooming
        </motion.p>

        <h1 className="font-display text-[15vw] leading-[0.92] text-bone sm:text-8xl lg:text-[8.5rem]">
          <span className="block overflow-hidden">
            <SplitWords text="Crown" start={done} delay={0.25} stagger={0.08} />
          </span>
          <span className="block overflow-hidden">
            <SplitWords
              text="& Blade"
              start={done}
              delay={0.45}
              stagger={0.08}
              wordClassName={(w) => (w === "&" ? "italic text-crimson-gradient pr-3" : "italic pr-3")}
            />
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={done ? "visible" : "hidden"}
          custom={0.95}
          className="mt-8 max-w-md text-base leading-relaxed text-ash sm:text-lg"
        >
          An atelier of precision grooming in {site.city}. Master barbers, rare
          instruments, and the quiet theatre of transformation.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={done ? "visible" : "hidden"}
          custom={1.15}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <ButtonLink href="#booking" onClick={go("#booking", 1.6)} variant="crimson">
            Reserve a Chair
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="#about" onClick={go("#about")} variant="ghost">
            Enter the Atelier
          </ButtonLink>
        </motion.div>
      </div>

      {/* stats shelf */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={done ? "visible" : "hidden"}
        custom={1.35}
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="glass grid grid-cols-2 gap-y-6 rounded-t-3xl px-8 py-7 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                <span className="font-display text-3xl text-bone sm:text-4xl">
                  <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
                  <span className="text-crimson">{stat.suffix}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-smoke">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
