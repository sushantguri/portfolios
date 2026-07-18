import { motion } from 'framer-motion';
import { 
  GitBranch, Database, Cpu, Layers, HardDrive, Terminal 
} from 'lucide-react';

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const PythonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M16 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
  </svg>
);

const ReactIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const DockerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="10" width="8" height="4" rx="1" />
    <rect x="12" y="10" width="10" height="4" rx="1" />
    <rect x="7" y="5" width="4" height="3" rx="1" />
    <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
  </svg>
);

const CVIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M3 12c4-8 14-8 18 0-4 8-14 8-18 0z" />
  </svg>
);

const row1 = [
  { name: 'Python', icon: PythonIcon, color: '#3b82f6' },
  { name: 'React', icon: ReactIcon, color: '#06b6d4' },
  { name: 'Node.js', icon: Layers, color: '#10b981' },
  { name: 'Git', icon: GitBranch, color: '#f97316' },
  { name: 'GitHub', icon: GithubIcon, color: '#f8fafc' },
  { name: 'MongoDB', icon: Database, color: '#10b981' },
];

const row2 = [
  { name: 'Arduino', icon: Cpu, color: '#06b6d4' },
  { name: 'TensorFlow', icon: HardDrive, color: '#f97316' },
  { name: 'OpenCV', icon: CVIcon, color: '#a855f7' },
  { name: 'Docker', icon: DockerIcon, color: '#3b82f6' },
  { name: 'Linux', icon: Terminal, color: '#f59e0b' },
];

function TechCard({ tech }) {
  const Icon = tech.icon;
  return (
    <div
      className="speen-tech-wrapper"
      style={{
        '--tech-accent': tech.color,
      }}
    >
      <button className="speen-tech-real" aria-label={tech.name} />
      <div className="speen-tech-backdrop" />
      <div className="speen-tech-container">
        <div className="speen-tech-card-spin speen-tech-spin-blur" />
        <div className="speen-tech-card-spin speen-tech-spin-intense" />
        <div className="speen-tech-backdrop" />
        <div className="speen-tech-border">
          <div className="speen-tech-card-spin speen-tech-spin-inside" />
          <div className="speen-tech-content">
            <div style={{ color: tech.color, display: 'flex', alignItems: 'center' }}>
              <Icon size={18} />
            </div>
            <span style={{ letterSpacing: '-0.01em' }}>
              {tech.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TechStackAnimation() {
  return (
    <section
      id="tech-stack"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shared SVG Filters for Speen Buttons */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 
          0 1 0 0 0 
          0 0 1 0 0 
          0 0 0 9 0" />
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq2">
          <feColorMatrix values="1 0 0 0 0 
          0 1 0 0 0 
          0 0 1 0 0 
          0 0 0 3 0" />
        </filter>
        <filter width="300%" x="-100%" height="300%" y="-100%" id="unopaq3">
          <feColorMatrix values="1 0 0 0.2 0 
          0 1 0 0.2 0 
          0 0 1 0.2 0 
          0 0 0 2 0" />
        </filter>
      </svg>
      {/* Visual Accent */}
      <div 
        className="grid-pattern"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section title */}
        <h2 className="section-title">
          <span>Technology Ecosystem</span>
        </h2>

        {/* Double row Marquee Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '4rem' }}>
          
          {/* Row 1: Left scroll */}
          <div className="marquee-container">
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
          <div className="marquee-container">
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

      <style>{`
        .tech-marquee-card:hover {
          transform: translateY(-2px) scale(1.05) !important;
          border-color: var(--tech-accent) !important;
          box-shadow: 0 4px 20px var(--tech-glow) !important;
          background: rgba(15, 23, 42, 0.75) !important;
        }
      `}</style>
    </section>
  );
}
