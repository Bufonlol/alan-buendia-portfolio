"use client";

import Image from "next/image";
import { useLang, type L } from "@/lib/i18n";
import type { Project } from "@/data/projects";
import TLink from "@/components/ui/TLink";
import Reveal from "@/components/motion/Reveal";

type Props = {
  project: Project;
  next: Project;
};

/** Editorial case study built on the portfolio's system: a magazine
 *  cover with print-grain type and an acid disc, numbered sections,
 *  framed screen plates and a next-project bridge. */
export default function CaseStudy({ project, next }: Props) {
  const { t } = useLang();

  return (
    <main>
      {/* ─────────────── typographic cover ─────────────── */}
      <header className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden bg-ink pb-14 pt-24 text-paper">
        {/* acid disc + blinds, echoing the hero, bleeding off the top-right */}
        <div
          aria-hidden="true"
          className="absolute right-[-8%] top-[-6%] h-[34vw] max-h-[380px] w-[34vw] max-w-[380px] overflow-hidden rounded-full bg-acid"
        >
          <div className="blinds absolute inset-0" />
        </div>
        {/* diagonal + editorial marks */}
        <div
          aria-hidden="true"
          className="absolute left-[-10%] top-[30%] h-px w-[130%] rotate-[-16deg] bg-paper/15"
        />
        <span
          aria-hidden="true"
          className="absolute left-[3.5%] top-[38%] hidden text-2xl text-paper/60 lg:block"
        >
          ✳
        </span>
        <span aria-hidden="true" className="u-num absolute bottom-40 left-[42%] text-paper/25">
          +
        </span>

        {/* top row: label + giant index outline */}
        <div className="frame relative z-10 flex items-start justify-between">
          <p className="u-label text-mute">
            {t({ es: "Caso de estudio", en: "Case study" })}
          </p>
          <span
            aria-hidden="true"
            className="num-outline text-[clamp(3rem,7vw,6rem)] text-paper/50"
          >
            {project.index}
          </span>
        </div>

        {/* title + tagline + meta */}
        <div className="frame relative z-10">
          <h1 className="relative">
            <span className="sr-only">{t(project.title)}</span>
            <Reveal type="mask-up">
              <span
                aria-hidden="true"
                className="display block text-[clamp(3.2rem,12vw,11rem)]"
              >
                {t(project.title)}
              </span>
            </Reveal>
            <span
              aria-hidden="true"
              className="type-grain pointer-events-none absolute inset-0"
            />
          </h1>
          <Reveal type="rise" delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mute">
              {t(project.tagline)}
            </p>
          </Reveal>
          <Reveal type="line" className="rule mt-10 text-paper" />
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            <MetaItem label={t({ es: "Año", en: "Year" })} value={project.year} />
            <MetaItem label={t({ es: "Rol", en: "Role" })} value={t(project.role)} />
            <MetaItem
              label={t({ es: "Estado", en: "Status" })}
              value={t(project.status)}
            />
            <MetaItem label="Stack" value={project.tags.join(" / ")} />
          </div>
        </div>
      </header>

      {/* ─────────────── problem ─────────────── */}
      <section className="bg-paper py-24 text-ink md:py-32">
        <div className="frame grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading num="01" title={{ es: "El problema", en: "The problem" }} />
          </div>
          <Reveal type="rise" delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed text-ink/85">{t(project.problem)}</p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── research ─────────────── */}
      <section className="border-t border-ink/15 bg-paper py-24 text-ink md:py-32">
        <div className="frame grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading num="02" title={{ es: "Investigación", en: "Research" }} />
          </div>
          <Reveal type="rise" delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed text-ink/85">{t(project.research)}</p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────── solution ─────────────── */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
        {/* lateral acid triangle, echoing the manifesto composition */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-[20%] hidden h-40 w-24 bg-acid xl:block"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
        />
        <div className="frame relative z-10">
          <SectionHeading
            num="03"
            title={{ es: "La solución", en: "The solution" }}
            onDark
          />
          <Reveal type="line" className="rule mt-8 text-paper" />
          <ol className="mt-4">
            {project.solution.map((item, i) => (
              <li
                key={i}
                className="group grid grid-cols-[3rem_1fr] items-start gap-4 border-b border-paper/12 py-6 transition-colors hover:bg-paper/[0.03] md:grid-cols-[6rem_1fr]"
              >
                <span className="u-num text-acid transition-transform duration-300 group-hover:translate-x-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="max-w-3xl text-base leading-relaxed text-paper/85">
                  {t(item)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────────── screens ─────────────── */}
      {project.screens.length > 0 && (
        <section className="bg-paper py-24 text-ink md:py-32">
          <div className="frame">
            <SectionHeading num="04" title={{ es: "El sistema", en: "The system" }} />
            <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12">
              {project.screens.map((screen, i) => {
                const wide = i % 3 === 0;
                return (
                  <figure
                    key={i}
                    className={
                      wide
                        ? "lg:col-span-10 lg:col-start-2"
                        : i % 3 === 1
                          ? "lg:col-span-7"
                          : "lg:col-span-5 lg:self-end"
                    }
                  >
                    {screen.image && (
                      <Reveal type="wipe">
                        <div
                          className={`group relative overflow-hidden border border-ink/25 bg-ink ${
                            wide ? "aspect-[16/9]" : "aspect-[4/3]"
                          }`}
                        >
                          <Image
                            src={screen.image}
                            alt={t(screen.caption)}
                            fill
                            sizes="(max-width: 1024px) 100vw, 70vw"
                            className={`transition-transform duration-700 group-hover:scale-[1.03] ${
                              screen.fit === "contain"
                                ? "object-contain p-6"
                                : "object-cover object-top"
                            }`}
                          />
                          {/* acid corner accent on the lead screen */}
                          {wide && (
                            <div
                              aria-hidden="true"
                              className="absolute bottom-0 right-0 h-10 w-10 bg-acid"
                              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                            />
                          )}
                        </div>
                      </Reveal>
                    )}
                    <figcaption className="u-label mt-3 flex items-center gap-3 text-ink/55">
                      <span className="u-num text-acid">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {t(screen.caption)}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── results ─────────────── */}
      <section className="border-t border-ink/15 bg-paper py-24 text-ink md:py-32">
        <div className="frame">
          <SectionHeading num="05" title={{ es: "Resultado", en: "Results" }} />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3">
            {project.results.map((r, i) => (
              <div
                key={i}
                className={`border-t border-ink/20 py-8 md:border-t-0 md:px-8 ${
                  i > 0 ? "md:border-l" : "md:pl-0"
                }`}
              >
                <p className="display text-[clamp(2.6rem,6vw,4.6rem)] text-ink">
                  {t(r.metric)}
                </p>
                <p className="u-label mt-3 text-ink/60">{t(r.label)}</p>
              </div>
            ))}
          </div>

          {/* learnings */}
          <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                num="06"
                title={{ es: "Aprendizajes", en: "Learnings" }}
              />
            </div>
            <ul className="lg:col-span-8">
              {project.learnings.map((l, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/15 py-5"
                >
                  <span className="u-num text-ink/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-ink/85">{t(l)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* external links */}
          {(project.live || project.repo || project.external) && (
            <div className="mt-16 flex flex-wrap gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial btn-editorial--acid group"
                >
                  {t({ es: "Ver en vivo", en: "View live" })}
                  <span className="arrow-x" aria-hidden="true" />
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial group"
                >
                  {t({ es: "Repositorio", en: "Repository" })}
                  <span className="arrow-x" aria-hidden="true" />
                </a>
              )}
              {project.external && (
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial group"
                >
                  npm
                  <span className="arrow-x" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── next project ─────────────── */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="frame">
          <p className="u-label text-mute">
            {t({ es: "Siguiente proyecto", en: "Next project" })}
          </p>
          <TLink
            href={`/projects/${next.slug}`}
            data-cursor="project"
            className="group relative mt-4 block"
          >
            <span className="relative inline-block">
              <span className="display block text-[clamp(2.8rem,9vw,7.5rem)] transition-colors duration-300 group-hover:text-acid">
                {t(next.title)}
              </span>
              <span
                aria-hidden="true"
                className="type-grain pointer-events-none absolute inset-0"
              />
            </span>
            <span className="mt-6 flex items-center gap-4">
              <span className="u-label text-mute">{next.year}</span>
              <span className="arrow-x" aria-hidden="true" />
            </span>
          </TLink>
        </div>
      </section>
    </main>
  );
}

/** Numbered section heading with a giant faint outline numeral behind. */
function SectionHeading({
  num,
  title,
  onDark,
}: {
  num: string;
  title: L;
  onDark?: boolean;
}) {
  const { t } = useLang();
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className={`num-outline pointer-events-none absolute -top-6 right-0 text-[clamp(3.5rem,8vw,7rem)] lg:-right-4 ${
          onDark ? "text-paper/10" : "text-ink/10"
        }`}
      >
        {num}
      </span>
      <Reveal type="mask-up">
        <div className="flex items-baseline gap-4">
          <span className="u-num text-acid">{num}</span>
          <h2 className="display text-[clamp(2rem,4.8vw,3.8rem)]">{t(title)}</h2>
        </div>
      </Reveal>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="u-label text-mute">{label}</dt>
      <dd className="mt-1.5 text-sm text-paper/90">{value}</dd>
    </div>
  );
}
