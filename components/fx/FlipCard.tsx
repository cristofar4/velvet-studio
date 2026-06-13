"use client";

import { useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** True only on devices that can truly hover (desktops, not touch). */
const hoverCapable = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

/**
 * A genuine 3D flip card. The two faces sit on opposite sides of a
 * preserved-3d plane that rotates a full 180deg in Y. Hover drives the
 * flip on pointer devices; tap toggles it on touch. Reduced motion
 * keeps the plane flat and never rotates.
 */
export default function FlipCard({
  front,
  back,
  className,
  height = "h-[460px]",
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  height?: string;
}) {
  const calm = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const active = flipped && !calm;

  return (
    <div
      className={cn("perspective-deep group/flip h-full w-full", height, className)}
      onMouseEnter={() => hoverCapable() && setFlipped(true)}
      onMouseLeave={() => hoverCapable() && setFlipped(false)}
      onClick={() => !hoverCapable() && setFlipped((v) => !v)}
      role="group"
    >
      <div
        className="preserve-3d relative h-full w-full transition-transform duration-[850ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{ transform: active ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="backface-hide absolute inset-0">{front}</div>
        <div
          className="backface-hide absolute inset-0"
          style={{ transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
