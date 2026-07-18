import { motion } from 'framer-motion';
import { Calendar, Shield, Award, MapPin, CheckCircle2 } from 'lucide-react';

const responsibilities = [
  "Designed and prototyped advanced autonomous robotics projects.",
  "Organized major robotics events and workshops, handling budgeting and operations.",
  "Mentored junior students in Arduino development, microcontroller programming, and circuit layout.",
  "Managed technical competitions, acting as lead coordinator and project evaluator.",
  "Built autonomous maze-solving and object-tracking robotic systems.",
  "Designed custom drone racing tracks, introducing micro-FPV racing setups in student festivals.",
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: '6rem 1.5rem 3rem 1.5rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative vertical line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.15) 20%, transparent)',
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Title */}
        <h2 className="section-title">
          <span>Leadership Experience</span>
        </h2>

        <div style={{ marginTop: '4rem' }}>
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
              borderLeft: '4px solid var(--clr-purple)',
            }}
          >
            {/* Glowing accent border */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Header info */}
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
                    color: 'var(--accent-tertiary)',
                    letterSpacing: '0.1em',
                  }}
                >
                  Student Leadership
                </span>
                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginTop: '0.25rem' }}>
                  Robotics Team & Event Lead
                </h3>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--clr-gray-300)', marginTop: '0.2rem' }}>
                  Robotics Club
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
                  <Calendar size={16} style={{ color: 'var(--clr-purple)' }} />
                  <span>2024 - Present</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={16} style={{ color: 'var(--clr-purple)' }} />
                  <span>Club Lead Officer</span>
                </div>
              </div>
            </div>

            {/* Description list */}
            <div>
              <p
                style={{
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  fontSize: '1.05rem',
                }}
              >
                Key Responsibilities & Activities:
              </p>
              
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                {responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{
                        color: 'var(--clr-purple)',
                        marginTop: '0.2rem',
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {resp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
