"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { ABOUT, SITE, STACK } from "@/data/site";
import { PROJECTS as PROJECT_LIST } from "@/data/projects";
import {
  Barcode,
  CrossMark,
  PulseDot,
  SignalBars,
  SystemLabel,
  TechnicalGrid,
} from "@/components/system/TechnicalLayer";
import { CropMarks, HalftoneBlob, RegistrationMark } from "@/components/art/EditorialArt";

const FEATURED_TOOLS = ["GSAP", "Three.js", "Next.js", "TypeScript"];

export default function Hero() {
  const { navigate } = useApp();
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  const featuredTools = FEATURED_TOOLS.map((name) => STACK.find((item) => item.name === name)).filter(
    (item): item is (typeof STACK)[number] => Boolean(item)
  );
  const previewProjects = PROJECT_LIST.slice(0, 5);
  const coverProject = PROJECT_LIST[0];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const q = gsap.utils.selector(section);

      if (prefersReducedMotion()) {
        gsap.set(q(".hero-word, .hero-meta"), { autoAlpha: 1, yPercent: 0, y: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .set(q(".hero-word"), { autoAlpha: 1 })
        .fromTo(
          q(".hero-word"),
          { yPercent: 112, rotateZ: 1.2 },
          { yPercent: 0, rotateZ: 0, duration: 1.05, stagger: 0.13 },
          0.08
        )
        .fromTo(
          q(".hero-meta"),
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.045 },
          0.4
        );

      gsap.to(q(".hero-noise-mark"), {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden border-b border-ink"
    >
      <TechnicalGrid className="opacity-25" />

      {/* ── top meta bar ─────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 border-b border-ink px-3 py-3 md:grid-cols-4 md:px-4">
        <SystemLabel className="hero-meta">/ALANBUENDIA.DEV</SystemLabel>
        <SystemLabel className="hero-meta hidden md:block">
          {t({ es: "PORTAFOLIO 2026 / V3.0", en: "PORTFOLIO 2026 / V3.0" })}
        </SystemLabel>
        <SystemLabel className="hero-meta hidden md:block">
          REACT · TS · GSAP · THREE.JS
        </SystemLabel>
        <SystemLabel className="hero-meta text-right">
          {SITE.locationShort} · UTC−6
        </SystemLabel>
      </div>

      {/* ── main row: index rail / headline / about mini / vertical strip ── */}
      <div className="relative z-10 grid border-b border-ink lg:grid-cols-[84px_1fr_300px_84px]">
        {/* index rail */}
        <div className="hero-meta flex flex-row justify-between border-b border-ink p-3 lg:flex-col lg:justify-between lg:border-b-0 lg:border-r">
          <div>
            <p className="display text-2xl leading-none">001</p>
            <SystemLabel className="mt-1 block opacity-60">/INDEX</SystemLabel>
          </div>
          <div className="hidden lg:block">
            <span className="flex items-center gap-2">
              <PulseDot className="text-ink" />
              <SystemLabel className="opacity-70">ONLINE</SystemLabel>
            </span>
            <SystemLabel className="mt-3 block max-w-[6ch] leading-relaxed opacity-60">
              {t({ es: "DISPONIBLE PARA TRABAJO", en: "AVAILABLE FOR WORK" })}
            </SystemLabel>
          </div>
          <div className="hidden lg:block">
            <SystemLabel className="block opacity-60">
              {t({ es: "SCROLL", en: "SCROLL" })}
            </SystemLabel>
            <span aria-hidden="true" className="mt-1 block text-lg leading-none">↓</span>
          </div>
        </div>

        {/* headline + halftone graphic + manifesto frame */}
        <div className="hero-cell relative min-h-[420px] overflow-hidden border-b border-ink p-4 md:min-h-[520px] md:p-6 lg:border-b-0 lg:border-r">
          <CrossMark className="hero-noise-mark absolute left-4 top-4 text-ink/50" />
          <RegistrationMark
            size={22}
            className="hero-noise-mark absolute right-4 top-4 text-ink/45"
          />

          <div className="hero-meta relative z-10 mb-4 flex items-center gap-3 border border-ink/70 px-3 py-2 md:mb-6 md:max-w-[280px]">
            <CropMarks size={10} opacity={0.55} />
            <SystemLabel className="leading-relaxed">
              {t({
                es: "CONSTRUYENDO INTERFACES QUE SE SIENTEN INEVITABLES.",
                en: "BUILDING INTERFACES THAT FEEL INEVITABLE.",
              })}
            </SystemLabel>
          </div>

          <HalftoneBlob
            seed={6}
            className="hero-noise-mark art-breathe pointer-events-none absolute -right-6 bottom-0 h-[280px] w-[280px] opacity-80 md:h-[360px] md:w-[360px] lg:h-[420px] lg:w-[420px]"
          />

          <h1 aria-label={`${SITE.name}, ${t(SITE.role)}`} className="relative z-10">
            <span className="block overflow-hidden pb-[0.04em]">
              <span
                aria-hidden="true"
                className="hero-word display block text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.8]"
                style={{ opacity: 0 }}
              >
                ALAN
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                aria-hidden="true"
                className="hero-word display block text-[clamp(3.6rem,11vw,9.5rem)] leading-[0.8]"
                style={{ opacity: 0 }}
              >
                BUENDÍA
              </span>
            </span>
          </h1>

          <div className="hero-meta relative z-10 mt-4 flex items-center gap-3">
            <SystemLabel>{t({ es: "FRONTEND ENGINEER", en: "FRONTEND ENGINEER" })}</SystemLabel>
            <span aria-hidden="true">↙</span>
          </div>
        </div>

        {/* about mini */}
        <div className="hero-meta flex flex-col justify-between gap-5 border-b border-ink p-5 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-center justify-between">
              <SystemLabel>/ABOUT ME</SystemLabel>
              <SystemLabel className="opacity-50">A—02</SystemLabel>
            </div>
            <p className="mt-4 text-sm font-semibold leading-relaxed">{t(ABOUT.paragraph).split(".").slice(0, 2).join(".") + "."}</p>
          </div>
          <div className="grid gap-2">
            {ABOUT.facts.map((fact, i) => (
              <p key={fact.en} className="u-label border border-ink/40 px-2 py-2 opacity-70">
                {String(i + 1).padStart(2, "0")} / {t(fact)}
              </p>
            ))}
          </div>
          <button
            onClick={() => navigate("/#about")}
            className="u-label border border-ink px-3 py-3 text-left transition-colors hover:bg-ink hover:text-paper"
          >
            {t({ es: "VER PERFIL ↗", en: "VIEW PROFILE ↗" })}
          </button>
          <div className="border border-ink/40 p-3">
            <SystemLabel className="block opacity-60">COORDINATES</SystemLabel>
            <p className="mt-1 text-sm font-bold">{SITE.coords}</p>
            <SystemLabel className="mt-2 block opacity-60">ELEVATION</SystemLabel>
            <p className="text-sm font-bold">1,230 M</p>
          </div>
        </div>

        {/* vertical ABOUT strip */}
        <button
          onClick={() => navigate("/#about")}
          className="hero-meta group relative hidden flex-col items-center justify-between overflow-hidden border-b border-ink p-4 lg:flex lg:border-b-0"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply">
            <Image src="/assets/about-hands.png" alt="" fill sizes="84px" className="object-cover" />
          </div>
          <Barcode className="relative z-10 text-ink" />
          <span
            className="display relative z-10 text-2xl leading-none tracking-[-0.04em] text-ink [writing-mode:vertical-rl]"
          >
            ABOUT
          </span>
          <SystemLabel className="relative z-10 opacity-60 [writing-mode:vertical-rl]">MX / 2026</SystemLabel>
        </button>
      </div>

      {/* ── row: works / tools / contact ─────────────────────────── */}
      <div className="relative z-10 grid gap-4 border-b border-ink p-4 md:gap-6 md:p-6 lg:grid-cols-[1.15fr_1fr_minmax(280px,0.8fr)] lg:items-start">
        {/* selected works */}
        <div className="hero-meta border border-ink">
          <div className="flex items-center justify-between border-b border-ink px-5 py-3">
            <SystemLabel>{t({ es: "TRABAJO SELECCIONADO", en: "SELECTED WORKS" })}</SystemLabel>
            <button
              onClick={() => navigate("/archive")}
              className="u-label opacity-70 transition-opacity hover:opacity-100"
            >
              {t({ es: "VER ARCHIVO ↗", en: "VIEW ARCHIVE ↗" })}
            </button>
          </div>
          <div className="grid gap-5 p-5 md:grid-cols-[1fr_1.1fr] md:items-start md:p-6">
            <div>
              <p className="display text-[clamp(2.8rem,6vw,4.5rem)] leading-none">
                {t({ es: "PROYECTOS", en: "PROJECTS" })}
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="display text-3xl">{String(PROJECT_LIST.length).padStart(2, "0")}</span>
                <SystemLabel className="mb-1 opacity-60">
                  {t({ es: "TOTAL", en: "TOTAL" })}
                </SystemLabel>
              </div>
              <p className="u-label mt-6 max-w-[20ch] leading-relaxed opacity-60">
                {t({
                  es: "SISTEMAS REALES PARA OPERACIONES REALES.",
                  en: "REAL SYSTEMS FOR REAL OPERATIONS.",
                })}
              </p>
              <div className="mt-6 grid gap-2 border-t border-ink/20 pt-5">
                <div className="flex items-center justify-between">
                  <SystemLabel className="opacity-50">RANGE</SystemLabel>
                  <span className="u-label opacity-70">2024–2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <SystemLabel className="opacity-50">STATUS</SystemLabel>
                  <span className="u-label opacity-70">{t({ es: "ENVIADO", en: "SHIPPED" })}</span>
                </div>
              </div>
              <Barcode className="mt-6 opacity-60" />
            </div>
            <ul className="grid content-start gap-1">
              {previewProjects.map((project) => (
                <li key={project.slug}>
                  <button
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    className="group flex w-full items-start gap-3 border-b border-ink/25 py-2 text-left last:border-b-0"
                  >
                    <span className="u-label pt-1 opacity-50">{project.index}</span>
                    <span className="flex-1">
                      <span className="block text-base font-bold leading-tight transition-transform duration-300 group-hover:translate-x-1">
                        {t(project.title)}
                      </span>
                      <span className="u-label mt-1 block opacity-55">{project.tags.slice(0, 3).join(" / ")}</span>
                    </span>
                    <span className="u-label opacity-40">{project.year}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* tools */}
        <div className="hero-meta relative border border-ink">
          <div className="flex items-center justify-between border-b border-ink px-5 py-3">
            <SystemLabel>/TOOLS</SystemLabel>
            <button
              onClick={() => navigate("/#stack")}
              className="u-label opacity-70 transition-opacity hover:opacity-100"
            >
              {t({ es: "MÁS ↗", en: "MORE ↗" })}
            </button>
          </div>
          <div className="relative min-h-[260px] p-5 md:p-6">
            <div
              className="pointer-events-none absolute -right-4 bottom-0 h-[240px] w-[240px] mix-blend-multiply md:h-[300px] md:w-[300px]"
              style={{
                maskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, #000 70%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, #000 70%, transparent 100%)",
              }}
            >
              <Image
                src="/assets/stack-layers.png"
                alt=""
                fill
                sizes="300px"
                className="object-contain object-bottom opacity-90"
              />
            </div>
            <ul className="relative z-10">
              {featuredTools.map((tool) => (
                <li key={tool.name} className="display text-[clamp(1.8rem,5vw,2.9rem)] leading-[1.05]">
                  {tool.name.toUpperCase()}
                </li>
              ))}
            </ul>
            <div className="relative z-10 mt-6 grid max-w-[11rem] gap-2 border border-ink/40 p-3">
              <div className="flex items-center justify-between">
                <SystemLabel className="opacity-60">EASE</SystemLabel>
                <span className="u-label">power3.out</span>
              </div>
              <div className="flex items-center justify-between">
                <SystemLabel className="opacity-60">DURATION</SystemLabel>
                <span className="u-label">0.8S</span>
              </div>
              <div className="flex items-center justify-between">
                <SystemLabel className="opacity-60">STAGGER</SystemLabel>
                <span className="u-label">0.08S</span>
              </div>
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="hero-meta relative flex flex-col justify-between gap-6 overflow-hidden border border-ink bg-ink p-5 text-paper md:p-6">
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-[220px] w-[220px] opacity-[0.16] mix-blend-screen"
            style={{
              maskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 25%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 25%, transparent 70%)",
            }}
          >
            <Image src="/assets/contact-tower.png" alt="" fill sizes="220px" className="object-contain" />
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <SystemLabel>/CONTACT</SystemLabel>
            <SystemLabel className="opacity-60">A—03</SystemLabel>
          </div>
          <p className="display relative z-10 break-words text-[clamp(1.2rem,2.4vw,2.2rem)] leading-[1.15]">
            {t({ es: "CONSTRUYAMOS IDEAS", en: "LET'S BUILD IDEAS" })}
          </p>
          <div className="relative z-10">
            <SystemLabel className="block opacity-60">{SITE.email}</SystemLabel>
            <p className="u-label mt-2 opacity-70">
              {t({ es: "DISPONIBLE PARA FREELANCE", en: "AVAILABLE FOR FREELANCE" })}
            </p>
          </div>
          <button
            onClick={() => navigate("/#contact")}
            className="u-label relative z-10 border border-paper px-3 py-3 text-left transition-colors hover:bg-paper hover:text-ink"
          >
            {t({ es: "ENVIAR MENSAJE ↗", en: "SEND MESSAGE ↗" })}
          </button>
        </div>
      </div>

      {/* ── bottom status bar ────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 items-center px-3 py-3 md:grid-cols-4 md:px-4">
        <span className="hero-meta flex items-center gap-2">
          <PulseDot className="text-ink" />
          <SystemLabel>{t({ es: "SISTEMA LISTO", en: "SYSTEM READY" })}</SystemLabel>
        </span>
        <SystemLabel className="hero-meta hidden opacity-60 md:block">VER 3.0</SystemLabel>
        <SystemLabel className="hero-meta hidden opacity-60 md:block">
          {t({ es: "ÚLTIMA ACTUALIZACIÓN / 2026", en: "LAST UPDATE / 2026" })}
        </SystemLabel>
        <span className="hero-meta flex items-center justify-end gap-2">
          <SignalBars className="text-ink" />
          <SystemLabel className="opacity-60">BUILD 2026</SystemLabel>
        </span>
      </div>
    </section>
  );
}
