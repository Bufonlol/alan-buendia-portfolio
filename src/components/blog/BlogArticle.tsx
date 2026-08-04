"use client";

import { notFound } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { getPost, readingMinutes, type BlogBlock } from "@/data/blog";
import { getProject } from "@/data/projects";
import TLink from "@/components/ui/TLink";
import Reveal from "@/components/motion/Reveal";

const fmtDate = (iso: string, lang: "es" | "en") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function Block({ block }: { block: BlogBlock }) {
  const { t } = useLang();
  switch (block.type) {
    case "h2":
      return (
        <h2 className="display mt-14 text-[clamp(1.5rem,3.5vw,2.2rem)] leading-tight">
          {t(block.text)}
        </h2>
      );
    case "p":
      return (
        <p className="mt-6 text-[1.05rem] leading-[1.75] text-paper/85">
          {t(block.text)}
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-acid pl-6 text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug text-paper">
          {t(block.text)}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="mt-6 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[1.05rem] leading-relaxed text-paper/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-acid" aria-hidden="true" />
              {t(item)}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="mt-8 overflow-x-auto border border-paper/15 bg-paper/[0.04]">
          <div className="u-label border-b border-paper/12 px-4 py-2 text-mute">
            {block.lang}
          </div>
          <pre className="p-4 text-sm leading-relaxed">
            <code className="font-mono text-paper/90">{block.code}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
}

/** A single blog article rendered from typed bilingual blocks. */
export default function BlogArticle({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const post = getPost(slug);
  if (!post) notFound();

  const project = post.project ? getProject(post.project) : undefined;

  return (
    <main className="min-h-[100svh] bg-ink pb-28 pt-32 text-paper">
      <article className="frame mx-auto max-w-[760px]">
        <TLink href="/blog" className="u-label link-line text-mute">
          {t({ es: "← Blog", en: "← Blog" })}
        </TLink>

        <p className="u-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-mute">
          <time dateTime={post.date}>{fmtDate(post.date, lang)}</time>
          <span aria-hidden="true">·</span>
          <span>
            {readingMinutes(post, lang)} {t({ es: "min de lectura", en: "min read" })}
          </span>
        </p>

        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,4rem)] leading-[0.95]">
          <Reveal type="mask-up">
            <span className="block">{t(post.title)}</span>
          </Reveal>
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="u-label border border-paper/25 px-2.5 py-1 text-mute">
              {tag}
            </span>
          ))}
        </div>

        <Reveal type="line" className="rule mt-10 text-paper" />

        <div className="mt-4">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* related project */}
        {project && (
          <div className="mt-16 border-t border-paper/12 pt-8">
            <p className="u-label text-mute">
              {t({ es: "Proyecto relacionado", en: "Related project" })}
            </p>
            <TLink
              href={`/projects/${project.slug}`}
              className="group mt-3 flex items-baseline gap-4"
            >
              <span className="display text-[clamp(1.4rem,3vw,2rem)] transition-transform duration-300 group-hover:translate-x-2">
                {t(project.title)}
              </span>
              <span className="arrow-x" aria-hidden="true" />
            </TLink>
          </div>
        )}
      </article>
    </main>
  );
}
