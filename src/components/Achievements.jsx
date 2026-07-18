import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Zap, Cpu, Compass, BookOpen, Stars } from 'lucide-react';

const achievementsList = [
  {
    id: 1,
    title: 'Secured 2nd Position',
    desc: 'Won runner-up position in a national-level autonomous robotics competition.',
    icon: Trophy,
    color: '#f59e0b',
  },
  {
    id: 2,
    title: 'Top 5 Ranking',
    desc: 'Achieved a Top 5 final ranking in a highly competitive robotics design tournament.',
    icon: Trophy,
    color: '#06b6d4',
  },
  {
    id: 3,
    title: 'Assembled FPV Drones from Scratch',
    desc: 'Designed custom flight architectures, tuned PIDs, and hand-soldered digital FPV racing quadcopters.',
    icon: Zap,
    color: '#ef4444',
  },
  {
    id: 4,
    title: 'Designed Custom Drone Racing Tracks',
    desc: 'Created obstacle-heavy racing gates and layout courses for local technical drone festivals.',
    icon: Compass,
    color: '#a855f7',
  },
  {
    id: 5,
    title: 'Built Multiple Robotics Projects',
    desc: 'Constructed sensor-driven obstacles-avoidance and line-following hardware systems.',
    icon: Cpu,
    color: '#10b981',
  },
  {
    id: 6,
    title: 'Participated in National Robotics Competitions',
    desc: 'Represented club at events, competing against top-tier engineering institution teams.',
    icon: Stars,
    color: '#f59e0b',
  },
  {
    id: 7,
    title: 'Active Technical Festival Organizer',
    desc: 'Organized and managed technical competitions and robotics event tracks for students.',
    icon: BookOpen,
    color: '#64748b',
  },
  {
    id: 8,
    title: 'AI & ML Development Experience',
    desc: 'Built, preprocessed, and executed predictive machine learning pipelines and deep neural nets.',
    icon: CheckCircle,
    color: '#ec4899',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 25 }
  },
};

export default function Achievements() {
  return (
    <section
      id="achievements"
      style={{
        padding: '6rem 1.5rem',
        background: 'var(--bg-primary)',
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
        {/* Section title */}
        <h2 className="section-title">
          <span>Achievements & Highlights</span>
        </h2>

        {/* Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '4rem',
          }}
        >
          {achievementsList.map((ach) => {
            const Icon = ach.icon;
            return (
              <motion.div
                key={ach.id}
                variants={itemVariants}
                className="glass-card achievement-card"
                style={{
                  '--ach-color': ach.color,
                  '--ach-glow': `${ach.color}15`,
                  padding: '1.75rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  borderLeft: `3px solid ${ach.color}30`,
                }}
              >
                {/* Icon wrapper */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    background: `${ach.color}10`,
                    border: `1px solid ${ach.color}30`,
                    color: ach.color,
                    flexShrink: 0,
                    boxShadow: `0 0 10px ${ach.color}20`,
                  }}
                >
                  <Icon size={22} />
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'white' }}>
                    {ach.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {ach.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .achievement-card:hover {
          border-left-color: var(--ach-color) !important;
          box-shadow: 0 4px 20px var(--ach-glow) !important;
          transform: scale(1.02) translateY(-2px);
          background: rgba(255, 255, 255, 0.02) !important;
        }
      `}</style>
    </section>
  );
}
