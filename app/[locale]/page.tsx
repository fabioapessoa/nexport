import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceAreas from "@/components/ExperienceAreas";
import HowWeWork from "@/components/HowWeWork";
import GroupExperience from "@/components/GroupExperience";
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
      <ExperienceAreas experienceAreas={dict.experienceAreas} />
      <HowWeWork howWeWork={dict.howWeWork} />
      <GroupExperience group={dict.group} />
      <Contact contact={dict.contact} />
    </>
  );
}
