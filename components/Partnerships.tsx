import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProfileCTA from "@/components/ProfileCTA";
import type { Dictionary } from "@/lib/dictionaries";

export default function Partnerships({
  partnerships,
}: {
  partnerships: Dictionary["partnerships"];
}) {
  const points = [partnerships.point1, partnerships.point2, partnerships.point3];

  return (
    <section id="alianzas" className="bg-graphite py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <RevealOnScroll className="lg:col-span-7">
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold">
              {partnerships.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-offwhite sm:text-4xl">
              {partnerships.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-offwhite/70">
              {partnerships.body}
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-sm leading-relaxed text-offwhite/75">{point}</span>
                </li>
              ))}
            </ul>

            <ProfileCTA
              profile="manufacturer"
              label={partnerships.cta}
              className="mt-9 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-bronze px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-transform hover:scale-[1.02]"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={150} className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-offwhite/10 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/media/alianzas-logistics.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/15" />
              <span className="absolute inset-x-6 bottom-14 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="absolute inset-x-0 bottom-7 text-center text-[12px] font-semibold uppercase tracking-[0.18em] text-offwhite/90">
                {partnerships.graphicCaption}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
