import { useState, useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { Activity, Navigation, Bot, Eye, Heart, Brain } from 'lucide-react';
import { StaggeredText } from './AnimationShowcase';

const projects = [
  {
    num: '01',
    title: 'FitTrack — Health Dashboard',
    subtitle: 'Full-Stack Web Application',
    desc: 'A comprehensive React dashboard monitoring personal health metrics — workouts, water intake, animated charts and secure auth.',
    tech: ['React.js', 'Framer Motion', 'ChartJS', 'Context API'],
    icon: Activity,
    color: '#06b6d4',
    href: '#',
  },
  {
    num: '02',
    title: 'Custom FPV Racing Drone',
    subtitle: 'Hardware & Avionics Engineering',
    desc: 'Designed and assembled custom FPV quadcopters from scratch — SpeedyBee F405 FC, DJI Air Unit, custom ESC tuning, Betaflight PID.',
    tech: ['Betaflight', 'SpeedyBee F405', 'DJI Digital FPV', 'ESC Tuning'],
    icon: Navigation,
    color: '#ef4444',
    href: '#',
  },
  {
    num: '03',
    title: 'Autonomous Navigation Robot',
    subtitle: 'Robotics & Embedded Systems',
    desc: 'Physical robot platform with obstacle avoidance via ultrasonic sensors, IR line following, Arduino H-Bridge motor control.',
    tech: ['Arduino', 'Ultrasonic', 'H-Bridge L298N', 'C++'],
    icon: Bot,
    color: '#10b981',
    href: '#',
  },
  {
    num: '04',
    title: 'AI Vision Pipeline (IIT KGP)',
    subtitle: 'Research · Computer Vision',
    desc: 'Co-developed AI-vision and flight-control solutions at IIT Kharagpur Research Park. Real-time object detection for drone systems.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Drone SDK'],
    icon: Eye,
    color: '#a855f7',
    href: '#',
  },
  {
    num: '05',
    title: 'NLP Sentiment Classifier',
    subtitle: 'Machine Learning · NLP',
    desc: 'Deep learning pipeline for multi-class sentiment analysis — LSTM + attention mechanism trained on social media datasets.',
    tech: ['Python', 'PyTorch', 'NLTK', 'Scikit-learn'],
    icon: Brain,
    color: '#ec4899',
    href: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const firedRef = useRef(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    const list = listRef.current;
    if (!el || !list) return;

    const reveals = el.querySelectorAll('.aj-reveal');
    reveals.forEach((r) => { r.style.opacity = '0'; r.style.transform = 'translateY(24px)'; });

    const items = list.querySelectorAll('.aj-project-item');
    items.forEach((r) => { r.style.opacity = '0'; });

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
          animate(items, {
            opacity: [0, 1],
            duration: 600,
            ease: 'outExpo',
            delay: stagger(100, { start: 200 }),
          });
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="aj-section aj-section--dark">
      <div className="aj-container">
        {/* Header */}
        <div className="aj-label aj-reveal">✦ Projects</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <h2 className="aj-heading aj-reveal" style={{ marginBottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <StaggeredText text="Selected" />
            <span className="aj-heading--accent">
              <StaggeredText text="work." />
            </span>
          </h2>
          <p className="aj-reveal" style={{ maxWidth: '300px', marginBottom: 0 }}>
            A mix of software, hardware, and AI projects — each solving a real problem.
          </p>
        </div>

        {/* Project list */}
        <div ref={listRef}>
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.num}
                className="aj-project-item"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Number */}
                <div className="aj-project__num">{proj.num}</div>

                {/* Content */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <Icon size={16} style={{ color: proj.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                      {proj.subtitle}
                    </span>
                  </div>
                  <div className="aj-project__title">{proj.title}</div>
                  <p className="aj-project__desc">{proj.desc}</p>
                  <div className="aj-project__tags">
                    {proj.tech.map((t) => (
                      <span key={t} className="aj-project__tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="aj-project-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
