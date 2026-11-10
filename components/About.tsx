import RevealOnScroll from "@/components/RevealOnScroll";
import Eyebrow from "@/components/Eyebrow";
import type { Dictionary } from "@/lib/dictionaries";

export default function About({ about }: { about: Dictionary["about"] }) {
  const points = [about.point1, about.point2, about.point3];

  return (
    <section id="nexport" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <RevealOnScroll className="lg:col-span-5">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {about.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
              {about.body.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a
              href="#experiencia"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-bronze transition-colors hover:text-ink"
            >
              {about.cta}
              <span aria-hidden="true">→</span>
            </a>
          </RevealOnScroll>

          <div className="grid gap-6 sm:grid-cols-3 lg:col-span-7">
            {points.map((point, i) => (
              <RevealOnScroll
                key={point.title}
                delay={i * 120}
                className="rounded-2xl border border-ink/10 bg-porcelain p-7"
              >
                <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-bronze/40 text-sm font-semibold text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium text-ink">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {point.text}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
