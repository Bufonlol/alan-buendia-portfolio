"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { ABOUT, SITE, STACK } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import {
  Barcode,
  CrossMark,
  PulseDot,
  SignalBars,
  SystemLabel,
  TechnicalGrid,
} from "@/components/system/TechnicalLayer";
import { RegistrationMark } from "@/components/art/EditorialArt";
import { ChaosFrame } from "@/components/modular/ChaosFrame";
import { ModularCanvas } from "@/components/modular/ModularCanvas";
import { TechnicalLine } from "@/components/modular/TechnicalLine";
import { VerticalText } from "@/components/modular/VerticalText";

const TOOL_NAMES = ["GSAP", "Three.js", "Next.js", "TypeScript"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { navigate } = useApp();
  const { t } = useLang();
  const project = PROJECTS[0];
  const tools = TOOL_NAMES.map((name) => STACK.find((tool) => tool.name === name)).filter(Boolean);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const pieces = gsap.utils.toArray<HTMLElement>(".chaos-piece", section);

      if (prefersReducedMotion()) {
        gsap.set(pieces, { autoAlpha: 1, x: 0, y: 0, clipPath: "inset(0%)" });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          pieces,
          {
            autoAlpha: 0,
            x: (index) => (index % 3 === 0 ? -18 : index % 3 === 1 ? 18 : 0),
            y: (index) => (index % 2 === 0 ? 14 : -10),
            clipPath: (index) =>
              index % 2 === 0 ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.78,
            stagger: 0.055,
          },
          0.08
        );

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden border-b border-ink pt-20 md:pt-24">
      <TechnicalGrid className="opacity-25" />

      <div className="relative z-10 grid grid-cols-2 border-b border-ink px-3 py-3 md:grid-cols-4 md:px-4">
        <SystemLabel className="chaos-piece">/ALANBUENDIA.DEV</SystemLabel>
        <SystemLabel className="chaos-piece hidden md:block">ARCHIVE / 2026 / V3.1</SystemLabel>
        <SystemLabel className="chaos-piece hidden md:block">REACT · TS · GSAP · THREE.JS</SystemLabel>
        <SystemLabel className="chaos-piece text-right">{SITE.locationShort} · UTC−6</SystemLabel>
      </div>

      <ModularCanvas className="relative z-10 p-3 md:p-4">
        <ChaosFrame className="chaos-piece hero-title-frame p-4 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <SystemLabel>SYS–00 / FRONTEND ENGINEER</SystemLabel>
            <RegistrationMark size={22} className="opacity-50" />
          </div>
          <h1 className="mt-10" aria-label={`${SITE.name}, ${t(SITE.role)}`}>
            <span className="display block text-[clamp(4rem,10.5vw,9.5rem)] leading-[0.76]">ALAN</span>
            <span className="display -ml-[0.04em] block text-[clamp(4rem,10.5vw,9.5rem)] leading-[0.76]">BUENDÍA</span>
          </h1>
          <div className="mt-8 grid max-w-[42rem] grid-cols-[1fr_auto] items-end gap-4">
            <p className="max-w-[30rem] text-base font-semibold leading-snug">
              {t({
                es: "Construyo interfaces digitales precisas, rápidas y deliberadamente vivas.",
                en: "I build precise, fast, and deliberately alive digital interfaces.",
              })}
            </p>
            <Barcode className="opacity-75" />
          </div>
          <CrossMark className="absolute bottom-4 right-4 opacity-50" />
        </ChaosFrame>

        <ChaosFrame className="chaos-piece hero-index flex items-center justify-between p-3" tone="ink">
          <span className="display text-[clamp(3.5rem,7vw,6rem)] leading-none">001</span>
          <VerticalText className="opacity-75">INDEX / PORTFOLIO</VerticalText>
        </ChaosFrame>

        <ChaosFrame className="chaos-piece hero-status flex flex-col justify-between p-4">
          <span className="flex items-center gap-2">
            <PulseDot />
            <SystemLabel>AVAILABLE / 2026</SystemLabel>
          </span>
          <p className="display text-3xl leading-none">{SITE.locationShort}</p>
          <SystemLabel className="opacity-65">{SITE.coords} / 1,230 M</SystemLabel>
        </ChaosFrame>

        <ChaosFrame className="chaos-piece hero-asset flex flex-col" tone="ink">
          <div className="flex items-center justify-between border-b border-paper/50 p-4">
            <SystemLabel>TYPE OBJECT / AB–01</SystemLabel>
            <RegistrationMark size={24} color="currentColor" />
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-2">
            <span className="display flex items-center justify-center bg-paper text-[clamp(7rem,13vw,13rem)] leading-none text-ink">
              A
            </span>
            <span className="display flex items-center justify-center border-l border-paper text-[clamp(7rem,13vw,13rem)] leading-none">
              B
            </span>
          </div>
          <div className="flex items-end justify-between border-t border-paper/50 p-4">
            <SystemLabel>DISPLAY / 900</SystemLabel>
            <SystemLabel>FORM / COUNTERFORM</SystemLabel>
          </div>
        </ChaosFrame>

        <button
          onClick={() => navigate(`/projects/${project.slug}`)}
          className="chaos-piece hero-project group border border-ink bg-ink p-4 text-left text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <div className="flex items-center justify-between">
            <SystemLabel>SELECTED / 01</SystemLabel>
            <span aria-hidden="true">↗</span>
          </div>
          <p className="display mt-8 text-[clamp(2rem,4vw,4.2rem)] leading-[0.88]">{t(project.title)}</p>
          <SystemLabel className="mt-5 block opacity-70">{project.year} / CASE STUDY</SystemLabel>
        </button>

        <ChaosFrame className="chaos-piece hero-tools p-4">
          <div className="flex items-center justify-between border-b border-ink pb-3">
            <SystemLabel>/TOOLS</SystemLabel>
            <SignalBars />
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
            {tools.map((tool, index) => (
              <li key={tool?.name} className="border-b border-ink/30 pb-2">
                <SystemLabel className="opacity-50">0{index + 1}</SystemLabel>
                <p className="display mt-1 text-[clamp(1.25rem,2.2vw,2.2rem)]">{tool?.name}</p>
              </li>
            ))}
          </ul>
        </ChaosFrame>

        <button
          onClick={() => navigate("/#about")}
          className="chaos-piece hero-about flex min-h-24 items-center justify-between border border-ink bg-paper px-4 py-3 text-left transition-colors hover:bg-ink hover:text-paper"
        >
          <div>
            <SystemLabel>/PROFILE</SystemLabel>
            <p className="mt-2 max-w-[28ch] text-sm font-semibold leading-snug">
              {t(ABOUT.paragraph).split(".").slice(0, 1).join(".")}.
            </p>
          </div>
          <span className="display text-4xl">↗</span>
        </button>

        <ChaosFrame className="chaos-piece hero-micro flex items-center justify-between gap-3 p-3">
          <SystemLabel>FRAME / A–01</SystemLabel>
          <TechnicalLine className="max-w-28 opacity-40" />
          <SystemLabel>BUILD / 07.26</SystemLabel>
        </ChaosFrame>

        <button
          onClick={() => navigate("/#contact")}
          className="chaos-piece hero-contact flex items-center justify-between gap-3 border border-ink bg-ink px-4 py-3 text-left text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <span>
            <SystemLabel>OPEN FOR SELECTED WORK</SystemLabel>
            <span className="display mt-2 block text-2xl">LET’S TALK</span>
          </span>
          <span className="text-2xl" aria-hidden="true">↗</span>
        </button>

        <div className="chaos-piece hero-vertical flex items-center justify-center border border-ink bg-paper py-3">
          <VerticalText>CHAOS / ORDER / SYSTEM / 2026</VerticalText>
        </div>
      </ModularCanvas>

      <div className="relative z-10 grid grid-cols-2 items-center border-t border-ink px-3 py-3 md:grid-cols-4 md:px-4">
        <span className="flex items-center gap-2">
          <PulseDot />
          <SystemLabel>{t({ es: "SISTEMA LISTO", en: "SYSTEM READY" })}</SystemLabel>
        </span>
        <SystemLabel className="hidden opacity-60 md:block">VER 3.1</SystemLabel>
        <SystemLabel className="hidden opacity-60 md:block">NO TEMPLATES / NO NOISE WITHOUT PURPOSE</SystemLabel>
        <span className="flex items-center justify-end gap-2">
          <SignalBars />
          <SystemLabel className="opacity-60">SCROLL ↓</SystemLabel>
        </span>
      </div>
    </section>
  );
}
