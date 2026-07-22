"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { CAPABILITIES } from "@/data/site";
import GeometricSymbol from "@/components/ui/GeometricSymbol";
import Reveal from "@/components/motion/Reveal";

/**
 * Stack as an editorial table — abstract symbols, not logos.
 * Section transition: the title arrives as a typographic cut,
 * its upper and lower halves sliding in from opposite sides.
 */
export default function Capabilities() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  const line1 = "Stack";
  const line2 = `/ ${t({ es: "Capacidades", en: "Capabilities" })}`;

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion() || isDeckCapable()) return;

      /* one-shot typographic cut on enter: the two halves slide together */
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: "top 74%", once: true },
          defaults: { duration: 0.85, ease: "power4.out" },
        })
        .fromTo(
          ".cut-top",
          { xPercent: -16, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1 },
          0
        )
        .fromTo(
          ".cut-bottom",
          { xPercent: 16, autoAlpha: 0 },
          { xPercent: 0, autoAlpha: 1 },
          0.05
        );

      gsap.fromTo(
        ".cap-row",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cap-grid", start: "top 82%", once: true },
        }
      );
    },
    { scope: root, dependencies: [line2] }
  );

  const titleContent = (
    <>
      <span className="block">{line1}</span>
      <span className="block">{line2}</span>
    </>
  );

  return (
    <section
      ref={root}
      id="stack"
      className="bg-paper py-28 text-ink md:py-36 deck:flex deck:h-full deck:flex-col deck:justify-center deck:py-0"
    >
      <div className="frame">
        {/* typographic cut title: two clipped halves assemble */}
        <h2 className="display relative text-[clamp(2.6rem,7.5vw,6.5rem)] deck:text-[clamp(2.2rem,4.5vw,4rem)]">
          <span className="invisible" aria-hidden="true">
            {titleContent}
          </span>
          <span className="sr-only">
            Stack / {t({ es: "Capacidades", en: "Capabilities" })}
          </span>
          <span
            aria-hidden="true"
            className="cut-top absolute inset-0"
            style={{ clipPath: "inset(-0.2em 0 50% 0)" }}
          >
            {titleContent}
          </span>
          <span
            aria-hidden="true"
            className="cut-bottom absolute inset-0"
            style={{ clipPath: "inset(50% 0 -0.2em 0)" }}
          >
            {titleContent}
          </span>
        </h2>

        <Reveal type="line" className="rule mt-10 deck:mt-5" />

        <ul className="cap-grid mt-0 grid grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((cap, i) => (
            <li
              key={cap.name}
              className={`cap-row group border-b border-ink/15 px-1 py-10 md:px-6 deck:py-6 ${
                i % 2 === 0 ? "" : "border-l"
              } ${i >= 2 ? "lg:border-l" : ""} ${
                i % 4 === 0 ? "lg:border-l-0" : "lg:border-l"
              }`}
            >
              <span className="u-num text-[0.6875rem] text-ink/45">{cap.num}</span>
              <div className="mt-6 h-12 w-12 transition-transform duration-500 group-hover:rotate-[90deg]">
                <GeometricSymbol id={cap.symbol} className="h-full w-full text-ink" />
              </div>
              <p className="u-label mt-6">{cap.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
