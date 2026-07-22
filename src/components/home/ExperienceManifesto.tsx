"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { EXPERIENCE, PRINCIPLES } from "@/data/site";
import GeometricSymbol from "@/components/ui/GeometricSymbol";
import Reveal from "@/components/motion/Reveal";
import TLink from "@/components/ui/TLink";

/**
 * Experience + manifesto — back to the black spread.
 * Section transition: four paper blocks cover the section and slide
 * up in stagger as it enters (the "sliding blocks" page change).
 */
export default function ExperienceManifesto() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const overlay = el.querySelector(".wipe-overlay");
      if (!overlay) return;
      if (prefersReducedMotion() || isDeckCapable()) {
        gsap.set(overlay, { display: "none" });
        return;
      }
      /* one-shot on enter: the paper blocks cover the section, then
         retract in stagger — a deliberate sliding-blocks page transition */
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 72%", once: true } })
        .set(overlay, { display: "grid" })
        .fromTo(
          ".wipe-block",
          { yPercent: 0 },
          { yPercent: -101, duration: 0.7, stagger: 0.1, ease: "power3.inOut" }
        )
        .set(overlay, { display: "none" });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="experience"
      className="relative overflow-hidden bg-ink py-28 text-paper md:py-36 deck:flex deck:h-full deck:flex-col deck:justify-center deck:py-0"
    >
      {/* sliding-blocks transition overlay (paper → black) */}
      <div
        aria-hidden="true"
        className="wipe-overlay pointer-events-none absolute inset-0 z-30 grid grid-cols-2 md:grid-cols-4"
      >
        <div className="wipe-block bg-paper" />
        <div className="wipe-block bg-paper" />
        <div className="wipe-block hidden bg-paper md:block" />
        <div className="wipe-block hidden bg-paper md:block" />
      </div>

      {/* lateral geometric composition */}
      <div
        aria-hidden="true"
        className="absolute right-[4%] top-[16%] hidden h-[60%] w-40 xl:block"
      >
        <div className="absolute right-0 top-0 h-[55%] w-20 border border-paper/25" />
        <div
          className="absolute bottom-[18%] right-6 h-32 w-32 bg-acid"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        />
        <div className="absolute bottom-0 left-0 h-24 w-14 bg-paper/10" />
        <div className="absolute left-[-30%] top-[30%] h-px w-[160%] rotate-[-32deg] bg-paper/20" />
      </div>

      <div className="frame relative z-10">
        <h2 className="display text-[clamp(2.6rem,7.5vw,6.5rem)] deck:text-[clamp(2.2rem,4.5vw,4rem)]">
          <Reveal type="mask-up">
            <span className="block">{t({ es: "Experiencia", en: "Experience" })}</span>
          </Reveal>
          <Reveal type="mask-up" delay={0.1}>
            <span className="block">
              / {t({ es: "Manifiesto", en: "Manifesto" })}
            </span>
          </Reveal>
        </h2>

        <Reveal type="line" className="rule mt-10 text-paper deck:mt-5" />

        <div className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-[3fr_4fr_4fr] xl:gap-10 xl:pr-40 deck:mt-8 deck:grid-cols-[3fr_4fr_4fr] deck:gap-8">
          {/* intro */}
          <Reveal type="rise">
            <div>
              <p className="display max-w-[15ch] text-[clamp(1.7rem,2.8vw,2.5rem)] leading-[1.12]">
                {t({
                  es: "3+ años construyendo productos digitales para clientes reales en México.",
                  en: "3+ years building digital products for real clients in México.",
                })}
              </p>
              <TLink
                href="/#about"
                className="btn-editorial group mt-8 text-paper"
              >
                {t({ es: "Mi historia", en: "My story" })}
                <span className="arrow-x" aria-hidden="true" />
              </TLink>
            </div>
          </Reveal>

          {/* timeline */}
          <Reveal type="rise" delay={0.1}>
            <ol className="relative border-l border-paper/20 pl-8">
              {EXPERIENCE.map((item) => (
                <li key={item.company} className="relative pb-12 last:pb-0 deck:pb-8">
                  <span
                    aria-hidden="true"
                    className="absolute left-[-2.42rem] top-1 h-2.5 w-2.5 rounded-full border border-paper/40 bg-ink"
                  />
                  <p className="u-label text-acid">{t(item.period)}</p>
                  <h3 className="mt-2 font-sans text-base font-bold uppercase tracking-wide">
                    {t(item.role)}
                  </h3>
                  <p className="u-label mt-1 text-mute">{item.company}</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
                    {t(item.summary)}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* principles */}
          <Reveal type="rise" delay={0.18}>
            <ul>
              {PRINCIPLES.map((p) => (
                <li key={p.symbol} className="border-b border-paper/15 py-6 first:pt-0">
                  <div className="flex items-start gap-5">
                    <GeometricSymbol
                      id={p.symbol}
                      className="mt-1 h-9 w-9 shrink-0 text-paper"
                    />
                    <div>
                      <h3 className="display text-xl">{t(p.name)}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute">
                        {t(p.note)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
