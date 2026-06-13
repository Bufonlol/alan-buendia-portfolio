"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setGone(true);
      doneRef.current();
      return;
    }

    let killed = false;
    const counter = { v: 0 };

    const run = async () => {
      // Don't let SplitText-based entrances measure with fallback fonts
      try {
        await document.fonts.ready;
      } catch {
        /* older browsers — just continue */
      }
      if (killed) return;

      gsap
        .timeline()
        .to(counter, {
          v: 100,
          duration: 1.3,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(counter.v);
            if (counterRef.current)
              counterRef.current.textContent = String(v).padStart(3, "0");
            if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
          },
        })
        .add(() => doneRef.current(), "+=0.05")
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => setGone(true),
        });
    };

    void run();
    return () => {
      killed = true;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-6 py-6 text-paper"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <span className="u-label text-paper/60">{SITE.fullName}</span>
        <span className="u-label text-paper/60">
          {t({ es: "Portafolio © 2026", en: "Portfolio © 2026" })}
        </span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-[18rem]">
          <p className="font-serif italic text-xl leading-snug text-paper/80">
            {t(SITE.tagline)}
          </p>
          <div className="mt-6 h-px w-full origin-left bg-paper/20">
            <div
              ref={barRef}
              className="h-px origin-left scale-x-0 bg-accent"
            />
          </div>
        </div>
        <span
          ref={counterRef}
          className="display text-[clamp(5rem,16vw,12rem)] leading-none tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
