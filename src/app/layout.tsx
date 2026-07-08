import type { Metadata, Viewport } from "next";
import { Anton, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { SITE } from "@/data/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-plex-mono",
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
  icons: { icon: "/favicon.png" },
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
  themeColor: "#F7F6EF",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${anton.variable} ${plexMono.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
