import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Skills from './components/Skills';
import AnimationShowcase from './components/AnimationShowcase';
import Experience from './components/Experience';
import Internship from './components/Internship';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import TechStackAnimation from './components/TechStackAnimation';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    const dot  = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0, rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.left = `${ringX}px`;
      ring.style.top  = `${ringY}px`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ReactLenis root>
      <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', overflowX: 'hidden' }}>

        {/* ── z=0  Three.js fixed background canvas (covers full page) */}
        <ThreeBackground />

        {/* ── z=9999  Custom cursor */}
        <div ref={cursorDotRef}  className="cursor-dot"  />
        <div ref={cursorRingRef} className="cursor-ring" />

        {/* ── z=100  Navigation */}
        <Navbar />

        {/* ── z=2  All page content — semi-transparent so 3D shows through */}
        <main className="site-content">
          <Hero3D />
          <About />
          <Skills />
          <AnimationShowcase />
          <Experience />
          <Internship />
          <Projects />
          <Achievements />
          <Certifications />
          <TechStackAnimation />
          <Timeline />
          <Gallery />
          <Contact />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}
