"use client";

import { useLang } from "@/lib/i18n";
import { STACK, DECISIONS, FACTS } from "@/data/colophon";
import { SITE } from "@/data/site";
import Reveal from "@/components/motion/Reveal";
import TLink from "@/components/ui/TLink";

/** Colophon — "how this site is built": the stack, the decisions and a
 *  few numbers, in the site's editorial style. A normal scrolling page. */
export default function Colophon() {
  const { t } = useLang();

  return (
    <main className="min-h-[100svh] bg-ink pb-28 pt-32 text-paper">
      <div className="frame">
        {/* hero */}
        <p className="u-label text-mute">
          {t({ es: "Colofón", en: "Colophon" })}
        </p>
        <h1 className="display mt-3 text-[clamp(2.6rem,9vw,8rem)] leading-[0.9]">
          <Reveal type="mask-up">
            <span className="block">{t({ es: "Cómo está", en: "How it's" })}</span>
          </Reveal>
          <Reveal type="mask-up" delay={0.1}>
            <span className="block text-acid">{t({ es: "hecho", en: "built" })}</span>
          </Reveal>
        </h1>
        <Reveal type="rise" delay={0.15}>
          <p className="mt-8 max-w-[58ch] text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-paper/75">
            {t({
              es: "Este portafolio es en sí mismo un proyecto. Sin plantillas ni librerías de componentes: cada pieza está construida a mano, con atención al detalle y al rendimiento.",
              en: "This portfolio is a project in itself. No templates, no component libraries: every piece is hand-built, with attention to detail and performance.",
            })}
          </p>
        </Reveal>

        {/* facts */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-paper/12 bg-paper/12 md:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.metric} className="bg-ink p-6">
              <p className="display text-[clamp(1.8rem,4vw,3rem)] text-acid">
                {f.metric}
              </p>
              <p className="u-label mt-2 text-mute">{t(f.label)}</p>
            </div>
          ))}
        </div>

        {/* stack */}
        <section className="mt-24">
          <div className="flex items-baseline gap-4">
            <span className="u-num text-[0.6875rem] text-mute">01</span>
            <h2 className="display text-[clamp(1.8rem,5vw,3.4rem)]">
              {t({ es: "El stack", en: "The stack" })}
            </h2>
          </div>
          <Reveal type="line" className="rule mt-6 text-paper" />
          <ul className="mt-2">
            {STACK.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-1 gap-1 border-b border-paper/12 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
              >
                <span className="u-label text-mute md:col-span-2">
                  {t(item.role)}
                </span>
                <span className="display text-[clamp(1.3rem,2.4vw,1.8rem)] md:col-span-4">
                  {item.name}
                </span>
                <span className="text-sm text-paper/70 md:col-span-6">
                  {t(item.note)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* decisions */}
        <section className="mt-24">
          <div className="flex items-baseline gap-4">
            <span className="u-num text-[0.6875rem] text-mute">02</span>
            <h2 className="display text-[clamp(1.8rem,5vw,3.4rem)]">
              {t({ es: "Decisiones", en: "Decisions" })}
            </h2>
          </div>
          <Reveal type="line" className="rule mt-6 text-paper" />
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            {DECISIONS.map((d, i) => (
              <div key={i} className="flex gap-5">
                <span className="u-num shrink-0 text-[0.6875rem] text-acid">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.1rem,2vw,1.4rem)]">
                    {t(d.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">
                    {t(d.note)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* outro */}
        <section className="mt-24 border-t border-paper/12 pt-10">
          <p className="max-w-[52ch] text-[clamp(1.1rem,2vw,1.5rem)] leading-snug text-paper/85">
            {t({
              es: "Menos es más. Cada línea de código y cada píxel deben tener un propósito.",
              en: "Less is more. Every line of code and every pixel must have a purpose.",
            })}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial text-paper"
            >
              {t({ es: "Ver mi GitHub", en: "See my GitHub" })}
              <span className="arrow-x" aria-hidden="true" />
            </a>
            <TLink href="/#contact" className="link-line u-label text-mute">
              {t({ es: "Trabajemos juntos", en: "Let's work together" })}
            </TLink>
          </div>
        </section>
      </div>
    </main>
  );
}
