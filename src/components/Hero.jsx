import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, Bot, ShieldAlert } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground';

const typingPhrases = [
  "AI • Robotics • Drone Developer",
  "Full Stack Web Developer",
  "Autonomous Systems Builder",
  "FPV Drone Pilot & Racer"
];

export default function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const activePhrase = typingPhrases[phraseIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing letters
        setCurrentText(activePhrase.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === activePhrase) {
          // Pause when word is fully typed
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting letters
        setCurrentText(activePhrase.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 1.5rem 4rem 1.5rem',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at bottom, var(--clr-dark-900) 0%, var(--clr-black) 100%)',
      }}
    >
      {/* High-Performance Canvas Particles */}
      <ParticlesBackground />

      {/* Cybergrid Overlay */}
      <div 
        className="grid-pattern"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.45,
          zIndex: 1,
        }}
      />

      {/* Radial Gradient Ambient Background Glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
          top: '20%',
          left: '10%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
          bottom: '10%',
          right: '10%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '850px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Intro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            background: 'rgba(6, 182, 212, 0.06)',
            border: '1px solid rgba(6, 182, 212, 0.15)',
            color: 'var(--accent-primary)',
            fontSize: '0.85rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          <Bot size={15} />
          <span>Autonomous Systems Portfolio</span>
        </motion.div>

        {/* Headline Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontWeight: '800',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          Sushant Guri
        </motion.h1>

        {/* Auto-Typing Role Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            minHeight: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            className="typing-cursor"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.1rem, 0.95rem + 1dvw, 1.6rem)',
              color: 'var(--accent-primary)',
              fontWeight: '600',
              textShadow: '0 0 10px rgba(6, 182, 212, 0.3)',
            }}
          >
            {currentText}
          </p>
        </motion.div>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            maxWidth: '680px',
            fontSize: 'clamp(1rem, 0.9rem + 0.4dvw, 1.25rem)',
            color: 'var(--clr-gray-300)',
            lineHeight: 1.6,
          }}
        >
          I am a Computer Science student passionate about Artificial Intelligence, Robotics, 
          FPV Drone Development, and Full Stack Development. I enjoy building intelligent 
          systems, autonomous robots, drones, and modern web applications while constantly 
          exploring emerging technologies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1.5rem',
            width: '100%',
          }}
        >
          <button
            onClick={() => scrollToSection('#projects')}
            className="glow-btn glow-btn-primary"
          >
            <span>View Projects</span>
            <ArrowRight size={16} />
          </button>
          
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume download triggered! (Placeholder link, you can easily attach your PDF in public/resume.pdf)");
            }}
            className="glow-btn glow-btn-secondary"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>

          <button
            onClick={() => scrollToSection('#contact')}
            className="glow-btn glow-btn-secondary"
            style={{
              borderColor: 'rgba(6, 182, 212, 0.25)',
            }}
          >
            <Send size={16} style={{ color: 'var(--clr-cyan)' }} />
            <span>Contact Me</span>
          </button>
        </motion.div>
      </div>

      {/* Down Arrow indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          cursor: 'pointer',
        }}
        onClick={() => scrollToSection('#about')}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--clr-cyan)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 4px var(--clr-cyan))' }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
