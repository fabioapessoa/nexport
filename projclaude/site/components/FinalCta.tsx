import RevealOnScroll from "@/components/RevealOnScroll";
import ProfileCTA from "@/components/ProfileCTA";
import type { Dictionary } from "@/lib/dictionaries";

export default function FinalCta({
  finalCta,
}: {
  finalCta: Dictionary["finalCta"];
}) {
  return (
    <section className="bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <RevealOnScroll>
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold">
            {finalCta.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-offwhite sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-offwhite/65">
            {finalCta.subtitle}
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          delay={120}
          className="mt-10 grid gap-5 sm:grid-cols-2"
        >
          <ProfileCTA
            profile="manufacturer"
            label=""
            className="group flex flex-col items-start rounded-2xl border border-offwhite/15 bg-graphite-soft p-7 text-left transition-colors hover:border-gold"
          >
            <span className="font-display text-lg font-semibold text-offwhite">
              {finalCta.manufacturerLabel}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-offwhite/60">
              {finalCta.manufacturerText}
            </span>
            <span className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-gold transition-colors group-hover:text-offwhite">
              →
            </span>
          </ProfileCTA>

          <ProfileCTA
            profile="buyer"
            label=""
            className="group flex flex-col items-start rounded-2xl border border-offwhite/15 bg-graphite-soft p-7 text-left transition-colors hover:border-gold"
          >
            <span className="font-display text-lg font-semibold text-offwhite">
              {finalCta.buyerLabel}
            </span>
            <span className="mt-2 text-sm leading-relaxed text-offwhite/60">
              {finalCta.buyerText}
            </span>
            <span className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-gold transition-colors group-hover:text-offwhite">
              →
            </span>
          </ProfileCTA>
        </RevealOnScroll>
      </div>
    </section>
  );
}
