"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

/** A choreographed GSAP timeline you can play, restart and scrub by hand. */
export default function TimelineDemo() {
  const { ref, active } = useInView<HTMLDivElement>();
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useGSAP(
    () => {
      const stage = ref.current;
      if (!stage) return;
      const q = gsap.utils.selector(stage);

      const tl = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power3.out" },
          onUpdate: () => {
            if (rangeRef.current)
              rangeRef.current.value = String(Math.round(tl.progress() * 1000));
          },
          onComplete: () => setPlaying(false),
        })
        .fromTo(
          q(".tl-bar"),
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, stagger: 0.08, ease: "power4.out" }
        )
        .fromTo(
          q(".tl-ball"),
          { x: 0, y: 0 },
          { x: () => stage.clientWidth * 0.62, duration: 1.1, ease: "none" },
          0.3
        )
        .to(
          q(".tl-ball"),
          { y: -46, duration: 0.55, yoyo: true, repeat: 1, ease: "circ.out" },
          0.3
        )
        .fromTo(
          q(".tl-char"),
          { yPercent: 120, rotationX: -90 },
          { yPercent: 0, rotationX: 0, duration: 0.7, stagger: 0.07 },
          0.9
        )
        .to(
          q(".tl-box"),
          { rotation: 360, borderRadius: "50%", duration: 0.9, ease: "back.inOut(1.4)" },
          1.1
        )
        .to(q(".tl-bar"), { scaleY: 0.25, duration: 0.5, stagger: 0.05 }, 1.5)
        .to(q(".tl-box"), { rotation: 0, borderRadius: "0%", duration: 0.6 }, 1.8);

      tlRef.current = tl;
    },
    { scope: ref }
  );

  // autoplay the first time it scrolls into view
  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const id = setTimeout(() => {
      tlRef.current?.play();
      setPlaying(true);
    }, 350);
    return () => clearTimeout(id);
  }, [active]);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (tl.progress() === 1) {
      tl.restart();
      setPlaying(true);
    } else if (tl.paused()) {
      tl.play();
      setPlaying(true);
    } else {
      tl.pause();
      setPlaying(false);
    }
  };

  const scrub = (v: string) => {
    const tl = tlRef.current;
    if (!tl) return;
    tl.pause();
    setPlaying(false);
    tl.progress(Number(v) / 1000);
  };

  return (
    <div ref={ref} className="absolute inset-0 flex flex-col">
      {/* stage */}
      <div className="relative flex-1 overflow-hidden px-6 pt-6">
        <div className="flex h-24 items-end gap-2">
          {[0.5, 0.8, 0.45, 1, 0.65].map((h, i) => (
            <div
              key={i}
              className="tl-bar w-5 origin-bottom bg-ink"
              style={{ height: `${h * 100}%`, transform: "scaleY(0)" }}
            />
          ))}
          <div
            className="tl-ball ml-4 h-7 w-7 self-end rounded-full bg-accent"
            aria-hidden="true"
          />
          <div className="tl-box ml-auto h-12 w-12 self-center bg-accent/80" aria-hidden="true" />
        </div>
        <p
          className="display mt-6 flex gap-1 text-[clamp(2.4rem,6cqw,4rem)] leading-none"
          style={{ perspective: "400px" }}
          aria-label="Timeline"
        >
          {"TIMELINE".split("").map((c, i) => (
            <span key={i} className="tl-char inline-block" style={{ transform: "translateY(120%)" }}>
              {c}
            </span>
          ))}
        </p>
      </div>

      {/* controls */}
      <div className="flex items-center gap-4 border-t border-line bg-paper px-5 py-3">
        <button
          onClick={toggle}
          className="u-label rounded-full bg-ink px-4 py-2 text-paper transition-transform hover:scale-105"
        >
          {playing ? "Pause ⏸" : "Play ▶"}
        </button>
        <input
          ref={rangeRef}
          type="range"
          min="0"
          max="1000"
          defaultValue="0"
          onInput={(e) => scrub((e.target as HTMLInputElement).value)}
          className="h-px flex-1 cursor-pointer appearance-none bg-line accent-[#dd4a12]"
          aria-label="Scrub timeline"
        />
        <span className="u-label text-muted">scrub</span>
      </div>
    </div>
  );
}
