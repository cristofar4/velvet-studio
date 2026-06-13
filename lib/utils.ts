import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn-style class combiner: clsx semantics + Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Pexels photo CDN URL in the canonical, hotlink friendly format.
 * A high DPR plus tuned width keeps the imagery razor sharp on
 * retina panels while staying lean for everyone else.
 */
export function pexels(id: number, width = 1600, extra = "") {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${width}${extra}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
