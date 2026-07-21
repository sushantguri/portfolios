import { useRef, useEffect } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import { Code2, Globe, Cpu, Navigation, Brain, Briefcase, Rocket } from 'lucide-react';
import { StaggeredText } from './StaggeredText';

const timelineEvents = [
  {
    title: 'Learning Programming',
    description: 'Dived into fundamental computation concepts, starting with C++ and Python. Mastered OOP concepts, data structures, and terminal algorithms.',
    icon: Code2,
    color: '#3b82f6',
  },
  {
    title: 'Web Development Journey',
    description: 'Learned full-stack architectures. Built scalable SPAs using React.js and backend endpoints with Node.js, Express, and database servers.',
    icon: Globe,
    color: '#f59e0b',
  },
  {
    title: 'Robotics Engineering',
    description: 'Began building physical systems. Programmed Arduino boards, integrated sensor arrays, and designed autonomous obstacle avoidance mobile robots.',
    icon: Cpu,
    color: '#10b981',
  },
  {
    title: 'FPV Drone Assembly & Avionics',
    description: 'Built custom quadcopters from scratch. Tuned ESC speed parameters, configured Betaflight firmware, and installed DJI digital video transmitters.',
    icon: Navigation,
    color: '#ef4444',
  },
  {
    title: 'AI & Machine Learning Research',
    description: 'Explored deep learning architectures. Engineered neural networks, NLP pipelines, and data analytics tools using Python and TensorFlow libraries.',
    icon: Brain,
    color: '#a855f7',
  },
  {
    title: 'Research Internship (LCC)',
    description: 'Conducted engineering research at IIT Kharagpur Research Park. Co-developed AI-vision pipelines and flight-control solutions for drone systems.',
    icon: Briefcase,
    color: '#06b6d4',
  },
  {
    title: 'Current Innovations',
    description: 'Synthesizing knowledge in AI and hardware to develop intelligent autonomous robotics, high-speed UAV configurations, and next-gen applications.',
    icon: Rocket,
    color: '#ec4899',
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const lineProgressRef = useRef(null);
  const observerRef = useRef(null);
  const scrollHandlerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const lineProgress = lineProgressRef.current;
    if (!container || !lineProgress) return;

    // Set initial state for timeline items
    const nodes = container.querySelectorAll('.timeline-node');
    const cards = container.querySelectorAll('.timeline-card-inner');

    nodes.forEach((n) => {
      n.style.opacity = '0';
      n.style.transform = 'scale(0.4)';
    });
    cards.forEach((c) => {
      c.style.opacity = '0';
      c.style.transform = 'translateX(30px)';
    });

    // IntersectionObserver to start the sequence
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observerRef.current?.disconnect();

          // Stagger nodes and cards in sequence
          const tl = createTimeline();
          tl
            .add(nodes, {
              opacity: [0, 1],
              scale: [0.4, 1],
              duration: 600,
              ease: 'outBack(1.5)',
              delay: stagger(150),
            }, 0)
            .add(cards, {
              opacity: [0, 1],
              translateX: [30, 0],
              duration: 600,
              ease: 'outExpo',
              delay: stagger(150),
            }, 100);
        }
      },
      { threshold: 0.1, rootMargin: '-60px' }
    );
    observerRef.current.observe(container);

    // Scroll-driven line progress
    const updateProgress = () => {
      const rect = container.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = winH * 0.5;
      const end = -(rect.height - winH * 0.5);
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      lineProgress.style.height = `${progress * 100}%`;
    };

    scrollHandlerRef.current = updateProgress;
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Section title */}
        <div className="aj-label">✦ Timeline</div>
        <h2 className="aj-heading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <StaggeredText text="My Journey" />
          <span className="aj-heading--accent">
            <StaggeredText text="roadmap." />
          </span>
        </h2>

        {/* Timeline Path line (Base Track) */}
        <div
          style={{
            position: 'absolute',
            top: '240px',
            bottom: '40px',
            left: '32px',
            width: '2px',
            background: 'rgba(255, 255, 255, 0.05)',
            zIndex: 1,
          }}
          className="md:timeline-line-center"
        >
          {/* Scroll-driven progress beam */}
          <div
            ref={lineProgressRef}
            style={{
              width: '100%',
              height: '0%',
              background: 'linear-gradient(to bottom, var(--accent) 0%, var(--accent-2) 100%)',
              boxShadow: '0 0 10px var(--accent), 0 0 20px var(--accent-2)',
              transition: 'height 0.1s linear',
            }}
          />
        </div>

        {/* Timeline Items */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '3rem',
            marginTop: '5rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {timelineEvents.map((evt, idx) => {
            const Icon = evt.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
                className={`timeline-item ${isEven ? 'item-even' : 'item-odd'}`}
              >
                {/* Node Dot / Icon indicator */}
                <div
                  className="timeline-node"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '4px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-primary)',
                    border: `2px solid ${evt.color}`,
                    color: evt.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: `0 0 12px ${evt.color}50`,
                  }}
                >
                  <Icon size={16} />
                </div>

                {/* Content Card */}
                <div
                  className="glass-card timeline-card timeline-card-inner"
                  style={{
                    marginLeft: '70px',
                    padding: '1.75rem',
                    flexGrow: 1,
                    position: 'relative',
                  }}
                >
                  {/* Small arrow to card */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '-8px',
                      width: '0',
                      height: '0',
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderRight: '8px solid rgba(255, 255, 255, 0.08)',
                    }}
                    className="timeline-arrow"
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white' }}>
                      {evt.title}
                    </h3>
                  </div>
                  
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {evt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md\\:timeline-line-center {
            left: 50% !important;
            transform: translateX(-50%);
          }
          
          .timeline-node {
            left: 50% !important;
            transform: translateX(-50%);
          }

          .timeline-card {
            width: 44% !important;
            flex-grow: 0 !important;
          }

          .item-even {
            justify-content: flex-start;
          }
          .item-even .timeline-card {
            margin-left: 0 !important;
          }
          .item-even .timeline-arrow {
            left: unset !important;
            right: -8px !important;
            border-right: none !important;
            border-left: 8px solid rgba(255, 255, 255, 0.08) !important;
          }

          .item-odd {
            justify-content: flex-end;
          }
          .item-odd .timeline-card {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
