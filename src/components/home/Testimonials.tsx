"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { TESTIMONIALS } from "@/data/site";
import Reveal from "@/components/motion/Reveal";

/** Client voices — social proof on the black spread, between About and
 *  the final CTA. Editorial cards: a large quote, role-based attribution
 *  and the project context. */
export default function Testimonials() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion() || isDeckCapable()) return;
      gsap.fromTo(
        el.querySelectorAll(".voice-card"),
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 68%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="voices"
      className="relative overflow-hidden bg-ink py-28 text-paper md:py-36 deck:flex deck:h-full deck:flex-col deck:justify-center deck:py-0"
    >
      {/* halftone corner texture, echoing the contact slide */}
      <div
        aria-hidden="true"
        className="halftone absolute right-0 top-0 h-40 w-72 text-paper opacity-10"
      />

      <div className="frame relative z-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display text-[clamp(2.6rem,7.5vw,6.5rem)]">
            <Reveal type="mask-up">
              <span className="block">{t({ es: "Lo que", en: "What" })}</span>
            </Reveal>
            <Reveal type="mask-up" delay={0.1}>
              <span className="block text-acid">{t({ es: "dicen", en: "they say" })}</span>
            </Reveal>
          </h2>
          <Reveal type="rise" delay={0.15}>
            <p className="u-label max-w-[26ch] text-mute">
              {t({
                es: "Clientes reales, sistemas en producción.",
                en: "Real clients, systems in production.",
              })}
            </p>
          </Reveal>
        </div>

        <Reveal type="line" className="rule mt-10 text-paper deck:mt-5" />

        {TESTIMONIALS.length === 1 ? (
          /* single voice — a large featured quote */
          <figure className="voice-card mt-14 max-w-[46ch] deck:mt-10">
            <span
              aria-hidden="true"
              className="display block text-[5rem] leading-none text-acid"
            >
              &ldquo;
            </span>
            <blockquote className="mt-2 text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.2] text-paper">
              {t(TESTIMONIALS[0].quote)}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-paper/12 pt-5">
              <span className="h-2 w-2 shrink-0 bg-acid" aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium">
                  {t(TESTIMONIALS[0].author)}
                </span>
                <span className="u-label mt-1 block text-mute">
                  {t(TESTIMONIALS[0].context)}
                </span>
              </span>
            </figcaption>
          </figure>
        ) : (
          /* multiple voices — an editorial grid */
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-paper/12 bg-paper/12 md:grid-cols-3 deck:mt-8">
            {TESTIMONIALS.map((item, i) => (
              <figure
                key={i}
                className="voice-card flex flex-col justify-between gap-8 bg-ink p-8 deck:p-6"
              >
                <div>
                  <span
                    aria-hidden="true"
                    className="display block text-[3.5rem] leading-none text-acid"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-3 text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-paper/90">
                    {t(item.quote)}
                  </blockquote>
                </div>
                <figcaption className="border-t border-paper/12 pt-5">
                  <p className="text-sm font-medium">{t(item.author)}</p>
                  <p className="u-label mt-1.5 text-mute">{t(item.context)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
