"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { assemble, stampLabel } from "@/lib/archiveMotion";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { TechnicalGrid, Barcode } from "@/components/system/TechnicalLayer";
import { NamePlate } from "@/components/home/hero/NamePlate";
import { InfoPanel } from "@/components/home/hero/InfoPanel";
import { TechTags } from "@/components/home/hero/TechTags";
import { TechStrip } from "@/components/home/hero/TechStrip";
import { TextureLayer } from "@/components/home/hero/TextureLayer";

/** The Windows-error-dialog title bar reused on every bento cell: a real
    filename-style label for that cell's content, plus the three stock
    window-control glyphs. */
function WinTitleBar({ label }: { label: string }) {
  return (
    <span className="win-titlebar" aria-hidden="true">
      <span>{label}</span>
      <span className="win-titlebar-controls">
        <span className="win-titlebar-btn">-</span>
        <span className="win-titlebar-btn">□</span>
        <span className="win-titlebar-btn">x</span>
      </span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mass = gsap.utils.toArray<HTMLElement>(".chaos-piece-mass", section);
      const word = gsap.utils.toArray<HTMLElement>(".chaos-piece-word", section);
      const panel = gsap.utils.toArray<HTMLElement>(".chaos-piece-panel", section);
      const desc = gsap.utils.toArray<HTMLElement>(".chaos-piece-desc", section);

      if (prefersReducedMotion()) {
        gsap.set([...mass, ...word, ...panel, ...desc], {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scaleX: 1,
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
      assemble(tl, panel, { position: 0.4, stagger: 0.04, duration: 0.5 });
      stampLabel(tl, desc, { position: 0.55, stagger: 0.05 });
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
          <div className="hero-bento-cell hero-bento-cell--quote chaos-piece-panel">
            <WinTitleBar label="QUOTE.TXT" />
            <div className="win-body">
              <p className="hero-bento-quote">&ldquo;{t(SITE.tagline)}&rdquo;</p>
              <Barcode className="hero-bento-barcode" />
            </div>
          </div>

          <div className="hero-bento-cell hero-bento-cell--desc chaos-piece-desc">
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

          <div className="hero-bento-cell hero-bento-cell--tags chaos-piece-desc">
            <WinTitleBar label="STACK.EXE" />
            <div className="win-body">
              <p className="u-label">STACK</p>
              <TechTags className="mt-2" />
            </div>
          </div>

          <div className="hero-bento-cell hero-bento-cell--stamp chaos-piece-panel">
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

          <div className="hero-bento-cell hero-bento-cell--panel chaos-piece-panel">
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
