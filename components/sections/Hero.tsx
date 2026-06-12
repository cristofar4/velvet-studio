"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntro } from "@/components/providers/Intro";
import { useLenis } from "@/components/providers/SmoothScroll";
import { SplitWords } from "@/components/fx/Reveal";
import CountUp from "@/components/fx/CountUp";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import Magnetic from "@/components/fx/Magnetic";
import { heroVideo, site, stats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  /* cinematic parallax: footage sinks & swells, copy drifts up */
  useEffect(() => {
    if (calm) return;
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 16,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "85% top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [calm]);

  const goToBook = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo("#book", { offset: -72, duration: 1.6 });
    else document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  };
  const goToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo("#services", { offset: -72, duration: 1.4 });
    else document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
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
          aria-label="Barber sculpting a fade inside Velvet Fade Studio"
        >
          {heroVideo.sources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      </div>

      {/* light & atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/40 to-night" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/30 to-transparent" />
      <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_10%,transparent_40%,rgba(10,10,12,0.85)_100%)]" />
      {/* drifting gold haze */}
      <div
        aria-hidden
        className="absolute -left-32 top-1/4 size-[480px] animate-float rounded-full bg-gold/[0.07] blur-3xl"
      />

      {/* vertical side label */}
      <motion.span
        variants={fadeUp}
        initial="hidden"
        animate={done ? "visible" : "hidden"}
        custom={1.5}
        className="eyebrow absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap text-mist! xl:block"
      >
        Est. MMXII — SoHo, New York
      </motion.span>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-40 pt-36 sm:pb-44 lg:px-10"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={done ? "visible" : "hidden"}
          custom={0.1}
          className="eyebrow mb-7 flex items-center gap-4"
        >
          <span className="hairline-gold w-12" />
          Luxury Grooming Atelier
        </motion.p>

        <h1 className="max-w-5xl font-display text-[13vw] leading-[1.02] text-cream sm:text-7xl lg:text-8xl">
          <SplitWords text="Precision Cuts." start={done} delay={0.25} stagger={0.09} />
          <br />
          <SplitWords
            text="Timeless Style."
            start={done}
            delay={0.55}
            stagger={0.09}
            wordClassName={() => "italic text-gold-gradient pr-2"}
          />
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={done ? "visible" : "hidden"}
          custom={0.95}
          className="mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
        >
          Experience luxury grooming at {site.name} — master barbers, hot-towel
          rituals, and a chair you will not want to leave.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={done ? "visible" : "hidden"}
          custom={1.15}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <ButtonLink href="#book" onClick={goToBook}>
            Book Your Appointment
            <ArrowIcon />
          </ButtonLink>
          <ButtonLink href="#services" onClick={goToServices} variant="ghost">
            Explore Services
          </ButtonLink>
        </motion.div>
      </div>

      {/* animated statistics shelf */}
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
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center md:items-start md:text-left"
              >
                <span className="font-display text-3xl text-champagne sm:text-4xl">
                  <CountUp value={stat.value} decimals={stat.decimals ?? 0} />
                  <span className="text-gold">{stat.suffix}</span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-mist">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-36 left-1/2 z-10 hidden -translate-x-1/2 md:bottom-40 lg:flex"
      >
        <Magnetic strength={0.3}>
          <div className="flex flex-col items-center gap-3 text-mist">
            <span className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/25 p-1.5">
              <motion.span
                animate={calm ? {} : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="size-1.5 rounded-full bg-champagne"
              />
            </span>
          </div>
        </Magnetic>
      </motion.div>
    </section>
  );
}
