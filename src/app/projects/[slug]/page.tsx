import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { PROJECTS, getNextProject, getProject } from "@/data/projects";
import CaseStudy from "@/components/project/CaseStudy";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title.es} / ${project.title.en}`;
  const description = `${project.tagline.es} / ${project.tagline.en}`;
  const image = new URL(project.cardImage ?? "/favicon.svg", SITE.url).toString();
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "es_MX",
      images: [image],
      url: `${SITE.url}/projects/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudy project={project} next={getNextProject(slug)} />;
}
