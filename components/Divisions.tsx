import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import DivisionCTA from "@/components/DivisionCTA";
import type { Dictionary } from "@/lib/dictionaries";

export default function Divisions({
  divisions,
}: {
  divisions: Dictionary["divisions"];
}) {
  const cards = [
    { key: "mobility" as const, ...divisions.mobility, image: "/media/division-mobility.jpg" },
    { key: "agrotech" as const, ...divisions.agrotech, image: "/media/division-agrotech-new.jpg" },
    { key: "lineaAmarilla" as const, ...divisions.lineaAmarilla, image: "/media/division-linea-amarilla.jpg" },
  ];

  return (
    <section id="divisiones" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="max-w-2xl">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold">
            {divisions.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-offwhite sm:text-4xl">
            {divisions.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-offwhite/65">
            {divisions.intro}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <RevealOnScroll
              key={card.key}
              delay={i * 130}
              className="group flex flex-col overflow-hidden rounded-2xl border border-offwhite/10 bg-graphite-soft"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-offwhite">
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-offwhite/65">
                  {card.text}
                </p>
                <DivisionCTA
                  division={card.key}
                  label={card.cta}
                  className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.08em] text-gold transition-colors hover:text-offwhite"
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
