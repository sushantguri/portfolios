import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const footerLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Contact',  href: '#contact' },
];

const socials = [
  { label: 'GitHub',    href: 'https://github.com/' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/' },
];

export default function Footer() {
  const ref = useRef(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.footer-reveal');
    items.forEach(i => { i.style.opacity = '0'; });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          animate(items, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 500,
            ease: 'outExpo',
            delay: stagger(60),
          });
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="aj-footer">
      {/* Top row */}
      <div className="aj-footer__inner" style={{ marginBottom: '2rem' }}>
        {/* Logo + tagline */}
        <div className="footer-reveal">
          <div className="aj-footer__logo">
            SG<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.3rem', maxWidth: '220px' }}>
            Building the future with AI, Robotics &amp; Innovation.
          </p>
        </div>

        {/* Nav links */}
        <nav className="aj-footer__links footer-reveal" style={{ flexWrap: 'wrap', gap: '1.25rem' }}>
          {footerLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)} className="aj-footer__link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="footer-reveal" style={{ display: 'flex', gap: '0.75rem' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.78rem',
                fontWeight: '600',
                color: 'var(--text-3)',
                padding: '0.4rem 0.8rem',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-xs)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--line-bright)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="aj-divider footer-reveal" />

      {/* Bottom row */}
      <div className="aj-footer__inner footer-reveal" style={{ marginTop: '1.5rem' }}>
        <span className="aj-footer__copy">
          © {new Date().getFullYear()} Sushant Guri — All rights reserved.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>Built with</span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(255,75,75,0.2)',
            borderRadius: '20px',
            padding: '0.15rem 0.6rem',
          }}>
            Three.js
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>&amp;</span>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent)',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(255,75,75,0.2)',
            borderRadius: '20px',
            padding: '0.15rem 0.6rem',
          }}>
            anime.js
          </span>
        </div>
      </div>
    </footer>
  );
}
