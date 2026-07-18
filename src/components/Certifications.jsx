import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

const certifications = [
  {
    title: 'Artificial Intelligence Specialist',
    issuer: 'DeepLearning.AI / Coursera',
    credentialId: 'AI-928-831',
    color: '#06b6d4',
  },
  {
    title: 'Machine Learning Masterclass',
    issuer: 'Stanford Online',
    credentialId: 'ML-772-401',
    color: '#3b82f6',
  },
  {
    title: 'Autonomous Robotics & Control',
    issuer: 'MIT OpenCourseWare',
    credentialId: 'ROB-118-202',
    color: '#10b981',
  },
  {
    title: 'Drone Avionics & ESC Programming',
    issuer: 'FPV Systems Academy',
    credentialId: 'DRN-394-884',
    color: '#ef4444',
  },
  {
    title: 'Full Stack Web Architecture',
    issuer: 'Meta / Coursera',
    credentialId: 'WEB-401-294',
    color: '#f59e0b',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Certifications() {
  return (
    <section
      id="certifications"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Title */}
        <h2 className="section-title">
          <span>Professional Certifications</span>
        </h2>

        {/* Grid layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '4rem',
          }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card cert-card"
              style={{
                '--cert-color': cert.color,
                '--cert-glow': `${cert.color}10`,
                padding: '2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Badge Icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: cert.color,
                  alignSelf: 'flex-start',
                }}
              >
                <Award size={24} />
              </div>

              {/* Title & Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>
                  {cert.title}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                  {cert.issuer}
                </span>
              </div>

              {/* Credential ID */}
              <div
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    ID: {cert.credentialId}
                  </span>
                </div>
                
                <a
                  href="#verify"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Verify credential ${cert.credentialId} placeholder link clicked!`);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s',
                  }}
                  className="cert-verify-link"
                >
                  <span>Verify</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .cert-card:hover {
          border-color: var(--cert-color) !important;
          box-shadow: 0 8px 30px var(--cert-glow) !important;
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.02) !important;
        }
        .cert-verify-link:hover {
          color: white !important;
        }
      `}</style>
    </section>
  );
}
