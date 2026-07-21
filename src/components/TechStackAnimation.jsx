import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { 
  GitBranch, Database, Cpu, Layers, HardDrive, Terminal, Shield, Workflow, Eye
} from 'lucide-react';
import { StaggeredText } from './AnimationShowcase';

const PythonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M16 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

const ReactIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const DockerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="10" width="8" height="4" rx="1" />
    <rect x="12" y="10" width="10" height="4" rx="1" />
    <rect x="7" y="5" width="4" height="3" rx="1" />
    <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
  </svg>
);

const row1 = [
  { name: 'Python', icon: PythonIcon, color: '#3b82f6' },
  { name: 'React.js', icon: ReactIcon, color: '#06b6d4' },
  { name: 'Node.js', icon: Layers, color: '#10b981' },
  { name: 'Git version', icon: GitBranch, color: '#f97316' },
  { name: 'MongoDB', icon: Database, color: '#22c55e' },
];

const row2 = [
  { name: 'Arduino', icon: Cpu, color: '#06b6d4' },
  { name: 'TensorFlow', icon: HardDrive, color: '#ff6b35' },
  { name: 'OpenCV', icon: Eye, color: '#a855f7' },
  { name: 'Docker', icon: DockerIcon, color: '#3b82f6' },
  { name: 'Linux OS', icon: Terminal, color: '#f59e0b' },
];

function TechCard({ tech }) {
  const Icon = tech.icon;
  return (
    <div
      className="tech-marquee-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.25rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-sm)',
        color: 'var(--text)',
        fontSize: '0.88rem',
        fontWeight: '700',
        transition: 'all 0.2s',
        cursor: 'default',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = tech.color;
        e.currentTarget.style.boxShadow = `0 4px 20px ${tech.color}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--line)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ color: tech.color, display: 'flex', alignItems: 'center' }}>
        <Icon />
      </div>
      <span>{tech.name}</span>
    </div>
  );
}

export default function TechStackAnimation() {
  const sectionRef = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reveals = el.querySelectorAll('.tech-reveal');
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
            delay: stagger(70)
          });
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech-stack" ref={sectionRef} className="aj-section aj-section--dark" style={{ overflow: 'hidden' }}>
      <div className="aj-container">
        
        {/* Header */}
        <div className="aj-label tech-reveal">✦ Stack</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <h2 className="aj-heading tech-reveal" style={{ marginBottom: 0 }}>
            <StaggeredText text="Technology" /><br />
            <span className="aj-heading--accent">
              <StaggeredText text="ecosystem." />
            </span>
          </h2>
          <p className="tech-reveal" style={{ maxWidth: '340px', marginBottom: 0 }}>
            A stack combining robust backend structures, interactive clients, AI models and physical hardware controls.
          </p>
        </div>

        {/* Double row Marquee Container */}
        <div className="tech-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem' }}>
          
          {/* Row 1: Left scroll */}
          <div className="marquee-container" style={{ padding: '0.2rem 0' }}>
            <div className="marquee-track marquee-scroll-left">
              {row1.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
            <div className="marquee-track marquee-scroll-left" aria-hidden="true">
              {row1.map((tech) => (
                <TechCard key={`${tech.name}-dup`} tech={tech} />
              ))}
            </div>
          </div>

          {/* Row 2: Right scroll */}
          <div className="marquee-container" style={{ padding: '0.2rem 0' }}>
            <div className="marquee-track marquee-scroll-right">
              {row2.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
            <div className="marquee-track marquee-scroll-right" aria-hidden="true">
              {row2.map((tech) => (
                <TechCard key={`${tech.name}-dup`} tech={tech} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
