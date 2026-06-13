"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { TESTIMONIAL } from "@/data/site";

export default function Testimonial() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !quoteRef.current) return;
      const q = gsap.utils.selector(ref);

      if (prefersReducedMotion()) {
        gsap.fromTo(
          [quoteRef.current, ...q(".t-fade")],
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.08,
            scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
          }
        );
        return;
      }

      const split = new SplitText(quoteRef.current, { type: "lines", mask: "lines" });
      gsap
        .timeline({
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        })
        .set(quoteRef.current, { autoAlpha: 1 })
        .fromTo(
          split.lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.07, ease: "power4.out" }
        )
        .fromTo(
          q(".t-fade"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "power2.out" },
          "-=0.5"
        );
    },
    { dependencies: [lang], scope: ref }
  );

  return (
    <section
      ref={ref}
      className="border-y border-line bg-paper-soft px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <span className="t-fade u-label text-muted">
          {t({ es: "Lo que dicen", en: "What they say" })}
        </span>
        <p
          ref={quoteRef}
          className="display mt-8 text-[clamp(1.6rem,3.8vw,3rem)] leading-[1.2]"
          style={{ opacity: 0 }}
        >
          &ldquo;{t(TESTIMONIAL.quote)}&rdquo;
        </p>
        <div className="t-fade mt-8 flex items-center gap-4">
          <span
            className="inline-block h-px w-8 bg-accent"
            aria-hidden="true"
          />
          <div>
            <p className="u-label font-medium">{t(TESTIMONIAL.author)}</p>
            <p className="u-label text-muted">{t(TESTIMONIAL.project)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
