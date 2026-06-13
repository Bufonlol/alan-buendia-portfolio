"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

const COLS = 72;
const ROWS = 34;
const CHARS = ".,-~:;=!*#$@";

/**
 * The classic donut.c, ported with respect: a 3D torus rendered as
 * ASCII luminance into a <pre>. No WebGL, just math. Hover spins it
 * faster and inks it orange.
 */
export default function AsciiDonut() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;
  const preRef = useRef<HTMLPreElement>(null);
  const [hot, setHot] = useState(false);
  const hotRef = useRef(false);
  hotRef.current = hot;

  useEffect(() => {
    const container = ref.current;
    const pre = preRef.current;
    if (!container || !pre) return;

    const layout = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      // monospace glyphs are ~0.6em wide; fit both axes
      const size = Math.min(w / (COLS * 0.602), h / ROWS);
      pre.style.fontSize = `${size}px`;
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(container);

    let A = 1.0;
    let B = 0.6;
    const out = new Array<string>(COLS * ROWS);
    const zbuf = new Float32Array(COLS * ROWS);

    const frame = () => {
      const speed = hotRef.current ? 2.6 : 1;
      A += 0.028 * speed;
      B += 0.013 * speed;
      out.fill(" ");
      zbuf.fill(0);

      const cA = Math.cos(A), sA = Math.sin(A);
      const cB = Math.cos(B), sB = Math.sin(B);
      const R1 = 1, R2 = 2, K2 = 5;
      const K1 = (COLS * K2 * 3) / (8 * (R1 + R2));

      for (let th = 0; th < 6.28; th += 0.07) {
        const ct = Math.cos(th), st = Math.sin(th);
        for (let ph = 0; ph < 6.28; ph += 0.02) {
          const cp = Math.cos(ph), sp = Math.sin(ph);
          const circX = R2 + R1 * ct;
          const circY = R1 * st;

          const x = circX * (cB * cp + sA * sB * sp) - circY * cA * sB;
          const y = circX * (sB * cp - sA * cB * sp) + circY * cA * cB;
          const z = K2 + cA * circX * sp + circY * sA;
          const ooz = 1 / z;

          const xp = Math.floor(COLS / 2 + K1 * ooz * x);
          const yp = Math.floor(ROWS / 2 - K1 * 0.5 * ooz * y);
          if (xp < 0 || xp >= COLS || yp < 0 || yp >= ROWS) continue;

          const L =
            cp * ct * sB -
            cA * ct * sp -
            sA * st +
            cB * (cA * st - ct * sA * sp);
          const idx = xp + yp * COLS;
          if (ooz > zbuf[idx]) {
            zbuf[idx] = ooz;
            out[idx] = CHARS[Math.max(0, Math.floor(L * 8))] ?? ".";
          }
        }
      }

      let text = "";
      for (let r = 0; r < ROWS; r++) {
        text += out.slice(r * COLS, (r + 1) * COLS).join("") + "\n";
      }
      pre.textContent = text;
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!activeRef.current) return;
      frame();
    };

    if (prefersReducedMotion()) {
      frame(); // one static pose
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      aria-hidden="true"
    >
      <pre
        ref={preRef}
        className={`select-none leading-none transition-colors duration-500 ${
          hot ? "text-accent" : "text-ink/70"
        }`}
        style={{ fontFamily: "ui-monospace, Consolas, monospace" }}
      />
    </div>
  );
}
