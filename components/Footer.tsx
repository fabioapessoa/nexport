import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

type FooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
  groupBadge: Dictionary["groupBadge"];
};

// Static build-time value: cacheComponents prerendering requires deterministic
// values in the static shell, so this is set at build time rather than per-request.
const COPYRIGHT_YEAR = 2026;

export default function Footer({ locale, nav, footer, groupBadge }: FooterProps) {
  const navLinks = [
    { href: `/${locale}#inicio`, label: nav.home },
    { href: `/${locale}#nexport`, label: nav.about },
    { href: `/${locale}#experiencia`, label: nav.experienceAreas },
    { href: `/${locale}#nuestro-grupo`, label: nav.group },
    { href: `/${locale}/galeria`, label: nav.gallery },
    { href: `/${locale}#contacto`, label: nav.contact },
  ];

  return (
    <footer className="bg-ink pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-bronze/25 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/media/logo-nexport-emblem-dark.png"
              alt="Nexport Global C.A."
              width={806}
              height={600}
              quality={85}
              sizes="130px"
              className="h-[88px] w-auto sm:h-24"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/55">
              {footer.description}
            </p>
            <p className="mt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold/80">
              <span aria-hidden="true" className="h-px w-6 bg-gold/50" />
              {groupBadge.line}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-offwhite/45">
              {footer.languageTitle}
            </p>
            <div className="flex gap-4 text-sm font-medium text-offwhite/65">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={loc === locale ? "text-gold" : "hover:text-gold"}
                >
                  {localeLabels[loc]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-offwhite/45">
              {footer.navTitle}
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-offwhite/65 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-xs text-offwhite/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {footer.legalName}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
