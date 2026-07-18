/**
 * AnimationShowcase — anime.js feature showcase section
 * Inspired by animejs.com feature grid: live animated demos + code snippet alongside.
 */
import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline, createSpring, onScroll } from 'animejs';
import { useStaggerReveal } from '../hooks/useScrollAnime';

/* ─── Code Snippet Display ────────────────────────────────────────────── */
function CodeBlock({ code }) {
  return (
    <pre className="anime-code-block">
      <code>{code}</code>
    </pre>
  );
}

/* ─── Demo 1: Staggered Rotating Boxes ───────────────────────────────── */
function RotatingBoxesDemo() {
  const containerRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const boxes = el.querySelectorAll('.anime-box');

    const anim = animate(boxes, {
      rotate: { from: 0, to: 360 },
      scale: { from: 0.5, to: 1 },
      opacity: { from: 0, to: 1 },
      delay: stagger(120),
      duration: 1200,
      ease: 'inOutExpo',
      loop: true,
      alternate: true,
    });

    return () => anim.pause();
  }, []);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  return (
    <div ref={containerRef} className="anime-demo-canvas">
      <div className="anime-boxes-grid">
        {colors.map((color, i) => (
          <div
            key={i}
            className="anime-box"
            style={{ background: color, boxShadow: `0 0 20px ${color}60` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Demo 2: Stagger Grid Ripple ────────────────────────────────────── */
function StaggerGridDemo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const dots = el.querySelectorAll('.anime-dot');

    const tl = createTimeline({ loop: true });
    tl.add(dots, {
      scale: [1, 1.5, 1],
      opacity: [0.3, 1, 0.3],
      ease: 'inOutSine',
      duration: 800,
      delay: stagger(60, { grid: [7, 5], from: 'center' }),
    });

    return () => tl.pause();
  }, []);

  return (
    <div ref={containerRef} className="anime-demo-canvas">
      <div className="anime-dots-grid">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="anime-dot" />
        ))}
      </div>
    </div>
  );
}

