"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useInView } from "@/lib/useInView";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform sampler2D u_tex;
  uniform vec2 u_mouse;
  uniform float u_strength;
  varying vec2 vUv;

  void main() {
    vec2 d = vUv - u_mouse;
    float dist = length(d);
    float falloff = smoothstep(0.42, 0.0, dist);
    vec2 dir = d / max(dist, 0.0001);
    vec2 uv = vUv - dir * falloff * u_strength * 0.18;

    float split = falloff * u_strength * 0.016;
    float r = texture2D(u_tex, uv + vec2(split, 0.0)).r;
    float g = texture2D(u_tex, uv).g;
    float b = texture2D(u_tex, uv - vec2(split, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

/** Draws a poster into an offscreen canvas, then melts it under the cursor. */
function drawPoster(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 768;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#ece7da";
  ctx.fillRect(0, 0, c.width, c.height);

  // accent diagonal stripes
  ctx.save();
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate(-Math.PI / 7);
  ctx.fillStyle = "rgba(221, 74, 18, 0.85)";
  for (let i = -6; i <= 6; i += 2) {
    ctx.fillRect(-c.width, i * 70, c.width * 2, 26);
  }
  ctx.restore();

  // grid
  ctx.strokeStyle = "rgba(24, 21, 17, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= c.width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, c.height);
    ctx.stroke();
  }
  for (let y = 0; y <= c.height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();
  }

  // big type
  ctx.fillStyle = "#181511";
  ctx.font = "900 200px Arial Black, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("HOVER", c.width / 2, c.height / 2 - 60);
  ctx.font = "italic 54px Georgia, serif";
  ctx.fillText("— and push the pixels around —", c.width / 2, c.height / 2 + 92);
  return c;
}

export default function Distortion() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const texture = new THREE.CanvasTexture(drawPoster());
    texture.colorSpace = THREE.SRGBColorSpace;

    const uniforms = {
      u_tex: { value: texture },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_strength: { value: 0 },
    };
    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    scene.add(quad);

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const target = new THREE.Vector2(0.5, 0.5);
    let strengthTarget = 0;
    let lastX = 0.5;
    let lastY = 0.5;

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      target.set(x, y);
      const speed = Math.hypot(x - lastX, y - lastY);
      strengthTarget = Math.min(1.6, strengthTarget + speed * 14);
      lastX = x;
      lastY = y;
    };
    const onLeave = () => {
      strengthTarget = 0;
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!activeRef.current) return;
      uniforms.u_mouse.value.lerp(target, 0.08);
      strengthTarget *= 0.96;
      uniforms.u_strength.value +=
        (strengthTarget - uniforms.u_strength.value) * 0.08;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      texture.dispose();
      quad.geometry.dispose();
      quad.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />;
}
