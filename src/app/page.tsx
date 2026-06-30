import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Stats from "@/components/home/Stats";
import Stack from "@/components/home/Stack";
import Toolkit from "@/components/home/Toolkit";
import Process from "@/components/home/Process";
import Experience from "@/components/home/Experience";
import About from "@/components/home/About";
import Fun from "@/components/home/Fun";
import Contact from "@/components/home/Contact";
import Marquee from "@/components/Marquee";
import ArtDivider from "@/components/art/ArtDivider";
import { SITE } from "@/data/site";
import { MARQUEE_CONTACT, MARQUEE_ITEMS } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.name} — Frontend Developer / Desarrollador Frontend`,
  description:
    "Frontend developer from Orizaba, México / desarrollador frontend de Orizaba, México. I build interfaces that feel inevitable — fast, accessible, and a little bit playful.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `${SITE.name} — Frontend Developer / Desarrollador Frontend`,
    description:
      "Interfaces that feel inevitable / interfaces que se sienten inevitables.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
    images: [`${SITE.url}/og-home.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Frontend Developer / Desarrollador Frontend`,
    description:
      "Interfaces that feel inevitable / interfaces que se sienten inevitables.",
    images: [`${SITE.url}/og-home.png`],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <FeaturedProjects />
      <Stats />
      <ArtDivider label={{ es: "Herramientas", en: "Tooling" }} variant="registration" />
      <Stack />
      <Toolkit />
      <ArtDivider label={{ es: "Cómo trabajo", en: "How I work" }} variant="asterisk" />
      <Process />
      <Experience />
      <About />
      <Fun />
      <Marquee items={MARQUEE_CONTACT} baseSeconds={16} />
      <Contact />
    </main>
  );
}
