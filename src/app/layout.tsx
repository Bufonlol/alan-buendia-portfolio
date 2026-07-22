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
    "Desarrollador web frontend en Orizaba, México. Experiencias digitales rápidas, accesibles y con atención a los detalles. React, TypeScript, Next.js y GSAP.",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
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
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0B0A",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${anton.variable} ${plexMono.variable}`}
    >
      <body className="bg-ink font-sans text-paper antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
