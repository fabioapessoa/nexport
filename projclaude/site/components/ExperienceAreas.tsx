import type { ReactNode } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

const icons: Record<string, ReactNode> = {
  logistics: (
    <path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  ),
  agriculture: (
    <path d="M12 3c2 2.5 3 5 3 7a3 3 0 1 1-6 0c0-2 1-4.5 3-7Zm0 10v8m-5-4 5 4 5-4" />
  ),
  irrigation: (
    <path d="M12 3c2.5 3.5 4 6.5 4 9a4 4 0 1 1-8 0c0-2.5 1.5-5.5 4-9Z" />
  ),
  oil: (
    <path d="M7 21V10l5-6 5 6v11H7Zm2-7h6M9 17h6" />
  ),
};

export default function ExperienceAreas({
  experienceAreas,
}: {
  experienceAreas: Dictionary["experienceAreas"];
}) {
  const cards = [
    { key: "logistics", ...experienceAreas.logistics },
    { key: "agriculture", ...experienceAreas.agriculture },
    { key: "irrigation", ...experienceAreas.irrigation },
    { key: "oil", ...experienceAreas.oil },
  ];

  return (
    <section id="experiencia" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="max-w-2xl">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold">
            {experienceAreas.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-offwhite sm:text-4xl">
            {experienceAreas.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-offwhite/65">
            {experienceAreas.intro}
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <RevealOnScroll
              key={card.key}
              delay={i * 110}
              className="rounded-2xl border border-offwhite/10 bg-graphite-soft p-7 sm:p-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[card.key]}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-offwhite">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-offwhite/65">
                {card.text}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
