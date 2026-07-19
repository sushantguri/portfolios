/**
 * ThreeBackground — Full-site fixed Three.js background
 *
 * SCROLL MECHANIC:
 *   • Objects ORBIT around scene center as you scroll
 *   • Each object has its own orbital radius, speed multiplier & phase
 *   • Scroll progress (0→1 per page) drives the orbital angle
 *   • Particle field rotates with scroll too
 *
 * MOUSE MECHANIC:
 *   • Camera tilts to follow cursor (lerped, smooth)
 *   • Objects get extra self-spin toward mouse direction
 *
 * CANVAS:
 *   position: fixed, inset: 0, z-index: 0
 *   Text content scrolls above it normally
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer ───────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x060606, 1);

    /* ── Scene & Camera ─────────────────────────────────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060606, 0.015);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 250);
    camera.position.set(0, 0, 20);

    /* ── Lights ─────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const accentLight  = new THREE.PointLight(0xff4b4b, 140, 80);
    accentLight.position.set(8, 10, 10);
    scene.add(accentLight);

    const blueLight    = new THREE.PointLight(0x3b82f6, 80, 70);
    blueLight.position.set(-12, -6, 6);
    scene.add(blueLight);

    const purpleLight  = new THREE.PointLight(0xa855f7, 60, 65);
    purpleLight.position.set(2, 14, -8);
    scene.add(purpleLight);

    const cyanLight    = new THREE.PointLight(0x06b6d4, 50, 60);
    cyanLight.position.set(-8, 0, -5);
    scene.add(cyanLight);

    /* ── Wire material factory ──────────────────────────────── */
    const wire = (hex, op) => new THREE.MeshBasicMaterial({
      color: hex, wireframe: true, transparent: true, opacity: op, depthWrite: false,
    });

    /* ── Orbital objects ────────────────────────────────────── */
    /**
     * Each object orbits around the scene center.
     * orbitR    = orbital radius in X-Z plane
     * orbitY    = Y position (height)
     * orbitAngle = initial angle (radians)
     * orbitSpeed = how many full rotations per full page scroll (× 2π)
     * rotVel    = per-frame self-rotation speed {x, y}
     */
    const orbitDefs = [
      // geo,                                       mat,          orbitR  orbitY  angle   speed   rotX    rotY
      [new THREE.IcosahedronGeometry(3.2, 1),       wire(0xff4b4b, 0.45),  9.0,   1.5,  0.0,   1.0,  0.004, 0.006],
      [new THREE.TorusKnotGeometry(2.0, 0.6, 80, 14, 2, 3), wire(0x3b82f6, 0.38), 11.0,  3.5,  1.1,  0.85, 0.005, 0.004],
      [new THREE.OctahedronGeometry(2.2, 0),        wire(0xa855f7, 0.42),  8.5,  -3.0,  2.2,   1.1,  0.008, 0.006],
      [new THREE.DodecahedronGeometry(1.9, 0),      wire(0x06b6d4, 0.40), 10.0,  -2.5,  3.5,  0.90, 0.005, 0.008],
      [new THREE.TorusGeometry(2.2, 0.55, 22, 70),  wire(0xff6b35, 0.40),  7.5,   5.0,  4.7,  1.15, 0.007, 0.005],
      [new THREE.IcosahedronGeometry(1.3, 0),       wire(0x3b82f6, 0.50), 13.0,  -5.0,  5.8,  0.75, 0.010, 0.012],
      [new THREE.ConeGeometry(1.5, 3.2, 6, 1),      wire(0xff4b4b, 0.44), 12.0,   2.0,  0.8,  1.3,  0.006, 0.009],
      [new THREE.TetrahedronGeometry(1.8, 0),       wire(0xa855f7, 0.42), 14.0,   0.0,  2.5,  0.65, 0.010, 0.007],
      [new THREE.SphereGeometry(1.1, 8, 8),         wire(0xff4b4b, 0.35),  6.5,  -6.0,  1.8,  1.4,  0.009, 0.006],
      [new THREE.BoxGeometry(2.2, 2.2, 2.2),        wire(0x06b6d4, 0.36),  9.5,   6.0,  4.2,  0.80, 0.006, 0.008],
    ];

    const objects = orbitDefs.map(([geo, mat, orbitR, orbitY, angle, speed, rx, ry]) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        orbitR * Math.cos(angle),
        orbitY,
        orbitR * Math.sin(angle) - 5,
      );
      scene.add(mesh);
      return { mesh, orbitR, orbitY, orbitAngle: angle, orbitSpeed: speed, rotVel: { x: rx, y: ry } };
    });

    /* ── Particle field ─────────────────────────────────────── */
    const N = 3000;
    const pos    = new Float32Array(N * 3);
    const clrs   = new Float32Array(N * 3);
    const palette = [
      new THREE.Color(0xff4b4b),
      new THREE.Color(0x3b82f6),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xff6b35),
      new THREE.Color(0xffffff),
    ];
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      clrs[i * 3] = c.r; clrs[i * 3 + 1] = c.g; clrs[i * 3 + 2] = c.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(clrs, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08, vertexColors: true, transparent: true,
      opacity: 0.55, depthWrite: false, sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── Ring orbits (thin torus rings that orbit) ─────────── */
    const ringGeo = new THREE.TorusGeometry(18, 0.06, 4, 120);
    const ring1 = new THREE.Mesh(ringGeo, wire(0xff4b4b, 0.12));
    ring1.rotation.x = Math.PI * 0.15;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(22, 0.04, 4, 150),
      wire(0x3b82f6, 0.08)
    );
    ring2.rotation.x = Math.PI * 0.35;
    ring2.rotation.z = Math.PI * 0.1;
    scene.add(ring2);

    /* ── State ──────────────────────────────────────────────── */
    const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 };
    let scrollY = window.scrollY;
    let scrollProgress = 0; // 0→1 across page height

    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll',    onScroll,    { passive: true });
    window.addEventListener('resize',    onResize);

    /* ── Render loop ─────────────────────────────────────────── */
    const lerp = (a, b, t) => a + (b - a) * t;
    let startTime = performance.now();
    let rafId;

    // Smooth scroll angle (lerped so orbital movement is silky)
    let smoothScroll = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const t = (performance.now() - startTime) / 1000;

      /* ── Smooth scroll progress (lerp so orbit is buttery) */
      smoothScroll = lerp(smoothScroll, scrollProgress, 0.06);

      /* ── Mouse smoothing */
      mouse.cx = lerp(mouse.cx, mouse.tx, 0.05);
      mouse.cy = lerp(mouse.cy, mouse.ty, 0.05);

      /* ── Camera tilt follows mouse */
      camera.rotation.y = mouse.cx * 0.12;
      camera.rotation.x = -mouse.cy * 0.07;
      // Camera Z breathes slightly
      camera.position.z = 20 + Math.sin(t * 0.3) * 0.5;

      /* ── Objects: ORBIT around center based on scroll */
      objects.forEach((o) => {
        // Orbital angle driven by scroll + slow auto-rotation
        const orbitAngle = o.orbitAngle
          + smoothScroll * o.orbitSpeed * Math.PI * 2  // scroll drives orbit
          + t * 0.08;                                   // very slow auto-drift

        // XZ orbital position
        o.mesh.position.x = o.orbitR * Math.cos(orbitAngle);
        o.mesh.position.z = o.orbitR * Math.sin(orbitAngle) - 5;

        // Y: gentle float sine
        o.mesh.position.y = o.orbitY + Math.sin(t * 0.7 + o.orbitAngle) * 0.5;

        // Self-rotation (always spinning)
        o.mesh.rotation.x += o.rotVel.x;
        o.mesh.rotation.y += o.rotVel.y;

        // Mouse adds extra tilt
        o.mesh.rotation.z += mouse.cx * 0.006;
      });

      /* ── Particles: rotate with scroll + mouse */
      // scroll drives a full rotation
      particles.rotation.y = smoothScroll * Math.PI * 3 + t * 0.015;
      particles.rotation.x = mouse.cy * 0.08 + Math.sin(t * 0.12) * 0.05;

      /* ── Orbital rings spin with scroll */
      ring1.rotation.z = smoothScroll * Math.PI * 2 + t * 0.05;
      ring2.rotation.z = -smoothScroll * Math.PI * 1.5 + t * 0.03;
      ring1.rotation.y = mouse.cx * 0.2;
      ring2.rotation.y = -mouse.cx * 0.15;

      /* ── Pulse lights */
      accentLight.intensity = 110 + Math.sin(t * 1.6)  * 35;
      blueLight.intensity   = 65  + Math.sin(t * 1.1 + 1) * 20;
      purpleLight.intensity = 45  + Math.sin(t * 0.8 + 2) * 12;
      cyanLight.intensity   = 40  + Math.sin(t * 1.3 + 3) * 10;

      // Move accent light in a slow arc (reacts to scroll too)
      accentLight.position.x = 8 * Math.cos(t * 0.2 + smoothScroll * Math.PI);
      accentLight.position.z = 8 * Math.sin(t * 0.2 + smoothScroll * Math.PI);

      renderer.render(scene, camera);
    };
    tick();

    /* ── Cleanup ─────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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
      }}
    />
  );
}
