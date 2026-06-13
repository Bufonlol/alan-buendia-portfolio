"use client";

import { useRef } from "react";
import { gsap, useGSAP, Draggable } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

const ROWS = [
  { words: ["MOTION", "EASING", "TIMING"], dir: 1, solid: true },
  { words: ["DRAG ME", "FLICK ME", "WRAP ME"], dir: -1, solid: false },
  { words: ["INFINITE", "LOOP", "FOREVER"], dir: 1, solid: true },
];

/** Three marquee lanes wrapping forever — drag horizontally, inertia carries it. */
export default function MarqueeLab() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useGSAP(
    () => {
      const container = ref.current;
      if (!container) return;
      const rows = gsap.utils.toArray<HTMLElement>(".lab-row", container);
      const wrap = gsap.utils.wrap(-50, 0);

      let offset = 0;
      let dragVel = 0;

      const render = () => {
        rows.forEach((row, i) => {
          const dir = ROWS[i].dir;
          const speed = 1 + i * 0.25;
          gsap.set(row, { xPercent: wrap(offset * dir * speed * 0.018 - 25) });
        });
      };
      render();

      const tick = (_t: number, dt: number) => {
        if (!activeRef.current) return;
        offset += (2.2 + dragVel) * (dt / 16.6);
        dragVel *= 0.94; // inertia decay
        render();
      };
      gsap.ticker.add(tick);

      const proxy = document.createElement("div");
      let lastX = 0;
      const drag = Draggable.create(proxy, {
        trigger: container,
        type: "x",
        onPress(this: Draggable) {
          lastX = this.x;
        },
        onDrag(this: Draggable) {
          const dx = this.x - lastX;
          lastX = this.x;
          offset += dx * 1.6;
          dragVel = dx * 2.4;
          render();
        },
      })[0];

      return () => {
        gsap.ticker.remove(tick);
        drag.kill();
      };
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      data-cursor="drag"
      className="absolute inset-0 flex touch-pan-y select-none flex-col justify-center gap-3 overflow-hidden"
    >
      {ROWS.map((row, i) => (
        <div key={i} className="lab-row flex w-max whitespace-nowrap will-change-transform">
          {Array.from({ length: 4 }).map((_, rep) => (
            <span key={rep} className="flex items-center">
              {row.words.map((w) => (
                <span key={`${rep}-${w}`} className="flex items-center">
                  <span
                    className={`display px-4 text-[clamp(2rem,9cqw,4.2rem)] leading-none ${
                      row.solid ? "text-ink" : ""
                    }`}
                    style={
                      row.solid
                        ? undefined
                        : {
                            color: "transparent",
                            WebkitTextStroke: "1.5px #dd4a12",
                          }
                    }
                  >
                    {w}
                  </span>
                  <span className="text-accent">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
