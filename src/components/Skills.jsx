import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

// All skills organized into rows
const row1 = [
  { name: 'C++', color: '#3b82f6' },
  { name: 'Python', color: '#f59e0b' },
  { name: 'JavaScript', color: '#fbbf24' },
  { name: 'React.js', color: '#06b6d4' },
  { name: 'Node.js', color: '#22c55e' },
  { name: 'HTML5', color: '#ef4444' },
  { name: 'CSS3', color: '#3b82f6' },
  { name: 'SQL', color: '#a855f7' },
  { name: 'TensorFlow', color: '#ff6b35' },
  { name: 'Scikit-learn', color: '#f59e0b' },
];

const row2 = [
  { name: 'Arduino', color: '#06b6d4' },
  { name: 'Betaflight', color: '#ef4444' },
  { name: 'MySQL', color: '#3b82f6' },
  { name: 'MongoDB', color: '#22c55e' },
  { name: 'Git', color: '#f97316' },
  { name: 'Linux', color: '#fbbf24' },
  { name: 'Figma', color: '#a855f7' },
  { name: 'DJI Air Unit', color: '#ff4b4b' },
  { name: 'Express.js', color: '#a0a0a0' },
  { name: 'Postman', color: '#f97316' },
];

const row3 = [
  { name: 'FPV Drones', color: '#ff4b4b' },
  { name: 'Machine Learning', color: '#ec4899' },
  { name: 'Neural Networks', color: '#a855f7' },
  { name: 'NLP', color: '#3b82f6' },
  { name: 'Embedded Systems', color: '#10b981' },
  { name: 'ESC Tuning', color: '#ef4444' },
  { name: 'VS Code', color: '#06b6d4' },
  { name: 'INAV', color: '#f59e0b' },
  { name: 'Deep Learning', color: '#a855f7' },
  { name: 'Computer Vision', color: '#10b981' },
];

// Skill chip
function Chip({ name, color }) {
  return (
    <span className="aj-skill-chip">
      <span className="aj-skill-chip__dot" style={{ background: color }} />
      {name}
    </span>
  );
}

// Duplicated track for seamless loop
function MarqueeRow({ skills, reverse = false }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="aj-skill-marquee" style={{ marginBottom: '0.75rem' }}>
      <div className={`aj-skill-track ${reverse ? 'aj-skill-track--reverse' : ''}`}>
        {doubled.map((s, i) => <Chip key={`${s.name}-${i}`} name={s.name} color={s.color} />)}
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    const header = headerRef.current;
    if (!el || !header) return;

    const reveals = header.querySelectorAll('.aj-reveal');
    reveals.forEach((r) => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 700,
            ease: 'outExpo',
            delay: stagger(80),
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    { title: 'Programming', skills: ['C++', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'SQL'], color: '#06b6d4' },
    { title: 'Web Dev', skills: ['React.js', 'Node.js', 'Express.js', 'Bootstrap', 'Responsive Design'], color: '#f59e0b' },
    { title: 'AI / ML', skills: ['Machine Learning', 'Neural Networks', 'NLP', 'Deep Learning', 'TensorFlow', 'Scikit-learn'], color: '#a855f7' },
    { title: 'Hardware', skills: ['Arduino', 'Sensors', 'Embedded Systems', 'Autonomous Robots', 'FPV Drones', 'Betaflight', 'INAV'], color: '#ef4444' },
    { title: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Figma', 'Postman', 'MySQL', 'MongoDB'], color: '#10b981' },
  ];

  return (
    <section id="skills" ref={sectionRef} className="aj-section aj-section--dark">
      <div className="aj-container">
        <div ref={headerRef}>
          {/* Label */}
          <div className="aj-label aj-reveal">✦ Skills</div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '4rem' }}>
            <h2 className="aj-heading aj-reveal" style={{ marginBottom: 0 }}>
              The complete<br />
              <span className="aj-heading--accent">toolkit.</span>
            </h2>
            <p className="aj-reveal" style={{ maxWidth: '340px', marginBottom: 0, textAlign: 'right' }}>
              A broad, ever-growing set of tools across software, hardware, and AI research.
            </p>
          </div>
        </div>

        {/* Marquee rows */}
        <MarqueeRow skills={row1} reverse={false} />
        <MarqueeRow skills={row2} reverse={true} />
        <MarqueeRow skills={row3} reverse={false} />

        {/* Category breakdown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'var(--line)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-md)',
          overflow: 'hidden',
          marginTop: '3.5rem',
        }}>
          {skillCategories.map((cat) => (
            <div key={cat.title} style={{
              background: 'var(--bg-card)',
              padding: '1.5rem',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
            >
              <div style={{
                width: '28px', height: '3px',
                background: cat.color,
                borderRadius: '2px',
                marginBottom: '1rem',
                boxShadow: `0 0 8px ${cat.color}60`,
              }} />
              <h4 style={{ fontSize: '0.9rem', fontWeight: '800', letterSpacing: '-0.02em', marginBottom: '0.75rem', color: 'var(--text)' }}>
                {cat.title}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {cat.skills.map((s) => (
                  <span key={s} style={{
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    color: 'var(--text-3)',
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r-xs)',
                    padding: '0.2rem 0.5rem',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
