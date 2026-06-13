import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { SITE } from "@/data/site";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Frontend Developer / Desarrollador Frontend`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Frontend developer from Orizaba, México / desarrollador frontend de Orizaba, México. I build interfaces that feel inevitable — fast, accessible, and a little bit playful. React, TypeScript, GSAP & Three.js.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${SITE.name} — Frontend Developer / Desarrollador Frontend`,
    description:
      "Interfaces that feel inevitable / interfaces que se sienten inevitables. React, TypeScript, GSAP & Three.js.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Frontend Developer / Desarrollador Frontend`,
    description:
      "Interfaces that feel inevitable / interfaces que se sienten inevitables. React, TypeScript, GSAP & Three.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${archivo.variable} ${instrument.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
