import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Divisions from "@/components/Divisions";
import HowWeWork from "@/components/HowWeWork";
import Partnerships from "@/components/Partnerships";
import GroupExperience from "@/components/GroupExperience";
import Presence from "@/components/Presence";
import FinalCta from "@/components/FinalCta";
import Contact from "@/components/Contact";
import { isLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <>
      <Hero hero={dict.hero} />
      <About about={dict.about} />
      <Divisions divisions={dict.divisions} />
      <HowWeWork howWeWork={dict.howWeWork} />
      <Partnerships partnerships={dict.partnerships} />
      <GroupExperience group={dict.group} />
      <Presence presence={dict.presence} />
      <FinalCta finalCta={dict.finalCta} />
      <Contact contact={dict.contact} />
    </>
  );
}
