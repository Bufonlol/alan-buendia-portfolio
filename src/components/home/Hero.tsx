"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { SITE, SECTIONS } from "@/data/site";
import TLink from "@/components/ui/TLink";

/**
 * Hero — black cover page. The name is a graphic composition:
 * two masked lines, an acid disc that the surname passes under
 * (duplicate ink layer clipped to the disc), diagonal lines and
 * editorial marks. Scroll pulls the two lines apart and grows
 * the disc toward the projects transition.
 */
export default function Hero() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;

      /* ── scroll: the cover breaks apart into the index.
         Created only after the entrance finishes so the scrub tweens
         capture the settled values (a ScrollTrigger.refresh mid-entrance
         would otherwise lock the name in its hidden state). ── */
      const buildScrub = () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          })
          .to(".hero-l1", { yPercent: -16, ease: "none" }, 0)
          .to(".hero-l2", { yPercent: 12, ease: "none" }, 0)
          .to(
            ".hero-disc-layer",
            { clipPath: "circle(1.05em at 76% 50%)", ease: "none" },
            0
          )
          .to(".hero-fade", { autoAlpha: 0, y: -30, ease: "none" }, 0);
      };

      /* ── entrance ── */
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        // deck mode has no document scroll; the deck handles the exit
        onComplete: () => {
          if (!isDeckCapable()) buildScrub();
        },
      });
      tl.fromTo(
        el.querySelectorAll(".hero-mask > *"),
        { yPercent: 112 },
        { yPercent: 0, duration: 1.05, stagger: 0.12 },
        0.15
      )
        .fromTo(
          ".hero-disc-layer",
          { clipPath: "circle(0em at 76% 50%)" },
          {
            clipPath: "circle(0.8em at 76% 50%)",
            duration: 1.1,
            ease: "power3.inOut",
          },
          0.5
        )
        .fromTo(
          el.querySelectorAll(".hero-meta"),
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
          0.7
        )
        .fromTo(
          el.querySelectorAll(".hero-diag"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power3.inOut", stagger: 0.1 },
          0.6
        );
    },
    { scope: root }
  );

  // Font-size lives on the composition container (below), so both the paper
  // and ink copies inherit it and the disc radius can be expressed in `em`
  // — that keeps the circle inscribed in the name at every viewport ratio.
  const nameBlock = (tone: "paper" | "ink") => (
    <div
      className={`display select-none px-[var(--frame-x)] py-[3svh] leading-[0.84] deck:py-[1.2svh] ${
        tone === "paper" ? "text-paper" : "text-ink"
      }`}
      aria-hidden={tone === "ink" ? true : undefined}
    >
      {/* pt/-mt compensation keeps accents (Í) inside the overflow mask */}
      <div className="hero-mask -mt-[0.14em] overflow-hidden pt-[0.14em]">
        <span className="hero-l1 block">{SITE.heroFirst}</span>
      </div>
      <div className="hero-mask -mt-[0.14em] overflow-hidden pl-[6vw] pt-[0.14em] md:pl-[9vw]">
        <span className="hero-l2 block">{SITE.heroSecond}</span>
      </div>
    </div>
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink pb-8 pt-20 text-paper deck:h-full deck:min-h-0 deck:pb-6 deck:pt-16"
    >
      {/* diagonal lines crossing the composition */}
      <div
        aria-hidden="true"
        className="hero-diag absolute left-[-10%] top-[24%] h-px w-[130%] origin-left rotate-[-18deg] bg-paper/30"
      />
      <div
        aria-hidden="true"
        className="hero-diag absolute left-[-10%] top-[80%] h-px w-[120%] origin-left rotate-[-16deg] bg-paper/10"
      />

      {/* registration crosses + editorial marks */}
      <span aria-hidden="true" className="u-num absolute left-[46%] top-24 text-paper/30">
        +
      </span>
      <span aria-hidden="true" className="u-num absolute bottom-32 left-[30%] text-paper/30">
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute left-[3.5%] top-[42%] hidden text-2xl text-paper/70 lg:block"
      >
        ✳
      </span>

      {/* rotating stamp: diseño · desarrollo · rendimiento */}
      <div
        aria-hidden="true"
        className="absolute right-[3%] top-[15%] z-10 hidden h-28 w-28 lg:block xl:h-32 xl:w-32"
      >
        <svg viewBox="0 0 100 100" className="stamp-spin h-full w-full">
          <defs>
            <path
              id="hero-stamp-circle"
              d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
            />
          </defs>
          <text className="fill-paper/70 font-mono text-[7.6px] uppercase tracking-[0.2em]">
            <textPath href="#hero-stamp-circle">
              {t({
                es: "diseño · desarrollo · rendimiento · ",
                en: "design · development · performance · ",
              })}
            </textPath>
          </text>
        </svg>
        <span
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-t border-paper/70"
        />
      </div>

      {/* top meta row */}
      <div className="frame hero-fade relative z-10 flex items-start justify-between">
        <div className="hero-meta">
          <p className="u-label text-paper">
            {t({ es: "Desarrollador", en: "Developer" })}
            <br />
            {t({ es: "Web", en: "Web" })}
            <br />
            Frontend
          </p>
          <span className="mt-3 block h-2 w-2 rounded-full bg-acid" aria-hidden="true" />
        </div>
      </div>

      {/* the name composition */}
      <div className="relative z-10 py-3 deck:py-2">
        <h1 className="sr-only">
          {SITE.name} — {t(SITE.role)}
        </h1>
        {/* w-fit: the composition box hugs the name, so the disc always
            sits behind the surname's last letters at any viewport width */}
        <div
          className="relative w-fit text-[clamp(4.6rem,18.5vw,16.5rem)] deck:text-[clamp(4.5rem,min(18.5vw,34svh),20rem)]"
          aria-hidden="true"
        >
          {nameBlock("paper")}
          {/* acid disc + ink duplicate clipped to it — the surname passes
              under the shape and changes ink. Radius in svh so the disc
              stays circular regardless of how wide the block is. */}
          <div
            className="hero-disc-layer absolute inset-0"
            style={{ clipPath: "circle(0.8em at 76% 50%)" }}
          >
            <div className="absolute inset-0 bg-acid" />
            <div className="blinds absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0">{nameBlock("ink")}</div>
          </div>
          {/* ink wedge cutting the bottom-left of the surname */}
          <div
            className="absolute bottom-0 left-0 h-[30%] w-[13%] bg-ink"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 0 18%)" }}
          />
          {/* print grain over the whole name composition (multiply) */}
          <div className="type-grain pointer-events-none absolute inset-0" aria-hidden="true" />
        </div>
      </div>

      {/* bottom row */}
      <div className="frame hero-fade relative z-10 flex items-end justify-between">
        <div className="hero-meta max-w-xs">
          <p className="text-sm leading-relaxed text-mute">{t(SITE.tagline)}</p>
          <TLink
            href="/#work"
            className="btn-editorial btn-editorial--acid group mt-4"
          >
            {t({ es: "Ver proyectos", en: "View projects" })}
            <span className="arrow-x" aria-hidden="true" />
          </TLink>
        </div>
        <div className="hero-meta flex flex-col items-end gap-6">
          <span className="u-label hidden text-paper/50 md:block">
            {t({ es: "Disponible", en: "Available" })} / AB
          </span>
          <span
            className="relative hidden h-14 w-px overflow-hidden bg-paper/20 md:block"
            aria-hidden="true"
          >
            <span className="scroll-drip absolute inset-0 bg-acid" />
          </span>
        </div>
      </div>
    </section>
  );
}
