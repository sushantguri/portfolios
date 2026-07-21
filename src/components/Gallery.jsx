import { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { Cpu, Plane, Zap, Users, Terminal, Layers, ZoomIn } from 'lucide-react';
import { StaggeredText } from './StaggeredText';

const galleryItems = [
  {
    title: 'Robotics Competitions',
    desc: 'National tournaments and arenas where autonomous bots compete.',
    icon: Cpu,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.02))',
    gridArea: 'span 1',
  },
  {
    title: 'FPV Drone Assembly',
    desc: 'Sourcing frames, soldering flight boards, and calibrating esc.',
    icon: Plane,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.02))',
    gridArea: 'span 2',
  },
  {
    title: 'Drone Races',
    desc: 'High-speed cinematic gates and tracks designed for FPV racers.',
    icon: Zap,
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.02))',
    gridArea: 'span 1',
  },
  {
    title: 'Technical Events',
    desc: 'Lectures, tech fests, and student mentoring sessions in the club.',
    icon: Users,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02))',
    gridArea: 'span 1',
  },
  {
    title: 'Coding Projects',
    desc: 'Deep learning scripts, full-stack models, and server routing.',
    icon: Terminal,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(6, 182, 212, 0.02))',
    gridArea: 'span 1',
  },
  {
    title: 'Autonomous System Projects',
    desc: 'Interfacing microchips with optical sensors and chassis drivers.',
    icon: Layers,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.02))',
    gridArea: 'span 2',
  },
];

export default function Gallery() {
  const gridRef = useRef(null);
  const observerRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.gallery-card');
    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px) scale(0.97)';
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(cards, {
            opacity: [0, 1],
            translateY: [24, 0],
            scale: [0.97, 1],
            duration: 700,
            ease: 'outExpo',
            delay: stagger(80),
          });
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    observerRef.current.observe(grid);

    return () => observerRef.current?.disconnect();
  }, []);

  // Hover: lift card via anime.js
  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const color = card.dataset.color;
    animate(card, {
      translateY: -6,
      boxShadow: [`0 0 0px transparent`, `0 12px 40px ${color}25`],
      duration: 300,
      ease: 'outQuad',
    });
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const color = card.dataset.color;
    animate(card, {
      translateY: 0,
      boxShadow: [`0 12px 40px ${color}25`, `0 0 0px transparent`],
      duration: 400,
      ease: 'outQuad',
    });
  };

  return (
    <section
      id="gallery"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section title */}
        <div className="aj-label">✦ Gallery</div>
        <h2 className="aj-heading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <StaggeredText text="Portfolio" />
          <span className="aj-heading--accent">
            <StaggeredText text="gallery." />
          </span>
        </h2>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
          }}
          className="gallery-grid"
        >
          {galleryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-color={item.color}
                className="glass-card gallery-card"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  '--card-color': item.color,
                  '--card-glow': `${item.color}15`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '280px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {/* Visual Graphic Area */}
                <div
                  style={{
                    flexGrow: 1,
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    overflow: 'hidden',
                  }}
                  className="card-visual"
                >
                  {/* Cyber Grid Accent Lines */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                      opacity: 0.3,
                    }}
                  />

                  {/* Node Connections Vector Accent in SVG */}
                  <svg 
                    width="100%" 
                    height="100%" 
                    style={{ position: 'absolute', opacity: 0.25, pointerEvents: 'none' }}
                  >
                    <line x1="10%" y1="20%" x2="40%" y2="80%" stroke={item.color} strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="40%" y1="80%" x2="90%" y2="40%" stroke={item.color} strokeWidth="1.5" />
                    <line x1="90%" y1="40%" x2="60%" y2="10%" stroke={item.color} strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="10%" cy="20%" r="3" fill={item.color} />
                    <circle cx="40%" cy="80%" r="4" fill={item.color} />
                    <circle cx="90%" cy="40%" r="3.5" fill={item.color} />
                  </svg>

                  {/* Icon */}
                  <Icon size={44} style={{ color: item.color, position: 'relative', zIndex: 1, filter: `drop-shadow(0 0 8px ${item.color}50)` }} />

                  {/* Hover magnifying glass */}
                  <div className="zoom-indicator">
                    <ZoomIn size={20} />
                  </div>
                </div>

                {/* Info Text Area */}
                <div
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(2, 6, 23, 0.4)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .gallery-card:hover {
          border-color: var(--card-color) !important;
        }
        
        .zoom-indicator {
          position: absolute;
          width: 36px;
          height: 36px;
          background: rgba(0,0,0,0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
          transform: scale(0.8);
          z-index: 5;
        }

        .gallery-card:hover .zoom-indicator {
          opacity: 1;
          transform: scale(1);
        }

        .gallery-card:hover .card-visual svg {
          opacity: 0.45 !important;
        }
      `}</style>
    </section>
  );
}
