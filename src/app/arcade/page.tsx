import type { Metadata } from "next";
import ArcadeClient from "@/components/arcade/ArcadeClient";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Arcade / Arcade",
  description:
    "Un arcade hecho desde cero en canvas / a tiny arcade built from scratch in canvas — juega Buendía Breaker.",
  alternates: {
    canonical: `${SITE.url}/arcade`,
  },
  openGraph: {
    title: "Arcade / Arcade",
    description:
      "Un arcade hecho desde cero en canvas / a tiny arcade built from scratch in canvas — juega Buendía Breaker.",
    url: `${SITE.url}/arcade`,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
    images: [`${SITE.url}/og-arcade.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcade / Arcade",
    description:
      "Un arcade hecho desde cero en canvas / a tiny arcade built from scratch in canvas — juega Buendía Breaker.",
    images: [`${SITE.url}/og-arcade.png`],
  },
};

export default function ArcadePage() {
  return <ArcadeClient />;
}
