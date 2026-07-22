import type { Metadata } from "next";
import HomeDeck from "@/components/home/HomeDeck";
import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperienceManifesto from "@/components/home/ExperienceManifesto";
import Capabilities from "@/components/home/Capabilities";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `${SITE.name} — Desarrollador Web / Frontend`,
  description:
    "Desarrollador web frontend en Orizaba, México. Creo experiencias digitales rápidas, accesibles y con atención a los detalles. / Frontend developer from Orizaba, México.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `${SITE.name} — Desarrollador Web / Frontend`,
    description:
      "Creo experiencias digitales rápidas, accesibles y con atención a los detalles.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
    images: [`${SITE.url}/og-home.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Desarrollador Web / Frontend`,
    description:
      "Creo experiencias digitales rápidas, accesibles y con atención a los detalles.",
    images: [`${SITE.url}/og-home.png`],
  },
};

export default function Home() {
  return (
    <main>
      {/* Slide order must match SECTIONS in data/site.ts */}
      <HomeDeck>
        <Hero />
        <FeaturedProjects />
        <ExperienceManifesto />
        <Capabilities />
        <About />
        <Contact />
      </HomeDeck>
    </main>
  );
}
