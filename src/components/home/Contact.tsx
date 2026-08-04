"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/home/ContactForm";

/** Final CTA — black spread, giant type, rotating stamp.
 *  Section transition: an acid band sweeps diagonally across
 *  the section as it enters. */
export default function Contact() {
  const { t } = useLang();
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
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 deck:gap-10">
          {/* giant question + contact data */}
          <div className="lg:col-span-6">
            <h2 className="display text-[clamp(2.6rem,8vw,7rem)] deck:text-[clamp(2.6rem,6vw,5rem)]">
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

            <Reveal type="rise" delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 gap-7 deck:mt-8 deck:gap-6">
                <div>
                  <dt className="u-label text-mute">Email</dt>
                  <dd className="mt-2 flex flex-wrap items-center gap-3">
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
                    {t({ es: "Abierto", en: "Open" })}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* contact form */}
          <div className="lg:col-span-6 lg:pl-10">
            <Reveal type="rise" delay={0.15}>
              <p className="u-label mb-6 text-mute">
                {t({ es: "Escríbeme directo", en: "Write me directly" })}
              </p>
            </Reveal>
            <ContactForm />
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
