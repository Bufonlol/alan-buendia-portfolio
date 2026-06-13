"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/lib/useInView";

type Dot = {
  x: number;
  y: number;
  hx: number;
  hy: number;
  vx: number;
  vy: number;
};

/** Dot grid that flees the cursor and springs back home. */
export default function Particles() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const build = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const gap = 26;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          dots.push({ x, y, hx: x, hy: y, vx: 0, vy: 0 });
        }
      }
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(container);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    const RADIUS = 110;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!activeRef.current) return;

      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS && dist > 0.01) {
          const force = ((RADIUS - dist) / RADIUS) * 2.2;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }
        // spring home + damping
        d.vx += (d.hx - d.x) * 0.06;
        d.vy += (d.hy - d.y) * 0.06;
        d.vx *= 0.86;
        d.vy *= 0.86;
        d.x += d.vx;
        d.y += d.vy;

        const offset = Math.hypot(d.x - d.hx, d.y - d.hy);
        const excited = Math.min(1, offset / 26);
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4 + excited * 1.8, 0, Math.PI * 2);
        ctx.fillStyle =
          excited > 0.18
            ? `rgba(221, 74, 18, ${0.4 + excited * 0.6})`
            : "rgba(24, 21, 17, 0.34)";
        ctx.fill();
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="absolute inset-0" />;
}
