"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STATS } from "@/data/site";

export default function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".stat-item", ref.current),
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-count]", ref.current).forEach((el) => {
        const to = parseFloat(el.dataset.count!);
        const suffix = el.dataset.suffix ?? "";
        if (isNaN(to)) return;
        const final = (Number.isInteger(to) ? String(to) : to.toFixed(1)) + suffix;
        if (prefersReducedMotion()) {
          el.textContent = final;
        } else {
          gsap.to(el, {
            scrambleText: {
              text: final,
              chars: "0123456789",
              revealDelay: 0.3,
              speed: 0.4,
            },
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }
      });
    },
    { scope: ref }
  );

  const parse = (v: string) => {
    const m = v.match(/^(\d+\.?\d*)(.*)$/);
    return m ? { num: m[1], suffix: m[2] } : { num: null, suffix: v };
  };

  return (
    <section className="relative overflow-hidden border-y border-line px-5 py-16 md:px-8 md:py-20">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div ref={ref} className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
        {STATS.map((s) => {
          const { num, suffix } = parse(s.value);
          return (
            <div key={s.label.en} className="stat-item">
              <p
                className="display text-[clamp(3rem,6.5vw,5.5rem)] leading-none text-accent"
                data-count={num ?? undefined}
                data-suffix={suffix}
                suppressHydrationWarning
              >
                {s.value}
              </p>
              <p className="u-label mt-3 text-muted">{t(s.label)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
