import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog — Escritura / Writing",
  description:
    "Notas sobre rendimiento, sistemas de diseño y desarrollo frontend. / Notes on performance, design systems and frontend development.",
  alternates: {
    canonical: `${SITE.url}/blog`,
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${SITE.name} — Blog` }],
    },
  },
  openGraph: {
    title: "Blog — Alan Buendía",
    description:
      "Notas sobre rendimiento, sistemas de diseño y desarrollo frontend.",
    url: `${SITE.url}/blog`,
    siteName: SITE.name,
    locale: "es_MX",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogIndex />;
}
