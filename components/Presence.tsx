import RevealOnScroll from "@/components/RevealOnScroll";
import PresenceGraphic from "@/components/PresenceGraphic";
import type { Dictionary } from "@/lib/dictionaries";

export default function Presence({
  presence,
}: {
  presence: Dictionary["presence"];
}) {
  return (
    <section id="donde-operamos" className="bg-porcelain py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-bronze">
              {presence.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {presence.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70">
              {presence.body}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-6 border-t border-ink/10 pt-7">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-ink/45">
                  {presence.venezuelaLabel}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-ink">
                  {presence.venezuelaValue}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-ink/45">
                  {presence.internationalLabel}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-ink">
                  {presence.internationalValue}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150}>
            <PresenceGraphic
              className="w-full"
              eyebrow={presence.mapEyebrow}
              label={presence.mapLabel}
              legend={presence.mapLegend}
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
