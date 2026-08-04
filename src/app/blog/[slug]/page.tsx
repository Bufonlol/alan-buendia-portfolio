import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { POSTS, getPost } from "@/data/blog";
import BlogArticle from "@/components/blog/BlogArticle";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title.es} / ${post.title.en}`;
  const description = `${post.excerpt.es} / ${post.excerpt.en}`;
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      locale: "es_MX",
      publishedTime: post.date,
      tags: post.tags,
      url: `${SITE.url}/blog/${slug}`,
      images: [`${SITE.url}/og-home.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE.url}/og-home.png`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.es,
    description: post.excerpt.es,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    inLanguage: ["es", "en"],
    url: `${SITE.url}/blog/${slug}`,
    author: { "@type": "Person", name: SITE.fullName, url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle slug={slug} />
    </>
  );
}
