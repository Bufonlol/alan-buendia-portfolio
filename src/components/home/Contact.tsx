"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import Signature from "@/components/art/Signature";
import { VerticalText } from "@/components/modular/VerticalText";
import { Barcode, PulseDot, SignalBars, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const pieces = gsap.utils.toArray<HTMLElement>(".transmission-piece", section);
      if (prefersReducedMotion()) {
        gsap.set(pieces, { x: 0, y: 0, clipPath: "inset(0%)" });
        return;
      }
      gsap.fromTo(
        pieces,
        {
          x: (index) => (index % 2 ? 20 : -20),
          y: (index) => (index % 3 ? 10 : 24),
          clipPath: (index) => (index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)"),
        },
        {
          x: 0,
          y: 0,
          clipPath: "inset(0%)",
          duration: 0.78,
          stagger: 0.065,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        }
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
    let didCopy = false;
    try {
      await navigator.clipboard.writeText(SITE.email);
      didCopy = true;
    } catch {
      const input = document.createElement("textarea");
      input.value = SITE.email;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      didCopy = document.execCommand("copy");
      input.remove();
    }

    if (didCopy) {
      setCopied(true);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } else {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-ink p-3 text-paper md:p-4">
      <TechnicalGrid className="opacity-20" />

      <div className="transmission-grid relative z-10">
        <div className="transmission-piece transmission-title flex flex-col justify-center border border-paper p-4 md:p-5">
          <h2 className="display text-[clamp(2rem,5.5vw,4.2rem)] leading-[0.86]">
            {t({ es: "Construyamos algo real", en: "Let's build something real" })}
          </h2>
        </div>

        <div className="transmission-piece transmission-asset relative flex min-h-80 flex-col justify-between overflow-hidden border border-paper bg-paper p-4 text-ink">
          <TechnicalGrid className="opacity-40" />
          <SystemLabel className="relative border border-ink bg-paper px-2 py-1 self-start">SIGNAL / SOURCE</SystemLabel>
          <div className="relative flex flex-1 items-center justify-center">
            <div className="signal-rings">
              <span className="signal-ring signal-ring--1" />
              <span className="signal-ring signal-ring--2" />
              <span className="signal-ring signal-ring--3" />
              <PulseDot className="signal-rings-core" />
            </div>
          </div>
          <div className="relative flex items-end justify-between bg-paper">
            <SystemLabel>{SITE.coords}</SystemLabel>
            <SignalBars className="text-ink" />
          </div>
        </div>

        {/* One contact block instead of three separate CTAs (the email
            link, a "copy email" button, and a duplicate "send signal"
            mailto) all doing the same job. The email itself is the primary
            action; copy is a small secondary affordance beside it. */}
        <div className="transmission-piece transmission-contact flex flex-col justify-center gap-3 border border-paper p-4">
          <SystemLabel className="opacity-85">DIRECT LINE</SystemLabel>
          <div className="flex items-end justify-between gap-4">
            <a
              href={`mailto:${SITE.email}`}
              className="block min-w-0 break-all text-[clamp(1rem,2.2vw,1.7rem)] font-bold underline decoration-1 underline-offset-4"
            >
              {SITE.email}
            </a>
            <button
              onClick={copyEmail}
              aria-label={t({ es: "Copiar correo", en: "Copy email" })}
              className="flex shrink-0 items-center gap-2 border border-paper px-3 py-2 transition-colors hover:bg-paper hover:text-ink"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span className="u-label">
                {copied ? t({ es: "COPIADO", en: "COPIED" }) : t({ es: "COPIAR", en: "COPY" })}
              </span>
            </button>
          </div>
        </div>

        {/* Real reachability facts consolidated into one cell instead of
            spread across three ("CHANNEL/OPEN", "STATUS/LIVE", and a
            separate meta row) that were all saying some version of
            "available now". */}
        <div className="transmission-piece transmission-status flex flex-col flex-wrap items-start justify-center gap-2 border border-paper p-3 md:flex-row md:items-center md:justify-between md:gap-6 md:p-3">
          <span className="flex items-center gap-2">
            <PulseDot />
            <SystemLabel>{t({ es: "DISPONIBLE PARA TRABAJAR", en: "AVAILABLE FOR WORK" })}</SystemLabel>
          </span>
          <span className="u-label opacity-85">{SITE.locationShort} / UTC−6</span>
          <span className="u-label opacity-85">{t({ es: "RESPUESTA / 24–48H", en: "RESPONSE / 24–48H" })}</span>
        </div>

        <div className="transmission-piece transmission-qr flex flex-col items-center justify-center gap-2 border border-paper bg-paper p-2 text-ink">
          <Image
            src="/qr-alanbuendia.svg"
            alt={t({ es: "Código QR de alanbuendia.dev", en: "alanbuendia.dev QR code" })}
            width={64}
            height={64}
          />
          <SystemLabel>SCAN / OPEN</SystemLabel>
        </div>

        <div className="transmission-piece transmission-vertical flex items-center justify-center border border-paper">
          <VerticalText>DIRECT LINE / OPEN CHANNEL</VerticalText>
        </div>
      </div>

      <footer className="relative z-10 mt-2 grid gap-3 border border-paper px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
        <div>
          <Signature className="text-paper" size="text-2xl" shadowColor="var(--color-paper)" />
          <p className="u-label mt-2 opacity-85">© 2026 {SITE.fullName}</p>
        </div>
        <Barcode className="hidden text-paper md:block" />
        <div className="u-label flex flex-wrap gap-5 md:justify-end">
          <a href={SITE.cvUrl} target="_blank" rel="noreferrer" className="link-line">CV ↗</a>
          <a href={SITE.github} target="_blank" rel="noreferrer" className="link-line">GITHUB ↗</a>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? "auto" : "smooth",
              })
            }
            className="link-line min-h-11"
          >
            {t({ es: "ARRIBA ↑", en: "BACK TO TOP ↑" })}
          </button>
        </div>
      </footer>

      <p className="sr-only" aria-live="polite">
        {copied ? t({ es: "Correo copiado", en: "Email copied" }) : ""}
      </p>
    </section>
  );
}
