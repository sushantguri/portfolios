import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const highlights = [
  {
    title: 'AI & Computer Vision',
    desc: 'Wrote inference scripts using neural networks to process real-time video streams, identifying coordinates and targets for drone navigation systems.',
    color: '#06b6d4',
  },
  {
    title: 'Drone Control Platforms',
    desc: 'Explored drone configurations, autonomous mission programming (INAV / flight planner), and ESC tuning for precision control.',
    color: '#ff4b4b',
  },
];

export default function Internship() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.aj-reveal');
    const items   = el.querySelectorAll('.intern-item');
    reveals.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });
    items.forEach(i => { i.style.opacity = '0'; i.style.transform = 'translateY(16px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, { opacity: [0,1], translateY: [24,0], duration: 700, ease: 'outExpo', delay: stagger(70) });
          animate(items,   { opacity: [0,1], translateY: [16,0], duration: 600, ease: 'outExpo', delay: stagger(80, { start: 250 }) });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="internship" ref={sectionRef} className="aj-section aj-section--dark">
      <div className="aj-container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div className="aj-label aj-reveal">✦ Internship</div>
        <h2 className="aj-heading aj-reveal">
          Research at<br />
          <span className="aj-heading--accent">IIT KGP.</span>
        </h2>

        {/* Main panel */}
        <div className="aj-reveal" style={{
          marginTop: '2rem',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)',
          overflow: 'hidden',
          background: 'var(--bg-card)',
        }}>
          {/* Top meta bar */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start',
            gap: '1.5rem',
            padding: '2rem 2.5rem',
            borderBottom: '1px solid var(--line)',
            borderLeft: '3px solid #06b6d4',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#06b6d4', marginBottom: '0.4rem' }}>
                Research Internship
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text)', lineHeight: 1.15 }}>
                AI, Robotics & Drone Development Intern
              </h3>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-2)', marginTop: '0.25rem' }}>
                Learner Career Council (LCC)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}>
                <Calendar size={13} style={{ color: '#06b6d4' }} /> Summer Research Term
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}>
                <MapPin size={13} style={{ color: '#06b6d4' }} /> IIT Kharagpur Research Park
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-2)' }}>
                <Briefcase size={13} style={{ color: '#06b6d4' }} /> On-site
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ padding: '1.75rem 2.5rem', borderBottom: '1px solid var(--line)' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '650px' }}>
              Collaborated on bleeding-edge AI and drone-based software platforms at IIT Kharagpur Research Park. Research focused on combining computer vision models with real-time drone control systems to create smart autonomous aerial platforms.
            </p>
          </div>

          {/* Highlight panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: 'none' }}>
            {highlights.map((h, i) => (
              <div key={i} className="intern-item" style={{
                padding: '1.75rem 2.5rem',
                borderRight: i === 0 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{
                  width: 32, height: 3, borderRadius: 2,
                  background: h.color, marginBottom: '1rem',
                }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text)', marginBottom: '0.5rem' }}>{h.title}</h4>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-2)', lineHeight: 1.65 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
