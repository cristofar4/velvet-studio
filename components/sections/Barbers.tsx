"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { barbers, type Barber } from "@/lib/data";

function SocialMini({ label }: { label: Barber["socials"][number]["label"] }) {
  if (label === "Instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-3.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (label === "TikTok")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
        <path d="M16.5 3c.4 2.1 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6c0 3.4-2.6 5.8-5.9 5.8A5.8 5.8 0 0 1 4.8 15c0-3.3 2.7-5.9 6.2-5.7v3.1c-1.7-.3-3.1.8-3.1 2.5 0 1.5 1.2 2.7 2.7 2.7 1.6 0 2.8-1.2 2.8-3V3h3.1z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
      <path d="M18.9 2H22l-7 8 8.3 12h-6.6l-5.1-7.1L5.6 22H2.4l7.5-8.6L2 2h6.7l4.6 6.4L18.9 2zm-1.2 18h1.8L7.1 3.9H5.2L17.7 20z" />
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function BarberCard({ barber, index }: { barber: Barber; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      custom={index}
      className="group relative overflow-hidden rounded-3xl border border-line bg-onyx shadow-card transition-colors duration-500 hover:border-gold/40"
      data-cursor="Meet"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={barber.image}
          alt={`${barber.name} — ${barber.role} at Velvet Fade Studio`}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
          className="object-cover grayscale-[0.55] transition-all duration-[1.1s] ease-out group-hover:scale-[1.08] group-hover:grayscale-0"
        />
        {/* rising veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 translate-y-2/3 bg-gradient-to-t from-night via-night/70 to-transparent transition-transform duration-700 ease-out group-hover:translate-y-1/3" />

        {/* years chip */}
        <span className="absolute right-4 top-4 rounded-full border border-line bg-night/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-silver backdrop-blur transition-colors duration-500 group-hover:border-gold/50 group-hover:text-champagne">
          {barber.years} yrs
        </span>

        {/* identity + reveal */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow mb-1.5 text-[10px]!">{barber.role}</p>
          <h3 className="font-display text-2xl text-cream transition-colors duration-300 group-hover:text-champagne">
            {barber.name}
          </h3>

          <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-out group-hover:max-h-44 group-hover:opacity-100">
            <p className="text-xs leading-relaxed text-fog">{barber.bio}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {barber.specialties.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-champagne"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-2.5">
              {barber.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${barber.name} on ${s.label}`}
                  className="flex size-8 items-center justify-center rounded-full border border-line text-silver transition-all duration-300 hover:border-gold/70 hover:bg-gold hover:text-night"
                >
                  <SocialMini label={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Barbers() {
  return (
    <section id="barbers" className="relative border-t border-line bg-coal py-28 lg:py-36">
      <div className="pointer-events-none absolute right-0 top-0 size-[380px] rounded-full bg-gold/[0.04] blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Masters"
          title="Hands you can trust"
          goldWord={2}
          copy="Four chairs, four disciplines. Each master apprenticed for years before earning a mirror at Velvet Fade."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map((barber, i) => (
            <BarberCard key={barber.id} barber={barber} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
