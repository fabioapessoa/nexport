import RevealOnScroll from "@/components/RevealOnScroll";
import GroupExperienceVideo from "@/components/GroupExperienceVideo";
import OperationsGallery, { type GalleryItem } from "@/components/OperationsGallery";
import type { Dictionary } from "@/lib/dictionaries";

export default function GroupExperience({
  group,
}: {
  group: Dictionary["group"];
}) {
  const stats = [group.stat1, group.stat2, group.stat3];
  const gallery = group.gallery;

  const galleryItems: GalleryItem[] = [
    {
      type: "video",
      src: "/media/gallery-agroindustrial-facility.mp4",
      poster: "/media/gallery-agroindustrial-facility-poster.jpg",
      alt: gallery.facility,
      width: 1024,
      height: 576,
      span: "sm:col-span-2 sm:row-span-2",
    },
    {
      type: "video",
      src: "/media/gallery-silos-aerial.mp4",
      poster: "/media/gallery-silos-aerial-poster.jpg",
      alt: gallery.silosAerial,
      width: 1024,
      height: 576,
      span: "sm:col-start-3 sm:row-start-1",
    },
    {
      type: "video",
      src: "/media/gallery-harvest-combine.mp4",
      poster: "/media/gallery-harvest-combine-poster.jpg",
      alt: gallery.harvest,
      width: 1024,
      height: 576,
      span: "sm:col-start-3 sm:row-start-2",
    },
    {
      type: "photo",
      src: "/media/gallery-silos-photo.jpg",
      alt: gallery.silosPhoto,
      width: 880,
      height: 720,
      span: "sm:col-span-2 sm:row-start-3",
    },
    {
      type: "video",
      src: "/media/gallery-ourobranco-operations.mp4",
      poster: "/media/gallery-ourobranco-operations-poster.jpg",
      alt: gallery.fleet,
      width: 1024,
      height: 576,
      span: "sm:col-start-3 sm:row-start-3",
    },
  ];

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

            <div className="mt-8 rounded-xl border border-bronze/25 bg-porcelain px-5 py-4">
              <p className="text-sm leading-relaxed text-ink/70">
                {group.clarification}
              </p>
            </div>

            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-ink/10 pt-7">
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

            <a
              href="#contacto"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-bronze transition-colors hover:text-ink"
            >
              {group.cta}
              <span aria-hidden="true">→</span>
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={150} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-ink/10 sm:aspect-[5/4]">
              <GroupExperienceVideo />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={200} className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-bronze">
              {gallery.title}
            </p>
            <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {gallery.subtitle}
            </h3>
          </div>

          <div className="mt-10">
            <OperationsGallery
              items={galleryItems}
              caption={gallery.caption}
              openLabel={gallery.openLabel}
              playLabel={gallery.playLabel}
              closeLabel={gallery.closeLabel}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
