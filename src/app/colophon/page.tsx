import type { Metadata } from "next";
import Colophon from "@/components/colophon/Colophon";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Cómo está hecho / Colophon",
  description:
    "El stack y las decisiones detrás de este portafolio: Next.js, React, TypeScript, Tailwind y GSAP. / The stack and decisions behind this portfolio.",
  alternates: {
    canonical: `${SITE.url}/colophon`,
  },
  openGraph: {
    title: "Cómo está hecho / Colophon — Alan Buendía",
    description:
      "El stack y las decisiones detrás de este portafolio: Next.js, React, TypeScript, Tailwind y GSAP.",
    url: `${SITE.url}/colophon`,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
  },
};

export default function ColophonPage() {
  return <Colophon />;
}
