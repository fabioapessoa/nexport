"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

type DivisionLink = { key: string; href: string; label: string; desc: string };

export default function Header({ locale, nav }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const divisionsWrapRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  const divisionLinks: DivisionLink[] = [
    { key: "mobility", href: "#divisiones", label: "Nexport Mobility", desc: nav.divisionsMobilityDesc },
    { key: "agrotech", href: "#divisiones", label: "Nexport Agrotech", desc: nav.divisionsAgrotechDesc },
    { key: "lineaAmarilla", href: "#divisiones", label: "Línea Amarilla", desc: nav.divisionsLineaAmarillaDesc },
  ];

  const primaryLinks = [
    { href: "#nexport", label: nav.about },
    { href: "#alianzas", label: nav.partnerships },
    { href: "#contacto", label: nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the divisions dropdown on outside click or Escape.
  useEffect(() => {
    if (!divisionsOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (!divisionsWrapRef.current?.contains(e.target as Node)) {
        setDivisionsOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDivisionsOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [divisionsOpen]);

  // Mobile menu: lock scroll, trap focus inside the panel, close on Escape,
  // make background content inert, and return focus to the trigger on close.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const main = document.getElementById("site-main");
    const footer = document.getElementById("site-footer");

    if (!menuOpen) {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : [];
    focusables[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen]);

  const scrolledShadow = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-porcelain/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolledShadow ? "shadow-[0_1px_0_0_rgba(11,14,20,0.08)]" : ""
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link
          href={`/${locale}#inicio`}
          className="relative z-10 flex items-center"
          aria-label="Nexport Global C.A."
        >
          <Image
            src="/media/logo-mark.png"
            alt="Nexport Global C.A."
            width={1473}
            height={841}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href={primaryLinks[0].href}
            className="text-[13px] font-medium tracking-[0.02em] text-ink/75 transition-colors hover:text-bronze"
          >
            {primaryLinks[0].label}
          </a>

          <div ref={divisionsWrapRef} className="relative">
            <button
              type="button"
              onClick={() => setDivisionsOpen((v) => !v)}
              aria-expanded={divisionsOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-[13px] font-medium tracking-[0.02em] text-ink/75 transition-colors hover:text-bronze"
            >
              {nav.divisions}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div
              className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 transition-all duration-200 ${
                divisionsOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className="rounded-xl border border-ink/10 bg-paper p-2 shadow-2xl">
                {divisionLinks.map((d) => (
                  <a
                    key={d.key}
                    href={d.href}
                    onClick={() => setDivisionsOpen(false)}
                    className="block rounded-lg px-4 py-3 transition-colors hover:bg-porcelain"
                  >
                    <span className="block text-sm font-medium text-ink">{d.label}</span>
                    <span className="mt-0.5 block text-xs text-ink/50">{d.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {primaryLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-[0.02em] text-ink/75 transition-colors hover:text-bronze"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-1 text-[12px] font-semibold tracking-wide text-ink/60">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                <Link
                  href={`/${loc}`}
                  className={`px-1 transition-colors hover:text-gold ${
                    loc === locale ? "text-gold" : ""
                  }`}
                  aria-current={loc === locale ? "true" : undefined}
                >
                  {localeLabels[loc]}
                </Link>
                {i < locales.length - 1 && <span className="text-ink/25">/</span>}
              </span>
            ))}
          </div>
          <a
            href="#contacto"
            className="rounded-full bg-gradient-to-r from-gold to-bronze px-6 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {nav.ctaContact}
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
        >
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      </header>

      <div
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menuLabel}
        className={`fixed inset-0 z-40 bg-porcelain transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col gap-6 overflow-y-auto px-7 pb-10 pt-24">
          <a
            href={primaryLinks[0].href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-2xl font-medium text-ink"
          >
            {primaryLinks[0].label}
          </a>

          <div>
            <p className="font-display text-2xl font-medium text-ink">{nav.divisions}</p>
            <div className="mt-4 flex flex-col gap-4 border-l border-ink/10 pl-5">
              {divisionLinks.map((d) => (
                <a
                  key={d.key}
                  href={d.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-ink/70"
                >
                  {d.label}
                  <span className="block text-xs font-normal text-ink/45">{d.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {primaryLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl font-medium text-ink"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-gold to-bronze px-7 py-3 text-sm font-semibold text-ink"
          >
            {nav.ctaContact}
          </a>

          <div className="mt-auto flex items-center gap-4 border-t border-ink/10 pt-6 text-sm font-semibold tracking-wide text-ink/60">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                onClick={() => setMenuOpen(false)}
                className={loc === locale ? "text-bronze" : ""}
              >
                {localeLabels[loc]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
