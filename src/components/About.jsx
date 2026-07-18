import { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { Brain, Cpu, Bot, Plane, Eye, Code, Wifi, Settings } from 'lucide-react';

const stats = [
  { num: 3, suffix: '+', label: 'Years Building' },
  { num: 10, suffix: '+', label: 'Projects Shipped' },
  { num: 5, suffix: '', label: 'Drones Assembled' },
  { num: 2, suffix: '', label: 'Research Internships' },
];

const interests = [
  { name: 'Artificial Intelligence', icon: Brain, color: '#ff4b4b' },
  { name: 'Machine Learning', icon: Cpu, color: '#ff6b35' },
  { name: 'Robotics', icon: Bot, color: '#a855f7' },
  { name: 'Drone Technology', icon: Plane, color: '#3b82f6' },
  { name: 'Computer Vision', icon: Eye, color: '#10b981' },
  { name: 'Web Development', icon: Code, color: '#f59e0b' },
  { name: 'IoT & Automation', icon: Wifi, color: '#06b6d4' },
  { name: 'Embedded Systems', icon: Settings, color: '#ec4899' },
];

// Count-up animation
function CountUp({ target, suffix, duration = 1400 }) {
  const elRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    el.textContent = '0' + suffix;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          const obj = { val: 0 };
          animate(obj, {
            val: [0, target],
            duration,
            ease: 'outExpo',
            onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return <span ref={elRef}>0{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.aj-reveal');
    reveals.forEach((r) => { r.style.opacity = '0'; r.style.transform = 'translateY(32px)'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(reveals, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 700,
            ease: 'outExpo',
            delay: stagger(80),
          });
        }
      },
      { threshold: 0.1, rootMargin: '-60px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="aj-section aj-section--panel">
      <div className="aj-container">
        {/* Label */}
        <div className="aj-label aj-reveal">✦ About</div>

        {/* Two-column layout */}
        <div className="aj-about__grid">
          {/* Left: bio text */}
          <div>
            <h2 className="aj-heading aj-reveal">
              Building at the<br />
              <span className="aj-heading--accent">intersection</span><br />
              of bits & atoms.
            </h2>

            <p className="aj-reveal" style={{ marginBottom: '1.5rem' }}>
              I'm a Computer Science student driven by a fascination for how software
              controls physical devices — translating numbers into real-world motion,
              from autonomous robots to high-speed FPV drones.
            </p>
            <p className="aj-reveal" style={{ marginBottom: '2.5rem' }}>
              I specialize in combining <strong style={{ color: 'var(--text)' }}>artificial intelligence</strong>,{' '}
              <strong style={{ color: 'var(--text)' }}>robotics engineering</strong>, and{' '}
              <strong style={{ color: 'var(--text)' }}>full-stack development</strong> to build
              intelligent, autonomous, responsive systems. I love working at the intersection
              of bits, bytes, sensors, microcontrollers, and FPV drone frames.
            </p>

            {/* Tech mono badge */}
            <div className="aj-reveal" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
              system_status: ACTIVE // hardware_linked: TRUE
            </div>
          </div>

          {/* Right: stats + interests */}
          <div>
            {/* Stats grid */}
            <div className="aj-reveal" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'var(--line)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--r-md)',
              overflow: 'hidden',
              marginBottom: '2.5rem',
            }}>
              {stats.map((s) => (
                <div key={s.label} style={{
                  padding: '1.75rem 1.5rem',
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem',
                }}>
                  <div className="aj-stat-number">
                    <CountUp target={s.num} suffix={s.suffix} />
                  </div>
                  <div className="aj-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Interest chips */}
            <div className="aj-reveal">
              <p style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1rem' }}>
                Areas of Focus
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {interests.map((item) => {
                  const Icon = item.icon;
                  return (
                    <span key={item.name} className="aj-interest-chip">
                      <Icon size={14} style={{ color: item.color }} />
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
