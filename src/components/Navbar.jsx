import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const navItems = [
  { name: 'About',    href: '#about' },
  { name: 'Skills',   href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Gallery',  href: '#gallery' },
  { name: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    // Mount stagger
    const links = navRef.current?.querySelectorAll('.aj-nav__link');
    if (links) {
      animate(links, {
        opacity: [0, 1],
        translateY: [-8, 0],
        duration: 500,
        ease: 'outExpo',
        delay: stagger(60, { start: 200 }),
      });
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = ['home', ...navItems.map(i => i.href.substring(1))];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav ref={navRef} className={`aj-nav ${isScrolled ? 'aj-nav--scrolled' : ''}`}>
      <div className="aj-nav__inner">
        {/* Logo */}
        <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="aj-nav__logo">
          SG<span className="aj-nav__logo-dot">.</span>
        </a>

        {/* Desktop links */}
        <div className="aj-nav__links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className={`aj-nav__link ${activeSection === item.href.substring(1) ? 'aj-nav__link--active' : ''}`}
              style={{ opacity: 0 }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="aj-nav__cta" style={{ display: 'none' }}>
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="aj-nav__hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: isOpen ? 0 : 1 }} />
          <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="aj-nav__mobile">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className={`aj-nav__mobile-link ${activeSection === item.href.substring(1) ? 'aj-nav__mobile-link--active' : ''}`}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* Desktop link visibility fix */}
      <style>{`
        @media (min-width: 901px) {
          .aj-nav__links .aj-nav__link { opacity: 1 !important; }
          .aj-nav__cta { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
