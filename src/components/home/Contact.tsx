"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import Magnetic from "@/components/Magnetic";

export default function Contact() {
  const { lenis } = useApp();
  const { lang, t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;
      const q = gsap.utils.selector(section);

      if (prefersReducedMotion()) {
        // calm mode: opacity-only reveal when the section arrives
        gsap.fromTo(
          [title, ...q(".contact-fade")],
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 60%", once: true },
          }
        );
        return;
      }

      const split = new SplitText(title, { type: "chars", mask: "chars" });
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: section, start: "top 55%", once: true },
        })
        .set(title, { autoAlpha: 1 })
        .fromTo(
          split.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.025 }
        )
        .fromTo(
          q(".contact-fade"),
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 },
          "-=0.5"
        );
    },
    { dependencies: [lang], scope: sectionRef }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink px-5 pb-6 pt-28 text-paper md:px-8"
    >
      {/* Aceternity grid + Magic UI retro grid backgrounds */}
      <div className="bg-grid-paper pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="retro-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2" aria-hidden="true" />

      <div className="relative z-10 flex items-center justify-between">
        <span className="u-label flex items-center gap-2 text-paper/70">
          <span
            className="inline-block h-2 w-2 rounded-full bg-accent"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          {t(SITE.availability)}
        </span>
        <span className="u-label text-paper/40">
          {t({ es: "06 — Contacto", en: "06 — Contact" })}
        </span>
      </div>

      <div className="relative z-10">
        <p className="contact-fade u-label mb-6 text-paper/50" style={{ opacity: 0 }}>
          {t({
            es: "¿Una idea? ¿Una chamba? ¿Un boss fight?",
            en: "Have an idea? A job? A boss fight?",
          })}
        </p>
        <h2
          ref={titleRef}
          className="display text-[clamp(2.4rem,10.5vw,11.5rem)] leading-[0.92]"
          style={{ opacity: 0 }}
        >
          {t({ es: "Construyamos", en: "Let's build" })}
          <br />
          {t({ es: "juntos", en: "together" })}
          <span className="text-accent">◆</span>
        </h2>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-center md:gap-12">
          <div className="contact-fade" style={{ opacity: 0 }}>
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${SITE.email}`}
                className="link-line font-serif text-[clamp(1.3rem,3vw,2.2rem)] italic text-paper"
              >
                {SITE.email}
              </a>
            </Magnetic>
          </div>
          <div className="contact-fade" style={{ opacity: 0 }}>
            <Magnetic>
              <button
                onClick={copyEmail}
                className="btn-accent-glow border-beam u-label rounded-full bg-accent px-8 py-4 text-paper hover:scale-105"
                style={{ ["--beam-color" as string]: "rgba(243, 239, 230, 0.9)" }}
              >
                {copied
                  ? t({ es: "Copiado ✓", en: "Copied ✓" })
                  : t({ es: "Copiar correo →", en: "Copy email →" })}
              </button>
            </Magnetic>
          </div>
        </div>

        <div
          className="contact-fade u-label mt-12 flex flex-wrap gap-8"
          style={{ opacity: 0 }}
        >
          <a href={SITE.cvUrl} target="_blank" rel="noreferrer" className="link-line">
            {t({ es: "Descargar CV ↘", en: "Download CV ↘" })}
          </a>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="link-line">
            GitHub ↗
          </a>
        </div>
      </div>

      {/* footer strip */}
      <div className="relative z-10 flex flex-col gap-3 border-t border-line-paper pt-5 md:flex-row md:items-center md:justify-between">
        <span className="u-label text-paper/40">
          © 2026 {SITE.fullName}
        </span>
        <span className="u-label text-paper/40">
          {t({
            es: `Hecho con Next.js, GSAP & Three.js — diseñado en ${SITE.locationShort}`,
            en: `Built with Next.js, GSAP & Three.js — designed in ${SITE.locationShort}`,
          })}
        </span>
        <button
          onClick={() => {
            if (lenis) lenis.scrollTo(0, { duration: 1.6 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="u-label link-line text-left text-paper md:text-right"
        >
          {t({ es: "Volver arriba ↑", en: "Back to top ↑" })}
        </button>
      </div>

      {/* watermark */}
      <span
        className="display pointer-events-none absolute -bottom-[0.22em] right-0 select-none text-[clamp(8rem,28vw,26rem)] leading-none text-paper/[0.04]"
        aria-hidden="true"
      >
        AB
      </span>
    </section>
  );
}
