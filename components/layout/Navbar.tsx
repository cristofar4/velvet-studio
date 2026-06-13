"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { useIntro } from "@/components/providers/Intro";
import Magnetic from "@/components/fx/Magnetic";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { label: "Atelier", href: "#about" },
  { label: "Rituals", href: "#services" },
  { label: "Campaign", href: "#gallery" },
  { label: "Artists", href: "#team" },
  { label: "Acclaim", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
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
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(href, { offset: -72, duration: 1.4 });
        else document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          scrolled && !open ? "glass-deep" : "bg-transparent"
        )}
      >
        <motion.span
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-px origin-left bg-crimson"
        />
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => goTo("#home")}
            className="group flex items-baseline gap-2"
            aria-label="Crown & Blade, back to top"
          >
            <span className="font-display text-xl tracking-wide text-bone sm:text-2xl">
              Crown <span className="text-crimson">&amp;</span> Blade
            </span>
          </button>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => goTo(link.href)}
                  className="group relative py-2 font-mono text-[12px] uppercase tracking-[0.18em] text-ash transition-colors duration-300 hover:text-bone"
                >
                  {link.label}
                  <span className="absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 bg-crimson transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:inline-block">
              <button
                onClick={() => goTo("#booking")}
                className="rounded-full bg-bone px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-obsidian transition-all duration-300 hover:bg-crimson hover:text-bone"
              >
                Reserve
              </button>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[151] flex size-11 flex-col items-center justify-center gap-[7px] rounded-full border border-line lg:hidden"
            >
              <span className={cn("h-px w-5 bg-bone transition-all duration-300", open && "translate-y-1 rotate-45 bg-crimson")} />
              <span className={cn("h-px w-5 bg-bone transition-all duration-300", open && "-translate-y-1 -rotate-45 bg-crimson")} />
            </button>
          </div>
        </nav>
      </motion.header>

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
              {[{ label: "Home", href: "#home" }, ...links, { label: "Reserve", href: "#booking" }].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button onClick={() => goTo(link.href)} className="group flex items-baseline gap-4 py-2">
                    <span className="font-mono text-xs text-crimson">0{i + 1}</span>
                    <span className="font-display text-4xl text-bone transition-colors group-hover:text-crimson">
                      {link.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <a href={site.phoneHref} className="text-sm text-ash hover:text-bone">{site.phone}</a>
              <div className="flex gap-5">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="font-mono text-[11px] uppercase tracking-wider text-ash transition-colors hover:text-bone">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
