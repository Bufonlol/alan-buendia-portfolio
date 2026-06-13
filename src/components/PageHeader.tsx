"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang, type L } from "@/lib/i18n";

/**
 * Shared header for standalone pages (/archive, /arcade, …):
 * back link, kicker, giant SplitText title and an italic blurb.
 * Title must be ASCII — char masks clip diacritics.
 */
export default function PageHeader({
  kicker,
  title,
  blurb,
  accent = true,
}: {
  kicker: L;
  title: L;
  blurb?: L | React.ReactNode;
  accent?: boolean;
}) {
  const { ready, navigate } = useApp();
  const { lang, t } = useLang();
  const headRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blurbContent =
    blurb && typeof blurb === "object" && "es" in blurb && "en" in blurb
      ? t(blurb)
      : blurb;

  useGSAP(
    () => {
      if (!ready || !headRef.current) return;
      const q = gsap.utils.selector(headRef);

      if (prefersReducedMotion()) {
        gsap.fromTo(
          [titleRef.current, ...q(".ph-fade")],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8, stagger: 0.06, ease: "power2.out", delay: 0.3 }
        );
        return;
      }

      const split = new SplitText(titleRef.current, { type: "chars", mask: "chars" });
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .set(titleRef.current, { autoAlpha: 1 })
        .fromTo(
          split.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.04 },
          0.35
        )
        .fromTo(
          q(".ph-fade"),
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 },
          0.7
        );
    },
    { dependencies: [ready, lang], scope: headRef }
  );

  return (
    <header ref={headRef}>
      <div className="ph-fade flex items-center justify-between" style={{ opacity: 0 }}>
        <button onClick={() => navigate("/")} className="u-label link-line uppercase">
          {t({ es: "← Índice", en: "← Index" })}
        </button>
        <span className="u-label text-muted">{t(kicker)}</span>
      </div>
      <h1
        ref={titleRef}
        className="display mt-8 text-[clamp(3.4rem,14vw,13rem)] leading-[0.88]"
        style={{ opacity: 0 }}
      >
        {t(title)}
        {accent && <span className="text-accent">◆</span>}
      </h1>
      {blurbContent && (
        <p
          className="ph-fade mt-6 max-w-[36rem] font-serif text-xl italic text-ink-soft md:text-2xl"
          style={{ opacity: 0 }}
        >
          {blurbContent}
        </p>
      )}
    </header>
  );
}
