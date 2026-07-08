"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import Signature from "@/components/art/Signature";
import { AssetFrame } from "@/components/modular/AssetFrame";
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
        <div className="transmission-piece transmission-title border border-paper p-4 md:p-6">
          <h2 className="display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.78]">
            {t({ es: "Construyamos algo real", en: "Let's build something real" })}
          </h2>
        </div>

        <div className="transmission-piece transmission-asset relative min-h-80 overflow-hidden border border-paper bg-paper text-ink">
          <AssetFrame
            src="/assets/contact-tower.png"
            alt={t({ es: "Antena de transmisión técnica", en: "Technical transmission tower" })}
            className="scale-110"
            imageClassName="mix-blend-multiply"
            sizes="(max-width: 767px) 100vw, 42vw"
          />
          <SystemLabel className="absolute left-3 top-3 border border-ink bg-paper px-2 py-1">SIGNAL / TOWER–01</SystemLabel>
        </div>

        <div className="transmission-piece transmission-line border border-paper p-4 md:p-5">
          <SystemLabel className="opacity-85">DIRECT LINE</SystemLabel>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 block break-all text-[clamp(1.25rem,3vw,2.5rem)] font-bold underline decoration-1 underline-offset-4"
          >
            {SITE.email}
          </a>
        </div>

        <div className="transmission-piece transmission-channel flex flex-col justify-between border border-paper bg-paper p-4 text-ink">
          <SystemLabel>CHANNEL / OPEN</SystemLabel>
          <SignalBars className="text-ink" />
          <SystemLabel>{SITE.locationShort} / UTC−6</SystemLabel>
        </div>

        <div className="transmission-piece transmission-status flex flex-col justify-between border border-paper p-4">
          <span className="flex items-center gap-2"><PulseDot /><SystemLabel>AVAILABLE</SystemLabel></span>
          <span className="display text-[clamp(3rem,5vw,5rem)]">ON</span>
          <SystemLabel>STATUS / LIVE</SystemLabel>
        </div>

        <div className="transmission-piece transmission-qr flex flex-col items-center justify-between border border-paper bg-paper p-3 text-ink">
          <Image
            src="/qr-alanbuendia.svg"
            alt={t({ es: "Código QR de alanbuendia.dev", en: "alanbuendia.dev QR code" })}
            width={84}
            height={84}
          />
          <SystemLabel>SCAN / OPEN</SystemLabel>
        </div>

        <div className="transmission-piece transmission-actions grid grid-cols-2 border border-paper">
          <button
            onClick={copyEmail}
            className="u-label min-h-20 border-r border-paper px-4 text-left transition-colors hover:bg-paper hover:text-ink"
          >
            {copied ? t({ es: "CORREO COPIADO ✓", en: "EMAIL COPIED ✓" }) : t({ es: "COPIAR CORREO", en: "COPY EMAIL" })}
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="u-label flex min-h-20 items-center justify-between px-4 transition-colors hover:bg-paper hover:text-ink"
          >
            <span>{t({ es: "ENVIAR SEÑAL", en: "SEND SIGNAL" })}</span>
            <span>↗</span>
          </a>
        </div>

        <div className="transmission-piece transmission-meta grid grid-cols-3 border border-paper">
          {[
            ["RESPONSE", "24–48H"],
            ["MODE", "REMOTE"],
            ["BUILD", "2026"],
          ].map(([key, value]) => (
            <div key={key} className="border-r border-paper p-3 last:border-r-0">
              <SystemLabel className="opacity-85">{key}</SystemLabel>
              <p className="u-label mt-3">{value}</p>
            </div>
          ))}
        </div>

        <div className="transmission-piece transmission-vertical flex items-center justify-center border border-paper">
          <VerticalText>SEND SIGNAL / DIRECT LINE / OPEN CHANNEL</VerticalText>
        </div>
      </div>

      <footer className="relative z-10 mt-2 grid gap-5 border border-paper px-4 py-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
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
