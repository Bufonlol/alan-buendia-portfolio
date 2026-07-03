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
                className="hero-word display block text-[clamp(3.6rem,9vw,6rem)] leading-[0.86]"
                style={{ opacity: 0 }}
              >
                ALAN
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                aria-hidden="true"
                className="hero-word display block text-[clamp(3.6rem,9vw,6rem)] leading-[0.86]"
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
              <SystemLabel className="opacity-50">PROFILE / ACTIVE</SystemLabel>
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
      <div className="relative z-10 grid gap-3 border-b border-ink p-3 md:p-4 lg:grid-cols-12 lg:items-stretch">
        {/* selected works */}
        <div className="hero-meta bento-reactive flex min-h-[340px] flex-col border border-ink lg:col-span-5">
          <div className="flex items-center justify-between border-b border-ink px-4 py-3">
            <SystemLabel>{t({ es: "TRABAJO SELECCIONADO", en: "SELECTED WORKS" })}</SystemLabel>
            <button
              onClick={() => navigate("/archive")}
              className="u-label opacity-70 transition-opacity hover:opacity-100"
            >
              {t({ es: "VER ARCHIVO ↗", en: "VIEW ARCHIVE ↗" })}
            </button>
          </div>
          <button
            onClick={() => navigate(`/projects/${coverProject.slug}`)}
            className="group grid flex-1 text-left sm:grid-cols-[0.82fr_1.18fr]"
            data-cursor="view"
          >
            <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden border-b border-ink p-5 sm:border-b-0 sm:border-r">
              <div>
                <div className="flex items-end gap-3">
                  <span className="display text-[clamp(3.2rem,6vw,5.4rem)] leading-none">
                    {String(PROJECT_LIST.length).padStart(2, "0")}
                  </span>
                  <SystemLabel className="mb-1 opacity-60">{t({ es: "CASOS", en: "CASES" })}</SystemLabel>
                </div>
                <p className="u-label mt-5 max-w-[22ch] leading-relaxed opacity-70">
                  {t({
                    es: "SISTEMAS REALES PARA OPERACIONES REALES.",
                    en: "REAL SYSTEMS FOR REAL OPERATIONS.",
                  })}
                </p>
              </div>
              <div>
                <p className="u-label border-t border-ink/25 pt-3 opacity-65">2024–2026 / SHIPPED</p>
                <Barcode className="mt-4 opacity-70" />
              </div>
            </div>
            <div className="relative min-h-[250px] overflow-hidden bg-ink">
              {coverProject.cardImage && (
                <Image
                  src={coverProject.cardImage}
                  alt={t(coverProject.title)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  quality={78}
                  className="object-cover object-top opacity-85 mix-blend-screen transition duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035] group-hover:opacity-100"
                />
              )}
              <div className="technical-grid pointer-events-none absolute inset-0 opacity-25" />
              <div className="absolute inset-x-0 bottom-0 bg-ink p-4 text-paper">
                <SystemLabel className="opacity-65">FEATURED / {coverProject.year}</SystemLabel>
                <p className="display mt-2 text-[clamp(1.8rem,3vw,2.8rem)] leading-[0.9]">{t(coverProject.title)}</p>
                <span className="u-label mt-3 block">{t({ es: "ABRIR CASO ↗", en: "OPEN CASE ↗" })}</span>
              </div>
            </div>
          </button>
        </div>

        {/* tools */}
        <div className="hero-meta bento-reactive relative flex min-h-[340px] flex-col border border-ink lg:col-span-4">
          <div className="flex items-center justify-between border-b border-ink px-4 py-3">
            <SystemLabel>/TOOLS</SystemLabel>
            <button
              onClick={() => navigate("/#stack")}
              className="u-label opacity-70 transition-opacity hover:opacity-100"
            >
              {t({ es: "MÁS ↗", en: "MORE ↗" })}
            </button>
          </div>
          <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-5">
            <div
              className="pointer-events-none absolute -right-4 top-1/2 h-[250px] w-[250px] -translate-y-1/2 mix-blend-multiply"
              style={{
                maskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, #000 70%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, #000 70%, transparent 100%)",
              }}
            >
              <Image
                src="/assets/stack-layers.png"
                alt=""
                fill
                sizes="250px"
                className="object-contain opacity-80"
              />
            </div>
            <ul className="relative z-10">
              {featuredTools.map((tool) => (
                <li key={tool.name} className="display text-[clamp(1.65rem,3vw,2.65rem)] leading-[1.02]">
                  {tool.name.toUpperCase()}
                </li>
              ))}
            </ul>
            <div className="relative z-10 mt-6 grid grid-cols-3 border border-ink/40">
              {["POWER3.OUT", "0.8S", "0.08S"].map((value, index) => (
                <div key={value} className="border-r border-ink/30 p-3 last:border-r-0">
                  <SystemLabel className="block opacity-50">{["EASE", "DURATION", "STAGGER"][index]}</SystemLabel>
                  <span className="u-label mt-2 block">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="hero-meta bento-reactive relative flex min-h-[340px] flex-col justify-between gap-6 overflow-hidden border border-ink bg-ink p-5 text-paper lg:col-span-3">
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
            <SystemLabel className="opacity-60">OPEN</SystemLabel>
          </div>
          <p className="display relative z-10 text-[clamp(1.9rem,2.5vw,2.7rem)] leading-[0.95]">
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
