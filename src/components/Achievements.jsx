import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Trophy, Zap, Cpu, Compass, BookOpen, Stars, CheckCircle } from 'lucide-react';

const achievements = [
  {
    num: '01',
    title: 'Secured 2nd Position',
    desc: 'Runner-up in a national-level autonomous robotics competition against top-tier teams.',
    icon: Trophy,
    color: '#f59e0b',
  },
  {
    num: '02',
    title: 'Top 5 Final Ranking',
    desc: 'Achieved top 5 ranking in a highly competitive robotics design tournament.',
    icon: Trophy,
    color: '#06b6d4',
  },
  {
    num: '03',
    title: 'FPV Drones from Scratch',
    desc: 'Designed custom flight architectures, tuned PIDs, hand-soldered digital FPV racing quads.',
    icon: Zap,
    color: '#ff4b4b',
  },
  {
    num: '04',
    title: 'Custom Drone Racing Tracks',
    desc: 'Created obstacle-heavy racing gates and course layouts for local technical drone festivals.',
    icon: Compass,
    color: '#a855f7',
  },
  {
    num: '05',
    title: 'Multiple Robotics Projects',
    desc: 'Constructed sensor-driven obstacle-avoidance and line-following hardware systems.',
    icon: Cpu,
    color: '#10b981',
  },
  {
    num: '06',
    title: 'National Competitions',
    desc: 'Represented club at events, competing against top-tier engineering institution teams.',
    icon: Stars,
    color: '#f59e0b',
  },
  {
    num: '07',
    title: 'Technical Fest Organizer',
    desc: 'Organized and managed technical competitions and robotics event tracks for students.',
    icon: BookOpen,
    color: '#64748b',
  },
  {
    num: '08',
    title: 'AI & ML Development',
    desc: 'Built, preprocessed, and executed predictive ML pipelines and deep neural networks.',
    icon: CheckCircle,
    color: '#ec4899',
  },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.aj-reveal');
    const items   = el.querySelectorAll('.ach-item');
    reveals.forEach(r => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });
    items.forEach(i => { i.style.opacity = '0'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, { opacity: [0,1], translateY: [24,0], duration: 700, ease: 'outExpo', delay: stagger(70) });
          animate(items,   { opacity: [0,1], translateY: [16,0], duration: 600, ease: 'outExpo', delay: stagger(55, { start: 180 }) });
        }
      },
      { threshold: 0.07 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="aj-section aj-section--panel">
      <div className="aj-container">
        {/* Header */}
        <div className="aj-label aj-reveal">✦ Achievements</div>
        <h2 className="aj-heading aj-reveal">
          Highlights &amp;<br />
          <span className="aj-heading--accent">wins.</span>
        </h2>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1px',
          background: 'var(--line)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--r-md)',
          overflow: 'hidden',
          marginTop: '3rem',
        }}>
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.num} className="ach-item" style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                position: 'relative',
                transition: 'background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
              >
                {/* Number watermark */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1.25rem',
                  fontSize: '0.7rem', fontWeight: '800', fontFamily: 'var(--font-mono)',
                  color: 'var(--line-bright)', letterSpacing: '0.05em',
                }}>{a.num}</div>

                {/* Icon */}
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 'var(--r-sm)',
                  background: `${a.color}12`,
                  border: `1px solid ${a.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: a.color,
                  marginBottom: '1rem',
                }}>
                  <Icon size={18} />
                </div>

                {/* Content */}
                <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: 'var(--text)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
                  {a.desc}
                </p>

                {/* Color accent bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: a.color, opacity: 0, transition: 'opacity 0.2s',
                }}
                  className="ach-bar"
                />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .ach-item:hover .ach-bar { opacity: 0.6 !important; }
      `}</style>
    </section>
  );
}
