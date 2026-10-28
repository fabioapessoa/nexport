import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

type FooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  footer: Dictionary["footer"];
};

// Static build-time value: cacheComponents prerendering requires deterministic
// values in the static shell, so this is set at build time rather than per-request.
const COPYRIGHT_YEAR = 2026;

export default function Footer({ locale, nav, footer }: FooterProps) {
  const navLinks = [
    { href: "#inicio", label: nav.home },
    { href: "#nexport", label: nav.about },
    { href: "#divisiones", label: nav.divisions },
    { href: "#alianzas", label: nav.partnerships },
    { href: "#nuestro-grupo", label: nav.group },
    { href: "#donde-operamos", label: nav.presence },
    { href: "#contacto", label: nav.contact },
  ];

  const divisionLinks = [
    { href: "#divisiones", label: "Nexport Mobility" },
    { href: "#divisiones", label: "Nexport Agrotech" },
    { href: "#divisiones", label: "Línea Amarilla" },
  ];

  return (
    <footer className="bg-ink pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-offwhite/10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/media/logo-mark.png"
              alt="Nexport Global C.A."
              width={1473}
              height={841}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-offwhite/55">
              {footer.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-offwhite/45">
              {footer.divisionsTitle}
            </p>
            <ul className="space-y-2.5">
              {divisionLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-offwhite/65 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-offwhite/45">
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
