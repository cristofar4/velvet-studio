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

const BRAND = "VELVET FADE";

/** Cinematic curtain: brand letters, gold sweep, 0→100 counter, exit. */
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
      duration: 1.9,
      ease: [0.32, 0.94, 0.6, 1],
      onComplete: () => setTimeout(() => setVisible(false), 250),
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
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex overflow-hidden">
            {BRAND.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.12 + i * 0.045,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`font-display text-3xl tracking-[0.3em] sm:text-5xl ${
                  ch === " " ? "w-5 sm:w-8" : "text-cream"
                }`}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="hairline-gold mt-6 w-56 origin-left sm:w-80"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 flex items-baseline gap-2"
          >
            <span className="eyebrow text-mist!">Sharpening the blades</span>
            <motion.span className="font-display text-xl text-gold tabular-nums">
              {rounded}
            </motion.span>
            <span className="font-display text-sm text-gold/70">%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
