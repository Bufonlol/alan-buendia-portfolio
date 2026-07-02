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
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform vec2 u_res;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 3.0;
    uv.x *= u_res.x / u_res.y;
    float t = u_time * 0.12;

    // domain warping — Iñigo Quílez style
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(uv + 3.5 * q + vec2(1.7, 9.2) + u_mouse * 2.0),
      fbm(uv + 3.5 * q + vec2(8.3, 2.8))
    );
    float f = fbm(uv + 3.5 * r);

    vec3 paper  = vec3(0.953, 0.937, 0.902);
    vec3 accent = vec3(0.867, 0.290, 0.071);
    vec3 ink    = vec3(0.094, 0.082, 0.067);

    vec3 col = mix(paper, accent, smoothstep(0.25, 0.78, f));
    col = mix(col, ink, smoothstep(0.5, 0.95, q.y * f) * 0.9);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/** Fullscreen-quad fragment shader: domain-warped fbm, stirred by the cursor. */
export default function ShaderGradient() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
      if (!renderer.getContext()) throw new Error("no WebGL context");
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_res: { value: new THREE.Vector2(1, 1) },
    };
    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    );
    scene.add(quad);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.u_res.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const mouseTarget = new THREE.Vector2(0, 0);
    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      mouseTarget.set(
        ((e.clientX - r.left) / r.width - 0.5) * 2,
        ((e.clientY - r.top) / r.height - 0.5) * -2
      );
    };
    container.addEventListener("pointermove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!activeRef.current) return;
      uniforms.u_time.value = clock.getElapsedTime();
      uniforms.u_mouse.value.lerp(mouseTarget, 0.04);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      quad.geometry.dispose();
      quad.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />;
}
