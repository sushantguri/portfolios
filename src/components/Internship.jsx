import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Globe, Cpu } from 'lucide-react';

export default function Internship() {
  return (
    <section
      id="internship"
      style={{
        padding: '3rem 1.5rem 6rem 1.5rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="glass-card"
            style={{
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
              borderLeft: '4px solid var(--clr-cyan)',
            }}
          >
            {/* Glowing accent background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Header section */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    color: 'var(--accent-primary)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Research Internship
                </span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem' }}>
                  AI, Robotics & Drone Development Intern
                </h3>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--clr-gray-300)', marginTop: '0.2rem' }}>
                  Learner Career Council (LCC)
                </h4>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} style={{ color: 'var(--clr-cyan)' }} />
                  <span>Summer Research Term</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} style={{ color: 'var(--clr-cyan)' }} />
                  <span>IIT Kharagpur Research Park</span>
                </div>
              </div>
            </div>

            {/* Description details */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
              }}
            >
              <div>
                <p style={{ lineHeight: '1.7', fontSize: '1.05rem', color: 'var(--clr-gray-200)' }}>
                  During my internship at the **IIT Kharagpur Research Park**, I collaborated on 
                  bleeding-edge AI and drone-based software platforms. My research and engineering 
                  focus centered on combining computer vision models with real-time drone control systems 
                  to create smart autonomous platforms.
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                  }}
                >
                  <h5 style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    AI & Computer Vision Integration
                  </h5>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Wrote inference scripts utilizing neural networks to process real-time video streams, identifying coordinates and targets for robotics navigation systems.
                  </p>
                </div>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                  }}
                >
                  <h5 style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    Drone Control Platforms
                  </h5>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Explored drone configurations, autonomous mission programming (using INAV and flight planner software), and electronic speed controller tuning.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
