import { Reveal, SplitWords } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

/** Eyebrow + display title + optional standfirst, used by every section. */
export default function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center",
  goldWord,
  className,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  /** 1-based index of the word to render in gold italic. */
  goldWord?: number;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-5 md:mb-20",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Reveal>
        <span className="flex items-center gap-4">
          <span className="hairline-gold w-10" />
          <span className="eyebrow">{eyebrow}</span>
          {centered && <span className="hairline-gold w-10" />}
        </span>
      </Reveal>
      <h2 className="font-display text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
        <SplitWords
          text={title}
          wordClassName={(_, i) =>
            goldWord !== undefined && i === goldWord - 1
              ? "italic text-gold-gradient pr-1"
              : undefined
          }
        />
      </h2>
      {copy && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-fog",
              centered && "mx-auto"
            )}
          >
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}
