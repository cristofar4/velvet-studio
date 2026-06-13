"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Bespoke two-part cursor: an instant crimson dot and a lazy bone ring
 * that swells over interactive targets. Elements may opt into a contextual
 * label via data-cursor="View". Fine pointers only.
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!fine || calm || !root) return;

    root.style.display = "contents";
    document.documentElement.classList.add("cursor-none-everywhere");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest(
        "a, button, [role='button'], input, select, textarea, label, [data-cursor]"
      );
      if (!target) {
        setActive(false);
        setLabel(null);
        return;
      }
      setActive(true);
      setLabel(target.getAttribute("data-cursor"));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("cursor-none-everywhere");
    };
  }, []);

  return (
    <div ref={rootRef} style={{ display: "none" }} aria-hidden>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[160] size-1.5 rounded-full bg-crimson transition-opacity duration-300"
        style={{ opacity: active && label ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[159] flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ease-out ${
          label
            ? "size-20 border-bone/50 bg-obsidian/50 backdrop-blur-sm"
            : active
              ? "size-12 border-crimson/80"
              : "size-9 border-bone/35"
        }`}
      >
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.18em] text-bone transition-opacity duration-200 ${
            label ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
