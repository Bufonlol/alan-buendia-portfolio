import type { Metadata } from "next";
import PlaygroundClient from "@/components/lab/PlaygroundClient";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Laboratorio / Playground",
  description:
    "Experimentos, bocetos e ideas raras / experiments, sketches & weird ideas — Three.js, shaders, timelines GSAP, partículas y distorsión WebGL.",
  alternates: {
    canonical: `${SITE.url}/playground`,
  },
  openGraph: {
    title: "Laboratorio / Playground",
    description:
      "Experimentos, bocetos e ideas raras / experiments, sketches & weird ideas — Three.js, shaders, timelines GSAP, partículas y distorsión WebGL.",
    url: `${SITE.url}/playground`,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
    images: [`${SITE.url}/og-playground.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratorio / Playground",
    description:
      "Experimentos, bocetos e ideas raras / experiments, sketches & weird ideas — Three.js, shaders, timelines GSAP, partículas y distorsión WebGL.",
    images: [`${SITE.url}/og-playground.png`],
  },
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
