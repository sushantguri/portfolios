/**
 * ThreeBackground — Full-site fixed Three.js background
 *
 * • position: fixed, inset: 0, z-index: 0  →  sits behind ALL sections
 * • Wireframe geometries + 2000-particle field
 * • Mouse move  → smooth camera rotation + individual object tilt
 * • Scroll      → gentle camera drift along Y
 * • All objects float independently on sine waves
 */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ─── Renderer ─────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x060606, 1);
    renderer.shadowMap.enabled = false;

    /* ─── Scene & Camera ────────────────────────────────────── */
    const scene = new THREE.Scene();
    // gentle depth fog so far objects fade into bg
    scene.fog = new THREE.FogExp2(0x060606, 0.018);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 18);

    /* ─── Lights ────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const accentLight = new THREE.PointLight(0xff4b4b, 120, 70);
    accentLight.position.set(6, 8, 8);
    scene.add(accentLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 60, 60);
    blueLight.position.set(-10, -5, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 45, 55);
    purpleLight.position.set(0, 12, -6);
    scene.add(purpleLight);

    /* ─── Materials ─────────────────────────────────────────── */
    const mkWire = (hex, opacity) =>
      new THREE.MeshBasicMaterial({
        color: hex,
        wireframe: true,
        transparent: true,
        opacity,
        depthWrite: false,
      });

    const matRed    = mkWire(0xff4b4b, 0.22);
    const matBlue   = mkWire(0x3b82f6, 0.16);
    const matPurple = mkWire(0xa855f7, 0.14);
    const matCyan   = mkWire(0x06b6d4, 0.14);
    const matOrange = mkWire(0xff6b35, 0.18);

    /* ─── Objects ────────────────────────────────────────────── */
    // Each entry: { mesh, basePos, rotVel, floatAmp, floatSpd, floatOffset }
    const objects = [];

    const addObj = (geo, mat, x, y, z, rx, ry, fAmp, fSpd, fOff = 0) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      objects.push({ mesh, base: { x, y, z }, rotVel: { x: rx, y: ry }, floatAmp: fAmp, floatSpd: fSpd, floatOff: fOff });
    };

    // Large icosahedron — right side
    addObj(new THREE.IcosahedronGeometry(3.5, 1),  matRed,    8,   1,  -4, 0.003, 0.006, 0.35, 0.55, 0.0);
    // Torus knot — upper left
    addObj(new THREE.TorusKnotGeometry(2.2, 0.65, 80, 14, 2, 3), matBlue,  -9,  5, -6, 0.004, 0.003, 0.50, 0.70, 1.2);
    // Octahedron — lower right
    addObj(new THREE.OctahedronGeometry(2.0, 0),   matPurple,  9, -5,  0,  0.007, 0.005, 0.40, 0.90, 0.8);
    // Dodecahedron — lower left
    addObj(new THREE.DodecahedronGeometry(1.8, 0), matCyan,  -10, -4, -3, 0.004, 0.007, 0.30, 0.65, 2.0);
    // Torus — top center
    addObj(new THREE.TorusGeometry(2.0, 0.5, 20, 60), matOrange, 2, 7, -5, 0.006, 0.004, 0.45, 0.80, 0.5);
    // Small icosa — lower center
    addObj(new THREE.IcosahedronGeometry(1.2, 0),  matBlue,   -3, -7,  2, 0.008, 0.010, 0.25, 1.10, 1.8);
    // Cone — upper right
    addObj(new THREE.ConeGeometry(1.4, 3.0, 6, 1), matRed,    12,  4, -8, 0.005, 0.008, 0.35, 0.60, 3.0);
    // Tetrahedron — left mid
    addObj(new THREE.TetrahedronGeometry(1.6, 0),  matPurple, -13,  0, -2, 0.009, 0.006, 0.30, 0.95, 2.5);

    /* ─── Particle Field ────────────────────────────────────── */
    const N = 2400;
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);
    const palette   = [
      new THREE.Color(0xff4b4b),
      new THREE.Color(0x3b82f6),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xff6b35),
    ];
    for (let i = 0; i < N; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* ─── Mouse & Scroll State ───────────────────────────────── */
    // Normalized -1…1
    const mouse = {
      targetX: 0, targetY: 0,
      currentX: 0, currentY: 0,
    };
    // Scene group for mouse rotation
    const sceneGroup = new THREE.Group();
    objects.forEach(o => {
      scene.remove(o.mesh);
      sceneGroup.add(o.mesh);
    });
    scene.remove(particles);
    sceneGroup.add(particles);
    scene.add(sceneGroup);

    const handleMouseMove = (e) => {
      // -1 to +1 normalized
      mouse.targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll camera drift
    let scrollY = window.scrollY;
    const handleScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ─── Resize ─────────────────────────────────────────────── */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    /* ─── Render Loop ────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let rafId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      /* Smooth mouse follow */
      mouse.currentX = lerp(mouse.currentX, mouse.targetX, 0.04);
      mouse.currentY = lerp(mouse.currentY, mouse.targetY, 0.04);

      /* Rotate entire scene group based on mouse position */
      sceneGroup.rotation.y = mouse.currentX * 0.35;   // left-right pan
      sceneGroup.rotation.x = -mouse.currentY * 0.20;  // up-down tilt

      /* Per-object self-rotation + float */
      objects.forEach((o) => {
        o.mesh.rotation.x += o.rotVel.x;
        o.mesh.rotation.y += o.rotVel.y;

        // Extra mouse-driven spin on top of auto-rotation
        o.mesh.rotation.z += mouse.currentX * 0.008;

        // Float along Y
        o.mesh.position.y = o.base.y + Math.sin(t * o.floatSpd + o.floatOff) * o.floatAmp;
      });

      /* Particles slowly drift + mouse x tilts them */
      particles.rotation.y = t * 0.018 + mouse.currentX * 0.15;
      particles.rotation.x = t * 0.008 - mouse.currentY * 0.10;

      /* Camera scroll parallax — move camera up as user scrolls */
      const targetCamY = -scrollY * 0.003;
      camera.position.y = lerp(camera.position.y, targetCamY, 0.05);

      /* Pulse accent light */
      accentLight.intensity = 90 + Math.sin(t * 1.8) * 30;
      blueLight.intensity   = 50 + Math.sin(t * 1.2 + 1) * 15;
      purpleLight.intensity = 35 + Math.sin(t * 0.9 + 2) * 10;

      renderer.render(scene, camera);
    };
    tick();

    /* ─── Cleanup ─────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
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
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
