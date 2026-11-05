import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales, isLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
        pt: "/pt",
        "x-default": "/es",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${sansFont.variable} ${serifFont.variable}`}
    >
      <body className="min-h-screen bg-porcelain text-ink antialiased">
        <a
          href="#inicio"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-ink"
        >
          {dict.skipToContent}
        </a>
        <Header locale={locale} nav={dict.nav} groupBadge={dict.groupBadge} />
        <main id="site-main">{children}</main>
        <div id="site-footer">
          <Footer locale={locale} nav={dict.nav} footer={dict.footer} />
        </div>
      </body>
    </html>
  );
}
