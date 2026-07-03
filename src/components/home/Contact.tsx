"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import Signature from "@/components/art/Signature";
import {
  Barcode,
  CrossMark,
  SignalBars,
  SystemLabel,
  TechnicalGrid,
} from "@/components/system/TechnicalLayer";

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const q = gsap.utils.selector(section);

      if (prefersReducedMotion()) {
        gsap.set(q(".contact-word, .contact-meta"), { autoAlpha: 1, yPercent: 0 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: section, start: "top 62%", once: true },
        })
        .set(q(".contact-word"), { autoAlpha: 1 })
        .fromTo(
          q(".contact-word"),
          { yPercent: 110, skewY: 2 },
          {
            yPercent: 0,
            skewY: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
          }
        )
        .fromTo(
          q(".contact-meta"),
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.48"
        );
    },
    { scope: sectionRef }
  );

  useEffect(
    () => () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    },
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[74dvh] flex-col overflow-hidden bg-ink p-3 text-paper md:p-4"
    >
      <TechnicalGrid className="opacity-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-paper/35 md:inset-4"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[8%] hidden h-[360px] w-[360px] opacity-[0.14] mix-blend-screen md:block lg:h-[480px] lg:w-[480px]"
        style={{
          maskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 25%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 25%, transparent 70%)",
        }}
      >
        <Image src="/assets/contact-tower.png" alt="" fill sizes="480px" className="object-contain" />
      </div>

      <div className="contact-meta relative z-10 grid grid-cols-2 border-b border-paper/35 px-3 py-3 md:grid-cols-4 md:px-4">
        <SystemLabel>DIRECT TRANSMISSION</SystemLabel>
        <SystemLabel className="hidden md:block">CHANNEL / OPEN</SystemLabel>
        <SystemLabel className="hidden md:block">{SITE.locationShort}</SystemLabel>
        <SystemLabel className="text-right">STATUS / AVAILABLE</SystemLabel>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-3 py-10 md:px-4 md:py-14">
        <div className="contact-meta mb-6 flex items-center gap-3">
          <CrossMark />
          <SystemLabel>{t({ es: "INICIAR TRANSMISIÓN", en: "START TRANSMISSION" })}</SystemLabel>
          <span className="h-px flex-1 bg-paper/35" />
        </div>

        <h2 aria-label={t({ es: "Construyamos", en: "Let's build" })}>
          <span className="block overflow-hidden pb-[0.06em]">
            <span
              aria-hidden="true"
              className="contact-word display block text-[clamp(2.5rem,8vw,6rem)] leading-[0.86]"
              style={{ opacity: 0 }}
            >
              {t({ es: "CONSTRUYAMOS", en: "LET'S BUILD" })}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span
              aria-hidden="true"
              className="contact-word display block text-right text-[clamp(3rem,8vw,6rem)] leading-[0.86]"
              style={{ opacity: 0 }}
            >
              {t({ es: "ALGO REAL", en: "SOMETHING REAL" })}
            </span>
          </span>
        </h2>

        <div className="contact-meta mt-8 grid gap-4 border-t border-paper/35 pt-5 lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
          <div>
            <SystemLabel className="block text-paper/65">DIRECT LINE</SystemLabel>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 block break-all text-[clamp(1.15rem,2.6vw,2rem)] font-bold underline decoration-1 underline-offset-4"
            >
              {SITE.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={copyEmail}
              className="u-label min-h-12 border border-paper bg-paper px-5 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {copied
                ? t({ es: "COPIADO ✓", en: "COPIED ✓" })
                : t({ es: "COPIAR CORREO", en: "COPY EMAIL" })}
            </button>
            <a
              href={`mailto:${SITE.email}`}
              className="u-label flex min-h-12 items-center border border-paper px-5 transition-colors hover:bg-paper hover:text-ink"
            >
              {t({ es: "ENVIAR MENSAJE ↗", en: "SEND MESSAGE ↗" })}
            </a>
          </div>
          <div className="hidden border border-paper/40 p-4 lg:block">
            <div className="flex items-center gap-2">
              <SignalBars className="text-paper" />
              <SystemLabel className="text-paper/70">CHANNEL / OPEN</SystemLabel>
            </div>
            <p className="u-label mt-2 text-paper/60">{SITE.locationShort} · UTC−6</p>
          </div>
          <div className="hidden border border-paper/40 p-3 lg:flex lg:flex-col lg:items-center lg:gap-2">
            <Image
              src="/qr-alanbuendia.svg"
              alt={t({ es: "Código QR de alanbuendia.dev", en: "alanbuendia.dev QR code" })}
              width={64}
              height={64}
              className="invert"
            />
            <SystemLabel className="text-paper/60">SCAN</SystemLabel>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied ? t({ es: "Correo copiado", en: "Email copied" }) : ""}
          </p>
        </div>
      </div>

      <footer className="contact-meta relative z-10 grid gap-5 border-t border-paper/35 px-3 py-4 md:grid-cols-[1fr_auto_1fr] md:items-end md:px-4">
        <div>
          <Signature className="text-paper" size="text-2xl" shadowColor="var(--color-accent)" />
          <p className="u-label mt-2 text-paper/65">© 2026 {SITE.fullName}</p>
        </div>
        <Barcode className="hidden text-paper md:block" />
        <div className="u-label flex flex-wrap gap-5 md:justify-end">
          <a href={SITE.cvUrl} target="_blank" rel="noreferrer" className="link-line">CV ↗</a>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="link-line">GITHUB ↗</a>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="link-line"
          >
            {t({ es: "ARRIBA ↑", en: "BACK TO TOP ↑" })}
          </button>
        </div>
      </footer>
    </section>
  );
}
