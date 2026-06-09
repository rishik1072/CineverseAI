"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CinematicParticles() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 850;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 420;
      positions[i + 1] = (Math.random() - 0.5) * 260;
      positions[i + 2] = (Math.random() - 0.5) * 260;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#67e8f9"),
      size: 0.7,
      transparent: true,
      opacity: 0.34,
      depthWrite: false
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    let raf = 0;
    const animate = () => {
      frame += 0.0035;
      points.rotation.y = frame;
      points.rotation.x = Math.sin(frame * 0.7) * 0.12;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden />;
}
