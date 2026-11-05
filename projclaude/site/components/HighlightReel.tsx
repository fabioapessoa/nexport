import RevealOnScroll from "@/components/RevealOnScroll";
import HighlightReelVideo from "@/components/HighlightReelVideo";
import type { Dictionary } from "@/lib/dictionaries";

export default function HighlightReel({
  highlightReel,
}: {
  highlightReel: Dictionary["highlightReel"];
}) {
  return (
    <section className="bg-porcelain py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-[0_20px_60px_-25px_rgba(6,15,30,0.45)]"
        >
          <HighlightReelVideo label={highlightReel.label} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
