import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

const certifications = [
  {
    title: 'Artificial Intelligence Specialist',
    issuer: 'DeepLearning.AI / Coursera',
    credentialId: 'AI-928-831',
    color: '#06b6d4',
    year: '2024',
  },
  {
    title: 'Machine Learning Masterclass',
    issuer: 'Stanford Online',
    credentialId: 'ML-772-401',
    color: '#3b82f6',
    year: '2024',
  },
  {
    title: 'Autonomous Robotics & Control',
    issuer: 'MIT OpenCourseWare',
    credentialId: 'ROB-118-202',
    color: '#10b981',
    year: '2023',
  },
  {
    title: 'Drone Avionics & ESC Programming',
    issuer: 'FPV Systems Academy',
    credentialId: 'DRN-394-884',
    color: '#ff4b4b',
    year: '2023',
  },
  {
    title: 'Full Stack Web Architecture',
    issuer: 'Meta / Coursera',
    credentialId: 'WEB-401-294',
    color: '#f59e0b',
    year: '2022',
  },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.aj-reveal');
    const items   = el.querySelectorAll('.cert-item');
    reveals.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });
    items.forEach(i => { i.style.opacity = '0'; i.style.transform = 'translateY(20px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, { opacity: [0,1], translateY: [24,0], duration: 700, ease: 'outExpo', delay: stagger(70) });
          animate(items,   { opacity: [0,1], translateY: [20,0], duration: 650, ease: 'outExpo', delay: stagger(80, { start: 200 }) });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="aj-section aj-section--dark">
      <div className="aj-container">
        {/* Header */}
        <div className="aj-label aj-reveal">✦ Certifications</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <h2 className="aj-heading aj-reveal" style={{ marginBottom: 0 }}>
            Verified<br />
            <span className="aj-heading--accent">credentials.</span>
          </h2>
          <p className="aj-reveal" style={{ maxWidth: '280px', marginBottom: 0 }}>
            Certifications earned from leading global institutions and platforms.
          </p>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {certifications.map((cert, i) => (
            <div key={i} className="cert-item" style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr auto',
              alignItems: 'center',
              gap: '1.5rem',
              padding: '1.5rem 0',
              borderBottom: '1px solid var(--line)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = '0px'}
            >
              {/* Icon */}
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--r-sm)',
                background: `${cert.color}10`,
                border: `1px solid ${cert.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: cert.color, flexShrink: 0,
              }}>
                <Award size={22} />
              </div>

              {/* Info */}
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text)', marginBottom: '0.25rem' }}>
                  {cert.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.82rem', color: cert.color, fontWeight: '700' }}>{cert.issuer}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                    <ShieldCheck size={11} /> ID: {cert.credentialId}
                  </span>
                </div>
              </div>

              {/* Right: year + verify */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', fontWeight: '700' }}>{cert.year}</span>
                <a href="#" onClick={e => e.preventDefault()} style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  fontSize: '0.78rem', color: 'var(--text-3)',
                  padding: '0.35rem 0.7rem',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--r-xs)',
                  transition: 'all 0.2s',
                  fontWeight: '600',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = cert.color; e.currentTarget.style.color = cert.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
                >
                  Verify <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
