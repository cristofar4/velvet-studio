"use client";

import {
  useCallback,
  type ComponentPropsWithoutRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Magnetic from "@/components/fx/Magnetic";
import { cn } from "@/lib/utils";

/* Crown & Blade call to action: cva-driven (shadcn idiom), magnetic,
   with an ink ripple on press. The crimson edge is the house signature. */
const cta = cva(
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 will-change-transform",
  {
    variants: {
      variant: {
        bone: "bg-bone text-obsidian hover:shadow-edge hover:brightness-105",
        crimson:
          "bg-crimson text-bone animate-pulse-edge hover:shadow-glow-crimson hover:brightness-110",
        ghost:
          "border border-line-strong text-bone backdrop-blur-sm hover:border-crimson/70 hover:text-bone",
      },
      size: {
        lg: "px-8 py-4",
        md: "px-6 py-3",
      },
    },
    defaultVariants: { variant: "bone", size: "lg" },
  }
);

type Common = VariantProps<typeof cta> & {
  magnetic?: boolean;
  children: ReactNode;
  className?: string;
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

export function ButtonLink({
  variant,
  size,
  magnetic = true,
  children,
  className,
  onPointerDown,
  ...rest
}: Common & ComponentPropsWithoutRef<"a">) {
  const handleDown = useCallback(
    (e: PointerEvent<HTMLAnchorElement>) => {
      spawnRipple(e);
      onPointerDown?.(e);
    },
    [onPointerDown]
  );

  const anchor = (
    <a {...rest} onPointerDown={handleDown} className={cn(cta({ variant, size }), className)}>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </a>
  );
  return magnetic ? <Magnetic>{anchor}</Magnetic> : anchor;
}

export function Button({
  variant,
  size,
  magnetic = true,
  children,
  className,
  onPointerDown,
  ...rest
}: Common & ComponentPropsWithoutRef<"button">) {
  const handleDown = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      spawnRipple(e);
      onPointerDown?.(e);
    },
    [onPointerDown]
  );

  const button = (
    <button {...rest} onPointerDown={handleDown} className={cn(cta({ variant, size }), className)}>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </button>
  );
  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className={cn("size-4 transition-transform duration-500 group-hover:translate-x-1.5", className)}
    >
      <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
