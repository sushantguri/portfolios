/**
 * Hero3D — Full-screen hero CONTENT overlay.
 * The actual 3D scene lives in <ThreeBackground /> (fixed, z=0).
 * This component is just the text + CTA that sit above it.
 */
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { StaggeredText } from './AnimationShowcase';

export default function Hero3D() {
  const labelRef    = useRef(null);
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef  = useRef(null);
  const scrollRef   = useRef(null);

  // ── Entrance animations ─────────────────────────────────────
  useEffect(() => {
    // Label
    animate(labelRef.current, {
      opacity: [0, 1], translateY: [16, 0],
      duration: 700, ease: 'outExpo', delay: 400,
    });
    // Title lines stagger
    const lines = titleRef.current?.querySelectorAll('.hero-line');
    if (lines) {
      animate(lines, {
        opacity: [0, 1], translateY: [50, 0],
        duration: 900, ease: 'outExpo',
        delay: stagger(130, { start: 550 }),
      });
    }
    // Subtitle
    animate(subtitleRef.current, {
      opacity: [0, 1], translateY: [20, 0],
      duration: 700, ease: 'outExpo', delay: 900,
    });
    // Action row
    animate(actionsRef.current, {
      opacity: [0, 1], translateY: [16, 0],
      duration: 600, ease: 'outExpo', delay: 1100,
    });
    // Scroll indicator
    animate(scrollRef.current, {
      opacity: [0, 1], duration: 500, ease: 'outQuad', delay: 1500,
    });
  }, []);

  const copyNpm = () => navigator.clipboard?.writeText('npm i animejs');

  return (
    <section
      id="home"
      className="aj-hero"
      style={{ background: 'transparent' }}   /* transparent — ThreeBackground shows through */
    >
      {/* Soft vignette so text stays readable over 3D */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 70% at 30% 60%, transparent 30%, rgba(6,6,6,0.65) 100%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Bottom gradient fade into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '180px',
        background: 'linear-gradient(to bottom, transparent, rgba(6,6,6,0.9))',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* ── Hero text ─────────────────────────────────────────── */}
      <div className="aj-hero__content" style={{ zIndex: 3 }}>

        {/* Status label */}
        <div ref={labelRef} className="aj-hero__label" style={{ opacity: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', boxShadow: '0 0 8px var(--accent)' }} />
          Computer Science · AI · Robotics · FPV Drones
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="aj-hero__title" style={{ opacity: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="hero-line" style={{ display: 'block', opacity: 0 }}>
            <StaggeredText text="Sushant" autoPlay={true} />
          </span>
          <span className="hero-line aj-hero__title-accent" style={{ display: 'block', opacity: 0 }}>
            <StaggeredText text="Guri." autoPlay={true} />
          </span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="aj-hero__subtitle" style={{ opacity: 0 }}>
          Building intelligent systems at the intersection of AI,&nbsp;
          robotics and full-stack engineering.&nbsp;
          Turning bits into real-world motion.
        </p>

        {/* CTA row */}
        <div ref={actionsRef} className="aj-hero__actions" style={{ opacity: 0 }}>
          <a href="#projects" className="aj-btn aj-btn--primary">
            View Projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          <button className="aj-hero__code-pill" onClick={copyNpm}>
            <span className="aj-hero__code-pill--dollar">$</span>
            <span>npm i animejs</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>

          <a href="#contact" className="aj-btn aj-btn--outline">
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="aj-hero__scroll" style={{ opacity: 0 }}>
        <span className="aj-hero__scroll-text">Scroll</span>
        <div className="aj-hero__scroll-line" />
      </div>
    </section>
  );
}
