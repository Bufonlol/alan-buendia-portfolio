"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

const SEGMENTS = 26;
const GRAVITY = 0.55;
const DAMPING = 0.985;
const ITERATIONS = 3;

type Node = { x: number; y: number; px: number; py: number };

/**
 * A verlet-integrated rope pinned to the cursor. Whip it around;
 * when the pointer leaves, it falls back to its hook and sways out.
 */
export default function Rope() {
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
    let segLen = 10;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, inside: false };
    const head = { x: 0, y: 0 };

    const build = () => {
      nodes.length = 0;
      for (let i = 0; i < SEGMENTS; i++) {
        const x = W / 2;
        const y = H * 0.16 + i * segLen;
        nodes.push({ x, y, px: x, py: y });
      }
    };

    const layout = () => {
      W = container.clientWidth;
      H = container.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      segLen = (H * 0.62) / SEGMENTS;
      head.x = W / 2;
      head.y = H * 0.16;
      build();
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(container);

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = true;
    };
    const onLeave = () => {
      mouse.inside = false;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    const step = () => {
      // the head chases the cursor, or returns to its hook
      const tx = mouse.inside ? mouse.x : W / 2;
      const ty = mouse.inside ? mouse.y : H * 0.16;
      head.x += (tx - head.x) * 0.3;
      head.y += (ty - head.y) * 0.3;

      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const vx = (n.x - n.px) * DAMPING;
        const vy = (n.y - n.py) * DAMPING + GRAVITY;
        n.px = n.x;
        n.py = n.y;
        n.x += vx;
        n.y += vy;
      }

      for (let k = 0; k < ITERATIONS; k++) {
        nodes[0].x = head.x;
        nodes[0].y = head.y;
        for (let i = 0; i < nodes.length - 1; i++) {
          const a = nodes[i];
          const b = nodes[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = ((dist - segLen) / dist) * 0.5;
          const ox = dx * diff;
          const oy = dy * diff;
          if (i === 0) {
            b.x -= ox * 2;
            b.y -= oy * 2;
          } else {
            a.x += ox;
            a.y += oy;
            b.x -= ox;
            b.y -= oy;
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // hook
      ctx.fillStyle = "#8b8474";
      ctx.beginPath();
      ctx.arc(W / 2, H * 0.16, 3, 0, Math.PI * 2);
      ctx.fill();

      // tapered rope, segment by segment
      ctx.lineCap = "round";
      ctx.strokeStyle = "#181511";
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i];
        const b = nodes[i + 1];
        ctx.lineWidth = 6 - (i / nodes.length) * 4;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // accent knot at the tail
      const tail = nodes[nodes.length - 1];
      ctx.fillStyle = "#dd4a12";
      ctx.beginPath();
      ctx.arc(tail.x, tail.y, 7, 0, Math.PI * 2);
      ctx.fill();
    };

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!activeRef.current) return;
      step();
      draw();
    };

    if (prefersReducedMotion()) {
      for (let i = 0; i < 160; i++) step(); // settle into a resting hang
      draw();
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
