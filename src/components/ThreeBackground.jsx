/**
 * ThreeBackground — Optimised Full-site Three.js background
 *
 * Performance budget:
 *  • setPixelRatio(1) always          — 4× fewer pixels on Retina
 *  • 5 objects max, simple geometry   — 5 draw calls
 *  • 600 particles (BufferGeometry)   — single draw call
 *  • 1 PointLight + AmbientLight      — minimal lighting math
 *  • No fog                           — saves per-fragment cost
 *  • 60fps cap via delta-time skip    — prevents over-rendering
 *  • sceneGroup matrix once per frame — camera tilt via group
 *  • GPU-only CSS `will-change: transform` on canvas
 *
 * Scroll   → orbital revolution of all objects
 * Mouse    → camera tilt (lerped 0.05)
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer (performance-first) ───────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,      // off = major GPU win
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(1);           // ALWAYS 1 — biggest single win
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x060606, 1);

    /* ── Scene & Camera ─────────────────────────────────────── */
    const scene = new THREE.Scene();
    // No fog — saves per-fragment GPU cost

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.5,
      120
    );
    camera.position.set(0, 0, 22);

    /* ── Lights (minimal) ───────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const accentLight = new THREE.PointLight(0xff4b4b, 200, 60);
    accentLight.position.set(5, 8, 8);
    scene.add(accentLight);

    /* ── Wire material factory ──────────────────────────────── */
    const wire = (hex, op) => new THREE.MeshBasicMaterial({
      color: hex,
      wireframe: true,
      transparent: true,
      opacity: op,
      depthWrite: false,
    });

    /* ── Scene group (single matrix update per frame) ───────── */
    const group = new THREE.Group();
    scene.add(group);

    /* ── 5 Objects with orbital params ─────────────────────── */
    // [geometry, material, orbitRadius, orbitY, startAngle, orbitSpeed, selfRotX, selfRotY]
    const defs = [
      [new THREE.IcosahedronGeometry(3.0, 1),            wire(0xff4b4b, 0.50),  9.0,  1.5, 0.0,   1.0,  0.005, 0.007],
      [new THREE.TorusKnotGeometry(1.8, 0.55, 60, 8, 2, 3), wire(0x3b82f6, 0.42), 11.0,  3.0, 1.1,  0.85, 0.006, 0.004],
      [new THREE.OctahedronGeometry(2.0, 0),             wire(0xa855f7, 0.46),  8.5, -3.0, 2.2,  1.1,  0.008, 0.006],
      [new THREE.DodecahedronGeometry(1.7, 0),           wire(0x06b6d4, 0.44), 10.0, -2.5, 3.5,  0.90, 0.005, 0.008],
      [new THREE.TorusGeometry(2.0, 0.5, 14, 48),        wire(0xff6b35, 0.44),  7.5,  4.5, 4.7,  1.15, 0.007, 0.005],
    ];

    const objects = defs.map(([geo, mat, orbitR, orbitY, angle, speed, rx, ry]) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(orbitR * Math.cos(angle), orbitY, orbitR * Math.sin(angle) - 5);
      group.add(mesh);
      return { mesh, orbitR, orbitY, angle, speed, rx, ry };
    });

    /* ── Particles (600 — single draw call) ─────────────────── */
    const N = 600;
    const pPos  = new Float32Array(N * 3);
    const pClr  = new Float32Array(N * 3);
    const palette = [
      new THREE.Color(0xff4b4b),
      new THREE.Color(0x3b82f6),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xff6b35),
    ];
    for (let i = 0; i < N; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 55;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 35 - 8;
      const c = palette[i % palette.length];
      pClr[i * 3] = c.r; pClr[i * 3 + 1] = c.g; pClr[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pClr, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.10, vertexColors: true, transparent: true,
      opacity: 0.50, depthWrite: false, sizeAttenuation: true,
    }));
    group.add(particles);

    /* ── State ──────────────────────────────────────────────── */
    const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 };
    let scrollY = window.scrollY;
    let smoothScroll = 0;   // lerped 0→1 across page
    let pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll',    onScroll,    { passive: true });
    window.addEventListener('resize',    onResize,    { passive: true });

    /* ── Render loop ─────────────────────────────────────────── */
    const lerp = (a, b, t) => a + (b - a) * t;
    let startTime = performance.now();
    let rafId;

    // 60fps cap — skip frames that arrive too early
    const TARGET_MS = 1000 / 60;
    let lastTime = 0;

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);
      const delta = now - lastTime;
      if (delta < TARGET_MS - 1) return;   // skip if too soon
      lastTime = now;

      const t = (now - startTime) / 1000;

      /* Smooth inputs */
      mouse.cx = lerp(mouse.cx, mouse.tx, 0.10);
      mouse.cy = lerp(mouse.cy, mouse.ty, 0.10);
      const scrollProg = pageHeight > 0 ? scrollY / pageHeight : 0;
      smoothScroll = lerp(smoothScroll, scrollProg, 0.28);

      /* Camera tilt from mouse */
      camera.rotation.y = mouse.cx * 0.10;
      camera.rotation.x = -mouse.cy * 0.06;

      /* Orbit objects with scroll */
      objects.forEach((o) => {
        const θ = o.angle + smoothScroll * o.speed * Math.PI * 2 + t * 0.07;
        o.mesh.position.x = o.orbitR * Math.cos(θ);
        o.mesh.position.z = o.orbitR * Math.sin(θ) - 5;
        o.mesh.position.y = o.orbitY + Math.sin(t * 0.6 + o.angle) * 0.4;
        o.mesh.rotation.x += o.rx;
        o.mesh.rotation.y += o.ry;
      });

      /* Particles rotate with scroll */
      particles.rotation.y = smoothScroll * Math.PI * 2 + t * 0.012;
      particles.rotation.x = mouse.cy * 0.06;

      /* Light breathe */
      accentLight.intensity = 160 + Math.sin(t * 1.5) * 40;
      accentLight.position.x = 6 * Math.cos(t * 0.18 + smoothScroll * Math.PI);
      accentLight.position.z = 6 * Math.sin(t * 0.18 + smoothScroll * Math.PI);

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(tick);

    /* ── Cleanup ─────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('resize',    onResize);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
        willChange: 'transform',    // hint GPU compositing layer
      }}
    />
  );
}
