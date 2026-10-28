import RevealOnScroll from "@/components/RevealOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

export default function HowWeWork({
  howWeWork,
}: {
  howWeWork: Dictionary["howWeWork"];
}) {
  const steps = [howWeWork.step1, howWeWork.step2, howWeWork.step3];

  return (
    <section className="bg-porcelain py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="max-w-2xl">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-bronze">
            {howWeWork.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {howWeWork.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            {howWeWork.intro}
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.number} delay={i * 130} className="relative">
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-[-1.4rem] top-5 hidden h-px w-7 bg-gradient-to-r from-bronze/60 to-transparent sm:block"
                />
              )}
              <p className="font-display text-4xl font-semibold text-bronze/35">
                {step.number}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {step.text}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
