"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { ABOUT, FUN, SITE } from "@/data/site";
import { VerticalText } from "@/components/modular/VerticalText";
import { Barcode, CrossMark, PulseDot, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";

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
        <div className="field-piece field-title win-window win-window--ink">
          <WinTitleBar label="PROFILE.SYS" />
          <div className="win-body">
            <h2 className="display text-[clamp(3.7rem,8vw,7.5rem)] leading-[0.78]">
              {t({ es: "Soy Alan.", en: "I'm Alan." })}
              <br />
              Frontend engineer.
              <br />
              Orizaba, MX.
            </h2>
          </div>
        </div>

        <div className="field-piece field-asset win-window win-window--ink">
          <WinTitleBar label="SUBJECT.DAT" />
          <div className="win-body relative flex flex-1 flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between">
              <SystemLabel className="border border-ink bg-paper px-2 py-1">SUBJECT / ACTIVE</SystemLabel>
              <CrossMark className="opacity-50" />
            </div>
            <span className="text-outline display self-center text-[clamp(6rem,14vw,11rem)] leading-none">AB</span>
            <CrossMark className="self-end opacity-50" />
          </div>
        </div>

        <div className="field-piece field-status win-window win-window--ink bg-ink text-paper">
          <WinTitleBar label="ONLINE.SYS" />
          <div className="win-body flex flex-col justify-between">
            <span className="flex items-center gap-2"><PulseDot /><SystemLabel>ONLINE</SystemLabel></span>
            <span className="display text-[clamp(4rem,7vw,6rem)]">001</span>
            <Barcode className="text-paper" />
          </div>
        </div>

        <div className="field-piece field-copy win-window win-window--ink">
          <WinTitleBar label="STATEMENT.TXT" />
          <div className="win-body">
            <SystemLabel>PERSONAL STATEMENT / ES-MX</SystemLabel>
            <p className="mt-6 max-w-[54ch] text-[clamp(1.2rem,2.2vw,2rem)] font-bold leading-[1.22]">
              {t(ABOUT.paragraph).split(".").slice(0, 2).join(".")}.
            </p>
          </div>
        </div>

        <div className="field-piece field-meta win-window win-window--ink">
          <WinTitleBar label="META.DAT" />
          <dl className="win-body grid grid-cols-2">
            {metadata.map(([key, value]) => (
              <div key={key} className="border-b border-r border-ink p-3 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
                <dt className="u-label opacity-85">{key}</dt>
                <dd className="u-label mt-3 leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="field-piece field-vertical flex items-center justify-center border border-ink">
          <VerticalText>ENGINEERING / MOTION / DISCIPLINE / FIELD NOTE</VerticalText>
        </div>
      </div>
    </section>
  );
}
