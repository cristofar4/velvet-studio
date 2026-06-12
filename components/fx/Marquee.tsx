import { marqueeItems } from "@/lib/data";

/** Editorial gold ticker separating the hero from the story. */
export default function Marquee() {
  const row = (
    <div
      aria-hidden
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
    >
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-10 md:gap-16">
          <span className="font-display text-2xl italic text-cream/80 md:text-3xl">
            {item}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="size-3 text-gold"
            fill="currentColor"
          >
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Velvet Fade Studio highlights"
      className="relative overflow-hidden border-y border-line bg-coal py-6"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent" />
      <div className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </section>
  );
}
