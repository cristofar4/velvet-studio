"use client";

import Image from "next/image";
import { useLenis } from "@/components/providers/SmoothScroll";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/fx/TiltCard";
import { Reveal } from "@/components/fx/Reveal";
import { services, type Service } from "@/lib/data";
import { cn } from "@/lib/utils";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const lenis = useLenis();
  const wide = service.featured;

  const book = () => {
    if (lenis) lenis.scrollTo("#book", { offset: -72, duration: 1.5 });
    else document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Reveal
      delay={0.08 * index}
      className={cn("h-full", wide ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2")}
    >
      <TiltCard className="group h-full">
        <article
          className={cn(
            "card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-500",
            "glass hover:-translate-y-1.5 hover:shadow-card",
            wide
              ? "border-gold/30 hover:border-gold/60 hover:shadow-glow-gold md:flex-row"
              : "border-line hover:border-gold/40"
          )}
        >
          {/* footage */}
          <div
            className={cn(
              "relative overflow-hidden",
              wide ? "h-56 md:h-auto md:w-1/2" : "h-48"
            )}
          >
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(min-width: 1024px) 33vw, 92vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-onyx/0" />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent" />
            {wide && (
              <span className="absolute left-5 top-5 rounded-full border border-gold/50 bg-night/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-champagne backdrop-blur">
                Most Coveted
              </span>
            )}
          </div>

          {/* copy */}
          <div className={cn("flex flex-1 flex-col p-7", wide && "md:p-10")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl text-cream transition-colors duration-300 group-hover:text-champagne">
                  {service.name}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold">
                  {service.tagline}
                </p>
              </div>
              <span className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-widest text-mist">
                {service.duration}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-fog">
              {service.description}
            </p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-silver/90">
                  <svg viewBox="0 0 24 24" className="size-2 shrink-0 fill-gold">
                    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-end justify-between pt-7">
              <p className="flex items-baseline gap-1.5">
                <span className="text-[11px] uppercase tracking-[0.24em] text-mist">
                  from
                </span>
                <span className="font-display text-3xl text-gold-gradient">
                  ${service.price}
                </span>
              </p>
              <button
                onClick={book}
                aria-label={`Book ${service.name}`}
                className="flex size-12 items-center justify-center rounded-full border border-line text-cream transition-all duration-500 group-hover:border-gold/70 group-hover:bg-gold group-hover:text-night group-hover:shadow-glow-gold"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="size-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0"
                >
                  <path d="M3 12h17m0 0-6.5-6.5M20 12l-6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </article>
      </TiltCard>
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
          copy="Five disciplines, one standard. Every service closes with a hot towel, a styling lesson, and a handshake."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
