"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";
import { useInView } from "@/lib/useInView";

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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 7;

    const group = new THREE.Group();
    scene.add(group);

    const ink = new THREE.Color("#181511");
    const accent = new THREE.Color("#dd4a12");

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
