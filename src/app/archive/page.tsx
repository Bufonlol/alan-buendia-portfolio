import type { Metadata } from "next";
import ProjectIndex from "@/components/project/ProjectIndex";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Todos los proyectos / All projects",
  description:
    "Índice completo de proyectos: ERPs, plataformas, cotizadores y sistemas en producción. / Complete project index.",
  alternates: {
    canonical: `${SITE.url}/archive`,
  },
  openGraph: {
    title: "Todos los proyectos / All projects",
    description:
      "Índice completo de proyectos: ERPs, plataformas, cotizadores y sistemas en producción.",
    url: `${SITE.url}/archive`,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
  },
};

export default function ArchivePage() {
  return <ProjectIndex />;
}
