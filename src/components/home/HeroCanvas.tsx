"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

// Ashima Arts / Stefan Gustavson classic simplex noise (public domain), inlined — no package.
const SIMPLEX_NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const SHADER_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SHADER_FRAGMENT = /* glsl */ `
uniform float uTime;
uniform vec2 uPointer;
uniform vec3 uInk;
uniform vec3 uPaper;
uniform vec3 uAccent;
varying vec2 vUv;
${SIMPLEX_NOISE_GLSL}
void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  vec2 warp = uv + uPointer * 0.5 * smoothstep(1.2, 0.0, length(uv - uPointer));
  float n = snoise(vec3(warp * 1.6, uTime * 0.06));
  n = n * 0.5 + 0.5;
  vec3 color = mix(uPaper, uInk, smoothstep(0.35, 0.65, n));
  color = mix(color, uAccent, smoothstep(0.75, 0.95, n) * 0.4);
  float alpha = smoothstep(0.2, 0.6, n) * 0.14;
  gl_FragColor = vec4(color, alpha);
}
`;

/**
 * Lightweight hero scene: a slowly drifting wireframe icosahedron
 * with an accent core and a halo of points. Pauses off-screen,
 * renders a single static frame under prefers-reduced-motion.
 */
export default function HeroCanvas() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reduced = prefersReducedMotion();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      // Some browsers/sandboxes report success but hand back a dead context.
      if (!renderer.getContext()) throw new Error("no WebGL context");
    } catch {
      // WebGL unavailable (disabled, blocklisted GPU, sandboxed environment) — skip the
      // 3D hero entirely rather than crash; the rest of the page works fine without it.
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 7;

    const ink = new THREE.Color("#181511");
    const accent = new THREE.Color("#dd4a12");
    const paper = new THREE.Color("#f3efe6");

    // Ambient noise field, sits behind the icosahedron group (z=-3 vs camera z=7, group z=0)
    const shaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uInk: { value: ink },
        uPaper: { value: paper },
        uAccent: { value: accent },
      },
      vertexShader: SHADER_VERTEX,
      fragmentShader: SHADER_FRAGMENT,
      transparent: true,
      depthWrite: false,
    });
    const shaderPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), shaderMat);
    shaderPlane.position.z = -3;
    scene.add(shaderPlane);

    const group = new THREE.Group();
    scene.add(group);

    const outer = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.4, 1)),
      new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: 0.16 })
    );
    group.add(outer);

    const core = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.05, 0)),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.55 })
    );
    group.add(core);

    const ptCount = 140;
    const positions = new Float32Array(ptCount * 3);
    for (let i = 0; i < ptCount; i++) {
      const v = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(3 + Math.random() * 0.9);
      positions.set([v.x, v.y, v.z], i * 3);
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      ptGeo,
      new THREE.PointsMaterial({ color: ink, size: 0.025, transparent: true, opacity: 0.35 })
    );
    group.add(points);

    const layout = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const mobile = w < 768;
      group.position.set(mobile ? 0 : 1.7, mobile ? 0.7 : 0, 0);
      group.scale.setScalar(mobile ? 0.72 : 1);

      // Fullscreen fragment shaders are fill-rate expensive on mobile GPUs — skip entirely there.
      shaderPlane.visible = !mobile;
      if (!mobile) {
        const distance = camera.position.z - shaderPlane.position.z;
        const planeHeight = 2 * distance * Math.tan((camera.fov * Math.PI) / 360);
        shaderPlane.scale.set(planeHeight * camera.aspect, planeHeight, 1);
      }
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(container);

    const pointerTarget = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointerTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    const clock = new THREE.Clock();
    let drift = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!activeRef.current) return; // paused off-screen / hidden tab
      const dt = clock.getDelta();
      const t = clock.elapsedTime;
      shaderMat.uniforms.uTime.value = t;
      shaderMat.uniforms.uPointer.value.set(pointerTarget.x, pointerTarget.y);
      drift += dt * 0.12;
      group.rotation.y = drift + pointerTarget.x * 0.22;
      group.rotation.x = Math.sin(t * 0.18) * 0.12 + pointerTarget.y * 0.18;
      core.rotation.y = -drift * 2.2;
      core.rotation.z = drift * 1.4;
      points.rotation.y = -drift * 0.4;
      group.position.y += (Math.sin(t * 0.5) * 0.14 - group.position.y) * 0.04;
      renderer.render(scene, camera);
    };

    if (reduced) {
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          const m = obj.material;
          if (Array.isArray(m)) m.forEach((x) => x.dispose());
          else m.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full"
      aria-hidden="true"
    />
  );
}
