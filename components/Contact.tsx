import RevealOnScroll from "@/components/RevealOnScroll";
import ContactForm from "@/components/ContactForm";
import type { Dictionary } from "@/lib/dictionaries";

export default function Contact({ contact }: { contact: Dictionary["contact"] }) {
  return (
    <section id="contacto" className="bg-porcelain py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <RevealOnScroll className="mb-12 text-center">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-bronze">
            {contact.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {contact.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            {contact.subtitle}
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          delay={120}
          className="rounded-3xl border border-ink/10 bg-ink p-6 sm:p-10"
        >
          <ContactForm form={contact.form} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
