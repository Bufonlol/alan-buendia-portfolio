"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STACK } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";

export default function Stack() {
  const { t } = useLang();
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;
      const rows = gsap.utils.toArray<HTMLElement>(".stack-row", listRef.current);
      gsap.fromTo(
        rows,
        { yPercent: 60, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: listRef }
  );

  return (
    <section id="stack" className="relative overflow-hidden px-5 py-28 md:px-8 md:py-40">
      <div className="aurora" aria-hidden="true" />
      <SectionHeader
        index="02"
        label="Stack"
        title={t({ es: "Con esto construyo", en: "Tools I think in" })}
        sweep
      />
      <ul ref={listRef} className="mt-14 border-b border-line">
        {STACK.map((item, i) => (
          <li key={item.name} className="stack-row border-t border-line">
            <div className="flex items-baseline gap-5 px-2 py-4 md:gap-8 md:px-4 md:py-5">
              <span className="u-label w-8 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="stack-name display text-[clamp(1.9rem,5.5vw,4.4rem)] leading-none">
                {item.name}
              </span>
              <span className="stack-meta u-label ml-auto shrink-0 text-muted">
                {t(item.meta)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="u-label mt-6 text-muted">
        {t({
          es: "Sin barras de progreso — o lanzas con ello o no.",
          en: "No progress bars — you either ship with it or you don't.",
        })}
      </p>
    </section>
  );
}
