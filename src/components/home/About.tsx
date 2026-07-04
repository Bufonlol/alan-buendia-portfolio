"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { ABOUT, FUN, SITE } from "@/data/site";
import { AssetFrame } from "@/components/modular/AssetFrame";
import { VerticalText } from "@/components/modular/VerticalText";
import { Barcode, CrossMark, PulseDot, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const pieces = gsap.utils.toArray<HTMLElement>(".field-piece", section);
      if (prefersReducedMotion()) {
        gsap.set(pieces, { y: 0, clipPath: "inset(0%)" });
        return;
      }
      gsap.fromTo(
        pieces,
        { y: 20, clipPath: "inset(100% 0 0 0)" },
        {
          y: 0,
          clipPath: "inset(0%)",
          duration: 0.76,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  const metadata = [
    ["ROLE", "FRONTEND ENGINEER"],
    ["BASE", SITE.locationShort],
    ["STATUS", t(SITE.availability).toUpperCase()],
    ["OFFLINE", FUN.martialArts.join(" / ")],
    ["FOCUS", "MOTION / SYSTEMS"],
    ["TIME", "UTC−6"],
  ];

  return (
    <section ref={sectionRef} id="about" className="home-bento-section">
      <TechnicalGrid className="opacity-25" />

      <div className="field-note-grid relative z-10">
        <div className="field-piece field-title border border-ink p-4 md:p-6">
          <div className="flex items-center justify-between">
            <SystemLabel>FIELD NOTE / SUBJECT 001</SystemLabel>
            <CrossMark />
          </div>
          <h2 className="display mt-8 text-[clamp(3.7rem,8vw,7.5rem)] leading-[0.78]">
            {t({ es: "Soy Alan.", en: "I'm Alan." })}
            <br />
            Frontend engineer.
            <br />
            Orizaba, MX.
          </h2>
        </div>

        <div className="field-piece field-asset relative min-h-80 overflow-hidden border border-ink">
          <AssetFrame
            src="/assets/about-hands.png"
            alt={t({ es: "Manos trabajando frente a un teclado", en: "Hands working at a keyboard" })}
            imageClassName="object-cover object-center mix-blend-multiply"
            sizes="(max-width: 767px) 100vw, 42vw"
          />
          <SystemLabel className="absolute left-3 top-3 border border-ink bg-paper px-2 py-1">SUBJECT / ACTIVE</SystemLabel>
        </div>

        <div className="field-piece field-status flex flex-col justify-between border border-ink bg-ink p-4 text-paper">
          <span className="flex items-center gap-2"><PulseDot /><SystemLabel>ONLINE</SystemLabel></span>
          <span className="display text-[clamp(4rem,7vw,6rem)]">001</span>
          <Barcode className="text-paper" />
        </div>

        <div className="field-piece field-copy border border-ink p-5 md:p-6">
          <SystemLabel>PERSONAL STATEMENT / ES-MX</SystemLabel>
          <p className="mt-6 max-w-[54ch] text-[clamp(1.2rem,2.2vw,2rem)] font-bold leading-[1.22]">
            {t(ABOUT.paragraph).split(".").slice(0, 2).join(".")}.
          </p>
        </div>

        <dl className="field-piece field-meta grid grid-cols-2 border border-ink">
          {metadata.map(([key, value]) => (
            <div key={key} className="border-b border-r border-ink p-3 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
              <dt className="u-label opacity-50">{key}</dt>
              <dd className="u-label mt-3 leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="field-piece field-vertical flex items-center justify-center border border-ink">
          <VerticalText>ENGINEERING / MOTION / DISCIPLINE / FIELD NOTE</VerticalText>
        </div>
      </div>
    </section>
  );
}
