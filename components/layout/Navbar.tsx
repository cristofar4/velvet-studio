"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useIntro } from "@/components/providers/Intro";
import Magnetic from "@/components/fx/Magnetic";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { label: "The House", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Masters", href: "#barbers" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const lenis = useLenis();
  const { done } = useIntro();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  const goTo = useCallback(
    (href: string) => {
      setOpen(false);
      // let the overlay begin closing before the glide starts
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(href, { offset: -72, duration: 1.4 });
        else
          document
            .querySelector(href)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [lenis]
  );

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={done ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[140] transition-all duration-500",
          scrolled && !open ? "glass-deep shadow-card" : "bg-transparent"
        )}
      >
        <motion.span
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-bronze via-gold to-champagne"
        />
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => goTo("#home")}
            className="group flex items-baseline gap-2"
            aria-label="Velvet Fade Studio — back to top"
          >
            <span className="font-display text-xl italic text-cream transition-colors duration-300 group-hover:text-champagne sm:text-2xl">
              Velvet&nbsp;Fade
            </span>
            <span className="eyebrow hidden tracking-[0.5em]! sm:inline">
              Studio
            </span>
          </button>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => goTo(link.href)}
                  className="group relative py-2 text-[13px] font-medium uppercase tracking-[0.18em] text-fog transition-colors duration-300 hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <button
                onClick={() => goTo("#book")}
                className="rounded-full bg-gradient-to-br from-champagne via-gold to-bronze px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.2em] text-night transition-all duration-400 hover:shadow-glow-gold hover:brightness-110"
              >
                Book Now
              </button>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[151] flex size-11 flex-col items-center justify-center gap-[7px] rounded-full border border-line lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-5 bg-cream transition-all duration-400",
                  open && "translate-y-1 rotate-45 bg-champagne"
                )}
              />
              <span
                className={cn(
                  "h-px w-5 bg-cream transition-all duration-400",
                  open && "-translate-y-1 -rotate-45 bg-champagne"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 92% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 92% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="glass-deep fixed inset-0 z-[150] flex flex-col justify-between px-8 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[{ label: "Home", href: "#home" }, ...links, { label: "Book", href: "#book" }].map(
                (link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => goTo(link.href)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="eyebrow text-mist!">0{i + 1}</span>
                      <span className="font-display text-4xl text-cream transition-colors group-hover:text-champagne">
                        {link.label}
                      </span>
                    </button>
                  </motion.li>
                )
              )}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
            >
              <a href={site.phoneHref} className="text-sm text-fog hover:text-champagne">
                {site.phone}
              </a>
              <div className="flex gap-5">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow text-fog! transition-colors hover:text-champagne!"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
