"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { windowPop } from "@/lib/archiveMotion";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { TechnicalGrid, Barcode } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";
import { NamePlate } from "@/components/home/hero/NamePlate";
import { InfoPanel } from "@/components/home/hero/InfoPanel";
import { TechTags } from "@/components/home/hero/TechTags";
import { TechStrip } from "@/components/home/hero/TechStrip";
import { TextureLayer } from "@/components/home/hero/TextureLayer";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mass = gsap.utils.toArray<HTMLElement>(".chaos-piece-mass", section);
      const word = gsap.utils.toArray<HTMLElement>(".chaos-piece-word", section);
      const windows = gsap.utils.toArray<HTMLElement>(".hero-bento-cell", section);

      if (prefersReducedMotion()) {
        gsap.set([...mass, ...word, ...windows], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scaleX: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        mass,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: "power2.inOut", transformOrigin: "left center" },
        0
      );
      tl.fromTo(
        word,
        { clipPath: "inset(0% 0% 100% 0%)", y: 24 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.7, stagger: 0.12 },
        0.15
      );
      // Each window pops in with a springy overshoot, then rattles once —
      // like a cascade of system-error dialogs firing off in sequence.
      windowPop(tl, windows, { position: 0.4, stagger: 0.13, shake: 7 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-poster relative mt-10 overflow-hidden border-b border-ink bg-paper md:mt-11"
    >
      <TechnicalGrid className="opacity-25" />
      <TextureLayer />
      <TechStrip />

      <div className="relative z-10 flex flex-col">
        <div className="flex flex-col px-4 pt-3 md:px-8 md:pt-4">
          <NamePlate />
        </div>

        {/* Bento row — five real facts, each its own beveled system-dialog
            window (title bar + body), scattered a few degrees off-grid like
            too many error boxes open on a desktop at once. */}
        <div className="hero-bento">
          <div className="hero-bento-cell hero-bento-cell--quote">
            <WinTitleBar label="QUOTE.TXT" />
            <div className="win-body">
              <p className="hero-bento-quote">&ldquo;{t(SITE.tagline)}&rdquo;</p>
              <Barcode className="hero-bento-barcode" />
            </div>
          </div>

          <div className="hero-bento-cell hero-bento-cell--desc">
            <WinTitleBar label="ABOUT.EXE" />
            <div className="win-body">
              <p className="u-label">FRONTEND ENGINEER</p>
              <p className="hero-bento-desc-text">
                {t({
                  es: "Construyendo interfaces rápidas, accesibles y encantadoramente extrañas.",
                  en: "Building fast, accessible and delightfully weird interfaces.",
                })}
              </p>
              <p className="hero-bento-meta">{SITE.location}</p>
            </div>
          </div>

          <div className="hero-bento-cell hero-bento-cell--tags">
            <WinTitleBar label="STACK.EXE" />
            <div className="win-body">
              <p className="u-label">STACK</p>
              <TechTags className="mt-2" />
            </div>
          </div>

          <div className="hero-bento-cell hero-bento-cell--stamp">
            <WinTitleBar label="CONTACT.EXE" />
            <a
              href={`mailto:${SITE.email}`}
              className="win-body hero-stamp"
              aria-label={`Email ${SITE.name}`}
            >
              <span
                aria-hidden="true"
                className="tape-strip"
                style={{ top: "0.3rem", left: "50%", transform: "translateX(-50%) rotate(-3deg)" }}
              />
              <span className="hero-stamp-ring">
                <span className="hero-stamp-status">{t(SITE.availability)}</span>
              </span>
              <span className="hero-stamp-email">{SITE.email}</span>
              <span className="hero-stamp-location">{SITE.locationShort}</span>
            </a>
          </div>

          <div className="hero-bento-cell hero-bento-cell--panel">
            <WinTitleBar label="STATUS.EXE" />
            <div className="win-body">
              <InfoPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
