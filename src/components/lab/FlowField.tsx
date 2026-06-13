"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

const COUNT = 650;
const INK = "rgba(24, 21, 17, 0.16)";
const ACCENT = "rgba(221, 74, 18, 0.35)";
const FADE = "rgba(243, 239, 230, 0.07)"; // paper, low alpha → trails

type P = { x: number; y: number };

/**
 * Particles advected by a time-varying sine field, leaving fading
 * trails. The cursor injects a swirl into the field around it.
 */
export default function FlowField() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d")!;

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };

    const seed = () => {
      pts.length = 0;
      for (let i = 0; i < COUNT; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H });
      }
    };

    const layout = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#ece7da"; // paper-soft base
      ctx.fillRect(0, 0, W, H);
      seed();
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(container);

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    let t = 0;
    const step = () => {
      t += 0.006;
      ctx.fillStyle = FADE;
      ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = 1.1;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // base field: two crossed sine waves drifting over time
        let a =
          Math.sin(p.x * 0.006 + t * 2.1) * 1.7 +
          Math.cos(p.y * 0.0052 - t * 1.6) * 1.7;

        // cursor swirl: rotate the field tangentially around the pointer
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const f = 1 - Math.sqrt(d2) / 140;
          a += Math.atan2(dy, dx) * f * 1.4 + f * 2.2;
        }

        const nx = p.x + Math.cos(a) * 1.6;
        const ny = p.y + Math.sin(a) * 1.6;
        ctx.strokeStyle = i % 14 === 0 ? ACCENT : INK;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;

        if (p.x < -4 || p.x > W + 4 || p.y < -4 || p.y > H + 4) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
        }
      }
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!activeRef.current) return;
      step();
    };

    if (prefersReducedMotion()) {
      // static etching: run the field briefly, render once, stop
      for (let i = 0; i < 110; i++) step();
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="absolute inset-0" aria-hidden="true" />;
}
