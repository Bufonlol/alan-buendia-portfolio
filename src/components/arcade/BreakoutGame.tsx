"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { useLang } from "@/lib/i18n";

/** Brick layout — the monogram, obviously. */
const MASK = [
  ".##..####.",
  "#..#.#...#",
  "#..#.#...#",
  "####.####.",
  "#..#.#...#",
  "#..#.#...#",
  "#..#.####.",
];
const ROW_COLORS = [
  "#dd4a12", "#3b6bd6", "#3e6b5c", "#a8842c", "#4a5a8a", "#7a3e8f", "#181511",
];
const HI_KEY = "ab-arcade-hi";

type Phase = "idle" | "serving" | "playing" | "paused" | "over" | "win";

type Brick = { x: number; y: number; w: number; h: number; color: string; alive: boolean };

export default function BreakoutGame() {
  const { t } = useLang();
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [lives, setLives] = useState(3);
  const [hi, setHi] = useState(0);
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  // mutable game state lives outside React
  const game = useRef({
    W: 640, H: 480,
    paddle: { x: 320, w: 100, h: 10 },
    ball: { x: 320, y: 420, dx: 0.5, dy: -0.86, speed: 330 },
    bricks: [] as Brick[],
    score: 0,
    lives: 3,
    keys: new Set<string>(),
  });

  // pause when scrolled away mid-game
  useEffect(() => {
    activeRef.current = active;
    if (!active && phaseRef.current === "playing") setPhase("paused");
  }, [active]);

  useEffect(() => {
    setHi(Number(localStorage.getItem(HI_KEY) ?? 0));
  }, []);

  useEffect(() => {
    const container = ref.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d")!;
    const g = game.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildBricks = () => {
      g.bricks = [];
      const cols = MASK[0].length;
      const padX = g.W * 0.06;
      const bw = (g.W - padX * 2) / cols;
      const bh = (g.H * 0.36) / MASK.length;
      const top = g.H * 0.09;
      MASK.forEach((row, r) => {
        [...row].forEach((cell, c) => {
          if (cell !== "#") return;
          g.bricks.push({
            x: padX + c * bw, y: top + r * bh,
            w: bw, h: bh,
            color: ROW_COLORS[r % ROW_COLORS.length],
            alive: true,
          });
        });
      });
    };

    const resetBall = () => {
      g.ball.x = g.paddle.x;
      g.ball.y = g.H - 40;
      const a = (Math.random() * 50 - 25 + 90) * (Math.PI / 180);
      g.ball.dx = Math.cos(a) * (Math.random() > 0.5 ? 1 : -1);
      g.ball.dy = -Math.abs(Math.sin(a));
      g.ball.speed = 330 * (g.H / 480);
    };

    const fullReset = () => {
      g.score = 0;
      g.lives = 3;
      setLives(3);
      if (scoreRef.current) scoreRef.current.textContent = "0000";
      buildBricks();
      g.paddle.x = g.W / 2;
      resetBall();
    };

    const layout = () => {
      g.W = container.clientWidth;
      g.H = container.clientHeight;
      canvas.width = g.W * dpr;
      canvas.height = g.H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.paddle.w = g.W * 0.16;
      buildBricks();
      if (phaseRef.current !== "playing") resetBall();
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, g.W, g.H);
      // bricks
      for (const b of g.bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x + 2, b.y + 2, b.w - 4, b.h - 4);
      }
      // paddle
      ctx.fillStyle = "#181511";
      ctx.beginPath();
      ctx.roundRect(g.paddle.x - g.paddle.w / 2, g.H - 26, g.paddle.w, g.paddle.h, 5);
      ctx.fill();
      // ball
      ctx.fillStyle = "#dd4a12";
      ctx.beginPath();
      ctx.arc(g.ball.x, g.ball.y, 6, 0, Math.PI * 2);
      ctx.fill();
    };

    const loseLife = () => {
      g.lives -= 1;
      setLives(g.lives);
      if (g.lives <= 0) {
        finish("over");
      } else {
        setPhase("serving");
        resetBall();
      }
    };

    const finish = (result: "over" | "win") => {
      setPhase(result);
      const prev = Number(localStorage.getItem(HI_KEY) ?? 0);
      if (g.score > prev) {
        localStorage.setItem(HI_KEY, String(g.score));
        setHi(g.score);
      }
    };

    const step = (dt: number) => {
      // paddle keyboard control
      const dir =
        (g.keys.has("ArrowRight") || g.keys.has("d") ? 1 : 0) -
        (g.keys.has("ArrowLeft") || g.keys.has("a") ? 1 : 0);
      if (dir) g.paddle.x += dir * 560 * dt * (g.W / 640);
      g.paddle.x = Math.max(g.paddle.w / 2, Math.min(g.W - g.paddle.w / 2, g.paddle.x));

      if (phaseRef.current === "serving") {
        g.ball.x = g.paddle.x;
        g.ball.y = g.H - 40;
        return;
      }
      if (phaseRef.current !== "playing") return;

      const b = g.ball;
      b.x += b.dx * b.speed * dt;
      b.y += b.dy * b.speed * dt;

      // walls
      if (b.x < 6) { b.x = 6; b.dx *= -1; }
      if (b.x > g.W - 6) { b.x = g.W - 6; b.dx *= -1; }
      if (b.y < 6) { b.y = 6; b.dy *= -1; }

      // paddle
      const py = g.H - 26;
      if (
        b.dy > 0 &&
        b.y + 6 >= py && b.y + 6 <= py + g.paddle.h + 8 &&
        b.x >= g.paddle.x - g.paddle.w / 2 - 6 &&
        b.x <= g.paddle.x + g.paddle.w / 2 + 6
      ) {
        const hit = Math.max(-1, Math.min(1, (b.x - g.paddle.x) / (g.paddle.w / 2)));
        const angle = hit * (Math.PI / 3); // up to 60°
        b.dx = Math.sin(angle);
        b.dy = -Math.cos(angle);
        b.y = py - 6;
      }

      // bottom
      if (b.y > g.H + 10) { loseLife(); return; }

      // bricks
      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        const cx = Math.max(brick.x, Math.min(b.x, brick.x + brick.w));
        const cy = Math.max(brick.y, Math.min(b.y, brick.y + brick.h));
        const ddx = b.x - cx;
        const ddy = b.y - cy;
        if (ddx * ddx + ddy * ddy > 36) continue;

        brick.alive = false;
        g.score += 10;
        if (scoreRef.current)
          scoreRef.current.textContent = String(g.score).padStart(4, "0");
        b.speed = Math.min(b.speed * 1.015, 560 * (g.H / 480));

        // reflect on the axis of least penetration
        if (Math.abs(ddx) > Math.abs(ddy)) b.dx = Math.sign(ddx) || 1;
        else b.dy = Math.sign(ddy) || -1;
        const len = Math.hypot(b.dx, b.dy);
        b.dx /= len; b.dy /= len;

        if (g.bricks.every((k) => !k.alive)) { finish("win"); }
        break;
      }
    };

    layout();
    fullReset();
    const ro = new ResizeObserver(layout);
    ro.observe(container);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.04);
      last = now;
      if (!activeRef.current) return;
      step(dt);
      draw();
    };
    raf = requestAnimationFrame(loop);

    /* controls */
    const onPointerMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      g.paddle.x = Math.max(
        g.paddle.w / 2,
        Math.min(g.W - g.paddle.w / 2, e.clientX - r.left)
      );
    };
    const advance = () => {
      const p = phaseRef.current;
      if (p === "idle") { fullReset(); setPhase("serving"); }
      else if (p === "serving") setPhase("playing");
      else if (p === "paused") setPhase("playing");
      else if (p === "over" || p === "win") { fullReset(); setPhase("serving"); }
    };
    const onPointerDown = () => advance();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " && activeRef.current) {
        e.preventDefault();
        advance();
        return;
      }
      g.keys.add(e.key);
    };
    const onKeyUp = (e: KeyboardEvent) => g.keys.delete(e.key);

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overlay: Partial<Record<Phase, { big: string; small: string }>> = {
    idle: {
      big: t({ es: "Buendía Breaker", en: "Buendía Breaker" }),
      small: t({ es: "haz clic o presiona espacio para empezar", en: "click or press space to start" }),
    },
    serving: {
      big: "",
      small: t({ es: "lanza: click / espacio — mueve: mouse o ← →", en: "launch: click / space — move: mouse or ← →" }),
    },
    paused: { big: t({ es: "Pausado", en: "Paused" }), small: t({ es: "haz clic para seguir", en: "click to resume" }) },
    over: {
      big: t({ es: "Fin del juego", en: "Game over" }),
      small: t({ es: "¿fue la culpa del skill issue? haz clic para reintentar", en: "skill issue? click to retry" }),
    },
    win: {
      big: t({ es: "¡Ganaste! ✳", en: "You win ✳" }),
      small: t({
        es: "ahora imagina esta energía en tu proyecto — haz clic para volver a jugar",
        en: "now imagine this energy on your project — click to replay",
      }),
    },
  };
  const o = overlay[phase];

  return (
    <div ref={ref} className="absolute inset-0 select-none touch-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* HUD */}
      <div className="u-label pointer-events-none absolute inset-x-4 top-3 flex items-center justify-between text-muted">
        <span>
          {t({ es: "Puntos", en: "Score" })} <span ref={scoreRef} className="text-ink">0000</span>
        </span>
        <span>
          {t({ es: "Récord", en: "Hi" })} <span className="text-ink">{String(hi).padStart(4, "0")}</span>
        </span>
        <span className="flex gap-1" aria-label={t({ es: `${lives} vidas`, en: `${lives} lives` })}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={i < lives ? "text-accent" : "text-line"}>
              ✳
            </span>
          ))}
        </span>
      </div>

      {/* state overlay */}
      {o && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-[18%] text-center">
          {o.big && (
            <p className="display bg-paper/80 px-4 py-1 text-[clamp(1.8rem,6cqw,3.2rem)] leading-none">
              {o.big}
            </p>
          )}
          <p className="u-label mt-3 bg-paper/80 px-3 py-1 text-muted">{o.small}</p>
        </div>
      )}
    </div>
  );
}
