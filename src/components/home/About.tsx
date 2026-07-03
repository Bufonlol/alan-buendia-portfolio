"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { ABOUT, FUN, SITE } from "@/data/site";
import {
  Barcode,
  CrossMark,
  SystemLabel,
  TechnicalGrid,
} from "@/components/system/TechnicalLayer";
import Signature from "@/components/art/Signature";

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;
      const q = gsap.utils.selector(sectionRef);
      gsap.fromTo(
        q(".profile-reveal"),
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.82,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="home-bento-section"
    >
      <TechnicalGrid className="opacity-25" />
      <div className="relative z-10">
        <div className="grid gap-8 border border-ink p-5 md:grid-cols-[1fr_auto] md:items-end md:p-7">
          <div>
            <SystemLabel>PERSONAL FILE</SystemLabel>
            <h2 className="display mt-5 text-[clamp(3.2rem,7vw,6rem)]">
              {t({ es: "Field note", en: "Field note" })}
            </h2>
          </div>
          <div className="flex items-end gap-5">
            <Barcode className="hidden md:block" />
            <SystemLabel>PROFILE / ACTIVE</SystemLabel>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:mt-4 md:gap-4 lg:auto-rows-[minmax(150px,auto)] lg:grid-cols-3 lg:[grid-auto-flow:dense]">
          <div className="profile-reveal bento-reactive border border-ink p-5 md:p-8 lg:col-span-2 lg:row-span-2">
            <div className="flex items-start justify-between gap-4">
              <p className="u-label">SUBJECT / {SITE.fullName}</p>
              <Signature className="hidden text-lg opacity-70 md:block" size="text-lg" />
            </div>
            <p className="mt-8 max-w-[52rem] text-[clamp(1.45rem,3vw,2.7rem)] font-bold leading-[1.22] tracking-[-0.035em]">
              {t(ABOUT.paragraph)}
            </p>
            <p className="u-label mt-8 max-w-[40ch] -rotate-1 border border-ink/40 px-3 py-2 text-ink/70">
              MARGIN NOTE — {t({ es: "cuando no hay código, hay tatami:", en: "when there's no code, there's a mat:" })}{" "}
              {FUN.martialArts.join(" / ")}
            </p>
          </div>

          <div className="profile-reveal bento-reactive border border-ink">
            <div className="flex items-center justify-between border-b border-ink p-5">
              <SystemLabel>IDENTIFICATION</SystemLabel>
              <CrossMark />
            </div>
            <dl>
              <div className="grid grid-cols-[7rem_1fr] border-b border-ink p-5">
                <dt className="u-label opacity-60">ROLE</dt>
                <dd className="u-label text-right">FRONTEND ENGINEER</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] border-b border-ink p-5">
                <dt className="u-label opacity-60">BASE</dt>
                <dd className="u-label text-right">{SITE.locationShort}</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] p-5">
                <dt className="u-label opacity-60">STATUS</dt>
                <dd className="u-label text-right">{t(SITE.availability)}</dd>
              </div>
            </dl>
          </div>

          <div className="profile-reveal bento-reactive relative overflow-hidden border border-ink p-5">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply">
              <Image src="/assets/about-hands.png" alt="" fill sizes="360px" className="object-cover object-[center_65%]" />
            </div>
            <div className="relative z-10 grid h-full content-between gap-2">
              {ABOUT.facts.map((fact, index) => (
                <p key={fact.en} className="u-label border border-ink bg-paper px-3 py-3">
                  {String(index + 1).padStart(2, "0")} / {t(fact)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
