import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Calendar, Award, CheckCircle2 } from 'lucide-react';

const responsibilities = [
  'Designed and prototyped advanced autonomous robotics projects.',
  'Organized major robotics events and workshops, handling budgeting and operations.',
  'Mentored junior students in Arduino development, microcontroller programming, and circuit layout.',
  'Managed technical competitions, acting as lead coordinator and project evaluator.',
  'Built autonomous maze-solving and object-tracking robotic systems.',
  'Designed custom drone racing tracks, introducing micro-FPV racing setups in student festivals.',
];

export default function Experience() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.aj-reveal');
    const items   = el.querySelectorAll('.resp-item');
    reveals.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });
    items.forEach(i => { i.style.opacity = '0'; i.style.transform = 'translateX(-12px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, { opacity: [0,1], translateY: [24,0], duration: 700, ease: 'outExpo', delay: stagger(70) });
          animate(items,   { opacity: [0,1], translateX: [-12,0], duration: 550, ease: 'outExpo', delay: stagger(65, { start: 250 }) });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="aj-section aj-section--panel">
      <div className="aj-container">
        {/* Header */}
        <div className="aj-label aj-reveal">✦ Experience</div>
        <h2 className="aj-heading aj-reveal">
          Leadership &amp;<br />
          <span className="aj-heading--accent">involvement.</span>
        </h2>

        {/* Experience card — flat panel */}
        <div className="aj-reveal" style={{
          marginTop: '2.5rem',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-lg)',
          background: 'var(--bg-card)',
          overflow: 'hidden',
        }}>
          {/* Header stripe */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            alignItems: 'flex-start', gap: '1.5rem',
            padding: '2rem 2.5rem',
            borderBottom: '1px solid var(--line)',
            borderLeft: '3px solid var(--accent)',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                Student Leadership
              </div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: '900', color: 'var(--text)', lineHeight: 1.1 }}>
                Robotics Team &amp; Event Lead
              </h3>
              <div style={{ fontSize: '1rem', color: 'var(--text-2)', marginTop: '0.3rem' }}>Robotics Club</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-2)' }}>
                <Calendar size={14} style={{ color: 'var(--accent)' }} /> 2024 – Present
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-2)' }}>
                <Award size={14} style={{ color: 'var(--accent)' }} /> Club Lead Officer
              </div>
              <div style={{
                marginTop: '0.25rem',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.08em',
                color: '#22c55e',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '20px', padding: '0.2rem 0.7rem',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                Active
              </div>
            </div>
          </div>

          {/* Responsibilities grid */}
          <div style={{ padding: '2rem 2.5rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.25rem' }}>
              Key responsibilities
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '0.85rem' }}>
              {responsibilities.map((resp, i) => (
                <div key={i} className="resp-item" style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.7rem',
                }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--accent)', marginTop: '0.15rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{resp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