/* ─── Demo 3: SVG Path Drawing ───────────────────────────────────────── */
function SVGPathDemo() {
  const pathRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    path.style.strokeDasharray = totalLength;
    path.style.strokeDashoffset = totalLength;

    const anim = animate(path, {
      strokeDashoffset: [totalLength, 0],
      duration: 2400,
      ease: 'inOutExpo',
      loop: true,
      alternate: true,
    });

    return () => anim.pause();
  }, []);

  return (
    <div className="anime-demo-canvas" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg ref={svgRef} width="200" height="140" viewBox="0 0 200 140">
        <path
          ref={pathRef}
          d="M20,70 C20,20 80,10 100,70 C120,130 180,120 180,70 C180,20 140,10 100,40 C60,70 20,120 20,70 Z"
          fill="none"
          stroke="url(#svgGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="svgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Demo 4: Spring Bounce Ball ────────────────────────────────────── */
function SpringBallDemo() {
  const ballRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const ballPos = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    const container = containerRef.current;
    if (!ball || !container) return;

    // Idle float animation
    const idleAnim = animate(ball, {
      translateY: [-8, 8],
      duration: 1800,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    });
    animRef.current = idleAnim;

    const onMouseDown = (e) => {
      isDragging.current = true;
      const rect = ball.getBoundingClientRect();
      startPos.current = { x: e.clientX - rect.left - rect.width / 2, y: e.clientY - rect.top - rect.height / 2 };
      if (animRef.current) animRef.current.pause();
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const containerRect = container.getBoundingClientRect();
      const x = e.clientX - containerRect.left - containerRect.width / 2;
      const y = e.clientY - containerRect.top - containerRect.height / 2;
      ballPos.current = { x, y };
      ball.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      animRef.current = animate(ball, {
        translateX: [ballPos.current.x, 0],
        translateY: [ballPos.current.y, 0],
        ease: createSpring({ stiffness: 120, damping: 8 }),
        duration: 1000,
        onComplete: () => {
          animRef.current = animate(ball, {
            translateY: [-8, 8],
            duration: 1800,
            ease: 'inOutSine',
            loop: true,
            alternate: true,
          });
        }
      });
    };

    ball.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      idleAnim.pause();
      ball.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="anime-demo-canvas" style={{ position: 'relative', cursor: 'grab' }}>
      <p style={{ position: 'absolute', top: '12px', left: 0, right: 0, textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        drag &amp; release
      </p>
      <div
        ref={ballRef}
        className="anime-spring-ball"
        style={{ userSelect: 'none' }}
      />
    </div>
  );
}

/* ─── Demo 5: Timeline Sequence ─────────────────────────────────────── */
function TimelineSequenceDemo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const bars = el.querySelectorAll('.anime-bar');

    const tl = createTimeline({ loop: true, loopDelay: 800 });
    bars.forEach((bar, i) => {
      tl.add(bar, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 600,
        ease: 'outExpo',
      }, i * 150);
    });
    tl.add(bars, {
      opacity: [1, 0],
      duration: 400,
      ease: 'inQuad',
      delay: stagger(60),
    }, '+=400');

    return () => tl.pause();
  }, []);

  const barColors = [
    { color: '#06b6d4', width: '85%' },
    { color: '#a855f7', width: '60%' },
    { color: '#ec4899', width: '75%' },
    { color: '#f59e0b', width: '50%' },
    { color: '#10b981', width: '90%' },
  ];

  return (
    <div ref={containerRef} className="anime-demo-canvas" style={{ justifyContent: 'center', gap: '10px', flexDirection: 'column', padding: '1.5rem 2rem' }}>
      {barColors.map((bar, i) => (
        <div
          key={i}
          className="anime-bar"
          style={{
            height: '8px',
            width: bar.width,
            borderRadius: '4px',
            background: `linear-gradient(to right, ${bar.color}, ${bar.color}80)`,
            boxShadow: `0 0 10px ${bar.color}60`,
            transformOrigin: 'left center',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Data ────────────────────────────────────────────────────── */
const showcaseItems = [
  {
    id: 'stagger',
    title: 'Advanced Staggering',
    subtitle: 'Create stunning effects in seconds with the built-in Stagger utility.',
    tags: ['Rotate', 'Scale', 'Opacity', 'Loop'],
    code: `animate('.box', {\n  rotate: 360,\n  scale: [0.5, 1],\n  delay: stagger(120),\n  ease: 'inOutExpo',\n  loop: true,\n});`,
    Demo: RotatingBoxesDemo,
  },
  {
    id: 'grid',
    title: 'Grid Ripple Effect',
    subtitle: 'Stagger across a 2D grid from any origin — center, corner, or random.',
    tags: ['Grid', 'From center', 'Timeline'],
    code: `createTimeline({ loop: true })\n  .add(dots, {\n    scale: [1, 1.5, 1],\n    delay: stagger(60, {\n      grid: [7, 5],\n      from: 'center',\n    }),\n  });`,
    Demo: StaggerGridDemo,
  },
  {
    id: 'svg',
    title: 'SVG Path Drawing',
    subtitle: 'Draw, morph and animate SVG paths with pixel-perfect precision.',
    tags: ['SVG', 'strokeDashoffset', 'Loop'],
    code: `animate(path, {\n  strokeDashoffset:\n    [totalLength, 0],\n  duration: 2400,\n  ease: 'inOutExpo',\n  loop: true,\n  alternate: true,\n});`,
    Demo: SVGPathDemo,
  },
  {
    id: 'spring',
    title: 'Spring Physics',
    subtitle: 'Natural spring-based motion for drag, snap, flick and release interactions.',
    tags: ['Spring', 'Draggable', 'Physics'],
    code: `animate(ball, {\n  translateX: [dx, 0],\n  translateY: [dy, 0],\n  ease: createSpring({\n    stiffness: 120,\n    damping: 8,\n  }),\n});`,
    Demo: SpringBallDemo,
  },
  {
    id: 'timeline',
    title: 'Timeline Orchestration',
    subtitle: 'Sequence complex animations with absolute or relative time positions.',
    tags: ['Timeline', 'Sequence', 'Loop'],
    code: `const tl = createTimeline({\n  loop: true,\n});\nbars.forEach((bar, i) => {\n  tl.add(bar, {\n    scaleX: [0, 1],\n    ease: 'outExpo',\n  }, i * 150);\n});`,
    Demo: TimelineSequenceDemo,
  },
];

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function AnimationShowcase() {
  const gridRef = useStaggerReveal({ delay: 100, duration: 800, translateY: 40 });

  return (
    <section
      id="animation-showcase"
      style={{
        padding: '7rem 1.5rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient bg orbs */}
      <div className="showcase-orb showcase-orb-1" />
      <div className="showcase-orb showcase-orb-2" />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="anime-section-label">
            <span>✦</span> Powered by anime.js
          </div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            <span>The Complete Animator's Toolbox</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '540px', margin: '0 auto' }}>
            Break free from browser limitations and animate anything on the web with a single API.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem',
          }}
          className="showcase-grid"
        >
          {showcaseItems.map(({ id, title, subtitle, tags, code, Demo }) => (
            <div key={id} className="showcase-card">
              {/* Live Demo */}
              <div className="showcase-demo-area">
                <Demo />
              </div>

              {/* Code Snippet */}
              <div className="showcase-code-area">
                <CodeBlock code={code} />
              </div>

              {/* Info */}
              <div className="showcase-info">
                <h3 className="showcase-card-title">{title}</h3>
                <p className="showcase-card-subtitle">{subtitle}</p>
                <div className="showcase-tags">
                  {tags.map((tag) => (
                    <span key={tag} className="showcase-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA — npm install pill */}
        <div className="anime-npm-pill-wrap">
          <div className="anime-npm-pill">
            <span className="npm-pill-dollar">$</span>
            <span className="npm-pill-cmd">npm i animejs</span>
            <button
              className="npm-pill-copy"
              onClick={() => navigator.clipboard?.writeText('npm i animejs')}
              title="Copy to clipboard"
            >
              ⧉
            </button>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
            A fast and flexible JavaScript library to animate the web.
          </p>
        </div>
      </div>

      <style>{`
        /* ─── Ambient Orbs ─────────────────────────────────── */
        .showcase-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
        }
        .showcase-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .showcase-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }

        /* ─── Section Label ─────────────────────────────────── */
        .anime-section-label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--clr-cyan);
          background: rgba(6,182,212,0.08);
          border: 1px solid rgba(6,182,212,0.2);
          border-radius: 20px;
          padding: 0.35rem 1rem;
          margin-bottom: 1.2rem;
        }

        /* ─── Showcase Card ─────────────────────────────────── */
        .showcase-card {
          background: rgba(15,23,42,0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .showcase-card:hover {
          border-color: rgba(6,182,212,0.3);
          box-shadow: 0 8px 40px rgba(6,182,212,0.08);
          transform: translateY(-4px);
        }

        /* ─── Demo Area ─────────────────────────────────────── */
        .anime-demo-canvas {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
          background: rgba(2,6,23,0.6);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }

        /* ─── Boxes ─────────────────────────────────────────── */
        .anime-boxes-grid {
          display: grid;
          grid-template-columns: repeat(3, 32px);
          gap: 10px;
        }
        .anime-box {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          opacity: 0;
        }

        /* ─── Dots ──────────────────────────────────────────── */
        .anime-dots-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
          padding: 1rem;
        }
        .anime-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--clr-cyan);
          opacity: 0.3;
          justify-self: center;
        }

        /* ─── Spring Ball ───────────────────────────────────── */
        .anime-spring-ball {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple));
          box-shadow: 0 0 30px rgba(6,182,212,0.4);
          cursor: grab;
          transition: transform 0.05s ease;
        }
        .anime-spring-ball:active { cursor: grabbing; }

        /* ─── Code Block ────────────────────────────────────── */
        .showcase-code-area {
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(3,7,18,0.7);
        }
        .anime-code-block {
          margin: 0;
          padding: 0;
          font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', monospace);
          font-size: 0.72rem;
          line-height: 1.6;
          color: #94a3b8;
          white-space: pre;
          overflow-x: auto;
        }
        .anime-code-block code {
          color: inherit;
          background: none;
          display: block;
        }

        /* ─── Info ──────────────────────────────────────────── */
        .showcase-info {
          padding: 1.25rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }
        .showcase-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }
        .showcase-card-subtitle {
          font-size: 0.83rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
        .showcase-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.6rem;
        }
        .showcase-tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          background: rgba(6,182,212,0.08);
          border: 1px solid rgba(6,182,212,0.18);
          color: var(--clr-cyan);
        }

        /* ─── npm pill ──────────────────────────────────────── */
        .anime-npm-pill-wrap {
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .anime-npm-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(15,23,42,0.8);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 0.85rem 1.5rem;
          font-family: var(--font-mono, monospace);
          font-size: 1rem;
          backdrop-filter: blur(12px);
          transition: border-color 0.3s;
        }
        .anime-npm-pill:hover {
          border-color: rgba(6,182,212,0.4);
        }
        .npm-pill-dollar {
          color: var(--clr-cyan);
          opacity: 0.6;
          user-select: none;
        }
        .npm-pill-cmd {
          color: var(--text-primary);
          letter-spacing: 0.04em;
        }
        .npm-pill-copy {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          color: var(--text-secondary);
          padding: 0.1rem 0.45rem;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .npm-pill-copy:hover {
          background: rgba(6,182,212,0.15);
          color: var(--clr-cyan);
        }

        /* ─── Responsive ────────────────────────────────────── */
        @media (max-width: 480px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
