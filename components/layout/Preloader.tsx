"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { useIntro } from "@/components/providers/Intro";
import { useLenis } from "@/components/providers/SmoothScroll";

const BRAND = "CROWN & BLADE";

/* Cinematic curtain: the wordmark assembles, a crimson edge sweeps, a
   counter runs to 100, then two panels part to reveal the hero. */
export default function Preloader() {
  const { finish } = useIntro();
  const lenis = useLenis();
  const calm = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => Math.round(v));

  useEffect(() => {
    if (calm) {
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
    const controls = animate(progress, 100, {
      duration: 2,
      ease: [0.32, 0.94, 0.6, 1],
      onComplete: () => setTimeout(() => setVisible(false), 280),
    });
    return () => controls.stop();
  }, [progress, calm]);

  useEffect(() => {
    if (!lenis) return;
    if (visible) lenis.stop();
    else lenis.start();
  }, [lenis, visible]);

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-obsidian"
          aria-hidden
        >
          {/* two parting panels */}
          <motion.div
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 origin-left bg-ink"
          />
          <motion.div
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 origin-right bg-ink"
          />

          <motion.div
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="flex overflow-hidden">
              {BRAND.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-display text-3xl tracking-[0.22em] sm:text-5xl ${
                    ch === " " ? "w-3 sm:w-5" : ch === "&" ? "text-crimson" : "text-bone"
                  }`}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="edge mt-6 w-64 origin-left sm:w-96"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6 flex items-baseline gap-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-smoke">
                Honing the steel
              </span>
              <motion.span className="font-display text-xl text-bone tabular-nums">
                {rounded}
              </motion.span>
              <span className="font-display text-sm text-crimson">%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
