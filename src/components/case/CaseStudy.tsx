"use client";

import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { gsap, useGSAP, SplitText } from "@/lib/gsap-plugins";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { PROJECTS, type Project } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import MiniFooter from "@/components/MiniFooter";
import { Contours, CropMarks } from "@/components/art/EditorialArt";
import { TechnicalGrid } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";

/** Counts metric values up when they scroll into view ("30s" → 0→30 + "s"). */
function Metric({ metric, label }: { metric: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const match = metric.match(/^([^0-9]*)(\d+)(.*)$/);
      if (!match || prefersReducedMotion()) return;
      const [, prefix, num, suffix] = match;
      const target = parseInt(num, 10);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <div className="border-t border-line pt-5">
      <span ref={ref} className="display block text-[clamp(2.6rem,6vw,5rem)] leading-none">
        {metric}
      </span>
      <span className="u-label mt-3 block text-muted">{label}</span>
    </div>
  );
}

export default function CaseStudy({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { ready, navigate } = useApp();
  const { lang, t } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  /* Hero entrance + banner parallax */
  useGSAP(
    () => {
      if (!ready || !heroRef.current) return;
      const q = gsap.utils.selector(heroRef);

      const compactViewport = window.matchMedia("(max-width: 767px)").matches;

      if (prefersReducedMotion() || compactViewport) {
        gsap.fromTo(
          [titleRef.current, ...q(".case-fade")],
          { autoAlpha: 0, y: compactViewport ? 16 : 0 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.06,
            ease: "power2.out",
            delay: 0.2,
          }
        );
        return;
      }

      const split = new SplitText(titleRef.current, { type: "chars", mask: "chars" });
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .set(titleRef.current, { autoAlpha: 1 })
        .fromTo(
          split.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.03 },
          0.35
        )
        .fromTo(
          q(".case-fade"),
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 },
          0.7
        );
    },
    { dependencies: [ready, lang], scope: heroRef }
  );

  useGSAP(
    () => {
      const banner = bannerRef.current;
      if (!banner || prefersReducedMotion()) return;
      gsap.fromTo(
        banner.firstElementChild,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: banner,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: bannerRef }
  );

  return (
    <main className="px-5 pt-28 md:px-8">
      {/* hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <Contours
          className="case-fade pointer-events-none absolute -right-[10%] -top-[18%] z-0 hidden h-[60vh] w-[60vh] opacity-50 md:block"
          seed={Number(project.index) * 7 + 3}
          rings={9}
          accentRing={3}
        />
        <div className="case-fade relative z-10 flex items-center justify-between" style={{ opacity: 0 }}>
          <button
            onClick={() => navigate("/#work")}
            className="u-label link-line uppercase"
          >
            {t({ es: "← Índice", en: "← Index" })}
          </button>
          <span className="u-label flex items-center gap-3 text-muted">
            <span>
              {project.index} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <span className="pill" style={{ color: project.color, borderColor: project.color }}>
              {t(project.status)}
            </span>
          </span>
        </div>

        <h1
          ref={titleRef}
          className="display relative z-10 mt-10 text-[clamp(2.2rem,10.6vw,10.5rem)] leading-[0.9] md:leading-[0.88]"
          style={{ opacity: 0 }}
        >
          {t(project.title)}
        </h1>
        <p
          className="case-fade relative z-10 mt-6 max-w-[34rem] font-serif text-[clamp(1.2rem,2.4vw,1.8rem)] italic text-ink-soft"
          style={{ opacity: 0 }}
        >
          {t(project.tagline)}
        </p>

        <div
          className="case-fade relative z-10 mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4"
          style={{ opacity: 0 }}
        >
          {[
          [t({ es: "Año", en: "Year" }), project.year],
          [t({ es: "Rol", en: "Role" }), t(project.role)],
            [t({ es: "Stack", en: "Stack" }), project.tags.join(" · ")],
          [t({ es: "Estado", en: "Status" }), t(project.status)],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="u-label text-muted">{k}</span>
              <p className="mt-2 text-sm font-medium leading-snug">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* banner */}
      <div ref={bannerRef} className="relative mt-14 overflow-hidden">
        <ProjectVisual
          project={project}
          image={project.cardImage}
          className="h-[48vh] w-full [container-type:inline-size] md:h-[62vh]"
        />
        <CropMarks size={18} inset={14} opacity={0.55} color="var(--color-paper)" />
      </div>

      {/* content blocks */}
      <section className="relative mx-auto mt-20 max-w-6xl overflow-hidden">
        <TechnicalGrid className="opacity-15" />
        <div className="relative z-10">
        <div className="grid gap-6 border-t border-line py-14 md:grid-cols-2 md:py-20">
          <Reveal className="h-full">
            <div className="win-window win-window--ink h-full">
              <WinTitleBar label="PROBLEM.TXT" />
              <div className="win-body">
                <span className="u-label text-accent">{t({ es: "El problema", en: "The problem" })}</span>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">
                  {t(project.problem)}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="h-full">
            <div className="win-window win-window--ink h-full bg-ink text-paper">
              <WinTitleBar label="RESEARCH.TXT" />
              <div className="win-body">
                <span className="u-label opacity-85">{t({ es: "Investigación", en: "Research" })}</span>
                <p className="mt-6 text-lg leading-relaxed opacity-90 md:text-xl">
                  {t(project.research)}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6 border-t border-line py-14 md:grid-cols-3 md:items-start md:py-20">
          <Reveal className="md:col-span-2">
            <div className="win-window win-window--ink">
              <WinTitleBar label="SOLUTION.EXE" />
              <div className="win-body">
                <span className="u-label text-accent">{t({ es: "La solución", en: "The solution" })}</span>
                <ul className="mt-6 flex flex-col">
                  {project.solution.map((s, i) => (
                    <li key={i} className="flex items-start gap-4 border-b border-line py-4 last:border-b-0">
                      <span className="u-label mt-1 text-accent">→</span>
                      <span className="leading-relaxed">{t(s)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="win-window win-window--ink bg-ink text-paper">
              <WinTitleBar label="TECHSTACK.EXE" />
              <div className="win-body">
                <span className="u-label opacity-85">{t({ es: "Stack técnico", en: "Tech stack" })}</span>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="display inline-flex items-center leading-none border border-paper/40 px-4 py-3 text-[clamp(1rem,2vw,1.4rem)] transition-colors duration-300 hover:border-paper hover:text-accent"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="border-t border-line py-14 md:py-20">
          <span className="u-label text-accent">{t({ es: "Pantallas", en: "Screens" })}</span>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {project.screens.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <ProjectVisual
                  project={project}
                  image={s.image}
                  caption={t(s.caption)}
                  fit={s.fit}
                  className="aspect-[16/9] w-full border border-line [container-type:inline-size]"
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="border-t border-line py-14 md:py-20">
          <span className="u-label text-accent">{t({ es: "Resultados", en: "Results" })}</span>
          <div className="win-window win-window--ink mt-6">
            <WinTitleBar label="RESULTS.DAT" />
            <div className="win-body grid gap-6 sm:grid-cols-3">
              {project.results.map((r) => (
                <Metric key={r.label.en} metric={t(r.metric)} label={t(r.label)} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 border-t border-line py-14 md:grid-cols-3 md:items-start md:py-20">
          <Reveal className={project.live || project.repo ? "md:col-span-2" : "md:col-span-3"}>
            <div className="win-window win-window--ink">
              <WinTitleBar label="LEARNINGS.TXT" />
              <div className="win-body">
                <span className="u-label text-accent">{t({ es: "Aprendizajes", en: "Learnings" })}</span>
                <ol className="mt-6 flex flex-col gap-6">
                  {project.learnings.map((l, i) => (
                    <li key={i} className="flex gap-5">
                      <span className="display text-2xl text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="leading-relaxed text-ink-soft">{t(l)}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
          {(project.live || project.repo) && (
            <Reveal delay={0.05} className="h-full">
              <div className="win-window win-window--ink h-full bg-ink text-paper">
                <WinTitleBar label="LINKS.EXE" />
                <div className="win-body flex flex-1 flex-col justify-between gap-6">
                  <span className="u-label opacity-85">{t({ es: "ENLACES", en: "LINKS" })}</span>
                  <div className="u-label flex flex-col gap-4">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="link-line">
                        {t({ es: "Ver sitio en vivo ↗", en: "Visit live site ↗" })}
                      </a>
                    )}
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noreferrer" className="link-line">
                        {t({ es: "Código ↗", en: "Source ↗" })}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
        </div>
      </section>

      {/* next project */}
      <section className="-mx-5 mt-10 md:-mx-8">
        <button
          onClick={() => navigate(`/projects/${next.slug}`)}
          data-cursor="view"
          className="group block w-full border-t border-line px-5 py-16 text-left transition-colors duration-500 hover:bg-ink hover:text-paper md:px-8 md:py-24"
        >
          <span className="u-label text-muted transition-colors group-hover:text-paper/85">
            {t({ es: "Siguiente proyecto", en: "Next project" })} — {next.index}
          </span>
          <span className="display mt-4 flex items-baseline gap-6 text-[clamp(2.6rem,9vw,7.5rem)] leading-none">
            {t(next.title)}
            <span className="text-accent transition-transform duration-500 group-hover:translate-x-4">
              →
            </span>
          </span>
        </button>
        <MiniFooter />
      </section>
    </main>
  );
}
