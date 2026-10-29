import { notFound } from "next/navigation";
import RevealOnScroll from "@/components/RevealOnScroll";
import OperationsGallery, { type GalleryItem } from "@/components/OperationsGallery";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

export default async function GalleryPage({ params }: PageProps<"/[locale]/galeria">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = dict.gallery.items;

  const items: GalleryItem[] = [
    {
      type: "photo",
      src: "/media/ops-agriculture-harvest-fleet.jpg",
      alt: t.agricultureFleet,
      width: 2400,
      height: 1350,
      span: "sm:col-span-2 sm:row-span-2",
    },
    {
      type: "video",
      src: "/media/ops-logistics-maersk.mp4",
      poster: "/media/ops-logistics-maersk-poster.jpg",
      alt: t.logisticsMaersk,
      width: 1280,
      height: 704,
      span: "sm:col-start-3 sm:row-start-1",
    },
    {
      type: "photo",
      src: "/media/ops-logistics-truck.jpg",
      alt: t.logisticsTruck,
      width: 2400,
      height: 1800,
      span: "sm:col-start-4 sm:row-start-1",
    },
    {
      type: "video",
      src: "/media/ops-logistics-crane.mp4",
      poster: "/media/ops-logistics-crane-poster.jpg",
      alt: t.logisticsCrane,
      width: 854,
      height: 470,
      span: "sm:col-start-3 sm:row-start-2",
    },
    {
      type: "video",
      src: "/media/ops-logistics-grainload.mp4",
      poster: "/media/ops-logistics-grainload-poster.jpg",
      alt: t.logisticsGrainload,
      width: 1280,
      height: 720,
      span: "sm:col-start-4 sm:row-start-2",
    },
    {
      type: "photo",
      src: "/media/ops-agriculture-cropduster.jpg",
      alt: t.agricultureCropduster,
      width: 1793,
      height: 2400,
      span: "sm:col-start-1 sm:row-start-3",
    },
    {
      type: "video",
      src: "/media/ops-agriculture-cotton.mp4",
      poster: "/media/ops-agriculture-cotton-poster.jpg",
      alt: t.agricultureCotton,
      width: 848,
      height: 480,
      span: "sm:col-start-2 sm:row-start-3",
    },
    {
      type: "photo",
      src: "/media/ops-agriculture-soyfield.jpg",
      alt: t.agricultureSoyfield,
      width: 2400,
      height: 1800,
      span: "sm:col-start-3 sm:row-start-3",
    },
    {
      type: "photo",
      src: "/media/ops-storage-facility.jpg",
      alt: t.storageFacility,
      width: 2400,
      height: 1770,
      span: "sm:col-start-4 sm:row-start-3",
    },
    {
      type: "video",
      src: "/media/ops-storage-aerial.mp4",
      poster: "/media/ops-storage-aerial-poster.jpg",
      alt: t.storageAerial,
      width: 1280,
      height: 720,
      span: "sm:col-span-2 sm:row-start-4",
    },
    {
      type: "video",
      src: "/media/ops-irrigation-canal.mp4",
      poster: "/media/ops-irrigation-canal-poster.jpg",
      alt: t.irrigationCanal,
      width: 1280,
      height: 2276,
      span: "sm:col-start-3 sm:row-start-4",
    },
    {
      type: "video",
      src: "/media/ops-irrigation-pivot.mp4",
      poster: "/media/ops-irrigation-pivot-poster.jpg",
      alt: t.irrigationPivot,
      width: 854,
      height: 1518,
      span: "sm:col-start-4 sm:row-start-4",
    },
  ];

  return (
    <section className="bg-ink py-28 pt-36 sm:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.22em] text-gold">
            {dict.gallery.eyebrow}
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-offwhite sm:text-4xl lg:text-5xl">
            {dict.gallery.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-offwhite/65">
            {dict.gallery.intro}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={150} className="mt-14">
          <OperationsGallery
            items={items}
            columns={4}
            caption={dict.gallery.caption}
            openLabel={dict.gallery.openLabel}
            playLabel={dict.gallery.playLabel}
            closeLabel={dict.gallery.closeLabel}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={200} className="mt-14 text-center">
          <a
            href={`/${locale}#inicio`}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-gold transition-colors hover:text-offwhite"
          >
            <span aria-hidden="true">←</span>
            {dict.gallery.backLabel}
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
