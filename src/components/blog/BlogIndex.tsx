"use client";

import { useLang } from "@/lib/i18n";
import { sortedPosts, readingMinutes } from "@/data/blog";
import TLink from "@/components/ui/TLink";
import Reveal from "@/components/motion/Reveal";

const fmtDate = (iso: string, lang: "es" | "en") =>
  new Date(iso).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** Blog index — an editorial list of writing, matching the project archive. */
export default function BlogIndex() {
  const { t, lang } = useLang();
  const posts = sortedPosts();

  return (
    <main className="min-h-[100svh] bg-ink pb-28 pt-32 text-paper">
      <div className="frame">
        <p className="u-label text-mute">
          {t({ es: "Escritura", en: "Writing" })} / {posts.length}
        </p>
        <h1 className="display mt-3 text-[clamp(3rem,10vw,9rem)]">
          <Reveal type="mask-up">
            <span className="block">{t({ es: "Blog", en: "Blog" })}</span>
          </Reveal>
        </h1>
        <Reveal type="rise" delay={0.1}>
          <p className="mt-6 max-w-[52ch] text-paper/70">
            {t({
              es: "Notas sobre rendimiento, sistemas de diseño y cómo construyo software para clientes reales.",
              en: "Notes on performance, design systems and how I build software for real clients.",
            })}
          </p>
        </Reveal>

        <Reveal type="line" className="rule mt-10 text-paper" />

        <ol className="mt-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <TLink
                href={`/blog/${p.slug}`}
                className="group flex flex-col gap-3 border-b border-paper/12 py-8 transition-colors duration-300 hover:bg-paper/5 md:flex-row md:items-baseline md:gap-8"
              >
                <span className="u-num w-28 shrink-0 text-[0.6875rem] text-mute">
                  {fmtDate(p.date, lang)}
                </span>
                <span className="flex-1">
                  <span className="display block text-[clamp(1.6rem,4vw,2.8rem)] transition-transform duration-300 group-hover:translate-x-2">
                    {t(p.title)}
                  </span>
                  <span className="mt-2 block max-w-[60ch] text-sm text-paper/65">
                    {t(p.excerpt)}
                  </span>
                  <span className="u-label mt-3 block text-mute">
                    {p.tags.join(" / ")} · {readingMinutes(p, lang)}{" "}
                    {t({ es: "min de lectura", en: "min read" })}
                  </span>
                </span>
                <span className="arrow-x hidden shrink-0 md:inline-block" aria-hidden="true" />
              </TLink>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
