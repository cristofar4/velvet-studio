"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Scroll-triggered fade-up with a soft blur settle. */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const calm = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={calm ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial word-by-word reveal: each word rises out of an
 * overflow mask. Drives from `start` (mount) or viewport entry.
 */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.07,
  start,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, index: number) => string | undefined;
  delay?: number;
  stagger?: number;
  /** When provided, animation is gated on this flag instead of viewport. */
  start?: boolean;
}) {
  const calm = useReducedMotion();
  const words = text.split(" ");
  const gated = typeof start === "boolean";

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: calm ? { opacity: 0 } : { y: "118%", rotate: 4, opacity: 0 },
    visible: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(gated
        ? { animate: start ? "visible" : "hidden" }
        : { whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } })}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={`inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom ${
            i < words.length - 1 ? "mr-[0.26em]" : ""
          }`}
          aria-hidden
        >
          <motion.span
            variants={word}
            className={`inline-block will-change-transform ${wordClassName?.(w, i) ?? ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
