import { marqueeItems } from "@/lib/data";
import { cn } from "@/lib/utils";

/* Editorial ticker. Reverse direction lets two stacked rows scissor past
   each other, a subtle nod to the blades. */
export default function Marquee({
  reverse = false,
  className,
}: {
  reverse?: boolean;
  className?: string;
}) {
  const row = (
    <div aria-hidden className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-10 md:gap-16">
          <span className="font-display text-2xl italic text-bone/85 md:text-3xl">{item}</span>
          <svg viewBox="0 0 24 24" className="size-2.5 text-crimson" fill="currentColor">
            <path d="M12 0l2 10 10 2-10 2-2 10-2-10-10-2 10-2z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Crown & Blade highlights"
      className={cn("relative overflow-hidden border-y border-line bg-ink py-6", className)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent" />
      <div
        className={cn(
          "flex w-max will-change-transform motion-reduce:animate-none",
          reverse ? "animate-marquee-rev" : "animate-marquee"
        )}
      >
        {row}
        {row}
      </div>
    </section>
  );
}
