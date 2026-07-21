import { useEffect, useRef, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

/* ─── Code Block ────────────────────────────────────────────── */
function CodeBlock({ code }) {
  return (
    <pre className="anime-code-block">
      <code>{code}</code>
    </pre>
  );
}

/* ─── 1. Interactive Grid Ripple Playground (Main Feature) ──── */
function InteractiveGridPlayground() {
  const gridRef = useRef(null);
  const [easing, setEasing] = useState('easeOutElastic(1, .5)');
  const [rippleType, setRippleType] = useState('scale'); // 'scale', 'rotate', 'color', 'all'
  const [triggerMode, setTriggerMode] = useState('click'); // 'click', 'hover'
  const [gridSize] = useState({ cols: 15, rows: 8 });

  const totalCells = gridSize.cols * gridSize.rows;

  const handleCellInteract = (index, event) => {
    if (triggerMode === 'hover' && event.type !== 'mouseenter') return;
    if (triggerMode === 'click' && event.type !== 'click') return;

    const el = gridRef.current;
    if (!el) return;

    const cells = el.querySelectorAll('.playground-cell');
    
    // Animate target cells using grid stagger
    animate(cells, {
      scale: rippleType === 'scale' || rippleType === 'all' 
        ? [{ value: 0.3, duration: 0 }, { value: 1, duration: 1200 }] 
        : 1,
      rotate: rippleType === 'rotate' || rippleType === 'all'
        ? [{ value: 45, duration: 0 }, { value: 0, duration: 1500 }]
        : 0,
      backgroundColor: rippleType === 'color' || rippleType === 'all'
        ? [
            { value: 'var(--accent)', duration: 0 },
            { value: '#3b82f6', duration: 400 },
            { value: 'rgba(255,255,255,0.06)', duration: 1000 }
          ]
        : 'rgba(255,255,255,0.06)',
      delay: stagger(60, {
        grid: [gridSize.cols, gridSize.rows],
        from: index
      }),
      duration: 1200,
      ease: easing,
    });
  };

  const codeSnippet = `// anime.js 2D grid stagger ripple
animate('.cell', {
  scale: [0.3, 1],
  rotate: [45, 0],
  delay: stagger(60, {
    grid: [${gridSize.cols}, ${gridSize.rows}],
    from: ${triggerMode === 'click' ? 'clickedIndex' : 'hoveredIndex'}
  }),
  ease: '${easing}'
});`;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 340px',
      gap: '1.5rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--r-lg)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }} className="playground-container">
      
      {/* Decorative coordinate blueprint lines */}
      <div style={{
        position: 'absolute', top: 12, left: 16,
        fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)'
      }}>(0, 0)</div>
      <div style={{
        position: 'absolute', bottom: 12, right: 16,
        fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)'
      }}>({gridSize.cols}, {gridSize.rows})</div>

      {/* Grid Canvas */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: 'var(--r-md)',
        border: '1px solid var(--line)',
        padding: '2rem',
        position: 'relative',
        minHeight: '260px'
      }}>
        <div 
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            gap: '8px',
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {Array.from({ length: totalCells }).map((_, idx) => (
            <div
              key={idx}
              className="playground-cell"
              onClick={(e) => handleCellInteract(idx, e)}
              onMouseEnter={(e) => handleCellInteract(idx, e)}
              style={{
                aspectRatio: '1',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.03)',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background 0.15s, transform 0.15s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls & Snippet */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.75rem' }}>Interactive Playground</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-2)', lineHeight: 1.5, marginBottom: '1rem' }}>
            Click or hover the grid to start a 2D stagger ripple. Tweak settings to preview.
          </p>
        </div>

        {/* Easing Select */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-3)' }}>Easing Function</label>
          <select 
            value={easing} 
            onChange={(e) => setEasing(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid var(--line-bright)',
              borderRadius: 'var(--r-xs)',
              padding: '0.5rem',
              fontSize: '0.8rem',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            <option value="easeOutElastic(1, .5)">easeOutElastic (Springy)</option>
            <option value="easeOutQuad">easeOutQuad (Smooth)</option>
            <option value="easeInOutBack">easeInOutBack (Overshoot)</option>
            <option value="easeOutBounce">easeOutBounce (Bouncy)</option>
          </select>
        </div>

        {/* Effect Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-3)' }}>Ripple Effect</label>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {['scale', 'rotate', 'color', 'all'].map((t) => (
              <button
                key={t}
                onClick={() => setRippleType(t)}
                style={{
                  flex: 1,
                  padding: '0.4rem 0',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--r-xs)',
                  border: '1px solid',
                  borderColor: rippleType === t ? 'var(--accent)' : 'var(--line-bright)',
                  background: rippleType === t ? 'var(--accent-dim)' : 'transparent',
                  color: rippleType === t ? 'var(--accent)' : 'var(--text-2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger Mode */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-3)' }}>Trigger Mode</label>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {['click', 'hover'].map((m) => (
              <button
                key={m}
                onClick={() => setTriggerMode(m)}
                style={{
                  flex: 1,
                  padding: '0.4rem 0',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--r-xs)',
                  border: '1px solid',
                  borderColor: triggerMode === m ? 'var(--accent)' : 'var(--line-bright)',
                  background: triggerMode === m ? 'var(--accent-dim)' : 'transparent',
                  color: triggerMode === m ? 'var(--accent)' : 'var(--text-2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Snippet */}
        <div style={{ marginTop: 'auto' }}>
          <CodeBlock code={codeSnippet} />
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .playground-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── 2. Staggered Title Letters (Anime.js Logo Style) ──────── */
export function StaggeredText({ text, accentIndex, autoPlay = false }) {
  const lettersRef = useRef(null);

  const triggerStagger = () => {
    const el = lettersRef.current;
    if (!el) return;
    const letters = el.querySelectorAll('.stagger-char');
    animate(letters, {
      translateY: [0, -12, 0],
      scale: [1, 1.25, 1],
      color: [
        { value: 'var(--accent)', duration: 200 },
        { value: 'var(--text)', duration: 600 }
      ],
      delay: stagger(35),
      duration: 800,
      ease: 'easeOutElastic(1, .6)'
    });
  };

  useEffect(() => {
    if (!autoPlay) return;

    let intervalId;
    // Initial delay so loading animations complete first, then trigger every 5s
    const timeoutId = setTimeout(() => {
      triggerStagger();
      intervalId = setInterval(triggerStagger, 5000);
    }, 2800);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoPlay]);

  return (
    <span 
      ref={lettersRef} 
      onMouseEnter={triggerStagger} 
      style={{ display: 'inline-flex', cursor: 'default' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="stagger-char"
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            color: i === accentIndex ? 'var(--accent)' : 'inherit',
            transition: 'color 0.25s',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/* ─── 3. Elastic Spring Ball Demo ───────────────────────────── */
function SpringBallDemo() {
  const ballRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const ballPos = useRef({ x: 0, y: 0 });
  const animRef = useRef(null);

  useEffect(() => {
    const ball = ballRef.current;
    const container = containerRef.current;
    if (!ball || !container) return;

    // Default idle bounce
    const idle = animate(ball, {
      translateY: [-6, 6],
      duration: 1500,
      ease: 'easeInOutSine',
      loop: true,
      alternate: true,
    });
    animRef.current = idle;

    const onMouseDown = (e) => {
      isDragging.current = true;
      if (animRef.current) animRef.current.pause();
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Keep inside boundary bounds
      const limit = 70;
      const dx = Math.min(Math.max(x, -limit), limit);
      const dy = Math.min(Math.max(y, -limit), limit);

      ballPos.current = { x: dx, y: dy };
      ball.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      // Spring back to origin (using anime.js custom coordinates/spring simulation values)
      animRef.current = animate(ball, {
        translateX: [ballPos.current.x, 0],
        translateY: [ballPos.current.y, 0],
        duration: 900,
        ease: 'easeOutElastic(1.2, 0.4)', // highly bouncy elastic
        onComplete: () => {
          animRef.current = animate(ball, {
            translateY: [-6, 6],
            duration: 1500,
            ease: 'easeInOutSine',
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
      idle.pause();
      ball.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="anime-demo-canvas" style={{ position: 'relative', cursor: 'grab', minHeight: '190px' }}>
      <p style={{ position: 'absolute', top: '12px', textAlign: 'center', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        drag &amp; spring back
      </p>
      <div
        ref={ballRef}
        className="anime-spring-ball"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), #ff6b35)',
          boxShadow: '0 0 25px rgba(255,75,75,0.3)',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

/* ─── 4. SVG Morph Drawing Demo ─────────────────────────────── */
function SVGMorphDemo() {
  const pathRef = useRef(null);
  const [shapeIndex, setShapeIndex] = useState(0);

  // SVG path definitions for morph shapes
  const shapes = [
    'M20,70 C20,20 80,10 100,70 C120,130 180,120 180,70 C180,20 140,10 100,40 C60,70 20,120 20,70 Z', // Organic Infinity
    'M30,30 L170,30 L170,110 L30,110 Z', // Rect
    'M100,10 L180,120 L20,120 Z', // Triangle
    'M100,20 C140,20 170,50 170,90 C170,130 130,130 100,130 C70,130 30,110 30,70 C30,30 60,20 100,20 Z', // Organic blob
  ];

  const morphToNext = () => {
    const nextIdx = (shapeIndex + 1) % shapes.length;
    setShapeIndex(nextIdx);

    animate(pathRef.current, {
      d: shapes[nextIdx],
      duration: 1000,
      ease: 'easeOutElastic(1, .7)',
    });
  };

  useEffect(() => {
    // Initial draw-in dash animation
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    animate(path, {
      strokeDashoffset: 0,
      duration: 1500,
      ease: 'easeOutQuad',
    });
  }, []);

  return (
    <div className="anime-demo-canvas" style={{ flexDirection: 'column', gap: '1rem', minHeight: '190px' }}>
      <svg width="200" height="130" viewBox="0 0 200 140">
        <path
          ref={pathRef}
          d={shapes[0]}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <button 
        onClick={morphToNext}
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0.4rem 0.8rem',
          border: '1px solid var(--line-bright)',
          borderRadius: 'var(--r-xs)',
          background: 'rgba(255,255,255,0.03)',
          color: 'var(--text)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 5
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-dim)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line-bright)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      >
        Morph Shape
      </button>
    </div>
  );
}

/* ─── 5. Timeline Sequence Demo ──────────────────────────────── */
function TimelineSequenceDemo() {
  const containerRef = useRef(null);

  const startAnimation = () => {
    const el = containerRef.current;
    if (!el) return;
    const bars = el.querySelectorAll('.playground-bar');

    // Create a sequenced timeline
    const tl = createTimeline({
      loop: true
    });

    bars.forEach((bar, idx) => {
      tl.add({
        targets: bar,
        scaleX: [0, 1],
        opacity: [0.1, 1],
        duration: 400,
        ease: 'easeOutQuad',
      }, idx * 120);
    });

    tl.add({
      targets: bars,
      opacity: 0,
      scaleX: 0,
      duration: 300,
      ease: 'easeInQuad',
      delay: stagger(50)
    }, '+=600');
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const barColors = [
    { color: 'var(--accent)', width: '85%' },
    { color: '#3b82f6', width: '60%' },
    { color: '#a855f7', width: '75%' },
    { color: '#10b981', width: '50%' },
  ];

  return (
    <div ref={containerRef} className="anime-demo-canvas" style={{ flexDirection: 'column', gap: '8px', padding: '2rem', minHeight: '190px' }}>
      {barColors.map((bar, i) => (
        <div
          key={i}
          className="playground-bar"
          style={{
            height: '6px',
            width: bar.width,
            borderRadius: '3px',
            background: bar.color,
            transformOrigin: 'left center',
            opacity: 0.1,
            scaleX: 0
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Showcase Section ─────────────────────────────────── */
export default function AnimationShowcase() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll('.showcase-reveal');
    reveals.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            ease: 'easeOutExpo',
            delay: stagger(80)
          });
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="aj-section aj-section--dark">
      <div className="aj-container">
        
        {/* Header */}
        <div className="aj-label showcase-reveal">✦ Playground</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <h2 className="aj-heading showcase-reveal" style={{ marginBottom: 0 }}>
            <StaggeredText text="Interactive" accentIndex={4} /><br />
            <span className="aj-heading--accent">stagger.</span>
          </h2>
          <p className="showcase-reveal" style={{ maxWidth: '340px', marginBottom: 0 }}>
            Hover or click to play with dynamic stagger grids, spring physics, and organic vector morphing.
          </p>
        </div>

        {/* 1. Main Interactive Grid Playground */}
        <div className="showcase-reveal" style={{ marginBottom: '2rem' }}>
          <InteractiveGridPlayground />
        </div>

        {/* 2. Smaller Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          
          {/* Spring Physics Card */}
          <div className="showcase-reveal showcase-card">
            <SpringBallDemo />
            <div className="showcase-info">
              <h3 className="showcase-card-title">Spring Physics</h3>
              <p className="showcase-card-subtitle">Natural physics-based ease functions for dragging, elastic snapping, and flick releases.</p>
              <div className="showcase-tags">
                <span className="showcase-tag">Spring</span>
                <span className="showcase-tag">Elastic</span>
              </div>
            </div>
          </div>

          {/* SVG Shape Morph Card */}
          <div className="showcase-reveal showcase-card">
            <SVGMorphDemo />
            <div className="showcase-info">
              <h3 className="showcase-card-title">SVG Vector Morphing</h3>
              <p className="showcase-card-subtitle">Draw, deform, and animate complex vector paths dynamically with high performance.</p>
              <div className="showcase-tags">
                <span className="showcase-tag">SVG</span>
                <span className="showcase-tag">Morph</span>
              </div>
            </div>
          </div>

          {/* Timeline Sequence Card */}
          <div className="showcase-reveal showcase-card">
            <TimelineSequenceDemo />
            <div className="showcase-info">
              <h3 className="showcase-card-title">Sequenced Timeline</h3>
              <p className="showcase-card-subtitle">Orchestrate sequence delays, offsets, and overlaps with precise visual timeline timing.</p>
              <div className="showcase-tags">
                <span className="showcase-tag">Timeline</span>
                <span className="showcase-tag">Delay</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
