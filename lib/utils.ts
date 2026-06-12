/** Minimal className combiner. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Pexels photo CDN URL (canonical format, hotlink-friendly).
 * Compression params keep payloads lean while staying cinematic.
 */
export function pexels(id: number, width = 1600, extra = "") {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}${extra}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
