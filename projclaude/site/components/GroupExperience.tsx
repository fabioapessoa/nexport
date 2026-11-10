import RevealOnScroll from "@/components/RevealOnScroll";
import Eyebrow from "@/components/Eyebrow";
import type { Dictionary } from "@/lib/dictionaries";

export default function GroupExperience({
  group,
}: {
  group: Dictionary["group"];
}) {
  const stats = [group.stat1, group.stat2];

  return (
    <section id="nuestro-grupo" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>{group.eyebrow}</Eyebrow>
              <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                {group.title}
              </h2>
              <span aria-hidden="true" className="mt-8 block h-px w-16 bg-bronze/60" />
            </div>

            <div className="lg:col-span-7 lg:pt-10">
              <div className="max-w-[62ch] space-y-5 text-base leading-[1.8] text-ink/70 sm:text-[17px]">
                {group.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-2 gap-8 border-t border-bronze/20 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl font-semibold text-bronze sm:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-ink/55 sm:text-[13px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
