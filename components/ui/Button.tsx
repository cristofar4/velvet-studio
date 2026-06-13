"use client";

import {
  useCallback,
  type ComponentPropsWithoutRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import Magnetic from "@/components/fx/Magnetic";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.22em] transition-all duration-500 will-change-transform";

const variants: Record<Variant, string> = {
  gold: "bg-gradient-to-br from-champagne via-gold to-bronze text-night animate-pulse-glow hover:shadow-glow-gold hover:brightness-110",
  ghost:
    "border border-cream/25 text-cream backdrop-blur-sm hover:border-gold/70 hover:text-champagne hover:shadow-glow-gold",
};

function spawnRipple(e: PointerEvent<HTMLElement>) {
  const host = e.currentTarget;
  const rect = host.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const ink = document.createElement("span");
  ink.className = "ripple-ink";
  ink.style.width = ink.style.height = `${size}px`;
  ink.style.left = `${e.clientX - rect.left - size / 2}px`;
  ink.style.top = `${e.clientY - rect.top - size / 2}px`;
  host.appendChild(ink);
  ink.addEventListener("animationend", () => ink.remove(), { once: true });
}

type CommonProps = {
  variant?: Variant;
  magnetic?: boolean;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "gold",
  magnetic = true,
  children,
  className,
  onPointerDown,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"a">) {
  const handleDown = useCallback(
    (e: PointerEvent<HTMLAnchorElement>) => {
      spawnRipple(e);
      onPointerDown?.(e);
    },
    [onPointerDown]
  );

  const anchor = (
    <a
      {...rest}
      onPointerDown={handleDown}
      className={cn(base, variants[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </a>
  );

  return magnetic ? <Magnetic>{anchor}</Magnetic> : anchor;
}

export function Button({
  variant = "gold",
  magnetic = true,
  children,
  className,
  onPointerDown,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  const handleDown = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      spawnRipple(e);
      onPointerDown?.(e);
    },
    [onPointerDown]
  );

  const button = (
    <button
      {...rest}
      onPointerDown={handleDown}
      className={cn(base, variants[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

/** Slim arrow used inside CTAs, slides on hover. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={cn(
        "size-4 transition-transform duration-500 group-hover:translate-x-1.5",
        className
      )}
    >
      <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
