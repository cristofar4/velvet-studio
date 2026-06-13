"use client";

import Image from "next/image";
import { useLenis } from "@/components/providers/SmoothScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import FlipCard from "@/components/fx/FlipCard";
import { Reveal } from "@/components/fx/Reveal";
import { services, type Service } from "@/lib/data";
import { cn } from "@/lib/utils";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0 fill-gold", className)}>
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
    </svg>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const lenis = useLenis();
  const featured = service.featured;

  const book = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lenis) lenis.scrollTo("#book", { offset: -72, duration: 1.5 });
    else document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  };

  const front = (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-3xl border shadow-card",
        featured ? "border-gold/40" : "border-line"
      )}
    >
      <Image
        src={service.image}
        alt={service.name}
        fill
        quality={90}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/5" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-night/40" />

      <span className="absolute right-5 top-5 rounded-full border border-line bg-night/60 px-3 py-1 text-[11px] uppercase tracking-widest text-silver backdrop-blur">
        {service.duration}
      </span>
      {featured && (
        <span className="absolute left-5 top-5 rounded-full border border-gold/50 bg-night/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-champagne backdrop-blur">
          Most Coveted
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7">
        <span className="text-xs uppercase tracking-[0.24em] text-gold">
          {service.tagline}
        </span>
        <h3 className="font-display text-3xl text-cream">{service.name}</h3>
        <div className="mt-1 flex items-end justify-between">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.24em] text-mist">
              from
            </span>
            <span className="font-display text-3xl text-gold-gradient">
              ${service.price}
            </span>
          </p>
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fog transition-colors group-hover/flip:text-champagne">
            Explore
            <span className="flex size-8 items-center justify-center rounded-full border border-line transition-colors group-hover/flip:border-gold/60">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-3.5">
                <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  );

  const back = (
    <div
      className={cn(
        "glass-deep flex h-full flex-col rounded-3xl border p-7 sm:p-8",
        featured ? "border-gold/40 shadow-glow-gold" : "border-gold/25"
      )}
    >
      <span className="text-xs uppercase tracking-[0.24em] text-gold">
        {service.tagline}
      </span>
      <h3 className="mt-1 font-display text-2xl text-cream">{service.name}</h3>
      <p className="mt-4 text-sm leading-relaxed text-fog">
        {service.description}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-silver/90">
            <Sparkle className="size-2" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="font-display text-2xl text-gold-gradient">
          ${service.price}
          <span className="ml-2 text-xs uppercase tracking-widest text-mist">
            {service.duration}
          </span>
        </span>
        <button
          onClick={book}
          className="group/btn flex items-center gap-2 rounded-full bg-gradient-to-br from-champagne via-gold to-bronze px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-night transition-all hover:shadow-glow-gold"
        >
          Book
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5 transition-transform group-hover/btn:translate-x-0.5">
            <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <Reveal
      delay={0.08 * index}
      className={cn("h-full", featured && "sm:col-span-2 lg:col-span-2")}
    >
      <FlipCard front={front} back={back} height="h-[460px]" />
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute left-0 top-1/3 size-[420px] rounded-full bg-gold/[0.04] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Menu"
          title="Rituals of the chair"
          goldWord={3}
          copy="Five disciplines, one standard. Hover any card to turn it over. Every service closes with a hot towel, a styling lesson, and a handshake."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
