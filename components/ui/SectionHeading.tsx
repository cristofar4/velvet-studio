import { Reveal, SplitWords } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";

/* Mono eyebrow with index, display title, optional standfirst.
   One word can be picked out in the crimson razor gradient. */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
  align = "left",
  crimsonWord,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  crimsonWord?: number;
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
          {index && <span className="font-mono text-xs text-crimson">{index}</span>}
          <span className="h-px w-10 bg-line-strong" />
          <span className="eyebrow">{eyebrow}</span>
        </span>
      </Reveal>
      <h2 className="max-w-4xl font-display text-4xl leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
        <SplitWords
          text={title}
          wordClassName={(_, i) =>
            crimsonWord !== undefined && i === crimsonWord - 1
              ? "italic text-crimson-gradient pr-1"
              : undefined
          }
        />
      </h2>
      {copy && (
        <Reveal delay={0.15}>
          <p className={cn("max-w-xl text-base leading-relaxed text-ash", centered && "mx-auto")}>
            {copy}
          </p>
        </Reveal>
      )}
    </div>
  );
}
