"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import Reveal from "@/components/motion/Reveal";

/** Final CTA — black spread, giant type, rotating stamp.
 *  Section transition: an acid band sweeps diagonally across
 *  the section as it enters. */
export default function Contact() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const band = el.querySelector(".acid-sweep");
      if (!band) return;
      if (prefersReducedMotion() || isDeckCapable()) {
        gsap.set(band, { display: "none" });
        return;
      }
      /* one-shot: the acid band sweeps across the section on enter */
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 72%", once: true } })
        .fromTo(
          band,
          { xPercent: -180 },
          { xPercent: 520, duration: 1.1, ease: "power3.inOut" }
        )
        .set(band, { display: "none" });
    },
    { scope: root }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };

  const stampText =
    lang === "es"
      ? "ESCRÍBEME · HABLEMOS · NUEVOS PROYECTOS · "
      : "WRITE ME · LET'S TALK · NEW PROJECTS · ";

  return (
    <section
      ref={root}
      id="contact"
      className="relative overflow-hidden bg-ink pb-24 pt-28 text-paper md:pt-36 deck:flex deck:h-full deck:flex-col deck:justify-center deck:pb-0 deck:pt-0"
    >
      {/* diagonal acid band that sweeps across on entry */}
      <div
        aria-hidden="true"
        className="acid-sweep pointer-events-none absolute left-0 top-[-20%] z-0 h-[140%] w-[28%] rotate-[14deg] bg-acid"
      />
      {/* halftone corner texture */}
      <div
        aria-hidden="true"
        className="halftone absolute bottom-0 left-0 h-40 w-72 text-paper opacity-10"
      />

      <div className="frame relative z-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 deck:gap-8">
          {/* giant question */}
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(3rem,10vw,9rem)] deck:text-[clamp(3rem,7.5vw,6.5rem)]">
              <Reveal type="mask-up">
                <span className="block text-acid">
                  {t({ es: "¿Tienes un", en: "Got a" })}
                </span>
              </Reveal>
              <Reveal type="mask-up" delay={0.08}>
                <span className="block text-acid">
                  {t({ es: "proyecto en", en: "project in" })}
                </span>
              </Reveal>
              <Reveal type="mask-up" delay={0.16}>
                <span className="block text-paper">
                  {t({ es: "mente?", en: "mind?" })}
                </span>
              </Reveal>
            </h2>

            {/* big arrow that stretches on hover */}
            <a
              href={`mailto:${SITE.email}`}
              className="group mt-14 block deck:mt-8"
              aria-label={t({ es: "Enviar correo", en: "Send email" })}
            >
              <div className="flex items-center gap-4">
                <span className="u-label text-mute transition-colors group-hover:text-acid">
                  {t({ es: "Escríbeme", en: "Write me" })}
                </span>
                <span className="relative h-px flex-1 bg-paper/25 transition-colors duration-500 group-hover:bg-acid">
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-paper/60 transition-all duration-500 group-hover:border-acid"
                  />
                </span>
              </div>
            </a>
          </div>

          {/* contact data + stamp */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-4">
            <Reveal type="rise" delay={0.2}>
              <dl className="grid grid-cols-1 gap-7 deck:grid-cols-2 deck:gap-6">
                <div>
                  <dt className="u-label text-mute">Email</dt>
                  <dd className="mt-2 flex flex-wrap items-center gap-4">
                    <a href={`mailto:${SITE.email}`} className="link-line text-sm">
                      {SITE.email}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="u-label border border-paper/30 px-2.5 py-1.5 transition-colors hover:border-acid hover:text-acid"
                    >
                      {copied
                        ? t({ es: "Copiado", en: "Copied" })
                        : t({ es: "Copiar", en: "Copy" })}
                    </button>
                  </dd>
                </div>
                <div>
                  <dt className="u-label text-mute">
                    {t({ es: "Ubicación", en: "Location" })}
                  </dt>
                  <dd className="mt-2 text-sm">{SITE.location}</dd>
                </div>
                <div>
                  <dt className="u-label text-mute">
                    {t({ es: "Disponibilidad", en: "Availability" })}
                  </dt>
                  <dd className="mt-2 flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-acid" aria-hidden="true" />
                    {t({
                      es: "Abierto a nuevos proyectos",
                      en: "Open to new projects",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="u-label text-mute">GitHub</dt>
                  <dd className="mt-2">
                    <a
                      href={SITE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line text-sm"
                    >
                      github.com/Bufonlol
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            {/* rotating circular stamp */}
            <div className="relative ml-auto h-36 w-36 md:h-44 md:w-44" aria-hidden="true">
              <svg viewBox="0 0 100 100" className="stamp-spin h-full w-full">
                <defs>
                  <path
                    id="stamp-circle"
                    d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="fill-paper font-mono text-[8.2px] uppercase tracking-[0.18em]">
                  <textPath href="#stamp-circle">{stampText}</textPath>
                </text>
              </svg>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-acid">
                +
              </span>
            </div>
          </div>
        </div>

        {/* deck mode has no global footer — this bottom bar closes the page */}
        <div className="mt-14 hidden items-center justify-between border-t border-paper/15 pt-5 deck:flex">
          <p className="u-label text-mute">
            © 2026 {SITE.name.toUpperCase()}.{" "}
            {t({
              es: "Todos los derechos reservados.",
              en: "All rights reserved.",
            })}
          </p>
          <p className="u-num text-[0.6875rem] text-mute">{SITE.coords}</p>
        </div>
      </div>
    </section>
  );
}
