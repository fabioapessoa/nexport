import RevealOnScroll from "@/components/RevealOnScroll";
import GroupExperienceVideo from "@/components/GroupExperienceVideo";
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
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-bronze">
              {group.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {group.title}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink/70">
              {group.body}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-4 border-t border-ink/10 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-bronze sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-ink/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={150} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/10 sm:aspect-[5/4]">
              <GroupExperienceVideo />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
