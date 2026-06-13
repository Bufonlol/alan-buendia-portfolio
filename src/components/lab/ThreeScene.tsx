"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useInView } from "@/lib/useInView";

/** Torus knot + orbiting accent core. Drag to spin with inertia. */
export default function ThreeScene() {
  const { ref, active } = useInView<HTMLDivElement>();
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 6;

    const group = new THREE.Group();
    scene.add(group);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.35, 0.4, 130, 18),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#181511"),
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
    );
    group.add(knot);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.42, 0),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#dd4a12"),
        wireframe: true,
      })
    );
    scene.add(core);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* drag-to-rotate with inertia */
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velY = (e.clientX - lastX) * 0.006;
      velX = (e.clientY - lastY) * 0.006;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
    };
    container.addEventListener("pointerdown", onDown);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerup", onUp);
    container.addEventListener("pointercancel", onUp);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!activeRef.current) return;
      const t = clock.getElapsedTime();

      group.rotation.y += velY + (dragging ? 0 : 0.0025);
      group.rotation.x += velX;
      if (!dragging) {
        velX *= 0.95; // inertia decay
        velY *= 0.95;
      }
      core.position.set(Math.cos(t * 0.9) * 2.4, Math.sin(t * 1.3) * 1.1, Math.sin(t * 0.7));
      core.rotation.y = t * 1.5;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerup", onUp);
      container.removeEventListener("pointercancel", onUp);
      knot.geometry.dispose();
      (knot.material as THREE.Material).dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      data-cursor="drag"
      className="absolute inset-0 touch-none [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
