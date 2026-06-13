import type { Metadata } from "next";
import ArchiveClient from "@/components/archive/ArchiveClient";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Archivo / Archive",
  description:
    "Índice completo / complete index — cada sistema enviado, en curso o retirado.",
  alternates: {
    canonical: `${SITE.url}/archive`,
  },
  openGraph: {
    title: "Archivo / Archive",
    description:
      "Índice completo / complete index — cada sistema enviado, en curso o retirado.",
    url: `${SITE.url}/archive`,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
    images: [`${SITE.url}/og-archive.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archivo / Archive",
    description:
      "Índice completo / complete index — cada sistema enviado, en curso o retirado.",
    images: [`${SITE.url}/og-archive.png`],
  },
};

export default function ArchivePage() {
  return <ArchiveClient />;
}
